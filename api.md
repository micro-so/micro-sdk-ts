# Prism

Types:

- <code><a href="./src/resources/prism/prism.ts">ObjectType</a></code>
- <code><a href="./src/resources/prism/prism.ts">PrismObjectProperties</a></code>
- <code><a href="./src/resources/prism/prism.ts">PrismDuplicateObjectResponse</a></code>
- <code><a href="./src/resources/prism/prism.ts">PrismImportObjectsResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/{objectType}">client.prism.<a href="./src/resources/prism/prism.ts">createObject</a>(objectType, { ...params }) -> PrismObjectProperties</code>
- <code title="delete /v2/prism/{teamId}/{objectType}/{objectId}">client.prism.<a href="./src/resources/prism/prism.ts">deleteObject</a>(objectID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/{objectType}/{objectId}/duplicate">client.prism.<a href="./src/resources/prism/prism.ts">duplicateObject</a>(objectID, { ...params }) -> PrismDuplicateObjectResponse</code>
- <code title="post /v2/prism/{teamId}/{objectType}/import">client.prism.<a href="./src/resources/prism/prism.ts">importObjects</a>(objectType, { ...params }) -> PrismImportObjectsResponse</code>
- <code title="patch /v2/prism/{teamId}/{objectType}/{objectId}">client.prism.<a href="./src/resources/prism/prism.ts">patchObject</a>(objectID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/{teamId}/{objectType}/{objectId}/restore">client.prism.<a href="./src/resources/prism/prism.ts">restoreObject</a>(objectID, { ...params }) -> PrismObjectProperties</code>

## Grant

Types:

- <code><a href="./src/resources/prism/grant.ts">GrantRetrieveGrantResponse</a></code>
- <code><a href="./src/resources/prism/grant.ts">GrantUpdateGrantResponse</a></code>

Methods:

- <code title="get /v2/prism/grant/{teamId}/{objectType}/{objectId}">client.prism.grant.<a href="./src/resources/prism/grant.ts">retrieveGrant</a>(objectID, { ...params }) -> GrantRetrieveGrantResponse</code>
- <code title="put /v2/prism/grant/{teamId}/{objectType}/{objectId}">client.prism.grant.<a href="./src/resources/prism/grant.ts">updateGrant</a>(objectID, { ...params }) -> GrantUpdateGrantResponse</code>

## Query

Types:

- <code><a href="./src/resources/prism/query.ts">QueryExecuteResponse</a></code>

Methods:

- <code title="post /v2/prism/query/{teamId}/{objectType}">client.prism.query.<a href="./src/resources/prism/query.ts">execute</a>(objectType, { ...params }) -> QueryExecuteResponse</code>

## Metadata

Types:

- <code><a href="./src/resources/prism/metadata.ts">MetadataPropertiesResponse</a></code>

Methods:

- <code title="get /v2/prism/metadata/properties/{teamId}/{objectType}">client.prism.metadata.<a href="./src/resources/prism/metadata.ts">properties</a>(objectType, { ...params }) -> MetadataPropertiesResponse</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">Contact</a></code>

# Organizations

Types:

- <code><a href="./src/resources/organizations.ts">Organization</a></code>

# Identities

Types:

- <code><a href="./src/resources/identities.ts">Identity</a></code>

# Deals

Types:

- <code><a href="./src/resources/deals.ts">Deal</a></code>

# Actions

Types:

- <code><a href="./src/resources/actions.ts">Action</a></code>

# Events

Types:

- <code><a href="./src/resources/events.ts">Event</a></code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">Document</a></code>
