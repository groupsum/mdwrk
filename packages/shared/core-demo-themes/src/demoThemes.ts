import React from 'react';
import { createMarkdownEditorThemeStyle } from '@mdwrk/markdown-editor-react';
import { createMarkdownRendererThemeStyle } from '@mdwrk/markdown-renderer-react';
import {
  createThemeCssCustomPropertyRecord,
  type MarkdownPackageThemeTokenMap,
} from '@mdwrk/ui-tokens';

export type DemoThemeId = 'default-light' | 'default-dark' | 'paper';

type DemoThemeDefinition = {
  readonly id: DemoThemeId;
  readonly label: string;
  readonly description: string;
  readonly appBackground: string;
  readonly tokens: Partial<MarkdownPackageThemeTokenMap>;
  readonly shell: React.CSSProperties;
  readonly editor: React.CSSProperties;
  readonly renderer: React.CSSProperties;
};

function createDemoShellStyle(
  tokens: Partial<MarkdownPackageThemeTokenMap>,
  appBackground: string,
  colorScheme: 'light' | 'dark',
): React.CSSProperties {
  return {
    ...createThemeCssCustomPropertyRecord(tokens),
    '--bg-app': appBackground,
    colorScheme,
  } as React.CSSProperties;
}

const LIGHT_TOKENS: Partial<MarkdownPackageThemeTokenMap> = {
  'bg-panel': '#ffffff',
  'bg-inset': '#f8fafc',
  'fg-primary': '#0f172a',
  'fg-secondary': '#334155',
  'fg-muted': '#64748b',
  'accent': '#2563eb',
  'border-color': 'rgba(15, 23, 42, 0.14)',
  'code-inline-bg': '#eef4ff',
  'code-inline-fg': '#1d4ed8',
  'code-block-bg': '#f8fafc',
  'code-block-fg': '#0f172a',
  'code-header-bg': '#eef4ff',
  'code-header-fg': '#475569',
  'code-language-bg': '#dbeafe',
  'code-language-fg': '#1d4ed8',
  'table-header-bg': '#f8fafc',
  'table-header-fg': '#0f172a',
  'table-header-border-color': 'rgba(37, 99, 235, 0.28)',
  'table-row-primary-bg': '#ffffff',
  'table-row-secondary-bg': '#f8fafc',
  'editor-line-height': '1.75rem',
  'editor-line-rhythm': '1.75rem',
  'markdown-line-height': '1.75rem',
  'markdown-heading-line-height': '1.2',
  'line-number-gutter-width': '56px',
  'font-ui': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  'font-mono': "'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace",
  'font-head': "'Inter', sans-serif",
};

const DARK_TOKENS: Partial<MarkdownPackageThemeTokenMap> = {
  'bg-panel': '#0f172a',
  'bg-inset': '#111c35',
  'fg-primary': '#eff6ff',
  'fg-secondary': '#cbd5e1',
  'fg-muted': '#8ea2c6',
  'accent': '#f472b6',
  'border-color': '#312e81',
  'code-inline-bg': '#18233f',
  'code-inline-fg': '#f9a8d4',
  'code-block-bg': '#111c35',
  'code-block-fg': '#eff6ff',
  'code-header-bg': '#18233f',
  'code-header-fg': '#a5b4fc',
  'code-language-bg': '#312e81',
  'code-language-fg': '#fdf2f8',
  'table-header-bg': '#111c35',
  'table-header-fg': '#eff6ff',
  'table-header-border-color': '#7c3aed',
  'table-row-primary-bg': '#0f172a',
  'table-row-secondary-bg': '#111c35',
  'editor-line-height': '1.8rem',
  'editor-line-rhythm': '1.8rem',
  'markdown-line-height': '1.8rem',
  'markdown-heading-line-height': '1.16',
  'line-number-gutter-width': '58px',
  'font-ui': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  'font-mono': "'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace",
  'font-head': "'Inter', sans-serif",
};

const PAPER_TOKENS: Partial<MarkdownPackageThemeTokenMap> = {
  'bg-panel': '#fffdf8',
  'bg-inset': '#f0eadd',
  'fg-primary': '#2a2118',
  'fg-secondary': '#564739',
  'fg-muted': '#7c6b5d',
  'accent': '#a16207',
  'border-color': '#c9b79c',
  'code-inline-bg': '#efe4cf',
  'code-inline-fg': '#8b5e34',
  'code-block-bg': '#f0eadd',
  'code-block-fg': '#2a2118',
  'code-header-bg': '#e8dcc5',
  'code-header-fg': '#7c6b5d',
  'code-language-bg': '#dcc4a0',
  'code-language-fg': '#6b4423',
  'table-header-bg': '#f0eadd',
  'table-header-fg': '#2a2118',
  'table-header-border-color': '#b08952',
  'table-row-primary-bg': '#fffdf8',
  'table-row-secondary-bg': '#f0eadd',
  'editor-line-height': '1.9rem',
  'editor-line-rhythm': '1.9rem',
  'markdown-line-height': '1.9rem',
  'markdown-heading-line-height': '1.22',
  'line-number-gutter-width': '60px',
  'font-ui': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  'font-mono': "'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace",
  'font-head': "'Inter', sans-serif",
};

