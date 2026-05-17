// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PrismAPI from '../prism';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Organizations extends APIResource {
  /**
   * Create object
   */
  create(
    params: OrganizationCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization`, { body, ...options });
  }

  /**
   * Patch object
   */
  update(
    organizationID: string,
    params: OrganizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/organization/${organizationID}`, { body, ...options });
  }

  /**
   * Delete object
   */
  delete(
    organizationID: string,
    params: OrganizationDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/prism/${teamId}/organization/${organizationID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Import multiple objects in batch. Properties are keyed by slug. Automatically
   * routes based on size: <100 records sync (immediate response), >=100 records
   * async (S3/Lambda with WebSocket progress)
   */
  bulkCreate(
    params: OrganizationBulkCreateParams,
    options?: RequestOptions,
  ): APIPromise<OrganizationBulkCreateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/organization/import`, { body, ...options });
  }

  /**
   * Duplicate object
   */
  duplicate(
    organizationID: string,
    params: OrganizationDuplicateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationDuplicateResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization/${organizationID}/duplicate`, options);
  }

  /**
   * Get object
   */
  get(
    organizationID: string,
    params: OrganizationGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationGetResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/organization/${organizationID}`, options);
  }

  /**
   * Query
   */
  query(params: OrganizationQueryParams, options?: RequestOptions): APIPromise<OrganizationQueryResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/organization`, { body, ...options });
  }

  /**
   * Restore object
   */
  restore(
    organizationID: string,
    params: OrganizationRestoreParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrganizationRestoreResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/prism/${teamId}/organization/${organizationID}/restore`, options);
  }
}

export interface Organization {
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
export interface OrganizationCreateResponse {
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
export interface OrganizationUpdateResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface OrganizationBulkCreateResponse {
  results?: Array<OrganizationBulkCreateResponse.Result>;

  status?: 'complete';

  summary?: OrganizationBulkCreateResponse.Summary;
}

export namespace OrganizationBulkCreateResponse {
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

export interface OrganizationDuplicateResponse {
  id?: string;
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationGetResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface OrganizationQueryResponse {
  data: Array<OrganizationQueryResponse.Data>;

  /**
   * True when the page returned the maximum number of rows; another page may exist.
   */
  has_more?: boolean;
}

export namespace OrganizationQueryResponse {
  /**
   * Row returned by the query endpoint. `id` is always present at the top level.
   * Selected property values are returned under `properties`, keyed by property
   * slug. Reference-typed values are returned as nested `{ id, properties }`
   * objects.
   */
  export interface Data {
    id: string;

    is_user_object?: boolean;

    /**
     * Selected property values keyed by property slug. For select/multiselect
     * properties, option slugs are returned. For reference properties, values are
     * nested `{ id, properties }` objects.
     */
    properties?: { [key: string]: unknown };

    source?: string | null;
  }
}

/**
 * Object returned by reads (get/create/patch/restore). id is always present.
 */
export interface OrganizationRestoreResponse {
  id: string;

  /**
   * Properties keyed by property slug.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

export interface OrganizationCreateParams {
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

export interface OrganizationUpdateParams {
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

export interface OrganizationDeleteParams {
  teamId?: string;
}

export interface OrganizationBulkCreateParams {
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
  options?: OrganizationBulkCreateParams.Options;
}

export namespace OrganizationBulkCreateParams {
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

export interface OrganizationDuplicateParams {
  teamId?: string;
}

export interface OrganizationGetParams {
  teamId?: string;
}

export interface OrganizationQueryParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: OrganizationQueryParams.Query;

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

export namespace OrganizationQueryParams {
  export interface Query {
    /**
     * Property slugs to select. Use dot notation for relationships (e.g.
     * attendee.contact.first_name). `id` is always returned at the top level of each
     * row and does not need to be selected.
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
        | Query.Contains
        | Query.BeginsWith
        | Query.EndsWith
        | Query.NotContains
        | Query.Exists
        | Query.NotExists
        | Query.In
        | Query.NotIn;
    }>;

    /**
     * Maximum number of rows to return. Capped server-side at 50; requests above the
     * cap are rejected.
     */
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

    export interface Contains {
      contains: string | boolean | Array<string>;
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

export interface OrganizationRestoreParams {
  teamId?: string;
}

export declare namespace Organizations {
  export {
    type Organization as Organization,
    type OrganizationCreateResponse as OrganizationCreateResponse,
    type OrganizationUpdateResponse as OrganizationUpdateResponse,
    type OrganizationBulkCreateResponse as OrganizationBulkCreateResponse,
    type OrganizationDuplicateResponse as OrganizationDuplicateResponse,
    type OrganizationGetResponse as OrganizationGetResponse,
    type OrganizationQueryResponse as OrganizationQueryResponse,
    type OrganizationRestoreResponse as OrganizationRestoreResponse,
    type OrganizationCreateParams as OrganizationCreateParams,
    type OrganizationUpdateParams as OrganizationUpdateParams,
    type OrganizationDeleteParams as OrganizationDeleteParams,
    type OrganizationBulkCreateParams as OrganizationBulkCreateParams,
    type OrganizationDuplicateParams as OrganizationDuplicateParams,
    type OrganizationGetParams as OrganizationGetParams,
    type OrganizationQueryParams as OrganizationQueryParams,
    type OrganizationRestoreParams as OrganizationRestoreParams,
  };
}
