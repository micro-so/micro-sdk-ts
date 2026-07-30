// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ImportsAPI from './imports';
import { ImportGetParams, ImportGetResponse, Imports } from './imports';
import * as ObjectsAPI from './objects/objects';
import { Objects } from './objects/objects';
import * as PropertiesAPI from './properties/properties';
import {
  Properties,
  PropertyCreateParams,
  PropertyDefinition,
  PropertyDefinitionCreate,
  PropertyDefinitionPatch,
  PropertyDeleteParams,
  PropertyListAllParams,
  PropertyListAllResponse,
  PropertyListParams,
  PropertyListResponse,
  PropertyUpdateParams,
} from './properties/properties';

export class Prism extends APIResource {
  properties: PropertiesAPI.Properties = new PropertiesAPI.Properties(this._client);
  imports: ImportsAPI.Imports = new ImportsAPI.Imports(this._client);
  objects: ObjectsAPI.Objects = new ObjectsAPI.Objects(this._client);
}

export interface PrismObjectProperties {
  /**
   * Properties keyed by property slug. Values can be strings, numbers, booleans,
   * arrays, or null. For select/multiselect properties, values may be option slugs
   * or option UUIDs on write; option slugs are returned on read.
   */
  default?: { [key: string]: unknown };

  list?: unknown;
}

Prism.Properties = Properties;
Prism.Imports = Imports;
Prism.Objects = Objects;

export declare namespace Prism {
  export { type PrismObjectProperties as PrismObjectProperties };

  export {
    Properties as Properties,
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
    Imports as Imports,
    type ImportGetResponse as ImportGetResponse,
    type ImportGetParams as ImportGetParams,
  };

  export { Objects as Objects };
}
