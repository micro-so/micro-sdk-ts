// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ImportJobsAPI from './import-jobs';
import { ImportJobGetParams, ImportJobGetResponse, ImportJobs } from './import-jobs';
import * as PropertiesAPI from './properties';
import {
  Properties,
  PropertyListAllParams,
  PropertyListAllResponse,
  PropertyListParams,
  PropertyListResponse,
} from './properties';
import * as ObjectsAPI from './objects/objects';
import { Objects } from './objects/objects';

export class Prism extends APIResource {
  properties: PropertiesAPI.Properties = new PropertiesAPI.Properties(this._client);
  importJobs: ImportJobsAPI.ImportJobs = new ImportJobsAPI.ImportJobs(this._client);
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
Prism.ImportJobs = ImportJobs;
Prism.Objects = Objects;

export declare namespace Prism {
  export { type PrismObjectProperties as PrismObjectProperties };

  export {
    Properties as Properties,
    type PropertyListResponse as PropertyListResponse,
    type PropertyListAllResponse as PropertyListAllResponse,
    type PropertyListParams as PropertyListParams,
    type PropertyListAllParams as PropertyListAllParams,
  };

  export {
    ImportJobs as ImportJobs,
    type ImportJobGetResponse as ImportJobGetResponse,
    type ImportJobGetParams as ImportJobGetParams,
  };

  export { Objects as Objects };
}
