// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GrantAPI from './grant';
import { Grant, GrantRetrieveGrantParams, GrantUpdateGrantParams } from './grant';
import * as QueryAPI from './query';
import {
  Query,
  QueryExecuteQueryParams,
  QueryExecuteQueryResponse,
  QueryExecuteQueryV2Params,
  QueryExecuteQueryV2Response,
} from './query';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Prism extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);
  query: QueryAPI.Query = new QueryAPI.Query(this._client);

  /**
   * Create object
   */
  createObject(
    objectType: ObjectType,
    params: PrismCreateObjectParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId, ...body } = params;
    return this._client.post(path`/v1/prism/${teamId}/${objectType}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Delete object
   */
  deleteObject(
    objectID: string,
    params: PrismDeleteObjectParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId, objectType } = params;
    return this._client.delete(path`/v1/prism/${teamId}/${objectType}/${objectID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Duplicate object
   */
  duplicateObject(
    objectID: string,
    params: PrismDuplicateObjectParams,
    options?: RequestOptions,
  ): APIPromise<PrismDuplicateObjectResponse> {
    const { teamId, objectType } = params;
    return this._client.post(path`/v1/prism/${teamId}/${objectType}/${objectID}/duplicate`, options);
  }

  /**
   * Import multiple objects in batch. Automatically routes based on size: <100
   * records sync (immediate response), >=100 records async (S3/Lambda with WebSocket
   * progress)
   */
  importObjects(
    objectType: 'identity' | 'organization' | 'contact' | 'action' | 'document' | 'deal',
    params: PrismImportObjectsParams,
    options?: RequestOptions,
  ): APIPromise<PrismImportObjectsResponse> {
    const { teamId, ...body } = params;
    return this._client.post(path`/v1/prism/${teamId}/${objectType}/import`, { body, ...options });
  }

  /**
   * Patch object
   */
  patchObject(objectID: string, params: PrismPatchObjectParams, options?: RequestOptions): APIPromise<void> {
    const { teamId, objectType, ...body } = params;
    return this._client.patch(path`/v1/prism/${teamId}/${objectType}/${objectID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Restore object
   */
  restoreObject(
    objectID: string,
    params: PrismRestoreObjectParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId, objectType } = params;
    return this._client.post(path`/v1/prism/${teamId}/${objectType}/${objectID}/restore`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ObjectType = 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action';

export interface PrismObjectProperties {
  id?: string;

  crm?: unknown;

  default?: unknown;

  extended?: unknown;
}

export interface PrismDuplicateObjectResponse {
  id?: string;
}

export interface PrismImportObjectsResponse {
  results?: Array<PrismImportObjectsResponse.Result>;

  status?: 'complete';

  summary?: PrismImportObjectsResponse.Summary;
}

export namespace PrismImportObjectsResponse {
  export interface Result {
    id?: string | null;

    created?: boolean;

    error?: string;

    existing?: boolean;
  }

  export interface Summary {
    created?: number;

    errors?: number;

    existing?: number;

    total?: number;
  }
}

export interface PrismCreateObjectParams {
  /**
   * Path param
   */
  teamId: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param
   */
  crm?: unknown;

  /**
   * Body param
   */
  default?: unknown;

  /**
   * Body param
   */
  extended?: unknown;
}

export interface PrismDeleteObjectParams {
  teamId: string;

  objectType: ObjectType;
}

export interface PrismDuplicateObjectParams {
  teamId: string;

  objectType: ObjectType;
}

export interface PrismImportObjectsParams {
  /**
   * Path param
   */
  teamId: string;

  /**
   * Body param: Array of objects to import with their property values
   */
  objects: Array<PrismObjectProperties>;

  /**
   * Body param
   */
  options?: PrismImportObjectsParams.Options;
}

export namespace PrismImportObjectsParams {
  export interface Options {
    /**
     * Whether deduplication should be case insensitive
     */
    caseInsensitive?: boolean;

    /**
     * App/CRM ID for context (optional)
     */
    crm_id?: string;

    /**
     * Property definition ID to deduplicate on
     */
    dedupe_by?: string;

    /**
     * Type of the deduplication property
     */
    dedupe_type?: 'str' | 'multi_str' | 'multiref_contact';
  }
}

export interface PrismPatchObjectParams {
  /**
   * Path param
   */
  teamId: string;

  /**
   * Path param
   */
  objectType: ObjectType;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param
   */
  crm?: unknown;

  /**
   * Body param
   */
  default?: unknown;

  /**
   * Body param
   */
  extended?: unknown;
}

export interface PrismRestoreObjectParams {
  teamId: string;

  objectType: ObjectType;
}

Prism.Grant = Grant;
Prism.Query = Query;

export declare namespace Prism {
  export {
    type ObjectType as ObjectType,
    type PrismObjectProperties as PrismObjectProperties,
    type PrismDuplicateObjectResponse as PrismDuplicateObjectResponse,
    type PrismImportObjectsResponse as PrismImportObjectsResponse,
    type PrismCreateObjectParams as PrismCreateObjectParams,
    type PrismDeleteObjectParams as PrismDeleteObjectParams,
    type PrismDuplicateObjectParams as PrismDuplicateObjectParams,
    type PrismImportObjectsParams as PrismImportObjectsParams,
    type PrismPatchObjectParams as PrismPatchObjectParams,
    type PrismRestoreObjectParams as PrismRestoreObjectParams,
  };

  export {
    Grant as Grant,
    type GrantRetrieveGrantParams as GrantRetrieveGrantParams,
    type GrantUpdateGrantParams as GrantUpdateGrantParams,
  };

  export {
    Query as Query,
    type QueryExecuteQueryResponse as QueryExecuteQueryResponse,
    type QueryExecuteQueryV2Response as QueryExecuteQueryV2Response,
    type QueryExecuteQueryParams as QueryExecuteQueryParams,
    type QueryExecuteQueryV2Params as QueryExecuteQueryV2Params,
  };
}
