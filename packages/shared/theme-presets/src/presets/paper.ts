import { createEmptyThemePreset, type ThemePreset } from "@mdwrk/theme-contract/themes";

export const PAPER_THEME_PRESET: ThemePreset = {
  ...createEmptyThemePreset("paper", "Paper"),
  metadata: {
    id: "paper",
    name: "Paper",
    description: "Lightweight paper-like preset for reading and export review.",
  },
  tokens: {
    "bg-app": "#f7f4ec",
    "bg-panel": "#fffdf8",
    "bg-inset": "#f0eadd",
    "fg-primary": "#2a2118",
    "fg-secondary": "#564739",
    "fg-muted": "#7c6b5d",
    accent: "#a16207",
    "border-color": "#c9b79c",
  },
};
