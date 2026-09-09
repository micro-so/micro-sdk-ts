// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OptionsAPI from './options';
import {
  OptionCreateParams,
  OptionDeleteParams,
  OptionUpdateParams,
  Options,
  PropertyOption,
  PropertyOptionCreate,
  PropertyOptionPatch,
} from './options';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Properties extends APIResource {
  options: OptionsAPI.Options = new OptionsAPI.Options(this._client);

  /**
   * Define a new property on this object type, scoped to the calling team. Search
   * the existing properties first (GET this path with `term`) and reuse a match
   * instead of defining a second property for the same fact. Pass `list_id` in the
   * body to scope the definition to one list/app; without it the property is
   * workspace-global and appears on every list. A name already used in that scope,
   * an explicitly requested slug already taken, or a slug that a shared property
   * already owns all return 409 naming the definition to use instead. The property's
   * display format is resolved from `type` automatically — pass `role_id` only to
   * override it. For `select_str` and `multiselect_str` types you may pre-seed the
   * choices via `options`.
   *
   * @example
   * ```ts
   * const propertyDefinition =
   *   await client.prism.properties.create('comment', {
   *     name: 'name',
   *     type: 'num',
   *   });
   * ```
   */
  create(
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
      | 'contact',
    params: PropertyCreateParams,
    options?: RequestOptions,
  ): APIPromise<PropertyDefinition> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/${objectType}/properties`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Patches the editable fields (`name`, `icon`, `enabled`) of a property
   * definition. `type` and scoping fields are immutable; `type` must be supplied in
   * the body so the server knows which per-type table to write.
   *
   * @example
   * ```ts
   * const propertyDefinition =
   *   await client.prism.properties.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { objectType: 'comment', type: 'num' },
   *   );
   * ```
   */
  update(
    propertyID: string,
    params: PropertyUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PropertyDefinition> {
    const { teamId = this._client.teamID, objectType, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v2/prism/${teamId}/${objectType}/properties/${propertyID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get metadata properties by object type
   *
   * @example
   * ```ts
   * const properties = await client.prism.properties.list(
   *   'comment',
   * );
   * ```
   */
  list(
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
      | 'contact',
    params: PropertyListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PropertyListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/${objectType}/properties`, { query, ...options });
  }

  /**
   * Removes the property definition and any of its options. Fails with 409
   * `property_in_use` if records still reference the property.
   *
   * @example
   * ```ts
   * await client.prism.properties.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { objectType: 'comment', type: 'num' },
   * );
   * ```
   */
  delete(propertyID: string, params: PropertyDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { teamId = this._client.teamID, objectType, type, list_id } = params;
    return this._client.delete(path`/v2/prism/${teamId}/${objectType}/properties/${propertyID}`, {
      query: { type, list_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Lists property definitions across every object type the engine knows about,
   * including pipeline-owned types that are not queryable or CRUD-capable
   * (`message`, `thread`, `linkedin_thread`, and others). Only the `ObjectType` enum
   * (12 types) can be queried, created, updated, or listed. Contacts point at
   * `message` via `last_email`; that relationship cannot be followed with `/query`.
   *
   * @example
   * ```ts
   * const response = await client.prism.properties.listAll();
   * ```
   */
  listAll(
    params: PropertyListAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PropertyListAllResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/properties`, { query, ...options });
  }
}

/**
 * Definition for a single property on an object type. Definitions with team_id and
 * crm_id null are shared defaults; values may be scoped to a team and/or list
 * (crm).
 */
export interface PropertyDefinition {
  id: string;

  slug: string;

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
   * Reserved alias naming this definition, or null. `app_stage` marks the list
   * pipeline stage definition. Resolve stages by this field rather than by name,
   * slug, or team_id: a superseded native `status` definition can coexist with the
   * pipeline one and is otherwise identical on the wire.
   */
  alias?: 'app_stage' | null;

  /**
   * Identifier of the list this definition is scoped to, when applicable.
   */
  crm_id?: string | null;

  /**
   * Canonical identifier of the list this definition is scoped to.
   */
  list_id?: string | null;

  locked?: boolean;

  name?: string | null;

  native?: boolean;

  /**
   * Present only for select_str and multiselect_str types.
   */
  options?: Array<OptionsAPI.PropertyOption>;

  /**
   * When true, records of this object type must carry a non-empty value for this
   * property on create, and a patch may not clear it.
   */
  required?: boolean;

  /**
   * The property's display format. Always populated on definitions created through
   * this API; a null here means the definition predates that and will render as an
   * unknown format until it is patched.
   */
  role_id?: string | null;

  team_id?: string | null;
}

/**
 * New property definition. Check for an existing property first (GET the same path
 * with `term`) and reuse it rather than defining a near-duplicate — writes address
 * properties by slug, so two definitions sharing a slug leave no addressable
 * winner. For `select_str`/`multiselect_str` types you may pre-seed choices via
 * `options`.
 */
export interface PropertyDefinitionCreate {
  /**
   * Human-readable name, unique within the scope the definition is created in. A
   * name already taken in that scope returns 409; the message names the existing
   * definition's id, slug and type so you can write to it instead.
   */
  name: string;

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

  icon?: string | null;

  /**
   * Scopes the definition to one list/app. Omit it only for a property that
   * genuinely belongs to the whole workspace: a definition created without `list_id`
   * is workspace-global and surfaces on every list of this object type.
   */
  list_id?: string | null;

  /**
   * Only honored when `type` is `select_str` or `multiselect_str`.
   */
  options?: Array<PropertyDefinitionCreate.Option>;

  /**
   * When true, records must carry a non-empty value for this property on create.
   * Defaults to false.
   */
  required?: boolean;

  /**
   * Optional display format for the property, drawn from the workspace's property
   * roles. Omit it and the canonical role for `type` is applied (plain text, plain
   * number, checkbox). Supply it only to pick a narrower format such as email, URL
   * or currency; the role's data type must match `type`.
   */
  role_id?: string | null;

  /**
   * URL-safe identifier. When omitted it defaults to a slugified `name` and is
   * disambiguated with a numeric suffix on conflict. When supplied explicitly it is
   * treated as part of your write contract and is never silently renamed — a
   * collision returns 409 instead.
   */
  slug?: string;
}

export namespace PropertyDefinitionCreate {
  export interface Option {
    value: string;

    color_scheme?: string | null;

    description?: string | null;

    icon?: string | null;

    option_group?: string | null;

    slug?: string;

    sort_index?: number | null;
  }
}

/**
 * Partial update of a property definition. Only `name`, `icon`, `enabled`, and
 * `required` are editable. `type` identifies the per-type table to write.
 */
export interface PropertyDefinitionPatch {
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

  enabled?: boolean;

  icon?: string | null;

  list_id?: string | null;

  name?: string;

  required?: boolean;
}

/**
 * Property definitions keyed by object type, then by property definition id
 * (UUID). When the request scopes to a single object type, only that key is
 * present.
 */
export type PropertyListResponse = { [key: string]: unknown };

/**
 * Property definitions keyed by object type, then by property definition id
 * (UUID). When the request scopes to a single object type, only that key is
 * present.
 */
export type PropertyListAllResponse = { [key: string]: unknown };

export interface PropertyCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param: Human-readable name, unique within the scope the definition is
   * created in. A name already taken in that scope returns 409; the message names
   * the existing definition's id, slug and type so you can write to it instead.
   */
  name: string;

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
  icon?: string | null;

  /**
   * Body param: Scopes the definition to one list/app. Omit it only for a property
   * that genuinely belongs to the whole workspace: a definition created without
   * `list_id` is workspace-global and surfaces on every list of this object type.
   */
  list_id?: string | null;

  /**
   * Body param: Only honored when `type` is `select_str` or `multiselect_str`.
   */
  options?: Array<PropertyCreateParams.Option>;

  /**
   * Body param: When true, records must carry a non-empty value for this property on
   * create. Defaults to false.
   */
  required?: boolean;

  /**
   * Body param: Optional display format for the property, drawn from the workspace's
   * property roles. Omit it and the canonical role for `type` is applied (plain
   * text, plain number, checkbox). Supply it only to pick a narrower format such as
   * email, URL or currency; the role's data type must match `type`.
   */
  role_id?: string | null;

  /**
   * Body param: URL-safe identifier. When omitted it defaults to a slugified `name`
   * and is disambiguated with a numeric suffix on conflict. When supplied explicitly
   * it is treated as part of your write contract and is never silently renamed — a
   * collision returns 409 instead.
   */
  slug?: string;

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

export namespace PropertyCreateParams {
  export interface Option {
    value: string;

    color_scheme?: string | null;

    description?: string | null;

    icon?: string | null;

    option_group?: string | null;

    slug?: string;

    sort_index?: number | null;
  }
}

export interface PropertyUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param: Object types that support CRUD, query, list, and per-type property
   * metadata. `GET /v2/prism/{teamId}/properties` (list-all) also returns
   * definitions for pipeline-owned types that are not in this set — including
   * `message`, `thread`, and `linkedin_thread`. Those types are not queryable.
   * Contacts expose `last_email` as a `ref_message`; you cannot query `message` to
   * follow it.
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
  name?: string;

  /**
   * Body param
   */
  required?: boolean;

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

export interface PropertyListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param
   */
  autofill?: boolean;

  /**
   * Query param: When false, return property definitions without hydrating
   * select/multiselect option rows. Defaults to true server-side
   * (parseIncludeOptions). Accepts boolean or query-string forms (true/false/0/1).
   * Uses anyOf (not oneOf) so qs/AJV boolean-vs-string ambiguity does not 400 when
   * Speakeasy SDKs send include_options=true.
   */
  include_options?: boolean | 'true' | 'false' | '0' | '1';

  /**
   * Query param: Scope properties to a specific list/app. Scoping is strict: the
   * response carries only that list's definitions, not the workspace-global ones
   * that also apply to its records. Call once with `list_id` and once without to see
   * everything a write could resolve against.
   */
  list_id?: string;

  /**
   * Query param: Case-insensitive substring match on the property name. Use this to
   * find an existing property before creating a new one.
   */
  term?: string;
}

export interface PropertyDeleteParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param: Object types that support CRUD, query, list, and per-type property
   * metadata. `GET /v2/prism/{teamId}/properties` (list-all) also returns
   * definitions for pipeline-owned types that are not in this set — including
   * `message`, `thread`, and `linkedin_thread`. Those types are not queryable.
   * Contacts expose `last_email` as a `ref_message`; you cannot query `message` to
   * follow it.
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
   * Query param: Storage type of this property definition.
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

export interface PropertyListAllParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param
   */
  autofill?: boolean;

  /**
   * Query param: When false, return property definitions without hydrating
   * select/multiselect option rows. Defaults to true server-side
   * (parseIncludeOptions). Accepts boolean or query-string forms (true/false/0/1).
   * Uses anyOf (not oneOf) so qs/AJV boolean-vs-string ambiguity does not 400 when
   * Speakeasy SDKs send include_options=true.
   */
  include_options?: boolean | 'true' | 'false' | '0' | '1';

  /**
   * Query param: Scope properties to a specific list/app. Scoping is strict: the
   * response carries only that list's definitions, not the workspace-global ones
   * that also apply to its records. Call once with `list_id` and once without to see
   * everything a write could resolve against.
   */
  list_id?: string;

  /**
   * Query param: Case-insensitive substring match on the property name. Use this to
   * find an existing property before creating a new one.
   */
  term?: string;
}

Properties.Options = Options;

export declare namespace Properties {
  export {
    type PropertyDefinition as PropertyDefinition,
    type PropertyDefinitionCreate as PropertyDefinitionCreate,
    type PropertyDefinitionPatch as PropertyDefinitionPatch,
    type PropertyListResponse as PropertyListResponse,
    type PropertyListAllResponse as PropertyListAllResponse,
    type PropertyCreateParams as PropertyCreateParams,
    type PropertyUpdateParams as PropertyUpdateParams,
    type PropertyListParams as PropertyListParams,
    type PropertyDeleteParams as PropertyDeleteParams,
    type PropertyListAllParams as PropertyListAllParams,
  };

  export {
    Options as Options,
    type PropertyOption as PropertyOption,
    type PropertyOptionCreate as PropertyOptionCreate,
    type PropertyOptionPatch as PropertyOptionPatch,
    type OptionCreateParams as OptionCreateParams,
    type OptionUpdateParams as OptionUpdateParams,
    type OptionDeleteParams as OptionDeleteParams,
  };
}
