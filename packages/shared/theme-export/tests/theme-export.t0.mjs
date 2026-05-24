import assert from "node:assert/strict";
import { buildThemePreset, exportThemeBundle, exportThemeCss } from "../dist/index.js";

const preset = buildThemePreset({
  themeId: "editorial-night",
  themeName: "Editorial Night",
  packageName: "@mdwrk/theme-editorial-night",
  author: "MdWrk",
  description: "A test preset",
}, { accent: "#8b5cf6" });

assert.ok(exportThemeCss(preset).includes("--accent: #8b5cf6;"));
assert.ok(exportThemeBundle(preset).files["manifest.json"]);

console.log("theme-export t0: ok");
