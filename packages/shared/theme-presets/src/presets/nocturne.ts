import { createEmptyThemePreset, type ThemePreset } from "@mdwrk/theme-contract/themes";

export const NOCTURNE_THEME_PRESET: ThemePreset = {
  ...createEmptyThemePreset("nocturne", "Nocturne"),
  metadata: {
    id: "nocturne",
    name: "Nocturne",
    description: "High-contrast dark preset for immersive focus sessions.",
  },
  tokens: {
    "bg-app": "#050816",
    "bg-panel": "#0f172a",
    "bg-inset": "#111c35",
    "fg-primary": "#eff6ff",
    "fg-secondary": "#cbd5e1",
    "fg-muted": "#8ea2c6",
    accent: "#f472b6",
    "border-color": "#312e81",
  },
};
