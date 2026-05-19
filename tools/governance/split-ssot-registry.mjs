import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const workspaceRoot = resolve('..');
const sourceRepo = join(workspaceRoot, 'markdown_workspace');
const sourceRegistryPath = join(sourceRepo, '.ssot', 'registry.json');
const coordinatorRepo = join(workspaceRoot, 'mdwrk');
const ledgerJsonPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-migration-ledger.json');
const ledgerMarkdownPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-migration-ledger.md');

const targets = {
  core: {
    repo: 'mdwrk',
    root: join(workspaceRoot, 'mdwrk'),
  },
  studio: {
    repo: 'mdwrk-studio',
    root: join(workspaceRoot, 'mdwrk-studio'),
  },
  pages: {
    repo: 'mdwrk-pages',
    root: join(workspaceRoot, 'mdwrk-pages'),
  },
  'mdwrk-com': {
    repo: 'mdwrk-com',
    root: join(workspaceRoot, 'mdwrk-com'),
  },
};

const entityFamilies = [
  'adrs',
  'specs',
  'features',
  'claims',
  'tests',
  'evidence',
  'boundaries',
  'profiles',
  'releases',
  'issues',
  'risks',
];

const ownerRules = [
  [
    'mdwrk-com',
    /mdwrkcom|mdwrk-com|apps\/mdwrkcom|data\/markdown|content-pack-driven|product-content-pack|thin-product-host|public-lander-production|seo|aeo|aieo|discoverability|crawler|llm|schemaorg|schema\.org|json-ld|locale|hreflang|sitemap|cache-header|critical-css-profile|article|lander-seo-mdwrkcom/,
  ],
  [
    'pages',
    /\blander\b|page-template|page template|structured-data|structured data|packages\/lander|packages\/content\/page-template|portable-lander|static-lander|lander-react|lander-page|domain-bundle|preset|pagespec|template|content-pack-driven-lander|wcag|contrast/,
  ],
  [
    'studio',
    /apps\/client|apps\/desktop|desktop|client|pwa|browser|shell|oidc|git|toast|workspace|tab|action-rail|mobile|android|native|electron|chassis|uix|zoom|i18n|language-pack|settings|project loading|file import|import folder|extension-manager surface|gemini-agent|theme-studio|catalog-hello|extension continuous|extension intent|component class|toolbar|editor command|focus/,
  ],
  [
    'core',
    /packages\/(contracts|shared|renderer|editor|extensions|examples)|markdown-renderer|markdown-editor|extension-|theme-contract|ui-token|icons|commonmark|gfm|optional profile|custom parser|custom previewer|markdown profile|runtime manifest|renderer\/editor|extension distribution|release conformance|package-owned|package change-request|package cr|docs-governance|tools\/governance|testing|i18n|markdown-boundary/,
  ],
];

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function canonicalStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => canonicalStringify(item)).join(',')}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalStringify(value[key])}`)
    .join(',')}}`;
}

function writeJson(path, value, options = {}) {
  const suffix = options.trailingNewline === true ? '\n' : '';
  writeFileSync(path, `${canonicalStringify(value)}${suffix}`, 'utf8');
}

