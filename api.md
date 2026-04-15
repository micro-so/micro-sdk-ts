# Prism

Types:

- <code><a href="./src/resources/prism/prism.ts">ObjectType</a></code>
- <code><a href="./src/resources/prism/prism.ts">PrismObjectProperties</a></code>
- <code><a href="./src/resources/prism/prism.ts">PrismDuplicateObjectResponse</a></code>
- <code><a href="./src/resources/prism/prism.ts">PrismImportObjectsResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/{objectType}">client.prism.<a href="./src/resources/prism/prism.ts">createObject</a>(objectType, { ...params }) -> void</code>
- <code title="delete /v2/prism/{teamId}/{objectType}/{objectId}">client.prism.<a href="./src/resources/prism/prism.ts">deleteObject</a>(objectID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/{objectType}/{objectId}/duplicate">client.prism.<a href="./src/resources/prism/prism.ts">duplicateObject</a>(objectID, { ...params }) -> PrismDuplicateObjectResponse</code>
- <code title="post /v2/prism/{teamId}/{objectType}/import">client.prism.<a href="./src/resources/prism/prism.ts">importObjects</a>(objectType, { ...params }) -> PrismImportObjectsResponse</code>
- <code title="patch /v2/prism/{teamId}/{objectType}/{objectId}">client.prism.<a href="./src/resources/prism/prism.ts">patchObject</a>(objectID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/{objectType}/{objectId}/restore">client.prism.<a href="./src/resources/prism/prism.ts">restoreObject</a>(objectID, { ...params }) -> void</code>

## Grant

Methods:

- <code title="get /v2/prism/grant/{teamId}/{objectType}/{objectId}">client.prism.grant.<a href="./src/resources/prism/grant.ts">retrieveGrant</a>(objectID, { ...params }) -> void</code>
- <code title="put /v2/prism/grant/{teamId}/{objectType}/{objectId}">client.prism.grant.<a href="./src/resources/prism/grant.ts">updateGrant</a>(objectID, { ...params }) -> void</code>

## Query

Types:

- <code><a href="./src/resources/prism/query.ts">QueryExecuteResponse</a></code>

Methods:

- <code title="post /v2/prism/query/{teamId}/{objectType}">client.prism.query.<a href="./src/resources/prism/query.ts">execute</a>(objectType, { ...params }) -> QueryExecuteResponse</code>
