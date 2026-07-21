// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as GrantAPI from './grant';
import { Grant, GrantGetParams, GrantGetResponse, GrantUpdateParams, GrantUpdateResponse } from './grant';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Events extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);

  /**
   * Create object
   */
  create(
    params: EventCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventCreateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/event`, {
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
    eventID: string,
    params: EventUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EventUpdateResponse> {
    const {
      teamId = this._client.teamID,
      'Idempotency-Key': idempotencyKey,
      'If-Match': ifMatch,
      ...body
    } = params;
    return this._client.patch(path`/v2/prism/${teamId}/event/${eventID}`, {
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
    params: EventListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/event`, { query, ...options });
  }

  /**
   * Delete object
   */
  delete(
    eventID: string,
    params: EventDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID, 'If-Match': ifMatch } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/event/${eventID}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(ifMatch != null ? { 'If-Match': ifMatch } : undefined) },
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
    params: EventCountParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventCountResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/event/count`, { query, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    eventID: string,
    params: EventDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventDuplicateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/event/${eventID}/duplicate`, {
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
  find(value: string, params: EventFindParams, options?: RequestOptions): APIPromise<EventFindResponse> {
    const { teamId = this._client.teamID, slug, ...query } = params;
    return this._client.get(path`/v2/prism/${teamId}/event/by/${slug}/${value}`, { query, ...options });
  }

  /**
   * Get object
   */
  get(
    eventID: string,
    params: EventGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventGetResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/event/${eventID}`, { query, ...options });
  }

  /**
   * Query
   */
  query(params: EventQueryParams, options?: RequestOptions): APIPromise<EventQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/event/query`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    eventID: string,
    params: EventRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EventRestoreResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/event/${eventID}/restore`, {
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
    params: EventUpsertParams,
    options?: RequestOptions,
  ): APIPromise<EventUpsertResponse> {
    const { teamId = this._client.teamID, slug, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.put(path`/v2/prism/${teamId}/event/by/${slug}/${value}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface Event {
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
export interface EventCreateResponse {
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
export interface EventUpdateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface EventListResponse {
  data: Array<EventListResponse.Data>;

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

export namespace EventListResponse {
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

export interface EventCountResponse {
  /**
   * Number of records matching the access scope.
   */
  total: number;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface EventDuplicateResponse {
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
export interface EventFindResponse {
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
export interface EventGetResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface EventQueryResponse {
  data: Array<EventQueryResponse.Data>;

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

export namespace EventQueryResponse {
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
export interface EventRestoreResponse {
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
export interface EventUpsertResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface EventCreateParams {
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

export interface EventUpdateParams {
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

export interface EventListParams {
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

export interface EventDeleteParams {
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

export interface EventCountParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Scope the count to a specific list/app.
   */
  list_id?: string;
}

export interface EventDuplicateParams {
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

export interface EventFindParams {
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

export interface EventGetParams {
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

export interface EventQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: EventQueryParams.Query;

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

export namespace EventQueryParams {
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

export interface EventRestoreParams {
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

export interface EventUpsertParams {
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

Events.Grant = Grant;

export declare namespace Events {
  export {
    type Event as Event,
    type EventCreateResponse as EventCreateResponse,
    type EventUpdateResponse as EventUpdateResponse,
    type EventListResponse as EventListResponse,
    type EventCountResponse as EventCountResponse,
    type EventDuplicateResponse as EventDuplicateResponse,
    type EventFindResponse as EventFindResponse,
    type EventGetResponse as EventGetResponse,
    type EventQueryResponse as EventQueryResponse,
    type EventRestoreResponse as EventRestoreResponse,
    type EventUpsertResponse as EventUpsertResponse,
    type EventCreateParams as EventCreateParams,
    type EventUpdateParams as EventUpdateParams,
    type EventListParams as EventListParams,
    type EventDeleteParams as EventDeleteParams,
    type EventCountParams as EventCountParams,
    type EventDuplicateParams as EventDuplicateParams,
    type EventFindParams as EventFindParams,
    type EventGetParams as EventGetParams,
    type EventQueryParams as EventQueryParams,
    type EventRestoreParams as EventRestoreParams,
    type EventUpsertParams as EventUpsertParams,
  };

  export {
    Grant as Grant,
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