function entityText(entity) {
  return [
    entity.id,
    entity.title,
    entity.description,
    entity.path,
    entity.slug,
    ...(entity.feature_ids ?? []),
    ...(entity.spec_ids ?? []),
    ...(entity.claim_ids ?? []),
    ...(entity.evidence_ids ?? []),
    ...(entity.test_ids ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .replaceAll('\\', '/')
    .toLowerCase();
}

function classify(entity) {
  if (entity?.origin === 'ssot-origin' || /^(adr|spc):06/.test(entity?.id ?? '')) {
    return 'origin';
  }

  const text = entityText(entity);
  const hits = ownerRules.filter(([, rule]) => rule.test(text)).map(([owner]) => owner);
  const uniqueHits = [...new Set(hits)];
  if (uniqueHits.length === 1) return uniqueHits[0];
  if (uniqueHits.length > 1) return `mixed:${uniqueHits.join('+')}`;
  if (/monorepo|repo-certifiability|release-train|gateb|certification-gate|closure-suite|promotion|rc-freeze|stabilization|current-gap/.test(text)) {
    return 'history';
  }
  return 'review';
}

function pathExistsInRepo(repoRoot, entityPath) {
  if (!entityPath) return [];
  const normalized = entityPath.replaceAll('\\', '/');
  const candidates = [normalized];
  if (repoRoot.endsWith('mdwrk-com') && normalized.startsWith('apps/mdwrkcom/')) {
    candidates.push(normalized.slice('apps/mdwrkcom/'.length));
  }
  if (repoRoot.endsWith('mdwrk-com') && normalized.startsWith('packages/content/mdwrkcom-content-pack/')) {
    candidates.push(`packages/site-content-pack/${normalized.slice('packages/content/mdwrkcom-content-pack/'.length)}`);
  }
  return candidates.filter((candidate) => existsSync(join(repoRoot, candidate)));
}

function remapPathForRepo(repo, entityPath) {
  if (!entityPath) return entityPath;
  const normalized = entityPath.replaceAll('\\', '/');
  if (repo === 'mdwrk-com' && normalized.startsWith('apps/mdwrkcom/')) {
    return normalized.slice('apps/mdwrkcom/'.length);
  }
  if (repo === 'mdwrk-com' && normalized.startsWith('packages/content/mdwrkcom-content-pack/')) {
    return `packages/site-content-pack/${normalized.slice('packages/content/mdwrkcom-content-pack/'.length)}`;
  }
  return normalized;
}

function actionFor(bucket) {
  if (bucket === 'origin') return 'copy-origin';
  if (bucket === 'history') return 'archive';
  if (bucket === 'review') return 'manual-review';
  if (bucket.startsWith('mixed:')) return 'split';
  return 'migrate';
}

function reasonFor(bucket) {
  if (bucket === 'origin') return 'SSOT-origin baseline already initialized in every split registry.';
  if (bucket === 'history') return 'Monorepo-wide historical closure or release context; archive rather than keep as active proof.';
  if (bucket === 'review') return 'No high-confidence owner from ID, title, path, or relationships.';
  if (bucket.startsWith('mixed:')) return 'Cross-repo monorepo entity; split into narrower repo-local rows before migration.';
  return `High-confidence ${bucket} ownership from ID, title, path, or relationships.`;
}

function buildLedger(sourceRegistry) {
  const rows = [];
  for (const family of entityFamilies) {
    for (const entity of sourceRegistry[family] ?? []) {
      const bucket = classify(entity);
      const proposedOwner = targets[bucket]?.repo ?? bucket;
      const existingTargets = Object.fromEntries(
        Object.entries(targets).map(([owner, target]) => [target.repo, pathExistsInRepo(target.root, entity.path)])
      );
      rows.push({
        entity_family: family,
        entity_id: entity.id ?? null,
        title: entity.title ?? entity.version ?? null,
        source_path: entity.path ?? null,
        proposed_owner: proposedOwner,
        action: actionFor(bucket),
        reason: reasonFor(bucket),
        existing_target_paths: existingTargets,
        blocking_missing_paths: entity.path
          ? Object.entries(existingTargets)
              .filter(([, paths]) => paths.length === 0)
              .map(([repo]) => repo)
          : [],
      });
    }
  }
  return rows;
}

function writeLedger(rows) {
  mkdirSync(dirname(ledgerJsonPath), { recursive: true });
  writeJson(ledgerJsonPath, rows, { trailingNewline: true });

  const counts = new Map();
  for (const row of rows) {
    const key = `${row.action}|${row.proposed_owner}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const lines = [
    '# SSOT Registry Migration Ledger',
    '',
    'Generated from `E:\\swarmauri_github\\markdown_workspace\\.ssot\\registry.json`.',
    '',
    '## Summary',
    '',
    '| Action | Proposed owner | Count |',
    '| --- | --- | ---: |',
    ...[...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {
        const [action, owner] = key.split('|');
        return `| \`${action}\` | \`${owner}\` | ${count} |`;
      }),
    '',
    'The machine-readable ledger is `docs/operations/ssot-registry-migration-ledger.json`.',
    '',
    'Rows marked `migrate` are high-confidence single-owner candidates. Rows marked `split` must be decomposed into repo-local entities before they become active proof in any split repo.',
    '',
  ];
  writeFileSync(ledgerMarkdownPath, `${lines.join('\n')}\n`, 'utf8');
}

