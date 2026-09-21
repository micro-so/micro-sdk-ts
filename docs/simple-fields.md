# Fields

The simple client treats workspace fields and list fields as separate schemas. Every operation asks for a public record type and explicit scope, so a typo cannot accidentally create a workspace-wide field.

```ts
const source = {
  record_type: 'companies',
  scope: { type: 'list', list_id: 'sales-pipeline' },
} as const;

const tier = await micro.fields.create({
  source,
  name: 'Tier',
  slug: 'tier',
  type: 'select',
});
```

Supported record types are `people`, `companies`, `tasks`, `documents`, `deals`, `events`, `contacts`, and `comments`. Use `{ type: 'workspace' }` for a base-record field or `{ type: 'list', list_id }` for a field whose values belong to one list membership.

```ts
const fields = await micro.fields.list({ source, term: 'tier' });
const firstField = fields[0];
if (!firstField) throw new Error('No matching fields.');
const sameField = await micro.fields.get(firstField.id, { source });

await micro.fields.update(sameField, { name: 'Customer tier' });
await micro.fields.archive(sameField);
```

`list` and `get` hydrate select options by default. Pass `include_options: false` for lighter discovery; returned fields then use `options: null` so skipped metadata is never confused with a loaded empty option set. `get` scans the exact scoped metadata because the current API has no individual field endpoint. List discovery does not merge workspace definitions. Make a separate workspace call when an integration needs both schemas.

Creation supports `text`, `number`, `boolean`, `date`, `select`, `multiselect`, and `json`. Discovery may return `reference`, `multireference`, or `unsupported` for definitions this helper cannot safely create. The returned field retains its exact source and server storage type for safe updates.

Archiving uses the API's `enabled: false` behavior and does not delete stored values. Native and read-only fields cannot be updated or archived through this helper. Writes are never retried automatically; pass `idempotencyKey` when retrying one logical write yourself.

Current API limits remain visible: there is no validation endpoint, archived-field listing, or schema version token. Mocked SDK tests verify request shape and safety behavior; they do not establish production deployment or acceptance.

Field creation and its initial options commit together when the corresponding API fix is deployed.
If a response reports `write_committed` after a metadata-refresh failure, use the supplied `field_id`
to retrieve the created field; do not repeat creation. `write_outcome_unknown` means the server lost
confirmation during commit: reconcile that ID before deciding whether another write is needed.
The SDK preserves the API error body and never retries either outcome automatically.
