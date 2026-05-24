import type { ThemeDraft } from "@mdwrk/theme-contract/themes";
import { mergeThemeDraft, unsetThemeDraftTokens } from "./draft.js";
import type { ThemeDraftDiff, ThemeDraftPatch } from "./types.js";

export function applyThemeDraftPatch(draft: ThemeDraft, patch: ThemeDraftPatch): ThemeDraft {
  let nextDraft = draft;
  if (patch.set && Object.keys(patch.set).length > 0) {
    nextDraft = mergeThemeDraft(nextDraft, patch.set);
  }
  if (patch.unset && patch.unset.length > 0) {
    nextDraft = unsetThemeDraftTokens(nextDraft, patch.unset);
  }
  return nextDraft;
}

export function invertThemeDraftPatch(draft: ThemeDraft, patch: ThemeDraftPatch): ThemeDraftPatch {
  const inverseSet: Record<string, string> = {};
  const inverseUnset = new Set<string>();

  for (const tokenName of patch.unset ?? []) {
    const existingValue = draft.tokens[tokenName];
    if (typeof existingValue === "string") {
      inverseSet[tokenName] = existingValue;
    }
  }

  for (const [tokenName, nextValue] of Object.entries(patch.set ?? {})) {
    const existingValue = draft.tokens[tokenName as keyof typeof draft.tokens];
    if (typeof existingValue === "string") {
      inverseSet[tokenName] = existingValue;
    } else if (typeof nextValue === "string") {
      inverseUnset.add(tokenName);
    }
  }

  return {
    set: Object.keys(inverseSet).length > 0 ? inverseSet : undefined,
    unset: inverseUnset.size > 0 ? ([...inverseUnset] as typeof patch.unset) : undefined,
  };
}

export function diffThemeDrafts(previous: ThemeDraft, next: ThemeDraft): ThemeDraftDiff {
  const set: Record<string, string> = {};
  const unset = new Set<string>();
  const keys = new Set([...Object.keys(previous.tokens), ...Object.keys(next.tokens)]);

  for (const key of keys) {
    const previousValue = previous.tokens[key as keyof typeof previous.tokens];
    const nextValue = next.tokens[key as keyof typeof next.tokens];
    if (typeof nextValue === "string" && previousValue !== nextValue) {
      set[key] = nextValue;
    } else if (typeof previousValue === "string" && typeof nextValue !== "string") {
      unset.add(key);
    }
  }

  return {
    set,
    unset: [...unset] as ThemeDraftDiff["unset"],
  };
}
