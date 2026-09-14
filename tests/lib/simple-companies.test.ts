import Micro, { APIError } from '../../src/lib/simple';
import RawMicro from '../../src';

const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('simple companies using the generated HTTP client', () => {
  const calls: { url: string; init: RequestInit }[] = [];
  let replies: Response[];
  let micro: Micro;
  beforeEach(() => {
    calls.length = 0;
    replies = [];
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

  it('retains the original client and creates through the organization endpoint', async () => {
    replies.push(
      response({ id: 'org', default: { name: 'Acme', primary_domain: 'acme.com', sector: 'software' } }),
    );
    expect(micro.raw).toBeInstanceOf(RawMicro);
    const company = await micro.companies.create({
      name: 'Acme',
      primary_domain: 'acme.com',
      properties: { sector: 'software' },
    });
    expect(company).toEqual({
      id: 'org',
      name: 'Acme',
      primary_domain: 'acme.com',
      properties: { sector: 'software' },
    });
    expect(calls[0]!.url).toBe('https://micro.test/v2/prism/team/organization');
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      default: { name: 'Acme', primary_domain: 'acme.com', sector: 'software' },
    });
  });

  it('normalizes query and get responses, selecting only requested fields', async () => {
    replies.push(response({ id: 'org', properties: { name: 'Acme', primary_domain: null, score: 3 } }));
    const company = await micro.companies.get('org', { properties: ['score'] });
    expect(company.primary_domain).toBeNull();
    expect(company.properties).toEqual({ score: 3 });
    expect(new URL(calls[0]!.url).searchParams.get('select')).toBe('name,primary_domain,score');
  });

  it('sends null clears, omits undefined, preserves explicit write headers', async () => {
    replies.push(response({ id: 'org', default: { name: null, primary_domain: null } }));
    await micro.companies.update('org', { name: null, primary_domain: undefined } as never, {
      idempotencyKey: 'logical-write',
      ifMatch: 'revision',
      headers: { 'x-test': 'yes' },
    });
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({ default: { name: null } });
    const headers = new Headers(calls[0]!.init.headers);
    expect(headers.get('Idempotency-Key')).toBe('logical-write');
    expect(headers.get('If-Match')).toBe('revision');
    expect(headers.get('x-test')).toBe('yes');
  });

  it('rejects custom field collisions and unknown standard fields before I/O', async () => {
    await expect(micro.companies.create({ properties: { name: 'wrong' } })).rejects.toThrow('Reserved');
    await expect(micro.companies.create({ typo: 'wrong' } as never)).rejects.toThrow('Unknown field');
    expect(calls).toHaveLength(0);
  });

  it('does not retry mutation failures even when the raw client enables retries', async () => {
    micro.raw.maxRetries = 3;
    replies.push(response({ error: { code: 'uncertain', message: 'failed' } }, 500));
    await expect(micro.companies.create({ name: 'Acme' })).rejects.toBeInstanceOf(APIError);
    expect(calls).toHaveLength(1);
  });
});
