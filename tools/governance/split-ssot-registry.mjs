import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const workspaceRoot = resolve('..');
const sourceRepo = join(workspaceRoot, 'markdown_workspace');
const sourceRegistryPath = join(sourceRepo, '.ssot', 'registry.json');
const coordinatorRepo = join(workspaceRoot, 'mdwrk');
const ledgerJsonPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-migration-ledger.json');
const ledgerMarkdownPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-migration-ledger.md');
const clarificationJsonPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-clarification-queue.json');
const clarificationMarkdownPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-clarification-queue.md');
const remainingFeaturesJsonPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-remaining-feature-directions.json');
const remainingFeaturesMarkdownPath = join(coordinatorRepo, 'docs', 'operations', 'ssot-registry-remaining-feature-directions.md');

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

const ownerKeyToRepo = Object.fromEntries(Object.entries(targets).map(([owner, target]) => [owner, target.repo]));
const repoToOwnerKey = Object.fromEntries(Object.entries(targets).map(([owner, target]) => [target.repo, owner]));

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

const featureOwnerOverrides = {
  'feat:docs-text-wrap-previewer': 'core',
  'feat:docs-checkbox-autocomplete': 'core',
  'feat:shell-evidence-matrix': 'studio',
};

const featureCopyToAll = new Set(['feat:repository-top-level-hygiene']);

const featureOriginLikeExclusions = new Set([
  'feat:mdwrk-scoped-agent-ownership-instructions',
  'feat:ssot-registry-model-governance',
  'feat:ssot-graph-export-governance',
  'feat:ssot-release-snapshot-reports',
  'feat:repo-governance-validation',
  'feat:spec-coverage-index',
]);

const scopedAgentInstructionFeatures = {
  'mdwrk': {
    id: 'feat:mdwrk.scoped-agent-ownership-instructions',
    title: 'mdwrk scoped Codex agent ownership instructions',
    description:
      'Defines root and folder-local AGENTS.md guidance for Codex work in mdwrk, including package ownership boundaries, nested instruction precedence, verification commands, and role-specific expectations for shared contracts, renderer, editor, extension, UI token, and documentation work.',
  },
  'mdwrk-studio': {
    id: 'feat:mdwrk-studio.scoped-agent-ownership-instructions',
    title: 'mdwrk-studio scoped Codex agent ownership instructions',
    description:
      'Defines root and folder-local AGENTS.md guidance for Codex work in mdwrk-studio, including ownership boundaries, nested instruction precedence, verification commands, and role-specific expectations for PWA, desktop shell, client renderer, Playwright, browser smoke, and evidence-generation work.',
  },
  'mdwrk-pages': {
    id: 'feat:mdwrk-pages.scoped-agent-ownership-instructions',
    title: 'mdwrk-pages scoped Codex agent ownership instructions',
    description:
      'Defines root and folder-local AGENTS.md guidance for Codex work in mdwrk-pages, including ownership boundaries, nested instruction precedence, verification commands, and role-specific expectations for lander packages, page templates, structured content contracts, theme packages, and publishing helpers.',
  },
  'mdwrk-com': {
    id: 'feat:mdwrk-com.scoped-agent-ownership-instructions',
    title: 'mdwrk-com scoped Codex agent ownership instructions',
    description:
      'Defines root and folder-local AGENTS.md guidance for Codex work in mdwrk-com, including ownership boundaries, nested instruction precedence, verification commands, and role-specific expectations for public website content, metadata, styles, site content packs, and deployment-sensitive surfaces.',
  },
};

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
  if (featureOriginLikeExclusions.has(entity?.id)) {
    return 'origin';
  }
  if (featureCopyToAll.has(entity?.id)) {
    return 'mixed:mdwrk-com+pages+studio+core';
  }
  if (featureOwnerOverrides[entity?.id]) {
    return featureOwnerOverrides[entity.id];
  }
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

function bucketIncludesOwner(bucket, owner) {
  if (bucket === owner) return true;
  if (!bucket.startsWith('mixed:')) return false;
  return bucket
    .slice('mixed:'.length)
    .split('+')
    .some((entry) => entry === owner);
}

