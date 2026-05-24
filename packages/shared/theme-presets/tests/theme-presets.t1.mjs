import assert from "node:assert/strict";
import { listThemePresetTags, searchThemePresets } from "../dist/index.js";

assert.ok(listThemePresetTags().includes("dark"));
assert.equal(searchThemePresets("paper")[0].preset.metadata.id, "paper");

console.log("theme-presets t1: ok");
