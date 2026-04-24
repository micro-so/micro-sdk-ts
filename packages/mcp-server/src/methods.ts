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
