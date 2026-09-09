import Micro from '../src/index';

const teamID = '11111111-1111-4111-8111-111111111111';
let calls: { url: string; init: RequestInit }[];
let client: Micro;

beforeEach(() => {
  calls = [];
  client = new Micro({
    teamID,
    apiKey: 'test-key',
    baseURL: 'https://api.example.com',
    fetch: async (input, init) => {
      calls.push({ url: String(input), init: init ?? {} });
      const upload = String(input).endsWith('/uploads');
      const body = upload
        ? { upload_id: 'upload-id', upload_url: 'https://storage.example.com/', fields: { key: 'temporary' }, method: 'POST', public_url: 'https://image.example.com/', expires_in: 3600 }
        : { url: 'https://image.example.com/', photo_url: 'https://image.example.com/' };
      return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
    },
  });
});

test('uses identity and organization image endpoints', async () => {
  await client.prism.objects.identities.images.importFromUrl('person', { url: 'https://remote.example/image' });
  await client.prism.objects.organizations.images.remove('company', { teamId: 'override' });
  expect(calls[0]?.url).toBe(`https://api.example.com/v2/prism/${teamID}/identity/person/image/import`);
  expect(calls[1]?.url).toBe('https://api.example.com/v2/prism/override/organization/company/image');
  expect(calls[1]?.init.method).toBe('DELETE');
});

test('uploads to storage without API headers and completes with a distinct idempotency key', async () => {
  const storageFetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
  try {
    await client.prism.objects.identities.images.upload(
      'person',
      { file: new Blob(['png'], { type: 'image/png' }) },
      { idempotencyKey: 'logical-upload' },
    );
    expect(calls.map((call) => call.url.split('/').pop())).toEqual(['uploads', 'complete']);
    expect(storageFetch.mock.calls[0]?.[1]?.headers).toBeUndefined();
    expect(new Headers(calls[0]?.init.headers).get('idempotency-key')).toBe('logical-upload:request');
    expect(new Headers(calls[1]?.init.headers).get('idempotency-key')).toBe('logical-upload:complete');
  } finally { storageFetch.mockRestore(); }
});

test('derives bounded step keys from a case-insensitive idempotency header', async () => {
  const storageFetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
  try {
    const original = 'x'.repeat(255);
    await client.prism.objects.identities.images.upload(
      'person',
      { file: new Blob(['png'], { type: 'image/png' }) },
      { headers: { 'iDeMpOtEnCy-KeY': original } },
    );
    const requestKey = new Headers(calls[0]?.init.headers).get('idempotency-key')!;
    const completeKey = new Headers(calls[1]?.init.headers).get('idempotency-key')!;
    expect(requestKey).toHaveLength(255);
    expect(completeKey).toHaveLength(255);
    expect(requestKey).toMatch(/:[0-9a-f]{8}:request$/);
    expect(completeKey).toMatch(/:[0-9a-f]{8}:complete$/);
    expect(requestKey).not.toBe(completeKey);
  } finally { storageFetch.mockRestore(); }
});

test('request option wins over conflicting headers on both upload steps', async () => {
  const storageFetch = jest.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
  try {
    await client.prism.objects.identities.images.upload(
      'person',
      { file: new Blob(['png'], { type: 'image/png' }) },
      { idempotencyKey: 'option-key', headers: { 'Idempotency-Key': 'header-key' } },
    );
    expect(new Headers(calls[0]?.init.headers).get('idempotency-key')).toBe('option-key:request');
    expect(new Headers(calls[1]?.init.headers).get('idempotency-key')).toBe('option-key:complete');
  } finally { storageFetch.mockRestore(); }
});

test('cancels storage upload and never completes', async () => {
  let markStarted!: () => void;
  const started = new Promise<void>((resolve) => { markStarted = resolve; });
  const storageFetch = jest.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => new Promise((_resolve, reject) => {
    markStarted();
    init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  }));
  const controller = new AbortController();
  try {
    const result = client.prism.objects.identities.images.upload('person', { file: new Blob(['png'], { type: 'image/png' }) }, { signal: controller.signal });
    await started;
    controller.abort();
    await expect(result).rejects.toThrow();
    expect(calls).toHaveLength(1);
  } finally { storageFetch.mockRestore(); }
});

test('times out storage upload and never completes', async () => {
  const storageFetch = jest.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => new Promise((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  }));
  try {
    await expect(client.prism.objects.identities.images.upload(
      'person',
      { file: new Blob(['png'], { type: 'image/png' }) },
      { timeout: 10 },
    )).rejects.toThrow();
    expect(calls).toHaveLength(1);
  } finally { storageFetch.mockRestore(); }
});

test('validates local files before issuing API calls', async () => {
  await expect(client.prism.objects.identities.images.upload('person', { file: new Blob(['svg'], { type: 'image/svg+xml' }) })).rejects.toThrow('JPEG');
  expect(calls).toHaveLength(0);
});
