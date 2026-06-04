import { describe, expect, it } from "vitest";
import { computeCursorPosition, computeNavigatedSelection, normalizeSelection, wrapSelection } from "../src/index.js";

describe("selection transforms", () => {
  it("normalizes reversed selections", () => {
    expect(normalizeSelection({ start: 8, end: 2 }, 10)).toEqual({ start: 2, end: 8, direction: "none" });
  });

  it("wraps a selection with markdown markers", () => {
    const result = wrapSelection("hello world", { start: 0, end: 5 }, "**", "**");
    expect(result.value).toBe("**hello** world");
    expect(result.selection).toEqual({ start: 2, end: 7, direction: "none" });
  });

  it("computes line and column", () => {
    expect(computeCursorPosition("one\ntwo", 5)).toEqual({ offset: 5, line: 2, column: 2 });
  });

  it("computes explicit keyboard navigation selections", () => {
    expect(computeNavigatedSelection("one\ntwo", { start: 0, end: 0 }, "arrow-down")).toEqual({
      start: 4,
      end: 4,
      direction: "none",
    });
    expect(computeNavigatedSelection("one\ntwo", { start: 1, end: 1 }, "line-end")).toEqual({
      start: 3,
      end: 3,
      direction: "none",
    });
    expect(computeNavigatedSelection("one\ntwo", { start: 1, end: 1 }, "arrow-right", { extendSelection: true })).toEqual({
      start: 1,
      end: 2,
      direction: "none",
    });
  });
});
