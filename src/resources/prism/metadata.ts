// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PrismAPI from './prism';
import { APIPromise } from '../../core/api-promise';
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
  ): APIPromise<MetadataPropertiesResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/metadata/properties/${teamId}/${objectType}`, {
      query,
      ...options,
    });
  }
}

export type MetadataPropertiesResponse = { [key: string]: unknown };

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
  export {
    type MetadataPropertiesResponse as MetadataPropertiesResponse,
    type MetadataPropertiesParams as MetadataPropertiesParams,
  };
}
