export type MarkdownEditorSelectionDirection = "forward" | "backward" | "none";

export interface MarkdownEditorSelection {
  readonly start: number;
  readonly end: number;
  readonly direction?: MarkdownEditorSelectionDirection;
}

export type MarkdownCommandScope = "editor" | "preview" | "shared";
export type MarkdownCommandCategory =
  | "format"
  | "list"
  | "structure"
  | "history"
  | "selection"
  | "navigation"
  | "export"
  | "operator";
export type MarkdownCommandApplicability = "cm" | "gfm" | "cfm" | "mdwrk-operator";

export interface MarkdownEditorCursorPosition {
  readonly offset: number;
  readonly line: number;
  readonly column: number;
}

export interface MarkdownEditorSnapshot {
  readonly value: string;
  readonly selection: MarkdownEditorSelection;
}

export interface MarkdownEditorHistoryState {
  readonly past: readonly MarkdownEditorSnapshot[];
  readonly present: MarkdownEditorSnapshot;
  readonly future: readonly MarkdownEditorSnapshot[];
  readonly limit: number;
}

export type MarkdownEditorBuiltinCommandId =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "bullet-list"
  | "ordered-list"
  | "task-list"
  | "link"
  | "image"
  | "front-matter"
  | "footnote"
  | "inline-math"
  | "block-math"
  | "superscript"
  | "subscript"
  | "citation"
  | "indent"
  | "outdent"
  | "move-line-up"
  | "move-line-down"
  | "move-block-up"
  | "move-block-down"
  | "undo"
  | "redo"
  | "insert-tab";

export interface MarkdownCommandDescriptor<TCommandId extends string = string> {
  readonly id: TCommandId;
  readonly title: string;
  readonly scope: MarkdownCommandScope;
  readonly category: MarkdownCommandCategory;
  readonly applicability: readonly MarkdownCommandApplicability[];
  readonly description: string;
}

export interface MarkdownEditorCommandOptions {
  readonly indentUnit?: string;
  readonly linkText?: string;
  readonly linkUrl?: string;
  readonly imageAlt?: string;
  readonly imageUrl?: string;
}

export interface MarkdownEditorEditResult {
  readonly value: string;
  readonly selection: MarkdownEditorSelection;
  readonly changed: boolean;
}

export interface MarkdownEditorSelectionFormatState {
  readonly bold: boolean;
  readonly italic: boolean;
  readonly underline: boolean;
  readonly strikethrough: boolean;
  readonly bulletList: boolean;
  readonly orderedList: boolean;
  readonly taskList: boolean;
}

export type MarkdownEditorNavigationIntent =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "arrow-down"
  | "line-start"
  | "line-end"
  | "document-start"
  | "document-end"
  | "page-up"
  | "page-down";

export interface MarkdownEditorNavigationOptions {
  readonly extendSelection?: boolean;
  readonly pageLineCount?: number;
}

export interface MarkdownEditorHistoryStatus {
  readonly canUndo: boolean;
  readonly canRedo: boolean;
}

export interface MarkdownEditorHostEditApi {
  getSnapshot(): MarkdownEditorSnapshot;
  getSelection(): MarkdownEditorSelection;
  listCommands(): readonly MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId>[];
  setSelection(selection: MarkdownEditorSelection): void;
  applyEdit(result: MarkdownEditorEditResult, options?: { historic?: boolean }): void;
  executeCommand(
    command: MarkdownEditorBuiltinCommandId,
    options?: MarkdownEditorCommandOptions,
  ): MarkdownEditorSnapshot;
  executeNamedCommand(
    command: MarkdownEditorBuiltinCommandId,
    options?: MarkdownEditorCommandOptions,
  ): MarkdownEditorSnapshot;
  undo(): void;
  redo(): void;
  focus(): void;
}
