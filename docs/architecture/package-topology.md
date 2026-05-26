# Package topology

Date: 2026-05-26

## Decision summary

The repository is a root npm workspace with explicit package, documentation, artifact, and example boundaries.
Examples compose packages; packages do not depend on applications.

## Current repository structure

```text
mdwrk/
  package.json
  package-lock.json
  tsconfig.base.json
  .changeset/
  .github/
  docs/
  packages/
    shared/
      ui-tokens/
      icons/
      testing/
    renderer/
      markdown-renderer-core/
      markdown-renderer-react/
    editor/
      markdown-editor-core/
      markdown-editor-react/
      markdown-edit-in-renderer-react/
  examples/
    editor-basic/
    renderer-basic/
    editor-demo/
    previewer-demo/
    edit-in-renderer-demo/
    ui-tokens-demo/
  tools/
  artifacts/
```

## Package families

### Shared
Cross-cutting primitives that remain app-agnostic.

- `@mdwrk/ui-tokens`
- `@mdwrk/icons`
- `@mdwrk/testing`

### Renderer
Portable markdown rendering packages.

- `@mdwrk/markdown-renderer-core`
- `@mdwrk/markdown-renderer-react`

### Editor
Portable markdown editing packages.

- `@mdwrk/markdown-editor-core`
- `@mdwrk/markdown-editor-react`
- `@mdwrk/markdown-edit-in-renderer-react`

### Examples
Validation and demo packages.

- `@mdwrk/example-editor-basic`
- `@mdwrk/example-renderer-basic`
- `@mdwrk/example-editor-demo`
- `@mdwrk/example-previewer-demo`
- `@mdwrk/example-edit-in-renderer-demo`
- `@mdwrk/example-ui-tokens-demo`

## Sibling ownership

These families are intentionally owned outside this repo:

- `mdwrk-studio` owns `@mdwrk/extension-manifest`, `@mdwrk/extension-host`, `@mdwrk/theme-contract`, and the non-theme first-party extensions
- `mdwrk-themes` owns `@mdwrk/theme-draft`, `@mdwrk/theme-preview`, `@mdwrk/theme-diagnostics`, `@mdwrk/theme-presets`, `@mdwrk/theme-export`, `@mdwrk/theme-specimens`, and `@mdwrk/extension-theme-studio`

## Naming rules

### npm scope
All workspace packages use the npm scope:

- `@mdwrk/*`

### Path naming
Use lowercase kebab-case for package directories.

Examples:
- `packages/editor/markdown-edit-in-renderer-react`
- `packages/renderer/markdown-renderer-react`

### Extension ids
Extension ids are stable dot-separated identifiers independent of folder names.

Examples that still exist in sibling repos:
- `core.workspace-files`
- `core.git-ops`
- `core.extension-manager`
- `core.gemini-agent`
- `core.theme-studio`

## Ownership rules

- `packages/shared/*` own reusable primitives
- `packages/renderer/*` own markdown rendering
- `packages/editor/*` own markdown editing
- `examples/*` own validation/demo surfaces only
- sibling repos own contracts, themes, and studio extensions

## Import rules

### Allowed
- package -> package within allowed lower layers
- examples -> packages

### Forbidden
- package -> app
- renderer/editor packages importing from studio app internals
- shared packages importing from apps

## Current-state note

The release-ownership and promotion details for these package families are frozen separately in `docs/operations/release-groups.md`.
