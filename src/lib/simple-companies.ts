import { Resource, fields, scalar, extra, type CallOptions, type WriteFields } from './simple-core';

export type CompanyFields = { name?: string | null; primary_domain?: string | null } & WriteFields;
export type Company = {
  id: string;
  name: string | null;
  primary_domain: string | null;
  properties: Record<string, unknown>;
};
export type CompanyFilter = { primary_domain?: string };
export type CompanyMatch = { primary_domain: string };
export type CompanyDefaults = Omit<CompanyFields, 'primary_domain'>;

export class Companies extends Resource<Company, CompanyFilter> {
  protected readonly keys = ['name', 'primary_domain'];
  protected readonly select = this.keys;

  protected normalize(value: unknown): Company {
    const { id, values } = fields(value);
    return {
      id,
      name: scalar(values['name']),
      primary_domain: scalar(values['primary_domain']),
      properties: extra(values, this.keys),
    };
  }

  protected filters(where: CompanyFilter) {
    for (const [key, value] of Object.entries(where)) {
      if (key !== 'primary_domain' || typeof value !== 'string')
        throw new TypeError('Expected primary_domain equality filter.');
    }
    return where.primary_domain === undefined ? [] : [{ primary_domain: { '=': where.primary_domain } }];
  }

  async create(data: CompanyFields, options: CallOptions = {}): Promise<Company> {
    return this.write(undefined, this.input(data), options);
  }

  /** Returns a single match unchanged. Defaults apply only when creating. */
  async findOrCreate(match: CompanyMatch, defaults: CompanyDefaults = {}, options: CallOptions = {}) {
    if (
      !match ||
      Object.keys(match).length !== 1 ||
      typeof match.primary_domain !== 'string' ||
      !match.primary_domain.trim()
    )
      throw new TypeError('Match requires exactly primary_domain.');
    if ('primary_domain' in defaults) throw new TypeError('Supply the matching domain through match.');
    return this.findOrCreateRecord({ primary_domain: match.primary_domain }, this.input(defaults), options);
  }

  async update(id: string, data: CompanyFields, options: CallOptions = {}): Promise<Company> {
    return this.write(id, this.input(data), options);
  }
}
