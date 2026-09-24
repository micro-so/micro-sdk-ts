import RawMicro, { type ClientOptions } from '../index';
import { Companies } from './simple-companies';
import { People } from './simple-people';

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

/** Opt-in convenience client. The original generated SDK is available as raw. */
export default class Micro {
  readonly raw: RawMicro;
  readonly companies: Companies;
  readonly people: People;

  constructor(options: ClientOptions) {
    this.raw = new RawMicro(options);
    this.companies = new Companies(this.raw.prism.objects.organizations);
    this.people = new People(this.raw.prism.objects.identities);
  }
}