function entityAppliesToOwner(entity, owner) {
  return bucketIncludesOwner(classify(entity), owner);
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

function candidateReposForOwner(owner) {
  if (targets[owner]) return [targets[owner].repo];
  if (!owner.startsWith('mixed:')) return [];
  return owner
    .slice('mixed:'.length)
    .split('+')
    .map((entry) => ownerKeyToRepo[entry])
    .filter(Boolean);
}

function currentTargetEntityLocations(entityFamily, entityId) {
  return Object.values(targets)
    .filter((target) => {
      const registry = readJson(join(target.root, '.ssot', 'registry.json'));
      return (registry[entityFamily] ?? []).some((entity) => entity.id === entityId);
    })
    .map((target) => target.repo);
}

function clarificationReason(row, locations) {
  if (row.action === 'manual-review') {
    return 'No single owner is clear from the entity ID, title, path, or links.';
  }
  if (row.action === 'archive') {
    return 'Historical monorepo or release-checkpoint row; needs an explicit archive-versus-copy policy before becoming active in a split repo.';
  }
  if (row.action === 'split') {
    const candidateRepos = candidateReposForOwner(row.proposed_owner);
    const missingRepos = candidateRepos.filter((repo) => !locations.includes(repo));
    if (missingRepos.length > 0 && locations.length > 0) {
      return `Split policy is known, but local proof was only valid in ${locations.join(', ')}; remaining candidate repos without valid local rows: ${missingRepos.join(', ')}.`;
    }
    return 'Split policy is known, but no target repo currently has enough local proof to carry this row.';
  }
  if (row.action === 'migrate') {
    return 'Single-owner row still lacks enough local proof closure, local paths, or imported dependencies to migrate safely.';
  }
  return row.reason;
}

function writeClarificationQueue(ledger) {
  const rows = ledger
    .filter((row) => row.action !== 'copy-origin')
    .map((row) => {
      const locations = currentTargetEntityLocations(row.entity_family, row.entity_id);
      const candidateRepos = candidateReposForOwner(row.proposed_owner);
      const splitFullyMigrated =
        row.action === 'split' && candidateRepos.length > 0 && candidateRepos.every((repo) => locations.includes(repo));
      return {
        ...row,
        candidate_repos: candidateRepos,
        migrated_to_repos: locations,
        clarification_required:
          locations.length === 0 ||
          row.action === 'manual-review' ||
          row.action === 'archive' ||
          (row.action === 'split' && !splitFullyMigrated),
        clarification_reason: clarificationReason(row, locations),
      };
    })
    .filter((row) => row.clarification_required);

  writeJson(clarificationJsonPath, rows, { trailingNewline: true });

  const counts = new Map();
  for (const row of rows) {
    const key = `${row.action}|${row.proposed_owner}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const lines = [
    '# SSOT Registry Clarification Queue',
    '',
    'Generated from the current split registries after the latest migration pass.',
    '',
    'This queue contains source entities that were not confidently moved, split, or copied as complete repo-local proof. Some split rows may already exist as supporting rows in one or more repos, but still need an explicit ownership policy for the original monorepo entity.',
    '',
    '## Summary',
    '',
    '| Action | Proposed owner bucket | Count |',
    '| --- | --- | ---: |',
    ...[...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {
        const [action, owner] = key.split('|');
        return `| \`${action}\` | \`${owner}\` | ${count} |`;
      }),
    '',
    '## Rows',
    '',
    '| Family | ID | Proposed owner | Candidate repos | Already copied to | Clarification reason |',
    '| --- | --- | --- | --- | --- | --- |',
    ...rows.map((row) => {
      const candidateRepos = row.candidate_repos.length > 0 ? row.candidate_repos.map((repo) => `\`${repo}\``).join(', ') : 'none';
      const locations = row.migrated_to_repos.length > 0 ? row.migrated_to_repos.map((repo) => `\`${repo}\``).join(', ') : 'none';
      return `| \`${row.entity_family}\` | \`${row.entity_id}\` | \`${row.proposed_owner}\` | ${candidateRepos} | ${locations} | ${row.clarification_reason} |`;
    }),
    '',
  ];
  writeFileSync(clarificationMarkdownPath, `${lines.join('\n')}\n`, 'utf8');

  return rows;
}

