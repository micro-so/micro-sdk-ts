// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Lists extends APIResource {
  /**
   * Creates a list from a template. Seeds properties, pipeline stages (when
   * applicable), and default views — identical to the session-auth
   * `/default_app/create` path. API-key callers are fully supported; `type` is
   * derived from `template_id` and must not be supplied.
   *
   * @example
   * ```ts
   * const list = await client.prism.lists.create({
   *   template_id: 'sales_deals',
   * });
   * ```
   */
  create(params: ListCreateParams, options?: RequestOptions): APIPromise<List> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/lists`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns non-core lists the caller can access in the workspace. Core system apps
   * (Messages, All Inbox) are excluded.
   *
   * @example
   * ```ts
   * const lists = await client.prism.lists.list();
   * ```
   */
  list(
    params: ListListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListListResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/lists`, options);
  }

  /**
   * Get a list by id
   *
   * @example
   * ```ts
   * const list = await client.prism.lists.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  get(
    listID: string,
    params: ListGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<List> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/lists/${listID}`, options);
  }
}

export interface List {
  id: string;

  name: string;

  /**
   * Prism object type this list holds.
   */
  object_type: 'organization' | 'identity' | 'action' | 'document' | 'deal';

  team_id: string;

  created_at?: string | null;

  description?: string | null;

  /**
   * Emoji or icon key for the list.
   */
  icon?: string | null;

  /**
   * Internal template type (e.g. dealFlow, hiring). Derived from template_id on
   * create.
   */
  type?: string | null;

  views?: Array<List.View>;
}

export namespace List {
  export interface View {
    id: string;

    name?: string | null;
  }
}

export interface ListCreate {
  /**
   * Template to seed the list from. `type` is derived server-side from this
   * template.
   */
  template_id:
    | 'sales_deals'
    | 'recruiting'
    | 'partnerships'
    | 'fundraising'
    | 'knowledge_base'
    | 'issue_tracker'
    | 'content_calendar'
    | 'job_applications'
    | 'project_tracker'
    | 'feedback'
    | 'portco_tracker'
    | 'deal_flow'
    | 'lp_fundraising'
    | 'custom';

  /**
   * Emoji or icon override.
   */
  icon?: string;

  name?: string;

  /**
   * Required only when template_id is `custom`.
   */
  object_type?: 'organization' | 'identity' | 'action' | 'document' | 'deal';
}

export interface ListListResponse {
  data: Array<List>;
}

export interface ListCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Template to seed the list from. `type` is derived server-side from
   * this template.
   */
  template_id:
    | 'sales_deals'
    | 'recruiting'
    | 'partnerships'
    | 'fundraising'
    | 'knowledge_base'
    | 'issue_tracker'
    | 'content_calendar'
    | 'job_applications'
    | 'project_tracker'
    | 'feedback'
    | 'portco_tracker'
    | 'deal_flow'
    | 'lp_fundraising'
    | 'custom';

  /**
   * Body param: Emoji or icon override.
   */
  icon?: string;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param: Required only when template_id is `custom`.
   */
  object_type?: 'organization' | 'identity' | 'action' | 'document' | 'deal';

  /**
   * Header param: A unique key (UUID or any opaque string up to 255 chars) for an
   * authenticated POST, PUT, or PATCH request. The server retains the initial claim
   * for 24 hours and replays a completed non-5xx response only when the method,
   * path, and request body all match. Reusing a non-expired key with a different
   * method, path, or body returns 409 `idempotency_key_mismatch`; reusing it after
   * expiry returns 409 `idempotency_key_stale`, so use a new key. Replays include
   * the `idempotent-replay: true` response header.
   */
  'Idempotency-Key'?: string;
}

export interface ListListParams {
  teamId?: string;
}

export interface ListGetParams {
  teamId?: string;
}

export declare namespace Lists {
  export {
    type List as List,
    type ListCreate as ListCreate,
    type ListListResponse as ListListResponse,
    type ListCreateParams as ListCreateParams,
    type ListListParams as ListListParams,
    type ListGetParams as ListGetParams,
  };
}
