import { createEmptyThemePreset, type ThemePreset } from "@mdwrk/theme-contract/themes";

export const GRAPHITE_THEME_PRESET: ThemePreset = {
  ...createEmptyThemePreset("graphite", "Graphite"),
  metadata: {
    id: "graphite",
    name: "Graphite",
    description: "Muted dark preset for authoring-heavy workspaces.",
  },
  tokens: {
    "bg-app": "#0b1020",
    "bg-panel": "#111827",
    "bg-inset": "#1f2937",
    "fg-primary": "#f9fafb",
    "fg-secondary": "#cbd5e1",
    "fg-muted": "#94a3b8",
    accent: "#38bdf8",
    "border-color": "#334155",
  },
};
