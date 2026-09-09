// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DeliveriesAPI from './deliveries';
import { Deliveries, DeliveryGetParams, DeliveryListParams, DeliveryListResponse } from './deliveries';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Webhooks extends APIResource {
  deliveries: DeliveriesAPI.Deliveries = new DeliveriesAPI.Deliveries(this._client);

  /**
   * Registers a webhook and enqueues an asynchronous verification handshake (run by
   * the dispatcher). The response includes the signing `secret`, shown only this
   * once; `verified` is false until the handshake passes.
   */
  create(params: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookWithSecret> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.post(path`/v2/webhooks/${teamId}`, { body, ...options });
  }

  /**
   * Updates mutable fields. Changing `url` resets verification and re-runs the
   * handshake.
   */
  update(
    webhookID: string,
    params: WebhookUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebhookUpdateResponse> {
    const { teamId = this._client.teamID, ...body } = params;
    return this._client.patch(path`/v2/webhooks/${teamId}/${webhookID}`, { body, ...options });
  }

  /**
   * Lists the team's webhooks. Signing secrets are never included.
   */
  list(
    params: WebhookListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/webhooks/${teamId}`, options);
  }

  /**
   * Delete a webhook
   */
  delete(
    webhookID: string,
    params: WebhookDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.delete(path`/v2/webhooks/${teamId}/${webhookID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get a webhook
   */
  get(
    webhookID: string,
    params: WebhookGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Webhook> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.get(path`/v2/webhooks/${teamId}/${webhookID}`, options);
  }

  /**
   * Account-wide delivery feed across all of the team's webhooks, newest first.
   */
  listDeliveries(
    params: WebhookListDeliveriesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookListDeliveriesResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/webhooks/${teamId}/deliveries`, { query, ...options });
  }

  /**
   * Fire-and-forget test delivery through the async dispatcher. The webhook must be
   * enabled and verified.
   */
  ping(
    webhookID: string,
    params: WebhookPingParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookPingResponse> {
    const { teamId = this._client.teamID, ...body } = params ?? {};
    return this._client.post(path`/v2/webhooks/${teamId}/${webhookID}/ping`, { body, ...options });
  }

  /**
   * Re-runs the GET challenge/echo handshake against the webhook's url and updates
   * its verified state.
   */
  verify(
    webhookID: string,
    params: WebhookVerifyParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebhookVerifyResponse> {
    const { teamId = this._client.teamID } = params ?? {};
    return this._client.post(path`/v2/webhooks/${teamId}/${webhookID}/verify`, options);
  }
}

/**
 * A registered webhook endpoint.
 */
export interface Webhook {
  id: string;

  created_at: string;

  /**
   * Disabled webhooks are skipped at delivery time.
   */
  enabled: boolean;

  name: string;

  team_id: string;

  /**
   * Endpoint events are delivered to.
   */
  url: string;

  /**
   * True once the endpoint has completed the verification handshake.
   */
  verified: boolean;

  description?: string | null;

  updated_at?: string | null;

  /**
   * Stable token replayed to the endpoint (as the `micro_hook_token` query param)
   * during the verification handshake. The endpoint may check it to confirm the
   * request originated from Micro.
   */
  verification_token?: string;

  verified_at?: string | null;
}

/**
 * On create, the dispatcher asynchronously runs a verification handshake: it sends
 * a GET to `url` with `micro_hook_mode=subscribe`, a one-time
 * `micro_hook_challenge`, and the webhook's `micro_hook_token`. The endpoint must
 * respond 200 and echo the challenge value verbatim in the body; on success the
 * webhook's `verified` flag flips to true. A failed handshake does not fail
 * creation — re-run it later via the verify endpoint.
 */
export interface WebhookCreate {
  name: string;

  /**
   * HTTP(S) endpoint. Rejected if it resolves to a private/internal address.
   */
  url: string;

  description?: string | null;

  enabled?: boolean;
}

/**
 * A webhook delivery — one logical event delivery to an endpoint, grouping its
 * attempts. Status and status_code reflect the latest attempt.
 */
export interface WebhookDelivery {
  created_at: string;

  delivery_id: string;

  status: 'success' | 'failed';

  type: 'delivery' | 'verification';

  webhook_id: string;

  /**
   * Number of attempts made so far (including async retries).
   */
  attempts?: number | null;

  /**
   * Event name (e.g. `webhook.test`); `verification` for handshake runs.
   */
  event?: string | null;

  /**
   * HTTP status of the latest attempt; null on a transport error.
   */
  status_code?: number | null;

  team_id?: string | null;

  updated_at?: string | null;

  url?: string;
}

/**
 * A delivery plus its full attempt timeline.
 */
export interface WebhookDeliveryDetail extends WebhookDelivery {
  attempt_history?: Array<WebhookDeliveryDetail.AttemptHistory>;
}

export namespace WebhookDeliveryDetail {
  /**
   * A single HTTP attempt within a delivery (including async retries).
   */
  export interface AttemptHistory {
    /**
     * 1-based attempt number.
     */
    attempt: number;

    created_at: string;

    status: 'success' | 'failed';

    /**
     * Failure reason, when status is failed.
     */
    error?: string | null;

    /**
     * Body sent to the endpoint (delivery only); may be truncated.
     */
    request_body?: string | null;

    /**
     * Body returned by the endpoint; may be truncated.
     */
    response_body?: string | null;

    status_code?: number | null;
  }
}

/**
 * Partial update. Changing `url` resets verification and re-runs the handshake.
 */
export interface WebhookUpdate {
  description?: string | null;

  enabled?: boolean;

  name?: string;

  url?: string;
}

/**
 * Returned ONLY on creation. Includes the signing secret (shown once) and the
 * pending verification status.
 */
export interface WebhookWithSecret extends Webhook {
  /**
   * HMAC signing secret (prefix `whsec_`). Store it now — it is never returned
   * again. The dispatcher signs each delivered payload with it so your endpoint can
   * verify authenticity.
   */
  secret: string;

  /**
   * Status of the verification handshake enqueued by this request. The handshake
   * runs asynchronously in the dispatcher; poll the webhook (its `verified` flag
   * flips to true on success) to observe the outcome.
   */
  verification?: WebhookWithSecret.Verification;
}

export namespace WebhookWithSecret {
  /**
   * Status of the verification handshake enqueued by this request. The handshake
   * runs asynchronously in the dispatcher; poll the webhook (its `verified` flag
   * flips to true on success) to observe the outcome.
   */
  export interface Verification {
    /**
     * Always `pending` at the moment of the response — the dispatcher has been asked
     * to run the handshake but has not reported back yet.
     */
    status: 'pending';
  }
}

/**
 * A webhook plus the status of a verification handshake enqueued by this request.
 */
export interface WebhookUpdateResponse extends Webhook {
  /**
   * Status of the verification handshake enqueued by this request. The handshake
   * runs asynchronously in the dispatcher; poll the webhook (its `verified` flag
   * flips to true on success) to observe the outcome.
   */
  verification?: WebhookUpdateResponse.Verification;
}

export namespace WebhookUpdateResponse {
  /**
   * Status of the verification handshake enqueued by this request. The handshake
   * runs asynchronously in the dispatcher; poll the webhook (its `verified` flag
   * flips to true on success) to observe the outcome.
   */
  export interface Verification {
    /**
     * Always `pending` at the moment of the response — the dispatcher has been asked
     * to run the handshake but has not reported back yet.
     */
    status: 'pending';
  }
}

export interface WebhookListResponse {
  data: Array<Webhook>;
}

export interface WebhookListDeliveriesResponse {
  data: Array<WebhookDelivery>;

  /**
   * Pass as `cursor` to fetch the next page; null when there are no more.
   */
  next_cursor?: string | null;
}

export interface WebhookPingResponse {
  dispatched: boolean;

  event: string;

  webhook_id: string;
}

/**
 * A webhook plus the status of a verification handshake enqueued by this request.
 */
export interface WebhookVerifyResponse extends Webhook {
  /**
   * Status of the verification handshake enqueued by this request. The handshake
   * runs asynchronously in the dispatcher; poll the webhook (its `verified` flag
   * flips to true on success) to observe the outcome.
   */
  verification?: WebhookVerifyResponse.Verification;
}

export namespace WebhookVerifyResponse {
  /**
   * Status of the verification handshake enqueued by this request. The handshake
   * runs asynchronously in the dispatcher; poll the webhook (its `verified` flag
   * flips to true on success) to observe the outcome.
   */
  export interface Verification {
    /**
     * Always `pending` at the moment of the response — the dispatcher has been asked
     * to run the handshake but has not reported back yet.
     */
    status: 'pending';
  }
}

export interface WebhookCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  name: string;

  /**
   * Body param: HTTP(S) endpoint. Rejected if it resolves to a private/internal
   * address.
   */
  url: string;

  /**
   * Body param
   */
  description?: string | null;

  /**
   * Body param
   */
  enabled?: boolean;
}

export interface WebhookUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  description?: string | null;

  /**
   * Body param
   */
  enabled?: boolean;

  /**
   * Body param
   */
  name?: string;

  /**
   * Body param
   */
  url?: string;
}

export interface WebhookListParams {
  teamId?: string;
}

export interface WebhookDeleteParams {
  teamId?: string;
}

export interface WebhookGetParams {
  teamId?: string;
}

export interface WebhookListDeliveriesParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Opaque cursor from a previous response's `next_cursor`.
   */
  cursor?: string;

  /**
   * Query param: Page size (1–100, default 25).
   */
  limit?: number;

  /**
   * Query param: Filter by outcome.
   */
  status?: 'success' | 'failed';

  /**
   * Query param: Filter by run type. Defaults to `delivery` (event deliveries). Pass
   * `all` to include verification handshakes.
   */
  type?: 'delivery' | 'verification' | 'all';
}

export interface WebhookPingParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Arbitrary JSON payload body.
   */
  data?: { [key: string]: unknown };

  /**
   * Body param: Event name to send.
   */
  event?: string;
}

export interface WebhookVerifyParams {
  teamId?: string;
}

Webhooks.Deliveries = Deliveries;

export declare namespace Webhooks {
  export {
    type Webhook as Webhook,
    type WebhookCreate as WebhookCreate,
    type WebhookDelivery as WebhookDelivery,
    type WebhookDeliveryDetail as WebhookDeliveryDetail,
    type WebhookUpdate as WebhookUpdate,
    type WebhookWithSecret as WebhookWithSecret,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookListDeliveriesResponse as WebhookListDeliveriesResponse,
    type WebhookPingResponse as WebhookPingResponse,
    type WebhookVerifyResponse as WebhookVerifyResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookDeleteParams as WebhookDeleteParams,
    type WebhookGetParams as WebhookGetParams,
    type WebhookListDeliveriesParams as WebhookListDeliveriesParams,
    type WebhookPingParams as WebhookPingParams,
    type WebhookVerifyParams as WebhookVerifyParams,
  };

  export {
    Deliveries as Deliveries,
    type DeliveryListResponse as DeliveryListResponse,
    type DeliveryListParams as DeliveryListParams,
    type DeliveryGetParams as DeliveryGetParams,
  };
}
