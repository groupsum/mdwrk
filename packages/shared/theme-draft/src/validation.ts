import type { ThemeDraft } from "@mdwrk/theme-contract/themes";
import {
  MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES,
  MARKDOWN_WORKSPACE_THEME_TOKENS,
  type MarkdownWorkspaceThemeTokenName,
} from "@mdwrk/theme-contract/tokens";
import type { ThemeDraftValidationIssue, ThemeDraftValidationResult } from "./types.js";

export function validateThemeDraft(draft: ThemeDraft): ThemeDraftValidationResult {
  const knownTokenNames = new Set<string>(MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES);
  const unknownTokens = Object.keys(draft.tokens).filter((tokenName) => !knownTokenNames.has(tokenName));
  const missingTokens = MARKDOWN_WORKSPACE_THEME_TOKENS
    .filter((definition) => definition.stability === "stable" && !(definition.name in draft.tokens))
    .map((definition) => definition.name) as readonly MarkdownWorkspaceThemeTokenName[];

  const issues: ThemeDraftValidationIssue[] = [
    ...unknownTokens.map((token) => ({
      token,
      message: "Token is not part of the MdWrk theme contract.",
      severity: "error" as const,
    })),
    ...missingTokens.map((token) => ({
      token,
      message: "Stable contract token is not overridden in this draft.",
      severity: "warning" as const,
    })),
  ];

  return {
    valid: unknownTokens.length === 0,
    unknownTokens,
    missingTokens,
    issues,
  };
}
