import assert from "node:assert/strict";
import { THEME_PREVIEW_SCENARIOS, UI_THEME_SPECIMENS } from "../dist/index.js";

const specimenIds = new Set(UI_THEME_SPECIMENS.map((specimen) => specimen.id));
assert.ok(THEME_PREVIEW_SCENARIOS.every((scenario) => specimenIds.has(scenario.specimen.id)));

console.log("theme-specimens t2: ok");
