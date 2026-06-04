import type { CSSProperties } from "react";
import type {
  MarkdownCommandDescriptor,
  MarkdownEditorBuiltinCommandId,
  MarkdownEditorCommandOptions,
  MarkdownEditorHistoryState,
  MarkdownEditorHostEditApi,
  MarkdownEditorNavigationIntent,
  MarkdownEditorNavigationOptions,
  MarkdownEditorSelectionFormatState,
  MarkdownEditorSelection,
  MarkdownEditorSnapshot,
} from "@mdwrk/markdown-editor-core";
import type { MarkdownEditorThemeVariables } from "./theme.js";

export interface MarkdownSourceEditorProps {
  readonly value?: string;
  readonly defaultValue?: string;
  readonly documentKey?: string | number;
  readonly onChange?: (value: string) => void;
  readonly onSelectionChange?: (selection: MarkdownEditorSelection) => void;
  readonly onSelectionFormatChange?: (state: MarkdownEditorSelectionFormatState) => void;
  readonly onCursorChange?: (line: number, column: number) => void;
  readonly onHistoryChange?: (history: MarkdownEditorHistoryState) => void;
  readonly onCommand?: (command: MarkdownEditorBuiltinCommandId) => void;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly themeStyle?: CSSProperties;
  readonly placeholder?: string;
  readonly spellCheck?: boolean;
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly showLineNumbers?: boolean;
  readonly textWrap?: boolean;
  readonly historyLimit?: number;
  readonly textareaClassName?: string;
  readonly gutterClassName?: string;
  readonly lineNumberClassName?: string;
  readonly indentUnit?: string;
  readonly themeVariables?: MarkdownEditorThemeVariables;
}

export interface MarkdownSourceEditorHandle extends MarkdownEditorHostEditApi {
  canUndo(): boolean;
  canRedo(): boolean;
  getHistory(): MarkdownEditorHistoryState;
  setValue(value: string, options?: { historic?: boolean; selection?: MarkdownEditorSelection }): void;
  executeCommand(command: MarkdownEditorBuiltinCommandId, options?: MarkdownEditorCommandOptions): MarkdownEditorSnapshot;
  executeNamedCommand(command: MarkdownEditorBuiltinCommandId, options?: MarkdownEditorCommandOptions): MarkdownEditorSnapshot;
  listCommands(): readonly MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId>[];
}

export interface MarkdownEditorCommandPaletteItem extends MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId> {
  readonly disabled?: boolean;
}

export interface MarkdownCommandPaletteModel {
  readonly query: string;
  readonly setQuery: (value: string) => void;
  readonly commands: readonly MarkdownEditorCommandPaletteItem[];
  readonly execute: (command: MarkdownEditorBuiltinCommandId, options?: MarkdownEditorCommandOptions) => MarkdownEditorSnapshot | undefined;
}

export interface MarkdownEditorNavigationApi {
  readonly navigate: (
    intent: MarkdownEditorNavigationIntent,
    options?: MarkdownEditorNavigationOptions,
  ) => MarkdownEditorSelection | undefined;
}
