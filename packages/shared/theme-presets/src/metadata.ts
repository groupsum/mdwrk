import type { ThemePreset } from "@mdwrk/theme-contract/themes";

export function describeThemePreset(preset: ThemePreset): string {
  return `${preset.metadata.name} (${preset.metadata.id})`;
}
