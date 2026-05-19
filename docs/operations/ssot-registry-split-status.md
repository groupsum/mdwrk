# SSOT Registry Split Status

Date: 2026-05-19

## Imported Batches

| Repository | ADRs | SPECs | Features | Claims | Tests | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `mdwrk` | 11 | 1 | 0 | 0 | 0 | 0 |
| `mdwrk-studio` | 18 | 18 | 3 | 3 | 3 | 3 |
| `mdwrk-pages` | 8 | 5 | 0 | 0 | 0 | 0 |
| `mdwrk-com` | 3 | 2 | 0 | 0 | 0 | 0 |

## Direct Owner Ledger Work

| Repository | High-confidence migrate rows |
| --- | ---: |
| `mdwrk` | 66 |
| `mdwrk-studio` | 221 |
| `mdwrk-pages` | 247 |
| `mdwrk-com` | 18 |

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

