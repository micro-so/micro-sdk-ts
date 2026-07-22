# Prism

Types:

- <code><a href="./src/resources/prism/prism.ts">PrismObjectProperties</a></code>

## Properties

Types:

- <code><a href="./src/resources/prism/properties.ts">PropertyListResponse</a></code>
- <code><a href="./src/resources/prism/properties.ts">PropertyListAllResponse</a></code>

Methods:

- <code title="get /v2/prism/{teamId}/{objectType}/properties">client.prism.properties.<a href="./src/resources/prism/properties.ts">list</a>(objectType, { ...params }) -> PropertyListResponse</code>
- <code title="get /v2/prism/{teamId}/properties">client.prism.properties.<a href="./src/resources/prism/properties.ts">listAll</a>({ ...params }) -> PropertyListAllResponse</code>

## Imports

Types:

- <code><a href="./src/resources/prism/imports.ts">ImportGetResponse</a></code>

Methods:

- <code title="get /v2/prism/{teamId}/imports/{jobId}">client.prism.imports.<a href="./src/resources/prism/imports.ts">get</a>(jobID, { ...params }) -> ImportGetResponse</code>

## Objects

### Contacts

Types:

- <code><a href="./src/resources/prism/objects/contacts.ts">Contact</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactListResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/contacts.ts">ContactUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/contact">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">create</a>({ ...params }) -> ContactCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/contact/{contactId}">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">update</a>(contactID, { ...params }) -> ContactUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/contact">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">list</a>({ ...params }) -> ContactListResponse</code>
- <code title="delete /v2/prism/{teamId}/contact/{contactId}">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">delete</a>(contactID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/contact/import">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">bulkCreate</a>({ ...params }) -> ContactBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/contact/batch/delete">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">bulkDelete</a>({ ...params }) -> ContactBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/contact/batch/update">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">bulkUpdate</a>({ ...params }) -> ContactBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/contact/count">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">count</a>({ ...params }) -> ContactCountResponse</code>
- <code title="post /v2/prism/{teamId}/contact/{contactId}/duplicate">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">duplicate</a>(contactID, { ...params }) -> ContactDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/contact/by/{slug}/{value}">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">find</a>(value, { ...params }) -> ContactFindResponse</code>
- <code title="get /v2/prism/{teamId}/contact/{contactId}">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">get</a>(contactID, { ...params }) -> ContactGetResponse</code>
- <code title="post /v2/prism/{teamId}/contact/query">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">query</a>({ ...params }) -> ContactQueryResponse</code>
- <code title="post /v2/prism/{teamId}/contact/{contactId}/restore">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">restore</a>(contactID, { ...params }) -> ContactRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/contact/by/{slug}/{value}">client.prism.objects.contacts.<a href="./src/resources/prism/objects/contacts.ts">upsert</a>(value, { ...params }) -> ContactUpsertResponse</code>

### Organizations

Types:

- <code><a href="./src/resources/prism/objects/organizations.ts">Organization</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationListResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/organizations.ts">OrganizationUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/organization">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">create</a>({ ...params }) -> OrganizationCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/organization/{organizationId}">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">update</a>(organizationID, { ...params }) -> OrganizationUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/organization">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">list</a>({ ...params }) -> OrganizationListResponse</code>
- <code title="delete /v2/prism/{teamId}/organization/{organizationId}">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">delete</a>(organizationID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/organization/import">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">bulkCreate</a>({ ...params }) -> OrganizationBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/organization/batch/delete">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">bulkDelete</a>({ ...params }) -> OrganizationBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/organization/batch/update">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">bulkUpdate</a>({ ...params }) -> OrganizationBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/organization/count">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">count</a>({ ...params }) -> OrganizationCountResponse</code>
- <code title="post /v2/prism/{teamId}/organization/{organizationId}/duplicate">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">duplicate</a>(organizationID, { ...params }) -> OrganizationDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/organization/by/{slug}/{value}">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">find</a>(value, { ...params }) -> OrganizationFindResponse</code>
- <code title="get /v2/prism/{teamId}/organization/{organizationId}">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">get</a>(organizationID, { ...params }) -> OrganizationGetResponse</code>
- <code title="post /v2/prism/{teamId}/organization/query">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">query</a>({ ...params }) -> OrganizationQueryResponse</code>
- <code title="post /v2/prism/{teamId}/organization/{organizationId}/restore">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">restore</a>(organizationID, { ...params }) -> OrganizationRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/organization/by/{slug}/{value}">client.prism.objects.organizations.<a href="./src/resources/prism/objects/organizations.ts">upsert</a>(value, { ...params }) -> OrganizationUpsertResponse</code>

