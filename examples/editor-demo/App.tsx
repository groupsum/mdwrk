import React from 'react';
import {
  MarkdownSourceEditor,
  type MarkdownSourceEditorHandle,
  type MarkdownEditorSelection,
} from '@mdwrk/markdown-editor-react';
import { MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES } from '@mdwrk/ui-tokens';
import { LineHeightRail } from '@mdwrk/extension-theme-studio';
import { listThemePresets } from '@mdwrk/theme-presets/registry';
import { createPreviewStyleSheet } from '@mdwrk/theme-preview';
import './styles.css';

const THEME_PRESETS = listThemePresets();
const DEFAULT_THEME_ID = THEME_PRESETS[0]?.metadata.id ?? 'default';

const SAMPLE_DOCUMENTS = {
  release: `# Release Brief\n\n## Summary\n\nShip the demo quartet as Docker-served workspaces.\n\n## Checks\n\n- [x] editor package wired\n- [x] preview package wired\n- [x] edit-in-renderer wired\n- [ ] screenshot sweep\n\n## Risks\n\n1. Docker Desktop access can still block deployment.\n2. Theme drift should stay visible in the inspector.\n\n> Keep authoring surface primary and avoid hiding the raw markdown model.\n`,
  spec: `# Theme Contract Notes\n\n## Goals\n\nThe editor demo should exercise package-owned typography, spacing, and inspector behaviors.\n\n### Modes\n\n- Focused authoring\n- Outline review\n- Keyboard-heavy command flow\n\n\`\`\`ts\nexport const demoSurface = {\n  package: 'editor',\n  docker: true,\n};\n\`\`\`\n`,
} as const;

type SampleId = keyof typeof SAMPLE_DOCUMENTS;

type QueryState = {
  readonly themeId: string;
};

function parseQueryState(): QueryState {
  if (typeof window === 'undefined') {
    return { themeId: DEFAULT_THEME_ID };
  }

  const params = new URLSearchParams(window.location.search);
  const requestedTheme = params.get('theme');
  const themeId = THEME_PRESETS.some((preset) => preset.metadata.id === requestedTheme)
    ? requestedTheme ?? DEFAULT_THEME_ID
    : DEFAULT_THEME_ID;

  return { themeId };
}

