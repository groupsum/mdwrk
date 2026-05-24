import type { ThemePreset } from "@mdwrk/theme-contract/themes";
import { renderThemeCssVariables } from "@mdwrk/ui-tokens/theme-map";

export function exportThemeCss(preset: ThemePreset, selector = ":root"): string {
  return renderThemeCssVariables(preset.tokens, { selector });
}
