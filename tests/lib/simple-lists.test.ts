import RawMicro from '../../src';
import { InvalidResponseError } from '../../src/lib/simple-core';
import { Lists } from '../../src/lib/simple-lists';

const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('simple lists using the generated HTTP transport', () => {
  const calls: { url: string; init: RequestInit }[] = [];
  let replies: Response[];
  let lists: Lists;

  beforeEach(() => {
    calls.length = 0;
    replies = [];
    const raw = new RawMicro({
      apiKey: 'key',
      teamID: 'workspace-a',
      baseURL: 'https://micro.test',
      maxRetries: 0,
      fetch: async (url, init) => {
        calls.push({ url: String(url), init: init as RequestInit });
        return replies.shift()!;
      },
    });
    lists = new Lists(raw);
  });

  const list = (overrides: Record<string, unknown> = {}) => ({
    id: 'list-a',
    name: 'Pipeline',
    description: null,
    icon: '💸',
    object_type: 'deal',
    type: 'dealFlow',
    created_at: '2026-09-20T12:00:00.000Z',
    ...overrides,
  });

  it('discovers templates without exposing internal configuration', async () => {
    replies.push(
      response({
        data: [
          {
            id: 'custom',
            name: 'Custom',
            description: 'Start from a record type',
            icon: '✨',
            object_type: null,
            type: 'custom',
            supported_object_types: ['organization', 'identity', 'action', 'document', 'deal'],
          },
        ],
      }),
    );

    const result = await lists.templates.list({ headers: { 'x-trace': 'templates' } });
    expect(result).toEqual({
      data: [
        {
          id: 'custom',
          name: 'Custom',
          description: 'Start from a record type',
          icon: '✨',
          record_type: null,
          template_type: 'custom',
          supported_record_types: ['companies', 'people', 'tasks', 'documents', 'deals'],
        },
      ],
      has_more: false,
      next_cursor: null,
    });
    expect(calls[0]!.url).toBe('https://micro.test/v2/prism/workspace-a/list-templates');
    expect(new Headers(calls[0]!.init.headers).get('x-trace')).toBe('templates');
  });

  it('creates a custom list with the friendly record type mapped on the wire', async () => {
    replies.push(response(list({ object_type: 'organization', type: 'custom', name: 'Partners' }), 201));

    const result = await lists.create(
      { template_id: 'custom', name: 'Partners', record_type: 'companies' },
      { idempotencyKey: 'create-partners' },
    );

    expect(result.record_type).toBe('companies');
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      template_id: 'custom',
      name: 'Partners',
      object_type: 'organization',
    });
    expect(new Headers(calls[0]!.init.headers).get('Idempotency-Key')).toBe('create-partners');
  });

  it('rejects ambiguous custom and conflicting named-template inputs before I/O', async () => {
    await expect(lists.create({ template_id: 'custom', name: 'Missing type' })).rejects.toThrow(
      'record_type',
    );
    await expect(
      lists.create({ template_id: 'deal_flow', record_type: 'deals' }),
    ).rejects.toThrow('only allowed');
    await expect(lists.create({ template_id: 'deal_flow', typo: true } as never)).rejects.toThrow(
      'accepts only',
    );
    expect(calls).toHaveLength(0);
  });

  it('returns the unpaginated list inventory as a terminal page', async () => {
    replies.push(response({ data: [list()] }));
    await expect(lists.list()).resolves.toMatchObject({ has_more: false, next_cursor: null });
  });

  it('discovers memberships from list scope rather than a view pin', async () => {
    replies.push(
      response(list()),
      response({ data: [{ id: 'deal-a' }], has_more: true, next_cursor: 'next-page' }),
    );

    const result = await lists.records.list('list-a', { limit: 1 });
    expect(result.data).toEqual([{ list_id: 'list-a', record: { type: 'deals', id: 'deal-a' } }]);
    const url = new URL(calls[1]!.url);
    expect(url.pathname).toBe('/v2/prism/workspace-a/deal');
    expect(url.searchParams.get('list_id')).toBe('list-a');
    expect(url.searchParams.get('limit')).toBe('1');
  });

  it('checks one record in explicit list scope and returns null when absent', async () => {
    replies.push(response(list()), response({ data: [], has_more: false, next_cursor: null }));
    await expect(lists.records.get('list-a', 'deal-a')).resolves.toBeNull();

    expect(JSON.parse(calls[1]!.init.body as string)).toEqual({
      id: 'deal-a',
      query: { select: [], crm_id: 'list-a', limit: 1 },
    });
  });

  it('resolves list type once while iterating and preserves cursor scope', async () => {
    replies.push(
      response(list({ object_type: 'identity' })),
      response({ data: [{ id: 'person-a' }], has_more: true, next_cursor: 'next' }),
      response({ data: [{ id: 'person-b' }], has_more: false, next_cursor: null }),
    );
    const ids = [];
    for await (const entry of lists.records.iterate('list-a', { limit: 1 })) ids.push(entry.record.id);

    expect(ids).toEqual(['person-a', 'person-b']);
    expect(calls.filter((call) => call.url.endsWith('/lists/list-a'))).toHaveLength(1);
    expect(new URL(calls[2]!.url).searchParams.get('cursor')).toBe('next');
  });

  it('rejects unknown list record types and inconsistent membership cursors', async () => {
    replies.push(response(list({ object_type: 'message' })));
    await expect(lists.records.list('list-a')).rejects.toBeInstanceOf(InvalidResponseError);

    replies.push(
      response(list()),
      response({ data: [], has_more: true, next_cursor: 'same' }),
    );
    await expect(lists.records.list('list-a', { cursor: 'same' })).rejects.toBeInstanceOf(
      InvalidResponseError,
    );
  });

  it('rejects invalid limits before querying memberships', async () => {
    await expect(lists.records.list('list-a', { limit: 51 })).rejects.toThrow('between 1 and 50');
    await expect(lists.records.list('list-a', { cursor: '' })).rejects.toThrow('nonempty');
    await expect(lists.records.get('', 'deal-a')).rejects.toThrow('list id');
    await expect(lists.templates.get(' ')).rejects.toThrow('template id');
    expect(calls).toHaveLength(0);
  });
});
