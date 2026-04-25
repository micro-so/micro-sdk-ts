// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Actions extends APIResource {
  /**
   * Create Action
   */
  create(
    params: ActionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action`, { body, ...options });
  }

  /**
   * Update Action
   */
  update(actionID: string, params: ActionUpdateParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/action/${actionID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List Actions
   */
  list(params: ActionListParams, options?: RequestOptions): APIPromise<ActionListResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/action`, { body, ...options });
  }

  /**
   * Delete Action
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
}

export interface Action {
  id?: string;

  crm?: unknown;

  default?: unknown;

  extended?: unknown;
}

export interface ActionCreateResponse {
  id?: string;
}

export interface ActionListResponse {
  data?: Array<unknown>;

  next_cursor?: string | null;

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
   * Body param
   */
  default?: unknown;

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
   * Body param
   */
  default?: unknown;

  /**
   * Body param
   */
  extended?: unknown;
}

export interface ActionListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: ActionListParams.Query;

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

export namespace ActionListParams {
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
     * Filters as [{ slug: { operator: value } }]
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

export interface ActionDeleteParams {
  teamId?: string;
}

export declare namespace Actions {
  export {
    type Action as Action,
    type ActionCreateResponse as ActionCreateResponse,
    type ActionListResponse as ActionListResponse,
    type ActionCreateParams as ActionCreateParams,
    type ActionUpdateParams as ActionUpdateParams,
    type ActionListParams as ActionListParams,
    type ActionDeleteParams as ActionDeleteParams,
  };
}
