import assert from "node:assert/strict";
import { buildThemePreset, createThemePackageArtifact, parseThemePackageArtifact } from "../dist/index.js";

const preset = buildThemePreset({
  themeId: "portable",
  themeName: "Portable",
  packageName: "@mdwrk/theme-portable",
  author: "MdWrk",
  description: "Portable theme",
}, { accent: "#0ea5e9", "bg-panel": "#111827" });
const artifact = createThemePackageArtifact(preset, { host: ":root{}", renderer: ":root{}", editor: ":root{}" }, {
  themeId: "portable",
  themeName: "Portable",
  packageName: "@mdwrk/theme-portable",
  author: "MdWrk",
  description: "Portable theme",
});
assert.equal(parseThemePackageArtifact(JSON.stringify(artifact)).metadata.id, "portable");
assert.throws(() => parseThemePackageArtifact(JSON.stringify({ files: [] })), /missing a themes/);

console.log("theme-export t2: ok");
