
import { renderMarkdownToHtml, renderMarkdownToHtmlSync } from "./pipeline.js";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderClassAttribute(...values) {
  const className = values.filter(Boolean).join(" ").trim();
  return className ? ` class="${escapeHtml(className)}"` : "";
}

export function createHtmlDocument(options) {
  const title = escapeHtml(options.title);
  const lang = options.lang ?? "en";
  const htmlClassName = renderClassAttribute("mw-html-document", options.htmlClassName);
  const dataTheme = options.dataTheme ? ` data-theme="${escapeHtml(options.dataTheme)}"` : "";
  const bodyClassName = renderClassAttribute("mw-html-body", "mw-pdf-document", options.bodyClassName);
  const stylesheets = options.stylesheets?.length
    ? `<style>\n${options.stylesheets.join("\n")}\n</style>`
    : "";
  const wrappedBodyHtml = [
    '<div class="mw-html-export mw-pdf-page">',
    '<main class="mw-html-content mw-pdf-content">',
    options.bodyHtml,
    "</main>",
    "</div>",
  ].join("\n");

  return [
    "<!DOCTYPE html>",
    `<html lang="${escapeHtml(lang)}"${dataTheme}${htmlClassName}>`,
    '<head class="mw-html-head">',
    "  <meta charset=\"UTF-8\" />",
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />",
    '  <meta class="mw-html-metadata" name="mdwrk-export-surface" content="html-document" />',
    `  <title>${title}</title>`,
    stylesheets,
    "</head>",
    `<body${bodyClassName}>`,
    wrappedBodyHtml,
    "</body>",
    "</html>",
  ].filter(Boolean).join("\n");
}

export async function renderMarkdownToHtmlDocument(markdown, options) {
  const bodyHtml = await renderMarkdownToHtml(markdown, options);
  return createHtmlDocument({
    title: options.title,
    bodyHtml,
    lang: options.lang,
    dataTheme: options.dataTheme,
    htmlClassName: options.htmlClassName,
    bodyClassName: options.bodyClassName,
    stylesheets: options.stylesheets,
  });
}

export function renderMarkdownToHtmlDocumentSync(markdown, options) {
  const bodyHtml = renderMarkdownToHtmlSync(markdown, options);
  return createHtmlDocument({
    title: options.title,
    bodyHtml,
    lang: options.lang,
    dataTheme: options.dataTheme,
    htmlClassName: options.htmlClassName,
    bodyClassName: options.bodyClassName,
    stylesheets: options.stylesheets,
  });
}
