import type React from "react";
import {
  createRendererThemeBridgeVariableRecord,
  type ThemeTokenOverrides,
} from "@mdwrk/ui-tokens/theme-map";
import type { MarkdownRendererThemeVariables } from "./types.js";

export function createMarkdownRendererThemeStyle(
  variables: MarkdownRendererThemeVariables = {},
): React.CSSProperties {
  return {
    ["--mw-fg-primary" as any]: variables.foreground ?? "var(--fg-primary, #e9ecf1)",
    ["--mw-fg-secondary" as any]: variables.foregroundMuted ?? "var(--fg-secondary, #9aa3af)",
    ["--mw-bg-surface" as any]: variables.background ?? "var(--bg-panel, #11151a)",
    ["--mw-border-color" as any]: variables.border ?? "var(--border-color, rgba(255,255,255,0.12))",
    ["--mw-accent" as any]: variables.accent ?? "var(--accent, #7c9cff)",
    ["--mw-code-inline-bg" as any]: variables.codeInlineBackground ?? "var(--code-inline-bg, var(--bg-inset, rgba(255,255,255,0.04)))",
    ["--mw-code-inline-fg" as any]: variables.codeInlineForeground ?? "var(--code-inline-fg, var(--fg-secondary, #9aa3af))",
    ["--mw-code-block-bg" as any]: variables.codeBlockBackground ?? "var(--code-block-bg, var(--bg-inset, rgba(255,255,255,0.04)))",
    ["--mw-code-block-fg" as any]: variables.codeBlockForeground ?? "var(--code-block-fg, var(--fg-primary, #e9ecf1))",
    ["--mw-code-header-bg" as any]: variables.codeHeaderBackground ?? "var(--code-header-bg, var(--code-block-bg, var(--bg-inset, rgba(255,255,255,0.04))))",
    ["--mw-code-header-fg" as any]: variables.codeHeaderForeground ?? "var(--code-header-fg, var(--fg-muted, #9aa3af))",
    ["--mw-code-language-bg" as any]: variables.codeLanguageBackground ?? "var(--code-language-bg, color-mix(in srgb, var(--accent, #7c9cff) 11%, var(--bg-panel, #11151a) 89%))",
    ["--mw-code-language-fg" as any]: variables.codeLanguageForeground ?? "var(--code-language-fg, color-mix(in srgb, var(--accent, #7c9cff) 88%, var(--fg-primary, #e9ecf1) 12%))",
    ["--mw-font-ui" as any]: variables.fontUi ?? 'var(--font-ui, "Inter", "Segoe UI", system-ui, sans-serif)',
    ["--mw-font-mono" as any]: variables.fontMono ?? 'var(--font-mono, "Fira Code", ui-monospace, monospace)',
    ["--mw-line-height" as any]: variables.lineHeight ?? "var(--markdown-line-height, 1.6)",
    ["--mw-heading-line-height" as any]: variables.headingLineHeight ?? "var(--markdown-heading-line-height, 1.1)",
  };
}

export function createMarkdownRendererThemeVariablesFromThemeTokens(
  overrides: ThemeTokenOverrides = {},
): Readonly<Record<`--${string}`, string>> {
  return createRendererThemeBridgeVariableRecord(overrides);
}

export function createMarkdownRendererThemeStyleFromThemeTokens(
  overrides: ThemeTokenOverrides = {},
): React.CSSProperties {
  return createMarkdownRendererThemeVariablesFromThemeTokens(overrides) as React.CSSProperties;
}
