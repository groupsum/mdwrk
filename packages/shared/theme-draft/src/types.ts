import type {
  MarkdownWorkspaceThemeTokenName,
  MarkdownWorkspaceThemeTokenMap,
} from "@mdwrk/theme-contract/tokens";
import type { ThemeDraft, ThemePreset } from "@mdwrk/theme-contract/themes";

export type ThemeTokenOverrideMap = Partial<Record<MarkdownWorkspaceThemeTokenName, string>>;

export interface ThemeDraftPatch {
  readonly set?: ThemeTokenOverrideMap;
  readonly unset?: readonly MarkdownWorkspaceThemeTokenName[];
}

export interface ThemeDraftValidationIssue {
  readonly token: string;
  readonly message: string;
  readonly severity: "error" | "warning";
}

export interface ThemeDraftValidationResult {
  readonly valid: boolean;
  readonly unknownTokens: readonly string[];
  readonly missingTokens: readonly MarkdownWorkspaceThemeTokenName[];
  readonly issues: readonly ThemeDraftValidationIssue[];
}

export interface ThemeDraftSnapshot {
  readonly draft: ThemeDraft;
  readonly label?: string;
}

export interface ThemeDraftHistoryState {
  readonly past: readonly ThemeDraftSnapshot[];
  readonly present: ThemeDraftSnapshot;
  readonly future: readonly ThemeDraftSnapshot[];
}

export interface ThemeDraftExportEnvelope {
  readonly version: 1;
  readonly draft: ThemeDraft;
}

export interface ResolvedThemeDraft {
  readonly draft: ThemeDraft;
  readonly resolvedTokens: MarkdownWorkspaceThemeTokenMap;
}

export interface ThemePresetDraftPair {
  readonly preset: ThemePreset;
  readonly draft: ThemeDraft;
}

export interface ThemeDraftDiff {
  readonly set: ThemeTokenOverrideMap;
  readonly unset: readonly MarkdownWorkspaceThemeTokenName[];
}
