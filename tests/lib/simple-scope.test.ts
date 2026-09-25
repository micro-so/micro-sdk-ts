import { recordTypeForObjectType, resolveObjectType, resolveSource } from '../../src/lib/simple-scope';

describe('explicit simple resource scopes', () => {
  test('preserves distinct people/contact namespaces and list scope', () => {
    expect(resolveSource({ record_type: 'people', scope: { type: 'workspace' } })).toEqual({
      objectType: 'identity',
    });
    expect(
      resolveSource({ record_type: 'contacts', scope: { type: 'list', list_id: 'pipeline-a' } }),
    ).toEqual({
      objectType: 'contact',
      listId: 'pipeline-a',
    });
  });

  test.each([
    null,
    {},
    { record_type: 'people' },
    { record_type: 'identity', scope: { type: 'workspace' } },
    { record_type: '__proto__', scope: { type: 'workspace' } },
    { record_type: 'people', scope: { type: 'workspace', list_id: 'pipeline-a' } },
    { record_type: 'people', scope: { type: 'list' } },
    { record_type: 'people', scope: { type: 'list', list_id: '' } },
    { record_type: 'people', scope: { type: 'list', list_id: ' pipeline-a ' } },
    { record_type: 'people', scope: { type: 'list', listId: 'pipeline-a' } },
    { record_type: 'people', scope: { type: 'workspace' }, team_id: 'another-team' },
  ])('rejects malformed scope without broadening it: %j', (source) => {
    expect(() => resolveSource(source as never)).toThrow(TypeError);
  });

  test('does not reinterpret unknown reference targets', () => {
    expect(recordTypeForObjectType('identity')).toBe('people');
    expect(recordTypeForObjectType('organization')).toBe('companies');
    expect(recordTypeForObjectType('user')).toBeNull();
    expect(recordTypeForObjectType('message')).toBeNull();
    expect(() => resolveObjectType('organizations' as never)).toThrow('Unknown record_type');
  });
});
