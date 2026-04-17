// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PrismAPI from './prism';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Metadata extends APIResource {
  /**
   * Get metadata properties by object type
   */
  properties(
    objectType: PrismAPI.ObjectType,
    params: MetadataPropertiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/metadata/properties/${teamId}/${objectType}`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface MetadataPropertiesParams {
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
  export { type MetadataPropertiesParams as MetadataPropertiesParams };
}
