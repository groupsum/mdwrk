import { createSelection, normalizeSelection, wrapSelection } from "./selection.js";
import {
  applyBulletListSelection,
  applyOrderedListSelection,
  applyTaskListSelection,
  indentSelection,
  moveSelectedLines,
  outdentSelection,
} from "./transforms.js";
import type {
  MarkdownCommandDescriptor,
  MarkdownEditorBuiltinCommandId,
  MarkdownEditorCommandOptions,
  MarkdownEditorEditResult,
  MarkdownEditorSelection,
} from "./types.js";

export const BUILTIN_MARKDOWN_EDITOR_COMMANDS: readonly MarkdownEditorBuiltinCommandId[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "bullet-list",
  "ordered-list",
  "task-list",
  "image",
  "link",
  "front-matter",
  "footnote",
  "inline-math",
  "block-math",
  "superscript",
  "subscript",
  "citation",
  "indent",
  "outdent",
  "move-line-up",
  "move-line-down",
  "move-block-up",
  "move-block-down",
  "undo",
  "redo",
  "insert-tab",
] as const;

export const BUILTIN_MARKDOWN_EDITOR_COMMAND_DESCRIPTORS = [
  { id: "bold", title: "Bold", scope: "editor", category: "format", applicability: ["cm", "gfm", "cfm"], description: "Wrap the current selection in strong markers." },
  { id: "italic", title: "Italic", scope: "editor", category: "format", applicability: ["cm", "gfm", "cfm"], description: "Wrap the current selection in emphasis markers." },
  { id: "underline", title: "Underline", scope: "editor", category: "format", applicability: ["mdwrk-operator", "cfm"], description: "Wrap the current selection in MdWrk underline markers." },
  { id: "strikethrough", title: "Strikethrough", scope: "editor", category: "format", applicability: ["gfm", "cfm"], description: "Wrap the current selection in strike markers." },
  { id: "bullet-list", title: "Bullet List", scope: "editor", category: "list", applicability: ["cm", "gfm", "cfm"], description: "Toggle unordered list markers for the selected lines." },
  { id: "ordered-list", title: "Ordered List", scope: "editor", category: "list", applicability: ["cm", "gfm", "cfm"], description: "Toggle ordered list markers for the selected lines." },
  { id: "task-list", title: "Checklist", scope: "editor", category: "list", applicability: ["gfm", "cfm"], description: "Toggle task-list markers for the selected lines." },
  { id: "link", title: "Link", scope: "editor", category: "format", applicability: ["cm", "gfm", "cfm"], description: "Insert or update a markdown link." },
  { id: "image", title: "Image", scope: "editor", category: "format", applicability: ["cm", "gfm", "cfm"], description: "Insert or update a markdown image." },
  { id: "front-matter", title: "Front Matter", scope: "editor", category: "structure", applicability: ["mdwrk-operator", "cfm"], description: "Insert a YAML front matter scaffold." },
  { id: "footnote", title: "Footnote", scope: "editor", category: "structure", applicability: ["gfm", "cfm"], description: "Insert a footnote reference and definition." },
  { id: "inline-math", title: "Inline Math", scope: "editor", category: "format", applicability: ["cfm"], description: "Wrap the selection in inline math delimiters." },
  { id: "block-math", title: "Block Math", scope: "editor", category: "structure", applicability: ["cfm"], description: "Wrap the selection in block math delimiters." },
  { id: "superscript", title: "Superscript", scope: "editor", category: "format", applicability: ["cfm"], description: "Wrap the selection in superscript markers." },
  { id: "subscript", title: "Subscript", scope: "editor", category: "format", applicability: ["cfm"], description: "Wrap the selection in subscript markers." },
  { id: "citation", title: "Citation", scope: "editor", category: "format", applicability: ["cfm"], description: "Wrap the selection in citation markers." },
  { id: "indent", title: "Indent", scope: "editor", category: "selection", applicability: ["mdwrk-operator"], description: "Indent the current selection." },
  { id: "outdent", title: "Outdent", scope: "editor", category: "selection", applicability: ["mdwrk-operator"], description: "Outdent the current selection." },
  { id: "move-line-up", title: "Move Line Up", scope: "editor", category: "navigation", applicability: ["mdwrk-operator"], description: "Move the current line up by one line." },
  { id: "move-line-down", title: "Move Line Down", scope: "editor", category: "navigation", applicability: ["mdwrk-operator"], description: "Move the current line down by one line." },
  { id: "move-block-up", title: "Move Block Up", scope: "editor", category: "navigation", applicability: ["mdwrk-operator"], description: "Move the selected block up by one line." },
  { id: "move-block-down", title: "Move Block Down", scope: "editor", category: "navigation", applicability: ["mdwrk-operator"], description: "Move the selected block down by one line." },
  { id: "undo", title: "Undo", scope: "editor", category: "history", applicability: ["mdwrk-operator"], description: "Restore the previous editor snapshot." },
  { id: "redo", title: "Redo", scope: "editor", category: "history", applicability: ["mdwrk-operator"], description: "Restore the next editor snapshot." },
  { id: "insert-tab", title: "Insert Tab", scope: "editor", category: "selection", applicability: ["mdwrk-operator"], description: "Indent using the configured indentation unit." },
] as const satisfies readonly MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId>[];

