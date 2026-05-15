// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as PrismAPI from '../../prism';
import * as GrantAPI from './grant';
import { Grant, GrantGetParams, GrantGetResponse, GrantUpdateParams, GrantUpdateResponse } from './grant';
import { APIPromise } from '../../../../core/api-promise';
import { buildHeaders } from '../../../../internal/headers';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Actions extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);

  /**
   * Create object
   */
  create(
    params: ActionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(
    actionID: string,
    params: ActionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ActionUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/action/${actionID}`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    actionID: string,
    params: ActionDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/action/${actionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  bulkCreate(params: ActionBulkCreateParams, options?: RequestOptions): APIPromise<ActionBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/action/import`, { body, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    actionID: string,
    params: ActionDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionDuplicateResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action/${actionID}/duplicate`, options);
  }

  /**
   * Get object
   */
  get(
    actionID: string,
    params: ActionGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/action/${actionID}`, options);
  }

  /**
   * Query
   */
  query(params: ActionQueryParams, options?: RequestOptions): APIPromise<ActionQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/action`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    actionID: string,
    params: ActionRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ActionRestoreResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/action/${actionID}/restore`, options);
  }
}

export interface Action {
  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null. For select/multiselect properties, values may be option slugs
   * or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface ActionCreateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface ActionUpdateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface ActionBulkCreateResponse {
  results?: Array<ActionBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: ActionBulkCreateResponse.Summary;
}

export namespace ActionBulkCreateResponse {
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

export interface ActionDuplicateResponse {
  id?: string;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface ActionGetResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface ActionQueryResponse {
  data: Array<ActionQueryResponse.Data>;

  /**
   * True when the page returned the maximum number of rows; another page may exist.
   */
  has_more?: boolean;
}

export namespace ActionQueryResponse {
  /**
   * Object returned by reads (get/create/patch/restore). id is always present.
   */
  export interface Data {
    id: string;

    /**
     * Properties keyed by property slug.
     */
    default?: { [key: string]: unknown };

    list?: unknown;
  }
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface ActionRestoreResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface ActionCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  list?: unknown;
}

export interface ActionUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Properties keyed by property slug. Values can be strings, numbers,
   * booleans, arrays, or null. For select/multiselect properties, values may be
   * option slugs or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  /**
   * Body param
   */
  list?: unknown;
}

export interface ActionDeleteParams {
  teamId?: string;
}

export interface ActionBulkCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Array of objects to import with property values keyed by slug
   */
  objects: Array<PrismAPI.PrismObjectProperties>;

  /**
   * Body param
   */
  options?: ActionBulkCreateParams.Options;
}

export namespace ActionBulkCreateParams {
  export interface Options {
    /**
     * Whether deduplication should be case insensitive
     */
    caseInsensitive?: boolean;

    /**
     * Property slug to deduplicate on
     */
    dedupe_by?: string;

    /**
     * App/CRM ID for context (optional)
     */
    list_id?: string;
  }
}

export interface ActionDuplicateParams {
  teamId?: string;
}

export interface ActionGetParams {
  teamId?: string;
}

export interface ActionQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: ActionQueryParams.Query;

  /**
   * Body param
   */
  id?: string | Array<string>;

  /**
   * Body param
   */
  boxes?: Array<string>;

  /**
   * Body param
   */
  deleted?: boolean;

  /**
   * Body param
   */
  sources?: Array<string>;
}

export namespace ActionQueryParams {
  export interface Query {
    /**
     * Property slugs to select. Use dot notation for relationships (e.g.
     * attendee.contact.first_name)
     */
    select: Array<string>;

    /**
     * Logical operator for combining filters
     */
    combinator?: 'AND' | 'OR';

    /**
     * Filters as [{ slug: { operator: value } }]. For select/multiselect properties,
     * values may be option slugs or option UUIDs.
     */
    filter?: Array<{
      [key: string]:
        | Query.PrismQueryFilterEq
        | Query.PrismQueryFilterNe
        | Query.PrismQueryFilterLt
        | Query.PrismQueryFilterGt
        | Query.PrismQueryFilterLte
        | Query.PrismQueryFilterGte
        | Query.LikeRegex
        | Query.BeginsWith
        | Query.EndsWith
        | Query.NotContains
        | Query.Exists
        | Query.NotExists
        | Query.In
        | Query.NotIn;
    }>;

    limit?: number;

    list_id?: string;

    page?: number;

    /**
     * Sort order as [{ slug: direction }]. Array order determines sort priority
     */
    sort?: Array<{ [key: string]: 'asc' | 'desc' }>;
  }

  export namespace Query {
    export interface PrismQueryFilterEq {
      '=': string | boolean;
    }

    export interface PrismQueryFilterNe {
      '!=': string | boolean;
    }

    export interface PrismQueryFilterLt {
      '<': string;
    }

    export interface PrismQueryFilterGt {
      '>': string;
    }

    export interface PrismQueryFilterLte {
      '<=': string;
    }

    export interface PrismQueryFilterGte {
      '>=': string;
    }

    export interface LikeRegex {
      like_regex: string;
    }

    export interface BeginsWith {
      begins_with: string;
    }

    export interface EndsWith {
      ends_with: string;
    }

    export interface NotContains {
      not_contains: string;
    }

    export interface Exists {
      exists: boolean;
    }

    export interface NotExists {
      not_exists: boolean;
    }

    export interface In {
      in: Array<string>;
    }

    export interface NotIn {
      not_in: Array<string>;
    }
  }
}

export interface ActionRestoreParams {
  teamId?: string;
}

Actions.Grant = Grant;

export declare namespace Actions {
  export {
    type Action as Action,
    type ActionCreateResponse as ActionCreateResponse,
    type ActionUpdateResponse as ActionUpdateResponse,
    type ActionBulkCreateResponse as ActionBulkCreateResponse,
    type ActionDuplicateResponse as ActionDuplicateResponse,
    type ActionGetResponse as ActionGetResponse,
    type ActionQueryResponse as ActionQueryResponse,
    type ActionRestoreResponse as ActionRestoreResponse,
    type ActionCreateParams as ActionCreateParams,
    type ActionUpdateParams as ActionUpdateParams,
    type ActionDeleteParams as ActionDeleteParams,
    type ActionBulkCreateParams as ActionBulkCreateParams,
    type ActionDuplicateParams as ActionDuplicateParams,
    type ActionGetParams as ActionGetParams,
    type ActionQueryParams as ActionQueryParams,
    type ActionRestoreParams as ActionRestoreParams,
  };

  export {
    Grant as Grant,
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
