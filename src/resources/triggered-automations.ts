// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class TriggeredAutomations extends APIResource {
  /**
   * Create a triggered automation (state + changeset filter trees)
   */
  create(
    automationObjectType:
      | 'message'
      | 'action'
      | 'event'
      | 'document'
      | 'identity'
      | 'linkedin_message'
      | 'deal'
      | 'organization'
      | 'contact',
    params: TriggeredAutomationCreateParams,
    options?: RequestOptions,
  ): APIPromise<TriggeredAutomation> {
    const { teamId = this._client.teamID, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v2/prism/${teamId}/${automationObjectType}/triggered_automations`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Replace a triggered automation (idempotent full write of the whole tree)
   */
  update(
    automationID: string,
    params: TriggeredAutomationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TriggeredAutomation> {
    const {
      teamId = this._client.teamID,
      automationObjectType,
      'Idempotency-Key': idempotencyKey,
      ...body
    } = params;
    return this._client.put(
      path`/v2/prism/${teamId}/${automationObjectType}/triggered_automations/${automationID}`,
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
   * List triggered automations for an owner
   */
  list(
    automationObjectType:
      | 'message'
      | 'action'
      | 'event'
      | 'document'
      | 'identity'
      | 'linkedin_message'
      | 'deal'
      | 'organization'
      | 'contact',
    params: TriggeredAutomationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TriggeredAutomationListResponse> {
    const { teamId = this._client.teamID, ...query } = params ?? {};
    return this._client.get(path`/v2/prism/${teamId}/${automationObjectType}/triggered_automations`, {
      query,
      ...options,
    });
  }

  /**
   * Delete a triggered automation and its filter trees
   */
  delete(
    automationID: string,
    params: TriggeredAutomationDeleteParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { teamId = this._client.teamID, automationObjectType } = params;
    return this._client.delete(
      path`/v2/prism/${teamId}/${automationObjectType}/triggered_automations/${automationID}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }

  /**
   * Read a triggered automation
   */
  get(
    automationID: string,
    params: TriggeredAutomationGetParams,
    options?: RequestOptions,
  ): APIPromise<TriggeredAutomation> {
    const { teamId = this._client.teamID, automationObjectType } = params;
    return this._client.get(
      path`/v2/prism/${teamId}/${automationObjectType}/triggered_automations/${automationID}`,
      options,
    );
  }
}

/**
 * A triggered automation. `kind` selects the shape: `update` fires on object
 * updates and requires a `changeset` (from/to transition) filter plus an optional
 * `state` precondition; `lifecycle` fires on create and/or delete
 * (`on_create`/`on_delete`) and requires a `state` filter (no changeset). `state`
 * permits dot-paths (nested reference filters); `changeset` is direct properties
 * only. Object type is taken from the path.
 */
export interface TriggeredAutomation {
  kind: 'update' | 'lifecycle';

  name: string;

  id?: string;

  /**
   * Actions to run when the automation fires; each item has a `type` plus
   * type-specific fields.
   */
  actions?: Array<TriggeredAutomation.Action>;

  /**
   * A changeset filter group (update automations only): a combinator plus an array
   * of transition clauses matching what is changing. Dot-paths (nested reference
   * filters) are NOT permitted — direct properties only.
   */
  changeset?: TriggeredAutomation.Changeset;

  created_at?: string;

  enabled?: boolean;

  list_id?: string | null;

  /**
   * Lifecycle automations only.
   */
  on_create?: boolean;

  /**
   * Lifecycle automations only.
   */
  on_delete?: boolean;

  /**
   * A filter group: a combinator plus an array of slug-based clauses. Dot-paths
   * (e.g. `organization.location`) express nested reference filters.
   */
  state?: TriggeredAutomation.State;

  team_id?: string | null;

  updated_at?: string | null;

  user_id?: string | null;
}

export namespace TriggeredAutomation {
  /**
   * An action the automation runs when it fires. `type` selects the kind; the
   * remaining fields are type-specific (`agent` → `agent_id`, `webhook` →
   * `webhook_id`, `email`/`linkedin` → the send-as user, template, and
   * recipient-view fields). Generic: new action types add fields here.
   */
  export interface Action {
    type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin';

    /**
     * Required when `type` is `agent`. The agent to run.
     */
    agent_id?: string | null;

    /**
     * wait: cron schedule for the resume time. Exactly one of delay_seconds or
     * cron_expression.
     */
    cron_expression?: string | null;

    /**
     * wait: relative delay in seconds. Exactly one of delay_seconds or
     * cron_expression.
     */
    delay_seconds?: number | null;

