import type RawMicro from '../index';
import type { Lists as GeneratedLists } from '../resources/prism/lists';
import { bag, InvalidResponseError, request, type CallOptions, type Page } from './simple-core';
import { recordTypeForObjectType, resolveObjectType, type SimpleObjectType } from './simple-scope';

const LIST_RECORD_TYPES = ['companies', 'people', 'tasks', 'documents', 'deals'] as const;
export type ListRecordType = (typeof LIST_RECORD_TYPES)[number];

export type ListCreate = {
  template_id: string;
  name?: string;
  icon?: string;
  record_type?: ListRecordType;
};

export type List = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  record_type: ListRecordType;
  template_type: string | null;
  created_at: string | null;
};

export type ListTemplate = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  record_type: ListRecordType | null;
  template_type: string | null;
  supported_record_types: ListRecordType[];
};

export type ListRecordRef = {
  list_id: string;
  record: { type: ListRecordType; id: string };
};

export type ListRecordsParams = { limit?: number; cursor?: string };

function text(value: unknown, field: string, nullable = false): string | null {
  if (value === null && nullable) return null;
  if (typeof value !== 'string' || (!nullable && !value)) {
    throw new InvalidResponseError(`List ${field} is missing.`);
  }
  return value;
}

function recordType(value: unknown, nullable = false): ListRecordType | null {
  if (value === null && nullable) return null;
  if (typeof value !== 'string') throw new InvalidResponseError('List record_type is missing.');
  const mapped = recordTypeForObjectType(value);
  if (!mapped || !LIST_RECORD_TYPES.includes(mapped as ListRecordType)) {
    throw new InvalidResponseError(`Unsupported list object_type: ${value}`);
  }
  return mapped as ListRecordType;
}

function normalizeList(value: unknown): List {
  const row = bag(value);
  return {
    id: text(row['id'], 'id')!,
    name: text(row['name'], 'name')!,
    description: text(row['description'] ?? null, 'description', true),
    icon: text(row['icon'] ?? null, 'icon', true),
    record_type: recordType(row['object_type'])!,
    template_type: text(row['type'] ?? null, 'template_type', true),
    created_at: text(row['created_at'] ?? null, 'created_at', true),
  };
}

function normalizeTemplate(value: unknown): ListTemplate {
  const row = bag(value);
  if (!Array.isArray(row['supported_object_types'])) {
    throw new InvalidResponseError('Template supported_object_types is missing.');
  }
  return {
    id: text(row['id'], 'template id')!,
    name: text(row['name'], 'template name')!,
    description: text(row['description'] ?? null, 'template description', true),
    icon: text(row['icon'] ?? null, 'template icon', true),
    record_type: recordType(row['object_type'] ?? null, true),
    template_type: text(row['type'] ?? null, 'template type', true),
    supported_record_types: row['supported_object_types'].map((type) => recordType(type)!),
  };
}

function page<T>(value: unknown, normalize: (row: unknown) => T, cursor?: string): Page<T> {
  const result = bag(value);
  if (!Array.isArray(result['data'])) throw new InvalidResponseError('Invalid page response.');
  const hasMore = result['has_more'] ?? false;
  const next = result['next_cursor'] ?? null;
  if (
    typeof hasMore !== 'boolean' ||
    (next !== null && (typeof next !== 'string' || !next)) ||
    (hasMore && (!next || next === cursor)) ||
    (!hasMore && next !== null)
  ) {
    throw new InvalidResponseError('Inconsistent pagination cursor.');
  }
  return { data: result['data'].map(normalize), has_more: hasMore, next_cursor: next as string | null };
}

function validateLimit(limit: number): void {
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new RangeError('limit must be between 1 and 50.');
  }
}

function nonempty(value: string, field: string): string {
  if (typeof value !== 'string' || !value || value.trim() !== value) {
    throw new TypeError(`${field} must be a nonempty string.`);
  }
  return value;
}

function recordsParams(params: ListRecordsParams): ListRecordsParams {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    throw new TypeError('List record parameters must be an object.');
  }
  if (Object.keys(params).some((key) => key !== 'limit' && key !== 'cursor')) {
    throw new TypeError('List record parameters accept only limit and cursor.');
  }
  const limit = params.limit ?? 25;
  validateLimit(limit);
  if (params.cursor !== undefined) nonempty(params.cursor, 'cursor');
  return { limit, ...(params.cursor !== undefined ? { cursor: params.cursor } : {}) };
}

class ListTemplates {
  constructor(private readonly client: RawMicro) {}

  async list(options: CallOptions = {}): Promise<Page<ListTemplate>> {
    const result = await this.client.get(`/v2/prism/${this.client.teamID}/list-templates`, request(options));
    return page(result, normalizeTemplate);
  }

  async get(id: string, options: CallOptions = {}): Promise<ListTemplate> {
    const templateId = encodeURIComponent(nonempty(id, 'template id'));
    return normalizeTemplate(
      await this.client.get(`/v2/prism/${this.client.teamID}/list-templates/${templateId}`, request(options)),
    );
  }
}

class ListRecords {
  constructor(
    private readonly lists: Lists,
    private readonly client: RawMicro,
  ) {}

