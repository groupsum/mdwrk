import assert from "node:assert/strict";
import {
  applyThemeDraftPatch,
  createThemeDraft,
  createThemeDraftHistory,
  pairThemePresetWithDraft,
  parseThemeDraft,
  pushThemeDraftHistory,
  serializeThemeDraft,
  validateThemeDraft,
} from "../dist/index.js";
import { createEmptyThemePreset } from "@mdwrk/theme-contract/themes";

const draft = createThemeDraft({ accent: "#0ea5e9" });
const patched = applyThemeDraftPatch(draft, {
  set: { "bg-panel": "#111827" },
});
assert.equal(patched.tokens["bg-panel"], "#111827");

const validation = validateThemeDraft(patched);
assert.equal(validation.valid, true);

const serialized = serializeThemeDraft(patched);
const parsed = parseThemeDraft(serialized);
assert.equal(parsed.tokens.accent, "#0ea5e9");

const history = createThemeDraftHistory(draft, "start");
const nextHistory = pushThemeDraftHistory(history, patched, "patched");
assert.equal(nextHistory.past.length, 1);

const preset = createEmptyThemePreset("draft", "Draft");
const pair = pairThemePresetWithDraft(preset);
assert.equal(pair.preset.metadata.id, "draft");

console.log("theme-draft smoke: ok");
