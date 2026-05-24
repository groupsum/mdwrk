import type { ThemePreset } from "@mdwrk/theme-contract/themes";

export interface ThemePresetRecord {
  readonly preset: ThemePreset;
  readonly tags?: readonly string[];
}

export interface ThemePresetSearchResult {
  readonly preset: ThemePreset;
  readonly tags: readonly string[];
}
