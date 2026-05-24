import assert from "node:assert/strict";
import { THEME_PRESET_REGISTRY } from "../dist/registry.js";

const ids = THEME_PRESET_REGISTRY.map((entry) => entry.preset.metadata.id);
assert.equal(new Set(ids).size, ids.length);
assert.ok(THEME_PRESET_REGISTRY.every((entry) => (entry.tags?.length ?? 0) > 0 || entry.preset.metadata.id === "default"));

console.log("theme-presets t2: ok");
