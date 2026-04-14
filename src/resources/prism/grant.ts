// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PrismAPI from './prism';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Grant extends APIResource {
  /**
   * Get grant
   */
  retrieveGrant(
    objectID: string,
    params: GrantRetrieveGrantParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID, objectType } = params;
    return this._client.get(path`/v1/prism/grant/${teamId}/${objectType}/${objectID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Update grant
   */
  updateGrant(objectID: string, params: GrantUpdateGrantParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, ...body } = params;
    return this._client.put(path`/v1/prism/grant/${teamId}/${objectType}/${objectID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface GrantRetrieveGrantParams {
  teamId?: string;

  objectType: PrismAPI.ObjectType;
}

export interface GrantUpdateGrantParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType: PrismAPI.ObjectType;

  /**
   * Body param
   */
  team_group_id?: Array<{ [key: string]: 'a' | 'r' | 'w' }>;

  /**
   * Body param
   */
  team_id?: { [key: string]: 'a' | 'r' | 'w' };

  /**
   * Body param
   */
  user_id?: Array<{ [key: string]: 'a' | 'r' | 'w' }>;
}

export declare namespace Grant {
  export {
    type GrantRetrieveGrantParams as GrantRetrieveGrantParams,
    type GrantUpdateGrantParams as GrantUpdateGrantParams,
  };
}
