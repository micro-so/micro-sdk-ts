import Micro, { APIError, WriteReadbackError } from '../../src/lib/simple';
import { ConflictError, InternalServerError } from '../../src';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
const person = {
  id: 'identity-id',
  properties: {
    full_name: 'Existing name',
    first_name: null,
    middle_name: null,
    last_name: null,
    title: null,
    email_addresses: [{ id: 'contact-id', properties: { email: 'sam@example.com' } }],
    companies: [],
  },
};
describe('simple find-or-create', () => {
  let replies: Response[];
  let calls: { url: string; init: RequestInit }[];
  let micro: Micro;
  beforeEach(() => {
    replies = [];
    calls = [];
    micro = new Micro({
      apiKey: 'key',
      teamID: 'team',
      maxRetries: 4,
      baseURL: 'https://micro.test',
      fetch: async (url, init) => {
        calls.push({ url: String(url), init: init as RequestInit });
        return replies.shift()!;
      },
    });
  });
  it('returns an existing person unchanged without a PATCH', async () => {
    replies.push(json({ created: false, record: { id: 'identity-id' } }), json(person));
    const result = await micro.people.findOrCreate(
      { email_address: 'sam@example.com' },
      { full_name: 'Ignored' },
    );
    expect(result.created).toBe(false);
    expect(result.record.full_name).toBe('Existing name');
    expect(calls.map((c) => c.init.method)).toEqual(['POST', 'GET']);
    expect(calls[0]!.url).toBe('https://micro.test/v2/prism/team/identity/find-or-create');
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      match: { email_address: 'sam@example.com' },
      defaults: { full_name: 'Ignored' },
    });
  });
  it('creates companies with a consistent shape and no extra read for complete results', async () => {
    replies.push(
      json(
        {
          created: true,
          record: { id: 'company-id', default: { name: 'Acme', primary_domain: 'acme.com' } },
        },
        201,
      ),
    );
    const result = await micro.companies.findOrCreate({ primary_domain: 'acme.com' }, { name: 'Acme' });
    expect(result).toEqual({
      created: true,
      record: { id: 'company-id', name: 'Acme', primary_domain: 'acme.com', properties: {} },
    });
    expect(calls).toHaveLength(1);
    expect(calls[0]!.url).toContain('/organization/find-or-create');
  });
  it('translates company relationships and custom defaults', async () => {
    replies.push(json({ created: true, record: person }));
    await micro.people.findOrCreate(
      { email_address: 'sam@example.com' },
      { company_ids: ['company-id'], properties: { vip: true } },
    );
    expect(JSON.parse(calls[0]!.init.body as string).defaults).toEqual({
      companies: ['company-id'],
      vip: true,
    });
  });
  it('preserves API conflicts and never automatically retries mutations', async () => {
    replies.push(json({ message: 'Multiple records match.', code: 'multiple_matches' }, 409));
    const conflict = micro.people.findOrCreate({ email_address: 'sam@example.com' });
    await expect(conflict).rejects.toBeInstanceOf(ConflictError);
    await expect(conflict).rejects.toMatchObject({
      status: 409,
      error: { code: 'multiple_matches' },
    });

    replies.push(json({ message: 'failure' }, 500));
    await expect(micro.people.findOrCreate({ email_address: 'sam@example.com' })).rejects.toBeInstanceOf(
      InternalServerError,
    );

    expect(calls).toHaveLength(2);
  });
  it('distinguishes committed creates with failed readback', async () => {
    replies.push(
      json({ created: true, record: { id: 'identity-id' } }, 201),
      json({ message: 'denied' }, 403),
    );
    await expect(micro.people.findOrCreate({ email_address: 'sam@example.com' })).rejects.toMatchObject({
      name: 'WriteReadbackError',
      record_id: 'identity-id',
      write_committed: true,
    });
    expect(calls).toHaveLength(2);
  });
  it('does not claim a write committed when reading an existing match fails', async () => {
    replies.push(json({ created: false, record: { id: 'identity-id' } }), json({ message: 'denied' }, 403));
    try {
      await micro.people.findOrCreate({ email_address: 'sam@example.com' });
      throw new Error('Expected rejection');
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect(error).not.toBeInstanceOf(WriteReadbackError);
    }
  });
  it('rejects empty, extra, and conflicting match inputs before network calls', async () => {
    await expect(micro.people.findOrCreate({ email_address: '' })).rejects.toThrow(TypeError);
    await expect(
      // @ts-expect-error company_id is not a matching key
      micro.people.findOrCreate({ email_address: 'sam@example.com', company_id: 'x' }),
    ).rejects.toThrow(TypeError);
    await expect(
      // @ts-expect-error matching email cannot be overwritten by defaults
      micro.people.findOrCreate({ email_address: 'sam@example.com' }, { email_addresses: [] }),
    ).rejects.toThrow(TypeError);
    await expect(
      micro.companies.findOrCreate(
        { primary_domain: 'acme.com' },
        { properties: { primary_domain: 'other.com' } },
      ),
    ).rejects.toThrow(TypeError);
    expect(calls).toHaveLength(0);
  });
  it('forwards cancellation and explicit idempotency headers', async () => {
    replies.push(json({ created: true, record: person }));
    const controller = new AbortController();
    await micro.people.findOrCreate(
      { email_address: 'sam@example.com' },
      {},
      {
        signal: controller.signal,
        timeout: 1234,
        idempotencyKey: 'signup-123',
        headers: { 'X-Custom': 'test' },
      },
    );
    const headers = new Headers(calls[0]!.init.headers);
    expect(headers.get('Idempotency-Key')).toBe('signup-123');
    expect(headers.get('X-Custom')).toBe('test');
    expect(calls[0]!.init.signal).toBeDefined();
  });
});
