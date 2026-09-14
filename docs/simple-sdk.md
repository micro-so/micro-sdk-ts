# People and Companies

The opt-in simple client works with Micro's person profiles (identities) and companies
(organizations). Existing SDK imports and methods remain available unchanged.

```ts
import Micro from '@micro-so/sdk/lib/simple';

const micro = new Micro({
  apiKey: process.env.MICRO_API_KEY,
  teamID: process.env.MICRO_TEAM_ID!,
});
const company = await micro.companies.create({ name: 'Acme', primary_domain: 'acme.com' });
const person = await micro.people.create({
  full_name: 'Sam Lee',
  email_addresses: ['sam@acme.com'],
  company_ids: [company.id],
});
await micro.people.update(person.id, { title: 'Founder' });
await micro.people.addEmails(person.id, ['sam@example.com']);
const page = await micro.people.list({ where: { company_id: company.id }, limit: 25 });
for await (const person of micro.people.iterate()) console.log(person.full_name);
```

## Fields and methods

People expose `id`, `full_name`, `first_name`, `middle_name`, `last_name`, `title`,
`email_addresses`, `company_ids`, and `properties`. The ID is always an identity ID,
never a contact ID. Companies expose `id`, `name`, `primary_domain`, and `properties`.
Nullable scalar fields return null when absent. Relationship arrays have no primary
value or guaranteed order. `title` retains Micro's existing meaning.

Names are stored independently. The SDK neither splits a full name nor reconstructs
it from components. Creating a person creates a profile; it does not merge profiles
by matching email. Micro's existing email normalization applies (including plus-tag
removal and Gmail dot normalization); the returned address may differ from input.

Both resources have `create(fields, options?)`, `get(id, readOptions?, options?)`,
`update(id, fields, options?)`, `list(listOptions?, options?)`, and
`iterate(listOptions?, options?)`. People also have `addEmails`, `removeEmails`,
`addCompanies`, and `removeCompanies`, each taking `(id, values, options?)`.

- Omit a field to leave it untouched. Use null to clear a nullable scalar.
- Arrays in update **replace** all links in the write scope. Empty arrays clear links.
- Add/remove helpers change only specified links. They never delete linked records.
- Company links use IDs, not company names or domains.
- Failed or unresolved email projections raise an error instead of showing an empty list.

## Custom fields and filters

Write custom fields using `properties: { customer_tier: 'enterprise' }`. Names and
select option values use their existing API slugs. Standard field names and
`companies` are reserved. The SDK does not create schema or options.

Request extra fields with `get(id, { properties: ['customer_tier'] })` or
`list({ properties: ['customer_tier'] })`; they appear under `record.properties`.
Custom values retain their existing representation and have TypeScript type unknown.

People filters are `where: { email_address, company_id }`; company filters are
`where: { primary_domain }`. Filters use exact comparisons and combine with AND.
Use the stored, normalized email address when filtering. Advanced queries remain
available through `micro.raw.prism.objects.identities.query(...)`.

Pages contain `data`, `next_cursor`, and `has_more`. Pass `cursor: page.next_cursor`
to continue. The default limit is 25 and maximum is 50. Iteration is lazy and supports
`{ signal }` cancellation. It inherits server cursor consistency, not snapshot isolation.

## Write outcomes

The simple client disables automatic write retries. Request options support
`headers`, `timeout`, `signal`, `idempotencyKey`, and `ifMatch`; existing API errors
retain their original types and request IDs. Conditional headers inherit the server's
guarantees. Passing an idempotency key alone is not proof of deployed replay safety.

A partial mutation response may require one additional read to return the complete
profile. If the write succeeds and that read fails, `WriteReadbackError` exposes
`record_id`, `write_committed: true`, and `cause`. Retrieve that ID again; do not
repeat the create. An ordinary network error during a write can have an unknown
outcome and should also not trigger a blind create retry.

## Release acceptance

Deploy API identity email-input support before releasing this client. Run
`examples/simple-people.ts` with credentials for a disposable workspace and inspect
the resulting person in Micro. It creates records; keep it out of customer workspaces.
Target completion of the quickstart in under ten minutes.

Local verification: typecheck, `jest --runInBand tests/lib`, `pnpm build`, then
`node tests/simple-package-smoke.mjs`. The package test installs a local tarball in
a temporary directory and verifies both module formats and the original import.
The published-package and in-app acceptance checks must run after release; local
transport and database tests do not establish deployed behavior.
