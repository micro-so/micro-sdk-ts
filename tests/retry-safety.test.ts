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
