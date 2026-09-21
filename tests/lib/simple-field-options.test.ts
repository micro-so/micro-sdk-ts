import RawMicro, { APIError } from '../../src';
import { Fields, type Field } from '../../src/lib/simple-fields';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const source = { record_type: 'companies', scope: { type: 'list', list_id: 'list-1' } } as const;
const field: Field = {
  id: 'field-1',
  slug: 'tier',
  name: 'Tier',
  type: 'select',
  storage_type: 'select_str',
  reference_type: null,
  source,
  required: false,
  read_only: false,
  native: false,
  options: [],
};

describe('simple field options over the generated transport', () => {
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
    fields = new Fields(raw.prism.properties);
  });

  it('discovers stable option values only from the field handle scope', async () => {
    replies.push(
      json({
        organization: {
          'field-1': {
            id: 'field-1',
            slug: 'tier',
            name: 'Tier',
            type: 'select_str',
            list_id: 'list-1',
            options: [
              { id: 'option-1', slug: 'customer', value: 'Customer', color_scheme: 'green', sort_index: 2 },
            ],
          },
        },
      }),
    );
    await expect(fields.options.list(field)).resolves.toEqual([
      {
        id: 'option-1',
        slug: 'customer',
        label: 'Customer',
        color: 'green',
        order: 2,
        description: null,
        icon: null,
        archived: false,
      },
    ]);
    expect(Object.fromEntries(new URL(calls[0]!.url).searchParams)).toEqual({
      include_options: 'true',
      list_id: 'list-1',
    });
  });

  it('creates, partially updates, and archives options without sending routing input', async () => {
    replies.push(
      json({ id: 'option-1', slug: 'customer', value: 'Customer', color_scheme: 'green' }, 201),
      json({ id: 'option-1', slug: 'customer', value: 'Customer', color_scheme: 'blue' }),
      json({ id: 'option-1', slug: 'customer', value: 'Customer' }),
    );
    const created = await fields.options.create(field, {
      label: 'Customer',
      slug: 'customer',
      color: 'green',
    });
    await fields.options.update(field, created.id, { color: 'blue' });
    await fields.options.archive(field, created.id);
    expect(calls.map((call) => JSON.parse(call.init.body as string))).toEqual([
      { type: 'select_str', list_id: 'list-1', value: 'Customer', color_scheme: 'green', slug: 'customer' },
      { type: 'select_str', list_id: 'list-1', color_scheme: 'blue' },
      { type: 'select_str', enabled: false, list_id: 'list-1' },
    ]);
  });

  it('does not retry uncertain option writes', async () => {
    replies.push(json({ error: { code: 'uncertain', message: 'failed' } }, 500));
    await expect(fields.options.create(field, { label: 'Customer' })).rejects.toBeInstanceOf(APIError);
    expect(calls).toHaveLength(1);
  });

  it('rejects misspellings, missing labels, slug updates, and non-select fields before HTTP', async () => {
    await expect(fields.options.create(field, { color: 'blue' } as never)).rejects.toThrow('Option label');
    await expect(fields.options.create(field, Object.create({ label: 'Inherited' }))).rejects.toThrow(
      'Option label',
    );
    await expect(
      fields.options.create(field, { label: 'Customer', colour: 'blue' } as never),
    ).rejects.toThrow('Unknown option create field');
    await expect(fields.options.update(field, 'option-1', { slug: 'changed' } as never)).rejects.toThrow(
      'Unknown option update field',
    );
    await expect(
      fields.options.create({ ...field, type: 'text', storage_type: 'str' }, { label: 'Nope' }),
    ).rejects.toThrow('select');
    await expect(
      fields.create({ source, name: 'Bad', type: 'select', options: [{ color: 'blue' } as never] }),
    ).rejects.toThrow('Option label');
    expect(calls).toHaveLength(0);
  });
});