function writeRemainingFeatureDirections(clarificationRows) {
  const featureRows = clarificationRows.filter((row) => row.entity_family === 'features');
  writeJson(remainingFeaturesJsonPath, featureRows, { trailingNewline: true });

  const counts = new Map();
  for (const row of featureRows) {
    const key = `${row.action}|${row.proposed_owner}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const lines = [
    '# SSOT Registry Remaining Feature Directions',
    '',
    'Generated after applying the policy that mixed monorepo rows should be split into separate repo-local rows when they can validate with local proof.',
    '',
    'These are the remaining feature entities that still need direction because they cannot yet be confidently represented as complete repo-local proof rows.',
    '',
    '## Summary',
    '',
    '| Action | Proposed owner bucket | Count |',
    '| --- | --- | ---: |',
    ...[...counts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {
        const [action, owner] = key.split('|');
        return `| \`${action}\` | \`${owner}\` | ${count} |`;
      }),
    '',
    '## Features',
    '',
    '| Feature ID | Title | Proposed owner | Candidate repos | Already migrated to | Direction needed |',
    '| --- | --- | --- | --- | --- | --- |',
    ...featureRows.map((row) => {
      const candidateRepos = row.candidate_repos.length > 0 ? row.candidate_repos.map((repo) => `\`${repo}\``).join(', ') : 'none';
      const locations = row.migrated_to_repos.length > 0 ? row.migrated_to_repos.map((repo) => `\`${repo}\``).join(', ') : 'none';
      return `| \`${row.entity_id}\` | ${row.title ?? ''} | \`${row.proposed_owner}\` | ${candidateRepos} | ${locations} | ${row.clarification_reason} |`;
    }),
    '',
  ];
  writeFileSync(remainingFeaturesMarkdownPath, `${lines.join('\n')}\n`, 'utf8');

  return featureRows;
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

