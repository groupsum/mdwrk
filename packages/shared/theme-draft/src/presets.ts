import type { ThemeDraft, ThemePreset } from "@mdwrk/theme-contract/themes";
import { createThemeDraft, createPresetFromThemeDraft, resolveThemeDraft } from "./draft.js";
import type { ThemePresetDraftPair } from "./types.js";

export function createThemeDraftFromPreset(preset: ThemePreset): ThemeDraft {
  return createThemeDraft(preset.tokens);
}

export function pairThemePresetWithDraft(preset: ThemePreset): ThemePresetDraftPair {
  return {
    preset,
    draft: createThemeDraftFromPreset(preset),
  };
}

export function createPresetFromDraft(
  draft: ThemeDraft,
  metadata: { id: string; name: string; description?: string },
): ThemePreset {
  return createPresetFromThemeDraft(draft, metadata);
}

export function resolveThemePresetDraftPair(preset: ThemePreset): ThemePresetDraftPair & { readonly effectiveTokens: ThemePreset["tokens"] } {
  const draft = createThemeDraftFromPreset(preset);
  return {
    preset,
    draft,
    effectiveTokens: resolveThemeDraft(draft).resolvedTokens,
  };
}
