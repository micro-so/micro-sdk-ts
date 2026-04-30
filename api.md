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
- <code><a href="./src/resources/contacts.ts">ContactListResponse</a></code>
- <code><a href="./src/resources/contacts.ts">ContactImportResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/contact">client.contacts.<a href="./src/resources/contacts.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/contact/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">update</a>(contactID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/contact">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="delete /v2/prism/{teamId}/contact/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">delete</a>(contactID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/contact/import">client.contacts.<a href="./src/resources/contacts.ts">import</a>({ ...params }) -> ContactImportResponse</code>

# Organizations

Types:

- <code><a href="./src/resources/organizations.ts">Organization</a></code>
- <code><a href="./src/resources/organizations.ts">OrganizationListResponse</a></code>
- <code><a href="./src/resources/organizations.ts">OrganizationImportResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/organization">client.organizations.<a href="./src/resources/organizations.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/organization/{organizationId}">client.organizations.<a href="./src/resources/organizations.ts">update</a>(organizationID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/organization">client.organizations.<a href="./src/resources/organizations.ts">list</a>({ ...params }) -> OrganizationListResponse</code>
- <code title="delete /v2/prism/{teamId}/organization/{organizationId}">client.organizations.<a href="./src/resources/organizations.ts">delete</a>(organizationID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/organization/import">client.organizations.<a href="./src/resources/organizations.ts">import</a>({ ...params }) -> OrganizationImportResponse</code>

# Identities

Types:

- <code><a href="./src/resources/identities.ts">Identity</a></code>
- <code><a href="./src/resources/identities.ts">IdentityListResponse</a></code>
- <code><a href="./src/resources/identities.ts">IdentityImportResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/identity">client.identities.<a href="./src/resources/identities.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/identity/{identityId}">client.identities.<a href="./src/resources/identities.ts">update</a>(identityID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/identity">client.identities.<a href="./src/resources/identities.ts">list</a>({ ...params }) -> IdentityListResponse</code>
- <code title="delete /v2/prism/{teamId}/identity/{identityId}">client.identities.<a href="./src/resources/identities.ts">delete</a>(identityID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/identity/import">client.identities.<a href="./src/resources/identities.ts">import</a>({ ...params }) -> IdentityImportResponse</code>

# Deals

Types:

- <code><a href="./src/resources/deals.ts">Deal</a></code>
- <code><a href="./src/resources/deals.ts">DealListResponse</a></code>
- <code><a href="./src/resources/deals.ts">DealImportResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/deal">client.deals.<a href="./src/resources/deals.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/deal/{dealId}">client.deals.<a href="./src/resources/deals.ts">update</a>(dealID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/deal">client.deals.<a href="./src/resources/deals.ts">list</a>({ ...params }) -> DealListResponse</code>
- <code title="delete /v2/prism/{teamId}/deal/{dealId}">client.deals.<a href="./src/resources/deals.ts">delete</a>(dealID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/deal/import">client.deals.<a href="./src/resources/deals.ts">import</a>({ ...params }) -> DealImportResponse</code>

# Actions

Types:

- <code><a href="./src/resources/actions.ts">Action</a></code>
- <code><a href="./src/resources/actions.ts">ActionListResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/action">client.actions.<a href="./src/resources/actions.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/action/{actionId}">client.actions.<a href="./src/resources/actions.ts">update</a>(actionID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/action">client.actions.<a href="./src/resources/actions.ts">list</a>({ ...params }) -> ActionListResponse</code>
- <code title="delete /v2/prism/{teamId}/action/{actionId}">client.actions.<a href="./src/resources/actions.ts">delete</a>(actionID, { ...params }) -> void</code>

# Events

Types:

- <code><a href="./src/resources/events.ts">Event</a></code>
- <code><a href="./src/resources/events.ts">EventListResponse</a></code>

Methods:

- <code title="post /v2/prism/query/{teamId}/event">client.events.<a href="./src/resources/events.ts">list</a>({ ...params }) -> EventListResponse</code>

# Documents

Types:

- <code><a href="./src/resources/documents.ts">Document</a></code>
- <code><a href="./src/resources/documents.ts">DocumentListResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/document">client.documents.<a href="./src/resources/documents.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/document/{documentId}">client.documents.<a href="./src/resources/documents.ts">update</a>(documentID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/document">client.documents.<a href="./src/resources/documents.ts">list</a>({ ...params }) -> DocumentListResponse</code>
- <code title="delete /v2/prism/{teamId}/document/{documentId}">client.documents.<a href="./src/resources/documents.ts">delete</a>(documentID, { ...params }) -> void</code>
