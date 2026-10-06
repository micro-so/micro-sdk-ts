# Field options

Select and multiselect options expose IDs, API slugs and display labels. These helpers preserve the slug when changing a label. Pass a field returned by `micro.fields`; the handle carries its record type, workspace or list scope, and storage type.

```ts
const options = await micro.fields.options.list(tier);

const customer = await micro.fields.options.create(tier, {
  label: 'Customer',
  slug: 'customer',
  color: 'green',
  order: 2,
});

await micro.fields.options.update(tier, customer.id, {
  label: 'Active customer',
  color: 'blue',
});

await micro.fields.options.archive(tier, customer.id);
```

Option updates through these helpers cannot change a slug. Some legacy editing paths can regenerate slugs when labels change, so use option IDs for schema mutations and refresh discovery before writing records with cached slugs. Archiving sets `enabled: false`; existing record values remain readable, while archived options disappear from normal metadata and cannot be assigned to new records. The current API cannot list archived options.

You can seed options when creating a select field:

```ts
await micro.fields.create({
  source,
  name: 'Relationship',
  slug: 'relationship',
  type: 'select',
  options: [
    { label: 'Lead', slug: 'lead' },
    { label: 'Customer', slug: 'customer' },
  ],
});
```

Writes are not retried automatically. Option creation returns the authoritative server slug. The API rejects an explicit duplicate slug; when `slug` is omitted, it may suffix a derived slug to keep it unique.

This follows useful conventions in [Attio's attribute endpoints](https://docs.attio.com/rest-api/endpoint-reference/attributes/list-attributes) and [Notion's data source properties](https://developers.notion.com/reference/property-object): options are separate schema resources, and IDs stay stable when display labels change.
