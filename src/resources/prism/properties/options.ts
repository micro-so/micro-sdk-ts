// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Options extends APIResource {
  /**
   * Adds a single option to a `select_str` or `multiselect_str` property definition.
   * Body must include `type` so the server knows which per-type option table to
   * write.
   */
  create(
    propertyID: string,
    params: OptionCreateParams,
    options?: RequestOptions,
  ): APIPromise<PropertyOption> {
    const { teamId = this._client.teamID, objectType, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/${objectType}/properties/${propertyID}/options`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a property option
   */
  update(optionID: string, params: OptionUpdateParams, options?: RequestOptions): APIPromise<PropertyOption> {
    const {
      teamId = this._client.teamID,
      objectType,
      propertyId,
      'Idempotency-Key': idempotencyKey,
      ...body
    } = params;
    return this._client.patch(
      path`/v2/prism/${teamId}/${objectType}/properties/${propertyId}/options/${optionID}`,
      {
        body,
        ...options,
        headers: buildHeaders([
          { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
          options?.headers,
        ]),
      },
    );
  }

  /**
   * Delete a property option
   */
  delete(optionID: string, params: OptionDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, propertyId, type, list_id } = params;
    return this._client.delete(
      path`/v2/prism/${teamId}/${objectType}/properties/${propertyId}/options/${optionID}`,
      { query: { type, list_id }, ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }
}

/**
 * An enabled option for a select_str or multiselect_str property definition.
 */
export interface PropertyOption {
  id: string;

  slug: string;

  color_scheme?: string | null;

  /**
   * @deprecated
   */
  crm_id?: string | null;

  description?: string | null;

  icon?: string | null;

  list_id?: string | null;

  option_group?: string | null;

  sort_index?: number | null;

  /**
   * Display value for the option.
   */
  value?: string | null;
}

/**
 * New option for a `select_str` or `multiselect_str` property. `type` identifies
 * the per-type option table to write.
 */
export interface PropertyOptionCreate {
  /**
   * Storage type for a property definition. Determines which per-type table holds
   * the values, and which display formats the property can take.
   */
  type:
    | 'num'
    | 'str'
    | 'bool'
    | 'date'
    | 'text'
    | 'byte'
    | 'select_str'
    | 'multi_str'
    | 'multiselect_str'
    | 'jsonb'
    | 'ref_identity'
    | 'ref_user'
    | 'ref_organization'
    | 'ref_contact'
    | 'ref_thread'
    | 'ref_message'
    | 'ref_event'
    | 'ref_account'
    | 'ref_ai_chat_thread'
    | 'ref_ai_chat_message'
    | 'multiref_ai_chat_message'
    | 'multiref_agent_site'
    | 'multiref_action'
    | 'multiref_comment'
    | 'multiref_contact'
    | 'multiref_label'
    | 'multiref_thread'
    | 'multiref_messages'
    | 'multiref_document'
    | 'multiref_identity'
    | 'multiref_organization'
    | 'multiref_engagement'
    | 'multiref_attendee'
    | 'multiref_meeting_entry'
    | 'multiref_read_receipt'
    | 'multiref_account'
    | 'multiref_source';

  /**
   * Display value for the option.
   */
  value: string;

  color_scheme?: string | null;

  description?: string | null;

  icon?: string | null;

  /**
   * Scope the option to a specific list/app.
   */
  list_id?: string | null;

  option_group?: string | null;

  /**
   * URL-safe identifier. Defaults to a slugified `value`.
   */
  slug?: string;

  sort_index?: number | null;
}

/**
 * Partial update of a property option. `type` identifies the per-type option table
 * to write.
 */
export interface PropertyOptionPatch {
  /**
   * Storage type for a property definition. Determines which per-type table holds
   * the values, and which display formats the property can take.
   */
  type:
    | 'num'
    | 'str'
    | 'bool'
    | 'date'
    | 'text'
    | 'byte'
    | 'select_str'
    | 'multi_str'
    | 'multiselect_str'
    | 'jsonb'
    | 'ref_identity'
    | 'ref_user'
    | 'ref_organization'
    | 'ref_contact'
    | 'ref_thread'
    | 'ref_message'
    | 'ref_event'
    | 'ref_account'
    | 'ref_ai_chat_thread'
    | 'ref_ai_chat_message'
    | 'multiref_ai_chat_message'
    | 'multiref_agent_site'
    | 'multiref_action'
    | 'multiref_comment'
    | 'multiref_contact'
    | 'multiref_label'
    | 'multiref_thread'
    | 'multiref_messages'
    | 'multiref_document'
    | 'multiref_identity'
    | 'multiref_organization'
    | 'multiref_engagement'
    | 'multiref_attendee'
    | 'multiref_meeting_entry'
    | 'multiref_read_receipt'
    | 'multiref_account'
    | 'multiref_source';

  color_scheme?: string | null;

  description?: string | null;

  enabled?: boolean;

  icon?: string | null;

  list_id?: string | null;

  option_group?: string | null;

  slug?: string;

  sort_index?: number | null;

  value?: string;
}

export interface OptionCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType:
    | 'comment'
    | 'deal'
    | 'engagement'
    | 'identity'
    | 'ai_chat_thread'
    | 'ai_chat_message'
    | 'agent_site'
    | 'document'
    | 'action'
    | 'event'
    | 'organization'
    | 'contact';

  /**
   * Body param: Storage type for a property definition. Determines which per-type
   * table holds the values, and which display formats the property can take.
   */
  type:
    | 'num'
    | 'str'
    | 'bool'
    | 'date'
    | 'text'
    | 'byte'
    | 'select_str'
    | 'multi_str'
    | 'multiselect_str'
    | 'jsonb'
    | 'ref_identity'
    | 'ref_user'
    | 'ref_organization'
    | 'ref_contact'
    | 'ref_thread'
    | 'ref_message'
    | 'ref_event'
    | 'ref_account'
    | 'ref_ai_chat_thread'
    | 'ref_ai_chat_message'
    | 'multiref_ai_chat_message'
    | 'multiref_agent_site'
    | 'multiref_action'
    | 'multiref_comment'
    | 'multiref_contact'
    | 'multiref_label'
    | 'multiref_thread'
    | 'multiref_messages'
    | 'multiref_document'
    | 'multiref_identity'
    | 'multiref_organization'
    | 'multiref_engagement'
    | 'multiref_attendee'
    | 'multiref_meeting_entry'
    | 'multiref_read_receipt'
    | 'multiref_account'
    | 'multiref_source';

  /**
   * Body param: Display value for the option.
   */
  value: string;

  /**
   * Body param
   */
  color_scheme?: string | null;

  /**
   * Body param
   */
  description?: string | null;

  /**
   * Body param
   */
  icon?: string | null;

  /**
   * Body param: Scope the option to a specific list/app.
   */
  list_id?: string | null;

  /**
   * Body param
   */
  option_group?: string | null;

  /**
   * Body param: URL-safe identifier. Defaults to a slugified `value`.
   */
  slug?: string;

  /**
   * Body param
   */
  sort_index?: number | null;

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

export interface OptionUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType:
    | 'comment'
    | 'deal'
    | 'engagement'
    | 'identity'
    | 'ai_chat_thread'
    | 'ai_chat_message'
    | 'agent_site'
    | 'document'
    | 'action'
    | 'event'
    | 'organization'
    | 'contact';

  /**
   * Path param: Property definition uuid, or the reserved alias `app_stage` for the
   * list pipeline stage definition (requires `list_id`). The alias exists because a
   * superseded native `status` definition can coexist with the pipeline one and the
   * two are indistinguishable in a metadata read; the definition carrying
   * `alias: app_stage` is the pipeline one.
   */
  propertyId: string;

  /**
   * Body param: Storage type for a property definition. Determines which per-type
   * table holds the values, and which display formats the property can take.
   */
  type:
    | 'num'
    | 'str'
    | 'bool'
    | 'date'
    | 'text'
    | 'byte'
    | 'select_str'
    | 'multi_str'
    | 'multiselect_str'
    | 'jsonb'
    | 'ref_identity'
    | 'ref_user'
    | 'ref_organization'
    | 'ref_contact'
    | 'ref_thread'
    | 'ref_message'
    | 'ref_event'
    | 'ref_account'
    | 'ref_ai_chat_thread'
    | 'ref_ai_chat_message'
    | 'multiref_ai_chat_message'
    | 'multiref_agent_site'
    | 'multiref_action'
    | 'multiref_comment'
    | 'multiref_contact'
    | 'multiref_label'
    | 'multiref_thread'
    | 'multiref_messages'
    | 'multiref_document'
    | 'multiref_identity'
    | 'multiref_organization'
    | 'multiref_engagement'
    | 'multiref_attendee'
    | 'multiref_meeting_entry'
    | 'multiref_read_receipt'
    | 'multiref_account'
    | 'multiref_source';

  /**
   * Body param
   */
  color_scheme?: string | null;

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
  icon?: string | null;

  /**
   * Body param
   */
  list_id?: string | null;

  /**
   * Body param
   */
  option_group?: string | null;

  /**
   * Body param
   */
  slug?: string;

  /**
   * Body param
   */
  sort_index?: number | null;

  /**
   * Body param
   */
  value?: string;

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

export interface OptionDeleteParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param
   */
  objectType:
    | 'comment'
    | 'deal'
    | 'engagement'
    | 'identity'
    | 'ai_chat_thread'
    | 'ai_chat_message'
    | 'agent_site'
    | 'document'
    | 'action'
    | 'event'
    | 'organization'
    | 'contact';

  /**
   * Path param: Property definition uuid, or the reserved alias `app_stage` for the
   * list pipeline stage definition (requires `list_id`). The alias exists because a
   * superseded native `status` definition can coexist with the pipeline one and the
   * two are indistinguishable in a metadata read; the definition carrying
   * `alias: app_stage` is the pipeline one.
   */
  propertyId: string;

  /**
   * Query param: Storage type for a property definition. Determines which per-type
   * table holds the values, and which display formats the property can take.
   */
  type:
    | 'num'
    | 'str'
    | 'bool'
    | 'date'
    | 'text'
    | 'byte'
    | 'select_str'
    | 'multi_str'
    | 'multiselect_str'
    | 'jsonb'
    | 'ref_identity'
    | 'ref_user'
    | 'ref_organization'
    | 'ref_contact'
    | 'ref_thread'
    | 'ref_message'
    | 'ref_event'
    | 'ref_account'
    | 'ref_ai_chat_thread'
    | 'ref_ai_chat_message'
    | 'multiref_ai_chat_message'
    | 'multiref_agent_site'
    | 'multiref_action'
    | 'multiref_comment'
    | 'multiref_contact'
    | 'multiref_label'
    | 'multiref_thread'
    | 'multiref_messages'
    | 'multiref_document'
    | 'multiref_identity'
    | 'multiref_organization'
    | 'multiref_engagement'
    | 'multiref_attendee'
    | 'multiref_meeting_entry'
    | 'multiref_read_receipt'
    | 'multiref_account'
    | 'multiref_source';

  /**
   * Query param
   */
  list_id?: string;
}

export declare namespace Options {
  export {
    type PropertyOption as PropertyOption,
    type PropertyOptionCreate as PropertyOptionCreate,
    type PropertyOptionPatch as PropertyOptionPatch,
    type OptionCreateParams as OptionCreateParams,
    type OptionUpdateParams as OptionUpdateParams,
    type OptionDeleteParams as OptionDeleteParams,
  };
}
