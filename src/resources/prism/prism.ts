// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MetadataAPI from './metadata';
import { Metadata, MetadataListParams, MetadataListResponse } from './metadata';
import * as ObjectsAPI from './objects/objects';
import { Objects } from './objects/objects';

export class Prism extends APIResource {
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);
  objects: ObjectsAPI.Objects = new ObjectsAPI.Objects(this._client);
}

export interface PrismObjectProperties {
  id?: string;

  crm?: unknown;

  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null. For select/multiselect properties, values may be option slugs
   * or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  extended?: unknown;
}

Prism.Metadata = Metadata;
Prism.Objects = Objects;

export declare namespace Prism {
  export { type PrismObjectProperties as PrismObjectProperties };

  export {
    Metadata as Metadata,
    type MetadataListResponse as MetadataListResponse,
    type MetadataListParams as MetadataListParams,
  };

  export { Objects as Objects };
}
