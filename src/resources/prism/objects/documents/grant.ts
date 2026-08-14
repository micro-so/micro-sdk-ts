// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Grant extends APIResource {
  /**
   * Update grant
   *
   * @example
   * ```ts
   * const grant =
   *   await client.prism.objects.documents.grant.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    documentID: string,
    params: GrantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<GrantUpdateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.put(path`/v2/prism/${teamId}/document/${documentID}/grant`, {
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
   *
   * @example
   * ```ts
   * const grant =
   *   await client.prism.objects.documents.grant.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  get(
    documentID: string,
    params: GrantGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GrantGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/document/${documentID}/grant`, options);
  }
}

/**
 * The grants on a record. For `message`, also carries the entity ids of everyone
 * on the message, resolved from its address headers when the grant was written.
 * The id arrays are read-only and are null when participant resolution was
 * unavailable (for example the mailbox had no Gmail token at the time).
 */
export interface GrantUpdateResponse {
  contact_ids?: Array<string> | null;

  group_id?: { [key: string]: 'a' | 'r' | 'w' };

  identity_ids?: Array<string> | null;

  organization_ids?: Array<string> | null;

  /**
   * How much of the record the grant exposes. `metadata` shares only the record's
   * headers and participants; `full` shares its contents. Currently recorded on the
   * access row and returned on read — it is not yet enforced by the read path.
   * Applies to `message` grants; ignored for other object types.
   */
  share_level?: 'metadata' | 'full';

  team_id?: { [key: string]: 'a' | 'r' | 'w' };

  user_id?: { [key: string]: 'a' | 'r' | 'w' };
}

/**
 * The grants on a record. For `message`, also carries the entity ids of everyone
 * on the message, resolved from its address headers when the grant was written.
 * The id arrays are read-only and are null when participant resolution was
 * unavailable (for example the mailbox had no Gmail token at the time).
 */
export interface GrantGetResponse {
  contact_ids?: Array<string> | null;

  group_id?: { [key: string]: 'a' | 'r' | 'w' };

  identity_ids?: Array<string> | null;

  organization_ids?: Array<string> | null;

  /**
   * How much of the record the grant exposes. `metadata` shares only the record's
   * headers and participants; `full` shares its contents. Currently recorded on the
   * access row and returned on read — it is not yet enforced by the read path.
   * Applies to `message` grants; ignored for other object types.
   */
  share_level?: 'metadata' | 'full';

  team_id?: { [key: string]: 'a' | 'r' | 'w' };

  user_id?: { [key: string]: 'a' | 'r' | 'w' };
}

export interface GrantUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: How much of the record the grant exposes. `metadata` shares only the
   * record's headers and participants; `full` shares its contents. Currently
   * recorded on the access row and returned on read — it is not yet enforced by the
   * read path. Applies to `message` grants; ignored for other object types.
   */
  share_level?: 'metadata' | 'full';

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
   * Header param: A unique key (UUID or any opaque string up to 255 chars) for an
   * authenticated POST, PUT, or PATCH request. The server retains the initial claim
   * for 24 hours and replays a completed non-5xx response only when the method,
   * path, and request body all match. Reusing a non-expired key with a different
   * method, path, or body returns 409 `idempotency_key_mismatch`; reusing it after
   * expiry returns 409 `idempotency_key_stale`, so use a new key. Replays include
   * the `idempotent-replay: true` response header.
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
