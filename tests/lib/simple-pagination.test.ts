import Micro, { InvalidResponseError } from '../../src/lib/simple';

describe('simple pagination over HTTP', () => {
  const requests: Record<string, any>[] = [];
  let replies: unknown[];
  let micro: Micro;
  beforeEach(() => {
    requests.length = 0;
    replies = [];
    micro = new Micro({
      apiKey: 'key',
      teamID: 'team',
      baseURL: 'https://micro.test',
      maxRetries: 0,
      fetch: async (_url, init) => {
        requests.push(JSON.parse(init!.body as string));
        return new Response(JSON.stringify(replies.shift()), {
          headers: { 'Content-Type': 'application/json' },
        });
      },
    });
  });
  const row = (id: number) => ({
    id: String(id),
    properties: { name: `Company ${id}`, primary_domain: null },
  });

  it('iterates 60 records, forwarding cursors and custom selections', async () => {
    replies.push(
      { data: Array.from({ length: 50 }, (_, i) => row(i)), has_more: true, next_cursor: 'next' },
      { data: Array.from({ length: 10 }, (_, i) => row(i + 50)), has_more: false },
    );
    const ids = [];
    for await (const company of micro.companies.iterate({ limit: 50, properties: ['score'] }))
      ids.push(company.id);
    expect(new Set(ids).size).toBe(60);
    expect(requests[1]!['query']).toMatchObject({
      cursor: 'next',
      limit: 50,
      select: ['name', 'primary_domain', 'score'],
    });
  });

  it('does not prefetch when the caller stops', async () => {
    replies.push({ data: [row(1)], has_more: true, next_cursor: 'next' });
    for await (const _row of micro.companies.iterate()) break;
    expect(requests).toHaveLength(1);
  });

  it('advances through empty pages and stops at an empty final page', async () => {
    replies.push({ data: [], has_more: true, next_cursor: 'next' }, { data: [], has_more: false });
    for await (const _row of micro.companies.iterate()) throw new Error('Unexpected row');
    expect(requests).toHaveLength(2);
  });

  it.each([
    { data: [], has_more: true },
    { data: [], has_more: false, next_cursor: 'unexpected' },
    { data: [], has_more: true, next_cursor: 'current' },
  ])('rejects invalid pagination metadata: %j', async (reply) => {
    replies.push(reply);
    await expect(micro.companies.list({ cursor: 'current' })).rejects.toBeInstanceOf(InvalidResponseError);
  });

  it('detects a longer cursor cycle', async () => {
    replies.push(
      { data: [], has_more: true, next_cursor: 'b' },
      { data: [], has_more: true, next_cursor: 'a' },
    );
    const consume = async () => {
      for await (const _row of micro.companies.iterate({ cursor: 'a' })) {
        /* empty */
      }
    };
    await expect(consume()).rejects.toBeInstanceOf(InvalidResponseError);
    expect(requests).toHaveLength(2);
  });

  it('cancels between yielded records without another request', async () => {
    const controller = new AbortController();
    replies.push({ data: [row(1), row(2)], has_more: false });
    const iterator = micro.companies.iterate({}, { signal: controller.signal });
    await iterator.next();
    controller.abort();
    await expect(iterator.next()).rejects.toThrow();
    expect(requests).toHaveLength(1);
  });

  it('uses typed AND filters on identity relations', async () => {
    replies.push({ data: [], has_more: false });
    await micro.people.list({ where: { email_address: 'sam@example.com', company_id: 'org' } });
    expect(requests[0]!['query']).toMatchObject({
      limit: 25,
      combinator: 'AND',
      filter: [{ 'email_addresses.email': { '=': 'sam@example.com' } }, { companies: { in: ['org'] } }],
    });
  });

  it('rejects invalid limits before issuing requests', async () => {
    for (const limit of [0, 51, 1.5]) await expect(micro.companies.list({ limit })).rejects.toThrow();
    expect(requests).toHaveLength(0);
  });
});
