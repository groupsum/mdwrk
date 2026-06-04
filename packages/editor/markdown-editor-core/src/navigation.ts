import { clampOffset, computeCursorPosition, createSelection, normalizeSelection } from "./selection.js";
import type {
  MarkdownEditorNavigationIntent,
  MarkdownEditorNavigationOptions,
  MarkdownEditorSelection,
} from "./types.js";

function getLineOffsets(value: string): readonly number[] {
  const offsets = [0];
  for (let index = 0; index < value.length; index += 1) {
    if (value[index] === "\n") {
      offsets.push(index + 1);
    }
  }
  return offsets;
}

function getLineStart(offsets: readonly number[], lineIndex: number): number {
  return offsets[Math.max(0, Math.min(offsets.length - 1, lineIndex))] ?? 0;
}

function getLineEnd(value: string, offsets: readonly number[], lineIndex: number): number {
  const lineStart = getLineStart(offsets, lineIndex);
  const nextLineStart = offsets[lineIndex + 1];
  return nextLineStart === undefined ? value.length : nextLineStart - 1;
}

function getOffsetForLineColumn(value: string, offsets: readonly number[], lineIndex: number, column: number): number {
  const lineStart = getLineStart(offsets, lineIndex);
  const lineEnd = getLineEnd(value, offsets, lineIndex);
  return Math.max(lineStart, Math.min(lineEnd, lineStart + Math.max(0, column)));
}

export function computeNavigatedSelection(
  value: string,
  selection: MarkdownEditorSelection,
  intent: MarkdownEditorNavigationIntent,
  options: MarkdownEditorNavigationOptions = {},
): MarkdownEditorSelection {
  const normalized = normalizeSelection(selection, value.length);
  const extendSelection = options.extendSelection ?? false;
  const anchor = extendSelection ? normalized.start : normalized.end;
  const cursor = normalized.end;
  const lineOffsets = getLineOffsets(value);
  const cursorPosition = computeCursorPosition(value, cursor);
  const lineIndex = cursorPosition.line - 1;
  const columnIndex = cursorPosition.column - 1;
  const pageDelta = Math.max(1, options.pageLineCount ?? 12);

  let nextOffset = cursor;

  switch (intent) {
    case "arrow-left":
      nextOffset = clampOffset(cursor - 1, value.length);
      break;
    case "arrow-right":
      nextOffset = clampOffset(cursor + 1, value.length);
      break;
    case "arrow-up":
      nextOffset = getOffsetForLineColumn(value, lineOffsets, lineIndex - 1, columnIndex);
      break;
    case "arrow-down":
      nextOffset = getOffsetForLineColumn(value, lineOffsets, lineIndex + 1, columnIndex);
      break;
    case "line-start":
      nextOffset = getLineStart(lineOffsets, lineIndex);
      break;
    case "line-end":
      nextOffset = getLineEnd(value, lineOffsets, lineIndex);
      break;
    case "document-start":
      nextOffset = 0;
      break;
    case "document-end":
      nextOffset = value.length;
      break;
    case "page-up":
      nextOffset = getOffsetForLineColumn(value, lineOffsets, lineIndex - pageDelta, columnIndex);
      break;
    case "page-down":
      nextOffset = getOffsetForLineColumn(value, lineOffsets, lineIndex + pageDelta, columnIndex);
      break;
    default: {
      const exhaustiveCheck: never = intent;
      throw new Error(`Unsupported navigation intent: ${String(exhaustiveCheck)}`);
    }
  }

  return extendSelection
    ? createSelection(anchor, nextOffset, selection.direction ?? "none")
    : createSelection(nextOffset, nextOffset, selection.direction ?? "none");
}
