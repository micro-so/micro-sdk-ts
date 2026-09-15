import RawMicro, { type ClientOptions } from '../index';
import { Companies } from './simple-companies';
import { People } from './simple-people';

export {
  People,
  type Person,
  type PersonFields,
  type PersonFilter,
  type PersonMatch,
  type PersonDefaults,
} from './simple-people';

export {
  Companies,
  type Company,
  type CompanyFields,
  type CompanyFilter,
  type CompanyMatch,
  type CompanyDefaults,
} from './simple-companies';
export {
  APIError,
  WriteReadbackError,
  InvalidResponseError,
  type ReadOptions,
  type CallOptions,
  type Page,
  type FindOrCreateResult,
} from './simple-core';

/** Opt-in convenience client. The original generated SDK is available as raw. */
export default class Micro {
  readonly raw: RawMicro;
  readonly companies: Companies;
  readonly people: People;

  constructor(options: ClientOptions) {
    this.raw = new RawMicro(options);
    const endpoint = (type: string) =>
      `/v2/prism/${encodeURIComponent(this.raw.teamID)}/${type}/find-or-create`;
    this.companies = new Companies(this.raw.prism.objects.organizations, (body, options) =>
      this.raw.post(endpoint('organization'), { ...options, body }),
    );
    this.people = new People(this.raw.prism.objects.identities, (body, options) =>
      this.raw.post(endpoint('identity'), { ...options, body }),
    );
  }
}
