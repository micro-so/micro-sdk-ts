import { Resource, fields, scalar, extra, type CallOptions, type WriteFields } from './simple-core';

export type CompanyFields = { name?: string | null; primary_domain?: string | null } & WriteFields;
export type Company = {
  id: string;
  name: string | null;
  primary_domain: string | null;
  properties: Record<string, unknown>;
};
export type CompanyFilter = { primary_domain?: string };

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

  async update(id: string, data: CompanyFields, options: CallOptions = {}): Promise<Company> {
    return this.write(id, this.input(data), options);
  }
}
