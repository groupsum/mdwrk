import type { ThemePreset } from "@mdwrk/theme-contract/themes";
import { MARKDOWN_WORKSPACE_THEME_TOKENS } from "@mdwrk/theme-contract/tokens";
import type { ThemeDiagnosticsReport } from "./types.js";

export function validatePresetCoverage(preset: ThemePreset): ThemeDiagnosticsReport {
  const diagnostics = MARKDOWN_WORKSPACE_THEME_TOKENS
    .filter((definition) => definition.stability === "stable" && !(definition.name in preset.tokens))
    .map((definition) => ({
      code: "missing-stable-token",
      severity: "warning" as const,
      message: `Preset does not override stable token ${definition.name}`,
      target: definition.name,
    }));

  return {
    ok: diagnostics.length === 0,
    diagnostics,
  };
}
