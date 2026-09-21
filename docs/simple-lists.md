# Lists in the simple SDK

Lists are collections of one record type. Create one from a discoverable template, or use the
`custom` template with an explicit `record_type`:

```ts
const templates = await micro.lists.templates.list();

const pipeline = await micro.lists.create({ template_id: 'deal_flow', name: 'Seed' });
const directory = await micro.lists.create({
  template_id: 'custom',
  name: 'Partners',
  record_type: 'companies',
});
```

`micro.lists.list()` returns the complete accessible list inventory. The current API does not page
that inventory, so its `next_cursor` is `null` and `has_more` is `false`.

Membership discovery is explicit and separate from saved-view pins:

```ts
const page = await micro.lists.records.list(directory.id, { limit: 25 });
const membership = await micro.lists.records.get(directory.id, company.id);
```

Membership results contain the list ID and a typed record reference. Read people and companies
through their simple resources; use `micro.raw` for tasks, documents, and deals until their simple
resources ship. The current API does not expose
a distinct membership ID, membership timestamps/version, or cleanly separated list-scoped values.
For that reason, the simple SDK does not yet offer membership add, update, remove, or restore.
Removing a view pin is never treated as removing list membership.
