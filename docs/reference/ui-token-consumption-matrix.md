# UI Token Consumption Matrix

This document is the complete current `mdwrk` UI-token matrix for the Markdown surfaces.

It includes:

- package token identifiers such as `bg-panel`
- direct markdown CSS token names such as `--bg-panel`
- bridge tokens such as `--mw-bg-surface` and `--mwe-bg-surface`

## Legend

- `Owner`
  - `@mdwrk/ui-tokens` means the token is declared in the shared package contract.

- Surface cells
  - `🧩 direct` means the surface consumes the token directly in package CSS.
  - `🔁 bridge` means the surface consumes the token through a published bridge variable.
  - `📦 source` means the row is a package token source that feeds one or more bridge rows.
  - `⚪ none` means that token is not a first-class token for that surface.

## Matrix

| Token | Kind | Owner | Editor | Previewer | Edit-in-renderer |
| --- | --- | --- | --- | --- | --- |
| `ui-scale` / `--ui-scale` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `bg-panel` / `--bg-panel` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `📦 source` | `🧩 direct` |
| `bg-inset` / `--bg-inset` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `⚪ none` | `🧩 direct` |
| `border-color` / `--border-color` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `📦 source` | `🧩 direct` |
| `border-width` / `--border-width` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `fg-primary` / `--fg-primary` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `📦 source` | `🧩 direct` |
| `fg-secondary` / `--fg-secondary` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `fg-muted` / `--fg-muted` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `⚪ none` | `🧩 direct` |
| `accent` / `--accent` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `📦 source` | `🧩 direct` |
| `code-inline-bg` / `--code-inline-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-inline-fg` / `--code-inline-fg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-block-bg` / `--code-block-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-block-fg` / `--code-block-fg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-header-bg` / `--code-header-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-header-fg` / `--code-header-fg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-language-bg` / `--code-language-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `code-language-fg` / `--code-language-fg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `table-header-bg` / `--table-header-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `table-header-fg` / `--table-header-fg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `table-header-border-color` / `--table-header-border-color` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `⚪ none` |
| `table-row-primary-bg` / `--table-row-primary-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `table-row-secondary-bg` / `--table-row-secondary-bg` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `editor-padding` / `--editor-padding` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `⚪ none` | `⚪ none` |
| `editor-line-height` / `--editor-line-height` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `editor-line-rhythm` / `--editor-line-rhythm` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `⚪ none` | `⚪ none` |
| `markdown-line-height` / `--markdown-line-height` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `⚪ none` |
| `markdown-heading-line-height` / `--markdown-heading-line-height` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `⚪ none` |
| `pdf-page-size` / `--pdf-page-size` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `pdf-page-margin-block` / `--pdf-page-margin-block` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `pdf-page-margin-inline` / `--pdf-page-margin-inline` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `pdf-content-font-size` / `--pdf-content-font-size` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `pdf-content-line-height` / `--pdf-content-line-height` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `pdf-heading-keep-with-next` / `--pdf-heading-keep-with-next` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `line-number-gutter-width` / `--line-number-gutter-width` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `⚪ none` | `⚪ none` |
| `editor-content-width` / `--editor-content-width` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `📦 source` | `⚪ none` |
| `font-ui` / `--font-ui` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `📦 source` | `🧩 direct` |
| `font-mono` / `--font-mono` | package + md | `@mdwrk/ui-tokens` | `📦 source` | `📦 source` | `🧩 direct` |
| `font-head` / `--font-head` | package + md | `@mdwrk/ui-tokens` | `⚪ none` | `⚪ none` | `⚪ none` |
| `--mwe-bg-surface` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-bg-gutter` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-border-color` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-fg-primary` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-fg-muted` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-accent` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-font-mono` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-editor-padding` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-line-height` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-gutter-width` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mwe-content-width` | bridge | `@mdwrk/ui-tokens` | `🔁 bridge` | `⚪ none` | `⚪ none` |
| `--mw-fg-primary` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-fg-secondary` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-bg-surface` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-border-color` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-accent` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-inline-bg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-inline-fg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-block-bg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-block-fg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-header-bg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-header-fg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-language-bg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-code-language-fg` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-font-ui` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-font-mono` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-line-height` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-heading-line-height` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |
| `--mw-content-width` | bridge | `@mdwrk/ui-tokens` | `⚪ none` | `🔁 bridge` | `⚪ none` |

## Markdown helper class matrix

Legend for class rows:

