import assert from "node:assert/strict";
import { getThemePresetById, listThemePresets } from "../dist/index.js";

assert.equal(listThemePresets().length >= 4, true);
assert.equal(getThemePresetById("graphite").metadata.name, "Graphite");

console.log("theme-presets t0: ok");
