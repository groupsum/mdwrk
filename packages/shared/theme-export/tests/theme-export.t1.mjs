import assert from "node:assert/strict";
import { buildThemePreset, createThemePackageArtifact, sanitizePackageName, sanitizeThemeIdentifier } from "../dist/index.js";

const preset = buildThemePreset({
  themeId: "  News Desk ",
  themeName: "News Desk",
  packageName: "@mdwrk/theme-news desk",
  author: "MdWrk",
  description: "Portable package test",
}, { accent: "#f59e0b" });
const artifact = createThemePackageArtifact(preset, { host: ":root{}", renderer: ":root{}", editor: ":root{}" }, {
  themeId: "news-desk",
  themeName: "News Desk",
  packageName: "@mdwrk/theme-news desk",
  author: "MdWrk",
  description: "Portable package test",
});
assert.equal(sanitizeThemeIdentifier("  News Desk "), "news-desk");
assert.equal(sanitizePackageName("@mdwrk/theme-news desk"), "@mdwrk/theme-news-desk");
assert.ok(artifact.files.some((file) => file.path === "package.json"));

console.log("theme-export t1: ok");
