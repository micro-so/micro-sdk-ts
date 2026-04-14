// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Query extends APIResource {
  /**
   * Query
   */
  executeQuery(
    objectType:
      | 'deal'
      | 'identity'
      | 'ai_chat_thread'
      | 'ai_chat_message'
      | 'document'
      | 'organization'
      | 'contact'
      | 'action',
    params: QueryExecuteQueryParams,
    options?: RequestOptions,
  ): APIPromise<QueryExecuteQueryResponse> {
    const { teamId, ...body } = params;
    return this._client.post(path`/v1/prism/query/${teamId}/${objectType}`, { body, ...options });
  }

  /**
   * Query v2
   */
  executeQueryV2(
    objectType:
      | 'deal'
      | 'identity'
      | 'ai_chat_thread'
      | 'ai_chat_message'
      | 'document'
      | 'organization'
      | 'contact'
      | 'action',
    params: QueryExecuteQueryV2Params,
    options?: RequestOptions,
  ): APIPromise<QueryExecuteQueryV2Response> {
    const { teamId, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/${objectType}`, { body, ...options });
  }
}

export interface QueryExecuteQueryResponse {
  /**
   * List of message records
   */
  data?: Array<unknown>;

  next_cursor?: string | null;

  total?: number;
}

export interface QueryExecuteQueryV2Response {
  data?: Array<unknown>;

  next_cursor?: string | null;

  total?: number;
}

export interface QueryExecuteQueryParams {
  /**
   * Path param
   */
  teamId: string;

  /**
   * Body param: Dynamic query configuration: at least one _\_view_select_ field is
   * required; filters and sorts are optional
   */
  query: QueryExecuteQueryParams.Query;

  /**
   * Body param
   */
  id?: string | Array<string>;

  /**
   * Body param
   */
  all?: boolean;

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
  limit?: number;

  /**
   * Body param
   */
  page?: number;

  /**
   * Body param
   */
  sources?: Array<string>;
}

export namespace QueryExecuteQueryParams {
  /**
   * Dynamic query configuration: at least one _\_view_select_ field is required;
   * filters and sorts are optional
   */
  export interface Query {
    /**
     * Logical operator for combining filters
     */
    combinator?: 'AND' | 'OR';

    crm_id?: string;

    team_id?: string;
  }
}

export interface QueryExecuteQueryV2Params {
  /**
   * Path param
   */
  teamId: string;

  /**
   * Body param
   */
  query: QueryExecuteQueryV2Params.Query;

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

export namespace QueryExecuteQueryV2Params {
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

    crm_id?: string;

    /**
     * Filters as [{ slug: { operator: value } }]
     */
    filter?: Array<{ [key: string]: { [key: string]: string | boolean | Array<string> } }>;

    limit?: number;

    page?: number;

    /**
     * Sort order as [{ slug: direction }]. Array order determines sort priority
     */
    sort?: Array<{ [key: string]: 'asc' | 'desc' }>;
  }
}

export declare namespace Query {
  export {
    type QueryExecuteQueryResponse as QueryExecuteQueryResponse,
    type QueryExecuteQueryV2Response as QueryExecuteQueryV2Response,
    type QueryExecuteQueryParams as QueryExecuteQueryParams,
    type QueryExecuteQueryV2Params as QueryExecuteQueryV2Params,
  };
}
