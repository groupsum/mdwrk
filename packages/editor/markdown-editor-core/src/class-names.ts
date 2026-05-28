export interface MarkdownEditorClassNames {
  readonly root: string;
  readonly layout: string;
  readonly gutter: string;
  readonly lineNumber: string;
  readonly textarea: string;
}

export interface MarkdownEditorHelperClassNames {
  readonly lineNumbersVisible: string;
  readonly lineNumbersHidden: string;
  readonly softWrap: string;
  readonly noWrap: string;
  readonly textareaWrap: string;
  readonly textareaNoWrap: string;
}

export const DEFAULT_MARKDOWN_EDITOR_CLASS_NAMES: MarkdownEditorClassNames = {
  root: "mw-editor",
  layout: "mw-editor-layout",
  gutter: "mw-editor-gutter",
  lineNumber: "mw-editor-line-number",
  textarea: "mw-editor-textarea",
};

export const MARKDOWN_EDITOR_HELPER_CLASS_NAMES: MarkdownEditorHelperClassNames = {
  lineNumbersVisible: "mw-editor--line-numbers-visible",
  lineNumbersHidden: "mw-editor--line-numbers-hidden",
  softWrap: "mw-editor--soft-wrap",
  noWrap: "mw-editor--nowrap",
  textareaWrap: "mw-editor-textarea--wrap",
  textareaNoWrap: "mw-editor-textarea--nowrap",
};
