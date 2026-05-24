import {
  MARKDOWN_PACKAGE_THEME_TOKEN_NAMES,
  MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES,
  MARKDOWN_WORKSPACE_THEME_TOKENS,
  STUDIO_SHELL_THEME_TOKEN_NAMES,
  type MarkdownPackageThemeTokenMap,
  type MarkdownPackageThemeTokenName,
  type MarkdownWorkspaceThemeTokenMap,
  type MarkdownWorkspaceThemeTokenName,
  type StudioShellThemeTokenMap,
  type StudioShellThemeTokenName,
  type ThemeTokenDefinition,
} from "@mdwrk/theme-contract/tokens";

export {
  MARKDOWN_PACKAGE_THEME_TOKEN_NAMES,
  MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES,
  MARKDOWN_WORKSPACE_THEME_TOKENS,
  STUDIO_SHELL_THEME_TOKEN_NAMES,
  type MarkdownPackageThemeTokenMap,
  type MarkdownPackageThemeTokenName,
  type MarkdownWorkspaceThemeTokenMap,
  type MarkdownWorkspaceThemeTokenName,
  type StudioShellThemeTokenMap,
  type StudioShellThemeTokenName,
  type ThemeTokenDefinition,
} from "@mdwrk/theme-contract/tokens";

export type MarkdownWorkspaceUiTokenName = MarkdownWorkspaceThemeTokenName;
export type MarkdownWorkspaceUiTokenMap = MarkdownWorkspaceThemeTokenMap;
export type MarkdownPackageUiTokenName = MarkdownPackageThemeTokenName;
export type MarkdownPackageUiTokenMap = MarkdownPackageThemeTokenMap;
export type StudioShellUiTokenName = StudioShellThemeTokenName;
export type StudioShellUiTokenMap = StudioShellThemeTokenMap;
export type UiTokenDefinition = ThemeTokenDefinition;

export const MARKDOWN_WORKSPACE_UI_TOKEN_NAMES = MARKDOWN_WORKSPACE_THEME_TOKEN_NAMES;
export const MARKDOWN_WORKSPACE_UI_TOKENS = MARKDOWN_WORKSPACE_THEME_TOKENS;
export const MARKDOWN_PACKAGE_UI_TOKEN_NAMES = MARKDOWN_PACKAGE_THEME_TOKEN_NAMES;
export const STUDIO_SHELL_UI_TOKEN_NAMES = STUDIO_SHELL_THEME_TOKEN_NAMES;

export const MARKDOWN_WORKSPACE_TOKEN_DEFAULTS = Object.freeze(
  Object.fromEntries(
    MARKDOWN_WORKSPACE_THEME_TOKENS.map((definition) => [definition.name, definition.defaultValue]),
  ) as MarkdownWorkspaceThemeTokenMap,
);

function pickTokenDefaults<const T extends readonly MarkdownWorkspaceThemeTokenName[]>(
  names: T,
): Readonly<Record<T[number], string>> {
  return Object.freeze(
    Object.fromEntries(names.map((name) => [name, MARKDOWN_WORKSPACE_TOKEN_DEFAULTS[name]])),
  ) as Readonly<Record<T[number], string>>;
}

export const MARKDOWN_PACKAGE_TOKEN_DEFAULTS = pickTokenDefaults(
  MARKDOWN_PACKAGE_THEME_TOKEN_NAMES,
) as MarkdownPackageThemeTokenMap;

export const STUDIO_SHELL_TOKEN_DEFAULTS = pickTokenDefaults(
  STUDIO_SHELL_THEME_TOKEN_NAMES,
) as StudioShellThemeTokenMap;

export const MARKDOWN_WORKSPACE_TOKEN_CSS_CUSTOM_PROPERTIES = Object.freeze(
  MARKDOWN_WORKSPACE_THEME_TOKENS.map((definition) => definition.cssCustomProperty),
) as readonly ThemeTokenDefinition["cssCustomProperty"][];
