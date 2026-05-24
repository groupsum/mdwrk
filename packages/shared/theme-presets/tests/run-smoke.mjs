import assert from "node:assert/strict";
import {
  describeThemePreset,
  getThemePresetById,
  listThemePresets,
  NOCTURNE_THEME_PRESET,
} from "../dist/index.js";

const presets = listThemePresets();
assert.equal(presets.length >= 4, true);
assert.equal(getThemePresetById("paper")?.metadata.name, "Paper");
assert.ok(describeThemePreset(NOCTURNE_THEME_PRESET).includes("Nocturne"));

console.log("theme-presets smoke: ok");
