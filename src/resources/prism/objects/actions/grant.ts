// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Grant extends APIResource {
  /**
   * Update grant
   */
  update(
    actionID: string,
    params: GrantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GrantUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.put(path`/v2/prism/grant/${teamId}/action/${actionID}`, { body, ...options });
  }

  /**
   * Get grant
   */
  get(
    actionID: string,
    params: GrantGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GrantGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/grant/${teamId}/action/${actionID}`, options);
  }
}

export interface GrantUpdateResponse {
  team_group_id?: Array<{ [key: string]: 'a' | 'r' | 'w' }>;

  team_id?: { [key: string]: 'a' | 'r' | 'w' };

  user_id?: Array<{ [key: string]: 'a' | 'r' | 'w' }>;
}

export interface GrantGetResponse {
  team_group_id?: Array<{ [key: string]: 'a' | 'r' | 'w' }>;

  team_id?: { [key: string]: 'a' | 'r' | 'w' };

  user_id?: Array<{ [key: string]: 'a' | 'r' | 'w' }>;
}

export interface GrantUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

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

export interface GrantGetParams {
  teamId?: string;
}

export declare namespace Grant {
  export {
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
