export const MARKDOWN_WORKSPACE_THEME_CLASS_NAMES = [
  "markdown-body",
  "md-h1",
  "md-h2",
  "md-h3",
  "md-h4",
  "md-h5",
  "md-h6",
  "md-p",
  "md-strong",
  "md-em",
  "md-underline",
  "md-hr",
  "md-blockquote",
  "md-ul",
  "md-ol",
  "md-li",
  "md-task-list-item",
  "md-checkbox",
  "md-link",
  "md-inline-code",
  "md-table",
  "md-table-head",
  "md-table-body",
  "md-table-row",
  "md-table-header",
  "md-table-cell",
  "md-table-caption",
  "md-table-columns",
  "md-table-column",
  "md-code-block",
  "md-code-header",
  "md-code-language",
  "md-code-surface",
  "md-code-content",
  "mw-editor",
  "mw-editor-layout",
  "mw-editor-gutter",
  "mw-editor-line-number",
  "mw-editor-textarea",
  "mw-editor--line-numbers-visible",
  "mw-editor--line-numbers-hidden",
  "mw-editor--soft-wrap",
  "mw-editor--nowrap",
  "mw-editor-textarea--wrap",
  "mw-editor-textarea--nowrap",
  "mw-html-document",
  "mw-html-head",
  "mw-html-body",
  "mw-html-export",
  "mw-html-content",
  "mw-html-metadata",
  "mw-pdf-document",
  "mw-pdf-page",
  "mw-pdf-content",
  "mw-pdf-heading",
  "mw-pdf-running-header",
  "mw-pdf-running-footer",
] as const;

export type MarkdownWorkspaceThemeClassName = typeof MARKDOWN_WORKSPACE_THEME_CLASS_NAMES[number];

export type ThemeClassScope = "renderer" | "editor" | "html" | "pdf" | "app";

export interface ThemeClassDefinition {
  readonly name: MarkdownWorkspaceThemeClassName;
  readonly selector: `.${string}`;
  readonly scope: ThemeClassScope;
  readonly description: string;
  readonly stability: "stable" | "provisional" | "experimental";
}

