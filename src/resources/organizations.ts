// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PrismAPI from './prism/prism';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Organizations extends APIResource {
  /**
   * Create object
   */
  create(
    params: OrganizationCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrismAPI.PrismObjectProperties> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(
    organizationID: string,
    params: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PrismAPI.PrismObjectProperties> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/organization/${organizationID}`, { body, ...options });
  }

  /**
   * Query v2
   */
  list(params: OrganizationListParams, options?: RequestOptions): APIPromise<OrganizationListResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/organization`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    organizationID: string,
    params: OrganizationDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/organization/${organizationID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  import(params: OrganizationImportParams, options?: RequestOptions): APIPromise<OrganizationImportResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/import`, { body, ...options });
  }
}

export interface Organization {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface OrganizationListResponse {
  data?: Array<unknown>;

  total?: number;
}

export interface OrganizationImportResponse {
  results?: Array<OrganizationImportResponse.Result>;

  status?: 'complete';

  summary?: OrganizationImportResponse.Summary;
}

export namespace OrganizationImportResponse {
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
   * booleans, arrays, or null.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface OrganizationUpdateParams {
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
   * booleans, arrays, or null.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface OrganizationListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: OrganizationListParams.Query;

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

export namespace OrganizationListParams {
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
     * values must be option slugs
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

export interface OrganizationDeleteParams {
  teamId?: string;
}

export interface OrganizationImportParams {
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
  options?: OrganizationImportParams.Options;
}

export namespace OrganizationImportParams {
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

export declare namespace Organizations {
  export {
    type Organization as Organization,
    type OrganizationListResponse as OrganizationListResponse,
    type OrganizationImportResponse as OrganizationImportResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationListParams as OrganizationListParams,
    type OrganizationDeleteParams as OrganizationDeleteParams,
    type OrganizationImportParams as OrganizationImportParams,
  };
}
