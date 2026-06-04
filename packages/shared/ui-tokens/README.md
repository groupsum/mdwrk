# @mdwrk/ui-tokens

**Shared token defaults and class helpers**

<p align="center">
  <a href="https://github.com/groupsum/mdwrk/blob/master/packages/shared/ui-tokens/README.md"><img alt="Hits" src="https://visitor-badge.laobi.icu/badge?page_id=groupsum.mdwrk.packages_shared_ui_tokens_README&amp;left_text=hits" /></a>
  <a href="https://www.npmjs.com/package/@mdwrk/ui-tokens"><img alt="Downloads" src="https://img.shields.io/npm/dm/%40mdwrk%2Fui-tokens?label=downloads" /></a>
  <a href="../../../package.json"><img alt="Node" src="https://img.shields.io/badge/node-20.x%20%7C%2021.x%20%7C%2022.x-339933?logo=node.js&amp;logoColor=white" /></a>
  <a href="../../../LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" /></a>
</p>

This package exposes the shared MdWrk markdown-package token defaults, markdown class contracts, bridge variables, and CSS custom-property helpers used by the portable markdown, renderer, and editor packages.

## Why
Use it when you need the package-owned markdown token, class-name, and renderer/editor bridge contract directly without importing the full theme authoring surface.

## What
- Stable token names and defaults.
- Stable markdown class names and renderer/editor bridge definitions.
- CSS custom-property lists for the shared UI contract.
- CSS defaults for markdown, renderer, and editor surfaces only.
- Studio shell and application-chassis tokens now live in `mdwrk-studio` and should be consumed there through the studio-owned token package and `@mdwrk/theme-contract`.

## Installation
Node.js 20.x through 22.x, matching the workspace engine contract in the root package manifest.

```bash
npm install @mdwrk/ui-tokens
```

## Usage
```ts
import { MARKDOWN_PACKAGE_TOKEN_DEFAULTS } from "@mdwrk/ui-tokens";

console.log(MARKDOWN_PACKAGE_TOKEN_DEFAULTS["bg-panel"]);
```

## Surface
- Theme bridge helpers now cover `renderer`, `editor`, `html`, and `pdf` targets.
- Use `createHtmlThemeBridgeVariableRecord()` and `createPdfThemeBridgeVariableRecord()` when exporting HTML or PDF-specific token bridges.
- The bridge inventory continues to expose applicability through stable CSS custom-property contracts rather than app-shell selectors.

## Related
- [Packages index](../../README.md) - family and package navigation
- [Root README](../../../README.md) - repo overview

