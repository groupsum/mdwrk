import type { ThemeBridgeTarget } from "@mdwrk/theme-contract/bridges";

export const THEME_PREVIEW_TARGETS = ["renderer", "editor"] as const satisfies readonly ThemeBridgeTarget[];
