import { parseMarkdownDocument } from "./frontmatter.js";
import { createHtmlDocument, renderMarkdownToHtmlDocumentSync } from "./html.js";
import { parseMarkdownToAst, renderMarkdownToHtmlSync } from "./pipeline.js";
import type {
  ExportedHtmlDocument,
  ExportedMarkdownDocument,
  ExportedPdfDocument,
  MarkdownAstRoot,
  MarkdownBlockMapEntry,
  MarkdownOperatorDescriptor,
  ParseMarkdownDocumentOptions,
  ParsedMarkdownDocument,
  RenderMarkdownToHtmlDocumentOptions,
  RenderMarkdownToHtmlOptions,
} from "./types.js";

export type MarkdownOperatorId =
  | "load"
  | "parse"
  | "get-block-map"
  | "export-markdown"
  | "export-html"
  | "export-pdf";

export const MARKDOWN_OPERATOR_DESCRIPTORS = [
  { id: "load", title: "Load", scope: "shared", applicability: ["cm", "gfm", "cfm", "mdwrk-operator"], description: "Load markdown into the MdWrk parsed document contract." },
  { id: "parse", title: "Parse", scope: "shared", applicability: ["cm", "gfm", "cfm"], description: "Parse markdown into the portable MdWrk AST." },
  { id: "get-block-map", title: "Get Block Map", scope: "shared", applicability: ["mdwrk-operator"], description: "Produce a block map view over the parsed markdown tree." },
  { id: "export-markdown", title: "Export Markdown", scope: "shared", applicability: ["cm", "gfm", "cfm"], description: "Return the markdown source as an explicit export artifact." },
  { id: "export-html", title: "Export HTML", scope: "shared", applicability: ["cm", "gfm", "cfm"], description: "Export a complete HTML document for rendered markdown." },
  { id: "export-pdf", title: "Export PDF", scope: "shared", applicability: ["mdwrk-operator"], description: "Export a print-ready PDF artifact contract backed by HTML and bridge styles." },
] as const satisfies readonly MarkdownOperatorDescriptor<MarkdownOperatorId>[];

export function loadMarkdownDocument(markdown: string, options: ParseMarkdownDocumentOptions = {}): ParsedMarkdownDocument {
  return parseMarkdownDocument(markdown, options);
}

export function exportMarkdownSource(markdown: string): ExportedMarkdownDocument {
  return {
    format: "markdown",
    markdown,
    applicability: ["cm", "gfm", "cfm"],
  };
}

function flattenBlockMapChildren(
  nodes: readonly any[],
  entries: MarkdownBlockMapEntry[],
  prefix: string,
): void {
  nodes.forEach((node, index) => {
    const id = `${prefix}.${index}`;
    entries.push({
      id,
      type: node.type,
      depth: node.depth,
      ordered: node.ordered,
      task: node.task,
      checked: node.checked,
      text: node.text ?? node.value ?? node.identifier,
      position: node.position,
    });
    if (Array.isArray(node.items)) {
      flattenBlockMapChildren(node.items, entries, `${id}.items`);
    }
    if (Array.isArray(node.children)) {
      flattenBlockMapChildren(node.children as readonly any[], entries, `${id}.children`);
    }
  });
}

export function getMarkdownBlockMap(
  astOrMarkdown: MarkdownAstRoot | string,
  options: RenderMarkdownToHtmlOptions = {},
): readonly MarkdownBlockMapEntry[] {
  const ast = typeof astOrMarkdown === "string" ? parseMarkdownToAst(astOrMarkdown, options) : astOrMarkdown;
  const entries: MarkdownBlockMapEntry[] = [];
  flattenBlockMapChildren(ast.children, entries, "root");
  return entries;
}

export function exportMarkdownToHtmlDocument(
  markdown: string,
  options: RenderMarkdownToHtmlDocumentOptions,
): ExportedHtmlDocument {
  return {
    format: "html",
    html: renderMarkdownToHtmlDocumentSync(markdown, options),
    applicability: ["cm", "gfm", "cfm"],
  };
}

export function exportMarkdownToPdfDocument(
  markdown: string,
  options: RenderMarkdownToHtmlDocumentOptions,
): ExportedPdfDocument {
  const html = renderMarkdownToHtmlSync(markdown, options);
  const bridgeStyles = options.stylesheets ?? [];
  return {
    format: "pdf",
    html: createHtmlDocument({
      title: options.title,
      bodyHtml: html,
      lang: options.lang,
      dataTheme: options.dataTheme,
      htmlClassName: options.htmlClassName,
      bodyClassName: options.bodyClassName,
      stylesheets: bridgeStyles,
    }),
    metadata: {
      title: options.title,
      lang: options.lang ?? "en",
      dataTheme: options.dataTheme,
    },
    bridgeStyles,
    applicability: ["mdwrk-operator"],
  };
}

export function listMarkdownOperators(): readonly MarkdownOperatorDescriptor<MarkdownOperatorId>[] {
  return MARKDOWN_OPERATOR_DESCRIPTORS;
}