export function applyBuiltinMarkdownCommand(
  command: MarkdownEditorBuiltinCommandId,
  value: string,
  selection: MarkdownEditorSelection,
  options: MarkdownEditorCommandOptions = {},
): MarkdownEditorEditResult {
  switch (command) {
    case "bold":
      return wrapSelection(value, selection, "**", "**");
    case "italic":
      return wrapSelection(value, selection, "_", "_");
    case "underline":
      return wrapSelection(value, selection, "__", "__");
    case "strikethrough":
      return wrapSelection(value, selection, "~~", "~~");
    case "bullet-list":
      return applyBulletListSelection(value, selection);
    case "ordered-list":
      return applyOrderedListSelection(value, selection);
    case "task-list":
      return applyTaskListSelection(value, selection);
    case "link":
      return applyLinkCommand(value, selection, options);
    case "image":
      return applyImageCommand(value, selection, options);
    case "front-matter": {
      const frontMatter = "---\ntitle: \n---\n\n";
      if (String(value).startsWith("---\n")) {
        return { value, selection, changed: false };
      }
      return {
        value: `${frontMatter}${value}`,
        selection: {
          start: 10,
          end: 10,
          direction: 'none',
        },
        changed: true,
      };
    }
    case "footnote":
      return applyFootnoteCommand(value, selection);
    case "inline-math":
      return wrapSelection(value, selection, "$", "$");
    case "block-math":
      return wrapSelection(value, selection, "$$\n", "\n$$");
    case "superscript":
      return wrapSelection(value, selection, "^", "^");
    case "subscript":
      return wrapSelection(value, selection, "~", "~");
    case "citation":
      return wrapSelection(value, selection, "[@", "]");
    case "indent":
    case "insert-tab":
      return indentSelection(value, selection, options.indentUnit ?? "\t");
    case "outdent":
      return outdentSelection(value, selection, options.indentUnit ?? "\t");
    case "move-line-up":
    case "move-block-up":
      return moveSelectedLines(value, selection, "up");
    case "move-line-down":
    case "move-block-down":
      return moveSelectedLines(value, selection, "down");
    case "undo":
    case "redo":
      return {
        value,
        selection,
        changed: false,
      };
    default: {
      const exhaustiveCheck: never = command;
      throw new Error(`Unsupported markdown editor command: ${String(exhaustiveCheck)}`);
    }
  }
}

export function listBuiltinMarkdownEditorCommands(): readonly MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId>[] {
  return BUILTIN_MARKDOWN_EDITOR_COMMAND_DESCRIPTORS;
}

function applyFootnoteCommand(
  value: string,
  selection: MarkdownEditorSelection,
): MarkdownEditorEditResult {
  const normalized = normalizeSelection(selection, value.length);
  const nextIndex = getNextFootnoteIndex(value);
  const reference = `[^${nextIndex}]`;
  const insertionOffset = normalized.end;
  const nextValueWithReference = `${value.slice(0, insertionOffset)}${reference}${value.slice(insertionOffset)}`;

  const separator = resolveFootnoteSeparator(nextValueWithReference);
  const definitionPrefix = `${separator}[^${nextIndex}]: `;
  const nextValue = `${nextValueWithReference}${definitionPrefix}`;
  const nextOffset = nextValue.length;

  return {
    value: nextValue,
    selection: createSelection(nextOffset, nextOffset),
    changed: nextValue !== value,
  };
}

function getNextFootnoteIndex(value: string): number {
  const pattern = /\[\^(\d+)\](?::)?/g;
  let maxIndex = 0;

  for (const match of value.matchAll(pattern)) {
    const nextValue = Number.parseInt(match[1] ?? "0", 10);
    if (Number.isFinite(nextValue)) {
      maxIndex = Math.max(maxIndex, nextValue);
    }
  }

  return maxIndex + 1;
}

function resolveFootnoteSeparator(value: string): string {
  if (value.length === 0) {
    return "\n\n";
  }

  if (value.endsWith("\n\n")) {
    return "";
  }

  if (value.endsWith("\n")) {
    return "\n";
  }

  return "\n\n";
}

interface MarkdownLinkRange {
  readonly start: number;
  readonly end: number;
  readonly textStart: number;
  readonly textEnd: number;
  readonly urlStart: number;
  readonly urlEnd: number;
  readonly text: string;
  readonly url: string;
}

interface MarkdownImageRange {
  readonly start: number;
  readonly end: number;
  readonly altStart: number;
  readonly altEnd: number;
  readonly urlStart: number;
  readonly urlEnd: number;
  readonly alt: string;
  readonly url: string;
}

