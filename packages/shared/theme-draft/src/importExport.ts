import type { ThemeDraft } from "@mdwrk/theme-contract/themes";
import { createEmptyThemeDraft } from "./draft.js";
import type { ThemeDraftExportEnvelope } from "./types.js";

export function serializeThemeDraft(draft: ThemeDraft): string {
  const envelope: ThemeDraftExportEnvelope = {
    version: 1,
    draft,
  };
  return JSON.stringify(envelope, null, 2);
}

export function parseThemeDraft(source: string): ThemeDraft {
  const parsed = JSON.parse(source) as Partial<ThemeDraftExportEnvelope>;
  if (parsed.version !== 1 || !parsed.draft || typeof parsed.draft !== "object") {
    throw new Error("Invalid MdWrk theme draft payload.");
  }
  return {
    ...createEmptyThemeDraft(),
    ...parsed.draft,
    tokens: { ...parsed.draft.tokens },
  };
}
