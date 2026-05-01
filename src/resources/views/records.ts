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
    const { teamId = this._client.teamID, viewObjectType, ...query } = params;
    return this._client.get(path`/v2/prism/${teamId}/view/${viewObjectType}/${viewID}/records`, {
      query,
      ...options,
    });
  }

  /**
   * Pin a record to the view (append to record_order)
   */
  pin(objectID: string, params: RecordPinParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, viewObjectType, viewId } = params;
    return this._client.post(path`/v2/prism/${teamId}/view/${viewObjectType}/${viewId}/records/${objectID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Bulk reorder pinned records
   */
  reorder(viewID: string, params: RecordReorderParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, viewObjectType, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/view/${viewObjectType}/${viewID}/records`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Unpin a record from the view
   */
  unpin(objectID: string, params: RecordUnpinParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, viewObjectType, viewId } = params;
    return this._client.delete(
      path`/v2/prism/${teamId}/view/${viewObjectType}/${viewId}/records/${objectID}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }
}

export type RecordListResponse = Array<{ [key: string]: unknown }>;

export interface RecordListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  viewObjectType: 'action' | 'deal' | 'document' | 'event' | 'identity' | 'organization';

  /**
   * Query param
   */
  limit?: number;

  /**
   * Query param
   */
  page?: number;
}

export interface RecordPinParams {
  teamId?: string;

  viewObjectType: 'action' | 'deal' | 'document' | 'event' | 'identity' | 'organization';

  viewId: string;
}

export interface RecordReorderParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  viewObjectType: 'action' | 'deal' | 'document' | 'event' | 'identity' | 'organization';

  /**
   * Body param
   */
  object_ids: Array<string>;
}

export interface RecordUnpinParams {
  teamId?: string;

  viewObjectType: 'action' | 'deal' | 'document' | 'event' | 'identity' | 'organization';

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