export const MARKDOWN_WORKSPACE_THEME_CLASSES = [
  { name: "markdown-body", selector: ".markdown-body", scope: "renderer", description: "Root scope class for rendered markdown content.", stability: "stable" },
  { name: "md-h1", selector: ".md-h1", scope: "renderer", description: "Level-1 heading helper class.", stability: "provisional" },
  { name: "md-h2", selector: ".md-h2", scope: "renderer", description: "Level-2 heading helper class.", stability: "provisional" },
  { name: "md-h3", selector: ".md-h3", scope: "renderer", description: "Level-3 heading helper class.", stability: "provisional" },
  { name: "md-h4", selector: ".md-h4", scope: "renderer", description: "Level-4 heading helper class.", stability: "provisional" },
  { name: "md-h5", selector: ".md-h5", scope: "renderer", description: "Level-5 heading helper class.", stability: "provisional" },
  { name: "md-h6", selector: ".md-h6", scope: "renderer", description: "Level-6 heading helper class.", stability: "provisional" },
  { name: "md-p", selector: ".md-p", scope: "renderer", description: "Paragraph helper class.", stability: "provisional" },
  { name: "md-strong", selector: ".md-strong", scope: "renderer", description: "Strong emphasis helper class.", stability: "provisional" },
  { name: "md-em", selector: ".md-em", scope: "renderer", description: "Emphasis helper class.", stability: "provisional" },
  { name: "md-underline", selector: ".md-underline", scope: "renderer", description: "Underline helper class.", stability: "provisional" },
  { name: "md-hr", selector: ".md-hr", scope: "renderer", description: "Horizontal rule helper class.", stability: "provisional" },
  { name: "md-blockquote", selector: ".md-blockquote", scope: "renderer", description: "Blockquote helper class.", stability: "provisional" },
  { name: "md-ul", selector: ".md-ul", scope: "renderer", description: "Unordered-list helper class.", stability: "provisional" },
  { name: "md-ol", selector: ".md-ol", scope: "renderer", description: "Ordered-list helper class.", stability: "provisional" },
  { name: "md-li", selector: ".md-li", scope: "renderer", description: "List-item helper class.", stability: "provisional" },
  { name: "md-task-list-item", selector: ".md-task-list-item", scope: "renderer", description: "Task-list list-item helper class.", stability: "stable" },
  { name: "md-checkbox", selector: ".md-checkbox", scope: "renderer", description: "Task-list checkbox helper class.", stability: "stable" },
  { name: "md-link", selector: ".md-link", scope: "renderer", description: "Anchor helper class.", stability: "provisional" },
  { name: "md-inline-code", selector: ".md-inline-code", scope: "renderer", description: "Inline-code helper class.", stability: "provisional" },
  { name: "md-table", selector: ".md-table", scope: "renderer", description: "Portable markdown table root class.", stability: "stable" },
  { name: "md-table-head", selector: ".md-table-head", scope: "renderer", description: "Portable markdown table head section class.", stability: "stable" },
  { name: "md-table-body", selector: ".md-table-body", scope: "renderer", description: "Portable markdown table body section class.", stability: "stable" },
  { name: "md-table-row", selector: ".md-table-row", scope: "renderer", description: "Portable markdown table row class.", stability: "stable" },
  { name: "md-table-header", selector: ".md-table-header", scope: "renderer", description: "Portable markdown table header class.", stability: "stable" },
  { name: "md-table-cell", selector: ".md-table-cell", scope: "renderer", description: "Portable markdown table cell class.", stability: "stable" },
  { name: "md-table-caption", selector: ".md-table-caption", scope: "renderer", description: "Portable markdown table caption class.", stability: "stable" },
  { name: "md-table-columns", selector: ".md-table-columns", scope: "renderer", description: "Portable markdown table colgroup class.", stability: "provisional" },
  { name: "md-table-column", selector: ".md-table-column", scope: "renderer", description: "Portable markdown table column class.", stability: "provisional" },
  { name: "md-code-block", selector: ".md-code-block", scope: "renderer", description: "Portable fenced code block root class.", stability: "stable" },
  { name: "md-code-header", selector: ".md-code-header", scope: "renderer", description: "Portable fenced code header class.", stability: "stable" },
  { name: "md-code-language", selector: ".md-code-language", scope: "renderer", description: "Portable fenced code language pill class.", stability: "stable" },
  { name: "md-code-surface", selector: ".md-code-surface", scope: "renderer", description: "Portable fenced code surface class.", stability: "stable" },
  { name: "md-code-content", selector: ".md-code-content", scope: "renderer", description: "Portable fenced code content class applied to rendered code nodes.", stability: "stable" },
  { name: "mw-editor", selector: ".mw-editor", scope: "editor", description: "Portable markdown source editor root class.", stability: "stable" },
  { name: "mw-editor-layout", selector: ".mw-editor-layout", scope: "editor", description: "Portable markdown source editor layout class.", stability: "stable" },
  { name: "mw-editor-gutter", selector: ".mw-editor-gutter", scope: "editor", description: "Portable markdown source editor gutter class.", stability: "stable" },
  { name: "mw-editor-line-number", selector: ".mw-editor-line-number", scope: "editor", description: "Portable markdown source editor line-number class.", stability: "stable" },
  { name: "mw-editor-textarea", selector: ".mw-editor-textarea", scope: "editor", description: "Portable markdown source editor textarea class.", stability: "stable" },
  { name: "mw-editor--line-numbers-visible", selector: ".mw-editor--line-numbers-visible", scope: "editor", description: "Portable markdown source editor root state when the line-number gutter is visible.", stability: "stable" },
  { name: "mw-editor--line-numbers-hidden", selector: ".mw-editor--line-numbers-hidden", scope: "editor", description: "Portable markdown source editor root state when the line-number gutter is hidden.", stability: "stable" },
  { name: "mw-editor--soft-wrap", selector: ".mw-editor--soft-wrap", scope: "editor", description: "Portable markdown source editor root state when soft wrapping is enabled.", stability: "stable" },
  { name: "mw-editor--nowrap", selector: ".mw-editor--nowrap", scope: "editor", description: "Portable markdown source editor root state when source wrapping is disabled.", stability: "stable" },
  { name: "mw-editor-textarea--wrap", selector: ".mw-editor-textarea--wrap", scope: "editor", description: "Portable markdown source editor textarea state when soft wrapping is enabled.", stability: "stable" },
  { name: "mw-editor-textarea--nowrap", selector: ".mw-editor-textarea--nowrap", scope: "editor", description: "Portable markdown source editor textarea state when source wrapping is disabled.", stability: "stable" },
  { name: "mw-html-document", selector: ".mw-html-document", scope: "html", description: "Portable HTML export document root class.", stability: "stable" },
  { name: "mw-html-head", selector: ".mw-html-head", scope: "html", description: "Portable HTML export head class.", stability: "stable" },
  { name: "mw-html-body", selector: ".mw-html-body", scope: "html", description: "Portable HTML export body class.", stability: "stable" },
  { name: "mw-html-export", selector: ".mw-html-export", scope: "html", description: "Portable HTML export wrapper class around the exported markdown surface.", stability: "stable" },
  { name: "mw-html-content", selector: ".mw-html-content", scope: "html", description: "Portable HTML export content wrapper class around rendered markdown output.", stability: "stable" },
  { name: "mw-html-metadata", selector: ".mw-html-metadata", scope: "html", description: "Portable HTML export metadata marker class.", stability: "stable" },
  { name: "mw-pdf-document", selector: ".mw-pdf-document", scope: "pdf", description: "Portable PDF export document wrapper class.", stability: "stable" },
  { name: "mw-pdf-page", selector: ".mw-pdf-page", scope: "pdf", description: "Portable PDF export page wrapper class.", stability: "stable" },
  { name: "mw-pdf-content", selector: ".mw-pdf-content", scope: "pdf", description: "Portable PDF export content wrapper class.", stability: "stable" },
  { name: "mw-pdf-heading", selector: ".mw-pdf-heading", scope: "pdf", description: "Portable PDF export heading surface class.", stability: "stable" },
  { name: "mw-pdf-running-header", selector: ".mw-pdf-running-header", scope: "pdf", description: "Portable PDF export running header class.", stability: "stable" },
  { name: "mw-pdf-running-footer", selector: ".mw-pdf-running-footer", scope: "pdf", description: "Portable PDF export running footer class.", stability: "stable" },
] as const satisfies readonly ThemeClassDefinition[];

