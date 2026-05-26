# MdWrk

Core MdWrk package platform.

This repo owns the reusable markdown rendering, editing, and shared primitive packages consumed by MdWrk Studio, MdWrk Pages, mdwrk.com, and downstream package users.

## Package Families

- `packages/renderer` contains portable markdown rendering packages.
- `packages/editor` contains portable markdown editing packages.
- `packages/shared` contains app-agnostic primitives.
- `examples` validates package consumption outside first-party apps.

## Commands

```bash
npm install
npm run build
npm run typecheck
npm run test
```

## Split Boundary

This repo intentionally does not own the Studio app, the theme package family, Pages suite, or mdwrk.com site host. Those live in sibling repos:

- `mdwrk-studio`
- `mdwrk-themes`
- `mdwrk-pages`
- `mdwrkcom`
