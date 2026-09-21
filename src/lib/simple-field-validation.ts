import type RawMicro from '../index';
import { InvalidResponseError, request, type CallOptions } from './simple-core';
import { resolveSource, type SimpleSource } from './simple-scope';

export type FieldValidationParams = {
  source: SimpleSource;
  operation: 'create' | 'update';
  properties: Record<string, unknown>;
};

export type FieldValidationIssue = { field: string; code: string; message: string };
export type FieldValidationResult = { valid: boolean; errors: FieldValidationIssue[] };

function jsonValue(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (typeof value !== 'object' || ancestors.has(value)) {
    throw new TypeError('Validation properties must contain finite, acyclic JSON values.');
  }
  if (
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  ) {
    throw new TypeError('Validation properties must contain plain JSON objects.');
  }
  ancestors.add(value);
  for (const child of Array.isArray(value) ? value : Object.values(value)) jsonValue(child, ancestors);
  ancestors.delete(value);
}

/** Advisory only: this does not authorize a record write or reserve the current schema. */
export async function validateFields(
  client: RawMicro,
  params: FieldValidationParams,
  options: CallOptions = {},
): Promise<FieldValidationResult> {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    throw new TypeError('Field validation requires an object.');
  }
  for (const key of Object.keys(params)) {
    if (!['source', 'operation', 'properties'].includes(key))
      throw new TypeError(`Unknown field validation field: ${key}.`);
  }
  for (const key of ['source', 'operation', 'properties']) {
    if (!Object.prototype.hasOwnProperty.call(params, key))
      throw new TypeError(`Field validation requires ${key}.`);
  }
  const { objectType, listId } = resolveSource(params.source);
  if (params.operation !== 'create' && params.operation !== 'update') {
    throw new TypeError('Field validation operation must be create or update.');
  }
  if (!params.properties || typeof params.properties !== 'object' || Array.isArray(params.properties)) {
    throw new TypeError('Validation properties must be an object.');
  }
  jsonValue(params.properties);
  const result = await client.post<unknown>(
    `/v2/prism/${encodeURIComponent(client.teamID)}/${objectType}/properties/validate`,
    {
      ...request(options),
      body: {
        scope: listId === undefined ? { type: 'workspace' } : { type: 'list', list_id: listId },
        operation: params.operation,
        properties: params.properties,
      },
    },
  );
  if (!result || typeof result !== 'object')
    throw new InvalidResponseError('Field validation response is invalid.');
  const response = result as FieldValidationResult;
  if (
    typeof response.valid !== 'boolean' ||
    !Array.isArray(response.errors) ||
    response.valid !== (response.errors.length === 0)
  ) {
    throw new InvalidResponseError('Field validation result is inconsistent.');
  }
  const errors = response.errors.map((issue) => {
    if (
      !issue ||
      typeof issue.field !== 'string' ||
      typeof issue.code !== 'string' ||
      typeof issue.message !== 'string'
    ) {
      throw new InvalidResponseError('Field validation issue is invalid.');
    }
    return { field: issue.field, code: issue.code, message: issue.message };
  });
  return { valid: response.valid, errors };
}
