import { createEmptyThemePreset, type ThemePreset } from "@mdwrk/theme-contract/themes";

export const DEFAULT_THEME_PRESET: ThemePreset = {
  ...createEmptyThemePreset("default", "Default"),
  metadata: {
    id: "default",
    name: "Default",
    description: "Balanced default MdWrk preset.",
  },
  tokens: {},
};
