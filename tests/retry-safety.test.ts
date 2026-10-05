import Micro from '../src';

const makeClient = (fetch: typeof globalThis.fetch) =>
  new Micro({ apiKey: 'test', teamID: 'team', maxRetries: 1, fetch });
const failure = () => new Response('{}', { status: 500, headers: { 'retry-after-ms': '1' } });
const success = () => new Response('{}', { headers: { 'content-type': 'application/json' } });

describe('mutation retry safety', () => {
  test.each(['post', 'put', 'patch', 'delete'] as const)(
    '%s does not retry a server error',
    async (method) => {
      const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
      await expect(makeClient(fetch).request({ method, path: '/v2/prism/team/document' })).rejects.toThrow();
      expect(fetch).toHaveBeenCalledTimes(1);
    },
  );

  test.each(['connection lost', 'timed out'])('does not retry %s', async (message) => {
    const fetch = jest.fn().mockRejectedValueOnce(new Error(message)).mockResolvedValueOnce(success());
    await expect(
      makeClient(fetch).prism.objects.documents.create({ default: { name: 'Fixture' } }),
    ).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('an idempotency header is not an implicit retry opt-in', async () => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await expect(
      makeClient(fetch).prism.objects.documents.create({
        default: { name: 'Fixture' },
        'Idempotency-Key': 'test-key',
      }),
    ).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('sends an explicit request idempotency key on a write', async () => {
    const fetch = jest.fn().mockResolvedValue(success());
    await makeClient(fetch).request({
      method: 'post',
      path: '/v2/prism/team/document',
      idempotencyKey: 'logical-write',
    });

    expect(new Headers(fetch.mock.calls[0]![1].headers).get('Idempotency-Key')).toBe('logical-write');
  });

  test('does not generate a key for a write by default', async () => {
    const fetch = jest.fn().mockResolvedValue(success());
    await makeClient(fetch).request({ method: 'post', path: '/v2/prism/team/document' });

    expect(new Headers(fetch.mock.calls[0]![1].headers).has('Idempotency-Key')).toBe(false);
  });

  test('an explicit raw header overrides the request key regardless of casing', async () => {
    const fetch = jest.fn().mockResolvedValue(success());
    await makeClient(fetch).request({
      method: 'post',
      path: '/v2/prism/team/document',
      idempotencyKey: 'request-key',
      headers: { 'iDeMpOtEnCy-kEy': 'raw-key' },
    });

    expect(new Headers(fetch.mock.calls[0]![1].headers).get('Idempotency-Key')).toBe('raw-key');
  });

  test('keeps the explicit key stable across an opted-in write retry', async () => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await makeClient(fetch).request({
      method: 'post',
      path: '/v2/prism/team/document',
      idempotencyKey: 'retry-key',
      maxRetries: 1,
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls.map((call) => new Headers(call[1].headers).get('Idempotency-Key'))).toEqual([
      'retry-key',
      'retry-key',
    ]);
  });

  test('retains generated keys for clients with an idempotency header configured', async () => {
    class ConfiguredClient extends Micro {
      protected override idempotencyHeader = 'Idempotency-Key';
    }
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await new ConfiguredClient({ apiKey: 'test', teamID: 'team', fetch }).request({
      method: 'post',
      path: '/v2/prism/team/document',
      maxRetries: 1,
    });

    const keys = fetch.mock.calls.map((call) => new Headers(call[1].headers).get('Idempotency-Key'));
    expect(keys[0]).toMatch(/^stainless-node-retry-/);
    expect(keys[1]).toBe(keys[0]);
  });

  test('an explicit per-request override can retry a write', async () => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await makeClient(fetch).prism.objects.documents.create(
      { default: { name: 'Fixture' } },
      { maxRetries: 1 },
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test.each([
    ['get', '/v2/prism/team/document'],
    ['post', '/v2/prism/team/document/query'],
    ['post', '/v2/prism/query/team/document'],
  ] as const)('preserves retries for %s %s', async (method, path) => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await makeClient(fetch).request({ method, path });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('generated object queries retain retries', async () => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await makeClient(fetch).prism.objects.documents.query({ query: { select: ['id'] } });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(String(fetch.mock.calls[0][0])).toContain('/v2/prism/team/document/query');
  });

  test('cloned clients do not opt writes into retries', async () => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await expect(
      makeClient(fetch).withOptions({}).request({ method: 'post', path: '/foo' }),
    ).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('a record named query is not treated as a query endpoint', async () => {
    const fetch = jest.fn().mockResolvedValueOnce(failure()).mockResolvedValueOnce(success());
    await expect(
      makeClient(fetch).request({ method: 'post', path: '/v2/prism/team/document/query/duplicate' }),
    ).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
