import assert from 'node:assert/strict';
import test from 'node:test';
import { validateMarkdownCommandExportScreenshotManifest } from './validate-markdown-command-export-screenshot-manifest.mjs';

test('markdown command/export screenshot manifest covers the governed example matrix', () => {
  const result = validateMarkdownCommandExportScreenshotManifest();

  assert.equal(result.passed, true, result.failures.join('\n'));
  assert.equal(result.details.expectedCount, 24);
  assert.equal(result.details.artifactCount, 24);
  assert.deepEqual(result.details.themes, ['default-light', 'default-dark', 'paper']);
});
