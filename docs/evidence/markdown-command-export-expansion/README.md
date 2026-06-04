# Markdown Command + Export Expansion Evidence

This artifact set captures the affected MdWrk markdown example surfaces for the command/export expansion tranche.

## Scope

- Themes: `default-light`, `default-dark`, `paper`
- Views:
  - editor surface
  - preview surface
  - edit-in-renderer surface
- Modes:
  - editor editing
  - editor command palette
  - preview rendering
  - edit-in-renderer editing + preview
- Viewport bands:
  - `wide` for desktop/precision validation
  - `portrait` for mobile/touch-oriented validation

## Files

- `manifest.json` is the machine-readable proof index.
- `*.png` files are browser-captured screenshots from the live example demos.

## Verification

Run:

```bash
node tools/governance/validate-markdown-command-export-screenshot-manifest.mjs
```

The validator checks expected theme x view x mode x viewport coverage and confirms the referenced PNG artifacts exist.