    /**
     * Required when `type` is `email`. The property (on the recipient view object)
     * holding the recipient email address.
     */
    recipient_email_prop_def_id?: string | null;

    /**
     * Required when `type` is `linkedin`. The property (on the recipient view object)
     * holding the recipient LinkedIn provider id.
     */
    recipient_provider_prop_def_id?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The saved prism view resolved at
     * send time to the recipient audience (its filter re-runs each step, so responders
     * drop out of later drip sends).
     */
    recipient_view_id?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. Must be `contact` — the recipient
     * audience is a contact view (contacts carry the direct email / linkedin provider
     * property).
     */
    recipient_view_object_type?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The user (external id) the
     * message is sent as.
     */
    send_as_user_id?: string | null;

    /**
     * Required when `type` is `email`. The subject line; rendered as a Liquid template
     * per recipient.
     */
    subject?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The email-template document whose
     * body is rendered (Liquid) per recipient.
     */
    template_id?: string | null;

    /**
     * wait: IANA timezone for evaluating cron_expression (optional).
     */
    timezone?: string | null;

    /**
     * Required when `type` is `webhook`. The id of the webhook the event is dispatched
     * to (async) when the automation fires.
     */
    webhook_id?: string | null;

    [k: string]: unknown;
  }

  /**
   * A changeset filter group (update automations only): a combinator plus an array
   * of transition clauses matching what is changing. Dot-paths (nested reference
   * filters) are NOT permitted — direct properties only.
   */
  export interface Changeset {
    combinator?: 'AND' | 'OR';

    /**
     * Each entry is a transition clause { slug: { from?: { comparator: value }, to?: {
     * comparator: value } } }. `from` matches the prior value, `to` the new value; an
     * empty body { slug: {} } matches any change to that property.
     */
    filter?: Array<{ [key: string]: unknown }>;
  }

  /**
   * A filter group: a combinator plus an array of slug-based clauses. Dot-paths
   * (e.g. `organization.location`) express nested reference filters.
   */
  export interface State {
    combinator?: 'AND' | 'OR';

    /**
     * Each entry is { slug: { comparator: value } }
     */
    filter?: Array<{ [key: string]: unknown }>;
  }
}

export interface TriggeredAutomationListResponse {
  data: Array<TriggeredAutomation>;

  /**
   * True if more automations exist beyond this page.
   */
  has_more: boolean;

  /**
   * Opaque cursor for the next page; null when has_more is false.
   */
  next_cursor?: string | null;
}

export interface TriggeredAutomationCreateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Body param
   */
  kind: 'update' | 'lifecycle';

  /**
   * Body param
   */
  name: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param: Actions to run when the automation fires; each item has a `type`
   * plus type-specific fields.
   */
  actions?: Array<TriggeredAutomationCreateParams.Action>;

  /**
   * Body param: A changeset filter group (update automations only): a combinator
   * plus an array of transition clauses matching what is changing. Dot-paths (nested
   * reference filters) are NOT permitted — direct properties only.
   */
  changeset?: TriggeredAutomationCreateParams.Changeset;

  /**
   * Body param
   */
  created_at?: string;

  /**
   * Body param
   */
  enabled?: boolean;

  /**
   * Body param
   */
  list_id?: string | null;

  /**
   * Body param: Lifecycle automations only.
   */
  on_create?: boolean;

  /**
   * Body param: Lifecycle automations only.
   */
  on_delete?: boolean;

  /**
   * Body param: A filter group: a combinator plus an array of slug-based clauses.
   * Dot-paths (e.g. `organization.location`) express nested reference filters.
   */
  state?: TriggeredAutomationCreateParams.State;

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

export namespace TriggeredAutomationCreateParams {
  /**
   * An action the automation runs when it fires. `type` selects the kind; the
   * remaining fields are type-specific (`agent` → `agent_id`, `webhook` →
   * `webhook_id`, `email`/`linkedin` → the send-as user, template, and
   * recipient-view fields). Generic: new action types add fields here.
   */
  export interface Action {
    type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin';

    /**
     * Required when `type` is `agent`. The agent to run.
     */
    agent_id?: string | null;

    /**
     * wait: cron schedule for the resume time. Exactly one of delay_seconds or
     * cron_expression.
     */
    cron_expression?: string | null;

    /**
     * wait: relative delay in seconds. Exactly one of delay_seconds or
     * cron_expression.
     */
    delay_seconds?: number | null;

    /**
     * Required when `type` is `email`. The property (on the recipient view object)
     * holding the recipient email address.
     */
    recipient_email_prop_def_id?: string | null;

