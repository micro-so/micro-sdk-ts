import Micro, { WriteReadbackError, InvalidResponseError } from '../../src/lib/simple';

const expanded = (extra = {}) => ({
  id: 'identity-id',
  properties: {
    full_name: '王小明',
    first_name: null,
    middle_name: null,
    last_name: null,
    title: null,
    email_addresses: [{ id: 'contact-id', properties: { email: 'sam@example.com' } }],
    companies: [{ id: 'company-id', properties: 'company-id' }],
    ...extra,
  },
});
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('simple people HTTP behavior', () => {
  let replies: Response[];
  const calls: { url: string; init: RequestInit }[] = [];
  let micro: Micro;
  beforeEach(() => {
    replies = [];
    calls.length = 0;
    micro = new Micro({
      apiKey: 'key',
      teamID: 'team',
      baseURL: 'https://micro.test',
      maxRetries: 0,
      fetch: async (url, init) => {
        calls.push({ url: String(url), init: init as RequestInit });
        return replies.shift()!;
      },
    });
  });

  it('creates identity, preserves full names, and completes raw contact ids with one read', async () => {
    replies.push(
      json({ id: 'identity-id', default: { full_name: '王小明', email_addresses: ['contact-id'] } }),
      json(expanded()),
    );
    const person = await micro.people.create({
      full_name: '王小明',
      email_addresses: ['sam@example.com'],
      company_ids: ['company-id'],
    });
    expect(person.id).toBe('identity-id');
    expect(person.email_addresses).toEqual(['sam@example.com']);
    expect(person.company_ids).toEqual(['company-id']);
    expect(person.first_name).toBeNull();
    expect(calls[0]!.url.endsWith('/identity')).toBe(true);
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      default: { full_name: '王小明', email_addresses: ['sam@example.com'], companies: ['company-id'] },
    });
    expect(calls).toHaveLength(2);
    expect(new URL(calls[1]!.url).searchParams.get('select')).toContain('email_addresses.email');
    expect(new URL(calls[1]!.url).searchParams.get('select')).not.toContain('companies.id');
  });

  it('preserves independently provided name components and custom fields', async () => {
    replies.push(json(expanded({ first_name: 'Prince', last_name: null, vip: true })));
    await micro.people.update('identity-id', {
      first_name: 'Prince',
      last_name: null,
      properties: { vip: true },
    });
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      default: { first_name: 'Prince', last_name: null, vip: true },
    });
    expect(calls).toHaveLength(1);
  });

  it.each(['addEmails', 'removeEmails', 'addCompanies', 'removeCompanies'] as const)(
    '%s sends a server delta without a preliminary read',
    async (method) => {
      replies.push(json(expanded()));
      await micro.people[method]('identity-id', ['value']);
      const field = method.endsWith('Emails') ? 'email_addresses' : 'companies';
      expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
        default: { [field]: { _op: method.startsWith('add') ? 'append' : 'remove', values: ['value'] } },
      });
      expect(calls[0]!.init.method).toBe('PATCH');
      expect(calls).toHaveLength(1);
    },
  );

  it('array updates replace relationships and empty arrays explicitly clear', async () => {
    replies.push(json(expanded({ email_addresses: [], companies: [] })));
    const person = await micro.people.update('identity-id', { email_addresses: [], company_ids: [] });
    expect(person.email_addresses).toEqual([]);
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      default: { email_addresses: [], companies: [] },
    });
  });

  it('distinguishes committed writes with failed readback and never repeats them', async () => {
    replies.push(
      json({ id: 'identity-id', default: { title: 'Founder' } }),
      json({ error: { message: 'failed' } }, 503),
    );
    let failure: unknown;
    try {
      await micro.people.update('identity-id', { title: 'Founder' });
    } catch (error) {
      failure = error;
    }
    expect(failure).toBeInstanceOf(WriteReadbackError);
    expect(failure).toMatchObject({ record_id: 'identity-id', write_committed: true });
    expect(calls.map((c) => c.init.method)).toEqual(['PATCH', 'GET']);
  });

  it('does not present unresolved email references as empty addresses', async () => {
    replies.push(json(expanded({ email_addresses: [{ id: 'hidden', properties: null }] })));
    await expect(micro.people.get('identity-id')).rejects.toBeInstanceOf(InvalidResponseError);
  });

  it('rejects aliases and invalid relationship types before a request', async () => {
    for (const data of [
      { properties: { companies: [] } },
      { name: 'wrong' },
      { companies: [] },
      { email_addresses: null },
    ]) {
      await expect(micro.people.create(data as never)).rejects.toThrow();
    }
    expect(calls).toHaveLength(0);
  });
});
