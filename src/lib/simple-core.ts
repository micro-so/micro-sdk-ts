import { APIError } from '../core/error';
import type { RequestOptions } from '../internal/request-options';
import type { Organizations } from '../resources/prism/objects/organizations';
import { buildHeaders } from '../internal/headers';

export type ReadOptions = { properties?: string[] };
export type CallOptions = Pick<RequestOptions, 'headers' | 'signal' | 'timeout'> & {
  idempotencyKey?: string;
  ifMatch?: string;
};
export type WriteFields = { properties?: Record<string, unknown> };
export type Page<T> = { data: T[]; next_cursor: string | null; has_more: boolean };
export type ListOptions<W> = ReadOptions & { where?: W; limit?: number; cursor?: string };
export type RecordData = { id: string; properties: Record<string, unknown> };
export type FindOrCreateResult<T> = { record: T; created: boolean };
export type MatchRequest = (
  body: { match: Record<string, string>; defaults: Record<string, unknown> },
  options: RequestOptions,
) => Promise<unknown>;

/** The write succeeded. Retrieve record_id instead of repeating the mutation. */
export class WriteReadbackError extends Error {
  readonly write_committed = true;
  constructor(
    readonly record_id: string,
    readonly cause: unknown,
  ) {
    super(`Record ${record_id} was saved, but its complete response could not be read. Retrieve it again.`);
    this.name = 'WriteReadbackError';
  }
}

export class InvalidResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidResponseError';
  }
}

export function bag(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new InvalidResponseError('Expected a record object.');
  }
  return value as Record<string, unknown>;
}

export function fields(value: unknown): { id: string; values: Record<string, unknown> } {
  const row = bag(value);
  if (typeof row['id'] !== 'string') throw new InvalidResponseError('Record id is missing.');
  return { id: row['id'], values: bag(row['properties'] ?? row['default'] ?? {}) };
}

export function scalar(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value !== 'string') throw new InvalidResponseError('Expected a string field.');
  return value;
}

export function extra(values: Record<string, unknown>, keys: readonly string[]): Record<string, unknown> {
  return Object.fromEntries(Object.entries(values).filter(([key]) => !keys.includes(key)));
}

export function request(options: CallOptions = {}, write = false): RequestOptions {
  const { idempotencyKey, ifMatch, ...rest } = options;
  // Reconstruct options: a JS caller cannot inject body/query/team overrides.
  return {
    ...(rest.signal !== undefined ? { signal: rest.signal } : {}),
    ...(rest.timeout !== undefined ? { timeout: rest.timeout } : {}),
    headers: buildHeaders([
      rest.headers,
      {
        ...(idempotencyKey !== undefined ? { 'Idempotency-Key': idempotencyKey } : {}),
        ...(ifMatch !== undefined ? { 'If-Match': ifMatch } : {}),
      },
    ]),
    ...(write ? { maxRetries: 0 } : {}),
  };
}

type Wire = Pick<Organizations, 'create' | 'get' | 'update' | 'query'>;
type Query = Parameters<Organizations['query']>[0]['query'];

export abstract class Resource<T extends RecordData, W> {
  constructor(
    protected readonly wire: Wire,
    private readonly matchRequest?: MatchRequest,
  ) {}
  protected abstract readonly keys: readonly string[];
  protected abstract readonly select: readonly string[];
  protected abstract normalize(value: unknown): T;
  protected abstract filters(where: W): NonNullable<Query['filter']>;

  protected projection(options: ReadOptions): string[] {
    for (const key of options.properties ?? []) {
      if (!key || key.includes('.') || this.keys.includes(key) || key === 'id') {
        throw new TypeError(`Invalid custom property selection: ${key}`);
      }
    }
    return [...this.select, ...(options.properties ?? [])];
  }

  protected input(value: WriteFields & Record<string, unknown>): Record<string, unknown> {
    const { properties = {}, ...standard } = value;
    for (const key of Object.keys(properties)) {
      if (key === 'id' || this.keys.includes(key)) throw new TypeError(`Reserved property: ${key}`);
    }
    for (const [key, field] of Object.entries(standard)) {
      if (!this.keys.includes(key)) throw new TypeError(`Unknown field: ${key}`);
      if (field !== undefined && field !== null && typeof field !== 'string') {
        throw new TypeError(`Expected a string or null for ${key}.`);
      }
    }
    return {
      ...properties,
      ...Object.fromEntries(Object.entries(standard).filter(([, v]) => v !== undefined)),
    };
  }

