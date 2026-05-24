import type { ThemePreset } from "@mdwrk/theme-contract/themes";
import { exportBridgeCss } from "./exportBridgeCss.js";
import { exportThemeCss } from "./exportThemeCss.js";
import { exportThemeJson } from "./exportThemeJson.js";
import { exportThemeManifest } from "./exportManifest.js";
import type { ThemeExportBundle } from "./types.js";

export function exportThemeBundle(preset: ThemePreset): ThemeExportBundle {
  const manifest = exportThemeManifest(preset);
  return {
    preset,
    manifest,
    files: {
      "theme.json": exportThemeJson(preset),
      "theme.css": exportThemeCss(preset),
      "renderer-bridge.css": exportBridgeCss(preset, "renderer"),
      "editor-bridge.css": exportBridgeCss(preset, "editor"),
      "manifest.json": JSON.stringify(manifest, null, 2),
    },
  };
}
