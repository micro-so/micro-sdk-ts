import RawMicro from '../../src';
import { Views } from '../../src/lib/simple-views';

const source = { record_type: 'companies', scope: { type: 'workspace' } } as const;
const row = { id: 'view', name: 'View', team_id: 'team', view_type: 'grid' };
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
const collect = async <T>(items: AsyncIterable<T>) => {
  const result: T[] = [];
  for await (const item of items) result.push(item);
  return result;
};

function client(replies: Response[]) {
  const calls: { url: URL; init: RequestInit }[] = [];
  const raw = new RawMicro({
    apiKey: 'test',
    teamID: 'team',
    baseURL: 'https://micro.test',
    maxRetries: 3,
    fetch: async (url, init) => {
      calls.push({ url: new URL(String(url)), init: init as RequestInit });
      return replies.shift()!;
    },
  });
  return { views: new Views(raw.views, 'team'), calls };
}

it.each(['', '   '])('rejects invalid cursor %j before source lookup or page fetch', async (cursor) => {
  const { views, calls } = client([]);
  await expect(views.list({ source, cursor })).rejects.toThrow('cursor');
  await expect(collect(views.iterate({ source, cursor }))).rejects.toThrow('cursor');
  await expect(views.records.list('view', { source, cursor })).rejects.toThrow('cursor');
  await expect(collect(views.records.iterate('view', { source, cursor }))).rejects.toThrow('cursor');
  expect(calls).toHaveLength(0);
});

it('iterates successive view pages and rejects a longer cursor cycle', async () => {
  const { views, calls } = client([
    json({ data: [row], has_more: true, next_cursor: 'a' }),
    json({ data: [row], has_more: true, next_cursor: 'b' }),
    json({ data: [row], has_more: true, next_cursor: 'a' }),
  ]);
  await expect(collect(views.iterate({ source }))).rejects.toThrow('Repeating pagination cursor');
  expect(calls.map((call) => call.url.searchParams.get('cursor'))).toEqual([null, 'a', 'b']);
});

it('reads source once when iterating view records and follows the returned cursor', async () => {
  const { views, calls } = client([
    json(row),
    json({ data: [{ id: 'company-a' }], has_more: true, next_cursor: 'a' }),
    json({ data: [{ id: 'company-b' }], has_more: false, next_cursor: null }),
  ]);
  expect(await collect(views.records.iterate('view', { source }))).toEqual([
    { id: 'company-a' },
    { id: 'company-b' },
  ]);
  expect(calls).toHaveLength(3);
  expect(calls[2]!.url.searchParams.get('cursor')).toBe('a');
});

it('does not retry an uncertain pin, and forwards explicit write headers', async () => {
  const { views, calls } = client([json(row), json({ error: 'unavailable' }, 503)]);
  await expect(
    views.records.pin('view', 'company', { source }, { idempotencyKey: 'pin-1' }),
  ).rejects.toThrow();
  expect(calls).toHaveLength(2);
  expect(new Headers(calls[1]!.init.headers).get('Idempotency-Key')).toBe('pin-1');
});
