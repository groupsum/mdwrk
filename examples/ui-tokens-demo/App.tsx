import React from 'react';
import { DropdownSelector } from '@mdwrk/core-demo-react';
import { MarkdownSourceEditor } from '@mdwrk/markdown-editor-react';
import { MarkdownRenderer } from '@mdwrk/markdown-renderer-react';
import {
  MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES,
  MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
  MARKDOWN_WORKSPACE_UI_TOKENS,
  MARKDOWN_WORKSPACE_TOKEN_DEFAULTS,
} from '@mdwrk/ui-tokens';
import { createPreviewStyleSheet } from '@mdwrk/theme-preview';
import { DEFAULT_DEMO_THEME_ID, DEMO_SHELL_THEMES, DEMO_THEME_PRESETS } from '@mdwrk/core-demo-themes';
import './styles.css';

const THEME_PRESETS = DEMO_THEME_PRESETS;
const DEFAULT_THEME_ID = DEFAULT_DEMO_THEME_ID;

const SPECIMEN_MARKDOWN = `# Token Specimen

This preview reflects the active preset token overrides.

- Accent and panel tones
- Editor rhythm and gutter width
- Heading and body contrast

Inline formatting: **bold**, _italic_, __underline__, ~~strikethrough~~, X^2^, H~2~O.

## H2 specimen

### H3 specimen

#### H4 specimen

##### H5 specimen

###### H6 specimen

| Column | Header token | Value |
| --- | --- | --- |
| A | table-header-bg | active |
| B | table-header-fg | active |

> Quote blocks should reflect the active panel and border tokens.

\`\`\`ts
export const specimen = true;
\`\`\`

\`\`\`
plain fenced block
without a language
\`\`\`
`;

const SPECIMEN_EDITOR = `# Tokens

**bold** _italic_ __underline__ ~~strikethrough~~ X^2^ H~2~O

## H2
### H3
#### H4
##### H5
###### H6

| Token | Purpose |
| --- | --- |
| table-header-bg | header fill |
| line-number-gutter-width | gutter width |

> token specimen quote

\`\`\`ts
const tokens = true;
\`\`\`

\`\`\`
plain code
\`\`\`
`;

function parseThemeId(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  const theme = new URLSearchParams(window.location.search).get('theme');
  return THEME_PRESETS.some((entry) => entry.metadata.id === theme) ? theme ?? DEFAULT_THEME_ID : DEFAULT_THEME_ID;
}

export default function App(): React.JSX.Element {
  const [themeId, setThemeId] = React.useState(() => parseThemeId());
  const preset = React.useMemo(
    () => THEME_PRESETS.find((entry) => entry.metadata.id === themeId) ?? THEME_PRESETS[0],
    [themeId],
  );
  const shellTheme = React.useMemo(
    () => DEMO_SHELL_THEMES[themeId as keyof typeof DEMO_SHELL_THEMES] ?? DEMO_SHELL_THEMES[DEFAULT_THEME_ID],
    [themeId],
  );
  const selector = `.ui-tokens-demo-shell[data-theme="${themeId}"]`;
  const themeCss = React.useMemo(
    () => createPreviewStyleSheet(preset?.tokens ?? {}, {
      rootSelector: selector,
      hostSelector: selector,
    }).cssText,
    [preset, selector],
  );

  const tokenRows = React.useMemo(
    () => MARKDOWN_WORKSPACE_UI_TOKENS.map((definition) => ({
      ...definition,
      defaultValue: MARKDOWN_WORKSPACE_TOKEN_DEFAULTS[definition.name],
      override: preset?.tokens[definition.name] ?? 'inherited default',
    })),
    [preset],
  );
  const rendererBridgeRows = React.useMemo(
    () => MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES.map((definition) => ({
      ...definition,
      defaultValue: MARKDOWN_WORKSPACE_TOKEN_DEFAULTS[definition.sourceToken],
      override: preset?.tokens[definition.sourceToken] ?? 'inherited default',
    })),
    [preset],
  );
  const rendererClassRows = React.useMemo(
    () => MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES,
    [],
  );

  return (
    <main className="demo-shell ui-tokens-demo-shell" data-theme={themeId} style={shellTheme.style}>
      <style>{themeCss}</style>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>UI Tokens</h1>
          <p>Markdown tokens, renderer bridge variables, and markdown helper classes now source directly from <code>@mdwrk/ui-tokens</code>.</p>
        </div>
        <div className="selector-row">
          <DropdownSelector
            label="Theme"
            value={themeId}
            onChange={setThemeId}
            options={THEME_PRESETS.map((entry) => ({ id: entry.metadata.id, label: entry.metadata.name }))}
          />
        </div>
      </section>

      <section className="contract-strip">
        <article className="contract-pill">
          <span className="contract-label">Markdown tokens</span>
          <strong>{tokenRows.length}</strong>
        </article>
        <article className="contract-pill">
          <span className="contract-label">Renderer bridges</span>
          <strong>{rendererBridgeRows.length}</strong>
        </article>
        <article className="contract-pill">
          <span className="contract-label">Renderer classes</span>
          <strong>{rendererClassRows.length}</strong>
        </article>
      </section>

      <section className="specimen-grid">
        <article className="specimen-card">
          <h2>Editor specimen</h2>
          <MarkdownSourceEditor value={SPECIMEN_EDITOR} onChange={() => undefined} showLineNumbers />
        </article>
        <article className="specimen-card">
          <h2>Renderer specimen</h2>
          <MarkdownRenderer markdown={SPECIMEN_MARKDOWN} extensions={['superscript', 'subscript']} />
        </article>
      </section>

      <section className="token-card">
        <header>
          <h2>Workspace token ledger</h2>
          <p>Default values come from <code>@mdwrk/ui-tokens</code>; preset overrides come from the selected first-party theme.</p>
        </header>
        <div className="token-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Default</th>
                <th>Preset override</th>
              </tr>
            </thead>
            <tbody>
              {tokenRows.map((row) => (
                <tr key={row.name}>
                  <td><code>{row.name}</code></td>
                  <td>{row.category}</td>
                  <td><code>{row.defaultValue}</code></td>
                  <td><code>{row.override}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="token-card">
        <header>
          <h2>Previewer bridge ledger</h2>
          <p>The previewer and renderer consume these <code>--mw-*</code> bridge variables, each mapped from a source token in <code>@mdwrk/ui-tokens</code>.</p>
        </header>
        <div className="token-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Bridge variable</th>
                <th>Source token</th>
                <th>Default</th>
                <th>Preset override</th>
              </tr>
            </thead>
            <tbody>
              {rendererBridgeRows.map((row) => (
                <tr key={row.cssCustomProperty}>
                  <td><code>{row.cssCustomProperty}</code></td>
                  <td><code>{row.sourceToken}</code></td>
                  <td><code>{row.defaultValue}</code></td>
                  <td><code>{row.override}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="token-card">
        <header>
          <h2>Markdown helper classes</h2>
          <p>Renderer-facing markdown semantics such as headings, emphasis, tables, and code blocks are declared here as stable or provisional class contracts.</p>
        </header>
        <div className="token-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Selector</th>
                <th>Group</th>
                <th>Stability</th>
              </tr>
            </thead>
            <tbody>
              {rendererClassRows.map((row) => (
                <tr key={row.name}>
                  <td><code>{row.name}</code></td>
                  <td><code>{row.selector}</code></td>
                  <td>{row.group}</td>
                  <td>{row.stability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
