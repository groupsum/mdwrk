import assert from "node:assert/strict";
import {
  EDITOR_THEME_SAMPLES,
  MARKDOWN_THEME_SAMPLES,
  THEME_PREVIEW_SCENARIOS,
  UI_THEME_SPECIMENS,
} from "../dist/index.js";

assert.ok(MARKDOWN_THEME_SAMPLES.baseline.includes("# Heading"));
assert.ok(EDITOR_THEME_SAMPLES.codeHeavy.includes("export const value"));
assert.equal(UI_THEME_SPECIMENS.length >= 2, true);
assert.equal(THEME_PREVIEW_SCENARIOS.length >= 2, true);

console.log("theme-specimens smoke: ok");
