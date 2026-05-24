import type { ThemeDraft, ThemePreset } from "@mdwrk/theme-contract/themes";
import { createMarkdownWorkspaceThemeTokenMap } from "@mdwrk/ui-tokens/theme-map";
import { checkContrast, supportsHexContrast } from "./checkContrast.js";
import type { ThemeDiagnosticsReport } from "./types.js";

const CONTRAST_PAIRS = [
  { foregroundToken: "fg-primary", backgroundToken: "bg-panel", severity: "error" as const },
  { foregroundToken: "fg-secondary", backgroundToken: "bg-panel", severity: "warning" as const },
] as const;

export function validateThemeContrastPairs(input: ThemeDraft | ThemePreset): ThemeDiagnosticsReport {
  const resolved = createMarkdownWorkspaceThemeTokenMap(input.tokens);
  const diagnostics = [];

  for (const pair of CONTRAST_PAIRS) {
    const foreground = resolved[pair.foregroundToken];
    const background = resolved[pair.backgroundToken];
    if (!supportsHexContrast(foreground) || !supportsHexContrast(background)) {
      diagnostics.push({
        code: "contrast-skipped",
        severity: "info" as const,
        message: `Contrast check skipped for ${pair.foregroundToken}/${pair.backgroundToken} because one or both values are not hex colors.`,
        target: `${pair.foregroundToken}:${pair.backgroundToken}`,
      });
      continue;
    }

    const contrast = checkContrast(foreground, background);
    if (!contrast.passesAa) {
      diagnostics.push({
        code: "contrast-aa-failed",
        severity: pair.severity,
        message: `Contrast ratio for ${pair.foregroundToken}/${pair.backgroundToken} is ${contrast.ratio.toFixed(2)}, below the AA threshold.`,
        target: `${pair.foregroundToken}:${pair.backgroundToken}`,
      });
    }
  }

  return {
    ok: diagnostics.every((diagnostic) => diagnostic.severity !== "error"),
    diagnostics,
  };
}
