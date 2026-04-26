// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GrantAPI from './grant';
import { Grant, GrantRetrieveGrantParams, GrantUpdateGrantParams } from './grant';
import * as MetadataAPI from './metadata';
import { Metadata, MetadataPropertiesParams } from './metadata';
import * as QueryAPI from './query';
import { Query, QueryExecuteParams, QueryExecuteResponse } from './query';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * The Prism query engine provides generic read/write access to any object type using a single unified API surface.
 */
export class Prism extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);
  query: QueryAPI.Query = new QueryAPI.Query(this._client);
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);

  /**
   * Create object
   */
  createObject(objectType: ObjectType, params: PrismCreateObjectParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, ...body } = params
    return this._client.post(path`/v2/prism/${teamId}/${objectType}`, { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  /**
   * Delete object
   */
  deleteObject(objectID: string, params: PrismDeleteObjectParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType } = params
    return this._client.delete(path`/v2/prism/${teamId}/${objectType}/${objectID}`, { ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  /**
   * Duplicate object
   */
  duplicateObject(objectID: string, params: PrismDuplicateObjectParams, options?: RequestOptions): APIPromise<PrismDuplicateObjectResponse> {
    const { teamId = this._client.teamID, objectType } = params
    return this._client.post(path`/v2/prism/${teamId}/${objectType}/${objectID}/duplicate`, options);
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  importObjects(objectType: 'identity' | 'organization' | 'contact' | 'action' | 'document' | 'deal', params: PrismImportObjectsParams, options?: RequestOptions): APIPromise<PrismImportObjectsResponse> {
    const { teamId = this._client.teamID, ...body } = params
    return this._client.post(path`/v2/prism/${teamId}/${objectType}/import`, { body, ...options });
  }

  /**
   * Patch object
   */
  patchObject(objectID: string, params: PrismPatchObjectParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, ...body } = params
    return this._client.patch(path`/v2/prism/${teamId}/${objectType}/${objectID}`, { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  /**
   * Restore object
   */
  restoreObject(objectID: string, params: PrismRestoreObjectParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType } = params
    return this._client.post(path`/v2/prism/${teamId}/${objectType}/${objectID}/restore`, { ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }
}

export type ObjectType = 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action' | 'event'

export interface PrismObjectProperties {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null.
   */
  default?: { [key: string]: unknown };

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
  teamId?: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param
   */
  crm?: unknown;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface PrismDeleteObjectParams {
  teamId?: string;

  objectType: ObjectType;
}

export interface PrismDuplicateObjectParams {
  teamId?: string;

  objectType: ObjectType;
}

export interface PrismImportObjectsParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Array of objects to import with property values keyed by slug
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
     * Property slug to deduplicate on
     */
    dedupe_by?: string;
  }
}

export interface PrismPatchObjectParams {
  /**
   * Path param
   */
  teamId?: string;

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
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  extended?: unknown;
}

export interface PrismRestoreObjectParams {
  teamId?: string;

  objectType: ObjectType;
}

Prism.Grant = Grant;
Prism.Query = Query;
Prism.Metadata = Metadata;

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
    type PrismRestoreObjectParams as PrismRestoreObjectParams
  };

  export {
    Grant as Grant,
    type GrantRetrieveGrantParams as GrantRetrieveGrantParams,
    type GrantUpdateGrantParams as GrantUpdateGrantParams
  };

  export {
    Query as Query,
    type QueryExecuteResponse as QueryExecuteResponse,
    type QueryExecuteParams as QueryExecuteParams
  };

  export {
    Metadata as Metadata,
    type MetadataPropertiesParams as MetadataPropertiesParams
  };
}
