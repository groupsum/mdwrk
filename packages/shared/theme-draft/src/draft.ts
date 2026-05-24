import type { ThemeDraft, ThemePreset } from "@mdwrk/theme-contract/themes";
import { createEmptyThemePreset } from "@mdwrk/theme-contract/themes";
import type { MarkdownWorkspaceThemeTokenName } from "@mdwrk/theme-contract/tokens";
import { createMarkdownWorkspaceThemeTokenMap } from "@mdwrk/ui-tokens/theme-map";
import type { ResolvedThemeDraft, ThemeTokenOverrideMap } from "./types.js";

export function createEmptyThemeDraft(): ThemeDraft {
  return { tokens: {} };
}

export function createThemeDraft(overrides: ThemeTokenOverrideMap = {}): ThemeDraft {
  return { tokens: { ...overrides } };
}

export function cloneThemeDraft(draft: ThemeDraft): ThemeDraft {
  return { tokens: { ...draft.tokens }, touchedClasses: draft.touchedClasses ? [...draft.touchedClasses] : undefined };
}

export function mergeThemeDraft(base: ThemeDraft, overrides: ThemeTokenOverrideMap): ThemeDraft {
  return {
    ...cloneThemeDraft(base),
    tokens: {
      ...base.tokens,
      ...overrides,
    },
  };
}

export function unsetThemeDraftTokens(
  draft: ThemeDraft,
  tokenNames: readonly MarkdownWorkspaceThemeTokenName[],
): ThemeDraft {
  const nextTokens: Partial<Record<MarkdownWorkspaceThemeTokenName, string>> = { ...draft.tokens };
  for (const tokenName of tokenNames) {
    delete nextTokens[tokenName];
  }
  return { ...cloneThemeDraft(draft), tokens: nextTokens };
}

export function resolveThemeDraft(draft: ThemeDraft): ResolvedThemeDraft {
  return {
    draft: cloneThemeDraft(draft),
    resolvedTokens: createMarkdownWorkspaceThemeTokenMap(draft.tokens),
  };
}

export function listTouchedThemeTokens(draft: ThemeDraft): readonly MarkdownWorkspaceThemeTokenName[] {
  return Object.keys(draft.tokens) as MarkdownWorkspaceThemeTokenName[];
}

export function createPresetFromThemeDraft(
  draft: ThemeDraft,
  metadata: { id: string; name: string; description?: string },
): ThemePreset {
  const preset = createEmptyThemePreset(metadata.id, metadata.name);
  return {
    ...preset,
    metadata: {
      ...preset.metadata,
      description: metadata.description,
    },
    tokens: { ...draft.tokens },
  };
}

export function isThemeDraftDirty(draft: ThemeDraft): boolean {
  return Object.keys(draft.tokens).length > 0 || (draft.touchedClasses?.length ?? 0) > 0;
}
