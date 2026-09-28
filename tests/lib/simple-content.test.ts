import Micro, { APIError, InvalidResponseError } from '../../src/lib/simple';
const ID = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
const snapshot = {
  document_id: ID,
  format: 'markdown',
  value: '',
  version: 'opaque',
  fidelity: 'rendered',
  unsupported_blocks: [],
};
function setup(body: unknown = snapshot, status = 200) {
  const calls: string[] = [];
  const micro = new Micro({
    apiKey: 'test',
    teamID: 'team',
    baseURL: 'https://micro.test',
    maxRetries: 0,
    fetch: async (url) => {
      calls.push(String(url));
      return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
    },
  });
  return { micro, calls };
}
test('reads document content and preserves an intentionally empty body', async () => {
  const { micro, calls } = setup();
  expect(await micro.documents.content.get(ID.toUpperCase())).toEqual(snapshot);
  expect(calls).toEqual([`https://micro.test/v2/prism/team/document/${ID}/content?format=markdown`]);
});
test('reads task description through the task-filtered action content route', async () => {
  const { document_id, ...rest } = snapshot;
  const result = { ...rest, task_id: document_id, fidelity: 'lossy', unsupported_blocks: ['textStyle'] };
  const { micro, calls } = setup(result);
  expect(await micro.tasks.description.get(ID, { format: 'markdown' })).toEqual(result);
  expect(calls[0]).toContain(`/action/${ID}/content?format=markdown`);
});
test.each([
  { document_id: 'other' },
  { version: '' },
  { value: null },
  { format: 'html' },
  { fidelity: 'unknown' },
  { unsupported_blocks: [1] },
])('rejects invalid or wrong-record responses %j', async (override) => {
  const { micro } = setup({ ...snapshot, ...override });
  await expect(micro.documents.content.get(ID)).rejects.toBeInstanceOf(InvalidResponseError);
});
test('does not expose internal editor state', async () => {
  const { micro } = setup({ ...snapshot, documentState: 'encoded', documentName: 'internal' });
  expect(await micro.documents.content.get(ID)).toEqual(snapshot);
});
test('invalid target, format and scope overrides fail before transport', async () => {
  const { micro, calls } = setup();
  await expect(micro.documents.content.get('../other')).rejects.toBeInstanceOf(TypeError);
  await expect(micro.documents.content.get(ID, { format: 'html' } as never)).rejects.toBeInstanceOf(
    TypeError,
  );
  await expect(micro.documents.content.get(ID, { teamId: 'other' } as never)).rejects.toBeInstanceOf(
    TypeError,
  );
  expect(calls).toHaveLength(0);
});
test.each([403, 404, 503])('preserves HTTP %s instead of fabricating empty content', async (status) => {
  const { micro } = setup({ error: { message: 'Unavailable' } }, status);
  await expect(micro.tasks.description.get(ID)).rejects.toBeInstanceOf(APIError);
});
