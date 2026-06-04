import React from 'react';
import { DropdownSelector } from '@mdwrk/core-demo-react';
import { MarkdownSourceEditor } from '@mdwrk/markdown-editor-react';
import { MarkdownRenderer } from '@mdwrk/markdown-renderer-react';
import {
  MARKDOWN_PACKAGE_THEME_TOKENS,
  MARKDOWN_PACKAGE_TOKEN_DEFAULTS,
  MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES,
  MARKDOWN_WORKSPACE_THEME_CLASSES,
  MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
} from '@mdwrk/ui-tokens';
import {
  DEFAULT_DEMO_THEME_ID,
  DEMO_EDITOR_RENDERER_THEMES,
  DEMO_RENDERER_THEMES,
  DEMO_SHELL_THEMES,
  DEMO_THEME_PRESETS,
} from '@mdwrk/core-demo-themes';
import { useApplyDocumentTheme } from '../useApplyDocumentTheme';
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
  const rendererTheme = React.useMemo(
    () => DEMO_RENDERER_THEMES[themeId as keyof typeof DEMO_RENDERER_THEMES] ?? DEMO_RENDERER_THEMES[DEFAULT_THEME_ID],
    [themeId],
  );
  const editorTheme = React.useMemo(
    () => DEMO_EDITOR_RENDERER_THEMES[themeId as keyof typeof DEMO_EDITOR_RENDERER_THEMES] ?? DEMO_EDITOR_RENDERER_THEMES[DEFAULT_THEME_ID],
    [themeId],
  );
  useApplyDocumentTheme(shellTheme.style);

  const tokenRows = React.useMemo(
    () => MARKDOWN_PACKAGE_THEME_TOKENS.map((definition) => ({
      ...definition,
      defaultValue: MARKDOWN_PACKAGE_TOKEN_DEFAULTS[definition.name],
      override: preset?.tokens[definition.name] ?? 'inherited default',
    })),
    [preset],
  );
  const rendererBridgeRows = React.useMemo(
    () => MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES.map((definition) => ({
      ...definition,
      defaultValue: MARKDOWN_PACKAGE_TOKEN_DEFAULTS[definition.sourceToken],
      override: preset?.tokens[definition.sourceToken] ?? 'inherited default',
    })),
    [preset],
  );
  const editorBridgeRows = React.useMemo(
    () => MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES.map((definition) => ({
      ...definition,
      defaultValue: MARKDOWN_PACKAGE_TOKEN_DEFAULTS[definition.sourceToken],
      override: preset?.tokens[definition.sourceToken] ?? 'inherited default',
    })),
    [preset],
  );
  const classRows = React.useMemo(
    () => MARKDOWN_WORKSPACE_THEME_CLASSES,
    [],
  );

  return (
    <main className="demo-shell ui-tokens-demo-shell" data-theme={themeId} style={shellTheme.style}>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>UI Tokens</h1>
          <p>Package-owned markdown tokens, renderer bridge variables, and markdown, editor, HTML export, and PDF export helper classes source directly from <code>@mdwrk/ui-tokens</code>.</p>
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
          <span className="contract-label">Package tokens</span>
          <strong>{tokenRows.length}</strong>
        </article>
        <article className="contract-pill">
          <span className="contract-label">Renderer bridges</span>
          <strong>{rendererBridgeRows.length}</strong>
        </article>
        <article className="contract-pill">
          <span className="contract-label">Theme classes</span>
          <strong>{classRows.length}</strong>
        </article>
      </section>

      <section className="token-card">
        <header>
          <h2>Markdown class inventory</h2>
          <p>Portable markdown, editor, HTML export, and PDF export class names declared by <code>@mdwrk/ui-tokens</code>, including their scope and stability.</p>
        </header>
        <div className="token-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Selector</th>
                <th>Scope</th>
                <th>Stability</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((row) => (
                <tr key={row.name}>
                  <td><code>{row.name}</code></td>
                  <td><code>{row.selector}</code></td>
                  <td>{row.scope}</td>
                  <td>{row.stability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="specimen-grid">
        <article className="specimen-card">
          <h2>Editor specimen</h2>
          <MarkdownSourceEditor
            value={SPECIMEN_EDITOR}
            onChange={() => undefined}
            showLineNumbers
            themeStyle={editorTheme.editor}
          />
        </article>
        <article className="specimen-card renderer-specimen-card" style={rendererTheme.style}>
          <h2>Renderer specimen</h2>
          <MarkdownRenderer
            markdown={SPECIMEN_MARKDOWN}
            extensions={['superscript', 'subscript']}
            themeStyle={rendererTheme.style}
          />
        </article>
      </section>

      <section className="token-card">
        <header>
          <h2>Package token ledger</h2>
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
          <h2>Editor bridge ledger</h2>
          <p>The editor consumes these <code>--mwe-*</code> bridge variables from <code>@mdwrk/ui-tokens</code> without redefining a parallel demo token contract.</p>
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
              {editorBridgeRows.map((row) => (
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

    </main>
  );
}
