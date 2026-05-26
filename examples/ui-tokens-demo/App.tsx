import React from 'react';
import { MarkdownSourceEditor } from '@mdwrk/markdown-editor-react';
import { MarkdownRenderer } from '@mdwrk/markdown-renderer-react';
import {
  MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES,
  MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
  MARKDOWN_WORKSPACE_UI_TOKENS,
  MARKDOWN_WORKSPACE_TOKEN_DEFAULTS,
} from '@mdwrk/ui-tokens';
import { listThemePresets } from '@mdwrk/theme-presets/registry';
import { createPreviewStyleSheet } from '@mdwrk/theme-preview';
import './styles.css';

const THEME_PRESETS = listThemePresets();
const DEFAULT_THEME_ID = THEME_PRESETS[0]?.metadata.id ?? 'default';

const SPECIMEN_MARKDOWN = `# Token Specimen

This preview reflects the active preset token overrides.

- Accent and panel tones
- Editor rhythm and gutter width
- Heading and body contrast
`;

const SPECIMEN_EDITOR = `# Tokens\n\nbody surfaces\naccent chips\nline rhythm\n`;

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
    <main className="demo-shell ui-tokens-demo-shell" data-theme={themeId}>
      <style>{themeCss}</style>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>UI Tokens</h1>
          <p>Markdown tokens, renderer bridge variables, and markdown helper classes now source directly from <code>@mdwrk/ui-tokens</code>.</p>
        </div>
        <label className="theme-picker">
          <span>Theme</span>
          <select value={themeId} onChange={(event) => setThemeId(event.target.value)}>
            {THEME_PRESETS.map((entry) => (
              <option key={entry.metadata.id} value={entry.metadata.id}>{entry.metadata.name}</option>
            ))}
          </select>
        </label>
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
          <h2>Renderer specimen</h2>
          <MarkdownRenderer markdown={SPECIMEN_MARKDOWN} />
        </article>
        <article className="specimen-card">
          <h2>Editor specimen</h2>
          <MarkdownSourceEditor value={SPECIMEN_EDITOR} onChange={() => undefined} showLineNumbers />
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
