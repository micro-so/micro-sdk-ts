// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
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
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.put(path`/v2/prism/${teamId}/action/${actionID}/grant`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
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
    return this._client.get(path`/v2/prism/${teamId}/action/${actionID}/grant`, options);
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

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
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
