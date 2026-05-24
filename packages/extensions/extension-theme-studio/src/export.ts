import type { MarkdownWorkspaceThemeTokenMap } from "@mdwrk/theme-contract";
import {
  buildThemePreset,
  createThemePackageArtifact,
  type ThemePackageMetadata,
  sanitizePackageName,
  sanitizeThemeIdentifier,
} from "@mdwrk/theme-export";
import { renderThemeBridgeCssVariables, renderThemeCssVariables } from "@mdwrk/ui-tokens/theme-map";
import type {
  ThemeStudioExportArtifacts,
  ThemeStudioMetadata,
  ThemeStudioPackageArtifact,
  ThemeStudioResolvedSettings,
} from "./types.js";

export {
  sanitizePackageName,
  sanitizeThemeIdentifier,
} from "@mdwrk/theme-export";

export function buildThemeStudioExports(
  metadata: ThemeStudioMetadata,
  tokens: MarkdownWorkspaceThemeTokenMap,
  settings: ThemeStudioResolvedSettings,
): ThemeStudioExportArtifacts {
  const packageMetadata: ThemePackageMetadata = metadata;
  const preset = buildThemePreset(packageMetadata, tokens);
  const compact = settings.compactCss;
  const hostCss = renderThemeCssVariables(tokens, { selector: ":root", compact });
  const rendererCss = renderThemeBridgeCssVariables("renderer", tokens, { selector: ":root", compact });
  const editorCss = renderThemeBridgeCssVariables("editor", tokens, { selector: ":root", compact });
  const packageArtifact = createThemePackageArtifact(
    preset,
    { host: hostCss, renderer: rendererCss, editor: editorCss },
    packageMetadata,
  ) as ThemeStudioPackageArtifact;

  return {
    preset,
    json: JSON.stringify(preset, null, 2),
    hostCss,
    rendererCss,
    editorCss,
    packageArtifact,
  };
}
