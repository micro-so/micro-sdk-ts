import type { RequestOptions } from '../internal/request-options';
import type {
  Properties as WireProperties,
  PropertyDefinition as WireField,
} from '../resources/prism/properties';
import { InvalidResponseError, request, type CallOptions } from './simple-core';
import {
  recordTypeForObjectType,
  resolveSource,
  type SimpleRecordType,
  type SimpleSource,
} from './simple-scope';

type StorageType = WireField['type'];
export type FieldType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'json'
  | 'reference'
  | 'multireference'
  | 'unsupported';

export type Field = {
  id: string;
  slug: string;
  name: string;
  type: FieldType;
  storage_type: StorageType;
  reference_type: SimpleRecordType | null;
  source: SimpleSource;
  required: boolean;
  read_only: boolean;
  native: boolean;
};

export type FieldCreate = {
  source: SimpleSource;
  name: string;
  type: Exclude<FieldType, 'reference' | 'multireference' | 'unsupported'>;
  slug?: string;
  icon?: string | null;
  required?: boolean;
};

export type FieldUpdate = { name?: string; icon?: string | null; required?: boolean };

type ListParams = { source: SimpleSource; term?: string };
type GetParams = { source: SimpleSource };

const CREATE_TYPES: Record<FieldCreate['type'], StorageType> = {
  text: 'str',
  number: 'num',
  boolean: 'bool',
  date: 'date',
  select: 'select_str',
  multiselect: 'multiselect_str',
  json: 'jsonb',
};
const STORAGE_TYPES = new Set<StorageType>([
  'num',
  'str',
  'bool',
  'date',
  'text',
  'byte',
  'select_str',
  'multi_str',
  'multiselect_str',
  'jsonb',
  'ref_identity',
  'ref_user',
  'ref_organization',
  'ref_contact',
  'ref_thread',
  'ref_message',
  'ref_event',
  'ref_account',
  'ref_ai_chat_thread',
  'ref_ai_chat_message',
  'multiref_ai_chat_message',
  'multiref_agent_site',
  'multiref_action',
  'multiref_comment',
  'multiref_contact',
  'multiref_label',
  'multiref_thread',
  'multiref_messages',
  'multiref_document',
  'multiref_identity',
  'multiref_organization',
  'multiref_engagement',
  'multiref_attendee',
  'multiref_meeting_entry',
  'multiref_read_receipt',
  'multiref_account',
  'multiref_source',
]);

