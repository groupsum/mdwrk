import { describe, expect, it } from "vitest";
import {
  applyOrderedListSelection,
  computeSelectionFormatState,
  getListContinuationPrefix,
  insertListContinuation,
  moveSelectedLines,
} from "../src/index.js";

describe("editor transforms", () => {
  it("computes continuation prefixes for unordered, ordered, and task lists", () => {
    expect(getListContinuationPrefix("- alpha")).toBe("- ");
    expect(getListContinuationPrefix("2. alpha")).toBe("3. ");
    expect(getListContinuationPrefix("- [x] alpha")).toBe("- [ ] ");
  });

  it("continues unordered list items on Enter", () => {
    const result = insertListContinuation("- alpha", { start: 7, end: 7 });
    expect(result.value).toBe("- alpha\n- ");
    expect(result.selection.start).toBe(result.selection.end);
  });

  it("continues ordered and checked task list items on Enter", () => {
    const ordered = insertListContinuation("9) alpha", { start: 8, end: 8 });
    expect(ordered.value).toBe("9) alpha\n10) ");
    expect(ordered.selection).toEqual({ start: 13, end: 13, direction: "none" });

    const task = insertListContinuation("- [x] done", { start: 10, end: 10 });
    expect(task.value).toBe("- [x] done\n- [ ] ");
    expect(task.selection).toEqual({ start: 17, end: 17, direction: "none" });
  });

  it("terminates empty task list items on Enter", () => {
    const result = insertListContinuation("- [ ] ", { start: 6, end: 6 });
    expect(result.value).toBe("");
    expect(result.selection).toEqual({ start: 0, end: 0, direction: "none" });
  });

  it("computes inline wrapper and list-state selection metadata", () => {
    expect(computeSelectionFormatState("**bold**", { start: 2, end: 6 }).bold).toBe(true);
    expect(computeSelectionFormatState("_italic_", { start: 1, end: 7 }).italic).toBe(true);
    expect(computeSelectionFormatState("~~strike~~", { start: 2, end: 8 }).strikethrough).toBe(true);
    expect(computeSelectionFormatState("- item", { start: 2, end: 2 }).bulletList).toBe(true);
    expect(computeSelectionFormatState("1. item", { start: 3, end: 3 }).orderedList).toBe(true);
    expect(computeSelectionFormatState("- [ ] item", { start: 6, end: 6 }).taskList).toBe(true);
  });

  it("adds and removes ordered list prefixes", () => {
    const applied = applyOrderedListSelection("alpha\nbeta", { start: 0, end: 10 });
    expect(applied.value).toBe("1. alpha\n2. beta");

    const removed = applyOrderedListSelection(applied.value, applied.selection);
    expect(removed.value).toBe("alpha\nbeta");
  });

  it("moves selected lines up and down while preserving the block selection", () => {
    const movedUp = moveSelectedLines("one\ntwo\nthree", { start: 4, end: 7 }, "up");
    expect(movedUp.value).toBe("two\none\nthree");
    expect(movedUp.selection).toEqual({ start: 0, end: 3, direction: "none" });

    const boundary = moveSelectedLines("one\ntwo", { start: 0, end: 3 }, "up");
    expect(boundary.changed).toBe(false);
  });
});
