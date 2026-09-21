/** Public resource names. Internal Prism names stay inside the adapter. */
export type SimpleRecordType =
  | 'people'
  | 'companies'
  | 'tasks'
  | 'documents'
  | 'deals'
  | 'events'
  | 'contacts'
  | 'comments';

export type SimpleScope = { type: 'workspace' } | { type: 'list'; list_id: string };
export type SimpleSource = { record_type: SimpleRecordType; scope: SimpleScope };

const objectTypes = {
  people: 'identity',
  companies: 'organization',
  tasks: 'action',
  documents: 'document',
  deals: 'deal',
  events: 'event',
  contacts: 'contact',
  comments: 'comment',
} as const;

export type SimpleObjectType = (typeof objectTypes)[SimpleRecordType];

export function resolveObjectType(recordType: SimpleRecordType): SimpleObjectType {
  if (typeof recordType !== 'string' || !Object.prototype.hasOwnProperty.call(objectTypes, recordType)) {
    throw new TypeError(`Unknown record_type. Use one of: ${Object.keys(objectTypes).join(', ')}.`);
  }
  return objectTypes[recordType];
}

/** Unknown targets stay unknown; never guess a public reference namespace. */
export function recordTypeForObjectType(objectType: string): SimpleRecordType | null {
  for (const [recordType, value] of Object.entries(objectTypes)) {
    if (value === objectType) return recordType as SimpleRecordType;
  }
  return null;
}

/** Validate explicit scope before constructing a request; never default a typo to workspace scope. */
export function resolveSource(source: SimpleSource): { objectType: SimpleObjectType; listId?: string } {
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    throw new TypeError('source must include record_type and an explicit scope.');
  }
  if (Object.keys(source).some((key) => key !== 'record_type' && key !== 'scope')) {
    throw new TypeError('source accepts only record_type and scope.');
  }
  const objectType = resolveObjectType(source.record_type);
  const scope = source.scope;
  if (!scope || typeof scope !== 'object' || Array.isArray(scope)) {
    throw new TypeError('scope must be { type: "workspace" } or { type: "list", list_id }.');
  }
  if (scope.type === 'workspace' && Object.keys(scope).every((key) => key === 'type')) {
    return { objectType };
  }
  if (
    scope.type === 'list' &&
    typeof scope.list_id === 'string' &&
    scope.list_id.trim().length > 0 &&
    scope.list_id.trim() === scope.list_id &&
    Object.keys(scope).every((key) => key === 'type' || key === 'list_id')
  ) {
    return { objectType, listId: scope.list_id };
  }
  throw new TypeError('Use scope { type: "workspace" } or { type: "list", list_id: "..." }.');
}
