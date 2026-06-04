import type { MarkdownWorkspaceThemeTokenName } from "./tokens.js";

export type ThemeBridgeTarget = "renderer" | "editor" | "html" | "pdf";

export interface ThemeBridgeVariableDefinition {
  readonly target: ThemeBridgeTarget;
  readonly cssCustomProperty: `--${string}`;
  readonly sourceToken: MarkdownWorkspaceThemeTokenName;
  readonly description: string;
  readonly stability: "stable" | "provisional";
}

export const MARKDOWN_WORKSPACE_THEME_BRIDGES = [
  { target: "renderer", cssCustomProperty: "--mw-fg-primary", sourceToken: "fg-primary", description: "Renderer primary foreground bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-fg-secondary", sourceToken: "fg-secondary", description: "Renderer secondary foreground bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-bg-surface", sourceToken: "bg-panel", description: "Renderer surface background bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-border-color", sourceToken: "border-color", description: "Renderer border bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-accent", sourceToken: "accent", description: "Renderer accent bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-inline-bg", sourceToken: "code-inline-bg", description: "Renderer inline code background bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-inline-fg", sourceToken: "code-inline-fg", description: "Renderer inline code foreground bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-block-bg", sourceToken: "code-block-bg", description: "Renderer fenced code background bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-block-fg", sourceToken: "code-block-fg", description: "Renderer fenced code foreground bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-header-bg", sourceToken: "code-header-bg", description: "Renderer fenced code header background bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-header-fg", sourceToken: "code-header-fg", description: "Renderer fenced code header foreground bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-language-bg", sourceToken: "code-language-bg", description: "Renderer fenced code language pill background bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-code-language-fg", sourceToken: "code-language-fg", description: "Renderer fenced code language pill foreground bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-font-ui", sourceToken: "font-ui", description: "Renderer UI font bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-font-mono", sourceToken: "font-mono", description: "Renderer monospace font bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-line-height", sourceToken: "markdown-line-height", description: "Renderer body line-height bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-heading-line-height", sourceToken: "markdown-heading-line-height", description: "Renderer heading line-height bridge.", stability: "stable" },
  { target: "renderer", cssCustomProperty: "--mw-content-width", sourceToken: "editor-content-width", description: "Renderer content width bridge shared with editor panes.", stability: "stable" },
  { target: "html", cssCustomProperty: "--mw-html-fg-primary", sourceToken: "fg-primary", description: "HTML export foreground bridge.", stability: "stable" },
  { target: "html", cssCustomProperty: "--mw-html-bg-surface", sourceToken: "bg-panel", description: "HTML export background bridge.", stability: "stable" },
  { target: "html", cssCustomProperty: "--mw-html-border-color", sourceToken: "border-color", description: "HTML export border bridge.", stability: "stable" },
  { target: "html", cssCustomProperty: "--mw-html-accent", sourceToken: "accent", description: "HTML export accent bridge.", stability: "stable" },
  { target: "html", cssCustomProperty: "--mw-html-font-ui", sourceToken: "font-ui", description: "HTML export UI font bridge.", stability: "stable" },
  { target: "html", cssCustomProperty: "--mw-html-font-mono", sourceToken: "font-mono", description: "HTML export monospace font bridge.", stability: "stable" },
  { target: "pdf", cssCustomProperty: "--mw-pdf-page-size", sourceToken: "pdf-page-size", description: "PDF export page-size bridge.", stability: "stable" },
  { target: "pdf", cssCustomProperty: "--mw-pdf-page-margin-block", sourceToken: "pdf-page-margin-block", description: "PDF export block-margin bridge.", stability: "stable" },
  { target: "pdf", cssCustomProperty: "--mw-pdf-page-margin-inline", sourceToken: "pdf-page-margin-inline", description: "PDF export inline-margin bridge.", stability: "stable" },
  { target: "pdf", cssCustomProperty: "--mw-pdf-content-font-size", sourceToken: "pdf-content-font-size", description: "PDF export font-size bridge.", stability: "stable" },
  { target: "pdf", cssCustomProperty: "--mw-pdf-content-line-height", sourceToken: "pdf-content-line-height", description: "PDF export line-height bridge.", stability: "stable" },
  { target: "pdf", cssCustomProperty: "--mw-pdf-heading-keep-with-next", sourceToken: "pdf-heading-keep-with-next", description: "PDF export heading flow bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-bg-surface", sourceToken: "bg-panel", description: "Editor surface background bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-bg-gutter", sourceToken: "bg-inset", description: "Editor gutter background bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-border-color", sourceToken: "border-color", description: "Editor border bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-fg-primary", sourceToken: "fg-primary", description: "Editor primary foreground bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-fg-muted", sourceToken: "fg-muted", description: "Editor muted foreground bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-accent", sourceToken: "accent", description: "Editor accent bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-font-mono", sourceToken: "font-mono", description: "Editor monospace font bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-editor-padding", sourceToken: "editor-padding", description: "Editor padding bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-line-height", sourceToken: "editor-line-rhythm", description: "Editor line-height bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-gutter-width", sourceToken: "line-number-gutter-width", description: "Editor line-number gutter-width bridge.", stability: "stable" },
  { target: "editor", cssCustomProperty: "--mwe-content-width", sourceToken: "editor-content-width", description: "Editor content width bridge shared with renderer panes.", stability: "stable" },
] as const satisfies readonly ThemeBridgeVariableDefinition[];

export const MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES = MARKDOWN_WORKSPACE_THEME_BRIDGES.filter(
  (definition) => definition.target === "renderer",
) as readonly ThemeBridgeVariableDefinition[];

export const MARKDOWN_WORKSPACE_HTML_THEME_BRIDGES = MARKDOWN_WORKSPACE_THEME_BRIDGES.filter(
  (definition) => definition.target === "html",
) as readonly ThemeBridgeVariableDefinition[];

export const MARKDOWN_WORKSPACE_PDF_THEME_BRIDGES = MARKDOWN_WORKSPACE_THEME_BRIDGES.filter(
  (definition) => definition.target === "pdf",
) as readonly ThemeBridgeVariableDefinition[];

export const MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES = MARKDOWN_WORKSPACE_THEME_BRIDGES.filter(
  (definition) => definition.target === "editor",
) as readonly ThemeBridgeVariableDefinition[];

export function getThemeBridgeDefinitions(target: ThemeBridgeTarget): readonly ThemeBridgeVariableDefinition[] {
  if (target === "renderer") return MARKDOWN_WORKSPACE_RENDERER_THEME_BRIDGES;
  if (target === "editor") return MARKDOWN_WORKSPACE_EDITOR_THEME_BRIDGES;
  if (target === "html") return MARKDOWN_WORKSPACE_HTML_THEME_BRIDGES;
  return MARKDOWN_WORKSPACE_PDF_THEME_BRIDGES;
}
