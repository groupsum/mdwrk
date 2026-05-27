export const MARKDOWN_PACKAGE_THEME_TOKEN_NAMES = [
  "ui-scale",
  "bg-panel",
  "bg-inset",
  "border-color",
  "border-width",
  "fg-primary",
  "fg-secondary",
  "fg-muted",
  "accent",
  "code-inline-bg",
  "code-inline-fg",
  "code-block-bg",
  "code-block-fg",
  "code-header-bg",
  "code-header-fg",
  "code-language-bg",
  "code-language-fg",
  "table-header-bg",
  "table-header-fg",
  "table-header-border-color",
  "table-row-primary-bg",
  "table-row-secondary-bg",
  "editor-padding",
  "editor-line-height",
  "editor-line-rhythm",
  "markdown-line-height",
  "markdown-heading-line-height",
  "pdf-page-size",
  "pdf-page-margin-block",
  "pdf-page-margin-inline",
  "pdf-content-font-size",
  "pdf-content-line-height",
  "pdf-heading-keep-with-next",
  "line-number-gutter-width",
  "editor-content-width",
  "font-ui",
  "font-mono",
  "font-head",
] as const;

export type MarkdownPackageThemeTokenName = typeof MARKDOWN_PACKAGE_THEME_TOKEN_NAMES[number];

export type ThemeTokenCategory =
  | "layout"
  | "color"
  | "status"
  | "spacing"
  | "interaction"
  | "typography";

export interface ThemeTokenDefinition {
  readonly name: MarkdownPackageThemeTokenName;
  readonly cssCustomProperty: `--${string}`;
  readonly category: ThemeTokenCategory;
  readonly description: string;
  readonly defaultValue: string;
  readonly stability: "stable" | "experimental";
}

