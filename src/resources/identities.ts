// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as PrismAPI from './prism/prism';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Identities extends APIResource {
  /**
   * Create Identity
   */
  create(
    params: IdentityCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<IdentityCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/identity`, { body, ...options });
  }

  /**
   * Update Identity
   */
  update(identityID: string, params: IdentityUpdateParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/identity/${identityID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List Identitys
   */
  list(params: IdentityListParams, options?: RequestOptions): APIPromise<IdentityListResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/identity`, { body, ...options });
  }

  /**
   * Delete Identity
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
   * Import Identitys
   */
  import(params: IdentityImportParams, options?: RequestOptions): APIPromise<IdentityImportResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/identity/import`, { body, ...options });
  }
}

export interface Identity {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface IdentityCreateResponse {
  id?: string;
}

export interface IdentityListResponse {
  data?: Array<unknown>;

  next_cursor?: string | null;

  total?: number;
}

export interface IdentityImportResponse {
  results?: Array<IdentityImportResponse.Result>;

  status?: 'complete';

  summary?: IdentityImportResponse.Summary;
}

export namespace IdentityImportResponse {
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
   * booleans, arrays, or null.
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
   * booleans, arrays, or null.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface IdentityListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: IdentityListParams.Query;

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

export namespace IdentityListParams {
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

export interface IdentityDeleteParams {
  teamId?: string;
}

export interface IdentityImportParams {
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
  options?: IdentityImportParams.Options;
}

export namespace IdentityImportParams {
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

export declare namespace Identities {
  export {
    type Identity as Identity,
    type IdentityCreateResponse as IdentityCreateResponse,
    type IdentityListResponse as IdentityListResponse,
    type IdentityImportResponse as IdentityImportResponse,
    type IdentityCreateParams as IdentityCreateParams,
    type IdentityUpdateParams as IdentityUpdateParams,
    type IdentityListParams as IdentityListParams,
    type IdentityDeleteParams as IdentityDeleteParams,
    type IdentityImportParams as IdentityImportParams,
  };
}
