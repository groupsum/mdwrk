import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPackagePublishGraph, isPublishGraphTarget } from './build-publish-graph.mjs';

const workspace = (name, relativeDir, packageJson = {}) => ({
  packageJson: {
    name,
    version: '1.0.0',
    scripts: { build: 'tsc' },
    ...packageJson,
  },
  relativeDir,
  category: relativeDir.startsWith('examples/') ? 'example' : 'shared',
  publishable: packageJson.private !== true,
});

test('orders publish packages with workspace dependencies before dependents', () => {
  const graph = buildPackagePublishGraph([
    workspace('@mdwrk/app', 'packages/shared/app', {
      dependencies: { '@mdwrk/core': '^1.0.0' },
    }),
    workspace('@mdwrk/core', 'packages/shared/core'),
    workspace('@mdwrk/example', 'examples/example-renderer-basic'),
  ]);

  assert.equal(graph.ok, true);
  assert.deepEqual(graph.order, ['@mdwrk/core', '@mdwrk/app']);
  assert.deepEqual(graph.edges, [{ from: '@mdwrk/core', to: '@mdwrk/app', kind: 'dependencies' }]);
});

test('detects cycles and missing internal package dependencies', () => {
  const graph = buildPackagePublishGraph([
    workspace('@mdwrk/a', 'packages/shared/a', {
      dependencies: { '@mdwrk/b': '^1.0.0', '@mdwrk/missing': 'workspace:^1.0.0' },
    }),
    workspace('@mdwrk/b', 'packages/shared/b', {
      dependencies: { '@mdwrk/a': '^1.0.0' },
    }),
  ]);

  assert.equal(graph.ok, false);
  assert.deepEqual(graph.cycleNodes, ['@mdwrk/a', '@mdwrk/b']);
  assert.deepEqual(graph.missingInternalDependencies, [
    { packageName: '@mdwrk/a', dependencyName: '@mdwrk/missing', dependencyKind: 'dependencies', dependencySpec: 'workspace:^1.0.0' },
  ]);
});

test('default publish target predicate excludes examples, private packages, mdwrkcom, and mdwrkcom content pack', () => {
  assert.equal(isPublishGraphTarget(workspace('@mdwrk/shared', 'packages/shared/shared')), true);
  assert.equal(isPublishGraphTarget(workspace('@mdwrk/example', 'examples/example-renderer-basic')), false);
  assert.equal(isPublishGraphTarget(workspace('@mdwrk/private', 'packages/shared/private', { private: true })), false);
  assert.equal(isPublishGraphTarget(workspace('@mdwrk/mdwrkcom', 'apps/mdwrkcom')), false);
  assert.equal(isPublishGraphTarget(workspace('@mdwrk/mdwrkcom-content-pack', 'packages/content/mdwrkcom-content-pack')), false);
});