### Identities

Types:

- <code><a href="./src/resources/prism/objects/identities.ts">Identity</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityListResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/identities.ts">IdentityUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/identity">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">create</a>({ ...params }) -> IdentityCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/identity/{identityId}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">update</a>(identityID, { ...params }) -> IdentityUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/identity">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">list</a>({ ...params }) -> IdentityListResponse</code>
- <code title="delete /v2/prism/{teamId}/identity/{identityId}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">delete</a>(identityID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/identity/import">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">bulkCreate</a>({ ...params }) -> IdentityBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/identity/batch/delete">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">bulkDelete</a>({ ...params }) -> IdentityBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/identity/batch/update">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">bulkUpdate</a>({ ...params }) -> IdentityBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/identity/count">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">count</a>({ ...params }) -> IdentityCountResponse</code>
- <code title="post /v2/prism/{teamId}/identity/{identityId}/duplicate">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">duplicate</a>(identityID, { ...params }) -> IdentityDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/identity/by/{slug}/{value}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">find</a>(value, { ...params }) -> IdentityFindResponse</code>
- <code title="get /v2/prism/{teamId}/identity/{identityId}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">get</a>(identityID, { ...params }) -> IdentityGetResponse</code>
- <code title="post /v2/prism/{teamId}/identity/query">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">query</a>({ ...params }) -> IdentityQueryResponse</code>
- <code title="post /v2/prism/{teamId}/identity/{identityId}/restore">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">restore</a>(identityID, { ...params }) -> IdentityRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/identity/by/{slug}/{value}">client.prism.objects.identities.<a href="./src/resources/prism/objects/identities.ts">upsert</a>(value, { ...params }) -> IdentityUpsertResponse</code>

### Deals

Types:

- <code><a href="./src/resources/prism/objects/deals/deals.ts">Deal</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealListResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/deals.ts">DealUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/deal">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">create</a>({ ...params }) -> DealCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/deal/{dealId}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">update</a>(dealID, { ...params }) -> DealUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/deal">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">list</a>({ ...params }) -> DealListResponse</code>
- <code title="delete /v2/prism/{teamId}/deal/{dealId}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">delete</a>(dealID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/deal/import">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">bulkCreate</a>({ ...params }) -> DealBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/deal/batch/delete">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">bulkDelete</a>({ ...params }) -> DealBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/deal/batch/update">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">bulkUpdate</a>({ ...params }) -> DealBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/deal/count">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">count</a>({ ...params }) -> DealCountResponse</code>
- <code title="post /v2/prism/{teamId}/deal/{dealId}/duplicate">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">duplicate</a>(dealID, { ...params }) -> DealDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/deal/by/{slug}/{value}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">find</a>(value, { ...params }) -> DealFindResponse</code>
- <code title="get /v2/prism/{teamId}/deal/{dealId}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">get</a>(dealID, { ...params }) -> DealGetResponse</code>
- <code title="post /v2/prism/{teamId}/deal/query">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">query</a>({ ...params }) -> DealQueryResponse</code>
- <code title="post /v2/prism/{teamId}/deal/{dealId}/restore">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">restore</a>(dealID, { ...params }) -> DealRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/deal/by/{slug}/{value}">client.prism.objects.deals.<a href="./src/resources/prism/objects/deals/deals.ts">upsert</a>(value, { ...params }) -> DealUpsertResponse</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/deals/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/deals/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/{teamId}/deal/{dealId}/grant">client.prism.objects.deals.grant.<a href="./src/resources/prism/objects/deals/grant.ts">update</a>(dealID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/deal/{dealId}/grant">client.prism.objects.deals.grant.<a href="./src/resources/prism/objects/deals/grant.ts">get</a>(dealID, { ...params }) -> GrantGetResponse</code>

### Actions

Types:

- <code><a href="./src/resources/prism/objects/actions/actions.ts">Action</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionListResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/actions.ts">ActionUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/action">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">create</a>({ ...params }) -> ActionCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/action/{actionId}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">update</a>(actionID, { ...params }) -> ActionUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/action">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">list</a>({ ...params }) -> ActionListResponse</code>
- <code title="delete /v2/prism/{teamId}/action/{actionId}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">delete</a>(actionID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/action/import">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">bulkCreate</a>({ ...params }) -> ActionBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/action/batch/delete">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">bulkDelete</a>({ ...params }) -> ActionBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/action/batch/update">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">bulkUpdate</a>({ ...params }) -> ActionBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/action/count">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">count</a>({ ...params }) -> ActionCountResponse</code>
- <code title="post /v2/prism/{teamId}/action/{actionId}/duplicate">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">duplicate</a>(actionID, { ...params }) -> ActionDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/action/by/{slug}/{value}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">find</a>(value, { ...params }) -> ActionFindResponse</code>
- <code title="get /v2/prism/{teamId}/action/{actionId}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">get</a>(actionID, { ...params }) -> ActionGetResponse</code>
- <code title="post /v2/prism/{teamId}/action/query">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">query</a>({ ...params }) -> ActionQueryResponse</code>
- <code title="post /v2/prism/{teamId}/action/{actionId}/restore">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">restore</a>(actionID, { ...params }) -> ActionRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/action/by/{slug}/{value}">client.prism.objects.actions.<a href="./src/resources/prism/objects/actions/actions.ts">upsert</a>(value, { ...params }) -> ActionUpsertResponse</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/actions/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/actions/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/{teamId}/action/{actionId}/grant">client.prism.objects.actions.grant.<a href="./src/resources/prism/objects/actions/grant.ts">update</a>(actionID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/action/{actionId}/grant">client.prism.objects.actions.grant.<a href="./src/resources/prism/objects/actions/grant.ts">get</a>(actionID, { ...params }) -> GrantGetResponse</code>

### Documents

Types:

- <code><a href="./src/resources/prism/objects/documents/documents.ts">Document</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentListResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/documents.ts">DocumentUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/document">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">create</a>({ ...params }) -> DocumentCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/document/{documentId}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">update</a>(documentID, { ...params }) -> DocumentUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/document">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">list</a>({ ...params }) -> DocumentListResponse</code>
- <code title="delete /v2/prism/{teamId}/document/{documentId}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">delete</a>(documentID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/document/import">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">bulkCreate</a>({ ...params }) -> DocumentBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/document/batch/delete">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">bulkDelete</a>({ ...params }) -> DocumentBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/document/batch/update">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">bulkUpdate</a>({ ...params }) -> DocumentBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/document/count">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">count</a>({ ...params }) -> DocumentCountResponse</code>
- <code title="post /v2/prism/{teamId}/document/{documentId}/duplicate">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">duplicate</a>(documentID, { ...params }) -> DocumentDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/document/by/{slug}/{value}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">find</a>(value, { ...params }) -> DocumentFindResponse</code>
- <code title="get /v2/prism/{teamId}/document/{documentId}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">get</a>(documentID, { ...params }) -> DocumentGetResponse</code>
- <code title="post /v2/prism/{teamId}/document/query">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">query</a>({ ...params }) -> DocumentQueryResponse</code>
- <code title="post /v2/prism/{teamId}/document/{documentId}/restore">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">restore</a>(documentID, { ...params }) -> DocumentRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/document/by/{slug}/{value}">client.prism.objects.documents.<a href="./src/resources/prism/objects/documents/documents.ts">upsert</a>(value, { ...params }) -> DocumentUpsertResponse</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/documents/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/documents/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/{teamId}/document/{documentId}/grant">client.prism.objects.documents.grant.<a href="./src/resources/prism/objects/documents/grant.ts">update</a>(documentID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/document/{documentId}/grant">client.prism.objects.documents.grant.<a href="./src/resources/prism/objects/documents/grant.ts">get</a>(documentID, { ...params }) -> GrantGetResponse</code>

### Events

Types:

- <code><a href="./src/resources/prism/objects/events/events.ts">Event</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventListResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/events.ts">EventUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/event">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">create</a>({ ...params }) -> EventCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/event/{eventId}">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">update</a>(eventID, { ...params }) -> EventUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/event">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">list</a>({ ...params }) -> EventListResponse</code>
- <code title="delete /v2/prism/{teamId}/event/{eventId}">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">delete</a>(eventID, { ...params }) -> void</code>
- <code title="get /v2/prism/{teamId}/event/count">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">count</a>({ ...params }) -> EventCountResponse</code>
- <code title="post /v2/prism/{teamId}/event/{eventId}/duplicate">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">duplicate</a>(eventID, { ...params }) -> EventDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/event/by/{slug}/{value}">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">find</a>(value, { ...params }) -> EventFindResponse</code>
- <code title="get /v2/prism/{teamId}/event/{eventId}">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">get</a>(eventID, { ...params }) -> EventGetResponse</code>
- <code title="post /v2/prism/{teamId}/event/query">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">query</a>({ ...params }) -> EventQueryResponse</code>
- <code title="post /v2/prism/{teamId}/event/{eventId}/restore">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">restore</a>(eventID, { ...params }) -> EventRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/event/by/{slug}/{value}">client.prism.objects.events.<a href="./src/resources/prism/objects/events/events.ts">upsert</a>(value, { ...params }) -> EventUpsertResponse</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/events/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/events/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/{teamId}/event/{eventId}/grant">client.prism.objects.events.grant.<a href="./src/resources/prism/objects/events/grant.ts">update</a>(eventID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/event/{eventId}/grant">client.prism.objects.events.grant.<a href="./src/resources/prism/objects/events/grant.ts">get</a>(eventID, { ...params }) -> GrantGetResponse</code>

### Engagements

Types:

- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">Engagement</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementListResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementBulkCreateResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementBulkDeleteResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementBulkUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementCountResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementDuplicateResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementFindResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementGetResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementQueryResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementRestoreResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/engagements.ts">EngagementUpsertResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/engagement">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">create</a>({ ...params }) -> EngagementCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/engagement/{engagementId}">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">update</a>(engagementID, { ...params }) -> EngagementUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/engagement">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">list</a>({ ...params }) -> EngagementListResponse</code>
- <code title="delete /v2/prism/{teamId}/engagement/{engagementId}">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">delete</a>(engagementID, { ...params }) -> void</code>
- <code title="post /v2/prism/{teamId}/engagement/import">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">bulkCreate</a>({ ...params }) -> EngagementBulkCreateResponse</code>
- <code title="post /v2/prism/{teamId}/engagement/batch/delete">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">bulkDelete</a>({ ...params }) -> EngagementBulkDeleteResponse</code>
- <code title="post /v2/prism/{teamId}/engagement/batch/update">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">bulkUpdate</a>({ ...params }) -> EngagementBulkUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/engagement/count">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">count</a>({ ...params }) -> EngagementCountResponse</code>
- <code title="post /v2/prism/{teamId}/engagement/{engagementId}/duplicate">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">duplicate</a>(engagementID, { ...params }) -> EngagementDuplicateResponse</code>
- <code title="get /v2/prism/{teamId}/engagement/by/{slug}/{value}">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">find</a>(value, { ...params }) -> EngagementFindResponse</code>
- <code title="get /v2/prism/{teamId}/engagement/{engagementId}">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">get</a>(engagementID, { ...params }) -> EngagementGetResponse</code>
- <code title="post /v2/prism/{teamId}/engagement/query">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">query</a>({ ...params }) -> EngagementQueryResponse</code>
- <code title="post /v2/prism/{teamId}/engagement/{engagementId}/restore">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">restore</a>(engagementID, { ...params }) -> EngagementRestoreResponse</code>
- <code title="put /v2/prism/{teamId}/engagement/by/{slug}/{value}">client.prism.objects.engagements.<a href="./src/resources/prism/objects/engagements/engagements.ts">upsert</a>(value, { ...params }) -> EngagementUpsertResponse</code>

#### Grant

Types:

- <code><a href="./src/resources/prism/objects/engagements/grant.ts">GrantUpdateResponse</a></code>
- <code><a href="./src/resources/prism/objects/engagements/grant.ts">GrantGetResponse</a></code>

Methods:

- <code title="put /v2/prism/{teamId}/engagement/{engagementId}/grant">client.prism.objects.engagements.grant.<a href="./src/resources/prism/objects/engagements/grant.ts">update</a>(engagementID, { ...params }) -> GrantUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/engagement/{engagementId}/grant">client.prism.objects.engagements.grant.<a href="./src/resources/prism/objects/engagements/grant.ts">get</a>(engagementID, { ...params }) -> GrantGetResponse</code>

# Views

Types:

- <code><a href="./src/resources/views/views.ts">ViewCreateResponse</a></code>
- <code><a href="./src/resources/views/views.ts">ViewUpdateResponse</a></code>
- <code><a href="./src/resources/views/views.ts">ViewListResponse</a></code>
- <code><a href="./src/resources/views/views.ts">ViewGetResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/{viewObjectType}/views">client.views.<a href="./src/resources/views/views.ts">create</a>(viewObjectType, { ...params }) -> ViewCreateResponse</code>
- <code title="patch /v2/prism/{teamId}/{viewObjectType}/views/{viewId}">client.views.<a href="./src/resources/views/views.ts">update</a>(viewID, { ...params }) -> ViewUpdateResponse</code>
- <code title="get /v2/prism/{teamId}/{viewObjectType}/views">client.views.<a href="./src/resources/views/views.ts">list</a>(viewObjectType, { ...params }) -> ViewListResponse</code>
- <code title="delete /v2/prism/{teamId}/{viewObjectType}/views/{viewId}">client.views.<a href="./src/resources/views/views.ts">delete</a>(viewID, { ...params }) -> void</code>
- <code title="get /v2/prism/{teamId}/{viewObjectType}/views/{viewId}">client.views.<a href="./src/resources/views/views.ts">get</a>(viewID, { ...params }) -> ViewGetResponse</code>

## Records

Types:

- <code><a href="./src/resources/views/records.ts">RecordListResponse</a></code>

Methods:

- <code title="get /v2/prism/{teamId}/{viewObjectType}/views/{viewId}/records">client.views.records.<a href="./src/resources/views/records.ts">list</a>(viewID, { ...params }) -> RecordListResponse</code>
- <code title="post /v2/prism/{teamId}/{viewObjectType}/views/{viewId}/records/{objectId}">client.views.records.<a href="./src/resources/views/records.ts">pin</a>(objectID, { ...params }) -> void</code>
- <code title="patch /v2/prism/{teamId}/{viewObjectType}/views/{viewId}/records">client.views.records.<a href="./src/resources/views/records.ts">reorder</a>(viewID, { ...params }) -> void</code>
- <code title="delete /v2/prism/{teamId}/{viewObjectType}/views/{viewId}/records/{objectId}">client.views.records.<a href="./src/resources/views/records.ts">unpin</a>(objectID, { ...params }) -> void</code>

# TriggeredAutomations

Types:

- <code><a href="./src/resources/triggered-automations.ts">TriggeredAutomation</a></code>
- <code><a href="./src/resources/triggered-automations.ts">TriggeredAutomationListResponse</a></code>

Methods:

- <code title="post /v2/prism/{teamId}/{automationObjectType}/triggered_automations">client.triggeredAutomations.<a href="./src/resources/triggered-automations.ts">create</a>(automationObjectType, { ...params }) -> TriggeredAutomation</code>
- <code title="put /v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}">client.triggeredAutomations.<a href="./src/resources/triggered-automations.ts">update</a>(automationID, { ...params }) -> TriggeredAutomation</code>
- <code title="get /v2/prism/{teamId}/{automationObjectType}/triggered_automations">client.triggeredAutomations.<a href="./src/resources/triggered-automations.ts">list</a>(automationObjectType, { ...params }) -> TriggeredAutomationListResponse</code>
- <code title="delete /v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}">client.triggeredAutomations.<a href="./src/resources/triggered-automations.ts">delete</a>(automationID, { ...params }) -> void</code>
- <code title="get /v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}">client.triggeredAutomations.<a href="./src/resources/triggered-automations.ts">get</a>(automationID, { ...params }) -> TriggeredAutomation</code>

# Realtime

Types:

- <code><a href="./src/resources/realtime.ts">RealtimeCreateTicketResponse</a></code>

Methods:

- <code title="post /v2/realtime/ticket">client.realtime.<a href="./src/resources/realtime.ts">createTicket</a>() -> RealtimeCreateTicketResponse</code>
