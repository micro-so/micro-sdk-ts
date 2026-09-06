// Install exactly the released artifact, outside this checkout, without npm credentials.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const [name, version, tarball] = process.argv.slice(2);
if (!['@micro-so/sdk', '@micro-so/mcp'].includes(name) || !version) {
  throw new Error('Usage: node scripts/verify-published-package.mjs <package> <version>');
}
const directory = mkdtempSync(path.join(tmpdir(), 'micro-release-'));
try {
  writeFileSync(path.join(directory, 'package.json'), '{"private":true}');
  const npmrc = path.join(directory, '.npmrc');
  writeFileSync(npmrc, 'registry=https://registry.npmjs.org/\n');
  const globalNpmrc = path.join(directory, 'global.npmrc');
  writeFileSync(globalNpmrc, '');
  const env = {
    PATH: process.env.PATH,
    HOME: directory,
    NPM_CONFIG_USERCONFIG: npmrc,
    NPM_CONFIG_GLOBALCONFIG: globalNpmrc,
  };
  execFileSync(
    'npm',
    ['install', '--prefix', directory, '--no-audit', '--no-fund', tarball ?? `${name}@${version}`],
    {
      cwd: directory,
      env,
      stdio: 'inherit',
      timeout: 180_000,
    },
  );
  const require = createRequire(path.join(directory, 'package.json'));
  if (name === '@micro-so/sdk') {
    const Micro = require(name).default;
    let calls = 0;
    const client = new Micro({
      apiKey: 'fixture',
      teamID: 'fixture',
      fetch: async () => {
        calls++;
        return new Response('{}', { headers: { 'content-type': 'application/json' } });
      },
    });
    await client.prism.objects.documents.query({ query: { select: ['id'] } });
    if (calls !== 1) throw new Error('SDK fixture query did not reach transport');
  } else {
    const mcpRequire = createRequire(require.resolve(name));
    const { Client } = mcpRequire('@modelcontextprotocol/sdk/client/index.js');
    const { StdioClientTransport } = mcpRequire('@modelcontextprotocol/sdk/client/stdio.js');
    const client = new Client({ name: 'release-verification', version: '1.0.0' });
    const transport = new StdioClientTransport({
      command: process.execPath,
      args: [require.resolve(name), '--code-execution-mode=local', '--docs-search-mode=local'],
      env: { PATH: process.env.PATH, MICRO_API_KEY: 'fixture', MICRO_TEAM_ID: 'fixture' },
      stderr: 'inherit',
    });
    try {
      await client.connect(transport, { timeout: 30_000 });
      const { tools } = await client.listTools({}, { timeout: 30_000 });
      if (
        !tools.some((tool) => tool.name === 'search_docs') ||
        !tools.some((tool) => tool.name === 'execute')
      ) {
        throw new Error(`Missing expected MCP tools: ${tools.map((tool) => tool.name).join(', ')}`);
      }
    } finally {
      await client.close();
    }
  }
  console.log(`Verified ${tarball ? 'packed' : 'public'} artifact ${name}@${version}`);
} finally {
  rmSync(directory, { recursive: true, force: true });
}
