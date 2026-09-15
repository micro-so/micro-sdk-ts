import {
  Resource,
  fields,
  scalar,
  extra,
  bag,
  InvalidResponseError,
  type WriteFields,
  type CallOptions,
} from './simple-core';

const NAMES = ['full_name', 'first_name', 'middle_name', 'last_name', 'title'] as const;
export type PersonFields = Partial<Record<(typeof NAMES)[number], string | null>> &
  WriteFields & {
    email_addresses?: string[];
    company_ids?: string[];
  };
export type Person = Record<(typeof NAMES)[number], string | null> & {
  id: string;
  email_addresses: string[];
  company_ids: string[];
  properties: Record<string, unknown>;
};
export type PersonFilter = { email_address?: string; company_id?: string };
export type PersonMatch = { email_address: string };
export type PersonDefaults = Omit<PersonFields, 'email_addresses'>;

function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((v) => typeof v !== 'string'))
    throw new TypeError(`${field} must be an array of strings.`);
  return value;
}

function references(value: unknown, email: boolean): string[] {
  if (value === null) return [];
  if (!Array.isArray(value))
    throw new InvalidResponseError('Relationship projection is missing or incomplete.');
  return [
    ...new Set(
      value.map((entry) => {
        if (!email && typeof entry === 'string') return entry;
        const ref = bag(entry);
        if (typeof ref['id'] !== 'string') throw new InvalidResponseError('Relationship id is missing.');
        if (!email) return ref['id'];
        const address = bag(ref['properties'])['email'];
        if (typeof address !== 'string' || !address.includes('@'))
          throw new InvalidResponseError('Email relationship was not resolved.');
        return address;
      }),
    ),
  ];
}

export class People extends Resource<Person, PersonFilter> {
  protected readonly keys = [...NAMES, 'email_addresses', 'company_ids', 'companies'];
  protected readonly select = [...NAMES, 'email_addresses.email', 'companies'];

  protected normalize(value: unknown): Person {
    const { id, values } = fields(value);
    return {
      id,
      full_name: scalar(values['full_name']),
      first_name: scalar(values['first_name']),
      middle_name: scalar(values['middle_name']),
      last_name: scalar(values['last_name']),
      title: scalar(values['title']),
      email_addresses: references(values['email_addresses'], true),
      company_ids: references(values['companies'], false),
      properties: extra(values, this.keys),
    };
  }

  protected filters(where: PersonFilter) {
    const filter: Array<Record<string, { '=': string } | { in: string[] }>> = [];
    for (const [key, value] of Object.entries(where)) {
      if (!['email_address', 'company_id'].includes(key) || typeof value !== 'string')
        throw new TypeError('Expected email_address or company_id equality filter.');
      filter.push(
        key === 'email_address' ?
          { 'email_addresses.email': { '=': value } }
        : { companies: { in: [value] } },
      );
    }
    return filter;
  }

  private personInput(data: PersonFields): Record<string, unknown> {
    const { email_addresses, company_ids, ...rest } = data;
    if ('companies' in rest) throw new TypeError('Use company_ids for company relationships.');
    return {
      ...this.input(rest),
      ...(email_addresses !== undefined ?
        { email_addresses: strings(email_addresses, 'email_addresses') }
      : {}),
      ...(company_ids !== undefined ? { companies: strings(company_ids, 'company_ids') } : {}),
    };
  }

  async create(data: PersonFields, options: CallOptions = {}): Promise<Person> {
    return this.write(undefined, this.personInput(data), options);
  }

  /** Returns a single match unchanged. Defaults apply only when creating. */
  async findOrCreate(match: PersonMatch, defaults: PersonDefaults = {}, options: CallOptions = {}) {
    if (
      !match ||
      Object.keys(match).length !== 1 ||
      typeof match.email_address !== 'string' ||
      !match.email_address.trim()
    )
      throw new TypeError('Match requires exactly email_address.');
    if ('email_addresses' in defaults) throw new TypeError('Supply the matching email through match.');
    return this.findOrCreateRecord(
      { email_address: match.email_address },
      this.personInput(defaults),
      options,
    );
  }

  /** Supplied relationship arrays replace the set. Use add/remove helpers for deltas. */
  async update(id: string, data: PersonFields, options: CallOptions = {}): Promise<Person> {
    return this.write(id, this.personInput(data), options);
  }

  async addEmails(id: string, values: string[], options: CallOptions = {}): Promise<Person> {
    return this.write(
      id,
      { email_addresses: { _op: 'append', values: strings(values, 'email_addresses') } },
      options,
    );
  }

  async removeEmails(id: string, values: string[], options: CallOptions = {}): Promise<Person> {
    return this.write(
      id,
      { email_addresses: { _op: 'remove', values: strings(values, 'email_addresses') } },
      options,
    );
  }

  async addCompanies(id: string, values: string[], options: CallOptions = {}): Promise<Person> {
    return this.write(id, { companies: { _op: 'append', values: strings(values, 'company_ids') } }, options);
  }

  async removeCompanies(id: string, values: string[], options: CallOptions = {}): Promise<Person> {
    return this.write(id, { companies: { _op: 'remove', values: strings(values, 'company_ids') } }, options);
  }
}
