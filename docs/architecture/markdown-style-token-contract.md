# Markdown, Lander, and Site Style Token Contract

This document records how MdWrk style ownership is split across plain Markdown rendering, reusable lander rendering, and site-specific presentation. It is intended for site repos such as `mdwrk-com`, `groupsum-xyz`, and `swarmauri-com`, and for package work in `markdown_workspace`.

## Ownership Summary

| Level | Owner | Primary files | Scope |
| --- | --- | --- | --- |
| Plain Markdown tokens and selectors | `@mdwrk/ui-tokens` | `packages/shared/ui-tokens/src/styles/root.css`, `packages/shared/ui-tokens/src/styles/markdown.css` | Generic Markdown surfaces such as MdWrk workspace preview and renderer output |
| Markdown React renderer compatibility | `@mdwrk/markdown-renderer-react` | `packages/renderer/markdown-renderer-react/src/styles/default.css` | React renderer wrapper, `.markdown-body`, and `--mw-*` bridge variables |
| Markdown editor React styles | `@mdwrk/markdown-editor-react` | `packages/editor/markdown-editor-react/src/styles/default.css` | Source editor surface, gutter, textarea, editor layout, and `--mwe-*` bridge variables |
| Reusable lander tokens and default lander classes | `@mdwrk/lander-theme` | `packages/lander/lander-theme/src/styles/default.css` when present in a checkout, or package export `@mdwrk/lander-theme/styles/default.css` | Portable lander pages and lander-react components |
| Site-specific values and layout | Site app | Example: `apps/mdwrkcom/styles/base.css`, `apps/mdwrkcom/styles/components.css`, `apps/mdwrkcom/styles/markdown-renderer.css` | Product/site identity, app shell, nav/footer, route layout, and site-to-package token bridges |

Do not collapse these layers into one CSS file unless the app is intentionally small. The useful split is:

```text
plain markdown contract -> @mdwrk/ui-tokens + @mdwrk/markdown-renderer-react
markdown editor contract -> @mdwrk/ui-tokens + @mdwrk/markdown-editor-react
lander contract          -> @mdwrk/lander-theme
site identity            -> site-local CSS values and components
```

## MdWrk.com Import Order

`apps/mdwrkcom/styles/index.tsx` demonstrates the intended layering:

```ts
import './tailwind.css';
import '@mdwrk/lander-theme/styles/default.css';
import './base.css';
import './components.css';
import './markdown-renderer.css';
```

The ordering matters:

1. Tailwind utilities are loaded first.
2. Lander package defaults establish reusable `--lander-*` tokens and lander classes.
3. Site base styles set global body/root behavior.
4. Site components define product-specific app, page, nav, footer, and section styling.
5. Markdown renderer styles bridge generic Markdown output into the site visual system.

## Plain Markdown Token Contract

Plain Markdown uses `.markdown-body`, not `.lander-markdown`.

The package-owned source is:

```text
packages/shared/ui-tokens/src/styles/root.css
packages/shared/ui-tokens/src/styles/markdown.css
packages/renderer/markdown-renderer-react/src/styles/default.css
```

These tokens are generic and should be valid in the MdWrk workspace, preview pane, exported HTML, docs surfaces, and any renderer consumer.

### Package-owned core UI tokens

```css
--ui-scale
--font-ui
--font-head
--font-mono
--fg-primary
--fg-secondary
--fg-muted
--bg-panel
--bg-inset
--border-color
--border-width
--accent
```

### Studio-owned shell and layout tokens

These belong in `mdwrk-studio`, not in `@mdwrk/ui-tokens`.

```css
--bg-app
--status-ok
--status-warn
--status-error
--app-gap
--header-height
--status-height
--sidebar-width
--rail-width
--rail-height
--rail-btn-size
--mobile-rail-expanded-width
--mobile-expandable-rail-width
--panel-header-height
--tab-height
--texture-opacity
```

### Editor and Markdown Rhythm Tokens

```css
--editor-padding
--editor-line-height
--editor-line-rhythm
--line-number-gutter-width
--file-indent-base
--file-indent-unit
--markdown-line-height
--markdown-heading-line-height
```

### Table Tokens

```css
--table-header-bg
--table-header-fg
--table-row-primary-bg
--table-row-secondary-bg
```

### PDF and Print Tokens

```css
--pdf-page-size
--pdf-page-margin-block
--pdf-page-margin-inline
--pdf-content-font-size
--pdf-content-line-height
--pdf-heading-keep-with-next
```

### Explorer Tokens

```css
--c-explorer-hover
--c-explorer-selected
--c-explorer-selected-text
--c-explorer-drag-bg
```

## Plain Markdown Selector Contract

These selectors define what "just Markdown" looks like in the MdWrk workspace and renderer output.

### Wrapper

```css
.markdown-body
```

Controls:

```css
--font-ui
--markdown-line-height
--fg-primary
--ui-scale
```

### Headings

```css
.markdown-body h1
.markdown-body h2
.markdown-body h3
.markdown-body h4
.markdown-body h5
.markdown-body h6
```

Controls:

```css
--font-head
--fg-primary
--fg-muted
--markdown-heading-line-height
--border-color
--ui-scale
```

Current generic heading behavior includes:

- `h1` has a bottom border.
- `h5` and `h6` are uppercase with increased letter spacing.
- `h6` uses muted foreground.

### Paragraphs and Inline Text

```css
.markdown-body p
.markdown-body strong
.markdown-body em
.markdown-body u
.markdown-body ins
.markdown-body del
```

Controls:

```css
--fg-primary
--fg-secondary
--fg-muted
```

### Lists

```css
.markdown-body ul
.markdown-body ol
.markdown-body li
.markdown-body li > p
.markdown-body ul ul
.markdown-body ul ol
.markdown-body ol ul
.markdown-body ol ol
.markdown-body li::marker
.markdown-body li[data-has-nested-list="true"]::marker
```

Nested list variants:

```css
.markdown-body ul ul
.markdown-body ul ul ul
.markdown-body ol ol
.markdown-body ol ol ol
```

Task lists:

```css
.markdown-body .md-task-list-item
.markdown-body .md-task-list-item > .md-checkbox
.markdown-body .md-task-list-item > input[type="checkbox"]
.markdown-body .md-checkbox
.markdown-body input[type="checkbox"]
```

Controls:

```css
--fg-muted
--accent
```

### Links

```css
.markdown-body a
.markdown-body a:visited
.markdown-body a:hover
.markdown-body a:focus-visible
.markdown-body a::selection
```

Controls:

```css
--accent
--fg-secondary
--fg-primary
--bg-panel
```

### Inline Code and Code Blocks

```css
.markdown-body code
.markdown-body pre
.markdown-body pre code
.markdown-body pre > div
.markdown-body .md-inline-code
.markdown-body .md-code-block
.markdown-body .md-code-header
.markdown-body .md-code-surface
.markdown-body .md-code-surface pre
.markdown-body .md-code-surface pre > code
.markdown-body .md-code-surface > div
```

Controls:

```css
--font-mono
--bg-inset
--bg-panel
--border-color
--fg-secondary
--ui-scale
--code-block-bg
```

The React renderer also accepts renderer-specific bridge variables:

```css
--mw-code-bg
--mw-code-fg
--mw-code-border
--mw-fg-primary
--mw-font-ui
--mw-line-height
--mw-heading-line-height
```

### Blockquotes and Rules

```css
.markdown-body blockquote
.markdown-body hr
```

Controls:

```css
--accent
--fg-muted
--border-color
```

### Images and Figures

```css
.markdown-body img
.markdown-body figure
.markdown-body figcaption
```

Controls:

```css
--fg-muted
--ui-scale
```

### Tables

```css
.markdown-body table
.markdown-body .md-table
.markdown-body th
.markdown-body td
.markdown-body .md-table-header
.markdown-body .md-table-cell
.markdown-body caption
.markdown-body .md-table-caption
.markdown-body thead th
.markdown-body .md-table-head .md-table-header
.markdown-body tbody tr:nth-child(even)
.markdown-body tbody tr:nth-child(odd)
.markdown-body .md-table-body .md-table-row:nth-child(even)
.markdown-body .md-table-body .md-table-row:nth-child(odd)
```

Controls:

```css
--border-color
--table-header-bg
--table-header-fg
--table-row-primary-bg
--table-row-secondary-bg
--fg-secondary
```

### Footnotes

```css
.markdown-body .md-footnote-reference
.markdown-body .md-footnotes
.markdown-body .md-footnotes ol
.markdown-body .md-footnote-backlink
```

Controls:

```css
--border-color
--fg-secondary
--ui-scale
```

### Definition Lists

```css
.markdown-body .md-definition-list
.markdown-body .md-definition-term
.markdown-body .md-definition-description
.markdown-body .md-definition-description > *:first-child
```

### Math

```css
.markdown-body .md-math-inline
.markdown-body .md-math-inline code
.markdown-body .md-math-block
.markdown-body .md-math-block code
.markdown-body .md-math-block pre
```

Controls:

```css
--font-mono
--accent
--border-color
--bg-inset
```

### Citations

```css
.markdown-body .md-citation
```

Controls:

```css
--fg-secondary
```

### Print Hooks

```css
.markdown-body .page-break
.markdown-body [data-page-break="always"]
.markdown-body hr.md-page-break
.markdown-body [data-break-before="page"]
.markdown-body [data-break-after="page"]
.markdown-body [data-break-inside="avoid"]
```

Controls:

```css
--pdf-content-font-size
--pdf-content-line-height
--pdf-heading-keep-with-next
```