    /**
     * Required when `type` is `linkedin`. The property (on the recipient view object)
     * holding the recipient LinkedIn provider id.
     */
    recipient_provider_prop_def_id?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The saved prism view resolved at
     * send time to the recipient audience (its filter re-runs each step, so responders
     * drop out of later drip sends).
     */
    recipient_view_id?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. Must be `contact` — the recipient
     * audience is a contact view (contacts carry the direct email / linkedin provider
     * property).
     */
    recipient_view_object_type?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The user (external id) the
     * message is sent as.
     */
    send_as_user_id?: string | null;

    /**
     * Required when `type` is `email`. The subject line; rendered as a Liquid template
     * per recipient.
     */
    subject?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The email-template document whose
     * body is rendered (Liquid) per recipient.
     */
    template_id?: string | null;

    /**
     * wait: IANA timezone for evaluating cron_expression (optional).
     */
    timezone?: string | null;

    /**
     * Required when `type` is `webhook`. The id of the webhook the event is dispatched
     * to (async) when the automation fires.
     */
    webhook_id?: string | null;

    [k: string]: unknown;
  }

  /**
   * A changeset filter group (update automations only): a combinator plus an array
   * of transition clauses matching what is changing. Dot-paths (nested reference
   * filters) are NOT permitted — direct properties only.
   */
  export interface Changeset {
    combinator?: 'AND' | 'OR';

    /**
     * Each entry is a transition clause { slug: { from?: { comparator: value }, to?: {
     * comparator: value } } }. `from` matches the prior value, `to` the new value; an
     * empty body { slug: {} } matches any change to that property.
     */
    filter?: Array<{ [key: string]: unknown }>;
  }

  /**
   * A filter group: a combinator plus an array of slug-based clauses. Dot-paths
   * (e.g. `organization.location`) express nested reference filters.
   */
  export interface State {
    combinator?: 'AND' | 'OR';

    /**
     * Each entry is { slug: { comparator: value } }
     */
    filter?: Array<{ [key: string]: unknown }>;
  }
}

export interface TriggeredAutomationUpdateParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Path param: Object types that support triggered automations. Must match the
   * triggered-automation whitelist in @micro/database migrate-sql
   * (TRIGGERED_AUTOMATION_OBJECTS).
   */
  automationObjectType:
    | 'message'
    | 'action'
    | 'event'
    | 'document'
    | 'identity'
    | 'linkedin_message'
    | 'deal'
    | 'organization'
    | 'contact';

  /**
   * Body param
   */
  kind: 'update' | 'lifecycle';

  /**
   * Body param
   */
  name: string;

  /**
   * Body param
   */
  id?: string;

  /**
   * Body param: Actions to run when the automation fires; each item has a `type`
   * plus type-specific fields.
   */
  actions?: Array<TriggeredAutomationUpdateParams.Action>;

  /**
   * Body param: A changeset filter group (update automations only): a combinator
   * plus an array of transition clauses matching what is changing. Dot-paths (nested
   * reference filters) are NOT permitted — direct properties only.
   */
  changeset?: TriggeredAutomationUpdateParams.Changeset;

  /**
   * Body param
   */
  created_at?: string;

  /**
   * Body param
   */
  enabled?: boolean;

  /**
   * Body param
   */
  list_id?: string | null;

  /**
   * Body param: Lifecycle automations only.
   */
  on_create?: boolean;

  /**
   * Body param: Lifecycle automations only.
   */
  on_delete?: boolean;

  /**
   * Body param: A filter group: a combinator plus an array of slug-based clauses.
   * Dot-paths (e.g. `organization.location`) express nested reference filters.
   */
  state?: TriggeredAutomationUpdateParams.State;

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

export namespace TriggeredAutomationUpdateParams {
  /**
   * An action the automation runs when it fires. `type` selects the kind; the
   * remaining fields are type-specific (`agent` → `agent_id`, `webhook` →
   * `webhook_id`, `email`/`linkedin` → the send-as user, template, and
   * recipient-view fields). Generic: new action types add fields here.
   */
  export interface Action {
    type: 'agent' | 'webhook' | 'wait' | 'email' | 'linkedin';

    /**
     * Required when `type` is `agent`. The agent to run.
     */
    agent_id?: string | null;

    /**
     * wait: cron schedule for the resume time. Exactly one of delay_seconds or
     * cron_expression.
     */
    cron_expression?: string | null;

    /**
     * wait: relative delay in seconds. Exactly one of delay_seconds or
     * cron_expression.
     */
    delay_seconds?: number | null;

