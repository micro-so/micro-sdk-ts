# Prism

Types:

- <code><a href="./src/resources/prism/prism.ts">PrismObjectProperties</a></code>

## Metadata

Types:

- <code><a href="./src/resources/prism/metadata.ts">MetadataListResponse</a></code>

Methods:

- <code title="get /v2/prism/metadata/properties/{teamId}/{objectType}">client.prism.metadata.<a href="./src/resources/prism/metadata.ts">list</a>(objectType, { ...params }) -> MetadataListResponse</code>

## Objects

### Contacts

Types:

- <code><a href="./src/resources/prism/objects/contacts.ts">Contact</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactQueryResponse</a></code>

Methods:

- <code title="post /v2/prism/query/{teamId}/contact">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">query</a>({ ...params }) -> ContactQueryResponse</code>

### Organizations

Types:

- <code><a href="./src/resources/prism/objects/organizations.ts">Organization</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationQueryResponse</a></code>

Methods:

- <code title="post /v2/prism/query/{teamId}/organization">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">query</a>({ ...params }) -> OrganizationQueryResponse</code>

### Identities

Types:

- <code><a href="./src/resources/prism/objects/identities/identities.ts">Identity</a></code>
- <code><a href="./src/resources/prism/objects/identities/identities.ts">IdentityBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities/identities.ts">IdentityDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities/identities.ts">IdentityQueryResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/identity">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/identity/{identityId}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">update</a>(identityID, { ...params }) -> PrismObjectProperties</code>
- <code title="delete /v2/prism/{teamId}/identity/{identityId}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">delete</a>(identityID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/identity/import">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">bulkCreate</a>({ ...params }) -> IdentityBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/identity/{identityId}/duplicate">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">duplicate</a>(identityID, { ...params }) -> IdentityDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/identity/{identityId}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">get</a>(identityID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/identity">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">query</a>({ ...params }) -> IdentityQueryResponse</code>
- <code title="post /v2/prism/{teamId}/identity/{identityId}/restore">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities/identities.ts">restore</a>(identityID, { ...params }) -> PrismObjectProperties</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/identities/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/grant/{teamId}/identity/{identityId}">client.prism.objects.identities.grant.<a href="./src/resources/prism/objects/identities/grant.ts">update</a>(identityID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/grant/{teamId}/identity/{identityId}">client.prism.objects.identities.grant.<a href="./src/resources/prism/objects/identities/grant.ts">get</a>(identityID, { ...params }) -> GrantGetResponse</code>

### Deals

Types:

- <code><a href="./src/resources/prism/objects/deals/deals.ts">Deal</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealQueryResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/deal">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/deal/{dealId}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">update</a>(dealID, { ...params }) -> PrismObjectProperties</code>
- <code title="delete /v2/prism/{teamId}/deal/{dealId}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">delete</a>(dealID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/deal/import">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">bulkCreate</a>({ ...params }) -> DealBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/deal/{dealId}/duplicate">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">duplicate</a>(dealID, { ...params }) -> DealDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/deal/{dealId}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">get</a>(dealID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/deal">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">query</a>({ ...params }) -> DealQueryResponse</code>
- <code title="post /v2/prism/{teamId}/deal/{dealId}/restore">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">restore</a>(dealID, { ...params }) -> PrismObjectProperties</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/deals/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/grant/{teamId}/deal/{dealId}">client.prism.objects.deals.grant.<a href="./src/resources/prism/objects/deals/grant.ts">update</a>(dealID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/grant/{teamId}/deal/{dealId}">client.prism.objects.deals.grant.<a href="./src/resources/prism/objects/deals/grant.ts">get</a>(dealID, { ...params }) -> GrantGetResponse</code>

### Actions

Types:

- <code><a href="./src/resources/prism/objects/actions/actions.ts">Action</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionQueryResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/action">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/action/{actionId}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">update</a>(actionID, { ...params }) -> PrismObjectProperties</code>
- <code title="delete /v2/prism/{teamId}/action/{actionId}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">delete</a>(actionID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/action/import">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">bulkCreate</a>({ ...params }) -> ActionBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/action/{actionId}/duplicate">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">duplicate</a>(actionID, { ...params }) -> ActionDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/action/{actionId}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">get</a>(actionID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/action">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">query</a>({ ...params }) -> ActionQueryResponse</code>
- <code title="post /v2/prism/{teamId}/action/{actionId}/restore">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">restore</a>(actionID, { ...params }) -> PrismObjectProperties</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/actions/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/grant/{teamId}/action/{actionId}">client.prism.objects.actions.grant.<a href="./src/resources/prism/objects/actions/grant.ts">update</a>(actionID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/grant/{teamId}/action/{actionId}">client.prism.objects.actions.grant.<a href="./src/resources/prism/objects/actions/grant.ts">get</a>(actionID, { ...params }) -> GrantGetResponse</code>

### Documents

Types:

- <code><a href="./src/resources/prism/objects/documents/documents.ts">Document</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentQueryResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/document">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">create</a>({ ...params }) -> PrismObjectProperties</code>
- <code title="patch /v2/prism/{teamId}/document/{documentId}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">update</a>(documentID, { ...params }) -> PrismObjectProperties</code>
- <code title="delete /v2/prism/{teamId}/document/{documentId}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">delete</a>(documentID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/document/import">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">bulkCreate</a>({ ...params }) -> DocumentBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/document/{documentId}/duplicate">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">duplicate</a>(documentID, { ...params }) -> DocumentDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/document/{documentId}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">get</a>(documentID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/document">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">query</a>({ ...params }) -> DocumentQueryResponse</code>
- <code title="post /v2/prism/{teamId}/document/{documentId}/restore">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">restore</a>(documentID, { ...params }) -> PrismObjectProperties</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/documents/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/grant/{teamId}/document/{documentId}">client.prism.objects.documents.grant.<a href="./src/resources/prism/objects/documents/grant.ts">update</a>(documentID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/grant/{teamId}/document/{documentId}">client.prism.objects.documents.grant.<a href="./src/resources/prism/objects/documents/grant.ts">get</a>(documentID, { ...params }) -> GrantGetResponse</code>

### Events

Types:

- <code><a href="./src/resources/prism/objects/events/events.ts">Event</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventQueryResponse</a></code>

Methods:

- <code title="get /v2/prism/{teamId}/event/{eventId}">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">get</a>(eventID, { ...params }) -> PrismObjectProperties</code>
- <code title="post /v2/prism/query/{teamId}/event">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">query</a>({ ...params }) -> EventQueryResponse</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/events/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/grant/{teamId}/event/{eventId}">client.prism.objects.events.grant.<a href="./src/resources/prism/objects/events/grant.ts">update</a>(eventID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/grant/{teamId}/event/{eventId}">client.prism.objects.events.grant.<a href="./src/resources/prism/objects/events/grant.ts">get</a>(eventID, { ...params }) -> GrantGetResponse</code>

# Views

Types:

- <code><a href="./src/resources/views/views.ts">ViewCreateResponse</a></code>
- <code><a href="./src/resources/views/views.ts">ViewUpdateResponse</a></code>
- <code><a href="./src/resources/views/views.ts">ViewGetResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/view/{viewObjectType}">client.views.<a href="./src/resources/views/views.ts">create</a>(viewObjectType, { ...params }) -> ViewCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/view/{viewObjectType}/{viewId}">client.views.<a href="./src/resources/views/views.ts">update</a>(viewID, { ...params }) -> ViewUpdateResponse</code>
- <code title="delete /v2/prism/{teamId}/view/{viewObjectType}/{viewId}">client.views.<a href="./src/resources/views/views.ts">delete</a>(viewID, { ...params }) -> void</code>
- <code title="get /v2/prism/{teamId}/view/{viewObjectType}/{viewId}">client.views.<a href="./src/resources/views/views.ts">get</a>(viewID, { ...params }) -> ViewGetResponse</code>

## Records

Types:

- <code><a href="./src/resources/views/records.ts">RecordListResponse</a></code>

Methods:

- <code title="get /v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records">client.views.records.<a href="./src/resources/views/records.ts">list</a>(viewID, { ...params }) -> RecordListResponse</code>
- <code title="post /v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records/{objectId}">client.views.records.<a href="./src/resources/views/records.ts">pin</a>(objectID, { ...params }) -> void</code>
- <code title="patch /v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records">client.views.records.<a href="./src/resources/views/records.ts">reorder</a>(viewID, { ...params }) -> void</code>
- <code title="delete /v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records/{objectId}">client.views.records.<a href="./src/resources/views/records.ts">unpin</a>(objectID, { ...params }) -> void</code>
