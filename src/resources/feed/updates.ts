// Public feed contract is defined in the API OpenAPI spec and Stainless config.
import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { buildHeaders } from '../../internal/headers';

export interface FeedUpdateCreate {
  /** Display identity of the source; never changes the authenticated recipient. */
  author: { name: string; logo_url?: string };
  /** Plain text (up to 10,000 characters). Line breaks and blank lines are preserved. */
  message: string;
  /** Optional HTTPS source link. */
  link?: string;
  /** Optional HTTPS link button. */
  cta?: { label: string; url: string };
}

export interface UpdateCreateParams extends FeedUpdateCreate {
  /** A stable key for retrying this logical update, scoped to the authenticated user. */
  'Idempotency-Key'?: string;
}

export interface FeedUpdate extends FeedUpdateCreate {
  id: string;
  created_at: string;
}

export class Updates extends APIResource {
  /**
   * Publish to the API key owner's personal For You feed. No team is required.
   * Set the Idempotency-Key request header when retrying a logical update.
   */
  create(params: UpdateCreateParams, options?: RequestOptions): APIPromise<FeedUpdate> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v2/feed/updates', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export declare namespace Updates {
  export {
    type FeedUpdate as FeedUpdate,
    type FeedUpdateCreate as FeedUpdateCreate,
    type UpdateCreateParams as UpdateCreateParams,
  };
}
