import React from 'react';
import { DropdownSelector, TogglePill } from '@mdwrk/core-demo-react';
import { MarkdownRenderer } from '@mdwrk/markdown-renderer-react';
import { MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES, MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES } from '@mdwrk/ui-tokens';
import { DEFAULT_DEMO_THEME_ID, DEMO_RENDERER_THEMES, DEMO_SHELL_THEMES, type DemoThemeId } from '@mdwrk/core-demo-themes';
import './styles.css';

type OptionalExtensionId = 'definition-lists' | 'math' | 'footnotes' | 'superscript' | 'subscript';
const THEME_PRESETS = DEMO_RENDERER_THEMES;

const OPTIONAL_EXTENSION_OPTIONS: readonly { id: OptionalExtensionId; label: string }[] = [
  { id: 'definition-lists', label: 'Definition lists' },
  { id: 'math', label: 'Math' },
  { id: 'footnotes', label: 'Footnotes' },
  { id: 'superscript', label: 'Superscript' },
  { id: 'subscript', label: 'Subscript' },
] as const;

const markdown = `# Portable Markdown Renderer

This example is rendered through **@mdwrk/markdown-renderer-react** with the default GFM profile.

Inline formatting: **bold**, _italic_, __underline__, ~~strikethrough~~, X^2^, H~2~O.

## H2 review

### H3 review

#### H4 review

##### H5 review

###### H6 review

- [x] task lists
- literal autolinks like https://example.com and docs@example.com
- aligned tables

| Package | Responsibility | Status |
| :--- | ---: | :---: |
| core | parse/render pipeline | stable |
| react | bindings + theme bridge | ready |

Term
: Definition list support can be enabled per profile.

Equation: $E=mc^2$

Here is a footnote.[^1]

[^1]: Optional profiles are explicitly opt-in and certification-scoped.

> Quote blocks should stay visually distinct across themes.
>
> They should not collapse into the panel background.

\`\`\`ts
export const portable = true;
\`\`\`

\`\`\`
plain fenced code block
without a language tag
\`\`\`
`;

export default function App(): React.JSX.Element {
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
      <h1>Portable Markdown Renderer</h1>
      <p>This example validates the reusable renderer package directly, including default GFM and optional profile rendering.</p>
      <p><small>Renderer bridges: {MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES.length} | Markdown helper classes: {MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES.length}</small></p>
      <div className="selector-row">
        <DropdownSelector
          label="Theme"
          value={themePreset}
          onChange={(value) => setThemePreset(value as DemoThemeId)}
          options={Object.entries(THEME_PRESETS).map(([id, theme]) => ({ id, label: theme.label }))}
        />
      </div>
      <div className="toolbar profile-toggle-row">
        {OPTIONAL_EXTENSION_OPTIONS.map((option) => (
          <TogglePill
            key={option.id}
            label={option.label}
            checked={enabledExtensions.includes(option.id)}
            onChange={() => toggleExtension(option.id)}
          />
        ))}
      </div>
      <section className="preview-card" style={currentTheme.style}>
        <MarkdownRenderer
          markdown={markdown}
          profile="gfm-default"
          extensions={enabledExtensions}
          themeStyle={currentTheme.style}
        />
      </section>
    </main>
  );
}
