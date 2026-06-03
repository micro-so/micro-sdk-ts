// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RecordsAPI from './records';
import {
  RecordListParams,
  RecordListResponse,
  RecordPinParams,
  RecordReorderParams,
  RecordUnpinParams,
  Records as RecordsAPIRecords,
} from './records';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Views extends APIResource {
  records: RecordsAPI.Records = new RecordsAPI.Records(this._client);

  /**
   * Create a view bundle (view + select/filter/sort)
   */
  create(
    viewObjectType:
      | 'comment'
      | 'action'
      | 'deal'
      | 'engagement'
      | 'document'
      | 'event'
      | 'identity'
      | 'organization',
    params: ViewCreateParams,
    options?: RequestOptions,
  ): APIPromise<ViewCreateResponse> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/${viewObjectType}/views`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a view bundle (select/filter/sort arrays are replaced wholesale when
   * supplied)
   */
  update(viewID: string, params: ViewUpdateParams, options?: RequestOptions): APIPromise<ViewUpdateResponse> {
    const {
      teamId = this._client.teamID,
      viewObjectType,
      'Idempotency-Key': idempotencyKey,
      ...body
    } = params;
    return this._client.patch(path`/v2/prism/${teamId}/${viewObjectType}/views/${viewID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a view bundle
   */
  delete(viewID: string, params: ViewDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, viewObjectType } = params;
    return this._client.delete(path`/v2/prism/${teamId}/${viewObjectType}/views/${viewID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns the view bundle. Pass `?include=records` to also fetch a page of records
   * selected by the view in the same call; the response is then wrapped as
   * `{view, records}`.
   */
  get(viewID: string, params: ViewGetParams, options?: RequestOptions): APIPromise<ViewGetResponse> {
    const { teamId = this._client.teamID, viewObjectType, ...query } = params;
    return this._client.get(path`/v2/prism/${teamId}/${viewObjectType}/views/${viewID}`, {
      query,
      ...options,
    });
  }
}

/**
 * A view (saved configuration for displaying records of a given object type) plus
 * its select/filter/sort children. Properties in select/filter/sort are referenced
 * by slug.
 */
export interface ViewCreateResponse {
  name: string;

  view_type: string;

  id?: string;

  aggregation_prop_def_id?: string | null;

  aggregation_type?: string | null;

  column_layout?: { [key: string]: unknown } | null;

  combinator?: 'AND' | 'OR';

  created_at?: string;

  /**
   * Each entry is { slug: { comparator: value } }
   */
  filter?: Array<{ [key: string]: unknown }>;

  /**
   * Property slug to group by
   */
  group_by?: string | null;

  group_hidden_option_ids?: Array<unknown> | unknown | null;

  group_hide_empty?: boolean | null;

  group_sort?: string | null;

  icon?: string | null;

  list_id?: string | null;

  /**
   * Property slugs (dot-paths permitted for refs)
   */
  select?: Array<string>;

  /**
   * Each entry is { slug: 'asc' | 'desc' }
   */
  sort?: Array<{ [key: string]: unknown }>;

  sort_order?: number | null;

  team_id?: string | null;

  updated_at?: string | null;

  user_id?: string | null;
}

/**
 * A view (saved configuration for displaying records of a given object type) plus
 * its select/filter/sort children. Properties in select/filter/sort are referenced
 * by slug.
 */
export interface ViewUpdateResponse {
  name: string;

  view_type: string;

  id?: string;

  aggregation_prop_def_id?: string | null;

  aggregation_type?: string | null;

  column_layout?: { [key: string]: unknown } | null;

  combinator?: 'AND' | 'OR';

  created_at?: string;

  /**
   * Each entry is { slug: { comparator: value } }
   */
  filter?: Array<{ [key: string]: unknown }>;

  /**
   * Property slug to group by
   */
  group_by?: string | null;

  group_hidden_option_ids?: Array<unknown> | unknown | null;

  group_hide_empty?: boolean | null;

  group_sort?: string | null;

  icon?: string | null;

  list_id?: string | null;

  /**
   * Property slugs (dot-paths permitted for refs)
   */
  select?: Array<string>;

  /**
   * Each entry is { slug: 'asc' | 'desc' }
   */
  sort?: Array<{ [key: string]: unknown }>;

  sort_order?: number | null;

  team_id?: string | null;

  updated_at?: string | null;

  user_id?: string | null;
}

/**
 * A view (saved configuration for displaying records of a given object type) plus
 * its select/filter/sort children. Properties in select/filter/sort are referenced
 * by slug.
 */
export type ViewGetResponse = ViewGetResponse.ViewBundle | ViewGetResponse.ViewBundleWithRecords;

export namespace ViewGetResponse {
  /**
   * A view (saved configuration for displaying records of a given object type) plus
   * its select/filter/sort children. Properties in select/filter/sort are referenced
   * by slug.
   */
  export interface ViewBundle {
    name: string;

    view_type: string;

    id?: string;

    aggregation_prop_def_id?: string | null;

    aggregation_type?: string | null;

    column_layout?: { [key: string]: unknown } | null;

    combinator?: 'AND' | 'OR';

    created_at?: string;

    /**
     * Each entry is { slug: { comparator: value } }
     */
    filter?: Array<{ [key: string]: unknown }>;

    /**
     * Property slug to group by
     */
    group_by?: string | null;

    group_hidden_option_ids?: Array<unknown> | unknown | null;

    group_hide_empty?: boolean | null;

    group_sort?: string | null;

    icon?: string | null;

    list_id?: string | null;

    /**
     * Property slugs (dot-paths permitted for refs)
     */
    select?: Array<string>;

    /**
     * Each entry is { slug: 'asc' | 'desc' }
     */
    sort?: Array<{ [key: string]: unknown }>;

    sort_order?: number | null;

    team_id?: string | null;

    updated_at?: string | null;

    user_id?: string | null;
  }

  /**
   * Returned by `GET /views/{viewId}?include=records`. Same `records` shape as the
   * standalone list-view-records endpoint.
   */
  export interface ViewBundleWithRecords {
    records: ViewBundleWithRecords.Records;

    /**
     * A view (saved configuration for displaying records of a given object type) plus
     * its select/filter/sort children. Properties in select/filter/sort are referenced
     * by slug.
     */
    view: ViewBundleWithRecords.View;
  }

  export namespace ViewBundleWithRecords {
    export interface Records {
      data: Array<{ [key: string]: unknown }>;

      has_more: boolean;

      next_cursor?: string | null;
    }

    /**
     * A view (saved configuration for displaying records of a given object type) plus
     * its select/filter/sort children. Properties in select/filter/sort are referenced
     * by slug.
     */
    export interface View {
      name: string;

      view_type: string;

      id?: string;

      aggregation_prop_def_id?: string | null;

      aggregation_type?: string | null;

      column_layout?: { [key: string]: unknown } | null;

      combinator?: 'AND' | 'OR';

      created_at?: string;

      /**
       * Each entry is { slug: { comparator: value } }
       */
      filter?: Array<{ [key: string]: unknown }>;

      /**
       * Property slug to group by
       */
      group_by?: string | null;

      group_hidden_option_ids?: Array<unknown> | unknown | null;

      group_hide_empty?: boolean | null;

      group_sort?: string | null;

      icon?: string | null;

      list_id?: string | null;

      /**
       * Property slugs (dot-paths permitted for refs)
       */
      select?: Array<string>;

      /**
       * Each entry is { slug: 'asc' | 'desc' }
       */
      sort?: Array<{ [key: string]: unknown }>;

      sort_order?: number | null;

      team_id?: string | null;

      updated_at?: string | null;

      user_id?: string | null;
    }
  }
}

export interface ViewCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  name: string;

  /**
   * Body param
   */
  view_type: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param
   */
  aggregation_prop_def_id?: string | null;

  /**
   * Body param
   */
  aggregation_type?: string | null;

  /**
   * Body param
   */
  column_layout?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  combinator?: 'AND' | 'OR';

  /**
   * Body param
   */
  created_at?: string;

  /**
   * Body param: Each entry is { slug: { comparator: value } }
   */
  filter?: Array<{ [key: string]: unknown }>;

  /**
   * Body param: Property slug to group by
   */
  group_by?: string | null;

  /**
   * Body param
   */
  group_hidden_option_ids?: Array<unknown> | unknown | null;

  /**
   * Body param
   */
  group_hide_empty?: boolean | null;

  /**
   * Body param
   */
  group_sort?: string | null;

  /**
   * Body param
   */
  icon?: string | null;

  /**
   * Body param
   */
  list_id?: string | null;

  /**
   * Body param: Property slugs (dot-paths permitted for refs)
   */
  select?: Array<string>;

  /**
   * Body param: Each entry is { slug: 'asc' | 'desc' }
   */
  sort?: Array<{ [key: string]: unknown }>;

  /**
   * Body param
   */
  sort_order?: number | null;

  /**
   * Body param
   */
  team_id?: string | null;

  /**
   * Body param
   */
  updated_at?: string | null;

  /**
   * Body param
   */
  user_id?: string | null;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface ViewUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  viewObjectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';

  /**
   * Body param
   */
  aggregation_prop_def_id?: string | null;

  /**
   * Body param
   */
  aggregation_type?: string | null;

  /**
   * Body param
   */
  column_layout?: { [key: string]: unknown } | null;

  /**
   * Body param
   */
  combinator?: 'AND' | 'OR';

  /**
   * Body param
   */
  filter?: Array<{ [key: string]: unknown }>;

  /**
   * Body param
   */
  group_by?: string | null;

  /**
   * Body param
   */
  group_hidden_option_ids?: Array<unknown> | unknown | null;

  /**
   * Body param
   */
  group_hide_empty?: boolean | null;

  /**
   * Body param
   */
  group_sort?: string | null;

  /**
   * Body param
   */
  icon?: string | null;

  /**
   * Body param
   */
  list_id?: string | null;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param
   */
  select?: Array<string>;

  /**
   * Body param
   */
  sort?: Array<{ [key: string]: unknown }>;

  /**
   * Body param
   */
  sort_order?: number | null;

  /**
   * Body param
   */
  team_id?: string | null;

  /**
   * Body param
   */
  user_id?: string | null;

  /**
   * Body param
   */
  view_type?: string;

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) that
   * identifies this logical request. The server caches the first response under this
   * key for 24 hours and replays it on retry — safe to use on every POST/PUT/PATCH
   * to make network retries deterministic. Reusing the same key with a different
   * body returns 409 `idempotency_key_mismatch`. Replays include the
   * `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface ViewDeleteParams {
  teamId?: string;

  viewObjectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';
}

export interface ViewGetParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  viewObjectType:
    | 'comment'
    | 'action'
    | 'deal'
    | 'engagement'
    | 'document'
    | 'event'
    | 'identity'
    | 'organization';

  /**
   * Query param: Forwarded to the records sub-resource when `include=records`.
   */
  cursor?: string;

  /**
   * Query param: Comma-separated list of optional sub-resources to inline. Currently
   * the only recognized value is `records` — when present, the response is
   * `{view, records}` rather than the bare view bundle.
   */
  include?: string;

  /**
   * Query param: Forwarded to the records sub-resource when `include=records`.
   */
  limit?: number;

  /**
   * Query param: Forwarded to the records sub-resource when `include=records`.
   */
  page?: number;
}

Views.Records = RecordsAPIRecords;

export declare namespace Views {
  export {
    type ViewCreateResponse as ViewCreateResponse,
    type ViewUpdateResponse as ViewUpdateResponse,
    type ViewGetResponse as ViewGetResponse,
    type ViewCreateParams as ViewCreateParams,
    type ViewUpdateParams as ViewUpdateParams,
    type ViewDeleteParams as ViewDeleteParams,
    type ViewGetParams as ViewGetParams,
  };

  export {
    RecordsAPIRecords as Records,
    type RecordListResponse as RecordListResponse,
    type RecordListParams as RecordListParams,
    type RecordPinParams as RecordPinParams,
    type RecordReorderParams as RecordReorderParams,
    type RecordUnpinParams as RecordUnpinParams,
  };
}
