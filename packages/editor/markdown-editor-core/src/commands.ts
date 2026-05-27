import { createSelection, normalizeSelection, wrapSelection } from "./selection.js";
import { applyBulletListSelection, applyTaskListSelection, indentSelection, outdentSelection } from "./transforms.js";
import type {
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
  "task-list",
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
  "undo",
  "redo",
  "insert-tab",
] as const;

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
