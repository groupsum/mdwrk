import type { ThemePreset } from "@mdwrk/theme-contract/themes";

export function exportThemeJson(preset: ThemePreset): string {
  return JSON.stringify(preset, null, 2);
}
