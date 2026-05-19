# SSOT Registry Split Proposal

Date: 2026-05-19

## Current State

The split repositories now each have a valid repo-local SSOT scaffold:

| Repository | Registry state | ADRs | SPECs | Boundaries | Releases | Feature/claim/test rows |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `mdwrk` | initialized | 25 | 27 | 1 | 1 | 0 |
| `mdwrk-studio` | initialized | 25 | 27 | 1 | 1 | 0 |
| `mdwrk-pages` | initialized | 25 | 27 | 1 | 1 | 0 |
| `mdwrk-com` | initialized | 25 | 27 | 1 | 1 | 0 |

The source registry for migration remains `E:\swarmauri_github\markdown_workspace\.ssot\registry.json`.
It contains:

| Entity family | Count |
| --- | ---: |
| ADRs | 99 |
| SPECs | 130 |
| Features | 549 |
| Claims | 242 |
| Tests | 177 |
| Evidence | 115 |
| Boundaries | 34 |
| Profiles | 6 |
| Releases | 9 |
| Issues | 5 |
| Risks | 0 |

The copied monorepo registry must not remain live in any split repo. It references paths from all four repos and cannot validate once those paths no longer exist locally.

## Ownership Rule

Use one authoritative owner for technical entities. Copy only the SSOT-origin baseline and repo-neutral interpretation policy rows. For mixed historical entities, either split them into narrower repo-owned rows or archive them as monorepo history.

| Target repo | Owns |
| --- | --- |
| `mdwrk` | Core contracts, renderer/editor packages, shared package contracts, extension architecture, package release governance, conformance, docs governance, cross-package CR order. |
| `mdwrk-studio` | PWA/client, desktop shell, browser tests, Playwright/browser smoke, UI shell, project/workspace state, OIDC/Git/app integration, Studio-specific extension surfaces. |
| `mdwrk-pages` | Portable pages/lander packages, page templates, page-template presets, structured-data package, lander SEO package, publishing package contracts, reusable page/content rendering surfaces. |
| `mdwrk-com` | Thin public site host, mdwrk.com content pack, route metadata, website deployment, DNS/proxy/deploy validation, host-specific SEO/AEO/AiEO content and screenshot evidence. |

## Initial Entity Classification

This classification was produced from the monorepo registry using entity IDs, titles, paths, and relationship IDs. Mixed counts are expected because the monorepo registry often used a single claim, boundary, or release for multiple packages.

| Bucket | Meaning |
| --- | --- |
| `origin` | SSOT-origin ADR/SPEC baseline. Already present in every initialized registry. |
| `core` | Migrates to `mdwrk`. |
| `studio` | Migrates to `mdwrk-studio`. |
| `pages` | Migrates to `mdwrk-pages`. |
| `mdwrk-com` | Migrates to `mdwrk-com`. |
| `mixed:*` | Split into repo-owned entities unless it is only historical context. |
| `history` | Archive under `mdwrk` history; do not make active release proof. |
| `review` | Requires manual classification before copying. |

High-confidence examples:

| Bucket | Examples |
| --- | --- |
| `core` | `adr:1003` renderer/editor package split; `adr:1004` theme token contract; `adr:1030` extension platform; `adr:1068` package CR order; `spc:2095` package change request execution; renderer/editor/extension package tests. |
| `studio` | `adr:1029` desktop app; `adr:1031` responsive UIX; `adr:1034` client shell registry; `adr:1038` PWA version manifest; `adr:1039` OIDC adapter; client/desktop tests and evidence. |
| `pages` | `adr:1000` page template presets; `adr:1055` static lander compiler; `adr:1066` portable page template package boundary; `spc:2090` through `spc:2094`; lander package smoke tests. |
| `mdwrk-com` | `adr:1053` SEO/AEO/AiEO architecture; `adr:1054` article standardization; `adr:1057` JSON-LD graph architecture; `spc:2069`, `spc:2070`, `spc:2072`, `spc:2073`; mdwrk-com host/content tests. |

Mixed examples that should be split:

