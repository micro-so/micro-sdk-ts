# Simple views

Views save a filter, sort, and presentation for one record type. The source is always explicit because a workspace view and a view inside a list can use the same record type without sharing configuration or list-specific fields.

```ts
const founders = await micro.views.create({
  name: 'Founders',
  source: { record_type: 'people', scope: { type: 'workspace' } },
  layout: 'table',
  columns: ['full_name', 'title'],
  filter: [{ title: { '=': 'Founder' } }],
  sort: [{ full_name: 'asc' }],
});
```

Supported record types for views are `people`, `companies`, `tasks`, `documents`, `deals`, and `events`. The helper translates those public names to the current API paths. `contacts` and `comments` are rejected because the current server does not implement their view storage, even though the generated API types are broader.

Supported layouts are `table`, `list`, and `board`. They map to the layouts the current Micro app stores. Calendar views are not exposed until the API validates and renders them consistently.

Every read, update, and delete takes the same source used to create the view:

```ts
const source = {
  record_type: 'deals',
  scope: { type: 'list', list_id: 'list_123' },
} as const;

const views = await micro.views.list({ source });
const view = await micro.views.get(views.data[0]!.id, { source });
await micro.views.update(view.id, { source, sort: [{ amount: 'desc' }] });
await micro.views.delete(view.id, { source });
```

The source on `update` only tells the SDK which API route and list scope to use. It is never sent as an ownership change. A response whose list or workspace ownership does not match the requested source is rejected. Because the current mutation URLs omit the list ID, the helper reads the view first and checks its source before updating or deleting. All local arguments are validated before that read. The accompanying API changes enforce the stored source and forbid source transfers through public view updates, including raw API calls. Deploy those checks before exposing these helpers.

`list` returns `{data, next_cursor, has_more}`. `iterate` follows opaque cursors lazily, stops on cancellation, and rejects repeated or inconsistent cursors. View responses lack a canonical mutation version, and writes are not retried automatically.

This design borrows two useful boundaries from other APIs: Attio gives list entries their own list-scoped identity and permissions, while Notion requires an explicit data source for a view and reuses its query filter shape. Micro likewise keeps list membership separate from view presentation and keeps the record source visible in every operation. See the [Attio list-entry event model](https://docs.attio.com/rest-api/webhook-reference/list-entry-events/list-entrydeleted) and [Notion view creation API](https://developers.notion.com/reference/create-view).
