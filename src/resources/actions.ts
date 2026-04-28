// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Actions extends APIResource {}

export interface Action {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

export declare namespace Actions {
  export { type Action as Action };
}