function applyLinkCommand(
  value: string,
  selection: MarkdownEditorSelection,
  options: MarkdownEditorCommandOptions,
): MarkdownEditorEditResult {
  const normalized = normalizeSelection(selection, value.length);
  const existingLink = findEditableMarkdownLink(value, normalized);
  const url = options.linkUrl ?? existingLink?.url ?? "https://example.com";

  if (existingLink) {
    const label = options.linkText ?? existingLink.text;
    const replacement = `[${label}](${url})`;
    const nextValue = `${value.slice(0, existingLink.start)}${replacement}${value.slice(existingLink.end)}`;
    const urlStart = existingLink.start + label.length + 3;
    return {
      value: nextValue,
      selection: createSelection(urlStart, urlStart + url.length),
      changed: nextValue !== value,
    };
  }

  const selectedText = value.slice(normalized.start, normalized.end);
  const label = options.linkText ?? (selectedText || "link text");
  const replacement = `[${label}](${url})`;
  const nextValue = `${value.slice(0, normalized.start)}${replacement}${value.slice(normalized.end)}`;
  const labelStart = normalized.start + 1;
  const urlStart = normalized.start + label.length + 3;
  const shouldSelectLabel = normalized.start === normalized.end && options.linkText === undefined;

  return {
    value: nextValue,
    selection: shouldSelectLabel
      ? createSelection(labelStart, labelStart + label.length)
      : createSelection(urlStart, urlStart + url.length),
    changed: nextValue !== value,
  };
}

function applyImageCommand(
  value: string,
  selection: MarkdownEditorSelection,
  options: MarkdownEditorCommandOptions,
): MarkdownEditorEditResult {
  const normalized = normalizeSelection(selection, value.length);
  const existingImage = findEditableMarkdownImage(value, normalized);
  const url = options.imageUrl ?? existingImage?.url ?? "image.png";

  if (existingImage) {
    const alt = options.imageAlt ?? existingImage.alt;
    const replacement = `![${alt}](${url})`;
    const nextValue = `${value.slice(0, existingImage.start)}${replacement}${value.slice(existingImage.end)}`;
    const urlStart = existingImage.start + alt.length + 4;
    return {
      value: nextValue,
      selection: createSelection(urlStart, urlStart + url.length),
      changed: nextValue !== value,
    };
  }

  const selectedText = value.slice(normalized.start, normalized.end);
  const alt = options.imageAlt ?? (selectedText || "image description");
  const replacement = `![${alt}](${url})`;
  const nextValue = `${value.slice(0, normalized.start)}${replacement}${value.slice(normalized.end)}`;
  const altStart = normalized.start + 2;
  const urlStart = normalized.start + alt.length + 4;
  const shouldSelectAlt = normalized.start === normalized.end && options.imageAlt === undefined;

  return {
    value: nextValue,
    selection: shouldSelectAlt
      ? createSelection(altStart, altStart + alt.length)
      : createSelection(urlStart, urlStart + url.length),
    changed: nextValue !== value,
  };
}

function findEditableMarkdownLink(value: string, selection: MarkdownEditorSelection): MarkdownLinkRange | undefined {
  const linkPattern = /(?<!!)\[([^\]\n]+)\]\(([^)\n]*)\)/g;
  for (const match of value.matchAll(linkPattern)) {
    const fullMatch = match[0];
    const index = match.index ?? 0;
    const text = match[1] ?? "";
    const url = match[2] ?? "";
    const textStart = index + 1;
    const textEnd = textStart + text.length;
    const urlStart = textEnd + 2;
    const urlEnd = urlStart + url.length;
    const linkEnd = index + fullMatch.length;

    if (selectionTouchesRange(selection, index, linkEnd)) {
      return {
        start: index,
        end: linkEnd,
        textStart,
        textEnd,
        urlStart,
        urlEnd,
        text,
        url,
      };
    }
  }

  return undefined;
}

function findEditableMarkdownImage(value: string, selection: MarkdownEditorSelection): MarkdownImageRange | undefined {
  const imagePattern = /!\[([^\]\n]*)\]\(([^)\n]*)\)/g;
  for (const match of value.matchAll(imagePattern)) {
    const fullMatch = match[0];
    const index = match.index ?? 0;
    const alt = match[1] ?? "";
    const url = match[2] ?? "";
    const altStart = index + 2;
    const altEnd = altStart + alt.length;
    const urlStart = altEnd + 2;
    const urlEnd = urlStart + url.length;
    const imageEnd = index + fullMatch.length;

    if (selectionTouchesRange(selection, index, imageEnd)) {
      return {
        start: index,
        end: imageEnd,
        altStart,
        altEnd,
        urlStart,
        urlEnd,
        alt,
        url,
      };
    }
  }

  return undefined;
}

function selectionTouchesRange(selection: MarkdownEditorSelection, rangeStart: number, rangeEnd: number): boolean {
  if (selection.start === selection.end) {
    return selection.start >= rangeStart && selection.start <= rangeEnd;
  }
  return selection.start < rangeEnd && selection.end > rangeStart;
}
