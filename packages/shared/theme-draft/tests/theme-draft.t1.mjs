import assert from "node:assert/strict";
import {
  createThemeDraft,
  createThemeDraftHistory,
  parseThemeDraft,
  pushThemeDraftHistory,
  redoThemeDraftHistory,
  serializeThemeDraft,
  undoThemeDraftHistory,
} from "../dist/index.js";

const start = createThemeDraft({ accent: "#0ea5e9" });
const next = createThemeDraft({ accent: "#22c55e", "bg-panel": "#0f172a" });
const history = pushThemeDraftHistory(createThemeDraftHistory(start, "start"), next, "next");
assert.equal(history.past.length, 1);
assert.equal(undoThemeDraftHistory(history).present.draft.tokens.accent, "#0ea5e9");
assert.equal(redoThemeDraftHistory(undoThemeDraftHistory(history)).present.draft.tokens.accent, "#22c55e");

const parsed = parseThemeDraft(serializeThemeDraft(next));
assert.equal(parsed.tokens["bg-panel"], "#0f172a");

console.log("theme-draft t1: ok");
