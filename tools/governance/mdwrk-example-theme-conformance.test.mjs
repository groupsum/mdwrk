import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const EXAMPLE_CONFORMANCE_SURFACES = [
  {
    packageName: '@mdwrk/example-renderer-basic',
    manifestPath: 'examples/renderer-basic/package.json',
    testPath: 'examples/renderer-basic/tests/theme-conformance.test.tsx',
  },
  {
    packageName: '@mdwrk/example-editor-demo',
    manifestPath: 'examples/editor-demo/package.json',
    testPath: 'examples/editor-demo/tests/theme-conformance.test.tsx',
  },
  {
    packageName: '@mdwrk/example-previewer-demo',
    manifestPath: 'examples/previewer-demo/package.json',
    testPath: 'examples/previewer-demo/tests/theme-conformance.test.tsx',
  },
  {
    packageName: '@mdwrk/example-edit-in-renderer-demo',
    manifestPath: 'examples/edit-in-renderer-demo/package.json',
    testPath: 'examples/edit-in-renderer-demo/tests/theme-conformance.test.tsx',
  },
  {
    packageName: '@mdwrk/example-ui-tokens-demo',
    manifestPath: 'examples/ui-tokens-demo/package.json',
    testPath: 'examples/ui-tokens-demo/tests/theme-conformance.test.tsx',
  },
];

test('T0 wires theme-conformance package tests for every governed markdown demo', () => {
  for (const surface of EXAMPLE_CONFORMANCE_SURFACES) {
    const manifestAbsolutePath = path.join(repoRoot, surface.manifestPath);
    const testAbsolutePath = path.join(repoRoot, surface.testPath);

    assert.equal(fs.existsSync(manifestAbsolutePath), true, `Missing manifest ${surface.manifestPath}`);
    assert.equal(fs.existsSync(testAbsolutePath), true, `Missing test ${surface.testPath}`);

    const manifest = JSON.parse(fs.readFileSync(manifestAbsolutePath, 'utf8'));
    assert.equal(typeof manifest.scripts?.test, 'string', `${surface.packageName} must expose a test script`);
    assert.match(
      manifest.scripts.test,
      /theme-conformance\.test\.tsx/,
      `${surface.packageName} test script must run the theme conformance test`,
    );
  }
});

test('T1 passes the governed markdown demo theme-conformance lane', () => {
  const result = spawnSync(npmBin, ['run', 'test:examples'], {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

  assert.equal(result.status, 0, [
    result.stdout?.trim(),
    result.stderr?.trim(),
  ].filter(Boolean).join('\n'));
});