    /**
     * Required when `type` is `email`. The property (on the recipient view object)
     * holding the recipient email address.
     */
    recipient_email_prop_def_id?: string | null;

    /**
     * Required when `type` is `linkedin`. The property (on the recipient view object)
     * holding the recipient LinkedIn provider id.
     */
    recipient_provider_prop_def_id?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The saved prism view resolved at
     * send time to the recipient audience (its filter re-runs each step, so responders
     * drop out of later drip sends).
     */
    recipient_view_id?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. Must be `contact` — the recipient
     * audience is a contact view (contacts carry the direct email / linkedin provider
     * property).
     */
    recipient_view_object_type?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The user (external id) the
     * message is sent as.
     */
    send_as_user_id?: string | null;

    /**
     * Required when `type` is `email`. The subject line; rendered as a Liquid template
     * per recipient.
     */
    subject?: string | null;

    /**
     * Required when `type` is `email` or `linkedin`. The email-template document whose
     * body is rendered (Liquid) per recipient.
     */
    template_id?: string | null;

    /**
     * wait: IANA timezone for evaluating cron_expression (optional).
     */
    timezone?: string | null;

    /**
     * Required when `type` is `webhook`. The id of the webhook the event is dispatched
     * to (async) when the automation fires.
     */
    webhook_id?: string | null;

    [k: string]: unknown;
  }

  /**
   * A changeset filter group (update automations only): a combinator plus an array
   * of transition clauses matching what is changing. Dot-paths (nested reference
   * filters) are NOT permitted — direct properties only.
   */
  export interface Changeset {
    combinator?: 'AND' | 'OR';

    /**
     * Each entry is a transition clause { slug: { from?: { comparator: value }, to?: {
     * comparator: value } } }. `from` matches the prior value, `to` the new value; an
     * empty body { slug: {} } matches any change to that property.
     */
    filter?: Array<{ [key: string]: unknown }>;
  }

  /**
   * A filter group: a combinator plus an array of slug-based clauses. Dot-paths
   * (e.g. `organization.location`) express nested reference filters.
   */
  export interface State {
    combinator?: 'AND' | 'OR';

    /**
     * Each entry is { slug: { comparator: value } }
     */
    filter?: Array<{ [key: string]: unknown }>;
  }
}

export interface TriggeredAutomationListParams {
  /**
   * Path param
   */
  teamId?: string;

  /**
   * Query param: Opaque pagination cursor (from a prior response's next_cursor);
   * supersedes page/limit when present.
   */
  cursor?: string;

  /**
   * Query param: Optional filter to a single automation kind. When omitted, both
   * kinds are returned.
   */
  kind?: 'update' | 'lifecycle';

  /**
   * Query param: Maximum items per page (<= 50; defaults to 50).
   */
  limit?: number;

  /**
   * Query param: List (CRM) id to scope the listing to. When omitted, automations
   * owned by the path team are returned.
   */
  list_id?: string;

  /**
   * Query param: 1-based page number. Prefer cursor.
   */
  page?: number;
}

export interface TriggeredAutomationDeleteParams {
  teamId?: string;

  /**
   * Object types that support triggered automations. Must match the
   * triggered-automation whitelist in @micro/database migrate-sql
   * (TRIGGERED_AUTOMATION_OBJECTS).
   */
  automationObjectType:
    | 'message'
    | 'action'
    | 'event'
    | 'document'
    | 'identity'
    | 'linkedin_message'
    | 'deal'
    | 'organization'
    | 'contact';
}

export interface TriggeredAutomationGetParams {
  teamId?: string;

  /**
   * Object types that support triggered automations. Must match the
   * triggered-automation whitelist in @micro/database migrate-sql
   * (TRIGGERED_AUTOMATION_OBJECTS).
   */
  automationObjectType:
    | 'message'
    | 'action'
    | 'event'
    | 'document'
    | 'identity'
    | 'linkedin_message'
    | 'deal'
    | 'organization'
    | 'contact';
}

export declare namespace TriggeredAutomations {
  export {
    type TriggeredAutomation as TriggeredAutomation,
    type TriggeredAutomationListResponse as TriggeredAutomationListResponse,
    type TriggeredAutomationCreateParams as TriggeredAutomationCreateParams,
    type TriggeredAutomationUpdateParams as TriggeredAutomationUpdateParams,
    type TriggeredAutomationListParams as TriggeredAutomationListParams,
    type TriggeredAutomationDeleteParams as TriggeredAutomationDeleteParams,
    type TriggeredAutomationGetParams as TriggeredAutomationGetParams,
  };
}
