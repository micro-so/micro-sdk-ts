# View records and pinning

View records are the records selected by a saved view's filter and sort. They are separate from list membership: pinning a record changes its presentation in the view; it does not add the record to a list, grant access, or make a filtered-out record visible.

```ts
const source = {
  record_type: 'deals',
  scope: { type: 'list', list_id: 'list_123' },
} as const;

const page = await micro.views.records.list('view_123', { source, limit: 25 });
for await (const record of micro.views.records.iterate('view_123', { source })) {
  console.log(record.id);
}

await micro.views.records.pin('view_123', 'deal_123', { source });
await micro.views.records.unpin('view_123', 'deal_123', { source });
await micro.views.records.reorderPinned('view_123', ['deal_2', 'deal_1'], { source });
```

Records retain the server's selected projection. Use the normal resource helper when you need that resource's complete normalized shape. Pages use `{data, next_cursor, has_more}`; iteration follows opaque cursors lazily and rejects repeated or inconsistent cursors.

The record URLs omit the list ID, so the helper validates every local argument, then reads the view and checks its source before the record call. Iteration checks once before its first page. This prevents ordinary cross-list mistakes, but the preflight is not atomic; the server still needs a list-source precondition to close the race with ownership changes made through the raw API.

The current reorder endpoint puts the supplied IDs first, in the requested order, followed by omitted pins in their existing order. Each supplied ID must already be pinned and appear only once. The server serializes pin mutations and applies pinned ordering before pagination, so a pin does not disappear merely because its original sort position was on a later page. These behaviors require the accompanying API fixes.

Reordering does not provide the proposed `before_id` move or an ordering version, so `reorderPinned` cannot detect a stale client's ordering intent. Writes are not retried automatically.
