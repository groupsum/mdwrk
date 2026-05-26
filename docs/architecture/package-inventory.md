# Package inventory

Date: 2026-05-26

This inventory reflects the current `mdwrk` repo package topology after the repo split. It is descriptive inventory only.
For release ownership, SemVer policy, compatibility declarations, and promotion paths, use `docs/operations/release-groups.md`.

## Shared packages

| Path | Package name | Kind | Publishable | Status |
|---|---|---|---|---|
| `packages/shared/ui-tokens/` | `@mdwrk/ui-tokens` | shared | yes | implemented |
| `packages/shared/icons/` | `@mdwrk/icons` | shared | yes | implemented |
| `packages/shared/testing/` | `@mdwrk/testing` | shared | yes | implemented |

## Renderer packages

| Path | Package name | Kind | Publishable | Status |
|---|---|---|---|---|
| `packages/renderer/markdown-renderer-core/` | `@mdwrk/markdown-renderer-core` | renderer | yes | implemented |
| `packages/renderer/markdown-renderer-react/` | `@mdwrk/markdown-renderer-react` | renderer | yes | implemented |

## Editor packages

| Path | Package name | Kind | Publishable | Status |
|---|---|---|---|---|
| `packages/editor/markdown-editor-core/` | `@mdwrk/markdown-editor-core` | editor | yes | implemented |
| `packages/editor/markdown-editor-react/` | `@mdwrk/markdown-editor-react` | editor | yes | implemented |
| `packages/editor/markdown-edit-in-renderer-react/` | `@mdwrk/markdown-edit-in-renderer-react` | editor | yes | implemented |

## Example packages

| Path | Package name | Kind | Publishable | Status |
|---|---|---|---|---|
| `examples/editor-basic/` | `@mdwrk/example-editor-basic` | example | no | implemented |
| `examples/renderer-basic/` | `@mdwrk/example-renderer-basic` | example | no | implemented |
| `examples/editor-demo/` | `@mdwrk/example-editor-demo` | example | no | implemented |
| `examples/previewer-demo/` | `@mdwrk/example-previewer-demo` | example | no | implemented |
| `examples/edit-in-renderer-demo/` | `@mdwrk/example-edit-in-renderer-demo` | example | no | implemented |
| `examples/ui-tokens-demo/` | `@mdwrk/example-ui-tokens-demo` | example | no | implemented |

## Repo boundary note

The following package families no longer live in this repo:

- contracts -> `mdwrk-studio`
- studio extensions -> `mdwrk-studio`
- theme packages and `extension-theme-studio` -> `mdwrk-themes`

## Inventory observations

- the repo now contains only the portable renderer, editor, shared primitive, and example/demo package families
- markdown token, class, and bridge declarations live in `@mdwrk/ui-tokens` here, while `@mdwrk/theme-contract` in `mdwrk-studio` re-exports that markdown-facing contract
- examples continue validating package consumption against sibling `mdwrk-studio` and `mdwrk-themes` packages through workspace-link preparation
