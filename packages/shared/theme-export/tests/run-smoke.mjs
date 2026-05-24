import assert from "node:assert/strict";
import {
  exportBridgeCss,
  exportThemeBundle,
  exportThemeCss,
  exportThemeJson,
  exportThemeManifest,
} from "../dist/index.js";
import { createEmptyThemePreset } from "@mdwrk/theme-contract/themes";

const preset = {
  ...createEmptyThemePreset("exported", "Exported"),
  tokens: {
    accent: "#8b5cf6",
  },
};

assert.ok(exportThemeJson(preset).includes("\"accent\": \"#8b5cf6\""));
assert.ok(exportThemeCss(preset).includes("--accent: #8b5cf6;"));
assert.ok(exportBridgeCss(preset, "renderer").includes("--mw-accent: #8b5cf6;"));
assert.equal(exportThemeManifest(preset).id, "exported");
assert.ok("theme.css" in exportThemeBundle(preset).files);

console.log("theme-export smoke: ok");
