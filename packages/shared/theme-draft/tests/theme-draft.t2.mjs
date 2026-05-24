import assert from "node:assert/strict";
import { applyThemeDraftPatch, createThemeDraft, invertThemeDraftPatch, validateThemeDraft } from "../dist/index.js";

const draft = createThemeDraft({ accent: "#f97316" });
const patch = { set: { "bg-panel": "#111827" }, unset: ["accent"] };
const next = applyThemeDraftPatch(draft, patch);
assert.equal(next.tokens["bg-panel"], "#111827");
assert.equal("accent" in next.tokens, false);

const inverse = invertThemeDraftPatch(draft, patch);
assert.equal(inverse.set.accent, "#f97316");

const invalid = validateThemeDraft({ tokens: { unknown: "#fff", accent: "" } });
assert.equal(invalid.valid, false);
assert.ok(invalid.issues.some((issue) => issue.token === "unknown"));

console.log("theme-draft t2: ok");
