import React from "react";
import { enhanceRenderedCodeBlocks, renderMarkdownToHtmlSync } from "@mdwrk/markdown-renderer-core";
import {
  applyBuiltinMarkdownCommand,
  createHistoryState,
  createSelection,
  listBuiltinMarkdownEditorCommands,
  normalizeSelection,
  pushHistoryEntry,
  redoHistory,
  replaceHistoryPresent,
  undoHistory,
  type MarkdownCommandDescriptor,
  type MarkdownEditorBuiltinCommandId,
  type MarkdownEditorCommandOptions,
  type MarkdownEditorSelection,
  type MarkdownEditorSnapshot,
} from "@mdwrk/markdown-editor-core";
import {
  getProjectedCaret,
  plaintextOffsetFromRenderedPoint,
  projectMarkdownState,
  type PlaintextSelection,
  type ProjectionRect,
  type RenderedCaret,
} from "./projection.js";
import { createMarkdownEditInRendererThemeStyle } from "./theme.js";
import type {
  MarkdownEditInRendererHandle,
  MarkdownEditInRendererProps,
} from "./types.js";

const mergeClassNames = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");
const EDIT_IN_RENDERER_HISTORY_LIMIT = 100;

function createTrailingBlankLineSpacers(markdown: string): string {
  const trailingNewlines = markdown.match(/\n+$/)?.[0].length ?? 0;
  return Array.from({ length: trailingNewlines }, () => (
    '<div class="markdown-edit-in-renderer-blank-line" aria-hidden="true"></div>'
  )).join("");
}

function createBlankMarkdownSpacers(markdown: string): string {
  const blankLineCount = markdown.length === 0 ? 0 : markdown.split("\n").length;
  return Array.from({ length: blankLineCount }, () => (
    '<div class="markdown-edit-in-renderer-blank-line" aria-hidden="true"></div>'
  )).join("");
}

function snapshotFromState(value: string, selection: PlaintextSelection): MarkdownEditorSnapshot {
  return {
    value,
    selection: {
      start: selection.start,
      end: selection.end,
      direction: "none",
    },
  };
}

function normalizePlaintextSelection(selection: MarkdownEditorSelection | PlaintextSelection, length: number): PlaintextSelection {
  const normalized = normalizeSelection({
    start: selection.start,
    end: selection.end,
    direction: "none",
  }, length);
  return {
    start: normalized.start,
    end: normalized.end,
  };
}

