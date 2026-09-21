import RawMicro, { APIError } from '../../src';
import { FieldNotFoundError, Fields, type Field } from '../../src/lib/simple-fields';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const workspace = { record_type: 'people', scope: { type: 'workspace' } } as const;
const list = { record_type: 'companies', scope: { type: 'list', list_id: 'list-1' } } as const;
const field: Field = {
  id: 'field-1',
  slug: 'relationship',
  name: 'Relationship',
  type: 'select',
  storage_type: 'select_str',
  reference_type: null,
  source: workspace,
  required: false,
  read_only: false,
  native: false,
  options: [],
};

describe('simple fields over the generated transport', () => {
  let replies: Response[];
  const calls: { url: string; init: RequestInit }[] = [];
  let fields: Fields;

  beforeEach(() => {
    replies = [];
    calls.length = 0;
    const raw = new RawMicro({
      apiKey: 'key',
      teamID: 'team',
      baseURL: 'https://micro.test',
      maxRetries: 3,
      fetch: async (url, init) => {
        calls.push({ url: String(url), init: init as RequestInit });
        return replies.shift()!;
      },
    });
    fields = new Fields(raw);
  });

  it('discovers only the requested list scope and distinguishes skipped options', async () => {
    replies.push(
      json({
        organization: {
          'field-1': { id: 'field-1', slug: 'stage', name: 'Stage', type: 'select_str', list_id: 'list-1' },
        },
      }),
      json({
        organization: {
          'field-1': { id: 'field-1', slug: 'stage', name: 'Stage', type: 'select_str', list_id: 'list-1' },
        },
      }),
    );
    const result = await fields.list({ source: list, term: 'stage' });
    expect(result[0]).toMatchObject({ type: 'select', source: list, options: [] });
    expect(Object.fromEntries(new URL(calls[0]!.url).searchParams)).toEqual({
      list_id: 'list-1',
      term: 'stage',
      include_options: 'true',
    });
    const withoutOptions = await fields.list({ source: list, include_options: false });
    expect(withoutOptions[0]!.options).toBeNull();
    expect(new URL(calls[1]!.url).searchParams.get('include_options')).toBe('false');
  });

  it('treats an empty scoped schema as empty and get as not found', async () => {
    replies.push(json({}), json({ organization: {} }));
    await expect(fields.list({ source: list })).resolves.toEqual([]);
    await expect(fields.get('workspace-field', { source: list })).rejects.toBeInstanceOf(FieldNotFoundError);
    expect(calls.every((call) => new URL(call.url).searchParams.get('list_id') === 'list-1')).toBe(true);
  });

  it.each([null, 'list-2'])('rejects metadata from another scope: %s', async (list_id) => {
    replies.push(
      json({
        organization: {
          'field-1': { id: 'field-1', slug: 'tier', name: 'Tier', type: 'select_str', list_id },
        },
      }),
    );
    await expect(fields.list({ source: list })).rejects.toThrow('does not match the requested source');
  });

  it('rejects list metadata returned for workspace discovery', async () => {
    replies.push(
      json({
        identity: {
          'field-1': { id: 'field-1', slug: 'tier', name: 'Tier', type: 'select_str', list_id: 'list-2' },
        },
      }),
    );
    await expect(fields.list({ source: workspace })).rejects.toThrow('does not match the requested source');
  });

  it('preserves the explicit shared pipeline-stage definition overlay', async () => {
    replies.push(
      json({
        organization: {
          'field-1': {
            id: 'field-1',
            slug: 'status',
            name: 'Stage',
            type: 'select_str',
            list_id: null,
            alias: 'app_stage',
          },
        },
      }),
    );
    await expect(fields.list({ source: list })).resolves.toEqual([expect.objectContaining({ source: list })]);
  });

  it('does not return options from a forged field source', async () => {
    replies.push(
      json({
        organization: {
          'field-1': {
            id: 'field-1',
            slug: 'tier',
            name: 'Tier',
            type: 'select_str',
            list_id: 'list-2',
            options: [],
          },
        },
      }),
    );
    await expect(fields.options.list({ ...field, source: list })).rejects.toThrow(
      'does not match the requested source',
    );
  });

  it('rejects foreign options beneath a shared pipeline-stage definition', async () => {
    replies.push(
      json({
        organization: {
          'field-1': {
            id: 'field-1',
            slug: 'status',
            name: 'Stage',
            type: 'select_str',
            list_id: null,
            alias: 'app_stage',
            options: [{ id: 'opt', slug: 'won', value: 'Won', list_id: 'list-2' }],
          },
        },
      }),
    );
    await expect(fields.list({ source: list })).rejects.toThrow('Option metadata does not match');
  });

  it('rejects a list option beneath a workspace field', async () => {
    replies.push(
      json({
        identity: {
          'field-1': {
            id: 'field-1',
            slug: 'tier',
            name: 'Tier',
            type: 'select_str',
            options: [{ id: 'opt', slug: 'won', value: 'Won', list_id: 'list-2' }],
          },
        },
      }),
    );
    await expect(fields.list({ source: workspace })).rejects.toThrow('Option metadata does not match');
  });

  it('rejects contradictory field list identifiers', async () => {
    replies.push(
      json({
        organization: {
          'field-1': {
            id: 'field-1',
            slug: 'tier',
            name: 'Tier',
            type: 'select_str',
            list_id: 'list-1',
            crm_id: 'list-2',
          },
        },
      }),
    );
    await expect(fields.list({ source: list })).rejects.toThrow('contradictory list identifiers');
  });

  it('rejects a mutation response that reports a different field source without retrying', async () => {
    replies.push(json({ id: 'field-1', slug: 'tier', name: 'Tier', type: 'select_str', list_id: 'list-2' }));
    await expect(fields.create({ source: list, name: 'Tier', type: 'select' })).rejects.toThrow(
      'does not match the requested source',
    );
    expect(calls).toHaveLength(1);
  });

  it('creates list fields with friendly types and one explicit idempotent write', async () => {
    replies.push(
      json({ id: 'field-1', slug: 'tier', name: 'Tier', type: 'select_str', list_id: 'list-1' }, 201),
    );
    const created = await fields.create(
      { source: list, name: 'Tier', type: 'select', slug: 'tier' },
      { idempotencyKey: 'create-tier' },
    );
    expect(created.source).toEqual(list);
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      name: 'Tier',
      type: 'select_str',
      list_id: 'list-1',
      slug: 'tier',
    });
    expect(new Headers(calls[0]!.init.headers).get('Idempotency-Key')).toBe('create-tier');
    expect(calls).toHaveLength(1);
  });

  it('constructs updates from allowed fields and never retries writes', async () => {
    replies.push(
      json({ id: 'field-1', slug: 'relationship', name: 'Relationship type', type: 'select_str' }),
    );
    const updated = await fields.update(field, { name: 'Relationship type' });
    expect(updated.name).toBe('Relationship type');
    expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
      type: 'select_str',
      name: 'Relationship type',
    });

    replies.push(json({ error: { code: 'uncertain', message: 'failed' } }, 500));
    await expect(fields.archive(field)).rejects.toBeInstanceOf(APIError);
    expect(calls).toHaveLength(2);
  });

  it('rejects prototype field types and routing keys before HTTP', async () => {
    await expect(
      fields.create({ source: workspace, name: 'Bad', type: 'toString' } as never),
    ).rejects.toThrow('Unsupported field type');
    await expect(
      fields.update(field, { name: 'Bad', objectType: 'organization', list_id: 'other' } as never),
    ).rejects.toThrow('Unknown field update field');
    await expect(fields.list({ source: { record_type: 'people', scope: {} } as never })).rejects.toThrow(
      'scope',
    );
    await expect(
      fields.create(Object.create({ source: workspace, name: 'Bad', type: 'text' })),
    ).rejects.toThrow('requires source');
    expect(calls).toHaveLength(0);
  });
});
