// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrismAPI from '../prism';
import { APIPromise } from '../../../core/api-promise';
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
   * Query v2
   */
  query(params: ContactQueryParams, options?: RequestOptions): APIPromise<ContactQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/contact`, { body, ...options });
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

export declare namespace Contacts {
  export {
    type Contact as Contact,
    type ContactCreateResponse as ContactCreateResponse,
    type ContactBulkCreateResponse as ContactBulkCreateResponse,
    type ContactQueryResponse as ContactQueryResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactBulkCreateParams as ContactBulkCreateParams,
    type ContactQueryParams as ContactQueryParams,
  };
}
