import React from 'react';
import { ActionButton, DropdownSelector, TogglePill } from '@mdwrk/core-demo-react';
import {
  MarkdownSourceEditor,
  type MarkdownSourceEditorHandle,
} from '@mdwrk/markdown-editor-react';
import { MarkdownRenderer } from '@mdwrk/markdown-renderer-react';
import { MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES, MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES } from '@mdwrk/ui-tokens';
import { DEFAULT_DEMO_THEME_ID, DEMO_EDITOR_RENDERER_THEMES, DEMO_SHELL_THEMES, type DemoThemeId } from '@mdwrk/core-demo-themes';
import './styles.css';

type OptionalExtensionId = 'definition-lists' | 'math' | 'footnotes' | 'superscript' | 'subscript';
const THEME_PRESETS = DEMO_EDITOR_RENDERER_THEMES;

const initialMarkdown = `# Portable Markdown Editor

This example uses **@mdwrk/markdown-editor-react** with the reusable renderer package on the right.

Inline formatting: **bold**, _italic_, __underline__, ~~strikethrough~~, X^2^, H~2~O.

- Ctrl/Cmd+B: bold
- Ctrl/Cmd+I: italic
- Ctrl/Cmd+Shift+X: strikethrough
- toolbar Bullet button: create unordered list items
- toolbar Task button: create unchecked task items
- Tab / Shift+Tab: indent and outdent
- Enter on a list item: continue the list
- Enter on an empty task item: terminate the list
- Ctrl/Cmd+Z / Ctrl/Cmd+Shift+Z: undo and redo

- [x] preview task item
- [ ] another task item
- visit https://example.com for the docs

1. Ordered list continuation is demonstrated here.
2. Place the caret after this line and press Enter.

## H2 section

### H3 section

#### H4 section

##### H5 section

###### H6 section

| Package | Responsibility |
| --- | --- |
| editor-core | selection transforms, commands, history |
| editor-react | textarea surface, keyboard wiring |
| renderer-react | preview |

Term
: Optional profiles can be previewed in the reusable renderer package.

Math: $E=mc^2$

Footnote ref.[^1]

[^1]: The example opts into definition lists, math, footnotes, superscript, and subscript when toggled on.

> Quote blocks should remain legible in both editor preview and renderer preview.

\`\`\`ts
export const editorSurface = {
  commandRail: true,
};
\`\`\`

\`\`\`
plain fenced code
without an explicit language
\`\`\`
`;

const OPTIONAL_EXTENSION_OPTIONS: readonly { id: OptionalExtensionId; label: string }[] = [
  { id: 'definition-lists', label: 'Definition lists' },
  { id: 'math', label: 'Math' },
  { id: 'footnotes', label: 'Footnotes' },
  { id: 'superscript', label: 'Superscript' },
  { id: 'subscript', label: 'Subscript' },
] as const;

export default function App(): React.JSX.Element {
  const editorRef = React.useRef<MarkdownSourceEditorHandle>(null);
  const [value, setValue] = React.useState(initialMarkdown);
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [themePreset, setThemePreset] = React.useState<DemoThemeId>(DEFAULT_DEMO_THEME_ID);
  const [enabledExtensions, setEnabledExtensions] = React.useState<OptionalExtensionId[]>([
    'definition-lists',
    'math',
    'footnotes',
    'superscript',
    'subscript',
  ]);

  const currentTheme = THEME_PRESETS[themePreset];
  const shellTheme = DEMO_SHELL_THEMES[themePreset];

  const toggleExtension = (extensionId: OptionalExtensionId) => {
    setEnabledExtensions((current) => current.includes(extensionId)
      ? current.filter((entry) => entry !== extensionId)
      : [...current, extensionId]);
  };

  return (
    <main className="example-shell" style={shellTheme.style}>
      <h1>Portable Editor Example</h1>
      <p>This example exercises the public editor package surface rather than private workspace wiring, with editor and preview bridge vars sourced from <code>@mdwrk/ui-tokens</code>.</p>
      <p><small>Editor bridges: {MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES.length} | Renderer bridges: {MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES.length}</small></p>
      <div className="selector-row">
        <DropdownSelector
          label="Theme"
          value={themePreset}
          onChange={(value) => setThemePreset(value as DemoThemeId)}
          options={Object.entries(THEME_PRESETS).map(([id, theme]) => ({ id, label: theme.label }))}
        />
      </div>
      <div className="toolbar">
        <ActionButton label="Bold" onClick={() => editorRef.current?.executeCommand('bold')} />
        <ActionButton label="Italic" onClick={() => editorRef.current?.executeCommand('italic')} />
        <ActionButton label="Underline" onClick={() => editorRef.current?.executeCommand('underline')} />
        <ActionButton label="Strike" onClick={() => editorRef.current?.executeCommand('strikethrough')} />
        <ActionButton label="Bullet" onClick={() => editorRef.current?.executeCommand('bullet-list')} />
        <ActionButton label="Task" onClick={() => editorRef.current?.executeCommand('task-list')} />
        <ActionButton label="Indent" onClick={() => editorRef.current?.executeCommand('indent')} />
        <ActionButton label="Outdent" onClick={() => editorRef.current?.executeCommand('outdent')} />
        <ActionButton label="Math" onClick={() => editorRef.current?.executeCommand('inline-math')} />
        <ActionButton label="Footnote" onClick={() => editorRef.current?.executeCommand('footnote')} />
        <ActionButton label="Sup" onClick={() => editorRef.current?.executeCommand('superscript')} />
        <ActionButton label="Sub" onClick={() => editorRef.current?.executeCommand('subscript')} />
        <ActionButton label="Undo" onClick={() => editorRef.current?.executeCommand('undo')} />
        <ActionButton label="Redo" onClick={() => editorRef.current?.executeCommand('redo')} />
      </div>
      <div className="toolbar profile-toggle-row">
        <TogglePill
          label="Line numbers"
          checked={showLineNumbers}
          onChange={setShowLineNumbers}
        />
        {OPTIONAL_EXTENSION_OPTIONS.map((option) => (
          <TogglePill
            key={option.id}
            label={option.label}
            checked={enabledExtensions.includes(option.id)}
            onChange={() => toggleExtension(option.id)}
          />
        ))}
      </div>
      <div className="example-grid">
        <section className="editor-card">
          <MarkdownSourceEditor
            ref={editorRef}
            value={value}
            onChange={setValue}
            showLineNumbers={showLineNumbers}
            themeStyle={currentTheme.editor}
          />
        </section>
        <section className="preview-card" style={currentTheme.renderer}>
          <MarkdownRenderer
            markdown={value}
            profile="gfm-default"
            extensions={enabledExtensions}
            themeStyle={currentTheme.renderer}
          />
        </section>
      </div>
    </main>
  );
}
