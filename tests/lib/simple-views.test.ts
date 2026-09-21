import RawMicro from '../../src';
import { InvalidResponseError } from '../../src/lib/simple-core';
import { Views } from '../../src/lib/simple-views';
import type { SimpleSource } from '../../src/lib/simple-scope';

const workspace = (record_type: SimpleSource['record_type'] = 'people'): SimpleSource => ({
  record_type,
  scope: { type: 'workspace' },
});
const inList = (record_type: SimpleSource['record_type'] = 'companies'): SimpleSource => ({
  record_type,
  scope: { type: 'list', list_id: 'list-id' },
});
const responseView = (extra: Record<string, unknown> = {}) => ({
  id: 'view-id',
  team_id: 'team',
  list_id: null,
  name: 'Important people',
  view_type: 'grid',
  combinator: 'AND',
  select: ['full_name'],
  filter: [{ title: { '=': 'Founder' } }],
  sort: [{ full_name: 'asc' }],
  group_by: null,
  created_at: '2026-09-20T00:00:00Z',
  updated_at: null,
  ...extra,
});
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('simple views HTTP behavior', () => {
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
      maxRetries: 2,
      fetch: async (url, init) => {
        calls.push({ url: String(url), init: init as RequestInit });
        return replies.shift()!;
      },
    });
    views = new Views(raw.views, 'team');
  });

  it('creates a workspace view using public resource and layout names', async () => {
    replies.push(json(responseView(), 201));
    const result = await views.create(
      {
        name: 'Important people',
        source: workspace(),
        layout: 'table',
        columns: ['full_name'],
        filter: [{ title: { '=': 'Founder' } }],
        sort: [{ full_name: 'asc' }],
      },
      { idempotencyKey: 'create-view' },
    );

    expect(result).toMatchObject({
      id: 'view-id',
      source: workspace(),
      layout: 'table',
      columns: ['full_name'],
    });
    expect(calls[0]!.url).toBe('https://micro.test/v2/prism/team/identity/views');
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      name: 'Important people',
      view_type: 'grid',
      select: ['full_name'],
      filter: [{ title: { '=': 'Founder' } }],
      sort: [{ full_name: 'asc' }],
      team_id: 'team',
    });
    expect(new Headers(calls[0]!.init.headers).get('Idempotency-Key')).toBe('create-view');
  });

  it('keeps list scope explicit when listing company views', async () => {
    replies.push(
      json({
        data: [responseView({ team_id: null, list_id: 'list-id', name: 'Pipeline', view_type: 'kanban' })],
        has_more: false,
        next_cursor: null,
      }),
    );
    const result = await views.list({ source: inList(), limit: 10 });
    const url = new URL(calls[0]!.url);

    expect(url.pathname).toBe('/v2/prism/team/organization/views');
    expect(url.searchParams.get('list_id')).toBe('list-id');
    expect(url.searchParams.get('limit')).toBe('10');
    expect(result.data[0]).toMatchObject({ source: inList(), layout: 'board' });
  });

  it('rejects a response from a different scope rather than relabeling it', async () => {
    replies.push(
      json(responseView({ team_id: null, list_id: 'another-list' })),
      json(responseView({ team_id: null, list_id: 'another-list' })),
    );
    await expect(views.get('view-id', { source: inList() })).rejects.toBeInstanceOf(InvalidResponseError);
    await expect(views.update('view-id', { source: inList(), name: 'Wrong list' })).rejects.toBeInstanceOf(
      InvalidResponseError,
    );
    expect(calls.map((call) => call.init.method)).toEqual(['GET', 'GET']);
  });

  it('replaces supplied filter arrays and does not send source as mutable data', async () => {
    replies.push(json(responseView()), json(responseView({ filter: [] })));
    await views.update('view-id', { source: workspace(), filter: [] });

    expect(calls[1]!.init.method).toBe('PATCH');
    expect(JSON.parse(calls[1]!.init.body as string)).toEqual({ filter: [] });
  });

  it('does not retry mutations and rejects unsupported view resources before I/O', async () => {
    replies.push(json(responseView()), json({ error: { message: 'failed' } }, 503));
    await expect(views.delete('view-id', { source: workspace() })).rejects.toThrow();
    expect(calls).toHaveLength(2);

    await expect(views.list({ source: workspace('contacts') })).rejects.toThrow(
      'Views do not support contacts records.',
    );
    await expect(views.get('view-id', { source: workspace(), teamId: 'other' } as never)).rejects.toThrow(
      'Unknown view field',
    );
    expect(calls).toHaveLength(2);
  });

  it('rejects inherited layout names without making a request', async () => {
    await expect(
      views.create({ name: 'Bad layout', source: workspace(), layout: 'toString' } as never),
    ).rejects.toThrow('Unsupported view layout');
    expect(calls).toHaveLength(0);
  });
});
