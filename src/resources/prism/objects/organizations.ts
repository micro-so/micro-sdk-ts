// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrismAPI from '../prism';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Organizations extends APIResource {
  /**
   * Create object
   */
  create(
    params: OrganizationCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationCreateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Patch object
   */
  update(
    organizationID: string,
    params: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationUpdateResponse> {
    const {
      teamId = this._client.teamID,
      'Idempotency-Key': idempotencyKey,
      'If-Match': ifMatch,
      ...body
    } = params;
    return this._client.patch(path`/v2/prism/${teamId}/organization/${organizationID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
          ...(ifMatch != null ? { 'If-Match': ifMatch } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Convenience list endpoint. Equivalent to
   * `POST /v2/prism/{teamId}/{objectType}/query` with an empty body, plus
   * query-string sugar for the common cases. Any unrecognized query parameter is
   * interpreted as an equality filter on a property of that name; pass arrays for
   * `in`. Values are received as strings, so non-string property filters via this
   * endpoint may not work — use the `query` endpoint for typed comparisons or
   * anything beyond simple equality.
   */
  list(
    params: OrganizationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/organization`, { query, ...options });
  }

  /**
   * Delete object
   */
  delete(
    organizationID: string,
    params: OrganizationDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID, 'If-Match': ifMatch } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/organization/${organizationID}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(ifMatch != null ? { 'If-Match': ifMatch } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: small batches complete synchronously and return 200 with
   * the final `ImportJob`; large batches start an async job, return 202 with
   * `status: processing` and a `Location` header, and can be polled via
   * `GET /v2/prism/{teamId}/imports/{jobId}`.
   */
  bulkCreate(
    params: OrganizationBulkCreateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationBulkCreateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/import`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Soft-delete up to 100 records in a single call. Same partial-success contract as
   * batch/update.
   */
  bulkDelete(
    params: OrganizationBulkDeleteParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationBulkDeleteResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/batch/delete`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Patch up to 100 records in a single call. Each item is attempted independently —
   * failures don't abort the batch. Inspect `results[].status` per item.
   */
  bulkUpdate(
    params: OrganizationBulkUpdateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationBulkUpdateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/batch/update`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns the total number of records of this object type that the caller can see.
   * Avoids the page-overshoot anti-pattern — clients no longer need to keep paging
   * until `has_more` flips false to discover the total. Currently does not apply
   * query filters; for a filtered total, pass `include_total: true` in a POST
   * `/query` body.
   */
  count(
    params: OrganizationCountParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationCountResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/organization/count`, { query, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    organizationID: string,
    params: OrganizationDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationDuplicateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization/${organizationID}/duplicate`, {
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns the single record whose property `{slug}` equals `{value}`. 404 if
   * nothing matches; 409 if more than one record matches.
   */
  find(
    value: string,
    params: OrganizationFindParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationFindResponse> {
    const { teamId = this._client.teamID, slug, ...query } = params;
    return this._client.get(path`/v2/prism/${teamId}/organization/by/${slug}/${value}`, {
      query,
      ...options,
    });
  }

  /**
   * Get object
   */
  get(
    organizationID: string,
    params: OrganizationGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationGetResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/organization/${organizationID}`, { query, ...options });
  }

  /**
   * Query
   */
  query(params: OrganizationQueryParams, options?: RequestOptions): APIPromise<OrganizationQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/query`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    organizationID: string,
    params: OrganizationRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationRestoreResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization/${organizationID}/restore`, {
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Idempotent create-or-update keyed on `{slug}={value}`. If exactly one record
   * matches, it is patched and 200 is returned. If none match, a new record is
   * created (with the lookup property set if absent) and 201 is returned. If
   * multiple records match, 409 is returned and you should patch by id instead.
   */
  upsert(
    value: string,
    params: OrganizationUpsertParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationUpsertResponse> {
    const { teamId = this._client.teamID, slug, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.put(path`/v2/prism/${teamId}/organization/by/${slug}/${value}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface Organization {
  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null. For select/multiselect properties, values may be option slugs
   * or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationCreateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationUpdateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface OrganizationListResponse {
  data: Array<OrganizationListResponse.Data>;

  /**
   * Accurate end-of-data signal — false on the last page, never forces clients to
   * overshoot.
   */
  has_more: boolean;

  next_cursor?: string | null;

  /**
   * Populated only when `?include_total=true` was passed.
   */
  total?: number | null;
}

export namespace OrganizationListResponse {
  /**
   * Row returned by the query endpoint. `id` is always present at the top level.
   * Selected property values are returned under `properties`, keyed by property
   * slug. Reference-typed values are returned as nested `{ id, properties }`
   * objects.
   */
  export interface Data {
    id: string;

    is_user_object?: boolean;

    /**
     * Selected property values keyed by property slug. For select/multiselect
     * properties, option slugs are returned. For reference properties, values are
     * nested `{ id, properties }` objects.
     */
    properties?: { [key: string]: unknown };

    source?: Array<string> | null;
  }
}

/**
 * Status snapshot of an import job. Same shape used by the POST /import response
 * and by GET /imports/{jobId}.
 */
export interface OrganizationBulkCreateResponse {
  /**
   * Null for sync imports (results inlined). Set for async imports.
   */
  job_id: string | null;

  status: 'complete' | 'processing' | 'failed';

  /**
   * Total number of rows in the import.
   */
  total: number;

  created_at?: string;

  /**
   * Set when status=failed; describes the job-level failure (not per-row).
   */
  error?: OrganizationBulkCreateResponse.Error;

  expires_at?: string;

  failed?: number;

  /**
   * Rows that have been attempted (succeeded + failed).
   */
  processed?: number;

  /**
   * Per-row outcomes. Always present for sync imports; populated for async imports
   * once the job reaches `complete`.
   */
  results?: Array<OrganizationBulkCreateResponse.Result>;

  succeeded?: number;

  updated_at?: string;
}

export namespace OrganizationBulkCreateResponse {
  /**
   * Set when status=failed; describes the job-level failure (not per-row).
   */
  export interface Error {
    code?: string;

    message?: string;
  }

  export interface Result {
    id?: string | null;

    created?: boolean;

    error?: Result.Error;

    /**
     * True if the row matched an existing record via the dedupe key.
     */
    existing?: boolean;
  }

  export namespace Result {
    export interface Error {
      code?: string;

      message?: string;
    }
  }
}

/**
 * Partial-success bulk operation result. Inspect `results[].status` per item; the
 * operation as a whole returns 200 even if some items failed.
 */
export interface OrganizationBulkDeleteResponse {
  results: Array<OrganizationBulkDeleteResponse.Result>;

  summary: OrganizationBulkDeleteResponse.Summary;
}

export namespace OrganizationBulkDeleteResponse {
  export interface Result {
    /**
     * Item ID, or null if the input was unparseable.
     */
    id: string | null;

    status: 'ok' | 'error';

    error?: Result.Error;

    /**
     * Object returned by reads (get/create/patch/restore). id is always present.
     */
    record?: Result.Record;
  }

  export namespace Result {
    export interface Error {
      code?: string;

      message?: string;
    }

    /**
     * Object returned by reads (get/create/patch/restore). id is always present.
     */
    export interface Record {
      id: string;

      /**
       * Properties keyed by property slug.
       */
      default?: { [key: string]: unknown };

      list?: unknown;
    }
  }

  export interface Summary {
    failed: number;

    succeeded: number;

    total: number;
  }
}

/**
 * Partial-success bulk operation result. Inspect `results[].status` per item; the
 * operation as a whole returns 200 even if some items failed.
 */
export interface OrganizationBulkUpdateResponse {
  results: Array<OrganizationBulkUpdateResponse.Result>;

  summary: OrganizationBulkUpdateResponse.Summary;
}

export namespace OrganizationBulkUpdateResponse {
  export interface Result {
    /**
     * Item ID, or null if the input was unparseable.
     */
    id: string | null;

    status: 'ok' | 'error';

    error?: Result.Error;

    /**
     * Object returned by reads (get/create/patch/restore). id is always present.
     */
    record?: Result.Record;
  }

  export namespace Result {
    export interface Error {
      code?: string;

      message?: string;
    }

    /**
     * Object returned by reads (get/create/patch/restore). id is always present.
     */
    export interface Record {
      id: string;

      /**
       * Properties keyed by property slug.
       */
      default?: { [key: string]: unknown };

      list?: unknown;
    }
  }

  export interface Summary {
    failed: number;

    succeeded: number;

    total: number;
  }
}

export interface OrganizationCountResponse {
  /**
   * Number of records matching the access scope.
   */
  total: number;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationDuplicateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationFindResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationGetResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface OrganizationQueryResponse {
  data: Array<OrganizationQueryResponse.Data>;

  /**
   * Accurate end-of-data signal. False when this page contains the last record; true
   * only when at least one more record exists. (Implementation note: the server
   * fetches one extra row internally to determine this — clients never need to
   * overshoot to discover the end.)
   */
  has_more: boolean;

  /**
   * Opaque cursor pointing at the next page. Pass it back unchanged in the request
   * body (`cursor`) of the next call. Null when `has_more` is false.
   */
  next_cursor?: string | null;

  /**
   * Only populated when the request set `include_total: true`. Total number of
   * records matching the query, ignoring pagination. Opt-in because it costs an
   * additional pass over the result set.
   */
  total?: number | null;
}

export namespace OrganizationQueryResponse {
  /**
   * Row returned by the query endpoint. `id` is always present at the top level.
   * Selected property values are returned under `properties`, keyed by property
   * slug. Reference-typed values are returned as nested `{ id, properties }`
   * objects.
   */
  export interface Data {
    id: string;

    is_user_object?: boolean;

    /**
     * Selected property values keyed by property slug. For select/multiselect
     * properties, option slugs are returned. For reference properties, values are
     * nested `{ id, properties }` objects.
     */
    properties?: { [key: string]: unknown };

    source?: Array<string> | null;
  }
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationRestoreResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationUpsertResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface OrganizationCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  list?: unknown;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface OrganizationUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  list?: unknown;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;

  /**
   * Header param: Optimistic concurrency. Pass back the `etag` header from a
   * previous GET of this record; the write only proceeds if the record hasn't
   * changed since. Mismatch → 412 `precondition_failed`. Use `*` to require the
   * record exists (any ETag accepted).
   */
  'If-Match'?: string;
}

export interface OrganizationListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Opaque cursor from a previous response's `next_cursor`. Pass it
   * back unchanged to fetch the next page.
   */
  cursor?: string;

  /**
   * Query param: Include soft-deleted records. Pass the literal string `true`.
   */
  deleted?: boolean;

  /**
   * Query param: When set to `true`, the response includes a `total` field with the
   * unpaginated row count. Costs an extra pass; prefer `GET .../count` for the
   * unfiltered total.
   */
  include_total?: boolean;

  /**
   * Query param: Maximum number of rows to return. Capped server-side at 50.
   */
  limit?: number;

  /**
   * Query param: Scope properties to a specific list/app.
   */
  list_id?: string;

  /**
   * Query param: Comma-separated property slugs to return. Use dot notation for
   * relationships. `id` is always returned at the top level. Defaults to all
   * properties.
   */
  select?: string;

  /**
   * Query param: Comma-separated list of slugs. Prefix with `-` for descending.
   * Example: `sort=-updated_at,name`.
   */
  sort?: string;
}

export interface OrganizationDeleteParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Header param: Optimistic concurrency. Pass back the `etag` header from a
   * previous GET of this record; the write only proceeds if the record hasn't
   * changed since. Mismatch → 412 `precondition_failed`. Use `*` to require the
   * record exists (any ETag accepted).
   */
  'If-Match'?: string;
}

export interface OrganizationBulkCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Array of objects to import with property values keyed by slug
   */
  objects: Array<PrismAPI.PrismObjectProperties>;

  /**
   * Body param
   */
  options?: OrganizationBulkCreateParams.Options;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export namespace OrganizationBulkCreateParams {
  export interface Options {
    /**
     * Whether deduplication should be case insensitive
     */
    caseInsensitive?: boolean;

    /**
     * Property slug to deduplicate on
     */
    dedupe_by?: string;

    /**
     * App/CRM ID for context (optional)
     */
    list_id?: string;
  }
}

export interface OrganizationBulkDeleteParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  ids: Array<string>;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface OrganizationBulkUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  items: Array<OrganizationBulkUpdateParams.Item>;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export namespace OrganizationBulkUpdateParams {
  /**
   * Object with `id` plus the same property body shape as PATCH
   * (`default`/`list`/`extended`).
   */
  export interface Item {
    id: string;

    [k: string]: unknown;
  }
}

export interface OrganizationCountParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Scope the count to a specific list/app.
   */
  list_id?: string;
}

export interface OrganizationDuplicateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface OrganizationFindParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param: Property slug to match (e.g. `email`).
   */
  slug: string;

  /**
   * Query param: Scope the lookup to a specific list/app.
   */
  list_id?: string;
}

export interface OrganizationGetParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Comma-separated property slugs to return. Use dot notation for
   * relationships. `id` is always returned at the top level. Defaults to all
   * properties.
   */
  select?: string;
}

export interface OrganizationQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: OrganizationQueryParams.Query;

  /**
   * Body param
   */
  id?: string | Array<string>;

  /**
   * Body param
   */
  boxes?: Array<string>;

  /**
   * Body param: Alternative location for the opaque cursor (a sibling of `query`).
   * Use whichever feels more natural; if both are present, `query.cursor` wins.
   */
  cursor?: string;

  /**
   * Body param
   */
  deleted?: boolean;

  /**
   * Body param: When true, the response includes a `total` field with the
   * unpaginated row count. Costs an additional pass over the result set — for
   * unfiltered totals prefer `GET /v2/prism/{teamId}/{objectType}/count` instead.
   */
  include_total?: boolean;

  /**
   * Body param
   */
  sources?: Array<string>;
}

export namespace OrganizationQueryParams {
  export interface Query {
    /**
     * Property slugs to select. Use dot notation for relationships (e.g.
     * attendee.contact.first_name). `id` is always returned at the top level of each
     * row and does not need to be selected.
     */
    select: Array<string>;

    /**
     * Logical operator for combining filters
     */
    combinator?: 'AND' | 'OR';

    /**
     * Opaque cursor from a previous response's `next_cursor`. Pass it back unchanged
     * to fetch the next page. When set, `page` and `limit` are derived from the cursor
     * and any explicit values are ignored.
     */
    cursor?: string;

    /**
     * Filters as [{ slug: { operator: value } }]. For select/multiselect properties,
     * values may be option slugs or option UUIDs.
     */
    filter?: Array<{
      [key: string]:
        | Query.PrismQueryFilterEq
        | Query.PrismQueryFilterNe
        | Query.PrismQueryFilterLt
        | Query.PrismQueryFilterGt
        | Query.PrismQueryFilterLte
        | Query.PrismQueryFilterGte
        | Query.Contains
        | Query.BeginsWith
        | Query.EndsWith
        | Query.NotContains
        | Query.Exists
        | Query.NotExists
        | Query.IsNull
        | Query.IsNotNull
        | Query.Between
        | Query.In
        | Query.NotIn;
    }>;

    /**
     * Maximum number of rows to return. Capped server-side at 50; requests above the
     * cap are rejected.
     */
    limit?: number;

    list_id?: string;

    /**
     * @deprecated Page number (1-based). Prefer `cursor`. Page-number pagination
     * drifts under concurrent writes; use it only for one-shot exports.
     */
    page?: number;

    /**
     * Sort order as [{ slug: direction }]. Array order determines sort priority
     */
    sort?: Array<{ [key: string]: 'asc' | 'desc' }>;
  }

  export namespace Query {
    export interface PrismQueryFilterEq {
      '=': string | boolean;
    }

    export interface PrismQueryFilterNe {
      '!=': string | boolean;
    }

    export interface PrismQueryFilterLt {
      '<': string;
    }

    export interface PrismQueryFilterGt {
      '>': string;
    }

    export interface PrismQueryFilterLte {
      '<=': string;
    }

    export interface PrismQueryFilterGte {
      '>=': string;
    }

    export interface Contains {
      contains: string | boolean | Array<string>;
    }

    export interface BeginsWith {
      begins_with: string;
    }

    export interface EndsWith {
      ends_with: string;
    }

    export interface NotContains {
      not_contains: string;
    }

    export interface Exists {
      exists: boolean;
    }

    export interface NotExists {
      not_exists: boolean;
    }

    export interface IsNull {
      is_null: string | boolean | Array<string>;
    }

    export interface IsNotNull {
      is_not_null: string | boolean | Array<string>;
    }

    export interface Between {
      between: string | boolean | Array<string>;
    }

    export interface In {
      in: Array<string>;
    }

    export interface NotIn {
      not_in: Array<string>;
    }
  }
}

export interface OrganizationRestoreParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface OrganizationUpsertParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  slug: string;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  list?: unknown;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export declare namespace Organizations {
  export {
    type Organization as Organization,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationBulkCreateResponse as OrganizationBulkCreateResponse,
    type OrganizationBulkDeleteResponse as OrganizationBulkDeleteResponse,
    type OrganizationBulkUpdateResponse as OrganizationBulkUpdateResponse,
    type OrganizationCountResponse as OrganizationCountResponse,
    type OrganizationDuplicateResponse as OrganizationDuplicateResponse,
    type OrganizationFindResponse as OrganizationFindResponse,
    type OrganizationGetResponse as OrganizationGetResponse,
    type OrganizationQueryResponse as OrganizationQueryResponse,
    type OrganizationRestoreResponse as OrganizationRestoreResponse,
    type OrganizationUpsertResponse as OrganizationUpsertResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
    type OrganizationDeleteParams as OrganizationDeleteParams,
    type OrganizationBulkCreateParams as OrganizationBulkCreateParams,
    type OrganizationBulkDeleteParams as OrganizationBulkDeleteParams,
    type OrganizationBulkUpdateParams as OrganizationBulkUpdateParams,
    type OrganizationCountParams as OrganizationCountParams,
    type OrganizationDuplicateParams as OrganizationDuplicateParams,
    type OrganizationFindParams as OrganizationFindParams,
    type OrganizationGetParams as OrganizationGetParams,
    type OrganizationQueryParams as OrganizationQueryParams,
    type OrganizationRestoreParams as OrganizationRestoreParams,
    type OrganizationUpsertParams as OrganizationUpsertParams,
  };
}
