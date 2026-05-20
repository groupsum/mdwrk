# SSOT Registry Split Status

Date: 2026-05-19

## Imported Batches

| Repository | Owned ADRs | Supporting ADRs | SPECs | Features | Claims | Tests | Evidence | Profiles | Boundaries | Issues |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `mdwrk` | 15 | 32 | 56 | 102 | 24 | 20 | 20 | 5 | 7 | 1 |
| `mdwrk-studio` | 30 | 28 | 92 | 142 | 29 | 41 | 41 | 2 | 13 | 0 |
| `mdwrk-pages` | 19 | 18 | 43 | 176 | 26 | 47 | 9 | 0 | 5 | 2 |
| `mdwrk-com` | 9 | 22 | 32 | 27 | 20 | 10 | 8 | 1 | 7 | 2 |

## Direct Owner Ledger Work

| Repository | High-confidence migrate rows |
| --- | ---: |
| `mdwrk` | 66 |
| `mdwrk-studio` | 221 |
| `mdwrk-pages` | 247 |
| `mdwrk-com` | 18 |

## Remaining Direct Owner Rows

| Repository | Remaining rows | Remaining families |
| --- | ---: | --- |
| `mdwrk` | 22 | features: 3, claims: 2, tests: 13, evidence: 3, boundaries: 1 |
| `mdwrk-studio` | 12 | specs: 1, features: 7, claims: 1, boundaries: 1, issues: 2 |
| `mdwrk-pages` | 99 | features: 2, claims: 95, boundaries: 2 |
| `mdwrk-com` | 4 | features: 3, tests: 1 |

## Unresolved Global Queues

| Action | Proposed owner bucket | Count |
| --- | --- | ---: |
| `archive` | `history` | 15 |
| `manual-review` | `review` | 66 |
| `split` | `mixed:mdwrk-com+core` | 2 |
| `split` | `mixed:mdwrk-com+pages` | 271 |
| `split` | `mixed:mdwrk-com+pages+core` | 2 |
| `split` | `mixed:mdwrk-com+pages+studio` | 117 |
| `split` | `mixed:mdwrk-com+pages+studio+core` | 6 |
| `split` | `mixed:mdwrk-com+studio` | 10 |
| `split` | `mixed:mdwrk-com+studio+core` | 4 |
| `split` | `mixed:pages+core` | 5 |
| `split` | `mixed:pages+studio` | 32 |
| `split` | `mixed:pages+studio+core` | 3 |
| `split` | `mixed:studio+core` | 233 |

Rows marked `split`, `manual-review`, or `archive` are intentionally not imported as active proof yet.