export const MARKDOWN_PACKAGE_THEME_TOKENS = [
  { name: "ui-scale", cssCustomProperty: "--ui-scale", category: "layout", description: "Global UI scale multiplier.", defaultValue: "1", stability: "stable" },
  { name: "bg-panel", cssCustomProperty: "--bg-panel", category: "color", description: "Panel background.", defaultValue: "#ececec", stability: "stable" },
  { name: "bg-inset", cssCustomProperty: "--bg-inset", category: "color", description: "Inset surface background.", defaultValue: "#dcdcdc", stability: "stable" },
  { name: "border-color", cssCustomProperty: "--border-color", category: "color", description: "Primary border color.", defaultValue: "#000000", stability: "stable" },
  { name: "border-width", cssCustomProperty: "--border-width", category: "layout", description: "Primary border width.", defaultValue: "2px", stability: "stable" },
  { name: "fg-primary", cssCustomProperty: "--fg-primary", category: "color", description: "Primary foreground color.", defaultValue: "#000000", stability: "stable" },
  { name: "fg-secondary", cssCustomProperty: "--fg-secondary", category: "color", description: "Secondary foreground color.", defaultValue: "#333333", stability: "stable" },
  { name: "fg-muted", cssCustomProperty: "--fg-muted", category: "color", description: "Muted foreground color.", defaultValue: "#666666", stability: "stable" },
  { name: "accent", cssCustomProperty: "--accent", category: "color", description: "Accent color.", defaultValue: "#ff3e00", stability: "stable" },
  { name: "code-inline-bg", cssCustomProperty: "--code-inline-bg", category: "color", description: "Rendered Markdown inline code background.", defaultValue: "var(--bg-inset)", stability: "stable" },
  { name: "code-inline-fg", cssCustomProperty: "--code-inline-fg", category: "color", description: "Rendered Markdown inline code foreground.", defaultValue: "var(--fg-secondary)", stability: "stable" },
  { name: "code-block-bg", cssCustomProperty: "--code-block-bg", category: "color", description: "Rendered Markdown fenced code surface background.", defaultValue: "var(--bg-inset)", stability: "stable" },
  { name: "code-block-fg", cssCustomProperty: "--code-block-fg", category: "color", description: "Rendered Markdown fenced code foreground.", defaultValue: "var(--fg-primary)", stability: "stable" },
  { name: "code-header-bg", cssCustomProperty: "--code-header-bg", category: "color", description: "Rendered Markdown fenced code header background.", defaultValue: "color-mix(in srgb, var(--bg-inset) 88%, var(--bg-panel) 12%)", stability: "stable" },
  { name: "code-header-fg", cssCustomProperty: "--code-header-fg", category: "color", description: "Rendered Markdown fenced code header foreground.", defaultValue: "var(--fg-muted)", stability: "stable" },
  { name: "code-language-bg", cssCustomProperty: "--code-language-bg", category: "color", description: "Rendered Markdown fenced code language pill background.", defaultValue: "color-mix(in srgb, var(--accent) 11%, var(--bg-panel) 89%)", stability: "stable" },
  { name: "code-language-fg", cssCustomProperty: "--code-language-fg", category: "color", description: "Rendered Markdown fenced code language pill foreground.", defaultValue: "color-mix(in srgb, var(--accent) 88%, var(--fg-primary) 12%)", stability: "stable" },
  { name: "table-header-bg", cssCustomProperty: "--table-header-bg", category: "color", description: "Rendered Markdown table header background.", defaultValue: "var(--bg-inset)", stability: "stable" },
  { name: "table-header-fg", cssCustomProperty: "--table-header-fg", category: "color", description: "Rendered Markdown table header foreground.", defaultValue: "var(--fg-primary)", stability: "stable" },
  { name: "table-header-border-color", cssCustomProperty: "--table-header-border-color", category: "color", description: "Rendered Markdown table header border color.", defaultValue: "var(--border-color)", stability: "stable" },
  { name: "table-row-primary-bg", cssCustomProperty: "--table-row-primary-bg", category: "color", description: "Odd markdown table row background.", defaultValue: "var(--bg-panel)", stability: "stable" },
  { name: "table-row-secondary-bg", cssCustomProperty: "--table-row-secondary-bg", category: "color", description: "Even markdown table row background.", defaultValue: "var(--bg-inset)", stability: "stable" },
  { name: "editor-padding", cssCustomProperty: "--editor-padding", category: "spacing", description: "Editor inner padding.", defaultValue: "calc(24px * var(--ui-scale))", stability: "stable" },
  { name: "editor-line-height", cssCustomProperty: "--editor-line-height", category: "typography", description: "Base editor line height.", defaultValue: "calc(1.5rem * var(--ui-scale))", stability: "stable" },
  { name: "editor-line-rhythm", cssCustomProperty: "--editor-line-rhythm", category: "typography", description: "Shared editor line rhythm used by the textarea and gutter.", defaultValue: "var(--editor-line-height)", stability: "stable" },
  { name: "markdown-line-height", cssCustomProperty: "--markdown-line-height", category: "typography", description: "Base Markdown body line height.", defaultValue: "var(--editor-line-rhythm)", stability: "stable" },
  { name: "markdown-heading-line-height", cssCustomProperty: "--markdown-heading-line-height", category: "typography", description: "Markdown heading line height.", defaultValue: "calc(1.1 + ((var(--ui-scale) - 1) * 0.35))", stability: "stable" },
  { name: "pdf-page-size", cssCustomProperty: "--pdf-page-size", category: "layout", description: "Default PDF page size used by print/export styles.", defaultValue: "A4", stability: "stable" },
  { name: "pdf-page-margin-block", cssCustomProperty: "--pdf-page-margin-block", category: "spacing", description: "Top and bottom PDF page margin.", defaultValue: "14mm", stability: "stable" },
  { name: "pdf-page-margin-inline", cssCustomProperty: "--pdf-page-margin-inline", category: "spacing", description: "Left and right PDF page margin.", defaultValue: "16mm", stability: "stable" },
  { name: "pdf-content-font-size", cssCustomProperty: "--pdf-content-font-size", category: "typography", description: "Base Markdown font size for PDF output.", defaultValue: "10.5pt", stability: "stable" },
  { name: "pdf-content-line-height", cssCustomProperty: "--pdf-content-line-height", category: "typography", description: "Base Markdown line height for PDF output.", defaultValue: "1.5", stability: "stable" },
  { name: "pdf-heading-keep-with-next", cssCustomProperty: "--pdf-heading-keep-with-next", category: "layout", description: "Heading page-break behavior for PDF output.", defaultValue: "avoid", stability: "stable" },
  { name: "line-number-gutter-width", cssCustomProperty: "--line-number-gutter-width", category: "layout", description: "Width of the editor line-number gutter.", defaultValue: "calc(26px * var(--ui-scale))", stability: "stable" },
  { name: "editor-content-width", cssCustomProperty: "--editor-content-width", category: "layout", description: "Shared editor and Markdown content width alignment token.", defaultValue: "78ch", stability: "stable" },
  { name: "font-ui", cssCustomProperty: "--font-ui", category: "typography", description: "UI font stack.", defaultValue: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", stability: "stable" },
  { name: "font-mono", cssCustomProperty: "--font-mono", category: "typography", description: "Monospace font stack.", defaultValue: "'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace", stability: "stable" },
  { name: "font-head", cssCustomProperty: "--font-head", category: "typography", description: "Heading font stack.", defaultValue: "'Inter', sans-serif", stability: "stable" },
] as const satisfies readonly ThemeTokenDefinition[];

export type MarkdownPackageThemeTokenMap = Readonly<Record<MarkdownPackageThemeTokenName, string>>;

export type MarkdownWorkspaceThemeTokenName = MarkdownPackageThemeTokenName;
export type MarkdownWorkspaceThemeTokenMap = MarkdownPackageThemeTokenMap;

export type MarkdownWorkspaceUiTokenName = MarkdownWorkspaceThemeTokenName;
export type MarkdownWorkspaceUiTokenMap = MarkdownWorkspaceThemeTokenMap;
export type MarkdownPackageUiTokenName = MarkdownPackageThemeTokenName;
export type MarkdownPackageUiTokenMap = MarkdownPackageThemeTokenMap;
export type UiTokenDefinition = ThemeTokenDefinition;

export const MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES = MARKDOWN_PACKAGE_THEME_TOKEN_NAMES;
export const MARKDOWN_WORKSPACE_THEME_TOKENS = MARKDOWN_PACKAGE_THEME_TOKENS;
export const MARKDOWN_WORKSPACE_UI_TOKEN_NAMES = MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES;
export const MARKDOWN_WORKSPACE_UI_TOKENS = MARKDOWN_WORKSPACE_THEME_TOKENS;
export const MARKDOWN_PACKAGE_UI_TOKEN_NAMES = MARKDOWN_PACKAGE_THEME_TOKEN_NAMES;

export const MARKDOWN_PACKAGE_TOKEN_DEFAULTS = Object.freeze(
  Object.fromEntries(
    MARKDOWN_PACKAGE_THEME_TOKENS.map((definition) => [definition.name, definition.defaultValue]),
  ) as MarkdownPackageThemeTokenMap,
);

export const MARKDOWN_WORKSPACE_TOKEN_DEFAULTS = MARKDOWN_PACKAGE_TOKEN_DEFAULTS;

export const MARKDOWN_WORKSPACE_TOKEN_CSS_CUSTOM_PROPERTIES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_TOKENS.map((definition) => definition.cssCustomProperty),
) as readonly ThemeTokenDefinition["cssCustomProperty"][];
