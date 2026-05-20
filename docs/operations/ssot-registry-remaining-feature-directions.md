# SSOT Registry Remaining Feature Directions

Generated after applying the policy that mixed monorepo rows should be split into separate repo-local rows when they can validate with local proof.

These are the remaining feature entities that still need direction because they cannot yet be confidently represented as complete repo-local proof rows.

## Summary

| Action | Proposed owner bucket | Count |
| --- | --- | ---: |
| `manual-review` | `review` | 9 |
| `migrate` | `mdwrk-studio` | 2 |
| `split` | `mixed:studio+core` | 1 |

## Features

| Feature ID | Title | Proposed owner | Candidate repos | Already migrated to | Direction needed |
| --- | --- | --- | --- | --- | --- |
| `feat:docs-text-wrap-previewer` | Document text wrap previewer feature | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:docs-checkbox-autocomplete` | Document checkbox autocomplete feature | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:ssot-registry-model-governance` | SSOT registry model governance | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:ssot-graph-export-governance` | SSOT graph export governance | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:ssot-release-snapshot-reports` | SSOT release snapshot reports | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:repo-governance-validation` | Repository governance validation | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:spec-coverage-index` | SPEC coverage index | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:browser-e2e-conformance-matrix` | Browser E2E conformance matrix | `mixed:studio+core` | `mdwrk-studio`, `mdwrk` | none | Split policy is known, but no target repo currently has enough local proof to carry this row. |
| `feat:shell-evidence-matrix` | Shell evidence matrix | `mdwrk-studio` | none | none | Single-owner row still lacks enough local proof closure, local paths, or imported dependencies to migrate safely. |
| `feat:uix-responsive-layout-matrix` | UIX responsive layout matrix | `mdwrk-studio` | none | none | Single-owner row still lacks enough local proof closure, local paths, or imported dependencies to migrate safely. |
| `feat:repository-top-level-hygiene` | Repository top-level hygiene | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |
| `feat:mdwrk-scoped-agent-ownership-instructions` | MdWrk scoped agent ownership instructions | `review` | none | none | No single owner is clear from the entity ID, title, path, or links. |