function entityById(sourceRegistry, family, id) {
  return (sourceRegistry[family] ?? []).find((entity) => entity.id === id);
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

function tierRank(tier) {
  const ranks = { T0: 0, T1: 1, T2: 2, T3: 3, T4: 4 };
  return ranks[tier] ?? 0;
}

function claimHasPassingEvidenceAtTier(claim, evidenceRows) {
  const requiredTier = tierRank(claim.tier);
  return evidenceRows.some((evidence) => evidence.status === 'passed' && tierRank(evidence.tier) >= requiredTier);
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
  if (clone.profile_ids && known.profiles) clone.profile_ids = keepKnownIds(clone.profile_ids, known.profiles);
  if (clone.requires) clone.requires = keepKnownIds(clone.requires, known.features);
  return clone;
}

function importedFeatureEntity(entity, repo, known, proofBackedFeatureIds) {
  const clone = importedEntity(entity, repo, known);
  clone.requires = keepKnownIds(clone.requires, proofBackedFeatureIds);
  if (proofBackedFeatureIds.has(entity.id)) return clone;

  clone.implementation_status = 'absent';
  clone.claim_ids = [];
  clone.test_ids = [];
  clone.requires = [];
  clone.plan ??= {};
  if (entity.plan?.horizon === 'out_of_bounds') {
    clone.plan.horizon = 'out_of_bounds';
  } else {
    clone.plan.horizon = 'backlog';
    delete clone.plan.out_of_bounds_disposition;
  }
  clone.plan.slot = null;
  clone.lifecycle ??= { stage: 'active', replacement_feature_ids: [], note: null };
  clone.lifecycle.effective_release_id = null;
  clone.lifecycle.note =
    'Migrated as repo-local scope from the monorepo; split-repo claims, tests, evidence, and certification must be regenerated before moving back to current or explicit.';
  return clone;
}

function scopedAgentInstructionFeature(repo) {
  const feature = scopedAgentInstructionFeatures[repo];
  if (!feature) return null;
  return {
    claim_ids: [],
    description: feature.description,
    id: feature.id,
    implementation_status: 'absent',
    lifecycle: {
      note: 'Created during the SSOT split as repo-local backlog scope. Add repo-local AGENTS.md proof before moving to current or explicit.',
      replacement_feature_ids: [],
      stage: 'active',
    },
    origin: 'repo-local',
    plan: {
      horizon: 'backlog',
      slot: null,
      target_claim_tier: 'T2',
      target_lifecycle_stage: 'active',
    },
    requires: [],
    spec_ids: [],
    test_ids: [],
    title: feature.title,
  };
}

function importOwnedDocuments(sourceRegistry, owner, target) {
  const registryPath = join(target.root, '.ssot', 'registry.json');
  const targetRegistry = readJson(registryPath);
  const ownedAdrs = (sourceRegistry.adrs ?? []).filter((entity) => entityAppliesToOwner(entity, owner) && classify(entity) !== 'history');
  const existingAdrIds = new Set((targetRegistry.adrs ?? []).map((entity) => entity.id));

  const ownedFeatures = (sourceRegistry.features ?? []).filter((entity) => entityAppliesToOwner(entity, owner));
  const directlyOwnedSpecs = (sourceRegistry.specs ?? []).filter((entity) => entityAppliesToOwner(entity, owner));
  const featureRequiredSpecs = ownedFeatures
    .flatMap((entity) => entity.spec_ids ?? [])
    .map((id) => entityById(sourceRegistry, 'specs', id))
    .filter((entity) => entity && classify(entity) !== 'origin');
  const specCandidates = mergeById(directlyOwnedSpecs, featureRequiredSpecs);

  const requiredAdrIds = new Set(ownedAdrs.map((entity) => entity.id));
  for (const spec of specCandidates) {
    for (const adrId of spec.adr_ids ?? []) requiredAdrIds.add(adrId);
  }

  const supportingAdrs = [...requiredAdrIds]
    .filter((id) => !ownedAdrs.some((entity) => entity.id === id))
    .map((id) => entityById(sourceRegistry, 'adrs', id))
    .filter((entity) => entity && classify(entity) !== 'origin');

  const availableAdrIds = new Set([
    ...existingAdrIds,
    ...ownedAdrs.map((entity) => entity.id),
    ...supportingAdrs.map((entity) => entity.id),
  ]);

  const importableSpecs = specCandidates.filter((entity) => {
    return (entity.adr_ids ?? []).every((adrId) => availableAdrIds.has(adrId));
  });

  const copiedAdrs = ownedAdrs.filter((entity) => copyRegistryDocument(entity, target.root));
  const copiedSupportingAdrs = supportingAdrs.filter((entity) => copyRegistryDocument(entity, target.root));
  const copiedSpecs = importableSpecs.filter((entity) => copyRegistryDocument(entity, target.root));

  targetRegistry.adrs = mergeById(targetRegistry.adrs ?? [], [...copiedAdrs, ...copiedSupportingAdrs]);
  targetRegistry.specs = mergeById(targetRegistry.specs ?? [], copiedSpecs);
  writeJson(registryPath, targetRegistry);

  return {
    repo: target.repo,
    adrs: copiedAdrs.length,
    supportingAdrs: copiedSupportingAdrs.length,
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

  const scopedFeatureIds = new Set((sourceRegistry.features ?? []).filter((entity) => entityAppliesToOwner(entity, owner)).map((entity) => entity.id));
  const scopedClaimIds = new Set((sourceRegistry.claims ?? []).filter((entity) => entityAppliesToOwner(entity, owner)).map((entity) => entity.id));
  const scopedTestIds = new Set((sourceRegistry.tests ?? []).filter((entity) => entityAppliesToOwner(entity, owner)).map((entity) => entity.id));
  const scopedEvidenceIds = new Set((sourceRegistry.evidence ?? []).filter((entity) => entityAppliesToOwner(entity, owner)).map((entity) => entity.id));

  const candidateFeatures = (sourceRegistry.features ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner))
    .filter((entity) => (entity.spec_ids ?? []).every((id) => currentSpecIds.has(id)));
  const candidateFeatureIds = new Set(candidateFeatures.map((entity) => entity.id));

  const candidateTests = (sourceRegistry.tests ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner) && hasValidPath(entity, target))
    .filter((entity) => (entity.feature_ids ?? []).some((id) => candidateFeatureIds.has(id)));
  const candidateTestIds = new Set(candidateTests.map((entity) => entity.id));

  const candidateEvidence = (sourceRegistry.evidence ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner) && hasValidPath(entity, target))
    .filter((entity) => (entity.test_ids ?? []).some((id) => candidateTestIds.has(id)));
  const candidateEvidenceIds = new Set(candidateEvidence.map((entity) => entity.id));

  const candidateClaims = (sourceRegistry.claims ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner))
    .filter((entity) => {
      return (
        (entity.feature_ids ?? []).some((id) => candidateFeatureIds.has(id)) &&
        ((entity.test_ids ?? []).length === 0 || (entity.test_ids ?? []).some((id) => candidateTestIds.has(id))) &&
        ((entity.evidence_ids ?? []).length === 0 || (entity.evidence_ids ?? []).some((id) => candidateEvidenceIds.has(id)))
      );
    });
  const plannedFeatures = candidateFeatures;
  let selectedFeatures = candidateFeatures;
  let selectedClaims = candidateClaims;
  let selectedTests = candidateTests;
  let selectedEvidence = candidateEvidence;

  for (let iteration = 0; iteration < 8; iteration += 1) {
    const selectedFeatureIds = new Set(selectedFeatures.map((entity) => entity.id));
    const candidateEvidenceIds = new Set(candidateEvidence.map((entity) => entity.id));

    const claimsWithFeatures = candidateClaims.filter((entity) => (entity.feature_ids ?? []).some((id) => selectedFeatureIds.has(id)));
    const claimsWithFeatureIds = new Set(claimsWithFeatures.map((entity) => entity.id));

    const testsWithLocalProof = candidateTests.filter((entity) => {
      return (
        (entity.feature_ids ?? []).some((id) => selectedFeatureIds.has(id)) &&
        (entity.claim_ids ?? []).some((id) => claimsWithFeatureIds.has(id)) &&
        (entity.evidence_ids ?? []).some((id) => candidateEvidenceIds.has(id))
      );
    });
    const testIds = new Set(testsWithLocalProof.map((entity) => entity.id));

    const evidenceWithTests = candidateEvidence.filter((entity) => (entity.test_ids ?? []).some((id) => testIds.has(id)));
    const evidenceIds = new Set(evidenceWithTests.map((entity) => entity.id));

    const claimsWithProof = claimsWithFeatures.filter((entity) => {
      const localEvidenceRows = evidenceWithTests.filter((evidence) => (entity.evidence_ids ?? []).includes(evidence.id));
      return (
        (entity.test_ids ?? []).some((id) => testIds.has(id)) &&
        (entity.evidence_ids ?? []).some((id) => evidenceIds.has(id)) &&
        claimHasPassingEvidenceAtTier(entity, localEvidenceRows)
      );
    });
    const claimIds = new Set(claimsWithProof.map((entity) => entity.id));

    const testsWithClaims = testsWithLocalProof.filter((entity) => {
      return (entity.claim_ids ?? []).some((id) => claimIds.has(id)) && (entity.evidence_ids ?? []).some((id) => evidenceIds.has(id));
    });
    const finalTestIds = new Set(testsWithClaims.map((entity) => entity.id));

    const featuresWithProof = candidateFeatures.filter((entity) => {
      return (entity.claim_ids ?? []).some((id) => claimIds.has(id)) && (entity.test_ids ?? []).some((id) => finalTestIds.has(id));
    });

    const stable =
      featuresWithProof.length === selectedFeatures.length &&
      claimsWithProof.length === selectedClaims.length &&
      testsWithClaims.length === selectedTests.length &&
      evidenceWithTests.length === selectedEvidence.length;

    selectedFeatures = featuresWithProof;
    selectedClaims = claimsWithProof;
    selectedTests = testsWithClaims;
    selectedEvidence = evidenceWithTests.filter((entity) => (entity.test_ids ?? []).some((id) => finalTestIds.has(id)));

    if (stable) break;
  }

  const proofBackedFeatureIds = new Set(selectedFeatures.map((entity) => entity.id));
  const selectedFeatureIds = new Set(plannedFeatures.map((entity) => entity.id));
  const selectedClaimIds = new Set(selectedClaims.map((entity) => entity.id));
  const selectedTestIds = new Set(selectedTests.map((entity) => entity.id));
  const selectedEvidenceIds = new Set(selectedEvidence.map((entity) => entity.id));

  const known = {
    specs: currentSpecIds,
    features: selectedFeatureIds,
    claims: selectedClaimIds,
    tests: selectedTestIds,
    evidence: selectedEvidenceIds,
  };

  const syntheticFeatures = [scopedAgentInstructionFeature(target.repo)].filter(Boolean);
  const importedFeatures = [
    ...plannedFeatures.map((entity) => importedFeatureEntity(entity, target.repo, known, proofBackedFeatureIds)),
    ...syntheticFeatures,
  ];
  const importedClaims = selectedClaims.map((entity) => importedEntity(entity, target.repo, known));
  const importedTests = selectedTests.map((entity) => importedEntity(entity, target.repo, known));
  const importedEvidence = selectedEvidence.map((entity) => importedEntity(entity, target.repo, known));

  const sourceFeatureIds = new Set((sourceRegistry.features ?? []).map((entity) => entity.id));
  const sourceClaimIds = new Set((sourceRegistry.claims ?? []).map((entity) => entity.id));
  const sourceTestIds = new Set((sourceRegistry.tests ?? []).map((entity) => entity.id));
  const sourceEvidenceIds = new Set((sourceRegistry.evidence ?? []).map((entity) => entity.id));
  const sourceBoundaryIds = new Set((sourceRegistry.boundaries ?? []).map((entity) => entity.id).filter((id) => id !== 'bnd:default'));
  const sourceProfileIds = new Set((sourceRegistry.profiles ?? []).map((entity) => entity.id));
  const sourceIssueIds = new Set((sourceRegistry.issues ?? []).map((entity) => entity.id));

  targetRegistry.features = mergeById((targetRegistry.features ?? []).filter((entity) => !sourceFeatureIds.has(entity.id)), importedFeatures);
  targetRegistry.claims = mergeById((targetRegistry.claims ?? []).filter((entity) => !sourceClaimIds.has(entity.id)), importedClaims);
  targetRegistry.tests = mergeById((targetRegistry.tests ?? []).filter((entity) => !sourceTestIds.has(entity.id)), importedTests);
  targetRegistry.evidence = mergeById((targetRegistry.evidence ?? []).filter((entity) => !sourceEvidenceIds.has(entity.id)), importedEvidence);

  const knownAfterRuntime = {
    features: new Set(targetRegistry.features.map((entity) => entity.id)),
    claims: new Set(targetRegistry.claims.map((entity) => entity.id)),
    tests: new Set(targetRegistry.tests.map((entity) => entity.id)),
    evidence: new Set(targetRegistry.evidence.map((entity) => entity.id)),
    specs: currentSpecIds,
  };

  const selectedProfiles = (sourceRegistry.profiles ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner))
    .filter((entity) => (entity.feature_ids ?? []).some((id) => knownAfterRuntime.features.has(id)));
  const knownProfiles = new Set([...(targetRegistry.profiles ?? []).map((entity) => entity.id), ...selectedProfiles.map((entity) => entity.id)]);
  const importedProfiles = selectedProfiles.map((entity) => importedEntity(entity, target.repo, { ...knownAfterRuntime, profiles: knownProfiles }));

  const importedBoundaries = (sourceRegistry.boundaries ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner))
    .filter((entity) => {
      const featureHits = (entity.feature_ids ?? []).filter((id) => knownAfterRuntime.features.has(id)).length;
      const profileHits = (entity.profile_ids ?? []).filter((id) => knownProfiles.has(id)).length;
      return featureHits + profileHits > 0;
    })
    .map((entity) => importedEntity(entity, target.repo, { ...knownAfterRuntime, profiles: knownProfiles }));

  const importedIssues = (sourceRegistry.issues ?? [])
    .filter((entity) => entityAppliesToOwner(entity, owner))
    .filter((entity) => (entity.feature_ids ?? []).length === 0 || (entity.feature_ids ?? []).some((id) => knownAfterRuntime.features.has(id)))
    .map((entity) => importedEntity(entity, target.repo, knownAfterRuntime));

  targetRegistry.profiles = mergeById((targetRegistry.profiles ?? []).filter((entity) => !sourceProfileIds.has(entity.id)), importedProfiles);
  targetRegistry.boundaries = mergeById((targetRegistry.boundaries ?? []).filter((entity) => !sourceBoundaryIds.has(entity.id)), importedBoundaries);
  targetRegistry.issues = mergeById((targetRegistry.issues ?? []).filter((entity) => !sourceIssueIds.has(entity.id)), importedIssues);
  if (!targetRegistry.boundaries.some((entity) => entity.id === 'bnd:default')) {
    targetRegistry.boundaries = mergeById(targetRegistry.boundaries, [
      {
        feature_ids: [],
        frozen: false,
        id: 'bnd:default',
        profile_ids: [],
        status: 'draft',
        title: 'Default boundary',
      },
    ]);
  }

  writeJson(registryPath, targetRegistry);

  return {
    repo: target.repo,
    features: importedFeatures.length,
    claims: importedClaims.length,
    tests: importedTests.length,
    evidence: importedEvidence.length,
    profiles: importedProfiles.length,
    boundaries: importedBoundaries.length,
    issues: importedIssues.length,
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

  const remainingDirectRows = Object.values(targets).map((target) => {
    const registry = readJson(join(target.root, '.ssot', 'registry.json'));
    const idsByFamily = Object.fromEntries(
      entityFamilies.map((family) => [family, new Set((registry[family] ?? []).map((entity) => entity.id))])
    );
    const remaining = ledger.filter((row) => {
      return row.action === 'migrate' && row.proposed_owner === target.repo && !idsByFamily[row.entity_family]?.has(row.entity_id);
    });
    return {
      repo: target.repo,
      count: remaining.length,
      byFamily: entityFamilies
        .map((family) => [family, remaining.filter((row) => row.entity_family === family).length])
        .filter(([, count]) => count > 0),
    };
  });

  const proofPolicyRows = Object.values(targets).map((target) => {
    const registry = readJson(join(target.root, '.ssot', 'registry.json'));
    const features = registry.features ?? [];
    return {
      repo: target.repo,
      proofBacked: features.filter((feature) => {
        return (
          feature.implementation_status === 'implemented' &&
          (feature.claim_ids ?? []).length > 0 &&
          (feature.test_ids ?? []).length > 0
        );
      }).length,
      proofToRedo: features.filter((feature) => {
        return (
          feature.implementation_status === 'absent' &&
          feature.plan?.horizon === 'backlog' &&
          (feature.claim_ids ?? []).length === 0 &&
          (feature.test_ids ?? []).length === 0
        );
      }).length,
      outOfBounds: features.filter((feature) => feature.implementation_status === 'absent' && feature.plan?.horizon === 'out_of_bounds')
        .length,
    };
  });

  const lines = [
    '# SSOT Registry Split Status',
    '',
    'Date: 2026-05-19',
    '',
    '## Imported Batches',
    '',
    '| Repository | Owned ADRs | Supporting ADRs | SPECs | Features | Claims | Tests | Evidence | Profiles | Boundaries | Issues |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...documentImports.map((docImport) => {
      const runtimeImport = runtimeImports.find((entry) => entry.repo === docImport.repo);
      return `| \`${docImport.repo}\` | ${docImport.adrs} | ${docImport.supportingAdrs} | ${docImport.specs} | ${runtimeImport?.features ?? 0} | ${runtimeImport?.claims ?? 0} | ${runtimeImport?.tests ?? 0} | ${runtimeImport?.evidence ?? 0} | ${runtimeImport?.profiles ?? 0} | ${runtimeImport?.boundaries ?? 0} | ${runtimeImport?.issues ?? 0} |`;
    }),
    '',
    '## Proof Policy Pass',
    '',
    'The latest pass keeps feature scope rows in the owning split repo, but only keeps monorepo claims, tests, and evidence when the local target path and tier proof validate in that repo. Proofless rows are moved to `implementation_status: absent` and `plan.horizon: backlog` so split-repo proof artifacts and certifications can be regenerated without carrying stale monorepo certification state.',
    '',
    '| Repository | Proof-backed implemented features | Features needing new local proof | Out-of-bounds features |',
    '| --- | ---: | ---: | ---: |',
    ...proofPolicyRows.map((entry) => {
      return `| \`${entry.repo}\` | ${entry.proofBacked} | ${entry.proofToRedo} | ${entry.outOfBounds} |`;
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
    '## Remaining Direct Owner Rows',
    '',
    '| Repository | Remaining rows | Remaining families |',
    '| --- | ---: | --- |',
    ...remainingDirectRows.map((entry) => {
      const families = entry.byFamily.map(([family, count]) => `${family}: ${count}`).join(', ') || 'none';
      return `| \`${entry.repo}\` | ${entry.count} | ${families} |`;
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
  const clarificationRows = writeClarificationQueue(ledger);
  const remainingFeatureRows = writeRemainingFeatureDirections(clarificationRows);
  writeMigrationStatus(ledger, imports, runtimeImports);
  const reportLines = [
    'SSOT registry split ledger generated.',
    ...imports.map((entry) => `${entry.repo}: imported ${entry.adrs} ADRs and ${entry.specs} SPECs.`),
    ...runtimeImports.map((entry) => `${entry.repo}: imported ${entry.features} features, ${entry.claims} claims, ${entry.tests} tests, ${entry.evidence} evidence, ${entry.profiles} profiles, ${entry.boundaries} boundaries, and ${entry.issues} issues.`),
    `Clarification queue: ${clarificationRows.length} rows.`,
    `Remaining feature directions: ${remainingFeatureRows.length} rows.`,
  ];
  console.log(reportLines.join('\n'));
}

main();
