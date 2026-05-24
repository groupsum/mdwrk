import type { ThemeDraft } from "@mdwrk/theme-contract/themes";
import { cloneThemeDraft } from "./draft.js";
import type { ThemeDraftHistoryState, ThemeDraftSnapshot } from "./types.js";

export function createThemeDraftSnapshot(draft: ThemeDraft, label?: string): ThemeDraftSnapshot {
  return {
    draft: cloneThemeDraft(draft),
    label,
  };
}

export function createThemeDraftHistory(draft: ThemeDraft, label?: string): ThemeDraftHistoryState {
  return {
    past: [],
    present: createThemeDraftSnapshot(draft, label),
    future: [],
  };
}

export function pushThemeDraftHistory(
  history: ThemeDraftHistoryState,
  nextDraft: ThemeDraft,
  label?: string,
): ThemeDraftHistoryState {
  return {
    past: [...history.past, history.present],
    present: createThemeDraftSnapshot(nextDraft, label),
    future: [],
  };
}

export function undoThemeDraftHistory(history: ThemeDraftHistoryState): ThemeDraftHistoryState {
  const previous = history.past.at(-1);
  if (!previous) {
    return history;
  }

  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redoThemeDraftHistory(history: ThemeDraftHistoryState): ThemeDraftHistoryState {
  const next = history.future.at(0);
  if (!next) {
    return history;
  }

  return {
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  };
}
