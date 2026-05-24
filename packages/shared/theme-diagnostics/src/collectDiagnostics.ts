import type { ThemeDraft, ThemePreset } from "@mdwrk/theme-contract/themes";
import { validateThemeBridges } from "./validateBridges.js";
import { validateThemeContrastPairs } from "./validateContrastPairs.js";
import { validatePresetCoverage } from "./validatePresetCoverage.js";
import { validateThemeTokens } from "./validateTokens.js";
import type { ThemeDiagnosticsReport } from "./types.js";

export function collectThemeDiagnostics(input: ThemeDraft | ThemePreset): ThemeDiagnosticsReport {
  const tokenReport = validateThemeTokens(input);
  const bridgeReport = validateThemeBridges();
  const contrastReport = validateThemeContrastPairs(input);
  const coverageReport = "metadata" in input ? validatePresetCoverage(input) : { ok: true, diagnostics: [] };
  const diagnostics = [
    ...tokenReport.diagnostics,
    ...bridgeReport.diagnostics,
    ...contrastReport.diagnostics,
    ...coverageReport.diagnostics,
  ];

  return {
    ok: diagnostics.every((diagnostic) => diagnostic.severity !== "error"),
    diagnostics,
  };
}