function copyRegistryDocument(entity, targetRoot) {
  if (!entity.path) return false;
  const sourcePath = join(sourceRepo, entity.path);
  const targetPath = join(targetRoot, entity.path);
  if (!existsSync(sourcePath)) return false;
  mkdirSync(dirname(targetPath), { recursive: true });
  copyFileSync(sourcePath, targetPath);
  return true;
}

function mergeById(existing, additions) {
  const merged = new Map();
  for (const entity of existing) merged.set(entity.id, entity);
  for (const entity of additions) merged.set(entity.id, entity);
  return [...merged.values()].sort((a, b) => (a.number ?? 999999) - (b.number ?? 999999) || String(a.id).localeCompare(String(b.id)));
}

function keepKnownIds(ids, knownIds) {
  return (ids ?? []).filter((id) => knownIds.has(id));
}

function importedEntity(entity, repo, known) {
  const clone = structuredClone(entity);
  clone.origin ??= 'repo-local';
  if (clone.id?.startsWith('clm:')) clone.depends_on_claim_ids ??= [];
  if (clone.path) clone.path = remapPathForRepo(repo, clone.path);
  if (clone.spec_ids) clone.spec_ids = keepKnownIds(clone.spec_ids, known.specs);
  if (clone.claim_ids) clone.claim_ids = keepKnownIds(clone.claim_ids, known.claims);
  if (clone.test_ids) clone.test_ids = keepKnownIds(clone.test_ids, known.tests);
  if (clone.evidence_ids) clone.evidence_ids = keepKnownIds(clone.evidence_ids, known.evidence);
  if (clone.feature_ids) clone.feature_ids = keepKnownIds(clone.feature_ids, known.features);
  if (clone.requires) clone.requires = keepKnownIds(clone.requires, known.features);
  return clone;
}

function importOwnedDocuments(sourceRegistry, owner, target) {
  const registryPath = join(target.root, '.ssot', 'registry.json');
  const targetRegistry = readJson(registryPath);
  const ownedAdrs = (sourceRegistry.adrs ?? []).filter((entity) => classify(entity) === owner);
  const ownedAdrIds = new Set([...(targetRegistry.adrs ?? []).map((entity) => entity.id), ...ownedAdrs.map((entity) => entity.id)]);

  const ownedSpecs = (sourceRegistry.specs ?? []).filter((entity) => {
    if (classify(entity) !== owner) return false;
    return (entity.adr_ids ?? []).every((adrId) => ownedAdrIds.has(adrId));
  });

  const copiedAdrs = ownedAdrs.filter((entity) => copyRegistryDocument(entity, target.root));
  const copiedSpecs = ownedSpecs.filter((entity) => copyRegistryDocument(entity, target.root));

  targetRegistry.adrs = mergeById(targetRegistry.adrs ?? [], copiedAdrs);
  targetRegistry.specs = mergeById(targetRegistry.specs ?? [], copiedSpecs);
  writeJson(registryPath, targetRegistry);

  return {
    repo: target.repo,
    adrs: copiedAdrs.length,
    specs: copiedSpecs.length,
  };
}

function hasValidPath(entity, target) {
  if (!entity.path) return true;
  return pathExistsInRepo(target.root, entity.path).length > 0;
}