export const MarkdownEditInRenderer = React.forwardRef<MarkdownEditInRendererHandle, MarkdownEditInRendererProps>(
  function MarkdownEditInRenderer(
    {
      value,
      defaultValue,
      documentKey,
      onChange,
      className,
      style,
      themeStyle,
      themeVariables,
      surfaceClassName,
      autoFocus = false,
      placeholder = "Start typing...",
      spellCheck = false,
      disabled = false,
      rendererProps,
      htmlHandling = "escape",
      profile = "gfm-default",
      extensions,
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const initialValue = React.useMemo(() => value ?? defaultValue ?? "", []);
    const [draftValue, setDraftValue] = React.useState(initialValue);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const surfaceRef = React.useRef<HTMLDivElement>(null);
    const valueRef = React.useRef(draftValue);
    const selectionRef = React.useRef<PlaintextSelection>({ start: 0, end: 0 });
    const pendingSelectionRef = React.useRef<PlaintextSelection | null>(null);
    const isComposingRef = React.useRef(false);
    const [history, setHistory] = React.useState(() => createHistoryState(
      initialValue,
      createSelection(initialValue.length, initialValue.length),
      EDIT_IN_RENDERER_HISTORY_LIMIT,
    ));
    const historyRef = React.useRef(history);
    const initialCaret = React.useMemo<RenderedCaret>(() => ({
      ...getProjectedCaret(initialValue, 0),
      visible: false,
      left: 0,
      top: 0,
      height: 16,
      confidence: "nearest",
    }), [initialValue]);
    const [caret, setCaret] = React.useState<RenderedCaret>(initialCaret);
    const caretRef = React.useRef<RenderedCaret>(initialCaret);
    const [selectionRects, setSelectionRects] = React.useState<readonly ProjectionRect[]>([]);
    const [compositionRects, setCompositionRects] = React.useState<readonly ProjectionRect[]>([]);
    const [isComposing, setIsComposing] = React.useState(false);

    const markdown = isControlled ? (value ?? "") : draftValue;
    const renderOptions = React.useMemo(
      () => ({
        htmlHandling,
        profile,
        extensions,
        sourcePositionAttributes: rendererProps?.sourcePositionAttributes,
        preserveSoftLineBreaks: rendererProps?.preserveSoftLineBreaks ?? true,
        getLinkAttributes: rendererProps?.getLinkAttributes,
      }),
      [
        htmlHandling,
        profile,
        extensions,
        rendererProps?.sourcePositionAttributes,
        rendererProps?.preserveSoftLineBreaks,
        rendererProps?.getLinkAttributes,
      ],
    );
    const renderedHtml = React.useMemo(
      () => (
        markdown.trim() === ""
          ? createBlankMarkdownSpacers(markdown)
          : `${enhanceRenderedCodeBlocks(renderMarkdownToHtmlSync(markdown, renderOptions))}${createTrailingBlankLineSpacers(markdown)}`
      ),
      [markdown, renderOptions],
    );

    React.useEffect(() => {
      valueRef.current = markdown;
    }, [markdown]);

    React.useEffect(() => {
      historyRef.current = history;
    }, [history]);

    React.useLayoutEffect(() => {
      if (!isControlled || value === undefined) return;
      if (value === valueRef.current) return;
      const nextSelection = normalizePlaintextSelection(selectionRef.current, value.length);
      valueRef.current = value;
      selectionRef.current = nextSelection;
      pendingSelectionRef.current = nextSelection;
      setDraftValue(value);
      setHistory((currentHistory) => {
        const nextHistory = replaceHistoryPresent(currentHistory, value, createSelection(nextSelection.start, nextSelection.end));
        historyRef.current = nextHistory;
        return nextHistory;
      });
    }, [isControlled, value]);

    React.useLayoutEffect(() => {
      const input = inputRef.current;
      const nextSelection = pendingSelectionRef.current;
      if (!input || !nextSelection) return;
      input.setSelectionRange(nextSelection.start, nextSelection.end);
      pendingSelectionRef.current = null;
    }, [markdown]);

    const commitValue = React.useCallback((nextValue: string, nextSelection: PlaintextSelection, options: { historic?: boolean; focus?: boolean } = {}) => {
      const normalizedSelection = normalizePlaintextSelection(nextSelection, nextValue.length);
      valueRef.current = nextValue;
      selectionRef.current = normalizedSelection;
      pendingSelectionRef.current = normalizedSelection;
      if (!isControlled) {
        setDraftValue(nextValue);
      }
      setHistory((currentHistory) => {
        const nextHistory = options.historic === false
          ? replaceHistoryPresent(currentHistory, nextValue, createSelection(normalizedSelection.start, normalizedSelection.end))
          : pushHistoryEntry(currentHistory, nextValue, createSelection(normalizedSelection.start, normalizedSelection.end));
        historyRef.current = nextHistory;
        return nextHistory;
      });
      onChange?.(nextValue);
      if (options.focus) {
        window.requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    }, [isControlled, onChange]);

    const trackPlaintextSelection = React.useCallback((input: HTMLTextAreaElement) => {
      const length = input.value.length;
      selectionRef.current = {
        start: Math.max(0, Math.min(input.selectionStart ?? 0, length)),
        end: Math.max(0, Math.min(input.selectionEnd ?? input.selectionStart ?? 0, length)),
      };
    }, []);

    const restoreTrackedPlaintextSelection = React.useCallback((input: HTMLTextAreaElement) => {
      const length = input.value.length;
      const start = Math.max(0, Math.min(selectionRef.current.start, length));
      const end = Math.max(0, Math.min(selectionRef.current.end, length));
      selectionRef.current = { start, end };
      if (!isComposingRef.current && document.activeElement === input && (input.selectionStart !== start || input.selectionEnd !== end)) {
        input.setSelectionRange(start, end);
      }
      return selectionRef.current;
    }, []);

    const updateRenderedCaret = React.useCallback(() => {
      const input = inputRef.current;
      const surface = surfaceRef.current;
      if (!input || !surface) return;

      const selection = restoreTrackedPlaintextSelection(input);
      const visible = document.activeElement === input && !disabled;
      const projection = projectMarkdownState(surface, input.value, selection, caretRef.current, visible);
      caretRef.current = projection.caret;
      setCaret(projection.caret);
      setSelectionRects(projection.selectionRects);
      if (isComposingRef.current) {
        setCompositionRects(projection.selectionRects.length > 0 ? projection.selectionRects : [{
          left: projection.caret.left,
          top: projection.caret.top + projection.caret.height - 2,
          width: 8,
          height: 2,
        }]);
      } else {
        setCompositionRects([]);
      }
    }, [disabled, restoreTrackedPlaintextSelection]);

    const setTextareaSelection = React.useCallback((start: number, end = start) => {
      const input = inputRef.current;
      if (!input) return;
      const length = input.value.length;
      const nextSelection = {
        start: Math.max(0, Math.min(start, length)),
        end: Math.max(0, Math.min(end, length)),
      };
      selectionRef.current = nextSelection;
      input.focus();
      input.setSelectionRange(nextSelection.start, nextSelection.end);
      window.requestAnimationFrame(updateRenderedCaret);
    }, [updateRenderedCaret]);

    const executeCommand = React.useCallback((
      command: MarkdownEditorBuiltinCommandId,
      options: MarkdownEditorCommandOptions = {},
    ): MarkdownEditorSnapshot => {
      if (command === "undo") {
        const nextHistory = undoHistory(historyRef.current);
        historyRef.current = nextHistory;
        setHistory(nextHistory);
        valueRef.current = nextHistory.present.value;
        const nextSelection = normalizePlaintextSelection(nextHistory.present.selection, nextHistory.present.value.length);
        selectionRef.current = nextSelection;
        pendingSelectionRef.current = nextSelection;
        if (!isControlled) {
          setDraftValue(nextHistory.present.value);
        }
        onChange?.(nextHistory.present.value);
        window.requestAnimationFrame(() => {
          inputRef.current?.focus();
          updateRenderedCaret();
        });
        return nextHistory.present;
      }

      if (command === "redo") {
        const nextHistory = redoHistory(historyRef.current);
        historyRef.current = nextHistory;
        setHistory(nextHistory);
        valueRef.current = nextHistory.present.value;
        const nextSelection = normalizePlaintextSelection(nextHistory.present.selection, nextHistory.present.value.length);
        selectionRef.current = nextSelection;
        pendingSelectionRef.current = nextSelection;
        if (!isControlled) {
          setDraftValue(nextHistory.present.value);
        }
        onChange?.(nextHistory.present.value);
        window.requestAnimationFrame(() => {
          inputRef.current?.focus();
          updateRenderedCaret();
        });
        return nextHistory.present;
      }

      const result = applyBuiltinMarkdownCommand(command, valueRef.current, {
        start: selectionRef.current.start,
        end: selectionRef.current.end,
        direction: "none",
      }, options);
      const nextSelection = normalizePlaintextSelection(result.selection, result.value.length);
      if (result.changed) {
        commitValue(result.value, nextSelection, { focus: true });
      } else {
        pendingSelectionRef.current = nextSelection;
        window.requestAnimationFrame(() => {
          inputRef.current?.focus();
          updateRenderedCaret();
        });
      }
      return snapshotFromState(result.value, nextSelection);
    }, [commitValue, isControlled, onChange, updateRenderedCaret]);

    const updateSelectionFromPointer = React.useCallback((event: React.PointerEvent<HTMLTextAreaElement>, extendSelection: boolean) => {
      const surface = surfaceRef.current;
      const input = inputRef.current;
      if (!surface || !input || disabled) return;
      const offset = plaintextOffsetFromRenderedPoint(surface, input.value, event.clientX, event.clientY);
      if (extendSelection) {
        setTextareaSelection(selectionRef.current.start, offset);
      } else {
        setTextareaSelection(offset);
      }
    }, [disabled, setTextareaSelection]);

    const handleHostPointerDown = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (event.pointerType === "touch") return;
      event.preventDefault();
      updateSelectionFromPointer(event as unknown as React.PointerEvent<HTMLTextAreaElement>, event.shiftKey);
    }, [disabled, updateSelectionFromPointer]);

    const handleHostPointerMove = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || event.buttons !== 1) return;
      if (event.pointerType === "touch") return;
      event.preventDefault();
      updateSelectionFromPointer(event as unknown as React.PointerEvent<HTMLTextAreaElement>, true);
    }, [disabled, updateSelectionFromPointer]);

    React.useEffect(() => {
      if (!autoFocus || disabled) return;
      inputRef.current?.focus();
    }, [autoFocus, disabled]);

    React.useImperativeHandle(ref, () => ({
      focus(): void {
        inputRef.current?.focus();
      },
      getValue(): string {
        return valueRef.current;
      },
      getSnapshot(): MarkdownEditorSnapshot {
        return snapshotFromState(valueRef.current, selectionRef.current);
      },
      getSelection(): MarkdownEditorSelection {
        return {
          start: selectionRef.current.start,
          end: selectionRef.current.end,
          direction: "none",
        };
      },
      getInputElement(): HTMLTextAreaElement | null {
        return inputRef.current;
      },
      setSelection(nextSelection: MarkdownEditorSelection): void {
        const normalized = normalizePlaintextSelection(nextSelection, valueRef.current.length);
        selectionRef.current = normalized;
        pendingSelectionRef.current = normalized;
        window.requestAnimationFrame(() => {
          inputRef.current?.focus();
          updateRenderedCaret();
        });
      },
      setValue(nextValue: string, options?: { selection?: MarkdownEditorSelection }): void {
        commitValue(
          nextValue,
          normalizePlaintextSelection(options?.selection ?? createSelection(nextValue.length, nextValue.length), nextValue.length),
          { focus: true },
        );
      },
      executeCommand(command: MarkdownEditorBuiltinCommandId, options?: MarkdownEditorCommandOptions): MarkdownEditorSnapshot {
        return executeCommand(command, options);
      },
      executeNamedCommand(command: MarkdownEditorBuiltinCommandId, options?: MarkdownEditorCommandOptions): MarkdownEditorSnapshot {
        return executeCommand(command, options);
      },
      listCommands(): readonly MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId>[] {
        return listBuiltinMarkdownEditorCommands();
      },
    }), [commitValue, executeCommand, updateRenderedCaret]);

    const mergedThemeStyle = React.useMemo(
      () => ({
        ...createMarkdownEditInRendererThemeStyle(themeVariables),
        ...themeStyle,
        ...style,
      }),
      [style, themeStyle, themeVariables],
    );

    React.useLayoutEffect(() => {
      updateRenderedCaret();
    }, [markdown, renderedHtml, updateRenderedCaret]);

    return (
      <div
        className={mergeClassNames("markdown-edit-in-renderer-host", className)}
        style={mergedThemeStyle}
        data-document-key={documentKey}
        data-testid="markdown-edit-in-renderer"
        onPointerDown={handleHostPointerDown}
        onPointerMove={handleHostPointerMove}
      >
        <div
          ref={surfaceRef}
          className={mergeClassNames("markdown-edit-in-renderer-surface markdown-body", surfaceClassName)}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
        <div className="markdown-edit-in-renderer-selection-layer" aria-hidden="true">
          {selectionRects.map((rect, index) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`selection-${index}`}
              className="markdown-edit-in-renderer-selection"
              style={{
                left: `${rect.left}px`,
                top: `${rect.top}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
              }}
            />
          ))}
        </div>
        <div
          className="markdown-edit-in-renderer-composition-layer"
          data-active={isComposing ? "true" : "false"}
          aria-hidden="true"
        >
          {compositionRects.map((rect, index) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`composition-${index}`}
              className="markdown-edit-in-renderer-composition"
              style={{
                left: `${rect.left}px`,
                top: `${rect.top + Math.max(0, rect.height - 2)}px`,
                width: `${Math.max(8, rect.width)}px`,
                height: "2px",
              }}
            />
          ))}
        </div>
        <span
          className="markdown-edit-in-renderer-caret"
          data-visible={caret.visible ? "true" : "false"}
          data-plaintext-line={caret.plaintextLine}
          data-plaintext-char={caret.plaintextChar}
          data-rendered-line={caret.renderedLine}
          data-rendered-char={caret.renderedChar}
          data-rendered-line-in-block={caret.renderedLineInBlock}
          data-projection-confidence={caret.confidence}
          aria-hidden="true"
          style={{
            left: `${caret.left}px`,
            top: `${caret.top}px`,
            height: `${caret.height}px`,
          }}
        />
        <textarea
          ref={inputRef}
          className="markdown-edit-in-renderer-plaintext"
          value={markdown}
          onChange={(event) => {
            trackPlaintextSelection(event.currentTarget);
            commitValue(event.currentTarget.value, selectionRef.current);
            window.requestAnimationFrame(updateRenderedCaret);
          }}
          onFocus={() => {
            const input = inputRef.current;
            if (input) {
              trackPlaintextSelection(input);
            }
            window.requestAnimationFrame(updateRenderedCaret);
          }}
          onBlur={() => {
            window.requestAnimationFrame(updateRenderedCaret);
          }}
          onSelect={(event) => {
            trackPlaintextSelection(event.currentTarget);
            updateRenderedCaret();
          }}
          onKeyUp={(event) => {
            trackPlaintextSelection(event.currentTarget);
            updateRenderedCaret();
          }}
          onMouseUp={(event) => {
            trackPlaintextSelection(event.currentTarget);
            updateRenderedCaret();
          }}
          onScroll={updateRenderedCaret}
          onCompositionStart={(event) => {
            isComposingRef.current = true;
            setIsComposing(true);
            trackPlaintextSelection(event.currentTarget);
            window.requestAnimationFrame(updateRenderedCaret);
          }}
          onCompositionUpdate={(event) => {
            isComposingRef.current = true;
            setIsComposing(true);
            trackPlaintextSelection(event.currentTarget);
            window.requestAnimationFrame(updateRenderedCaret);
          }}
          onCompositionEnd={(event) => {
            isComposingRef.current = false;
            setIsComposing(false);
            trackPlaintextSelection(event.currentTarget);
            window.requestAnimationFrame(updateRenderedCaret);
          }}
          aria-label="Markdown source"
          aria-multiline="true"
          data-placeholder={placeholder}
          spellCheck={spellCheck}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

export function useMarkdownEditInRendererCommands(): readonly MarkdownCommandDescriptor<MarkdownEditorBuiltinCommandId>[] {
  return React.useMemo(() => listBuiltinMarkdownEditorCommands(), []);
}
