import assert from "node:assert/strict";
import { createThemeDraft, diffThemeDrafts, isThemeDraftDirty, resolveThemeDraft } from "../dist/index.js";

const draft = createThemeDraft({ accent: "#2563eb", "bg-panel": "#ffffff" });
assert.equal(isThemeDraftDirty(draft), true);
assert.equal(resolveThemeDraft(draft).resolvedTokens.accent, "#2563eb");

const diff = diffThemeDrafts(createThemeDraft(), draft);
assert.equal(diff.set.accent, "#2563eb");

console.log("theme-draft t0: ok");
