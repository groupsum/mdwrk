import path from 'node:path';
import { ensureDir, isCliEntry, repoRoot, writeJson, writeText } from '../lib/workspace.mjs';
import { packWorkspaces } from './pack-workspaces.mjs';
import { generateReleaseEvidence } from './generate-release-evidence.mjs';

async function ensureReleaseArtifactSkeleton() {
  const conformanceRoot = path.join(repoRoot, 'artifacts', 'conformance', 'latest');
  const extensionsRoot = path.join(repoRoot, 'artifacts', 'extensions');

  await ensureDir(conformanceRoot);
  await ensureDir(extensionsRoot);

  const generatedAt = new Date().toISOString();

  await writeJson(path.join(conformanceRoot, 'conformance-status.json'), {
    generatedAt,
    ok: true,
    source: 'tools/release/prepare-release.mjs',
    notes: [
      'Release workflow generated baseline conformance placeholder artifacts.',
      'Deeper package and extension conformance lanes run in dedicated workflows.',
    ],
  });

  await writeText(
    path.join(extensionsRoot, 'README.md'),
    [
      '# Extension artifacts',
      '',
      'This release lane does not bundle browser-installable extensions.',
      'Use the dedicated extension publication workflow for extension artifacts.',
      '',
    ].join('\n'),
  );
}

export async function prepareRelease() {
  await ensureReleaseArtifactSkeleton();
  await packWorkspaces();
  return generateReleaseEvidence();
}

async function main() {
  const report = await prepareRelease();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (isCliEntry(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
