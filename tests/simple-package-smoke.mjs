// Run after pnpm build. Installs only the local tarball into a disposable directory.
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
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
      `import Simple from '@micro-so/sdk/lib/simple'; import Raw from '@micro-so/sdk';`
    : `const Simple = require('@micro-so/sdk/lib/simple').default; const Raw = require('@micro-so/sdk');`;
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
    assert.ok(micro.raw instanceof ${mode === 'module' ? 'Raw' : 'Raw.Micro'});
    assert.equal(typeof new Raw({ apiKey: 'test', teamID: 'team' }).prism.objects.contacts.get, 'function');
    assert.equal(typeof micro.raw.prism.objects.contacts.get, 'function');
    assert.equal(typeof micro.companies.list, 'function');
    assert.equal(typeof micro.fields.list, 'function');
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
console.log(`Disposable install: ${dir}`);
