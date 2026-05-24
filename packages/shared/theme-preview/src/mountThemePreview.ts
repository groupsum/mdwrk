import type { ThemeTokenOverrides } from "@mdwrk/ui-tokens/theme-map";
import { createPreviewStyleSheet } from "./createPreviewStyleSheet.js";
import type { ThemePreviewMountOptions } from "./types.js";

export function mountThemePreviewStyleElement(
  documentLike: Pick<Document, "head" | "getElementById" | "createElement">,
  overrides: ThemeTokenOverrides = {},
  options: ThemePreviewMountOptions = {},
): HTMLStyleElement {
  const styleElementId = options.styleElementId ?? "mdwrk-theme-preview";
  const existing = documentLike.getElementById(styleElementId);
  const styleElement = (existing as HTMLStyleElement | null) ?? documentLike.createElement("style");
  styleElement.id = styleElementId;
  styleElement.textContent = createPreviewStyleSheet(overrides, options).cssText;

  if (!existing) {
    documentLike.head.appendChild(styleElement);
  }

  return styleElement;
}