function extractHeadings(markdown: string): readonly string[] {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => line.replace(/^#+\s*/, '').trim())
    .filter(Boolean);
}

export default function App(): React.JSX.Element {
  const queryState = React.useMemo(() => parseQueryState(), []);
  const editorRef = React.useRef<MarkdownSourceEditorHandle>(null);
  const [themeId, setThemeId] = React.useState(queryState.themeId);
  const [sampleId, setSampleId] = React.useState<SampleId>('release');
  const [value, setValue] = React.useState<string>(SAMPLE_DOCUMENTS.release);
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [textWrap, setTextWrap] = React.useState(true);
  const [lineHeight, setLineHeight] = React.useState(1.5);
  const [cursor, setCursor] = React.useState({ line: 1, column: 1 });
  const [selection, setSelection] = React.useState<MarkdownEditorSelection>({ start: 0, end: 0, direction: 'none' });

  const preset = React.useMemo(
    () => THEME_PRESETS.find((entry) => entry.metadata.id === themeId) ?? THEME_PRESETS[0],
    [themeId],
  );
  const scopedSelector = `.demo-shell[data-theme="${themeId}"]`;
  const themeCss = React.useMemo(
    () => createPreviewStyleSheet(preset?.tokens ?? {}, {
      rootSelector: scopedSelector,
      hostSelector: scopedSelector,
    }).cssText,
    [preset, scopedSelector],
  );
  const headings = React.useMemo(() => extractHeadings(value), [value]);
  const wordCount = React.useMemo(
    () => value.trim().split(/\s+/).filter(Boolean).length,
    [value],
  );

  const loadSample = React.useCallback((nextSampleId: SampleId) => {
    setSampleId(nextSampleId);
    setValue(SAMPLE_DOCUMENTS[nextSampleId]);
  }, []);

  return (
    <main className="demo-shell editor-demo-shell" data-theme={themeId}>
      <style>{themeCss}</style>
      <section className="hero-card">
        <div>
          <p className="eyebrow">MdWrk Demo</p>
          <h1>Editor</h1>
          <p className="hero-copy">
            A source-first authoring surface with command shortcuts, line rhythm, and a live metadata rail.
          </p>
        </div>
        <div className="hero-controls">
          <label>
            <span>Theme</span>
            <select value={themeId} onChange={(event) => setThemeId(event.target.value)}>
              {THEME_PRESETS.map((entry) => (
                <option key={entry.metadata.id} value={entry.metadata.id}>{entry.metadata.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Sample</span>
            <select value={sampleId} onChange={(event) => loadSample(event.target.value as SampleId)}>
              <option value="release">Release brief</option>
              <option value="spec">Theme contract note</option>
            </select>
          </label>
        </div>
      </section>

      <section className="command-bar" aria-label="Editor commands">
        {[
          ['Bold', 'bold'],
          ['Italic', 'italic'],
          ['Strike', 'strikethrough'],
          ['Bullet', 'bullet-list'],
          ['Task', 'task-list'],
          ['Indent', 'indent'],
          ['Outdent', 'outdent'],
          ['Undo', 'undo'],
          ['Redo', 'redo'],
        ].map(([label, command]) => (
          <button key={command} type="button" onClick={() => editorRef.current?.executeCommand(command as never)}>
            {label}
          </button>
        ))}
        <label className="toggle">
          <input
            type="checkbox"
            checked={showLineNumbers}
            onChange={(event) => setShowLineNumbers(event.target.checked)}
          />
          <span>Line numbers</span>
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={textWrap}
            onChange={(event) => setTextWrap(event.target.checked)}
          />
          <span>Soft wrap</span>
        </label>
      </section>

      <section className="demo-grid">
        <article className="surface-card">
          <header className="surface-header">
            <div>
              <h2>Authoring surface</h2>
              <p>Portable textarea editor with keyboard wiring from `@mdwrk/markdown-editor-react`.</p>
            </div>
            <div className="status-pills">
              <span>{wordCount} words</span>
              <span>L{cursor.line}:C{cursor.column}</span>
              <span>{selection.end - selection.start} selected</span>
            </div>
          </header>
          <MarkdownSourceEditor
            ref={editorRef}
            value={value}
            onChange={setValue}
            onCursorChange={(line, column) => setCursor({ line, column })}
            onSelectionChange={setSelection}
            showLineNumbers={showLineNumbers}
            textWrap={textWrap}
            spellCheck={false}
            themeVariables={{ lineHeight: `${lineHeight}rem` }}
          />
        </article>

        <aside className="inspector-card">
          <section>
            <h2>Document map</h2>
            <ul className="heading-list">
              {headings.map((heading) => (
                <li key={heading}>{heading}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Why this demo exists</h2>
            <p>It keeps the source editor primary while exposing selection state, command flow, and the editor bridge contract now owned by <code>@mdwrk/ui-tokens</code>.</p>
          </section>
          <section>
            <h2>Editor bridge vars</h2>
            <ul className="meta-list">
              {MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES.map((bridge) => (
                <li key={bridge.cssCustomProperty}>
                  <code>{bridge.cssCustomProperty}</code> from <code>{bridge.sourceToken}</code>
                </li>
              ))}
            </ul>
          </section>
          <section className="studio-control-section">
            <h2>Studio-Owned Line Height Control</h2>
            <p>
              This is the separate <code>LineHeightRail</code> component from theme studio. It changes the editor line rhythm;
              it is not the left gutter line-number rail.
            </p>
            <LineHeightRail
              value={lineHeight}
              onChange={setLineHeight}
              description="Separate studio-owned control demo. Adjust it and compare against the left gutter line-number rail in the editor."
            />
          </section>
          <section>
            <h2>Keyboard rail</h2>
            <ul className="meta-list">
              <li><strong>Ctrl/Cmd+B</strong> toggles bold</li>
              <li><strong>Tab</strong> indents the current list context</li>
              <li><strong>Enter</strong> continues or exits list items</li>
              <li><strong>Ctrl/Cmd+Z</strong> walks the history stack</li>
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}
