
import type React from "react";
import type {
  MarkdownHtmlHandlingMode,
  MarkdownLinkAttributeResult,
  MarkdownOperatorDescriptor,
  MarkdownOptionalProfileId,
  MarkdownProfileId,
} from "@mdwrk/markdown-renderer-core";

export interface MarkdownRendererThemeVariables {
  readonly foreground?: string;
  readonly foregroundMuted?: string;
  readonly background?: string;
  readonly border?: string;
  readonly accent?: string;
  readonly codeInlineBackground?: string;
  readonly codeInlineForeground?: string;
  readonly codeBlockBackground?: string;
  readonly codeBlockForeground?: string;
  readonly codeHeaderBackground?: string;
  readonly codeHeaderForeground?: string;
  readonly codeLanguageBackground?: string;
  readonly codeLanguageForeground?: string;
  readonly fontUi?: string;
  readonly fontMono?: string;
  readonly lineHeight?: string;
  readonly headingLineHeight?: string;
}

export interface MarkdownRendererProps {
  readonly markdown: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly themeStyle?: React.CSSProperties;
  readonly onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>, href?: string) => void;
  readonly getLinkAttributes?: (href?: string) => MarkdownLinkAttributeResult | undefined;
  readonly components?: Record<string, React.ComponentType<any>>;
  readonly syntaxTheme?: Record<string, React.CSSProperties>;
  readonly htmlHandling?: MarkdownHtmlHandlingMode;
  readonly profile?: MarkdownProfileId;
  readonly extensions?: readonly MarkdownOptionalProfileId[];
  readonly sourcePositionAttributes?: boolean;
  readonly preserveSoftLineBreaks?: boolean;
}

export type MarkdownPreviewCommandDescriptor = MarkdownOperatorDescriptor;


export interface RenderMarkdownToStaticHtmlProps {
  readonly markdown: string;
  readonly htmlHandling?: MarkdownHtmlHandlingMode;
  readonly profile?: MarkdownProfileId;
  readonly extensions?: readonly MarkdownOptionalProfileId[];
  readonly sourcePositionAttributes?: boolean;
  readonly preserveSoftLineBreaks?: boolean;
  readonly getLinkAttributes?: (href?: string) => MarkdownLinkAttributeResult | undefined;
}

export interface RenderMarkdownToStaticHtmlDocumentProps extends RenderMarkdownToStaticHtmlProps {
  readonly title: string;
  readonly lang?: string;
  readonly dataTheme?: string;
  readonly htmlClassName?: string;
  readonly bodyClassName?: string;
  readonly stylesheets?: readonly string[];
}
