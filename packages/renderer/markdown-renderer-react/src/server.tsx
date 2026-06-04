import {
  exportMarkdownToHtmlDocument,
  exportMarkdownToPdfDocument,
  renderMarkdownToHtmlSync,
} from "@mdwrk/markdown-renderer-core";
import type { RenderMarkdownToStaticHtmlDocumentProps, RenderMarkdownToStaticHtmlProps } from "./types.js";

export function renderMarkdownToStaticHtml(props: RenderMarkdownToStaticHtmlProps): string {
  const { markdown, htmlHandling, profile = "gfm-default", extensions, sourcePositionAttributes, preserveSoftLineBreaks, getLinkAttributes } = props;
  return renderMarkdownToHtmlSync(markdown, {
    htmlHandling,
    profile,
    extensions,
    sourcePositionAttributes,
    preserveSoftLineBreaks,
    getLinkAttributes,
  });
}

export function renderMarkdownToStaticHtmlDocument(props: RenderMarkdownToStaticHtmlDocumentProps): string {
  const { title, lang, dataTheme, bodyClassName, htmlClassName, stylesheets, markdown, htmlHandling, profile = "gfm-default", extensions, sourcePositionAttributes, preserveSoftLineBreaks, getLinkAttributes } = props;
  return exportMarkdownToHtmlDocument(markdown, {
    title,
    lang,
    dataTheme,
    bodyClassName,
    htmlClassName,
    stylesheets,
    htmlHandling,
    profile,
    extensions,
    sourcePositionAttributes,
    preserveSoftLineBreaks,
    getLinkAttributes,
  }).html;
}

export function renderMarkdownToStaticPdfDocument(props: RenderMarkdownToStaticHtmlDocumentProps) {
  const { title, lang, dataTheme, bodyClassName, htmlClassName, stylesheets, markdown, htmlHandling, profile = "gfm-default", extensions, sourcePositionAttributes, preserveSoftLineBreaks, getLinkAttributes } = props;
  return exportMarkdownToPdfDocument(markdown, {
    title,
    lang,
    dataTheme,
    bodyClassName,
    htmlClassName,
    stylesheets,
    htmlHandling,
    profile,
    extensions,
    sourcePositionAttributes,
    preserveSoftLineBreaks,
    getLinkAttributes,
  });
}
