// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrismAPI from '../prism';
import { APIPromise } from '../../../core/api-promise';
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
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization`, { body, ...options });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  bulkCreate(
    params: OrganizationBulkCreateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/import`, { body, ...options });
  }

  /**
   * Query v2
   */
  query(params: OrganizationQueryParams, options?: RequestOptions): APIPromise<OrganizationQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/organization`, { body, ...options });
  }
}

export interface Organization {
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
export interface OrganizationCreateResponse {
  id: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface OrganizationBulkCreateResponse {
  results?: Array<OrganizationBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: OrganizationBulkCreateResponse.Summary;
}

export namespace OrganizationBulkCreateResponse {
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

export interface OrganizationQueryResponse {
  data: Array<OrganizationQueryResponse.Data>;

  /**
   * True when the page returned the maximum number of rows; another page may exist.
   */
  has_more?: boolean;
}

export namespace OrganizationQueryResponse {
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

export interface OrganizationCreateParams {
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
}

export namespace OrganizationBulkCreateParams {
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
   * Body param
   */
  deleted?: boolean;

  /**
   * Body param
   */
  sources?: Array<string>;
}

export namespace OrganizationQueryParams {
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

export declare namespace Organizations {
  export {
    type Organization as Organization,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationBulkCreateResponse as OrganizationBulkCreateResponse,
    type OrganizationQueryResponse as OrganizationQueryResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationBulkCreateParams as OrganizationBulkCreateParams,
    type OrganizationQueryParams as OrganizationQueryParams,
  };
}
