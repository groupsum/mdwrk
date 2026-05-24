import type { ThemeDraft, ThemePreset } from "@mdwrk/theme-contract/themes";
import { MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES } from "@mdwrk/theme-contract/tokens";
import type { ThemeDiagnostic, ThemeDiagnosticsReport } from "./types.js";

export function validateThemeTokens(
  input: ThemeDraft | ThemePreset,
): ThemeDiagnosticsReport {
  const known = new Set<string>(MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES);
  const diagnostics: ThemeDiagnostic[] = [];

  for (const tokenName of Object.keys(input.tokens)) {
    if (!known.has(tokenName)) {
      diagnostics.push({
        code: "unknown-token",
        severity: "error",
        message: `Unknown theme token: ${tokenName}`,
        target: tokenName,
      });
      continue;
    }

    const value = input.tokens[tokenName as keyof typeof input.tokens];
    if (typeof value === "string" && value.trim().length === 0) {
      diagnostics.push({
        code: "blank-token-value",
        severity: "warning",
        message: `Theme token ${tokenName} resolves to an empty string.`,
        target: tokenName,
      });
    }
  }

  return {
    ok: diagnostics.length === 0,
    diagnostics,
  };
}
