// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as GrantAPI from './grant';
import { Grant, GrantGetParams, GrantGetResponse, GrantUpdateParams, GrantUpdateResponse } from './grant';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Events extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);

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

    source?: string | null;
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

    source?: string | null;
  }
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
   * Body param: Alternative location for the opaque cursor (sibling of `query`). Use
   * whichever feels more natural; if both are present, `query.cursor` wins.
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

Events.Grant = Grant;

export declare namespace Events {
  export {
    type Event as Event,
    type EventListResponse as EventListResponse,
    type EventCountResponse as EventCountResponse,
    type EventFindResponse as EventFindResponse,
    type EventGetResponse as EventGetResponse,
    type EventQueryResponse as EventQueryResponse,
    type EventListParams as EventListParams,
    type EventCountParams as EventCountParams,
    type EventFindParams as EventFindParams,
    type EventGetParams as EventGetParams,
    type EventQueryParams as EventQueryParams,
  };

  export {
    Grant as Grant,
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
