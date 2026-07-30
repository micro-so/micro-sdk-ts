// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Deliveries extends APIResource {
  /**
   * An endpoint's deliveries, newest first, with optional status / type / time-range
   * filters and cursor pagination.
   */
  list(
    webhookID: string,
    params: DeliveryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DeliveryListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/webhooks/${teamId}/${webhookID}/deliveries`, { query, ...options });
  }

  /**
   * A single delivery plus its full attempt timeline (including async retries).
   */
  get(
    deliveryID: string,
    params: DeliveryGetParams,
    options?: RequestOptions,
  ): APIPromise<WebhooksAPI.WebhookDeliveryDetail> {
    const { teamId = this._client.teamID, webhookId } = params;
    return this._client.get(path`/v2/webhooks/${teamId}/${webhookId}/deliveries/${deliveryID}`, options);
  }
}

export interface DeliveryListResponse {
  data: Array<WebhooksAPI.WebhookDelivery>;

  /**
   * Pass as `cursor` to fetch the next page; null when there are no more.
   */
  next_cursor?: string | null;
}

export interface DeliveryListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Only deliveries at or after this ISO-8601 timestamp.
   */
  after?: string;

  /**
   * Query param: Only deliveries at or before this ISO-8601 timestamp.
   */
  before?: string;

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

export interface DeliveryGetParams {
  teamId?: string;

  webhookId: string;
}

export declare namespace Deliveries {
  export {
    type DeliveryListResponse as DeliveryListResponse,
    type DeliveryListParams as DeliveryListParams,
    type DeliveryGetParams as DeliveryGetParams,
  };
}
