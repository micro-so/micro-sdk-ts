// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as GrantAPI from './grant';
import { Grant, GrantGetParams, GrantGetResponse, GrantUpdateParams, GrantUpdateResponse } from './grant';

export class Messages extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);
}

Messages.Grant = Grant;

export declare namespace Messages {
  export {
    Grant as Grant,
    type GrantUpdateResponse as GrantUpdateResponse,
    type GrantGetResponse as GrantGetResponse,
    type GrantUpdateParams as GrantUpdateParams,
    type GrantGetParams as GrantGetParams,
  };
}
