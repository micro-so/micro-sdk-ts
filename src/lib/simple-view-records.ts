import type { Records as GeneratedRecords } from '../resources/views/records';
import { bag, InvalidResponseError, request, type CallOptions, type Page } from './simple-core';
import type { SimpleSource } from './simple-scope';

export type ViewRecord = { id: string } & Record<string, unknown>;
export type ViewRecordRoute = { source: SimpleSource };
export type ViewRecordList = ViewRecordRoute & { limit?: number; cursor?: string };

type ObjectType = Parameters<GeneratedRecords['list']>[1]['objectType'];
type VerifySource = (
  viewId: string,
  source: SimpleSource,
  options: CallOptions,
) => Promise<{ objectType: ObjectType }>;

function nonempty(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(`${field} must be a non-empty string.`);
  return value;
}

function keys(value: object, allowed: readonly string[]): void {
  const unknown = Object.keys(value).find((key) => !allowed.includes(key));
  if (unknown) throw new TypeError(`Unknown view record field: ${unknown}`);
}

function strings(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item)) {
    throw new TypeError('orderedRecordIds must be an array of non-empty strings.');
  }
  return [...value];
}

function limit(value: number | undefined): number {
  const result = value ?? 25;
  if (!Number.isInteger(result) || result < 1 || result > 50) {
    throw new RangeError('limit must be between 1 and 50.');
  }
  return result;
}

function normalizeRecord(value: unknown): ViewRecord {
  const row = bag(value);
  if (typeof row['id'] !== 'string') throw new InvalidResponseError('View record id is missing.');
  return row as ViewRecord;
}

function page(value: unknown, cursor?: string): Page<ViewRecord> {
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
    data: result['data'].map(normalizeRecord),
    next_cursor: next as string | null,
    has_more: result['has_more'],
  };
}

export class ViewRecords {
  constructor(
    private readonly wire: GeneratedRecords,
    private readonly verifySource: VerifySource,
  ) {}

  private async listPage(
    viewId: string,
    params: ViewRecordList,
    objectType: ObjectType,
    options: CallOptions,
  ): Promise<Page<ViewRecord>> {
    const result = await this.wire.list(
      viewId,
      {
        objectType,
        limit: limit(params.limit),
        ...(params.cursor !== undefined ? { cursor: params.cursor } : {}),
      },
      request(options),
    );
    return page(result, params.cursor);
  }

  async list(viewId: string, params: ViewRecordList, options: CallOptions = {}): Promise<Page<ViewRecord>> {
    nonempty(viewId, 'viewId');
    keys(params, ['source', 'limit', 'cursor']);
    limit(params.limit);
    const { objectType } = await this.verifySource(viewId, params.source, options);
    return this.listPage(viewId, params, objectType, options);
  }

  async *iterate(
    viewId: string,
    params: ViewRecordList,
    options: CallOptions = {},
  ): AsyncIterableIterator<ViewRecord> {
    nonempty(viewId, 'viewId');
    keys(params, ['source', 'limit', 'cursor']);
    limit(params.limit);
    const { objectType } = await this.verifySource(viewId, params.source, options);
    const seen = new Set<string>();
    let cursor = params.cursor;
    while (true) {
      options.signal?.throwIfAborted();
      if (cursor !== undefined) {
        if (seen.has(cursor)) throw new InvalidResponseError('Repeating pagination cursor.');
        seen.add(cursor);
      }
      const current = await this.listPage(
        viewId,
        { ...params, ...(cursor !== undefined ? { cursor } : {}) },
        objectType,
        options,
      );
      for (const row of current.data) {
        options.signal?.throwIfAborted();
        yield row;
      }
      if (!current.has_more) return;
      cursor = current.next_cursor!;
    }
  }

  async pin(
    viewId: string,
    recordId: string,
    params: ViewRecordRoute,
    options: CallOptions = {},
  ): Promise<void> {
    nonempty(viewId, 'viewId');
    nonempty(recordId, 'recordId');
    keys(params, ['source']);
    const { objectType } = await this.verifySource(viewId, params.source, options);
    await this.wire.pin(recordId, { objectType, viewId }, request(options, true));
  }

  async unpin(
    viewId: string,
    recordId: string,
    params: ViewRecordRoute,
    options: CallOptions = {},
  ): Promise<void> {
    nonempty(viewId, 'viewId');
    nonempty(recordId, 'recordId');
    keys(params, ['source']);
    const { objectType } = await this.verifySource(viewId, params.source, options);
    await this.wire.unpin(recordId, { objectType, viewId }, request(options, true));
  }

  /** Repositions the supplied pinned records. Every ID must already be pinned. */
  async reorderPinned(
    viewId: string,
    orderedRecordIds: string[],
    params: ViewRecordRoute,
    options: CallOptions = {},
  ): Promise<void> {
    nonempty(viewId, 'viewId');
    keys(params, ['source']);
    const ids = strings(orderedRecordIds);
    if (new Set(ids).size !== ids.length) {
      throw new TypeError('orderedRecordIds must not contain duplicates.');
    }
    const { objectType } = await this.verifySource(viewId, params.source, options);
    await this.wire.reorder(viewId, { objectType, object_ids: ids }, request(options, true));
  }
}