const DEMO_THEME_DEFINITIONS: readonly DemoThemeDefinition[] = [
  {
    id: 'default-light',
    label: 'Default light',
    description: 'Light baseline preset for editor and renderer package demos.',
    appBackground: '#f3f6fb',
    tokens: LIGHT_TOKENS,
    shell: createDemoShellStyle(LIGHT_TOKENS, '#f3f6fb', 'light'),
    editor: createMarkdownEditorThemeStyle({
      background: '#ffffff',
      foreground: '#0f172a',
      foregroundMuted: '#64748b',
      accent: '#2563eb',
      border: 'rgba(15, 23, 42, 0.14)',
      gutterBackground: '#f8fafc',
      lineHeight: '1.75rem',
      gutterWidth: '56px',
    }),
    renderer: createMarkdownRendererThemeStyle({
      foreground: '#0f172a',
      foregroundMuted: '#64748b',
      accent: '#2563eb',
      background: '#ffffff',
      border: 'rgba(15, 23, 42, 0.14)',
      codeInlineBackground: '#eef4ff',
      codeInlineForeground: '#1d4ed8',
      codeBlockBackground: '#f8fafc',
      codeBlockForeground: '#0f172a',
      codeHeaderBackground: '#eef4ff',
      codeHeaderForeground: '#475569',
      codeLanguageBackground: '#dbeafe',
      codeLanguageForeground: '#1d4ed8',
      lineHeight: '1.75rem',
      headingLineHeight: '1.2',
    }),
  },
  {
    id: 'default-dark',
    label: 'Default dark',
    description: 'High-contrast dark preset for package demos and specimen review.',
    appBackground: '#050816',
    tokens: DARK_TOKENS,
    shell: createDemoShellStyle(DARK_TOKENS, '#050816', 'dark'),
    editor: createMarkdownEditorThemeStyle({
      background: '#050816',
      foreground: '#eff6ff',
      foregroundMuted: '#8ea2c6',
      accent: '#f472b6',
      border: '#312e81',
      gutterBackground: '#0b1226',
      lineHeight: '1.8rem',
      gutterWidth: '58px',
    }),
    renderer: createMarkdownRendererThemeStyle({
      foreground: '#eff6ff',
      foregroundMuted: '#8ea2c6',
      accent: '#f472b6',
      background: '#0f172a',
      border: '#312e81',
      codeInlineBackground: '#18233f',
      codeInlineForeground: '#f9a8d4',
      codeBlockBackground: '#111c35',
      codeBlockForeground: '#eff6ff',
      codeHeaderBackground: '#18233f',
      codeHeaderForeground: '#a5b4fc',
      codeLanguageBackground: '#312e81',
      codeLanguageForeground: '#fdf2f8',
      lineHeight: '1.8rem',
      headingLineHeight: '1.16',
    }),
  },
  {
    id: 'paper',
    label: 'Paper',
    description: 'Paper-like reading preset for export review and light editorial inspection.',
    appBackground: '#f7f4ec',
    tokens: PAPER_TOKENS,
    shell: createDemoShellStyle(PAPER_TOKENS, '#f7f4ec', 'light'),
    editor: createMarkdownEditorThemeStyle({
      background: '#fffdf8',
      foreground: '#2a2118',
      foregroundMuted: '#7c6b5d',
      accent: '#a16207',
      border: '#c9b79c',
      gutterBackground: '#f0eadd',
      lineHeight: '1.9rem',
      gutterWidth: '60px',
    }),
    renderer: createMarkdownRendererThemeStyle({
      foreground: '#2a2118',
      foregroundMuted: '#7c6b5d',
      accent: '#a16207',
      background: '#fffdf8',
      border: '#c9b79c',
      codeInlineBackground: '#efe4cf',
      codeInlineForeground: '#8b5e34',
      codeBlockBackground: '#f0eadd',
      codeBlockForeground: '#2a2118',
      codeHeaderBackground: '#e8dcc5',
      codeHeaderForeground: '#7c6b5d',
      codeLanguageBackground: '#dcc4a0',
      codeLanguageForeground: '#6b4423',
      lineHeight: '1.9rem',
      headingLineHeight: '1.22',
    }),
  },
] as const;

export const DEMO_THEME_IDS = DEMO_THEME_DEFINITIONS.map((entry) => entry.id);
export const DEFAULT_DEMO_THEME_ID: DemoThemeId = 'default-light';

export const DEMO_THEME_PRESETS = DEMO_THEME_DEFINITIONS.map((entry) => ({
  metadata: {
    id: entry.id,
    name: entry.label,
    description: entry.description,
  },
  tokens: entry.tokens,
}));

export const DEMO_RENDERER_THEMES: Record<DemoThemeId, { label: string; style: React.CSSProperties }> =
  Object.fromEntries(
    DEMO_THEME_DEFINITIONS.map((entry) => [
      entry.id,
      { label: entry.label, style: entry.renderer },
    ]),
  ) as Record<DemoThemeId, { label: string; style: React.CSSProperties }>;

export const DEMO_SHELL_THEMES: Record<DemoThemeId, { label: string; style: React.CSSProperties }> =
  Object.fromEntries(
    DEMO_THEME_DEFINITIONS.map((entry) => [
      entry.id,
      { label: entry.label, style: entry.shell },
    ]),
  ) as Record<DemoThemeId, { label: string; style: React.CSSProperties }>;

export const DEMO_EDITOR_RENDERER_THEMES: Record<DemoThemeId, {
  label: string;
  editor: React.CSSProperties;
  renderer: React.CSSProperties;
}> = Object.fromEntries(
  DEMO_THEME_DEFINITIONS.map((entry) => [
    entry.id,
    {
      label: entry.label,
      editor: entry.editor,
      renderer: entry.renderer,
    },
  ]),
) as Record<DemoThemeId, {
  label: string;
  editor: React.CSSProperties;
  renderer: React.CSSProperties;
}>;