| Mixed entity | Proposed split |
| --- | --- |
| `bnd:repo-certifiability-p1-current-partials` | Replace with repo-local certifiability boundaries in each split repo. Archive the monorepo boundary in `mdwrk/docs/history/monorepo/`. |
| `clm:portable-lander-package-family` | Move reusable package-family claim to `mdwrk-pages`; add a separate adoption claim in `mdwrk-com` if the website consumes it. |
| `tst:tools-governance-mdwrk-lander-package-suite.test.mjs` | Move to `mdwrk-pages` because the tool and package suite now live there. Do not keep it in `mdwrk`. |
| `tst:tools-governance-mdwrkcom-thin-host.test.mjs` | Move to `mdwrk-com`; keep only a historical reference in `mdwrk` if needed. |
| `tst:packages-shared-structured-data-tests-run-smoke.mjs` | Move to `mdwrk-pages` if structured-data remains in the Pages package suite. |
| `tst:mdwrk-docs-package-owned-documentation` | Keep the package governance version in `mdwrk`; create separate website-doc publication checks only in `mdwrk-com` if needed. |

## Migration Method

1. Keep all four initialized registries valid before adding repo-local entities.
2. Copy origin ADR/SPEC documents only through `ssot init` or `ssot sync`, not by hand.
3. Migrate repo-local ADR/SPEC documents first, grouped by target repo.
4. For each migrated ADR/SPEC, migrate only directly owned features.
5. For each feature, migrate or recreate only local tests, claims, and evidence whose paths exist in the target repo.
6. Split mixed claims/tests/evidence into narrower rows instead of preserving monorepo-wide IDs with invalid paths.
7. Archive monorepo-wide boundaries, releases, and reports under `mdwrk/docs/history/monorepo/ssot/` unless they are still operational in exactly one split repo.
8. Rebuild fresh repo-local boundaries/releases after each repo has valid feature/test/evidence rows.

## Per-Repo Starting Scope

### `mdwrk`

Start with core package architecture and governance:

- Renderer/editor package split and markdown profile features.
- Extension manifest/runtime/host/manager contribution contracts.
- Theme contract, UI token contract, icon catalog, package-owned docs governance.
- Package CR order, release graph, conformance checks, package publish build graph.

Do not retain active Studio/browser/desktop, Pages/lander, or mdwrk-com website evidence in this registry.

### `mdwrk-studio`

Start with app and shell behavior:

- Client shell registry, tabs/project loading, persistence, toasts, settings, OIDC, Git integration.
- Desktop shell, Android shell contract, native filesystem permission model.
- PWA version manifest and browser/Playwright smoke contracts.
- Studio-specific extension UI surfaces that run inside the app.

Do not own reusable extension package contracts unless the package source lives in `mdwrk-studio`.

### `mdwrk-pages`

Start with reusable publishing/page packages:

- Lander core, content contract, SEO, theme, React renderer, structured data.
- Page templates, presets, relationship graph contracts, generated content packs.
- Portable performance budgets, discovery artifact generation, and package-suite governance.

Do not own mdwrk.com route/content assertions except for portable package contracts consumed by that site.

### `mdwrk-com`

Start with host and content assertions:

- Thin host responsibilities and route/content pack importability.
- Website content, metadata, sitemap/canonical/hreflang validation.
- DNS/proxy/deploy checks, screenshot evidence, host performance adapter.
- Site adoption claims for `mdwrk-pages` packages.

Do not own reusable lander package implementation claims.

## Recommended Next Step

Create a migration ledger generated from the monorepo registry with one row per entity:

- `entity_family`
- `entity_id`
- `title`
- `source_path`
- `proposed_owner`
- `action`: `migrate`, `split`, `archive`, `copy-origin`, or `manual-review`
- `reason`
- `blocking_missing_paths`

Then migrate one repo at a time in this order:

1. `mdwrk-pages`, because many mixed mdwrk-com rows depend on portable lander/package ownership.
2. `mdwrk-com`, because website claims should reference already-owned Pages package contracts.
3. `mdwrk-studio`, because app shell rows are mostly path-local and separable.
4. `mdwrk`, because it should finish as the core governance registry with monorepo history archived, not as a dumping ground for mixed rows.

Every migration batch should end with:

```powershell
$env:UV_CACHE_DIR='.tmp\uv-cache'
$env:UV_LINK_MODE='copy'
uv run ssot validate .
```

Do not certify or publish split repo releases from copied monorepo releases. Create fresh boundaries and releases per repo after local evidence paths validate.
