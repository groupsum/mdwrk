import React from 'react';
import { DropdownSelector, TogglePill } from '@mdwrk/core-demo-react';
import { MarkdownRenderer } from '@mdwrk/markdown-renderer-react';
import {
  MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES,
  MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
} from '@mdwrk/ui-tokens';
import { DEFAULT_DEMO_THEME_ID, DEMO_RENDERER_THEMES, DEMO_SHELL_THEMES } from '@mdwrk/core-demo-themes';
import { useApplyDocumentTheme } from '../useApplyDocumentTheme';
import './styles.css';

type OptionalExtensionId = 'definition-lists' | 'math' | 'footnotes' | 'superscript' | 'subscript';

const THEME_PRESETS = DEMO_RENDERER_THEMES;
const DEFAULT_THEME_ID = DEFAULT_DEMO_THEME_ID;

const OPTIONAL_EXTENSION_OPTIONS: readonly { id: OptionalExtensionId; label: string }[] = [
  { id: 'definition-lists', label: 'Definition lists' },
  { id: 'math', label: 'Math' },
  { id: 'footnotes', label: 'Footnotes' },
  { id: 'superscript', label: 'Superscript' },
  { id: 'subscript', label: 'Subscript' },
] as const;

const MARKDOWN = `# Preview Review Deck

The previewer demo focuses on **reading quality**, tokenized spacing, and optional markdown lanes.

Inline formatting: **bold**, _italic_, __underline__, ~~strikethrough~~, X^2^, H~2~O.

## What to inspect

- [x] typography rhythm
- [x] table contrast
- [x] code block framing
- [x] footnote and math support when enabled

### H3 reading lane

#### H4 reading lane

##### H5 reading lane

###### H6 reading lane

| Surface | Goal | Notes |
| :--- | :--- | :--- |
| Narrative copy | Readability | Balanced body rhythm |
| Tables | Scanability | Banded rows |
| Code | Reference use | Clear language label |

Term
: Preview should keep semantic structure visible without leaking editor chrome.

Formula: $a^2 + b^2 = c^2$

\`\`\`tsx
export function PreviewPanel() {
  return <MarkdownRenderer markdown={source} profile="gfm-default" />;
}
\`\`\`

\`\`\`
plain code fence
without a language label
\`\`\`

Footnote marker.[^1]

[^1]: Optional extensions stay explicit and demo-scoped.

> Preview mode should keep quote blocks distinct from adjacent paragraphs.
`;

function parseThemeFromQuery(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  const theme = new URLSearchParams(window.location.search).get('theme');
  return THEME_PRESETS[theme as keyof typeof THEME_PRESETS] ? theme ?? DEFAULT_THEME_ID : DEFAULT_THEME_ID;
}

export default function App(): React.JSX.Element {
  const [themeId, setThemeId] = React.useState(() => parseThemeFromQuery());
  const [extensions, setExtensions] = React.useState<OptionalExtensionId[]>([
    'definition-lists',
    'math',
    'footnotes',
    'superscript',
    'subscript',
  ]);
  const shellTheme = React.useMemo(
    () => DEMO_SHELL_THEMES[themeId as keyof typeof DEMO_SHELL_THEMES] ?? DEMO_SHELL_THEMES[DEFAULT_THEME_ID],
    [themeId],
  );
  const rendererTheme = React.useMemo(
    () => DEMO_RENDERER_THEMES[themeId as keyof typeof DEMO_RENDERER_THEMES] ?? DEMO_RENDERER_THEMES[DEFAULT_THEME_ID],
    [themeId],
  );
  useApplyDocumentTheme(shellTheme.style);
  const rendererBridges = React.useMemo(
    () => MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES,
    [],
  );
  const helperClasses = React.useMemo(
    () => MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES.filter((row) => (
      row.name === 'markdown-body'
      || row.name === 'md-h1'
      || row.name === 'md-strong'
      || row.name === 'md-em'
      || row.name === 'md-table'
      || row.name === 'md-code-block'
    )),
    [],
  );

  const toggleExtension = (extensionId: OptionalExtensionId) => {
    setExtensions((current) => current.includes(extensionId)
      ? current.filter((entry) => entry !== extensionId)
      : [...current, extensionId]);
  };

  return (
    <main className="demo-shell previewer-demo-shell" data-theme={themeId} style={shellTheme.style}>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>Previewer</h1>
          <p>Renderer-first review surface for markdown fidelity, optional profiles, and theme contrast.</p>
        </div>
        <div className="selector-row">
          <DropdownSelector
            label="Theme"
            value={themeId}
            onChange={setThemeId}
            options={Object.entries(THEME_PRESETS).map(([id, theme]) => ({ id, label: theme.label }))}
          />
        </div>
        <div className="control-cluster">
          {OPTIONAL_EXTENSION_OPTIONS.map((option) => (
            <TogglePill
              key={option.id}
              label={option.label}
              checked={extensions.includes(option.id)}
              onChange={() => toggleExtension(option.id)}
            />
          ))}
        </div>
      </section>

      <section className="preview-grid">
        <aside className="summary-card">
          <h2>Review goals</h2>
          <ul>
            <li>Check how preset tokens alter contrast without changing semantics.</li>
            <li>Keep code, tables, and list affordances readable in one pass.</li>
            <li>Exercise optional profiles explicitly instead of silently enabling them.</li>
          </ul>
          <section className="contract-note">
            <h3>Previewer contract</h3>
            <p>The previewer consumes renderer bridge variables and markdown helper classes from <code>@mdwrk/ui-tokens</code>.</p>
            <div className="chip-grid">
              {rendererBridges.slice(0, 6).map((bridge) => (
                <span key={bridge.cssCustomProperty} className="chip">
                  <code>{bridge.cssCustomProperty}</code>
                </span>
              ))}
            </div>
            <div className="chip-grid">
              {helperClasses.map((helper) => (
                <span key={helper.name} className="chip">
                  <code>{helper.name}</code>
                </span>
              ))}
            </div>
          </section>
        </aside>
        <article className="preview-card" style={rendererTheme.style}>
          <MarkdownRenderer
            markdown={MARKDOWN}
            profile="gfm-default"
            extensions={extensions}
            themeStyle={rendererTheme.style}
          />
        </article>
      </section>
    </main>
  );
}
