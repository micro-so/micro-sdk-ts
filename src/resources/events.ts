// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Events extends APIResource {
  /**
   * List Events
   */
  list(params: EventListParams, options?: RequestOptions): APIPromise<EventListResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/prism/query/${teamId}/event`, { body, ...options });
  }
}

export interface Event {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export interface EventListResponse {
  data?: Array<unknown>;

  next_cursor?: string | null;

  total?: number;
}

export interface EventListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  query: EventListParams.Query;

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

export namespace EventListParams {
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

export declare namespace Events {
  export {
    type Event as Event,
    type EventListResponse as EventListResponse,
    type EventListParams as EventListParams,
  };
}
