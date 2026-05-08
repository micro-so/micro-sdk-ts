// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrismAPI from '../prism';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Contacts extends APIResource {
  /**
   * Create object
   */
  create(
    params: ContactCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/contact`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(
    contactID: string,
    params: ContactUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ContactUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/contact/${contactID}`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    contactID: string,
    params: ContactDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/contact/${contactID}`, {
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
    params: ContactBulkCreateParams,
    options?: RequestOptions,
  ): APIPromise<ContactBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/contact/import`, { body, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    contactID: string,
    params: ContactDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactDuplicateResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/contact/${contactID}/duplicate`, options);
  }

  /**
   * Get object
   */
  get(
    contactID: string,
    params: ContactGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/contact/${contactID}`, options);
  }

  /**
   * Query
   */
  query(params: ContactQueryParams, options?: RequestOptions): APIPromise<ContactQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/contact`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    contactID: string,
    params: ContactRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactRestoreResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/contact/${contactID}/restore`, options);
  }
}

export interface Contact {
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
export interface ContactCreateResponse {
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
export interface ContactUpdateResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface ContactBulkCreateResponse {
  results?: Array<ContactBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: ContactBulkCreateResponse.Summary;
}

export namespace ContactBulkCreateResponse {
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

export interface ContactDuplicateResponse {
  id?: string;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface ContactGetResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface ContactQueryResponse {
  data: Array<ContactQueryResponse.Data>;

  /**
   * True when the page returned the maximum number of rows; another page may exist.
   */
  has_more?: boolean;
}

export namespace ContactQueryResponse {
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
export interface ContactRestoreResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface ContactCreateParams {
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

export interface ContactUpdateParams {
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

export interface ContactDeleteParams {
  teamId?: string;
}

export interface ContactBulkCreateParams {
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
  options?: ContactBulkCreateParams.Options;
}

export namespace ContactBulkCreateParams {
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

export interface ContactDuplicateParams {
  teamId?: string;
}

export interface ContactGetParams {
  teamId?: string;
}

export interface ContactQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: ContactQueryParams.Query;

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

export namespace ContactQueryParams {
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

export interface ContactRestoreParams {
  teamId?: string;
}

export declare namespace Contacts {
  export {
    type Contact as Contact,
    type ContactCreateResponse as ContactCreateResponse,
    type ContactUpdateResponse as ContactUpdateResponse,
    type ContactBulkCreateResponse as ContactBulkCreateResponse,
    type ContactDuplicateResponse as ContactDuplicateResponse,
    type ContactGetResponse as ContactGetResponse,
    type ContactQueryResponse as ContactQueryResponse,
    type ContactRestoreResponse as ContactRestoreResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactDeleteParams as ContactDeleteParams,
    type ContactBulkCreateParams as ContactBulkCreateParams,
    type ContactDuplicateParams as ContactDuplicateParams,
    type ContactGetParams as ContactGetParams,
    type ContactQueryParams as ContactQueryParams,
    type ContactRestoreParams as ContactRestoreParams,
  };
}