- `🧩 direct` means the surface emits or styles that helper class directly.
- `⚪ none` means the class is not part of that surface's first-class package contract.

| Class | Selector | Group | Stability | Owner | Editor | Previewer | Edit-in-renderer |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `markdown-body` | `.markdown-body` | `scope` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `⚪ none` |
| `md-h1` | `.md-h1` | `heading` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-h2` | `.md-h2` | `heading` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-h3` | `.md-h3` | `heading` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-h4` | `.md-h4` | `heading` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-h5` | `.md-h5` | `heading` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-h6` | `.md-h6` | `heading` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-p` | `.md-p` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-strong` | `.md-strong` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-em` | `.md-em` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-underline` | `.md-underline` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-hr` | `.md-hr` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-blockquote` | `.md-blockquote` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-ul` | `.md-ul` | `list` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-ol` | `.md-ol` | `list` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-li` | `.md-li` | `list` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-task-list-item` | `.md-task-list-item` | `list` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-checkbox` | `.md-checkbox` | `form` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-link` | `.md-link` | `text` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-inline-code` | `.md-inline-code` | `code` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table` | `.md-table` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-head` | `.md-table-head` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-body` | `.md-table-body` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-row` | `.md-table-row` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-header` | `.md-table-header` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-cell` | `.md-table-cell` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-caption` | `.md-table-caption` | `table` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-columns` | `.md-table-columns` | `table` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-table-column` | `.md-table-column` | `table` | `provisional` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-code-block` | `.md-code-block` | `code` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-code-header` | `.md-code-header` | `code` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-code-language` | `.md-code-language` | `code` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-code-surface` | `.md-code-surface` | `code` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |
| `md-code-content` | `.md-code-content` | `code` | `stable` | `@mdwrk/ui-tokens` | `⚪ none` | `🧩 direct` | `🧩 direct` |

| `mw-editor` | `.mw-editor` | `root` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor-layout` | `.mw-editor-layout` | `layout` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor-gutter` | `.mw-editor-gutter` | `gutter` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor-line-number` | `.mw-editor-line-number` | `line-number` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor-textarea` | `.mw-editor-textarea` | `textarea` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor--line-numbers-visible` | `.mw-editor--line-numbers-visible` | `state` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor--line-numbers-hidden` | `.mw-editor--line-numbers-hidden` | `state` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor--soft-wrap` | `.mw-editor--soft-wrap` | `state` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor--nowrap` | `.mw-editor--nowrap` | `state` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor-textarea--wrap` | `.mw-editor-textarea--wrap` | `state` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |
| `mw-editor-textarea--nowrap` | `.mw-editor-textarea--nowrap` | `state` | `stable` | `@mdwrk/ui-tokens` | `ðŸ§© direct` | `âšª none` | `âšª none` |

| `mw-html-document` | `.mw-html-document` | `document` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-html-head` | `.mw-html-head` | `head` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-html-body` | `.mw-html-body` | `body` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-html-export` | `.mw-html-export` | `export` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-html-content` | `.mw-html-content` | `content` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-html-metadata` | `.mw-html-metadata` | `metadata` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-pdf-document` | `.mw-pdf-document` | `document` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-pdf-page` | `.mw-pdf-page` | `page` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-pdf-content` | `.mw-pdf-content` | `content` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-pdf-heading` | `.mw-pdf-heading` | `heading` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-pdf-running-header` | `.mw-pdf-running-header` | `running-header` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |
| `mw-pdf-running-footer` | `.mw-pdf-running-footer` | `running-footer` | `stable` | `@mdwrk/ui-tokens` | `none` | `none` | `none` |

## Notes

- `Previewer` here means the rendered Markdown surface from `@mdwrk/markdown-renderer-react`.
- `Edit-in-renderer` currently mixes direct shared markdown token usage with package-local `--mwir-*` host variables. This matrix only marks the shared `@mdwrk/ui-tokens` token surface.
- The package-token rows use the combined `name / css custom property` form so the table explicitly includes canonical package ids and direct markdown token names in the same row.
- The class matrix covers the helper class contract exported from `packages/shared/ui-tokens/src/classes.ts`. The source editor surface does not emit the markdown helper classes; it uses its own `mw-editor*` class contract instead.
- HTML export and PDF export helper classes are first-class contract surfaces, but this matrix still keeps the runtime columns scoped to `Editor`, `Previewer`, and `Edit-in-renderer`.
- PDF tokens are consumed by print/export styles that target the `mw-pdf-*` helper wrappers.
