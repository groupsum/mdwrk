import type { ThemeTokenOverrides } from "@mdwrk/ui-tokens/theme-map";
import {
  createThemeBridgeVariableRecord,
  createThemeCssCustomPropertyRecord,
} from "@mdwrk/ui-tokens/theme-map";
import { THEME_PREVIEW_TARGETS } from "./previewTargets.js";

export function applyThemeDraftToStyleDeclaration(
  style: Pick<CSSStyleDeclaration, "setProperty">,
  overrides: ThemeTokenOverrides = {},
): void {
  for (const [property, value] of Object.entries(createThemeCssCustomPropertyRecord(overrides))) {
    style.setProperty(property, value);
  }

  for (const target of THEME_PREVIEW_TARGETS) {
    for (const [property, value] of Object.entries(createThemeBridgeVariableRecord(target, overrides))) {
      style.setProperty(property, value);
    }
  }
}