export const MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASS_NAMES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "renderer")
    .map((definition) => definition.name),
) as readonly MarkdownWorkspaceThemeClassName[];

export type MarkdownWorkspaceRendererHelperClassName = typeof MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASS_NAMES[number];

export interface RendererHelperClassDefinition extends ThemeClassDefinition {
  readonly group: "scope" | "heading" | "text" | "list" | "table" | "code" | "form";
}

export const MARKDOWN_WORKSPACE_EDITOR_HELPER_CLASS_NAMES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "editor")
    .map((definition) => definition.name),
) as readonly MarkdownWorkspaceThemeClassName[];

export type MarkdownWorkspaceEditorHelperClassName = typeof MARKDOWN_WORKSPACE_EDITOR_HELPER_CLASS_NAMES[number];

export interface EditorHelperClassDefinition extends ThemeClassDefinition {
  readonly group: "root" | "layout" | "gutter" | "line-number" | "textarea" | "state";
}

export const MARKDOWN_WORKSPACE_HTML_HELPER_CLASS_NAMES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "html")
    .map((definition) => definition.name),
) as readonly MarkdownWorkspaceThemeClassName[];

export type MarkdownWorkspaceHtmlHelperClassName = typeof MARKDOWN_WORKSPACE_HTML_HELPER_CLASS_NAMES[number];

export interface HtmlHelperClassDefinition extends ThemeClassDefinition {
  readonly group: "document" | "head" | "body" | "export" | "content" | "metadata";
}

