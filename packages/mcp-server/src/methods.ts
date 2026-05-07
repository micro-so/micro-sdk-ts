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
    clientCallName: 'client.prism.metadata.list',
    fullyQualifiedName: 'prism.metadata.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/metadata/properties/{teamId}/{objectType}',
  },
  {
    clientCallName: 'client.prism.objects.contacts.create',
    fullyQualifiedName: 'prism.objects.contacts.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact',
  },
  {
    clientCallName: 'client.prism.objects.contacts.bulkCreate',
    fullyQualifiedName: 'prism.objects.contacts.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/import',
  },
  {
    clientCallName: 'client.prism.objects.contacts.query',
    fullyQualifiedName: 'prism.objects.contacts.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/contact',
  },
  {
    clientCallName: 'client.prism.objects.organizations.create',
    fullyQualifiedName: 'prism.objects.organizations.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization',
  },
  {
    clientCallName: 'client.prism.objects.organizations.bulkCreate',
    fullyQualifiedName: 'prism.objects.organizations.bulkCreate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/import',
  },
  {
    clientCallName: 'client.prism.objects.organizations.query',
    fullyQualifiedName: 'prism.objects.organizations.query',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/organization',
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
    clientCallName: 'client.prism.objects.identities.duplicate',
    fullyQualifiedName: 'prism.objects.identities.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}/duplicate',
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
    httpPath: '/v2/prism/query/{teamId}/identity',
  },
  {
    clientCallName: 'client.prism.objects.identities.restore',
    fullyQualifiedName: 'prism.objects.identities.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.identities.grant.update',
    fullyQualifiedName: 'prism.objects.identities.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/grant/{teamId}/identity/{identityId}',
  },
  {
    clientCallName: 'client.prism.objects.identities.grant.get',
    fullyQualifiedName: 'prism.objects.identities.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/grant/{teamId}/identity/{identityId}',
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
    clientCallName: 'client.prism.objects.deals.duplicate',
    fullyQualifiedName: 'prism.objects.deals.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}/duplicate',
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
    httpPath: '/v2/prism/query/{teamId}/deal',
  },
  {
    clientCallName: 'client.prism.objects.deals.restore',
    fullyQualifiedName: 'prism.objects.deals.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.deals.grant.update',
    fullyQualifiedName: 'prism.objects.deals.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/grant/{teamId}/deal/{dealId}',
  },
  {
    clientCallName: 'client.prism.objects.deals.grant.get',
    fullyQualifiedName: 'prism.objects.deals.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/grant/{teamId}/deal/{dealId}',
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
    clientCallName: 'client.prism.objects.actions.duplicate',
    fullyQualifiedName: 'prism.objects.actions.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/{actionId}/duplicate',
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
    httpPath: '/v2/prism/query/{teamId}/action',
  },
  {
    clientCallName: 'client.prism.objects.actions.restore',
    fullyQualifiedName: 'prism.objects.actions.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action/{actionId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.actions.grant.update',
    fullyQualifiedName: 'prism.objects.actions.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/grant/{teamId}/action/{actionId}',
  },
  {
    clientCallName: 'client.prism.objects.actions.grant.get',
    fullyQualifiedName: 'prism.objects.actions.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/grant/{teamId}/action/{actionId}',
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
    clientCallName: 'client.prism.objects.documents.duplicate',
    fullyQualifiedName: 'prism.objects.documents.duplicate',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/{documentId}/duplicate',
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
    httpPath: '/v2/prism/query/{teamId}/document',
  },
  {
    clientCallName: 'client.prism.objects.documents.restore',
    fullyQualifiedName: 'prism.objects.documents.restore',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document/{documentId}/restore',
  },
  {
    clientCallName: 'client.prism.objects.documents.grant.update',
    fullyQualifiedName: 'prism.objects.documents.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/grant/{teamId}/document/{documentId}',
  },
  {
    clientCallName: 'client.prism.objects.documents.grant.get',
    fullyQualifiedName: 'prism.objects.documents.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/grant/{teamId}/document/{documentId}',
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
    httpPath: '/v2/prism/query/{teamId}/event',
  },
  {
    clientCallName: 'client.prism.objects.events.grant.update',
    fullyQualifiedName: 'prism.objects.events.grant.update',
    httpMethod: 'put',
    httpPath: '/v2/prism/grant/{teamId}/event/{eventId}',
  },
  {
    clientCallName: 'client.prism.objects.events.grant.get',
    fullyQualifiedName: 'prism.objects.events.grant.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/grant/{teamId}/event/{eventId}',
  },
  {
    clientCallName: 'client.views.create',
    fullyQualifiedName: 'views.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}',
  },
  {
    clientCallName: 'client.views.update',
    fullyQualifiedName: 'views.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}',
  },
  {
    clientCallName: 'client.views.delete',
    fullyQualifiedName: 'views.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}',
  },
  {
    clientCallName: 'client.views.get',
    fullyQualifiedName: 'views.get',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}',
  },
  {
    clientCallName: 'client.views.records.list',
    fullyQualifiedName: 'views.records.list',
    httpMethod: 'get',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records',
  },
  {
    clientCallName: 'client.views.records.pin',
    fullyQualifiedName: 'views.records.pin',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records/{objectId}',
  },
  {
    clientCallName: 'client.views.records.reorder',
    fullyQualifiedName: 'views.records.reorder',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records',
  },
  {
    clientCallName: 'client.views.records.unpin',
    fullyQualifiedName: 'views.records.unpin',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/view/{viewObjectType}/{viewId}/records/{objectId}',
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
