# SSOT Registry Split Status

Date: 2026-05-19

## Imported Batches

| Repository | Owned ADRs | Supporting ADRs | SPECs | Features | Claims | Tests | Evidence | Profiles | Boundaries | Issues |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `mdwrk` | 11 | 16 | 15 | 29 | 15 | 9 | 9 | 5 | 6 | 1 |
| `mdwrk-studio` | 18 | 15 | 45 | 97 | 28 | 39 | 39 | 2 | 12 | 0 |
| `mdwrk-pages` | 8 | 14 | 19 | 154 | 7 | 45 | 8 | 0 | 3 | 1 |
| `mdwrk-com` | 3 | 9 | 10 | 2 | 3 | 2 | 2 | 0 | 4 | 1 |

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
| `mdwrk-pages` | 100 | features: 2, claims: 95, tests: 1, boundaries: 2 |
| `mdwrk-com` | 6 | features: 3, tests: 2, evidence: 1 |

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

