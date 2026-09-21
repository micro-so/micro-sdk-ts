import RawMicro, { type ClientOptions } from '../index';
import { Companies } from './simple-companies';
import { People } from './simple-people';
import { Fields } from './simple-fields';
import { Lists } from './simple-lists';
import { Views } from './simple-views';

export { People, type Person, type PersonFields, type PersonFilter } from './simple-people';

export { Companies, type Company, type CompanyFields, type CompanyFilter } from './simple-companies';
export {
  APIError,
  WriteReadbackError,
  InvalidResponseError,
  type ReadOptions,
  type CallOptions,
  type Page,
} from './simple-core';

export { type SimpleRecordType, type SimpleScope, type SimpleSource } from './simple-scope';
export {
  Fields,
  FieldNotFoundError,
  type Field,
  type FieldType,
  type FieldOption,
  type FieldCreate,
  type FieldUpdate,
  type FieldOptionCreate,
  type FieldOptionUpdate,
} from './simple-fields';
export {
  Lists,
  type List,
  type ListCreate,
  type ListRecordType,
  type ListTemplate,
  type ListRecordRef,
  type ListRecordsParams,
} from './simple-lists';
export {
  Views,
  type View,
  type ViewLayout,
  type ViewFilter,
  type ViewSort,
  type ViewCreate,
  type ViewUpdate,
  type ViewRoute,
  type ViewList,
} from './simple-views';
export { type ViewRecord, type ViewRecordRoute, type ViewRecordList } from './simple-view-records';

/** Opt-in convenience client. The original generated SDK is available as raw. */
export default class Micro {
  readonly raw: RawMicro;
  readonly companies: Companies;
  readonly people: People;
  readonly fields: Fields;
  readonly lists: Lists;
  readonly views: Views;

  constructor(options: ClientOptions) {
    this.raw = new RawMicro(options);
    this.companies = new Companies(this.raw.prism.objects.organizations);
    this.people = new People(this.raw.prism.objects.identities);
    this.fields = new Fields(this.raw.prism.properties);
    this.lists = new Lists(this.raw);
    this.views = new Views(this.raw.views, options.teamID);
  }
}
