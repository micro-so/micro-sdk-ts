// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as PrismAPI from '../../prism';
import * as GrantAPI from './grant';
import { Grant, GrantGetParams, GrantGetResponse, GrantUpdateParams, GrantUpdateResponse } from './grant';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Actions extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);

  /**
   * Create object
   */
  create(
    params: ActionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrismAPI.PrismObjectProperties> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(
    actionID: string,
    params: ActionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PrismAPI.PrismObjectProperties> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/action/${actionID}`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    actionID: string,
    params: ActionDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/action/${actionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  bulkCreate(params: ActionBulkCreateParams, options?: RequestOptions): APIPromise<ActionBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/action/import`, { body, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    actionID: string,
    params: ActionDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionDuplicateResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action/${actionID}/duplicate`, options);
  }

  /**
   * Get object
   */
  get(
    actionID: string,
    params: ActionGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrismAPI.PrismObjectProperties> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/action/${actionID}`, options);
  }

  /**
   * Query v2
   */
  query(params: ActionQueryParams, options?: RequestOptions): APIPromise<ActionQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/action`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    actionID: string,
    params: ActionRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PrismAPI.PrismObjectProperties> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action/${actionID}/restore`, options);
  }
}

export interface Action {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface ActionBulkCreateResponse {
  results?: Array<ActionBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: ActionBulkCreateResponse.Summary;
}

export namespace ActionBulkCreateResponse {
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

export interface ActionDuplicateResponse {
  id?: string;
}

export interface ActionQueryResponse {
  data?: Array<unknown>;

  total?: number;
}

export interface ActionCreateParams {
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

export interface ActionUpdateParams {
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

export interface ActionDeleteParams {
  teamId?: string;
}

export interface ActionBulkCreateParams {
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
  options?: ActionBulkCreateParams.Options;
}

export namespace ActionBulkCreateParams {
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

export interface ActionDuplicateParams {
  teamId?: string;
}

export interface ActionGetParams {
  teamId?: string;
}

export interface ActionQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: ActionQueryParams.Query;

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

export namespace ActionQueryParams {
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

export interface ActionRestoreParams {
  teamId?: string;
}

Actions.Grant = Grant;

export declare namespace Actions {
  export {
    type Action as Action,
    type ActionBulkCreateResponse as ActionBulkCreateResponse,
    type ActionDuplicateResponse as ActionDuplicateResponse,
    type ActionQueryResponse as ActionQueryResponse,
    type ActionCreateParams as ActionCreateParams,
    type ActionUpdateParams as ActionUpdateParams,
    type ActionDeleteParams as ActionDeleteParams,
    type ActionBulkCreateParams as ActionBulkCreateParams,
    type ActionDuplicateParams as ActionDuplicateParams,
    type ActionGetParams as ActionGetParams,
    type ActionQueryParams as ActionQueryParams,
    type ActionRestoreParams as ActionRestoreParams,
  };

  export {
    Grant as Grant,
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
