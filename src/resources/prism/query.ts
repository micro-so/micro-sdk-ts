// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Query extends APIResource {
  /**
   * Query v2
   */
  execute(
    objectType:
      | 'deal'
      | 'identity'
      | 'ai_chat_thread'
      | 'ai_chat_message'
      | 'document'
      | 'organization'
      | 'contact'
      | 'action'
      | 'event',
    params: QueryExecuteParams,
    options?: RequestOptions,
  ): APIPromise<QueryExecuteResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/${objectType}`, { body, ...options });
  }
}

export interface QueryExecuteResponse {
  data?: Array<unknown>;

  next_cursor?: string | null;

  total?: number;
}

export interface QueryExecuteParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: QueryExecuteParams.Query;

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

export namespace QueryExecuteParams {
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
     * Filters as [{ slug: { operator: value } }]. For select/multiselect properties,
     * values must be option slugs
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
  export { type QueryExecuteResponse as QueryExecuteResponse, type QueryExecuteParams as QueryExecuteParams };
}
