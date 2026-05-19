# SSOT Registry Split Status

Date: 2026-05-19

## Imported Batches

| Repository | Owned ADRs | Supporting ADRs | SPECs | Features | Claims | Tests | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `mdwrk` | 11 | 16 | 15 | 1 | 1 | 1 | 1 |
| `mdwrk-studio` | 18 | 15 | 45 | 35 | 16 | 21 | 21 |
| `mdwrk-pages` | 8 | 14 | 19 | 53 | 6 | 40 | 6 |
| `mdwrk-com` | 3 | 9 | 10 | 0 | 0 | 0 | 0 |

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
| `mdwrk` | 42 | features: 14, claims: 8, tests: 13, evidence: 3, boundaries: 3, profiles: 1 |
| `mdwrk-studio` | 82 | specs: 1, features: 45, claims: 1, tests: 11, evidence: 14, boundaries: 8, issues: 2 |
| `mdwrk-pages` | 119 | features: 14, claims: 95, tests: 4, evidence: 1, boundaries: 4, issues: 1 |
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

