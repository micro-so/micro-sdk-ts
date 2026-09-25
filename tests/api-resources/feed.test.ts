import Micro from '@micro-so/sdk';

describe('personal feed updates', () => {
  const body = {
    author: { name: 'Research agent', logo_url: 'https://example.com/logo.png' },
    message: 'First line\nSecond line\n\nNew paragraph — with Unicode.',
    link: 'https://example.com/report',
    cta: { label: 'Read report', url: 'https://example.com/report' },
  };

  test('creates without a workspace and preserves content and retry header', async () => {
    const fetchMock = jest.fn(async () =>
      Response.json({ id: 'update-1', ...body, created_at: '2026-09-17T12:00:00Z' }, { status: 201 }),
    );
    const client = new Micro({ apiKey: 'test-key', fetch: fetchMock, maxRetries: 0 });
    const result = await client.feed.updates.create(body, {
      headers: { 'Idempotency-Key': 'report-1' },
    });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://developers.micro.so/v2/feed/updates');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('x-api-key')).toBe('test-key');
    expect(new Headers(init.headers).get('Idempotency-Key')).toBe('report-1');
    expect(JSON.parse(init.body as string)).toEqual(body);
    expect(result.message).toBe(body.message);
    expect(result.author.logo_url).toBe(body.author.logo_url);
  });

  test('workspace operations still fail before sending when no team is supplied', () => {
    const fetchMock = jest.fn();
    const client = new Micro({ apiKey: 'test-key', fetch: fetchMock });
    expect(() => client.webhooks.list()).toThrow('not a valid path parameter');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('sends the typed idempotency parameter as a header, never as content', async () => {
    const fetchMock = jest.fn(async () => Response.json({ id: 'update-1', ...body }));
    const client = new Micro({ apiKey: 'test-key', fetch: fetchMock });
    await client.feed.updates.create({ ...body, 'Idempotency-Key': 'typed-retry-key' });
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(new Headers(init.headers).get('Idempotency-Key')).toBe('typed-retry-key');
    expect(JSON.parse(init.body as string)).toEqual(body);
  });

  test('surfaces a conflicting idempotency key as ConflictError', async () => {
    const client = new Micro({
      apiKey: 'test-key',
      maxRetries: 0,
      fetch: async () =>
        Response.json({ error: { code: 'conflict', message: 'Key reused' } }, { status: 409 }),
    });
    await expect(client.feed.updates.create(body)).rejects.toBeInstanceOf(Micro.ConflictError);
  });
});
