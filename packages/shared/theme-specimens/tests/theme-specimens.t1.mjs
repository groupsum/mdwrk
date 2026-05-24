import assert from "node:assert/strict";
import { EDITOR_THEME_SAMPLES, THEME_PREVIEW_SCENARIOS, UI_THEME_SPECIMENS } from "../dist/index.js";

assert.ok(EDITOR_THEME_SAMPLES.codeHeavy.includes("export const value"));
assert.equal(THEME_PREVIEW_SCENARIOS[0].specimen.id, UI_THEME_SPECIMENS[1].id);

console.log("theme-specimens t1: ok");
