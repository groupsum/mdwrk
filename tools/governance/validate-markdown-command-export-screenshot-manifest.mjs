import fs from 'node:fs';
import path from 'node:path';
import { isCliEntry, repoRoot } from '../lib/workspace.mjs';

const ARTIFACT_DIR = 'docs/evidence/markdown-command-export-expansion';
const MANIFEST_PATH = `${ARTIFACT_DIR}/manifest.json`;
const THEMES = ['default-light', 'default-dark', 'paper'];
const EXPECTED_CAPTURES = [
  { packageName: '@mdwrk/example-editor-demo', view: 'editor-surface', mode: 'editing', viewportBand: 'wide' },
  { packageName: '@mdwrk/example-editor-demo', view: 'editor-surface', mode: 'editing', viewportBand: 'portrait' },
  { packageName: '@mdwrk/example-editor-demo', view: 'editor-surface', mode: 'command-palette', viewportBand: 'wide' },
  { packageName: '@mdwrk/example-editor-demo', view: 'editor-surface', mode: 'command-palette', viewportBand: 'portrait' },
  { packageName: '@mdwrk/example-previewer-demo', view: 'preview-surface', mode: 'preview', viewportBand: 'wide' },
  { packageName: '@mdwrk/example-previewer-demo', view: 'preview-surface', mode: 'preview', viewportBand: 'portrait' },
  { packageName: '@mdwrk/example-edit-in-renderer-demo', view: 'edit-in-renderer-surface', mode: 'editing-preview', viewportBand: 'wide' },
  { packageName: '@mdwrk/example-edit-in-renderer-demo', view: 'edit-in-renderer-surface', mode: 'editing-preview', viewportBand: 'portrait' },
];

function toRelative(filePath) {
  return filePath.replaceAll('\\', '/');
}

export function validateMarkdownCommandExportScreenshotManifest(options = {}) {
  const root = options.root ?? repoRoot;
  const manifestAbsolutePath = path.join(root, MANIFEST_PATH);
  const failures = [];

  if (!fs.existsSync(manifestAbsolutePath)) {
    return {
      passed: false,
      failures: [`Missing manifest ${MANIFEST_PATH}.`],
      details: { manifestPath: MANIFEST_PATH, artifactCount: 0, expectedCount: THEMES.length * EXPECTED_CAPTURES.length },
    };
  }

  const manifest = JSON.parse(fs.readFileSync(manifestAbsolutePath, 'utf8'));
  const entries = Array.isArray(manifest.entries) ? manifest.entries : [];
  const expectedCount = THEMES.length * EXPECTED_CAPTURES.length;

  if (entries.length !== expectedCount) {
    failures.push(`Expected ${expectedCount} screenshot entries but found ${entries.length}.`);
  }

  const seenKeys = new Set();
  for (const entry of entries) {
    const key = [entry.packageName, entry.theme, entry.view, entry.mode, entry.viewportBand].join('::');
    if (seenKeys.has(key)) {
      failures.push(`Duplicate manifest entry ${key}.`);
    }
    seenKeys.add(key);

    if (!THEMES.includes(entry.theme)) {
      failures.push(`Unexpected theme ${entry.theme}.`);
    }
    if (entry.packageOwner !== 'examples') {
      failures.push(`Unexpected package owner ${entry.packageOwner} for ${key}.`);
    }
    if (!entry.artifactPath) {
      failures.push(`Missing artifact path for ${key}.`);
      continue;
    }
    const artifactAbsolutePath = path.join(root, entry.artifactPath);
    if (!fs.existsSync(artifactAbsolutePath)) {
      failures.push(`Missing artifact file ${entry.artifactPath}.`);
      continue;
    }
    const stat = fs.statSync(artifactAbsolutePath);
    if (stat.size <= 0) {
      failures.push(`Artifact file is empty: ${entry.artifactPath}.`);
    }
    if (toRelative(entry.artifactPath) !== toRelative(path.relative(root, artifactAbsolutePath))) {
      failures.push(`Artifact path is not repo-relative for ${key}: ${entry.artifactPath}.`);
    }
  }

  for (const theme of THEMES) {
    for (const capture of EXPECTED_CAPTURES) {
      const key = [capture.packageName, theme, capture.view, capture.mode, capture.viewportBand].join('::');
      if (!seenKeys.has(key)) {
        failures.push(`Missing manifest entry ${key}.`);
      }
    }
  }

  return {
    passed: failures.length === 0,
    failures,
    details: {
      manifestPath: MANIFEST_PATH,
      artifactCount: entries.length,
      expectedCount,
      themes: THEMES,
      capturesPerTheme: EXPECTED_CAPTURES.length,
    },
  };
}

if (isCliEntry(import.meta.url)) {
  const result = validateMarkdownCommandExportScreenshotManifest();
  if (process.argv.includes('--json')) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else if (result.passed) {
    console.log(`Markdown command/export screenshot manifest passed: ${result.details.artifactCount}/${result.details.expectedCount}.`);
  } else {
    for (const failure of result.failures) {
      console.error(failure);
    }
    process.exit(1);
  }
}
