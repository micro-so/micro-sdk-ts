// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrismAPI from '../prism';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Identities extends APIResource {
  /**
   * Create object
   */
  create(
    params: IdentityCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IdentityCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/identity`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(
    identityID: string,
    params: IdentityUpdateParams,
    options?: RequestOptions,
  ): APIPromise<IdentityUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/identity/${identityID}`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    identityID: string,
    params: IdentityDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/identity/${identityID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  bulkCreate(
    params: IdentityBulkCreateParams,
    options?: RequestOptions,
  ): APIPromise<IdentityBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/identity/import`, { body, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    identityID: string,
    params: IdentityDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IdentityDuplicateResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/identity/${identityID}/duplicate`, options);
  }

  /**
   * Get object
   */
  get(
    identityID: string,
    params: IdentityGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IdentityGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/identity/${identityID}`, options);
  }

  /**
   * Query
   */
  query(params: IdentityQueryParams, options?: RequestOptions): APIPromise<IdentityQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/identity`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    identityID: string,
    params: IdentityRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IdentityRestoreResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/identity/${identityID}/restore`, options);
  }
}

export interface Identity {
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
export interface IdentityCreateResponse {
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
export interface IdentityUpdateResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface IdentityBulkCreateResponse {
  results?: Array<IdentityBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: IdentityBulkCreateResponse.Summary;
}

export namespace IdentityBulkCreateResponse {
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

export interface IdentityDuplicateResponse {
  id?: string;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface IdentityGetResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface IdentityQueryResponse {
  data: Array<IdentityQueryResponse.Data>;

  /**
   * True when the page returned the maximum number of rows; another page may exist.
   */
  has_more?: boolean;
}

export namespace IdentityQueryResponse {
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
export interface IdentityRestoreResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface IdentityCreateParams {
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

export interface IdentityUpdateParams {
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

export interface IdentityDeleteParams {
  teamId?: string;
}

export interface IdentityBulkCreateParams {
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
  options?: IdentityBulkCreateParams.Options;
}

export namespace IdentityBulkCreateParams {
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

export interface IdentityDuplicateParams {
  teamId?: string;
}

export interface IdentityGetParams {
  teamId?: string;
}

export interface IdentityQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: IdentityQueryParams.Query;

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

export namespace IdentityQueryParams {
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

export interface IdentityRestoreParams {
  teamId?: string;
}

export declare namespace Identities {
  export {
    type Identity as Identity,
    type IdentityCreateResponse as IdentityCreateResponse,
    type IdentityUpdateResponse as IdentityUpdateResponse,
    type IdentityBulkCreateResponse as IdentityBulkCreateResponse,
    type IdentityDuplicateResponse as IdentityDuplicateResponse,
    type IdentityGetResponse as IdentityGetResponse,
    type IdentityQueryResponse as IdentityQueryResponse,
    type IdentityRestoreResponse as IdentityRestoreResponse,
    type IdentityCreateParams as IdentityCreateParams,
    type IdentityUpdateParams as IdentityUpdateParams,
    type IdentityDeleteParams as IdentityDeleteParams,
    type IdentityBulkCreateParams as IdentityBulkCreateParams,
    type IdentityDuplicateParams as IdentityDuplicateParams,
    type IdentityGetParams as IdentityGetParams,
    type IdentityQueryParams as IdentityQueryParams,
    type IdentityRestoreParams as IdentityRestoreParams,
  };
}
