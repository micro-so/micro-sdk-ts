# Task and document content reads

The simple client exposes `micro.documents.content.get(id)` and
`micro.tasks.description.get(id)`. Both return a Markdown projection of the
collaborative editor, with an opaque content version and a fidelity label.
These are the first content methods; task/document lifecycle and content
replace/append methods are not yet available in this client.

```ts
const body = await micro.documents.content.get(documentId, { format: 'markdown' });
console.log(body.value, body.version, body.fidelity, body.unsupported_blocks);

const description = await micro.tasks.description.get(taskId);
```

Document responses identify `document_id`; task responses identify `task_id`.
The other fields are shared: `format`, `value`, `version`, `fidelity`, and
`unsupported_blocks`. An empty `value` is a successful empty-content read.
A missing, inaccessible, corrupt, or unavailable record never becomes an empty
string fallback. Existing request options, cancellation and API errors apply.

`rendered` means Markdown is a projection of rich editor state. `lossy` means
some structure or formatting is not represented fully; `unsupported_blocks`
identifies affected block types where applicable. Formatting-only loss can
have an empty block list. Neither label is permission to overwrite the rich
source with the projection. The version belongs to editor content, not record
metadata, and does not imply that content writes are currently supported. A live
snapshot may include edits that have not yet been saved; its version is not a
proof of persistence.

The task endpoint excludes automations and templates on the server. Both
endpoints authorize the record in the configured workspace, including reads
by callers who cannot edit it. They never expose internal encoded Yjs state.

## Deployment dependency

These methods require the new authenticated API content routes and the
editor's workspace-bound pure snapshot endpoint (protocol 2), with
`HOCUSPOCUS_URL` configured in the API.
Deploy the editor capability before the API routes, then publish the SDK.
An older or unavailable editor produces a service-unavailable error. Reads
must not fall back to the legacy connection lifecycle that can save content
on disconnect.

Current snapshot consistency relies on the editor's existing single-process
ownership. Multiple editor owners or deployment overlap need a proven routing
or ownership contract before claiming a globally current snapshot. Public
replace/append remains gated on durable conflict handling and recovery.