function importOwnedRuntimeEntities(sourceRegistry, owner, target) {
  const registryPath = join(target.root, '.ssot', 'registry.json');
  const targetRegistry = readJson(registryPath);
  const currentSpecIds = new Set((targetRegistry.specs ?? []).map((entity) => entity.id));

  const ownedFeatureIds = new Set((sourceRegistry.features ?? []).filter((entity) => classify(entity) === owner).map((entity) => entity.id));
  const ownedClaimIds = new Set((sourceRegistry.claims ?? []).filter((entity) => classify(entity) === owner).map((entity) => entity.id));
  const ownedTestIds = new Set((sourceRegistry.tests ?? []).filter((entity) => classify(entity) === owner).map((entity) => entity.id));
  const ownedEvidenceIds = new Set((sourceRegistry.evidence ?? []).filter((entity) => classify(entity) === owner).map((entity) => entity.id));

  const candidateFeatures = (sourceRegistry.features ?? [])
    .filter((entity) => classify(entity) === owner)
    .filter((entity) => (entity.spec_ids ?? []).every((id) => currentSpecIds.has(id)));
  const candidateFeatureIds = new Set(candidateFeatures.map((entity) => entity.id));

  const candidateTests = (sourceRegistry.tests ?? [])
    .filter((entity) => classify(entity) === owner && hasValidPath(entity, target))
    .filter((entity) => (entity.feature_ids ?? []).every((id) => candidateFeatureIds.has(id)));
  const candidateTestIds = new Set(candidateTests.map((entity) => entity.id));

  const candidateEvidence = (sourceRegistry.evidence ?? [])
    .filter((entity) => classify(entity) === owner && hasValidPath(entity, target))
    .filter((entity) => (entity.test_ids ?? []).every((id) => candidateTestIds.has(id)));
  const candidateEvidenceIds = new Set(candidateEvidence.map((entity) => entity.id));

  const candidateClaims = (sourceRegistry.claims ?? [])
    .filter((entity) => classify(entity) === owner)
    .filter((entity) => {
      return (
        (entity.feature_ids ?? []).every((id) => candidateFeatureIds.has(id)) &&
        (entity.test_ids ?? []).every((id) => candidateTestIds.has(id)) &&
        (entity.evidence_ids ?? []).every((id) => candidateEvidenceIds.has(id))
      );
    });
  const candidateClaimIds = new Set(candidateClaims.map((entity) => entity.id));

  const selectedFeatures = candidateFeatures.filter((entity) => {
    const localClaimIds = (entity.claim_ids ?? []).filter((id) => candidateClaimIds.has(id));
    const localTestIds = (entity.test_ids ?? []).filter((id) => candidateTestIds.has(id));
    return localClaimIds.length > 0 && localTestIds.length > 0;
  });
  const selectedFeatureIds = new Set(selectedFeatures.map((entity) => entity.id));

  const selectedTests = candidateTests.filter((entity) => (entity.feature_ids ?? []).some((id) => selectedFeatureIds.has(id)));
  const selectedTestIds = new Set(selectedTests.map((entity) => entity.id));

  const selectedEvidence = candidateEvidence.filter((entity) => (entity.test_ids ?? []).some((id) => selectedTestIds.has(id)));
  const selectedEvidenceIds = new Set(selectedEvidence.map((entity) => entity.id));

  const selectedClaims = candidateClaims.filter((entity) => (entity.feature_ids ?? []).some((id) => selectedFeatureIds.has(id)));
  const selectedClaimIds = new Set(selectedClaims.map((entity) => entity.id));

  const known = {
    specs: currentSpecIds,
    features: selectedFeatureIds,
    claims: selectedClaimIds,
    tests: selectedTestIds,
    evidence: selectedEvidenceIds,
  };

  const importedFeatures = selectedFeatures.map((entity) => importedEntity(entity, target.repo, known));
  const importedClaims = selectedClaims.map((entity) => importedEntity(entity, target.repo, known));
  const importedTests = selectedTests.map((entity) => importedEntity(entity, target.repo, known));
  const importedEvidence = selectedEvidence.map((entity) => importedEntity(entity, target.repo, known));

  targetRegistry.features = mergeById((targetRegistry.features ?? []).filter((entity) => !ownedFeatureIds.has(entity.id)), importedFeatures);
  targetRegistry.claims = mergeById((targetRegistry.claims ?? []).filter((entity) => !ownedClaimIds.has(entity.id)), importedClaims);
  targetRegistry.tests = mergeById((targetRegistry.tests ?? []).filter((entity) => !ownedTestIds.has(entity.id)), importedTests);
  targetRegistry.evidence = mergeById((targetRegistry.evidence ?? []).filter((entity) => !ownedEvidenceIds.has(entity.id)), importedEvidence);

  writeJson(registryPath, targetRegistry);

  return {
    repo: target.repo,
    features: importedFeatures.length,
    claims: importedClaims.length,
    tests: importedTests.length,
    evidence: importedEvidence.length,
  };
}

