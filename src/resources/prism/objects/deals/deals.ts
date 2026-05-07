// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as PrismAPI from '../../prism';
import * as GrantAPI from './grant';
import { Grant, GrantGetParams, GrantGetResponse, GrantUpdateParams, GrantUpdateResponse } from './grant';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Deals extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);

  /**
   * Create object
   */
  create(
    params: DealCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/deal`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(dealID: string, params: DealUpdateParams, options?: RequestOptions): APIPromise<DealUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/deal/${dealID}`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    dealID: string,
    params: DealDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/deal/${dealID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  bulkCreate(params: DealBulkCreateParams, options?: RequestOptions): APIPromise<DealBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/deal/import`, { body, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    dealID: string,
    params: DealDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealDuplicateResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/deal/${dealID}/duplicate`, options);
  }

  /**
   * Get object
   */
  get(
    dealID: string,
    params: DealGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/deal/${dealID}`, options);
  }

  /**
   * Query v2
   */
  query(params: DealQueryParams, options?: RequestOptions): APIPromise<DealQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/deal`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    dealID: string,
    params: DealRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealRestoreResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/deal/${dealID}/restore`, options);
  }
}

export interface Deal {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null. For select/multiselect properties, values may be option slugs
   * or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface DealCreateResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface DealUpdateResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface DealBulkCreateResponse {
  results?: Array<DealBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: DealBulkCreateResponse.Summary;
}

export namespace DealBulkCreateResponse {
  export interface Result {
    id?: string | null;

    created?: boolean;

    error?: string;

    existing?: boolean;
  }

  export interface Summary {
    created?: number;

    errors?: number;

    existing?: number;

    total?: number;
  }
}

export interface DealDuplicateResponse {
  id?: string;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface DealGetResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface DealQueryResponse {
  data: Array<DealQueryResponse.Data>;

  /**
   * True when the page returned the maximum number of rows; another page may exist.
   */
  has_more?: boolean;
}

export namespace DealQueryResponse {
  /**
   * Object returned by reads (get/create/patch/restore). id is always present.
   */
  export interface Data {
    id: string;

    crm?: unknown;

    /**
     * Properties keyed by property slug.
     */
    default?: { [key: string]: unknown };

    extended?: unknown;
  }
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface DealRestoreResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface DealCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param
   */
  crm?: unknown;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface DealUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param
   */
  crm?: unknown;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface DealDeleteParams {
  teamId?: string;
}

export interface DealBulkCreateParams {
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
  options?: DealBulkCreateParams.Options;
}

export namespace DealBulkCreateParams {
  export interface Options {
    /**
     * Whether deduplication should be case insensitive
     */
    caseInsensitive?: boolean;

    /**
     * App/CRM ID for context (optional)
     */
    crm_id?: string;

    /**
     * Property slug to deduplicate on
     */
    dedupe_by?: string;
  }
}

export interface DealDuplicateParams {
  teamId?: string;
}

export interface DealGetParams {
  teamId?: string;
}

export interface DealQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: DealQueryParams.Query;

  /**
   * Body param
   */
  id?: string | Array<string>;

  /**
   * Body param
   */
  boxes?: Array<string>;

  /**
   * Body param
   */
  deleted?: boolean;

  /**
   * Body param
   */
  sources?: Array<string>;
}

export namespace DealQueryParams {
  export interface Query {
    /**
     * Property slugs to select. Use dot notation for relationships (e.g.
     * attendee.contact.first_name)
     */
    select: Array<string>;

    /**
     * Logical operator for combining filters
     */
    combinator?: 'AND' | 'OR';

    crm_id?: string;

    /**
     * Filters as [{ slug: { operator: value } }]. For select/multiselect properties,
     * values may be option slugs or option UUIDs.
     */
    filter?: Array<{ [key: string]: { [key: string]: string | boolean | Array<string> } }>;

    limit?: number;

    page?: number;

    /**
     * Sort order as [{ slug: direction }]. Array order determines sort priority
     */
    sort?: Array<{ [key: string]: 'asc' | 'desc' }>;
  }
}

export interface DealRestoreParams {
  teamId?: string;
}

Deals.Grant = Grant;

export declare namespace Deals {
  export {
    type Deal as Deal,
    type DealCreateResponse as DealCreateResponse,
    type DealUpdateResponse as DealUpdateResponse,
    type DealBulkCreateResponse as DealBulkCreateResponse,
    type DealDuplicateResponse as DealDuplicateResponse,
    type DealGetResponse as DealGetResponse,
    type DealQueryResponse as DealQueryResponse,
    type DealRestoreResponse as DealRestoreResponse,
    type DealCreateParams as DealCreateParams,
    type DealUpdateParams as DealUpdateParams,
    type DealDeleteParams as DealDeleteParams,
    type DealBulkCreateParams as DealBulkCreateParams,
    type DealDuplicateParams as DealDuplicateParams,
    type DealGetParams as DealGetParams,
    type DealQueryParams as DealQueryParams,
    type DealRestoreParams as DealRestoreParams,
  };

  export {
    Grant as Grant,
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