  async get(id: string, params: ReadOptions = {}, options: CallOptions = {}): Promise<T> {
    return this.normalize(
      await this.wire.get(id, { select: this.projection(params).join(',') }, request(options)),
    );
  }

  protected async write(
    id: string | undefined,
    data: Record<string, unknown>,
    options: CallOptions,
  ): Promise<T> {
    const result =
      id === undefined ?
        await this.wire.create({ default: data }, request(options, true))
      : await this.wire.update(id, { default: data }, request(options, true));
    return this.completeWrite(result, data, options);
  }

  protected async findOrCreateRecord(
    match: Record<string, string>,
    defaults: Record<string, unknown>,
    options: CallOptions,
  ): Promise<FindOrCreateResult<T>> {
    if (!this.matchRequest) throw new TypeError('Find-or-create requires the configured simple client.');
    const result = bag(await this.matchRequest({ match, defaults }, request(options, true)));
    if (typeof result['created'] !== 'boolean') throw new InvalidResponseError('Missing created result.');
    const row = bag(result['record']);
    if (typeof row['id'] !== 'string') throw new InvalidResponseError('Record id is missing.');
    const record =
      result['created'] ?
        await this.completeWrite({ ...row, id: row['id'] }, defaults, options)
      : await this.get(row['id'], {}, options);
    return { record, created: result['created'] };
  }

  private async completeWrite(
    result: { id: string },
    data: Record<string, unknown>,
    options: CallOptions,
  ): Promise<T> {
    const recordId = result.id;
    try {
      const values = fields(result).values;
      if (this.select.some((path) => !(path.split('.')[0]! in values))) {
        throw new InvalidResponseError('Mutation returned partial fields.');
      }
      return this.normalize(result);
    } catch (error) {
      if (!(error instanceof InvalidResponseError)) throw new WriteReadbackError(recordId, error);
      try {
        // A committed write must not be repeated if this one completion read fails.
        const custom = Object.keys(data).filter((key) => !this.keys.includes(key));
        const readOptions: CallOptions = {};
        if (options.signal !== undefined) readOptions.signal = options.signal;
        if (options.timeout !== undefined) readOptions.timeout = options.timeout;
        if (options.headers !== undefined) readOptions.headers = options.headers;
        return await this.get(recordId, { properties: custom }, readOptions);
      } catch (cause) {
        throw new WriteReadbackError(recordId, cause);
      }
    }
  }

  async list(params: ListOptions<W> = {}, options: CallOptions = {}): Promise<Page<T>> {
    const limit = params.limit ?? 25;
    if (!Number.isInteger(limit) || limit < 1 || limit > 50)
      throw new RangeError('limit must be between 1 and 50.');
    const query: Query = {
      select: this.projection(params),
      limit,
      combinator: 'AND',
      ...(params.cursor !== undefined ? { cursor: params.cursor } : {}),
      ...(params.where !== undefined ? { filter: this.filters(params.where) } : {}),
    };
    const result = bag(await this.wire.query({ query }, request(options)));
    if (!Array.isArray(result['data']) || typeof result['has_more'] !== 'boolean') {
      throw new InvalidResponseError('Invalid page response.');
    }
    const cursor = result['next_cursor'] ?? null;
    if (
      (cursor !== null && (typeof cursor !== 'string' || !cursor)) ||
      (result['has_more'] && (!cursor || cursor === params.cursor)) ||
      (!result['has_more'] && cursor !== null)
    ) {
      throw new InvalidResponseError('Inconsistent pagination cursor.');
    }
    return {
      data: result['data'].map((row) => this.normalize(row)),
      next_cursor: cursor as string | null,
      has_more: result['has_more'],
    };
  }

  async *iterate(params: ListOptions<W> = {}, options: CallOptions = {}): AsyncIterableIterator<T> {
    const seen = new Set<string>();
    let cursor = params.cursor;
    while (true) {
      options.signal?.throwIfAborted();
      if (cursor !== undefined) {
        if (seen.has(cursor)) throw new InvalidResponseError('Repeating pagination cursor.');
        seen.add(cursor);
      }
      const page = await this.list({ ...params, ...(cursor !== undefined ? { cursor } : {}) }, options);
      for (const row of page.data) {
        options.signal?.throwIfAborted();
        yield row;
      }
      if (!page.has_more) return;
      cursor = page.next_cursor!;
    }
  }
}

// Re-export the existing error class for callers using only this entry point.
export { APIError };
