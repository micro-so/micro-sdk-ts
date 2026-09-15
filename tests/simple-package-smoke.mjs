// Run after pnpm build. Installs only the local tarball into a disposable directory.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

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
      created: false, record: { id: 'identity' }
    }), { headers: { 'Content-Type': 'application/json' } }) });
    assert.ok(micro.raw instanceof ${mode === 'module' ? 'Raw' : 'Raw.Micro'});
    assert.equal(typeof new Raw({ apiKey: 'test', teamID: 'team' }).prism.objects.contacts.get, 'function');
    assert.equal(typeof micro.raw.prism.objects.contacts.get, 'function');
    assert.equal(typeof micro.companies.list, 'function');
    assert.equal(typeof micro.companies.findOrCreate, 'function');
    assert.equal(typeof micro.people.findOrCreate, 'function');
    const calls = [];
    const consumer = new Simple({ apiKey: 'test', teamID: 'team', fetch: async (url, init) => {
      calls.push({ url: String(url), init });
      if (String(url).endsWith('/identity/find-or-create')) {
        return new Response(JSON.stringify({ created: false, record: { id: 'identity' } }),
          { headers: { 'Content-Type': 'application/json' } });
      }
      if (String(url).endsWith('/organization/find-or-create')) {
        return new Response(JSON.stringify({ created: true, record: {
          id: 'organization', default: { name: 'Acme', primary_domain: 'acme.com' }
        } }), { status: 201, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ id: 'identity', properties: {
        full_name: 'Prince', first_name: null, middle_name: null, last_name: null, title: null,
        email_addresses: [], companies: []
      } }), { headers: { 'Content-Type': 'application/json' } });
    } });
    (async () => {
      const found = await consumer.people.findOrCreate(
        { email_address: 'prince@example.com' },
        { full_name: 'Ignored' },
      );
      assert.equal(found.created, false);
      assert.equal(found.record.full_name, 'Prince');
      const created = await consumer.companies.findOrCreate(
        { primary_domain: 'acme.com' },
        { name: 'Acme' },
      );
      assert.equal(created.created, true);
      assert.equal(created.record.primary_domain, 'acme.com');
      const personRequest = calls.find(call => call.url.endsWith('/identity/find-or-create'));
      assert.deepEqual(JSON.parse(personRequest.init.body), {
        match: { email_address: 'prince@example.com' }, defaults: { full_name: 'Ignored' }
      });
      assert.equal(calls.filter(call => call.url.endsWith('/identity/find-or-create')).length, 1);
      assert.equal(calls.filter(call => call.init.method === 'GET').length, 1);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `,
    ],
    { cwd: dir, stdio: 'inherit' },
  );
}

for (const extension of ['mts', 'cts']) {
  writeFileSync(
    join(dir, `consumer.${extension}`),
    `import Simple, {
      type Company, type CompanyDefaults, type CompanyMatch,
      type FindOrCreateResult,
      type Person, type PersonDefaults, type PersonMatch,
    } from '@micro-so/sdk/lib/simple';
    const micro = new Simple({ apiKey: 'test', teamID: 'team' });
    const personMatch: PersonMatch = { email_address: 'sam@example.com' };
    const personDefaults: PersonDefaults = { full_name: 'Sam' };
    const person: Promise<FindOrCreateResult<Person>> =
      micro.people.findOrCreate(personMatch, personDefaults);
    const companyMatch: CompanyMatch = { primary_domain: 'example.com' };
    const companyDefaults: CompanyDefaults = { name: 'Example' };
    const company: Promise<FindOrCreateResult<Company>> =
      micro.companies.findOrCreate(companyMatch, companyDefaults);
    void person; void company;`,
  );
}
writeFileSync(
  join(dir, 'tsconfig.json'),
  JSON.stringify({
    compilerOptions: {
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      noEmit: true,
      strict: true,
      skipLibCheck: false,
    },
    include: ['consumer.mts', 'consumer.cts'],
  }),
);
execFileSync(
  process.execPath,
  [resolve('node_modules/typescript/bin/tsc'), '-p', join(dir, 'tsconfig.json')],
  {
    cwd: dir,
    stdio: 'inherit',
  },
);

console.log('Packed SDK: ESM/CommonJS runtime calls and exported find-or-create types passed.');
console.log(`Disposable install: ${dir}`);
