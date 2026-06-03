// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as GrantAPI from './grant';
import { Grant } from './grant';

export class Engagements extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);
}

export interface Engagement {
  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null. For select/multiselect properties, values may be option slugs
   * or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

Engagements.Grant = Grant;

export declare namespace Engagements {
  export { type Engagement as Engagement };

  export { Grant as Grant };
}
