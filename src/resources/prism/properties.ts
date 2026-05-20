// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Properties extends APIResource {
  /**
   * Get metadata properties by object type
   */
  list(
    objectType:
      | 'deal'
      | 'identity'
      | 'ai_chat_thread'
      | 'ai_chat_message'
      | 'document'
      | 'action'
      | 'event'
      | 'organization'
      | 'contact',
    params: PropertyListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PropertyListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/${objectType}/properties`, { query, ...options });
  }

  /**
   * Get metadata properties
   */
  listAll(
    params: PropertyListAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PropertyListAllResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/properties`, { query, ...options });
  }
}

/**
 * Property definitions keyed by object type, then by property definition id
 * (UUID). When the request scopes to a single object type, only that key is
 * present.
 */
export type PropertyListResponse = { [key: string]: unknown };

/**
 * Property definitions keyed by object type, then by property definition id
 * (UUID). When the request scopes to a single object type, only that key is
 * present.
 */
export type PropertyListAllResponse = { [key: string]: unknown };

export interface PropertyListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param
   */
  autofill?: boolean;

  /**
   * Query param: Scope properties to a specific list/app.
   */
  list_id?: string;

  /**
   * Query param
   */
  term?: string;
}

export interface PropertyListAllParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param
   */
  autofill?: boolean;

  /**
   * Query param: Scope properties to a specific list/app.
   */
  list_id?: string;

  /**
   * Query param
   */
  term?: string;
}

export declare namespace Properties {
  export {
    type PropertyListResponse as PropertyListResponse,
    type PropertyListAllResponse as PropertyListAllResponse,
    type PropertyListParams as PropertyListParams,
    type PropertyListAllParams as PropertyListAllParams,
  };
}
