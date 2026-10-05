// Run after pnpm build. Installs only the local tarball into a disposable directory.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'micro-simple-package-'));
const packed = JSON.parse(
  execFileSync('npm', ['pack', './dist', '--ignore-scripts', '--json', '--pack-destination', dir], {
    encoding: 'utf8',
  }),
);
execFileSync(
  'npm',
  [
    'install',
    '--prefix',
    dir,
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    '--offline',
    join(dir, packed[0].filename),
  ],
  { stdio: 'pipe' },
);
for (const mode of ['commonjs', 'module']) {
  const imports =
    mode === 'module' ?
      `import Simple from '@micro-so/sdk/simple'; import LibSimple from '@micro-so/sdk/lib/simple'; import Raw from '@micro-so/sdk';`
    : `const Simple = require('@micro-so/sdk/simple').default; const LibSimple = require('@micro-so/sdk/lib/simple').default; const Raw = require('@micro-so/sdk');`;
  execFileSync(
    process.execPath,
    [
      '--input-type=' + mode,
      '-e',
      imports +
        `
    const assert = ${
      mode === 'module' ? "(await import('node:assert/strict')).default" : "require('node:assert/strict')"
    };
    const micro = new Simple({ apiKey: 'test', teamID: 'team', fetch: async () => new Response(JSON.stringify({
      id: 'identity', properties: { full_name: 'Prince', first_name: null, middle_name: null,
        last_name: null, title: null, email_addresses: [], companies: [] }
    }), { headers: { 'Content-Type': 'application/json' } }) });
    assert.equal(LibSimple, Simple);
    assert.ok(micro.raw instanceof ${mode === 'module' ? 'Raw' : 'Raw.Micro'});
    assert.equal(typeof new Raw({ apiKey: 'test', teamID: 'team' }).prism.objects.contacts.get, 'function');
    assert.equal(typeof micro.raw.prism.objects.contacts.get, 'function');
    assert.equal(typeof micro.raw.prism.objects.identities.images.requestUpload, 'function');
    assert.equal(typeof new Raw({ apiKey: 'test' }).feed.updates.create, 'function');
    assert.equal(typeof micro.companies.list, 'function');
    assert.equal(typeof micro.fields.list, 'function');
    assert.equal(typeof micro.fields.validate, 'function');
    assert.equal(typeof micro.documents.content.get, 'function');
    assert.equal(typeof micro.tasks.description.get, 'function');
    assert.equal(typeof micro.fields.options.create, 'function');
    assert.equal(typeof micro.lists.templates.list, 'function');
    assert.equal(typeof micro.lists.records.iterate, 'function');
    assert.equal(typeof micro.views.create, 'function');
    assert.equal(typeof micro.views.records.pin, 'function');
    micro.people.get('identity').then(person => assert.equal(person.full_name, 'Prince'));
  `,
    ],
    { cwd: dir, stdio: 'inherit' },
  );
}
console.log(
  'Packed SDK: ESM and CommonJS imports, original client, simple resource exports, and people read passed.',
);
const typingFixture = `
import Raw, { type ImageScope, type ImageMimeType } from '@micro-so/sdk';
import Simple, { type SimpleSource } from '@micro-so/sdk/simple';
import LibSimple from '@micro-so/sdk/lib/simple';
const personal = new Raw({ apiKey: 'fixture' });
const update: Raw.UpdateCreateParams = { author: { name: 'Fixture' }, message: 'First\\n\\nSecond' };
personal.feed.updates.create(update);
personal.webhooks.list({ teamId: 'fixture' });
const simple = new Simple({ apiKey: 'fixture', teamID: 'fixture' });
const legacy = new LibSimple({ apiKey: 'fixture', teamID: 'fixture' });
const source: SimpleSource = { record_type: 'companies', scope: { type: 'workspace' } };
simple.fields.list({ source });
legacy.fields.validate({ source, operation: 'create', properties: {} });
const scope: ImageScope = { teamId: 'fixture' };
const mime: ImageMimeType = 'image/png';
personal.prism.objects.identities.images.requestUpload('fixture', { ...scope, mime_type: mime });
// @ts-expect-error The Simple client still requires a workspace.
new Simple({ apiKey: 'fixture' });
`;
for (const [extension, module, resolution] of [
  ['ts', 'commonjs', 'node'],
  ['cts', 'nodenext', 'nodenext'],
  ['mts', 'nodenext', 'nodenext'],
]) {
  const filename = join(dir, 'consumer.' + extension);
  writeFileSync(filename, typingFixture);
  execFileSync(
    process.execPath,
    [
      join(process.cwd(), 'node_modules/typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--target',
      'es2022',
      '--module',
      module,
      '--moduleResolution',
      resolution,
      filename,
    ],
    { cwd: dir, stdio: 'inherit' },
  );
}
console.log('Packed SDK: legacy Node and NodeNext CJS/ESM consumer typings passed.');
console.log(`Disposable install: ${dir}`);