  private async source(
    listId: string,
    options: CallOptions,
  ): Promise<{ type: ListRecordType; object: SimpleObjectType }> {
    const list = await this.lists.get(listId, options);
    return { type: list.record_type, object: resolveObjectType(list.record_type) };
  }

  private async page(
    listId: string,
    source: { type: ListRecordType; object: SimpleObjectType },
    params: ListRecordsParams,
    options: CallOptions,
  ): Promise<Page<ListRecordRef>> {
    const limit = params.limit!;
    const result = await this.client.get(`/v2/prism/${this.client.teamID}/${source.object}`, {
      ...request(options),
      query: { list_id: listId, limit, ...(params.cursor ? { cursor: params.cursor } : {}) },
    });
    return page(
      result,
      (value) => ({
        list_id: listId,
        record: { type: source.type, id: text(bag(value)['id'], 'record id')! },
      }),
      params.cursor,
    );
  }

  async list(
    listId: string,
    params: ListRecordsParams = {},
    options: CallOptions = {},
  ): Promise<Page<ListRecordRef>> {
    const safeListId = nonempty(listId, 'list id');
    const safeParams = recordsParams(params);
    return this.page(safeListId, await this.source(safeListId, options), safeParams, options);
  }

  /** Returns null when the record is not a member of this list. */
  async get(listId: string, recordId: string, options: CallOptions = {}): Promise<ListRecordRef | null> {
    const safeListId = nonempty(listId, 'list id');
    const safeRecordId = nonempty(recordId, 'record id');
    const source = await this.source(safeListId, options);
    const result = bag(
      await this.client.post(`/v2/prism/${this.client.teamID}/${source.object}/query`, {
        ...request(options),
        body: { id: safeRecordId, query: { select: [], crm_id: safeListId, limit: 1 } },
      }),
    );
    if (!Array.isArray(result['data'])) throw new InvalidResponseError('Invalid membership response.');
    if (result['data'].length === 0) return null;
    if (result['data'].length !== 1 || bag(result['data'][0])['id'] !== safeRecordId) {
      throw new InvalidResponseError('Membership response did not match the requested record.');
    }
    return { list_id: safeListId, record: { type: source.type, id: safeRecordId } };
  }

  async *iterate(
    listId: string,
    params: ListRecordsParams = {},
    options: CallOptions = {},
  ): AsyncIterableIterator<ListRecordRef> {
    const safeListId = nonempty(listId, 'list id');
    const safeParams = recordsParams(params);
    const source = await this.source(safeListId, options);
    const seen = new Set<string>();
    let cursor = safeParams.cursor;
    while (true) {
      options.signal?.throwIfAborted();
      if (cursor !== undefined) {
        if (seen.has(cursor)) throw new InvalidResponseError('Repeating pagination cursor.');
        seen.add(cursor);
      }
      const result = await this.page(
        safeListId,
        source,
        { ...safeParams, ...(cursor ? { cursor } : {}) },
        options,
      );
      for (const entry of result.data) {
        options.signal?.throwIfAborted();
        yield entry;
      }
      if (!result.has_more) return;
      cursor = result.next_cursor!;
    }
  }
}

export class Lists {
  readonly templates: ListTemplates;
  readonly records: ListRecords;
  private readonly wire: Pick<GeneratedLists, 'create' | 'get' | 'list'>;

  constructor(private readonly client: RawMicro) {
    this.wire = client.prism.lists;
    this.templates = new ListTemplates(client);
    this.records = new ListRecords(this, client);
  }

  async create(data: ListCreate, options: CallOptions = {}): Promise<List> {
    if (!data || typeof data !== 'object' || Array.isArray(data))
      throw new TypeError('List data is required.');
    if (Object.keys(data).some((key) => !['template_id', 'name', 'icon', 'record_type'].includes(key))) {
      throw new TypeError('List data accepts only template_id, name, icon, and record_type.');
    }
    nonempty(data.template_id, 'template_id');
    if (data.name !== undefined) nonempty(data.name, 'name');
    if (data.icon !== undefined) nonempty(data.icon, 'icon');
    if (data.template_id === 'custom') {
      if (!data.name || typeof data.name !== 'string')
        throw new TypeError('name is required for a custom list.');
      if (!data.record_type || !LIST_RECORD_TYPES.includes(data.record_type)) {
        throw new TypeError(`record_type must be one of: ${LIST_RECORD_TYPES.join(', ')}.`);
      }
    } else if (data.record_type !== undefined) {
      throw new TypeError('record_type is only allowed for the custom template.');
    }
    const { record_type, ...body } = data;
    // Templates are discovered at runtime, while the generated declaration lists
    // only the templates known when its OpenAPI snapshot was produced.
    const input = {
      ...body,
      ...(record_type ? { object_type: resolveObjectType(record_type) } : {}),
    } as Parameters<GeneratedLists['create']>[0];
    return normalizeList(await this.wire.create(input, request(options, true)));
  }

  async get(id: string, options: CallOptions = {}): Promise<List> {
    const listId = nonempty(id, 'list id');
    return normalizeList(await this.wire.get(listId, {}, request(options)));
  }

  async list(options: CallOptions = {}): Promise<Page<List>> {
    const result = await this.wire.list({}, request(options));
    // The current API returns the complete accessible inventory and has no cursor contract.
    return page(result, normalizeList);
  }
}
