import React from 'react';
import { MarkdownEditInRenderer } from '@mdwrk/markdown-edit-in-renderer-react';
import {
  MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES,
  MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
} from '@mdwrk/ui-tokens';
import { listThemePresets } from '@mdwrk/theme-presets/registry';
import { createPreviewStyleSheet } from '@mdwrk/theme-preview';
import './styles.css';

const THEME_PRESETS = listThemePresets();
const DEFAULT_THEME_ID = THEME_PRESETS[1]?.metadata.id ?? THEME_PRESETS[0]?.metadata.id ?? 'default';

const INITIAL_DOCUMENT = `# Inline Editing Flow

Click any paragraph, list item, or code block to edit it **in place**.

## Notes

- The rendered document stays visible.
- Caret projection follows the source model.
- Code blocks keep their framed reading affordance.

\`\`\`md
docker compose up -d
\`\`\`

> This demo keeps reading and editing in one surface.
`;

function parseTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  const theme = new URLSearchParams(window.location.search).get('theme');
  return THEME_PRESETS.some((entry) => entry.metadata.id === theme) ? theme ?? DEFAULT_THEME_ID : DEFAULT_THEME_ID;
}

function createBlockSummary(markdown: string): readonly string[] {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((block) => block.slice(0, 80));
}

export default function App(): React.JSX.Element {
  const [themeId, setThemeId] = React.useState(() => parseTheme());
  const [value, setValue] = React.useState(INITIAL_DOCUMENT);
  const preset = React.useMemo(
    () => THEME_PRESETS.find((entry) => entry.metadata.id === themeId) ?? THEME_PRESETS[0],
    [themeId],
  );
  const selector = `.edit-in-renderer-shell[data-theme="${themeId}"]`;
  const themeCss = React.useMemo(
    () => createPreviewStyleSheet(preset?.tokens ?? {}, {
      rootSelector: selector,
      hostSelector: selector,
    }).cssText,
    [preset, selector],
  );
  const blocks = React.useMemo(() => createBlockSummary(value), [value]);
  const contractClasses = React.useMemo(
    () => MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES.filter((row) => (
      row.name === 'markdown-body'
      || row.name === 'md-p'
      || row.name === 'md-li'
      || row.name === 'md-code-block'
    )),
    [],
  );

  return (
    <main className="demo-shell edit-in-renderer-shell" data-theme={themeId}>
      <style>{themeCss}</style>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>Editor In Renderer</h1>
          <p>Typora-style block activation backed by the same MdWrk renderer and editor packages.</p>
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

      <section className="surface-grid">
        <article className="editor-card">
          <header>
            <h2>Live document surface</h2>
            <p>Rendered markdown remains visible until the active block accepts text input.</p>
          </header>
          <MarkdownEditInRenderer value={value} onChange={setValue} spellCheck={false} />
        </article>

        <aside className="meta-card">
          <section>
            <h2>Block map</h2>
            <ol>
              {blocks.map((block, index) => (
                <li key={`${index + 1}-${block}`}>{block}</li>
              ))}
            </ol>
          </section>
          <section>
            <h2>Raw markdown</h2>
            <pre>{value}</pre>
          </section>
          <section>
            <h2>Contract surface</h2>
            <p>Inline editing still renders through the markdown contract owned by <code>@mdwrk/ui-tokens</code>.</p>
            <div className="chip-grid">
              {MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES.slice(0, 5).map((bridge) => (
                <span key={bridge.cssCustomProperty} className="chip">
                  <code>{bridge.cssCustomProperty}</code>
                </span>
              ))}
            </div>
            <div className="chip-grid">
              {contractClasses.map((entry) => (
                <span key={entry.name} className="chip">
                  <code>{entry.name}</code>
                </span>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
