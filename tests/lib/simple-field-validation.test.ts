import Micro from '../../src/lib/simple';
import { APIError, InvalidResponseError } from '../../src/lib/simple';

const source = { record_type: 'companies', scope: { type: 'list', list_id: 'list-a' } } as const;
const input = { source, operation: 'update', properties: { tier: 'enterprise' } } as const;

function setup(body: unknown = { valid: true, errors: [] }, status = 200) {
  const calls: { url: string; init: RequestInit }[] = [];
  const micro = new Micro({
    apiKey: 'test',
    teamID: 'team',
    baseURL: 'https://micro.test',
    maxRetries: 0,
    fetch: async (url, init) => {
      calls.push({ url: String(url), init: init as RequestInit });
      return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
    },
  });
  return { micro, calls };
}

test('validates one explicit list source through the public simple client', async () => {
  const { micro, calls } = setup();
  const signal = new AbortController().signal;
  await expect(micro.fields.validate(input, { signal })).resolves.toEqual({ valid: true, errors: [] });
  expect(calls).toHaveLength(1);
  expect(calls[0]!.url).toBe('https://micro.test/v2/prism/team/organization/properties/validate');
  expect(JSON.parse(calls[0]!.init.body as string)).toEqual({
    scope: { type: 'list', list_id: 'list-a' },
    operation: 'update',
    properties: { tier: 'enterprise' },
  });
});

test('preserves server validation issues rather than coercing invalid values locally', async () => {
  const result = {
    valid: false,
    errors: [{ field: 'properties.amount', code: 'invalid_type', message: 'Expected a number.' }],
  };
  const { micro, calls } = setup(result);
  await expect(
    micro.fields.validate({
      source: { record_type: 'deals', scope: { type: 'workspace' } },
      operation: 'create',
      properties: { amount: 'not a number' },
    }),
  ).resolves.toEqual(result);
  expect(JSON.parse(calls[0]!.init.body as string).properties.amount).toBe('not a number');
});

test.each([NaN, Infinity, undefined, BigInt(1), () => null, new Date()])(
  'does not silently serialize invalid JSON value %p',
  async (value) => {
    const { micro, calls } = setup();
    await expect(micro.fields.validate({ ...input, properties: { value } })).rejects.toBeInstanceOf(
      TypeError,
    );
    expect(calls).toHaveLength(0);
  },
);

test('rejects cycles while allowing repeated independent JSON values', async () => {
  const { micro, calls } = setup();
  const circular: Record<string, unknown> = {};
  circular['self'] = circular;
  await expect(micro.fields.validate({ ...input, properties: circular })).rejects.toBeInstanceOf(TypeError);
  const value = { okay: true };
  await expect(
    micro.fields.validate({ ...input, properties: { first: value, second: value } }),
  ).resolves.toEqual({ valid: true, errors: [] });
  expect(calls).toHaveLength(1);
});

test.each([
  { valid: true, errors: [{ field: 'x', code: 'x', message: 'x' }] },
  { valid: false, errors: [] },
  { valid: false, errors: [null] },
])('rejects inconsistent response %p', async (result) => {
  const { micro } = setup(result);
  await expect(micro.fields.validate(input)).rejects.toBeInstanceOf(InvalidResponseError);
});

test('keeps authorization failures distinct from invalid property values', async () => {
  const { micro } = setup({ error: { code: 'forbidden', message: 'Not allowed' } }, 403);
  await expect(micro.fields.validate(input)).rejects.toBeInstanceOf(APIError);
});

test('rejects unknown parameters and operations before HTTP', async () => {
  const { micro, calls } = setup();
  await expect(micro.fields.validate({ ...input, operation: 'delete' } as never)).rejects.toThrow(
    'create or update',
  );
  await expect(micro.fields.validate({ ...input, list_id: 'other' } as never)).rejects.toThrow(
    'Unknown field validation field',
  );
  expect(calls).toHaveLength(0);
});
