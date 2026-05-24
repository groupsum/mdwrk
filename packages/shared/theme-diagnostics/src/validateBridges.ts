import { MARKDOWN_WORKSPACE_THEME_BRIDGES } from "@mdwrk/theme-contract/bridges";
import { MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES } from "@mdwrk/theme-contract/tokens";
import type { ThemeDiagnosticsReport } from "./types.js";

export function validateThemeBridges(): ThemeDiagnosticsReport {
  const known = new Set<string>(MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES);
  const diagnostics = MARKDOWN_WORKSPACE_THEME_BRIDGES
    .filter((bridge) => !known.has(bridge.sourceToken))
    .map((bridge) => ({
      code: "orphan-bridge",
      severity: "error" as const,
      message: `Bridge ${bridge.cssCustomProperty} points at missing token ${bridge.sourceToken}`,
      target: bridge.cssCustomProperty,
    }));

  return {
    ok: diagnostics.length === 0,
    diagnostics,
  };
}
