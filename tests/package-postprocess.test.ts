import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

test.each([false, true])('Simple exports require a built Simple client (present: %s)', (hasSimple) => {
  const directory = mkdtempSync(join(tmpdir(), 'micro-postprocess-'));
  try {
    const dist = join(directory, 'dist');
    mkdirSync(join(dist, 'lib'), { recursive: true });
    writeFileSync(
      join(dist, 'package.json'),
      JSON.stringify({ name: hasSimple ? '@micro-so/sdk' : '@micro-so/mcp' }),
    );
    if (hasSimple) {
      writeFileSync(join(dist, 'lib/simple.js'), '');
      writeFileSync(join(dist, 'lib/simple.mjs'), '');
    }
    execFileSync(process.execPath, [resolve('scripts/utils/postprocess-files.cjs')], {
      cwd: directory,
      env: { ...process.env, DIST_PATH: dist },
    });
    const exports = JSON.parse(readFileSync(join(dist, 'package.json'), 'utf8')).exports;
    if (hasSimple) {
      expect(exports['./simple']).toEqual({ import: './lib/simple.mjs', require: './lib/simple.js' });
      expect(readFileSync(join(dist, 'simple.d.ts'), 'utf8')).toContain('./lib/simple.js');
    } else {
      expect(exports['./simple']).toBeUndefined();
      expect(existsSync(join(dist, 'simple.d.ts'))).toBe(false);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