export const MARKDOWN_WORKSPACE_PDF_HELPER_CLASS_NAMES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "pdf")
    .map((definition) => definition.name),
) as readonly MarkdownWorkspaceThemeClassName[];

export type MarkdownWorkspacePdfHelperClassName = typeof MARKDOWN_WORKSPACE_PDF_HELPER_CLASS_NAMES[number];

export interface PdfHelperClassDefinition extends ThemeClassDefinition {
  readonly group: "document" | "page" | "content" | "heading" | "running-header" | "running-footer";
}

function resolveGroup(name: MarkdownWorkspaceThemeClassName): RendererHelperClassDefinition["group"] {
  if (name === "markdown-body") return "scope";
  if (name.startsWith("md-h")) return "heading";
  if (["md-p", "md-strong", "md-em", "md-underline", "md-hr", "md-blockquote", "md-link"].includes(name)) return "text";
  if (["md-ul", "md-ol", "md-li", "md-task-list-item"].includes(name)) return "list";
  if (["md-checkbox"].includes(name)) return "form";
  if (name.startsWith("md-table")) return "table";
  return "code";
}

export const MARKDOWN_WORKSPACE_RENDERER_HELPER_CLASSES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "renderer")
    .map((definition) => ({ ...definition, group: resolveGroup(definition.name) })),
) as readonly RendererHelperClassDefinition[];

function resolveEditorGroup(name: MarkdownWorkspaceThemeClassName): EditorHelperClassDefinition["group"] {
  if (name === "mw-editor") return "root";
  if (name === "mw-editor-layout") return "layout";
  if (name === "mw-editor-gutter") return "gutter";
  if (name === "mw-editor-line-number") return "line-number";
  if (name === "mw-editor-textarea") return "textarea";
  return "state";
}

export const MARKDOWN_WORKSPACE_EDITOR_HELPER_CLASSES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "editor")
    .map((definition) => ({ ...definition, group: resolveEditorGroup(definition.name) })),
) as readonly EditorHelperClassDefinition[];

function resolveHtmlGroup(name: MarkdownWorkspaceThemeClassName): HtmlHelperClassDefinition["group"] {
  if (name === "mw-html-document") return "document";
  if (name === "mw-html-head") return "head";
  if (name === "mw-html-body") return "body";
  if (name === "mw-html-export") return "export";
  if (name === "mw-html-content") return "content";
  return "metadata";
}

export const MARKDOWN_WORKSPACE_HTML_HELPER_CLASSES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "html")
    .map((definition) => ({ ...definition, group: resolveHtmlGroup(definition.name) })),
) as readonly HtmlHelperClassDefinition[];

function resolvePdfGroup(name: MarkdownWorkspaceThemeClassName): PdfHelperClassDefinition["group"] {
  if (name === "mw-pdf-document") return "document";
  if (name === "mw-pdf-page") return "page";
  if (name === "mw-pdf-content") return "content";
  if (name === "mw-pdf-heading") return "heading";
  if (name === "mw-pdf-running-header") return "running-header";
  return "running-footer";
}

export const MARKDOWN_WORKSPACE_PDF_HELPER_CLASSES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.scope === "pdf")
    .map((definition) => ({ ...definition, group: resolvePdfGroup(definition.name) })),
) as readonly PdfHelperClassDefinition[];

export const MARKDOWN_WORKSPACE_STABLE_THEME_CLASS_NAMES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES
    .filter((definition) => definition.stability === "stable")
    .map((definition) => definition.name),
) as readonly MarkdownWorkspaceThemeClassName[];

export const MARKDOWN_WORKSPACE_STABLE_THEME_CLASSES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_CLASSES.filter((definition) => definition.stability === "stable"),
) as readonly ThemeClassDefinition[];

export type MarkdownWorkspaceStableThemeClassName = typeof MARKDOWN_WORKSPACE_STABLE_THEME_CLASS_NAMES[number];
export type StableThemeClassDefinition = ThemeClassDefinition;
