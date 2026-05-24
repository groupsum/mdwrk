import type { ThemeExportManifest } from "./types.js";
import type { ThemePreset } from "@mdwrk/theme-contract/themes";

export function exportThemeManifest(preset: ThemePreset): ThemeExportManifest {
  return {
    id: preset.metadata.id,
    name: preset.metadata.name,
    contract: preset.compatibility.contract,
    targets: ["renderer", "editor"],
    files: ["theme.json", "theme.css", "renderer-bridge.css", "editor-bridge.css", "manifest.json"],
  };
}
