# Micro TypeScript SDK

## Install

**Install `@micro-so/sdk`. Never run `npm install micro`: that is a different package.**

```sh
npm install @micro-so/sdk
```

## Initialize the client

Set both environment variables before running code:

```sh
export MICRO_API_KEY="..."
export MICRO_TEAM_ID="..."
```

```ts
import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: process.env.MICRO_API_KEY,
  teamID: process.env.MICRO_TEAM_ID!,
});
```

`teamID` is required. `apiKey` defaults to `MICRO_API_KEY`, but passing it explicitly makes the dependency clear.

## Golden paths

All object resources are under `client.prism.objects`. Property values are keyed by property slug in `default`.

### 1. Query contacts with selected fields and filters

```ts
const result = await client.prism.objects.contacts.query({
  query: {
    select: ['first_name', 'last_name', 'email'],
    filter: [{ status: { '=': 'active' } }],
    limit: 50,
  },
});
```

### 2. Get one contact

```ts
const contact = await client.prism.objects.contacts.get('contact_id', {
  select: 'first_name,last_name,email',
});
```

### 3. Create a contact

```ts
const contact = await client.prism.objects.contacts.create({
  default: { first_name: 'Ada', last_name: 'Lovelace', email: 'ada@example.com' },
});
```

### 4. Update a contact

```ts
const contact = await client.prism.objects.contacts.update('contact_id', {
  default: { status: 'active' },
});
```

### 5. Find or upsert by a property

```ts
const existing = await client.prism.objects.contacts.find('ada@example.com', {
  slug: 'email',
});

const contact = await client.prism.objects.contacts.upsert('ada@example.com', {
  slug: 'email',
  default: { first_name: 'Ada', last_name: 'Lovelace' },
});
```

### 6. Paginate a query with its cursor

The SDK returns `next_cursor` and `has_more`; pass the cursor back in `query.cursor`.

```ts
let cursor: string | undefined;

while (true) {
  const page = await client.prism.objects.contacts.query({
    query: {
      select: ['first_name', 'email'],
      limit: 50,
      ...(cursor ? { cursor } : {}),
    },
  });

  for (const contact of page.data) {
    console.log(contact.id, contact.properties);
  }

  if (!page.has_more) break;
  cursor = page.next_cursor!;
}
```

## Errors

Catch `Micro.APIError` for HTTP failures; inspect `error.status`, `error.headers`, and `error.error`.

```ts
try {
  await client.prism.objects.contacts.get('contact_id');
} catch (error) {
  if (error instanceof Micro.NotFoundError) {
    // 404
  } else if (error instanceof Micro.APIError) {
    console.error(error.status, error.error);
  } else {
    throw error;
  }
}
```

HTTP errors include `BadRequestError` (400), `AuthenticationError` (401),
`PermissionDeniedError` (403), `NotFoundError` (404), `ConflictError` (409),
`UnprocessableEntityError` (422), `RateLimitError` (429), and
`InternalServerError` (>=500). Network failures use `APIConnectionError`;
timeouts use `APIConnectionTimeoutError`.

## MCP server

For agent integrations, use the MCP server in `packages/mcp-server` (published as
`@micro-so/mcp`):

```sh
npx -y @micro-so/mcp
```
