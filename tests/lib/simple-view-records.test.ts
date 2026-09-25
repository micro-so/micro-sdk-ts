import RawMicro from '../../src';
import { InvalidResponseError } from '../../src/lib/simple-core';
import { Views } from '../../src/lib/simple-views';
import type { SimpleSource } from '../../src/lib/simple-scope';

const source = (record_type: SimpleSource['record_type'] = 'people'): SimpleSource => ({
  record_type,
  scope: { type: 'workspace' },
});
const view = () => ({ id: 'view-id', team_id: 'team', list_id: null, name: 'View', view_type: 'grid' });
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('simple view records HTTP behavior', () => {
  let replies: Response[];
  const calls: { url: string; init: RequestInit }[] = [];
  let views: Views;

  beforeEach(() => {
    replies = [];
    calls.length = 0;
    const raw = new RawMicro({
      apiKey: 'key',
      teamID: 'team',
      baseURL: 'https://micro.test',
      fetch: async (url, init) => {
        calls.push({ url: String(url), init: init as RequestInit });
        return replies.shift()!;
      },
    });
    views = new Views(raw.views, 'team');
  });

  it('checks source once and follows record cursors lazily', async () => {
    replies.push(
      json(view()),
      json({ data: [{ id: 'person-1' }], has_more: true, next_cursor: 'c2' }),
      json({ data: [{ id: 'person-2' }], has_more: false, next_cursor: null }),
    );
    const ids = [];
    for await (const record of views.records.iterate('view-id', { source: source(), limit: 1 })) {
      ids.push(record.id);
    }
    expect(ids).toEqual(['person-1', 'person-2']);
    expect(calls.filter((call) => call.init.method === 'GET')).toHaveLength(3);
    expect(new URL(calls[2]!.url).searchParams.get('cursor')).toBe('c2');
  });

  it('pins, unpins, and repositions presentation without membership calls', async () => {
    replies.push(
      json(view()),
      new Response(null, { status: 204 }),
      json(view()),
      new Response(null, { status: 204 }),
      json(view()),
      new Response(null, { status: 204 }),
    );
    const route = { source: source('tasks') };
    await views.records.pin('view-id', 'task-1', route);
    await views.records.unpin('view-id', 'task-1', route);
    await views.records.reorderPinned('view-id', ['task-2', 'task-1'], route);

    const mutations = calls.filter((call) => call.init.method !== 'GET');
    expect(mutations.map((call) => call.init.method)).toEqual(['POST', 'DELETE', 'PATCH']);
    expect(
      mutations.every((call) => new URL(call.url).pathname.includes('/action/views/view-id/records')),
    ).toBe(true);
    expect(JSON.parse(mutations[2]!.init.body as string)).toEqual({ object_ids: ['task-2', 'task-1'] });
  });

  it('validates local arguments before preflight and rejects inconsistent pages', async () => {
    await expect(
      views.records.reorderPinned('view-id', ['person-1', 'person-1'], { source: source() }),
    ).rejects.toThrow('must not contain duplicates');
    expect(calls).toHaveLength(0);

    replies.push(json(view()), json({ data: [], has_more: true, next_cursor: 'same' }));
    await expect(views.records.list('view-id', { source: source(), cursor: 'same' })).rejects.toBeInstanceOf(
      InvalidResponseError,
    );
  });
});
