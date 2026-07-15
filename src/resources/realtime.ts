// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Realtime extends APIResource {
  /**
   * Exchange your API key (or session) for a short-lived ticket that authenticates a
   * connection to the realtime object-change stream. Open a WebSocket to the push
   * endpoint with the returned ticket as the `token` query parameter. The ticket is
   * single-purpose and expires quickly; call this again to obtain a fresh one before
   * reconnecting.
   */
  createTicket(options?: RequestOptions): APIPromise<RealtimeCreateTicketResponse> {
    return this._client.post('/v2/realtime/ticket', options);
  }
}

export interface RealtimeCreateTicketResponse {
  /**
   * Seconds until the ticket expires. Refresh (call the endpoint again) before
   * reconnecting.
   */
  expires_in: number;

  /**
   * Short-lived token authenticating a realtime WebSocket connection. Pass as the
   * `token` query parameter when connecting.
   */
  ticket: string;

  /**
   * WebSocket URL for this environment (wss://stream.developers[.staging].micro.so).
   * Connect here with the ticket as the `token` query parameter.
   */
  ws_url: string | null;
}

export declare namespace Realtime {
  export { type RealtimeCreateTicketResponse as RealtimeCreateTicketResponse };
}
