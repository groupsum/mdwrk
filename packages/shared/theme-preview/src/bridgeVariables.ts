import type { ThemeBridgeTarget } from "@mdwrk/theme-contract/bridges";
import {
  createThemeBridgeVariableRecord,
  type ThemeTokenOverrides,
} from "@mdwrk/ui-tokens/theme-map";

export function createPreviewBridgeVariables(
  target: ThemeBridgeTarget,
  overrides: ThemeTokenOverrides = {},
): Readonly<Record<`--${string}`, string>> {
  return createThemeBridgeVariableRecord(target, overrides);
}
