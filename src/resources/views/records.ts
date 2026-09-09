// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Records extends APIResource {
  /**
   * List records selected by a view (filters and sorts applied; pinned record_order
   * overlaid first)
   */
  list(viewID: string, params: RecordListParams, options?: RequestOptions): APIPromise<RecordListResponse> {
    const { teamId = this._client.teamID, objectType, ...query } = params;
    return this._client.get(path`/v2/prism/${teamId}/${objectType}/views/${viewID}/records`, {
      query,
      ...options,
    });
  }

  /**
   * Pin a record to the view (append to record_order)
   */
  pin(objectID: string, params: RecordPinParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, viewId, 'Idempotency-Key': idempotencyKey } = params;
    return this._client.post(path`/v2/prism/${teamId}/${objectType}/views/${viewId}/records/${objectID}`, {
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Bulk reorder pinned records
   */
  reorder(viewID: string, params: RecordReorderParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/${objectType}/views/${viewID}/records`, {
      body,
      ...options,
      headers: buildHeaders([
        { Accept: '*/*', ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Unpin a record from the view
   */
  unpin(objectID: string, params: RecordUnpinParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, viewId } = params;
    return this._client.delete(path`/v2/prism/${teamId}/${objectType}/views/${viewId}/records/${objectID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface RecordListResponse {
  data: Array<{ [key: string]: unknown }>;

  /**
   * True if more records exist beyond this page.
   */
  has_more: boolean;

  /**
   * Opaque cursor for the next page; null when `has_more` is false.
   */
  next_cursor?: string | null;
}

export interface RecordListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';

  /**
   * Query param: Opaque cursor from a previous response's `next_cursor`. Pass it
   * back unchanged to fetch the next page. When set, `page` and `limit` are derived
   * from the cursor.
   */
  cursor?: string;

  /**
   * Query param
   */
  limit?: number;

  /**
   * Query param: Page number (1-based). Prefer `cursor`.
   */
  page?: number;
}

export interface RecordPinParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';

  /**
   * Path param
   */
  viewId: string;

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

export interface RecordReorderParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';

  /**
   * Body param
   */
  object_ids: Array<string>;

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

export interface RecordUnpinParams {
  teamId?: string;

  objectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';

  viewId: string;
}

export declare namespace Records {
  export {
    type RecordListResponse as RecordListResponse,
    type RecordListParams as RecordListParams,
    type RecordPinParams as RecordPinParams,
    type RecordReorderParams as RecordReorderParams,
    type RecordUnpinParams as RecordUnpinParams,
  };
}