## Markdown Editor React Contract

The editor package owns the source editing surface:

```text
packages/editor/markdown-editor-react/src/styles/default.css
```

Selectors:

```css
.mw-editor
.mw-editor-layout
.mw-editor-gutter
.mw-editor-line-number
.mw-editor-textarea
.mw-editor-textarea--nowrap
.editor-textarea--nowrap
```

Package bridge tokens:

```css
--mwe-font-mono
--mwe-font-size
--mwe-line-height
--mwe-editor-padding
--mwe-gutter-width
--mwe-bg-surface
--mwe-bg-gutter
--mwe-fg-primary
--mwe-fg-muted
--mwe-border-color
--mwe-accent
--nowrap
```

Fallbacks come from generic tokens:

```css
--font-mono
--bg-panel
--bg-inset
--fg-primary
--fg-muted
--border-color
--accent
--editor-line-height
--editor-line-rhythm
--editor-padding
```

## Reusable Lander Token Contract

The reusable lander level is separate from plain Markdown. It is used for marketing/documentation lander pages and reusable lander-react components.

Package export:

```ts
import '@mdwrk/lander-theme/styles/default.css';
```

Token names:

```css
--lander-bg
--lander-app-bg
--lander-panel
--lander-panel-muted
--lander-surface
--lander-nav-bg
--lander-fg
--lander-fg-muted
--lander-fg-subtle
--lander-heading-fg
--lander-border
--lander-border-strong
--lander-accent
--lander-accent-strong
--lander-accent-alt
--lander-accent-soft
--lander-success
--lander-success-strong
--lander-selection-fg
--lander-radius
--lander-max-width
--lander-shadow
```

Default reusable lander selectors include:

```css
.lander-page
.lander-page__inner
.lander-page__section
.lander-page__hero
.lander-page__eyebrow
.lander-page__muted
.lander-page__title
.lander-page__intro
.lander-page__grid
.lander-page__card
.lander-page__panel
.lander-page__button-row
.lander-page__button
.lander-page__button--primary
.lander-page__comparison
.navbar-inner
.navbar-brand
.navbar-actions
.navbar-menu-panel
.navbar-menu-list
.navbar-link
```

## Lander Markdown Bridge

MdWrk.com also has a site-local bridge for Markdown content rendered inside lander pages:

```text
apps/mdwrkcom/styles/markdown-renderer.css
```

This layer scopes to:

```css
.lander-markdown
.lander-markdown .markdown-body
```

It maps plain Markdown concepts into the lander visual system using bridge tokens:

```css
--lander-markdown-link-visited
--lander-markdown-code-bg
--lander-markdown-code-fg
--lander-markdown-code-border
--lander-markdown-table-header-bg
--lander-markdown-table-header-fg
--lander-markdown-table-row-alt
--lander-markdown-quote-bg
--lander-code-bg
--lander-code-fg
--lander-code-border
--lander-inline-code-bg
--lander-inline-code-fg
--lander-syntax-comment
--lander-syntax-keyword
--lander-syntax-string
--lander-syntax-number
--lander-syntax-function
--lander-syntax-operator
--lander-syntax-tag
```

This bridge should not replace the plain `.markdown-body` contract. It is a site-level adaptation used when rendered Markdown appears inside a lander page.

## Guidance for Site Repos

For `groupsum-xyz` and `swarmauri-com`, the desired split is:

```text
src/styles/index.ts      imports all style layers
src/site.css             site shell, navbar, footer, route layout
src/markdown.css         .markdown-body and optional .lander-markdown bridge
@mdwrk/lander-theme      reusable lander tokens and classes
@mdwrk/ui-tokens         plain Markdown and package-owned renderer/editor token base
@mdwrk/theme-contract    combined Studio workspace contract
```

Site CSS should prefer package tokens over raw values:

```css
color: var(--lander-fg);
background: var(--lander-app-bg);
border-color: var(--lander-border);
```

Markdown CSS should prefer generic Markdown tokens:

```css
color: var(--fg-primary);
background: var(--bg-panel);
border-color: var(--border-color);
line-height: var(--markdown-line-height);
```

When Markdown is intentionally presented inside a lander page, bridge from lander tokens into Markdown tokens:

```css
.lander-markdown {
  --fg-primary: var(--lander-fg);
  --fg-secondary: var(--lander-fg-subtle);
  --fg-muted: var(--lander-fg-muted);
  --bg-panel: var(--lander-panel);
  --bg-inset: var(--lander-panel-muted);
  --border-color: var(--lander-border);
  --accent: var(--lander-accent);
}
```

Do not style imported Markdown/HTML articles only through ad hoc `.article-content h1`, `.article-content table`, and `.article-content code` rules. Prefer wrapping them in a Markdown-compatible scope and mapping the scope to package-owned tokens.