function sumLedger(rows, action, owner) {
  return rows.filter((row) => row.action === action && row.proposed_owner === owner).length;
}

function writeMigrationStatus(ledger, documentImports, runtimeImports) {
  const unresolvedCounts = new Map();
  for (const row of ledger.filter((entry) => entry.action !== 'migrate' && entry.action !== 'copy-origin')) {
    const key = `${row.action}|${row.proposed_owner}`;
    unresolvedCounts.set(key, (unresolvedCounts.get(key) ?? 0) + 1);
  }

  const lines = [
    '# SSOT Registry Split Status',
    '',
    'Date: 2026-05-19',
    '',
    '## Imported Batches',
    '',
    '| Repository | ADRs | SPECs | Features | Claims | Tests | Evidence |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...documentImports.map((docImport) => {
      const runtimeImport = runtimeImports.find((entry) => entry.repo === docImport.repo);
      return `| \`${docImport.repo}\` | ${docImport.adrs} | ${docImport.specs} | ${runtimeImport?.features ?? 0} | ${runtimeImport?.claims ?? 0} | ${runtimeImport?.tests ?? 0} | ${runtimeImport?.evidence ?? 0} |`;
    }),
    '',
    '## Direct Owner Ledger Work',
    '',
    '| Repository | High-confidence migrate rows |',
    '| --- | ---: |',
    ...Object.values(targets).map((target) => {
      const owner = target.repo;
      return `| \`${owner}\` | ${sumLedger(ledger, 'migrate', owner)} |`;
    }),
    '',
    '## Unresolved Global Queues',
    '',
    '| Action | Proposed owner bucket | Count |',
    '| --- | --- | ---: |',
    ...[...unresolvedCounts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {
        const [action, owner] = key.split('|');
        return `| \`${action}\` | \`${owner}\` | ${count} |`;
      }),
    '',
    'Rows marked `split`, `manual-review`, or `archive` are intentionally not imported as active proof yet.',
    '',
  ];
  writeFileSync(join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-split-status.md'), `${lines.join('\n')}\n`, 'utf8');
}

function main() {
  const sourceRegistry = readJson(sourceRegistryPath);
  const ledger = buildLedger(sourceRegistry);
  writeLedger(ledger);

  const imports = Object.entries(targets).map(([owner, target]) => importOwnedDocuments(sourceRegistry, owner, target));
  const runtimeImports = Object.entries(targets).map(([owner, target]) => importOwnedRuntimeEntities(sourceRegistry, owner, target));
  writeMigrationStatus(ledger, imports, runtimeImports);
  const reportLines = [
    'SSOT registry split ledger generated.',
    ...imports.map((entry) => `${entry.repo}: imported ${entry.adrs} ADRs and ${entry.specs} SPECs.`),
    ...runtimeImports.map((entry) => `${entry.repo}: imported ${entry.features} features, ${entry.claims} claims, ${entry.tests} tests, and ${entry.evidence} evidence rows.`),
  ];
  console.log(reportLines.join('\n'));
}

main();
