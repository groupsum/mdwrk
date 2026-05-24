import type { ThemeBridgeTarget } from "@mdwrk/theme-contract/bridges";
import type { ThemeTokenOverrides } from "@mdwrk/ui-tokens/theme-map";

export interface ThemePreviewMountOptions {
  readonly rootSelector?: string;
  readonly hostSelector?: string;
  readonly targets?: readonly ThemeBridgeTarget[];
  readonly includeHostVariables?: boolean;
  readonly styleElementId?: string;
}

export interface ThemePreviewFixture {
  readonly id: string;
  readonly title: string;
  readonly markdown: string;
}

export interface ThemePreviewResult {
  readonly cssText: string;
  readonly hostCssText: string;
  readonly bridgeCssText: Readonly<Record<ThemeBridgeTarget, string>>;
  readonly overrides: ThemeTokenOverrides;
}
