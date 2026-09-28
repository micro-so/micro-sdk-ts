// Creates a list, field/options and saved view. Run only in a disposable workspace.
// Run: npm run tsn -- examples/simple-core.ts
import assert from 'node:assert/strict';
import Micro from '../src/lib/simple';

async function main() {
  const { MICRO_API_KEY, MICRO_TEAM_ID, MICRO_BASE_URL } = process.env;
  if (!MICRO_API_KEY || !MICRO_TEAM_ID)
    throw new Error('Set MICRO_API_KEY and MICRO_TEAM_ID for a disposable workspace.');
  const micro = new Micro({
    apiKey: MICRO_API_KEY,
    teamID: MICRO_TEAM_ID,
    ...(MICRO_BASE_URL ? { baseURL: MICRO_BASE_URL } : {}),
  });

  const templates = await micro.lists.templates.list();
  const template = templates.data.find(
    (item) => item.id === 'custom' && item.supported_record_types.includes('companies'),
  );
  if (!template) throw new Error('The API does not advertise a custom company list template.');
  const list = await micro.lists.create({
    template_id: template.id,
    record_type: 'companies',
    name: `SDK acceptance ${new Date().toISOString()}`,
  });
  console.log({ list_id: list.id });
  assert.equal((await micro.lists.get(list.id)).record_type, 'companies');
  assert((await micro.lists.list()).data.some((item) => item.id === list.id));

  const source = { record_type: 'companies', scope: { type: 'list', list_id: list.id } } as const;
  const field = await micro.fields.create({
    source,
    name: 'Relationship tier',
    type: 'select',
    options: [{ label: 'Partner' }, { label: 'Prospect' }],
  });
  console.log({ field_id: field.id });
  const discovered = await micro.fields.get(field.id, { source });
  const partner = discovered.options?.find((option) => option.label === 'Partner');
  assert(partner, 'The created option must be discoverable.');
  assert.equal(discovered.slug, field.slug);
  assert.deepEqual(discovered.source, source);

  // Use returned slugs and option IDs instead of guessing API property names.
  const validation = await micro.fields.validate({
    source,
    operation: 'update',
    properties: { [discovered.slug]: partner.id },
  });
  assert(validation.valid, JSON.stringify(validation.errors));

  const view = await micro.views.create({
    source,
    name: 'Partners',
    layout: 'table',
    columns: [discovered.slug],
  });
  console.log({ view_id: view.id });
  const retrieved = await micro.views.get(view.id, { source });
  assert.equal(retrieved.name, 'Partners');
  await micro.views.update(view.id, { source, name: 'Partner directory' });
  assert.equal((await micro.views.get(view.id, { source })).name, 'Partner directory');

  const memberships = await micro.lists.records.list(list.id, { limit: 25 });
  assert.equal(memberships.data.length, 0, 'A fresh custom list should have no members.');
  console.log('Core workflow passed. Inspect the list, field options and saved view in Micro.');
  // Leave these artifacts for UI inspection. List deletion and membership mutation
  // are not available in the simple client; no cleanup or mutation retry is implied.
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
