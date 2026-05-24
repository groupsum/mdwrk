import type { ThemeBridgeTarget } from "@mdwrk/theme-contract/bridges";
import type { ThemePreset } from "@mdwrk/theme-contract/themes";
import { renderThemeBridgeCssVariables } from "@mdwrk/ui-tokens/theme-map";

export function exportBridgeCss(
  preset: ThemePreset,
  target: ThemeBridgeTarget,
  selector = ":root",
): string {
  return renderThemeBridgeCssVariables(target, preset.tokens, { selector });
}
