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
    clientCallName: 'client.prism.createObject',
    fullyQualifiedName: 'prism.createObject',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}',
  },
  {
    clientCallName: 'client.prism.deleteObject',
    fullyQualifiedName: 'prism.deleteObject',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/{objectType}/{objectId}',
  },
  {
    clientCallName: 'client.prism.duplicateObject',
    fullyQualifiedName: 'prism.duplicateObject',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/{objectId}/duplicate',
  },
  {
    clientCallName: 'client.prism.importObjects',
    fullyQualifiedName: 'prism.importObjects',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/import',
  },
  {
    clientCallName: 'client.prism.patchObject',
    fullyQualifiedName: 'prism.patchObject',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/{objectType}/{objectId}',
  },
  {
    clientCallName: 'client.prism.restoreObject',
    fullyQualifiedName: 'prism.restoreObject',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/{objectType}/{objectId}/restore',
  },
  {
    clientCallName: 'client.prism.grant.retrieveGrant',
    fullyQualifiedName: 'prism.grant.retrieveGrant',
    httpMethod: 'get',
    httpPath: '/v2/prism/grant/{teamId}/{objectType}/{objectId}',
  },
  {
    clientCallName: 'client.prism.grant.updateGrant',
    fullyQualifiedName: 'prism.grant.updateGrant',
    httpMethod: 'put',
    httpPath: '/v2/prism/grant/{teamId}/{objectType}/{objectId}',
  },
  {
    clientCallName: 'client.prism.query.execute',
    fullyQualifiedName: 'prism.query.execute',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/{objectType}',
  },
  {
    clientCallName: 'client.prism.metadata.properties',
    fullyQualifiedName: 'prism.metadata.properties',
    httpMethod: 'get',
    httpPath: '/v2/prism/metadata/properties/{teamId}/{objectType}',
  },
  {
    clientCallName: 'client.contacts.create',
    fullyQualifiedName: 'contacts.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact',
  },
  {
    clientCallName: 'client.contacts.update',
    fullyQualifiedName: 'contacts.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}',
  },
  {
    clientCallName: 'client.contacts.list',
    fullyQualifiedName: 'contacts.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/contact',
  },
  {
    clientCallName: 'client.contacts.delete',
    fullyQualifiedName: 'contacts.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/contact/{contactId}',
  },
  {
    clientCallName: 'client.contacts.import',
    fullyQualifiedName: 'contacts.import',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/contact/import',
  },
  {
    clientCallName: 'client.organizations.create',
    fullyQualifiedName: 'organizations.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization',
  },
  {
    clientCallName: 'client.organizations.update',
    fullyQualifiedName: 'organizations.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}',
  },
  {
    clientCallName: 'client.organizations.list',
    fullyQualifiedName: 'organizations.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/organization',
  },
  {
    clientCallName: 'client.organizations.delete',
    fullyQualifiedName: 'organizations.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/organization/{organizationId}',
  },
  {
    clientCallName: 'client.organizations.import',
    fullyQualifiedName: 'organizations.import',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/organization/import',
  },
  {
    clientCallName: 'client.identities.create',
    fullyQualifiedName: 'identities.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity',
  },
  {
    clientCallName: 'client.identities.update',
    fullyQualifiedName: 'identities.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}',
  },
  {
    clientCallName: 'client.identities.list',
    fullyQualifiedName: 'identities.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/identity',
  },
  {
    clientCallName: 'client.identities.delete',
    fullyQualifiedName: 'identities.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/identity/{identityId}',
  },
  {
    clientCallName: 'client.identities.import',
    fullyQualifiedName: 'identities.import',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/identity/import',
  },
  {
    clientCallName: 'client.deals.create',
    fullyQualifiedName: 'deals.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal',
  },
  {
    clientCallName: 'client.deals.update',
    fullyQualifiedName: 'deals.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}',
  },
  {
    clientCallName: 'client.deals.list',
    fullyQualifiedName: 'deals.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/deal',
  },
  {
    clientCallName: 'client.deals.delete',
    fullyQualifiedName: 'deals.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/deal/{dealId}',
  },
  {
    clientCallName: 'client.deals.import',
    fullyQualifiedName: 'deals.import',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/deal/import',
  },
  {
    clientCallName: 'client.actions.create',
    fullyQualifiedName: 'actions.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/action',
  },
  {
    clientCallName: 'client.actions.update',
    fullyQualifiedName: 'actions.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/action/{actionId}',
  },
  {
    clientCallName: 'client.actions.list',
    fullyQualifiedName: 'actions.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/action',
  },
  {
    clientCallName: 'client.actions.delete',
    fullyQualifiedName: 'actions.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/action/{actionId}',
  },
  {
    clientCallName: 'client.events.list',
    fullyQualifiedName: 'events.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/event',
  },
  {
    clientCallName: 'client.documents.create',
    fullyQualifiedName: 'documents.create',
    httpMethod: 'post',
    httpPath: '/v2/prism/{teamId}/document',
  },
  {
    clientCallName: 'client.documents.update',
    fullyQualifiedName: 'documents.update',
    httpMethod: 'patch',
    httpPath: '/v2/prism/{teamId}/document/{documentId}',
  },
  {
    clientCallName: 'client.documents.list',
    fullyQualifiedName: 'documents.list',
    httpMethod: 'post',
    httpPath: '/v2/prism/query/{teamId}/document',
  },
  {
    clientCallName: 'client.documents.delete',
    fullyQualifiedName: 'documents.delete',
    httpMethod: 'delete',
    httpPath: '/v2/prism/{teamId}/document/{documentId}',
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
