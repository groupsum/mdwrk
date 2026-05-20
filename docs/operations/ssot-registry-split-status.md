# SSOT Registry Split Status

Date: 2026-05-19

## Imported Batches

| Repository | Owned ADRs | Supporting ADRs | SPECs | Features | Claims | Tests | Evidence | Profiles | Boundaries | Issues |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `mdwrk` | 15 | 34 | 58 | 144 | 24 | 20 | 20 | 5 | 8 | 1 |
| `mdwrk-studio` | 30 | 30 | 93 | 299 | 29 | 41 | 41 | 4 | 18 | 3 |
| `mdwrk-pages` | 19 | 18 | 44 | 317 | 26 | 47 | 9 | 1 | 16 | 3 |
| `mdwrk-com` | 9 | 22 | 33 | 244 | 20 | 10 | 8 | 1 | 13 | 2 |

## Proof Policy Pass

The latest pass keeps feature scope rows in the owning split repo, but only keeps monorepo claims, tests, and evidence when the local target path and tier proof validate in that repo. Proofless rows are moved to `implementation_status: absent` and `plan.horizon: backlog` so split-repo proof artifacts and certifications can be regenerated without carrying stale monorepo certification state.

| Repository | Proof-backed implemented features | Features needing new local proof | Out-of-bounds features |
| --- | ---: | ---: | ---: |
| `mdwrk` | 102 | 42 | 0 |
| `mdwrk-studio` | 139 | 154 | 0 |
| `mdwrk-pages` | 176 | 139 | 2 |
| `mdwrk-com` | 27 | 215 | 2 |

## Direct Owner Ledger Work

| Repository | High-confidence migrate rows |
| --- | ---: |
| `mdwrk` | 68 |
| `mdwrk-studio` | 221 |
| `mdwrk-pages` | 247 |
| `mdwrk-com` | 18 |

## Remaining Direct Owner Rows

| Repository | Remaining rows | Remaining families |
| --- | ---: | --- |
| `mdwrk` | 18 | claims: 2, tests: 13, evidence: 3 |
| `mdwrk-studio` | 1 | claims: 1 |
| `mdwrk-pages` | 95 | claims: 95 |
| `mdwrk-com` | 1 | tests: 1 |

## Unresolved Global Queues

| Action | Proposed owner bucket | Count |
| --- | --- | ---: |
| `archive` | `history` | 15 |
| `manual-review` | `review` | 57 |
| `split` | `mixed:mdwrk-com+core` | 2 |
| `split` | `mixed:mdwrk-com+pages` | 271 |
| `split` | `mixed:mdwrk-com+pages+core` | 2 |
| `split` | `mixed:mdwrk-com+pages+studio` | 117 |
| `split` | `mixed:mdwrk-com+pages+studio+core` | 7 |
| `split` | `mixed:mdwrk-com+studio` | 10 |
| `split` | `mixed:mdwrk-com+studio+core` | 4 |
| `split` | `mixed:pages+core` | 5 |
| `split` | `mixed:pages+studio` | 32 |
| `split` | `mixed:pages+studio+core` | 3 |
| `split` | `mixed:studio+core` | 233 |

Rows marked `split`, `manual-review`, or `archive` are intentionally not imported as active proof yet.

