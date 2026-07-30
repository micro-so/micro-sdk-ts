// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.prism.properties.create',
    fullyQualifiedName: 'prism.properties.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties',
  },
  {
    clientCallName: 'client.prism.properties.update',
    fullyQualifiedName: 'prism.properties.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties/{propertyId}',
  },
  {
    clientCallName: 'client.prism.properties.list',
    fullyQualifiedName: 'prism.properties.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties',
  },
  {
    clientCallName: 'client.prism.properties.delete',
    fullyQualifiedName: 'prism.properties.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties/{propertyId}',
  },
  {
    clientCallName: 'client.prism.properties.listAll',
    fullyQualifiedName: 'prism.properties.listAll',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/properties',
  },
  {
    clientCallName: 'client.prism.properties.options.create',
    fullyQualifiedName: 'prism.properties.options.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties/{propertyId}/options',
  },
  {
    clientCallName: 'client.prism.properties.options.update',
    fullyQualifiedName: 'prism.properties.options.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties/{propertyId}/options/{optionId}',
  },
  {
    clientCallName: 'client.prism.properties.options.delete',
    fullyQualifiedName: 'prism.properties.options.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/{objectType}/properties/{propertyId}/options/{optionId}',
  },
  {
    clientCallName: 'client.prism.imports.get',
    fullyQualifiedName: 'prism.imports.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/imports/{jobId}',
  },
  {
    clientCallName: 'client.prism.objects.contacts.create',
    fullyQualifiedName: 'prism.objects.contacts.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact',
  },
  {
    clientCallName: 'client.prism.objects.contacts.update',
    fullyQualifiedName: 'prism.objects.contacts.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}',
  },
  {
    clientCallName: 'client.prism.objects.contacts.list',
    fullyQualifiedName: 'prism.objects.contacts.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/contact',
  },
  {
    clientCallName: 'client.prism.objects.contacts.delete',
    fullyQualifiedName: 'prism.objects.contacts.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}',
  },
  {
    clientCallName: 'client.prism.objects.contacts.bulkCreate',
    fullyQualifiedName: 'prism.objects.contacts.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/import',
  },
  {
    clientCallName: 'client.prism.objects.contacts.bulkDelete',
    fullyQualifiedName: 'prism.objects.contacts.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.contacts.bulkUpdate',
    fullyQualifiedName: 'prism.objects.contacts.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.contacts.count',
    fullyQualifiedName: 'prism.objects.contacts.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/contact/count',
  },
  {
    clientCallName: 'client.prism.objects.contacts.duplicate',
    fullyQualifiedName: 'prism.objects.contacts.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.contacts.find',
    fullyQualifiedName: 'prism.objects.contacts.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/contact/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.contacts.get',
    fullyQualifiedName: 'prism.objects.contacts.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}',
  },
  {
    clientCallName: 'client.prism.objects.contacts.query',
    fullyQualifiedName: 'prism.objects.contacts.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/query',
  },
  {
    clientCallName: 'client.prism.objects.contacts.restore',
    fullyQualifiedName: 'prism.objects.contacts.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.contacts.upsert',
    fullyQualifiedName: 'prism.objects.contacts.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/contact/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.organizations.create',
    fullyQualifiedName: 'prism.objects.organizations.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization',
  },
  {
    clientCallName: 'client.prism.objects.organizations.update',
    fullyQualifiedName: 'prism.objects.organizations.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}',
  },
  {
    clientCallName: 'client.prism.objects.organizations.list',
    fullyQualifiedName: 'prism.objects.organizations.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/organization',
  },
  {
    clientCallName: 'client.prism.objects.organizations.delete',
    fullyQualifiedName: 'prism.objects.organizations.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}',
  },
  {
    clientCallName: 'client.prism.objects.organizations.bulkCreate',
    fullyQualifiedName: 'prism.objects.organizations.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/import',
  },
  {
    clientCallName: 'client.prism.objects.organizations.bulkDelete',
    fullyQualifiedName: 'prism.objects.organizations.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.organizations.bulkUpdate',
    fullyQualifiedName: 'prism.objects.organizations.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.organizations.count',
    fullyQualifiedName: 'prism.objects.organizations.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/organization/count',
  },
  {
    clientCallName: 'client.prism.objects.organizations.duplicate',
    fullyQualifiedName: 'prism.objects.organizations.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.organizations.find',
    fullyQualifiedName: 'prism.objects.organizations.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/organization/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.organizations.get',
    fullyQualifiedName: 'prism.objects.organizations.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}',
  },
  {
    clientCallName: 'client.prism.objects.organizations.query',
    fullyQualifiedName: 'prism.objects.organizations.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/query',
  },
  {
    clientCallName: 'client.prism.objects.organizations.restore',
    fullyQualifiedName: 'prism.objects.organizations.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.organizations.upsert',
    fullyQualifiedName: 'prism.objects.organizations.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/organization/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.identities.create',
    fullyQualifiedName: 'prism.objects.identities.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity',
  },
  {
    clientCallName: 'client.prism.objects.identities.update',
    fullyQualifiedName: 'prism.objects.identities.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}',
  },
  {
    clientCallName: 'client.prism.objects.identities.list',
    fullyQualifiedName: 'prism.objects.identities.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/identity',
  },
  {
    clientCallName: 'client.prism.objects.identities.delete',
    fullyQualifiedName: 'prism.objects.identities.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}',
  },
  {
    clientCallName: 'client.prism.objects.identities.bulkCreate',
    fullyQualifiedName: 'prism.objects.identities.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/import',
  },
  {
    clientCallName: 'client.prism.objects.identities.bulkDelete',
    fullyQualifiedName: 'prism.objects.identities.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.identities.bulkUpdate',
    fullyQualifiedName: 'prism.objects.identities.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.identities.count',
    fullyQualifiedName: 'prism.objects.identities.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/identity/count',
  },
  {
    clientCallName: 'client.prism.objects.identities.duplicate',
    fullyQualifiedName: 'prism.objects.identities.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.identities.find',
    fullyQualifiedName: 'prism.objects.identities.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/identity/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.identities.get',
    fullyQualifiedName: 'prism.objects.identities.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}',
  },
  {
    clientCallName: 'client.prism.objects.identities.query',
    fullyQualifiedName: 'prism.objects.identities.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/query',
  },
  {
    clientCallName: 'client.prism.objects.identities.restore',
    fullyQualifiedName: 'prism.objects.identities.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.identities.upsert',
    fullyQualifiedName: 'prism.objects.identities.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/identity/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.deals.create',
    fullyQualifiedName: 'prism.objects.deals.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal',
  },
  {
    clientCallName: 'client.prism.objects.deals.update',
    fullyQualifiedName: 'prism.objects.deals.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}',
  },
  {
    clientCallName: 'client.prism.objects.deals.list',
    fullyQualifiedName: 'prism.objects.deals.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/deal',
  },
  {
    clientCallName: 'client.prism.objects.deals.delete',
    fullyQualifiedName: 'prism.objects.deals.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}',
  },
  {
    clientCallName: 'client.prism.objects.deals.bulkCreate',
    fullyQualifiedName: 'prism.objects.deals.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/import',
  },
  {
    clientCallName: 'client.prism.objects.deals.bulkDelete',
    fullyQualifiedName: 'prism.objects.deals.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.deals.bulkUpdate',
    fullyQualifiedName: 'prism.objects.deals.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.deals.count',
    fullyQualifiedName: 'prism.objects.deals.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/deal/count',
  },
  {
    clientCallName: 'client.prism.objects.deals.duplicate',
    fullyQualifiedName: 'prism.objects.deals.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.deals.find',
    fullyQualifiedName: 'prism.objects.deals.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/deal/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.deals.get',
    fullyQualifiedName: 'prism.objects.deals.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}',
  },
  {
    clientCallName: 'client.prism.objects.deals.query',
    fullyQualifiedName: 'prism.objects.deals.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/query',
  },
  {
    clientCallName: 'client.prism.objects.deals.restore',
    fullyQualifiedName: 'prism.objects.deals.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.deals.upsert',
    fullyQualifiedName: 'prism.objects.deals.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/deal/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.deals.grant.update',
    fullyQualifiedName: 'prism.objects.deals.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.deals.grant.get',
    fullyQualifiedName: 'prism.objects.deals.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.actions.create',
    fullyQualifiedName: 'prism.objects.actions.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action',
  },
  {
    clientCallName: 'client.prism.objects.actions.update',
    fullyQualifiedName: 'prism.objects.actions.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/action/{actionId}',
  },
  {
    clientCallName: 'client.prism.objects.actions.list',
    fullyQualifiedName: 'prism.objects.actions.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/action',
  },
  {
    clientCallName: 'client.prism.objects.actions.delete',
    fullyQualifiedName: 'prism.objects.actions.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/action/{actionId}',
  },
  {
    clientCallName: 'client.prism.objects.actions.bulkCreate',
    fullyQualifiedName: 'prism.objects.actions.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/import',
  },
  {
    clientCallName: 'client.prism.objects.actions.bulkDelete',
    fullyQualifiedName: 'prism.objects.actions.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.actions.bulkUpdate',
    fullyQualifiedName: 'prism.objects.actions.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.actions.count',
    fullyQualifiedName: 'prism.objects.actions.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/action/count',
  },
  {
    clientCallName: 'client.prism.objects.actions.duplicate',
    fullyQualifiedName: 'prism.objects.actions.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/{actionId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.actions.find',
    fullyQualifiedName: 'prism.objects.actions.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/action/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.actions.get',
    fullyQualifiedName: 'prism.objects.actions.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/action/{actionId}',
  },
  {
    clientCallName: 'client.prism.objects.actions.query',
    fullyQualifiedName: 'prism.objects.actions.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/query',
  },
  {
    clientCallName: 'client.prism.objects.actions.restore',
    fullyQualifiedName: 'prism.objects.actions.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/{actionId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.actions.upsert',
    fullyQualifiedName: 'prism.objects.actions.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/action/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.actions.grant.update',
    fullyQualifiedName: 'prism.objects.actions.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/action/{actionId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.actions.grant.get',
    fullyQualifiedName: 'prism.objects.actions.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/action/{actionId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.documents.create',
    fullyQualifiedName: 'prism.objects.documents.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document',
  },
  {
    clientCallName: 'client.prism.objects.documents.update',
    fullyQualifiedName: 'prism.objects.documents.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/document/{documentId}',
  },
  {
    clientCallName: 'client.prism.objects.documents.list',
    fullyQualifiedName: 'prism.objects.documents.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/document',
  },
  {
    clientCallName: 'client.prism.objects.documents.delete',
    fullyQualifiedName: 'prism.objects.documents.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/document/{documentId}',
  },
  {
    clientCallName: 'client.prism.objects.documents.bulkCreate',
    fullyQualifiedName: 'prism.objects.documents.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/import',
  },
  {
    clientCallName: 'client.prism.objects.documents.bulkDelete',
    fullyQualifiedName: 'prism.objects.documents.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.documents.bulkUpdate',
    fullyQualifiedName: 'prism.objects.documents.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.documents.count',
    fullyQualifiedName: 'prism.objects.documents.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/document/count',
  },
  {
    clientCallName: 'client.prism.objects.documents.duplicate',
    fullyQualifiedName: 'prism.objects.documents.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/{documentId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.documents.find',
    fullyQualifiedName: 'prism.objects.documents.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/document/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.documents.get',
    fullyQualifiedName: 'prism.objects.documents.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/document/{documentId}',
  },
  {
    clientCallName: 'client.prism.objects.documents.query',
    fullyQualifiedName: 'prism.objects.documents.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/query',
  },
  {
    clientCallName: 'client.prism.objects.documents.restore',
    fullyQualifiedName: 'prism.objects.documents.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/{documentId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.documents.upsert',
    fullyQualifiedName: 'prism.objects.documents.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/document/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.documents.grant.update',
    fullyQualifiedName: 'prism.objects.documents.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/document/{documentId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.documents.grant.get',
    fullyQualifiedName: 'prism.objects.documents.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/document/{documentId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.events.create',
    fullyQualifiedName: 'prism.objects.events.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/event',
  },
  {
    clientCallName: 'client.prism.objects.events.update',
    fullyQualifiedName: 'prism.objects.events.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/event/{eventId}',
  },
  {
    clientCallName: 'client.prism.objects.events.list',
    fullyQualifiedName: 'prism.objects.events.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/event',
  },
  {
    clientCallName: 'client.prism.objects.events.delete',
    fullyQualifiedName: 'prism.objects.events.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/event/{eventId}',
  },
  {
    clientCallName: 'client.prism.objects.events.count',
    fullyQualifiedName: 'prism.objects.events.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/event/count',
  },
  {
    clientCallName: 'client.prism.objects.events.duplicate',
    fullyQualifiedName: 'prism.objects.events.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/event/{eventId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.events.find',
    fullyQualifiedName: 'prism.objects.events.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/event/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.events.get',
    fullyQualifiedName: 'prism.objects.events.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/event/{eventId}',
  },
  {
    clientCallName: 'client.prism.objects.events.query',
    fullyQualifiedName: 'prism.objects.events.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/event/query',
  },
  {
    clientCallName: 'client.prism.objects.events.restore',
    fullyQualifiedName: 'prism.objects.events.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/event/{eventId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.events.upsert',
    fullyQualifiedName: 'prism.objects.events.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/event/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.events.grant.update',
    fullyQualifiedName: 'prism.objects.events.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/event/{eventId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.events.grant.get',
    fullyQualifiedName: 'prism.objects.events.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/event/{eventId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.engagements.create',
    fullyQualifiedName: 'prism.objects.engagements.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement',
  },
  {
    clientCallName: 'client.prism.objects.engagements.update',
    fullyQualifiedName: 'prism.objects.engagements.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}',
  },
  {
    clientCallName: 'client.prism.objects.engagements.list',
    fullyQualifiedName: 'prism.objects.engagements.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/engagement',
  },
  {
    clientCallName: 'client.prism.objects.engagements.delete',
    fullyQualifiedName: 'prism.objects.engagements.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}',
  },
  {
    clientCallName: 'client.prism.objects.engagements.bulkCreate',
    fullyQualifiedName: 'prism.objects.engagements.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement/import',
  },
  {
    clientCallName: 'client.prism.objects.engagements.bulkDelete',
    fullyQualifiedName: 'prism.objects.engagements.bulkDelete',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement/batch/delete',
  },
  {
    clientCallName: 'client.prism.objects.engagements.bulkUpdate',
    fullyQualifiedName: 'prism.objects.engagements.bulkUpdate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement/batch/update',
  },
  {
    clientCallName: 'client.prism.objects.engagements.count',
    fullyQualifiedName: 'prism.objects.engagements.count',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/engagement/count',
  },
  {
    clientCallName: 'client.prism.objects.engagements.duplicate',
    fullyQualifiedName: 'prism.objects.engagements.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}/duplicate',
  },
  {
    clientCallName: 'client.prism.objects.engagements.find',
    fullyQualifiedName: 'prism.objects.engagements.find',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/engagement/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.engagements.get',
    fullyQualifiedName: 'prism.objects.engagements.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}',
  },
  {
    clientCallName: 'client.prism.objects.engagements.query',
    fullyQualifiedName: 'prism.objects.engagements.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement/query',
  },
  {
    clientCallName: 'client.prism.objects.engagements.restore',
    fullyQualifiedName: 'prism.objects.engagements.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.engagements.upsert',
    fullyQualifiedName: 'prism.objects.engagements.upsert',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/engagement/by/{slug}/{value}',
  },
  {
    clientCallName: 'client.prism.objects.engagements.grant.update',
    fullyQualifiedName: 'prism.objects.engagements.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}/grant',
  },
  {
    clientCallName: 'client.prism.objects.engagements.grant.get',
    fullyQualifiedName: 'prism.objects.engagements.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/engagement/{engagementId}/grant',
  },
  {
    clientCallName: 'client.views.create',
    fullyQualifiedName: 'views.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/views',
  },
  {
    clientCallName: 'client.views.update',
    fullyQualifiedName: 'views.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}',
  },
  {
    clientCallName: 'client.views.list',
    fullyQualifiedName: 'views.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/{objectType}/views',
  },
  {
    clientCallName: 'client.views.delete',
    fullyQualifiedName: 'views.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}',
  },
  {
    clientCallName: 'client.views.get',
    fullyQualifiedName: 'views.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}',
  },
  {
    clientCallName: 'client.views.records.list',
    fullyQualifiedName: 'views.records.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}/records',
  },
  {
    clientCallName: 'client.views.records.pin',
    fullyQualifiedName: 'views.records.pin',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}/records/{objectId}',
  },
  {
    clientCallName: 'client.views.records.reorder',
    fullyQualifiedName: 'views.records.reorder',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}/records',
  },
  {
    clientCallName: 'client.views.records.unpin',
    fullyQualifiedName: 'views.records.unpin',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/{objectType}/views/{viewId}/records/{objectId}',
  },
  {
    clientCallName: 'client.triggeredAutomations.create',
    fullyQualifiedName: 'triggeredAutomations.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations',
  },
  {
    clientCallName: 'client.triggeredAutomations.update',
    fullyQualifiedName: 'triggeredAutomations.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}',
  },
  {
    clientCallName: 'client.triggeredAutomations.list',
    fullyQualifiedName: 'triggeredAutomations.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations',
  },
  {
    clientCallName: 'client.triggeredAutomations.delete',
    fullyQualifiedName: 'triggeredAutomations.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}',
  },
  {
    clientCallName: 'client.triggeredAutomations.get',
    fullyQualifiedName: 'triggeredAutomations.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/{automationObjectType}/triggered_automations/{automationId}',
  },
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/v2/webhooks/{teamId}',
  },
  {
    clientCallName: 'client.webhooks.update',
    fullyQualifiedName: 'webhooks.update',
    httpMethod: 'patch',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/v2/webhooks/{teamId}',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}',
  },
  {
    clientCallName: 'client.webhooks.get',
    fullyQualifiedName: 'webhooks.get',
    httpMethod: 'get',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}',
  },
  {
    clientCallName: 'client.webhooks.listDeliveries',
    fullyQualifiedName: 'webhooks.listDeliveries',
    httpMethod: 'get',
    httpPath: '/v2/webhooks/{teamId}/deliveries',
  },
  {
    clientCallName: 'client.webhooks.ping',
    fullyQualifiedName: 'webhooks.ping',
    httpMethod: 'post',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}/ping',
  },
  {
    clientCallName: 'client.webhooks.verify',
    fullyQualifiedName: 'webhooks.verify',
    httpMethod: 'post',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}/verify',
  },
  {
    clientCallName: 'client.webhooks.deliveries.list',
    fullyQualifiedName: 'webhooks.deliveries.list',
    httpMethod: 'get',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}/deliveries',
  },
  {
    clientCallName: 'client.webhooks.deliveries.get',
    fullyQualifiedName: 'webhooks.deliveries.get',
    httpMethod: 'get',
    httpPath: '/v2/webhooks/{teamId}/{webhookId}/deliveries/{deliveryId}',
  },
  {
    clientCallName: 'client.realtime.createTicket',
    fullyQualifiedName: 'realtime.createTicket',
    httpMethod: 'post',
    httpPath: '/v2/realtime/ticket',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
