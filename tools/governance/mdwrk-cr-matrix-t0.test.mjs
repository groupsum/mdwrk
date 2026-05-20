import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const registry = JSON.parse(readFileSync('.ssot/registry.json', 'utf8'));

const expected = [
  ['001', 'root-governance', 'CR-001'],
  ['002', 'theme-contract', 'CR-002'],
  ['003', 'ui-tokens', 'CR-003'],
  ['004', 'icons', 'CR-004'],
  ['005', 'i18n', 'CR-005'],
  ['006', 'shared-testing-helpers', 'CR-006'],
  ['007', 'extension-manifest-contract', 'CR-007'],
  ['008', 'extension-host-contract', 'CR-008'],
  ['009', 'markdown-editor-core', 'CR-009'],
  ['010', 'markdown-editor-react', 'CR-010'],
  ['011', 'edit-in-renderer-react', 'CR-011'],
  ['012', 'markdown-renderer-core', 'CR-012'],
  ['013', 'markdown-renderer-react', 'CR-013'],
  ['014', 'structured-data-package', 'CR-014'],
  ['015', 'extension-runtime', 'CR-015'],
  ['016', 'extension-manager', 'CR-016'],
  ['017', 'workspace-files-extension', 'CR-017'],
  ['018', 'git-ops-extension', 'CR-018'],
  ['019', 'gemini-agent-extension', 'CR-019'],
  ['020', 'theme-studio-extension', 'CR-020'],
  ['021', 'language-pack-studio-extension', 'CR-021'],
  ['022', 'catalog-hello-fixture', 'CR-022'],
  ['023', 'lander-theme-contract-dependency-support', 'CR-028'],
  ['024', 'lander-react-renderer-editor-dependency-support', 'CR-029'],
  ['025', 'lander-markdown-adapter-renderer-dependency-support', 'CR-030'],
  ['026', 'structured-data-validation-slice', 'CR-035'],
  ['027', 'core-package-docs', 'CR-036'],
  ['028', 'package-cr-order-governance', 'bnd:mdwrk-package-cr-order-next'],
  ['029', 'editor-command-focus-boundary', 'bnd:mdwrk-editor-command-focus-next'],
  ['030', 'extension-contribution-contracts-boundary', 'bnd:mdwrk-extension-contributions-next'],
  ['031', 'structured-data-lander-suite-dependency', 'bnd:mdwrk-lander-package-suite-next'],
  ['032', 'core-docs-governance', 'bnd:mdwrk-docs-governance-next'],
  ['033', 'repo-local-ssot-rows', 'Cross-package SSOT rows'],
  ['034', 'package-versioning', 'Package versioning'],
  ['035', 'package-validation', 'Package validation'],
  ['036', 'governance-ci', 'Governance CI'],
  ['037', 'package-visual-proof', 'Screenshot evidence'],
  ['038', 'scoped-codex-agents', 'Scoped AGENTS.md'],
  ['039', 'top-level-hygiene', 'Top-level hygiene'],
];

const byId = (section) => new Map((registry[section] ?? []).map((row) => [row.id, row]));
const features = byId('features');
const tests = byId('tests');
const claims = byId('claims');
const evidence = byId('evidence');
const failures = [];

for (const [number, slug, source] of expected) {
  const featureId = `feat:mdwrk.cr-${number}.${slug}`;
  const testId = `tst:mdwrk.cr-${number}.t0`;
  const claimId = `clm:mdwrk.cr-${number}.t0`;
  const evidenceId = `evd:mdwrk.cr-${number}.t0`;
  const feature = features.get(featureId);
  const test = tests.get(testId);
  const claim = claims.get(claimId);
  const rowEvidence = evidence.get(evidenceId);

  if (!feature) failures.push(`${featureId} is missing for ${source}`);
  if (!test) failures.push(`${testId} is missing for ${source}`);
  if (!claim) failures.push(`${claimId} is missing for ${source}`);
  if (!rowEvidence) failures.push(`${evidenceId} is missing for ${source}`);

  if (feature && !feature.spec_ids?.includes('spc:2095')) failures.push(`${featureId} must link spc:2095`);
  if (feature && feature.plan?.horizon !== 'backlog') failures.push(`${featureId} must remain backlog until implemented`);
  if (feature && feature.implementation_status !== 'absent') failures.push(`${featureId} must remain absent until implemented`);
  if (feature && !feature.test_ids?.includes(testId)) failures.push(`${featureId} must link ${testId}`);
  if (feature && !feature.claim_ids?.includes(claimId)) failures.push(`${featureId} must link ${claimId}`);

  if (test && !test.feature_ids?.includes(featureId)) failures.push(`${testId} must link ${featureId}`);
  if (test && !test.claim_ids?.includes(claimId)) failures.push(`${testId} must link ${claimId}`);
  if (test && !test.evidence_ids?.includes(evidenceId)) failures.push(`${testId} must link ${evidenceId}`);
  if (test && test.execution?.mode !== 'command') failures.push(`${testId} must define command execution`);
  if (test && !(test.execution?.argv ?? []).includes('tools/governance/mdwrk-cr-matrix-t0.test.mjs')) {
    failures.push(`${testId} execution must run the CR matrix T0 test file`);
  }

  if (claim && claim.tier !== 'T0') failures.push(`${claimId} must be a T0 claim`);
  if (claim && !claim.feature_ids?.includes(featureId)) failures.push(`${claimId} must link ${featureId}`);
  if (claim && !claim.test_ids?.includes(testId)) failures.push(`${claimId} must link ${testId}`);
  if (claim && !claim.evidence_ids?.includes(evidenceId)) failures.push(`${claimId} must link ${evidenceId}`);

  if (rowEvidence && rowEvidence.tier !== 'T0') failures.push(`${evidenceId} must be T0 evidence`);
  if (rowEvidence && !rowEvidence.claim_ids?.includes(claimId)) failures.push(`${evidenceId} must link ${claimId}`);
  if (rowEvidence && !rowEvidence.test_ids?.includes(testId)) failures.push(`${evidenceId} must link ${testId}`);
  if (rowEvidence && !existsSync(join('.', rowEvidence.path))) failures.push(`${evidenceId} path does not exist: ${rowEvidence.path}`);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`validated ${expected.length} mdwrk CR matrix T0 rows`);
