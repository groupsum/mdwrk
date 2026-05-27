import React from 'react';
import { DropdownSelector } from '@mdwrk/core-demo-react';
import { MarkdownEditInRenderer } from '@mdwrk/markdown-edit-in-renderer-react';
import {
  MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES,
  MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
} from '@mdwrk/ui-tokens';
import { createPreviewStyleSheet } from '@mdwrk/theme-preview';
import { DEFAULT_DEMO_THEME_ID, DEMO_SHELL_THEMES, DEMO_THEME_PRESETS } from '@mdwrk/core-demo-themes';
import './styles.css';

const THEME_PRESETS = DEMO_THEME_PRESETS;
const DEFAULT_THEME_ID = DEFAULT_DEMO_THEME_ID;

const INITIAL_DOCUMENT = `# Inline Editing Flow

Click any paragraph, list item, or code block to edit it **in place**.

Inline formatting: **bold**, _italic_, __underline__, ~~strikethrough~~, X^2^, H~2~O.

## Notes

- The rendered document stays visible.
- Caret projection follows the source model.
- Code blocks keep their framed reading affordance.

### H3 live edit

#### H4 live edit

##### H5 live edit

###### H6 live edit

| Block | Editing mode | Status |
| --- | --- | --- |
| Paragraph | inline | ready |
| Table | rendered | ready |

\`\`\`md
docker compose up -d
\`\`\`

> This demo keeps reading and editing in one surface.
>
> Block quotes should stay editable without breaking structure.

\`\`\`
plain fenced block
without syntax metadata
\`\`\`
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
  const shellTheme = React.useMemo(
    () => DEMO_SHELL_THEMES[themeId as keyof typeof DEMO_SHELL_THEMES] ?? DEMO_SHELL_THEMES[DEFAULT_THEME_ID],
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
    <main className="demo-shell edit-in-renderer-shell" data-theme={themeId} style={shellTheme.style}>
      <style>{themeCss}</style>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>Editor In Renderer</h1>
          <p>Typora-style block activation backed by the same MdWrk renderer and editor packages.</p>
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

      <section className="surface-grid">
        <article className="editor-card">
          <header>
            <h2>Live document surface</h2>
            <p>Rendered markdown remains visible until the active block accepts text input.</p>
          </header>
          <MarkdownEditInRenderer
            value={value}
            onChange={setValue}
            spellCheck={false}
            extensions={['superscript', 'subscript']}
          />
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
