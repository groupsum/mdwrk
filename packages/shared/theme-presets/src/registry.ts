import type { ThemePreset } from "@mdwrk/theme-contract/themes";
import { DEFAULT_THEME_PRESET } from "./presets/default.js";
import { GRAPHITE_THEME_PRESET } from "./presets/graphite.js";
import { NOCTURNE_THEME_PRESET } from "./presets/nocturne.js";
import { PAPER_THEME_PRESET } from "./presets/paper.js";
import type { ThemePresetRecord, ThemePresetSearchResult } from "./types.js";

export const THEME_PRESET_REGISTRY = [
  { preset: DEFAULT_THEME_PRESET, tags: ["default"] },
  { preset: GRAPHITE_THEME_PRESET, tags: ["dark", "editorial"] },
  { preset: PAPER_THEME_PRESET, tags: ["light", "reading"] },
  { preset: NOCTURNE_THEME_PRESET, tags: ["dark", "contrast"] },
] as const satisfies readonly ThemePresetRecord[];

export function listThemePresets(): readonly ThemePreset[] {
  return THEME_PRESET_REGISTRY.map((entry) => entry.preset);
}

export function getThemePresetById(id: string): ThemePreset | undefined {
  return THEME_PRESET_REGISTRY.find((entry) => entry.preset.metadata.id === id)?.preset;
}

export function listThemePresetTags(): readonly string[] {
  return Array.from(new Set(THEME_PRESET_REGISTRY.flatMap((entry) => entry.tags ?? []))).sort();
}

export function searchThemePresets(query: string): readonly ThemePresetSearchResult[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return THEME_PRESET_REGISTRY.map((entry) => ({ preset: entry.preset, tags: entry.tags ?? [] }));
  }

  return THEME_PRESET_REGISTRY
    .filter((entry) => {
      const haystack = `${entry.preset.metadata.id} ${entry.preset.metadata.name} ${entry.preset.metadata.description ?? ""} ${(entry.tags ?? []).join(" ")}`.toLowerCase();
      return haystack.includes(needle);
    })
    .map((entry) => ({ preset: entry.preset, tags: entry.tags ?? [] }));
}
