// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Metadata extends APIResource {
  /**
   * Get metadata properties by object type
   */
  list(
    objectType: 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event',
    params: MetadataListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetadataListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/metadata/properties/${teamId}/${objectType}`, {
      query,
      ...options,
    });
  }
}

export type MetadataListResponse = { [key: string]: unknown };

export interface MetadataListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param
   */
  autofill?: boolean;

  /**
   * Query param
   */
  crmId?: string;

  /**
   * Query param
   */
  term?: string;
}

export declare namespace Metadata {
  export { type MetadataListResponse as MetadataListResponse, type MetadataListParams as MetadataListParams };
}