function nonempty(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${label} must be a non-empty string.`);
  return value;
}

function assertKeys(value: object, allowed: readonly string[], label: string): void {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) throw new TypeError(`Unknown ${label} field: ${key}.`);
  }
}

function exactSource(source: SimpleSource): SimpleSource {
  resolveSource(source);
  return source.scope.type === 'workspace' ?
      { record_type: source.record_type, scope: { type: 'workspace' } }
    : { record_type: source.record_type, scope: { type: 'list', list_id: source.scope.list_id } };
}

function fieldType(storageType: StorageType): { type: FieldType; reference_type: SimpleRecordType | null } {
  const simple = {
    str: 'text',
    text: 'text',
    num: 'number',
    bool: 'boolean',
    date: 'date',
    select_str: 'select',
    multiselect_str: 'multiselect',
    jsonb: 'json',
  } as const;
  if (storageType in simple) {
    return { type: simple[storageType as keyof typeof simple], reference_type: null };
  }
  const multi = storageType.startsWith('multiref_');
  const rawTarget = storageType.replace(multi ? 'multiref_' : 'ref_', '');
  const referenceType = recordTypeForObjectType(rawTarget);
  if (storageType.startsWith('ref_') || multi) {
    return { type: multi ? 'multireference' : 'reference', reference_type: referenceType };
  }
  return { type: 'unsupported', reference_type: null };
}

function normalizeField(value: WireField, source: SimpleSource): Field {
  if (!STORAGE_TYPES.has(value.type)) throw new InvalidResponseError('Field storage type is invalid.');
  const kind = fieldType(value.type);
  return {
    id: nonempty(value.id, 'Field id'),
    slug: nonempty(value.slug, 'Field slug'),
    name: nonempty(value.name, 'Field name'),
    type: kind.type,
    storage_type: value.type,
    reference_type: kind.reference_type,
    source: exactSource(source),
    required: value.required ?? false,
    read_only: value.locked ?? false,
    native: value.native ?? false,
  };
}

function fieldHandle(value: Field): Field {
  nonempty(value.id, 'Field id');
  if (!STORAGE_TYPES.has(value.storage_type)) throw new TypeError('Field storage_type is invalid.');
  exactSource(value.source);
  return value;
}

export function wireOptions(options: CallOptions, write = false): RequestOptions {
  return request(options, write);
}

export class Fields {
  constructor(readonly wire: WireProperties) {}

  async list(params: ListParams, options: CallOptions = {}): Promise<Field[]> {
    assertKeys(params, ['source', 'term'], 'field list');
    const source = exactSource(params.source);
    const { objectType, listId } = resolveSource(source);
    const response = await this.wire.list(
      objectType,
      {
        ...(listId === undefined ? {} : { list_id: listId }),
        ...(params.term === undefined ? {} : { term: params.term }),
        include_options: false,
      },
      wireOptions(options),
    );
    const group = response[objectType];
    if (group === undefined) return [];
    if (!group || typeof group !== 'object' || Array.isArray(group)) {
      throw new InvalidResponseError(`Field metadata for ${params.source.record_type} is missing.`);
    }
    return Object.values(group).map((value) => normalizeField(value as WireField, source));
  }

  async get(id: string, params: GetParams, options: CallOptions = {}): Promise<Field> {
    nonempty(id, 'Field id');
    assertKeys(params, ['source'], 'field get');
    const found = (await this.list({ source: params.source }, options)).find((field) => field.id === id);
    if (!found) throw new FieldNotFoundError(id, params.source);
    return found;
  }

  async create(data: FieldCreate, options: CallOptions = {}): Promise<Field> {
    assertKeys(data, ['source', 'name', 'type', 'slug', 'icon', 'required'], 'field create');
    const source = exactSource(data.source);
    const { objectType, listId } = resolveSource(source);
    nonempty(data.name, 'Field name');
    if (data.slug !== undefined) nonempty(data.slug, 'Field slug');
    if (!Object.prototype.hasOwnProperty.call(CREATE_TYPES, data.type)) {
      throw new TypeError('Unsupported field type.');
    }
    const storageType = CREATE_TYPES[data.type];
    const created = await this.wire.create(
      objectType,
      {
        name: data.name,
        type: storageType,
        ...(listId === undefined ? {} : { list_id: listId }),
        ...(data.slug === undefined ? {} : { slug: data.slug }),
        ...(data.icon === undefined ? {} : { icon: data.icon }),
        ...(data.required === undefined ? {} : { required: data.required }),
      },
      wireOptions(options, true),
    );
    return normalizeField(created, source);
  }

  async update(field: Field, data: FieldUpdate, options: CallOptions = {}): Promise<Field> {
    const target = fieldHandle(field);
    assertKeys(data, ['name', 'icon', 'required'], 'field update');
    if (target.read_only || target.native)
      throw new TypeError('Native or read-only fields cannot be updated.');
    const { objectType, listId } = resolveSource(target.source);
    if (data.name !== undefined) nonempty(data.name, 'Field name');
    const updated = await this.wire.update(
      target.id,
      {
        objectType,
        type: target.storage_type,
        ...(listId === undefined ? {} : { list_id: listId }),
        ...(data.name === undefined ? {} : { name: data.name }),
        ...(data.icon === undefined ? {} : { icon: data.icon }),
        ...(data.required === undefined ? {} : { required: data.required }),
      },
      wireOptions(options, true),
    );
    return normalizeField(updated, target.source);
  }

  async archive(field: Field, options: CallOptions = {}): Promise<void> {
    const target = fieldHandle(field);
    if (target.read_only || target.native)
      throw new TypeError('Native or read-only fields cannot be archived.');
    const { objectType, listId } = resolveSource(target.source);
    await this.wire.update(
      target.id,
      {
        objectType,
        type: target.storage_type,
        enabled: false,
        ...(listId === undefined ? {} : { list_id: listId }),
      },
      wireOptions(options, true),
    );
  }
}

export class FieldNotFoundError extends Error {
  constructor(
    readonly field_id: string,
    readonly source: SimpleSource,
  ) {
    super(`Field ${field_id} was not found in the requested ${source.scope.type} scope.`);
    this.name = 'FieldNotFoundError';
  }
}
