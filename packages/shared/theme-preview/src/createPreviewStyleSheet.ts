import type { ThemeBridgeTarget } from "@mdwrk/theme-contract/bridges";
import {
  renderThemeBridgeCssVariables,
  renderThemeCssVariables,
  type ThemeTokenOverrides,
} from "@mdwrk/ui-tokens/theme-map";
import { THEME_PREVIEW_TARGETS } from "./previewTargets.js";
import type { ThemePreviewMountOptions, ThemePreviewResult } from "./types.js";

export function createPreviewStyleSheet(
  overrides: ThemeTokenOverrides = {},
  options: ThemePreviewMountOptions = {},
): ThemePreviewResult {
  const rootSelector = options.rootSelector ?? ":root";
  const hostSelector = options.hostSelector ?? rootSelector;
  const targets = options.targets ?? THEME_PREVIEW_TARGETS;
  const includeHostVariables = options.includeHostVariables ?? true;

  const hostCssText = includeHostVariables
    ? renderThemeCssVariables(overrides, { selector: hostSelector })
    : "";

  const bridgeCssText = Object.fromEntries(
    targets.map((target) => [target, renderThemeBridgeCssVariables(target, overrides, { selector: rootSelector })]),
  ) as Readonly<Record<ThemeBridgeTarget, string>>;

  const cssText = [hostCssText, ...targets.map((target) => bridgeCssText[target])]
    .filter(Boolean)
    .join("\n\n");

  return {
    cssText,
    hostCssText,
    bridgeCssText,
    overrides,
  };
}
