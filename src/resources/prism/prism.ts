// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GrantAPI from './grant';
import { Grant } from './grant';
import * as MetadataAPI from './metadata';
import { Metadata } from './metadata';
import * as QueryAPI from './query';
import { Query, QueryExecuteParams, QueryExecuteResponse } from './query';

export class Prism extends APIResource {
  grant: GrantAPI.Grant = new GrantAPI.Grant(this._client);
  query: QueryAPI.Query = new QueryAPI.Query(this._client);
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);
}

export type ObjectType = 'deal' | 'identity' | 'ai_chat_thread' | 'ai_chat_message' | 'document' | 'action';

export interface PrismObjectProperties {
  id?: string;

  crm?: unknown;

  default?: unknown;

  extended?: unknown;
}

Prism.Grant = Grant;
Prism.Query = Query;
Prism.Metadata = Metadata;

export declare namespace Prism {
  export { type ObjectType as ObjectType, type PrismObjectProperties as PrismObjectProperties };

  export { Grant as Grant };

  export {
    Query as Query,
    type QueryExecuteResponse as QueryExecuteResponse,
    type QueryExecuteParams as QueryExecuteParams,
  };

  export { Metadata as Metadata };
}
