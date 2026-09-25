import type { Views as GeneratedViews } from '../resources/views/views';
import { bag, InvalidResponseError, request, type CallOptions, type Page } from './simple-core';
import { resolveSource, type SimpleSource } from './simple-scope';
import { ViewRecords } from './simple-view-records';

export type ViewLayout = 'table' | 'list' | 'board';
export type ViewFilter = Array<Record<string, unknown>>;
export type ViewSort = Array<Record<string, 'asc' | 'desc'>>;

export type View = {
  id: string;
  name: string;
  source: SimpleSource;
  layout: ViewLayout;
  columns: string[];
  filter: ViewFilter;
  sort: ViewSort;
  combinator: 'AND' | 'OR';
  group_by: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type ViewSettings = {
  name: string;
  layout: ViewLayout;
  columns?: string[];
  filter?: ViewFilter;
  sort?: ViewSort;
  combinator?: 'AND' | 'OR';
  group_by?: string | null;
};
export type ViewCreate = ViewSettings & { source: SimpleSource };
export type ViewUpdate = Partial<ViewSettings> & { source: SimpleSource };
export type ViewRoute = { source: SimpleSource };
export type ViewList = ViewRoute & { limit?: number; cursor?: string };

export type ViewWire = Pick<GeneratedViews, 'create' | 'get' | 'list' | 'update' | 'delete' | 'records'>;
export type ViewObjectType = Parameters<GeneratedViews['create']>[0];
const SUPPORTED_OBJECT_TYPES = new Set<ViewObjectType>([
  'action',
  'deal',
  'document',
  'event',
  'identity',
  'organization',
]);
const TO_WIRE_LAYOUT: Record<ViewLayout, string> = { table: 'grid', list: 'list', board: 'kanban' };
const FROM_WIRE_LAYOUT: Record<string, ViewLayout> = { grid: 'table', list: 'list', kanban: 'board' };

export function resolveViewSource(source: SimpleSource): { objectType: ViewObjectType; listId?: string } {
  const resolved = resolveSource(source);
  if (!SUPPORTED_OBJECT_TYPES.has(resolved.objectType as ViewObjectType)) {
    throw new TypeError(`Views do not support ${source.record_type} records.`);
  }
  return {
    objectType: resolved.objectType as ViewObjectType,
    ...(resolved.listId ? { listId: resolved.listId } : {}),
  };
}

export function viewKeys(value: object, allowed: readonly string[]): void {
  const unknown = Object.keys(value).find((key) => !allowed.includes(key));
  if (unknown) throw new TypeError(`Unknown view field: ${unknown}`);
}

export function viewID(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${field} must be a non-empty string.`);
  return value;
}

function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item)) {
    throw new TypeError(`${field} must be an array of non-empty strings.`);
  }
  return [...value];
}

function records(value: unknown, field: string): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) throw new TypeError(`${field} must be an array.`);
  return value.map((item) => {
    try {
      return bag(item);
    } catch {
      throw new TypeError(`${field} entries must be objects.`);
    }
  });
}

function sorts(value: unknown): ViewSort {
  return records(value, 'sort').map((item) => {
    const entries = Object.entries(item);
    if (entries.length !== 1 || !entries[0]![0] || (entries[0]![1] !== 'asc' && entries[0]![1] !== 'desc')) {
      throw new TypeError('Each sort must contain one field with direction asc or desc.');
    }
    return item as Record<string, 'asc' | 'desc'>;
  });
}

export function viewLimit(value: number | undefined): number {
  const result = value ?? 25;
  if (!Number.isInteger(result) || result < 1 || result > 50) {
    throw new RangeError('limit must be between 1 and 50.');
  }
  return result;
}

export function viewPage<T>(value: unknown, normalize: (row: unknown) => T, cursor?: string): Page<T> {
  const result = bag(value);
  if (!Array.isArray(result['data']) || typeof result['has_more'] !== 'boolean') {
    throw new InvalidResponseError('Invalid page response.');
  }
  const next = result['next_cursor'] ?? null;
  if (
    (next !== null && (typeof next !== 'string' || !next)) ||
    (result['has_more'] && (!next || next === cursor)) ||
    (!result['has_more'] && next !== null)
  ) {
    throw new InvalidResponseError('Inconsistent pagination cursor.');
  }
  return {
    data: result['data'].map(normalize),
    next_cursor: next as string | null,
    has_more: result['has_more'],
  };
}

function viewBody(value: Partial<ViewSettings>, creating: boolean): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  if (creating || value.name !== undefined) body['name'] = viewID(value.name, 'name');
  if (creating || value.layout !== undefined) {
    if (!value.layout || !Object.prototype.hasOwnProperty.call(TO_WIRE_LAYOUT, value.layout)) {
      throw new TypeError('Unsupported view layout.');
    }
    body['view_type'] = TO_WIRE_LAYOUT[value.layout];
  }
  if (value.columns !== undefined) body['select'] = strings(value.columns, 'columns');
  if (value.filter !== undefined) body['filter'] = records(value.filter, 'filter');
  if (value.sort !== undefined) body['sort'] = sorts(value.sort);
  if (value.combinator !== undefined) {
    if (value.combinator !== 'AND' && value.combinator !== 'OR') throw new TypeError('Invalid combinator.');
    body['combinator'] = value.combinator;
  }
  if (value.group_by !== undefined) {
    if (value.group_by !== null) viewID(value.group_by, 'group_by');
    body['group_by'] = value.group_by;
  }
  return body;
}

export function normalizeView(value: unknown, source: SimpleSource, teamID: string): View {
  const row = bag(value);
  const resolved = resolveViewSource(source);
  if (
    resolved.listId ? row['list_id'] !== resolved.listId : row['list_id'] != null || row['team_id'] !== teamID
  ) {
    throw new InvalidResponseError('View source does not match the requested scope.');
  }
  if (typeof row['id'] !== 'string') throw new InvalidResponseError('View id is missing.');
  if (typeof row['name'] !== 'string') throw new InvalidResponseError('View name is missing.');
  const layout =
    (
      typeof row['view_type'] === 'string' &&
      Object.prototype.hasOwnProperty.call(FROM_WIRE_LAYOUT, row['view_type'])
    ) ?
      FROM_WIRE_LAYOUT[row['view_type']]
    : undefined;
  if (!layout) throw new InvalidResponseError('View layout is unsupported.');
  const combinator = row['combinator'] ?? 'AND';
  if (combinator !== 'AND' && combinator !== 'OR') throw new InvalidResponseError('Invalid view combinator.');
  const nullableString = (field: string): string | null => {
    const item = row[field] ?? null;
    if (item !== null && typeof item !== 'string') throw new InvalidResponseError(`Invalid ${field}.`);
    return item as string | null;
  };
  const responseArray = <T>(read: () => T): T => {
    try {
      return read();
    } catch {
      throw new InvalidResponseError('View configuration is invalid.');
    }
  };
  return {
    id: row['id'],
    name: row['name'],
    source: {
      record_type: source.record_type,
      scope:
        source.scope.type === 'list' ?
          { type: 'list', list_id: source.scope.list_id }
        : { type: 'workspace' },
    },
    layout,
    columns: responseArray(() => strings(row['select'] ?? [], 'columns')),
    filter: responseArray(() => records(row['filter'] ?? [], 'filter')),
    sort: responseArray(() => sorts(row['sort'] ?? [])),
    combinator,
    group_by: nullableString('group_by'),
    created_at: nullableString('created_at'),
    updated_at: nullableString('updated_at'),
  };
}

export class Views {
  readonly records: ViewRecords;

  constructor(
    private readonly wire: ViewWire,
    private readonly teamID: string,
  ) {
    this.records = new ViewRecords(wire.records, async (viewId, source, options) => {
      const resolved = resolveViewSource(source);
      normalizeView(
        await wire.get(viewId, { objectType: resolved.objectType }, request(options)),
        source,
        teamID,
      );
      return resolved;
    });
  }

  async create(data: ViewCreate, options: CallOptions = {}): Promise<View> {
    viewKeys(data, ['source', 'name', 'layout', 'columns', 'filter', 'sort', 'combinator', 'group_by']);
    const resolved = resolveViewSource(data.source);
    const body = {
      ...viewBody(data, true),
      ...(resolved.listId ? { list_id: resolved.listId } : { team_id: this.teamID }),
    };
    const result = await this.wire.create(resolved.objectType, body as never, request(options, true));
    return normalizeView(result, data.source, this.teamID);
  }

  async get(id: string, params: ViewRoute, options: CallOptions = {}): Promise<View> {
    viewID(id, 'id');
    viewKeys(params, ['source']);
    const resolved = resolveViewSource(params.source);
    return normalizeView(
      await this.wire.get(id, { objectType: resolved.objectType }, request(options)),
      params.source,
      this.teamID,
    );
  }

  async update(id: string, data: ViewUpdate, options: CallOptions = {}): Promise<View> {
    viewID(id, 'id');
    viewKeys(data, ['source', 'name', 'layout', 'columns', 'filter', 'sort', 'combinator', 'group_by']);
    const resolved = resolveViewSource(data.source);
    const body = viewBody(data, false);
    if (!Object.keys(body).length) throw new TypeError('Provide at least one view field to update.');
    await this.get(id, { source: data.source }, options);
    const result = await this.wire.update(
      id,
      { objectType: resolved.objectType, ...body } as never,
      request(options, true),
    );
    return normalizeView(result, data.source, this.teamID);
  }

  async list(params: ViewList, options: CallOptions = {}): Promise<Page<View>> {
    viewKeys(params, ['source', 'limit', 'cursor']);
    const resolved = resolveViewSource(params.source);
    const result = await this.wire.list(
      resolved.objectType,
      {
        limit: viewLimit(params.limit),
        ...(params.cursor !== undefined ? { cursor: params.cursor } : {}),
        ...(resolved.listId ? { list_id: resolved.listId } : {}),
      },
      request(options),
    );
    return viewPage(result, (row) => normalizeView(row, params.source, this.teamID), params.cursor);
  }

  async *iterate(params: ViewList, options: CallOptions = {}): AsyncIterableIterator<View> {
    const seen = new Set<string>();
    let cursor = params.cursor;
    while (true) {
      options.signal?.throwIfAborted();
      if (cursor !== undefined) {
        if (seen.has(cursor)) throw new InvalidResponseError('Repeating pagination cursor.');
        seen.add(cursor);
      }
      const current = await this.list({ ...params, ...(cursor !== undefined ? { cursor } : {}) }, options);
      for (const row of current.data) {
        options.signal?.throwIfAborted();
        yield row;
      }
      if (!current.has_more) return;
      cursor = current.next_cursor!;
    }
  }

  async delete(id: string, params: ViewRoute, options: CallOptions = {}): Promise<void> {
    viewID(id, 'id');
    viewKeys(params, ['source']);
    await this.get(id, params, options);
    const resolved = resolveViewSource(params.source);
    await this.wire.delete(id, { objectType: resolved.objectType }, request(options, true));
  }
}
