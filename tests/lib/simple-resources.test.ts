import Micro, { type SimpleSource } from '../../src/lib/simple';

it('uses one discovered list source across fields and views through the public simple client', async () => {
  const replies = [
    {
      data: [
        {
          id: 'custom',
          name: 'Custom',
          object_type: null,
          supported_object_types: ['organization'],
          type: 'custom',
        },
      ],
    },
    { id: 'partners', name: 'Partners', object_type: 'organization' },
    {
      organization: {
        stage: {
          id: 'stage',
          name: 'Stage',
          slug: 'stage',
          type: 'select_str',
          options: [{ id: 'new-option', slug: 'new', value: 'New' }],
        },
      },
    },
    { id: 'view', name: 'Partners', list_id: 'partners', view_type: 'grid', select: ['stage'] },
  ];
  const calls: { url: URL; init: RequestInit }[] = [];
  const micro = new Micro({
    apiKey: 'test',
    teamID: 'team',
    baseURL: 'https://micro.test',
    fetch: async (input, init) => {
      calls.push({ url: new URL(String(input)), init: init as RequestInit });
      return new Response(JSON.stringify(replies.shift()), {
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });
  const templates = await micro.lists.templates.list();
  const template = templates.data[0]!;
  const list = await micro.lists.create({
    template_id: template.id,
    name: 'Partners',
    record_type: template.supported_record_types[0]!,
  });
  const source: SimpleSource = { record_type: list.record_type, scope: { type: 'list', list_id: list.id } };
  const fields = await micro.fields.list({ source, include_options: true });
  const view = await micro.views.create({
    source,
    name: list.name,
    layout: 'table',
    columns: fields.map((field) => field.slug),
  });
  expect(view.source).toEqual(source);
  expect(fields[0]!.options?.[0]).toMatchObject({ id: 'new-option', label: 'New', slug: 'new' });
  expect(calls.map((call) => call.url.pathname)).toEqual([
    '/v2/prism/team/list-templates',
    '/v2/prism/team/lists',
    '/v2/prism/team/organization/properties',
    '/v2/prism/team/organization/views',
  ]);
  expect(calls[2]!.url.searchParams.get('list_id')).toBe('partners');
  expect(JSON.parse(calls[3]!.init.body as string)).toMatchObject({ list_id: 'partners', select: ['stage'] });
  expect(typeof micro.people.get).toBe('function');
  expect(typeof micro.raw.prism.objects.contacts.get).toBe('function');
});
