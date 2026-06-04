import { describe, expect, it } from "vitest";
import { applyBuiltinMarkdownCommand, listBuiltinMarkdownEditorCommands } from "../src/index.js";

describe("builtin markdown editor commands", () => {
  it("applies bold to the selected text", () => {
    const result = applyBuiltinMarkdownCommand("bold", "portable", { start: 0, end: 8 });
    expect(result.value).toBe("**portable**");
    expect(result.selection).toEqual({ start: 2, end: 10, direction: "none" });
  });

  it("toggles unordered list prefixes for selected lines", () => {
    const result = applyBuiltinMarkdownCommand("bullet-list", "alpha\nbeta", { start: 0, end: 10 });
    expect(result.value).toBe("- alpha\n- beta");
    expect(result.selection.start).toBe(0);
    expect(result.selection.end).toBe(14);
  });

  it("indents multiple selected lines", () => {
    const result = applyBuiltinMarkdownCommand("indent", "a\nb", { start: 0, end: 3 });
    expect(result.value).toBe("\ta\n\tb");
    expect(result.selection.start).toBe(1);
    expect(result.selection.end).toBe(5);
  });

  it("outdents multiple selected lines", () => {
    const result = applyBuiltinMarkdownCommand("outdent", "\ta\n\tb", { start: 1, end: 5 });
    expect(result.value).toBe("a\nb");
  });

  it("creates task list items for the selected lines", () => {
    const result = applyBuiltinMarkdownCommand("task-list", "alpha\nbeta", { start: 0, end: 10 });
    expect(result.value).toBe("- [ ] alpha\n- [ ] beta");
    expect(result.selection.start).toBe(0);
    expect(result.selection.end).toBe(22);
  });

  it("toggles ordered list prefixes for selected lines", () => {
    const result = applyBuiltinMarkdownCommand("ordered-list", "alpha\nbeta", { start: 0, end: 10 });
    expect(result.value).toBe("1. alpha\n2. beta");
    expect(result.selection.start).toBe(0);
    expect(result.selection.end).toBe(16);
  });

  it("moves the current line or selected block up and down", () => {
    const movedUp = applyBuiltinMarkdownCommand("move-line-up", "one\ntwo\nthree", { start: 5, end: 5 });
    expect(movedUp.value).toBe("two\none\nthree");

    const movedDown = applyBuiltinMarkdownCommand("move-block-down", "one\ntwo\nthree", { start: 0, end: 7 });
    expect(movedDown.value).toBe("three\none\ntwo");
  });

  it("wraps selected text as a markdown link and selects the URL", () => {
    const result = applyBuiltinMarkdownCommand("link", "MdWrk docs", { start: 0, end: 5 });
    expect(result.value).toBe("[MdWrk](https://example.com) docs");
    expect(result.selection).toEqual({ start: 8, end: 27, direction: "none" });
  });

  it("inserts an empty-selection link stub and selects the label", () => {
    const result = applyBuiltinMarkdownCommand("link", "See ", { start: 4, end: 4 });
    expect(result.value).toBe("See [link text](https://example.com)");
    expect(result.selection).toEqual({ start: 5, end: 14, direction: "none" });
  });

  it("updates an existing markdown link without nesting it", () => {
    const result = applyBuiltinMarkdownCommand(
      "link",
      "Read [docs](old.md) now",
      { start: 8, end: 12 },
      { linkUrl: "./guide.md#install" },
    );
    expect(result.value).toBe("Read [docs](./guide.md#install) now");
    expect(result.selection).toEqual({ start: 12, end: 30, direction: "none" });
  });

  it("updates an existing markdown link when the cursor is inside the URL", () => {
    const result = applyBuiltinMarkdownCommand(
      "link",
      "Read [docs](old.md) now",
      { start: 14, end: 14 },
      { linkUrl: "#usage" },
    );
    expect(result.value).toBe("Read [docs](#usage) now");
    expect(result.selection).toEqual({ start: 12, end: 18, direction: "none" });
  });

  it("wraps selected text with pasted internal file and hash URLs", () => {
    const fileLink = applyBuiltinMarkdownCommand(
      "link",
      "Project notes",
      { start: 0, end: 7 },
      { linkUrl: "notes.md#intro" },
    );
    expect(fileLink.value).toBe("[Project](notes.md#intro) notes");
    expect(fileLink.selection).toEqual({ start: 10, end: 24, direction: "none" });

    const hashLink = applyBuiltinMarkdownCommand(
      "link",
      "Jump section",
      { start: 5, end: 12 },
      { linkUrl: "#section" },
    );
    expect(hashLink.value).toBe("Jump [section](#section)");
    expect(hashLink.selection).toEqual({ start: 15, end: 23, direction: "none" });
  });

  it("wraps selected text as a markdown image and selects the URL", () => {
    const result = applyBuiltinMarkdownCommand(
      "image",
      "Architecture diagram",
      { start: 0, end: 12 },
      { imageUrl: "./diagram.png" },
    );
    expect(result.value).toBe("![Architecture](./diagram.png) diagram");
    expect(result.selection).toEqual({ start: 16, end: 29, direction: "none" });
  });

  it("updates existing markdown images without treating them as links", () => {
    const result = applyBuiltinMarkdownCommand(
      "image",
      "Use [docs](guide.md) and ![logo](old.png)",
      { start: 27, end: 31 },
      { imageUrl: "./logo.svg" },
    );
    expect(result.value).toBe("Use [docs](guide.md) and ![logo](./logo.svg)");
    expect(result.selection).toEqual({ start: 33, end: 43, direction: "none" });
  });

  it("upgrades an existing list item into an unchecked task item", () => {
    const result = applyBuiltinMarkdownCommand("task-list", "- alpha", { start: 2, end: 2 });
    expect(result.value).toBe("- [ ] alpha");
    expect(result.selection.start).toBe(6);
    expect(result.selection.end).toBe(6);
  });

  it("keeps the cursor on the same content character when creating a task item", () => {
    const result = applyBuiltinMarkdownCommand("task-list", "alpha", { start: 2, end: 2 });
    expect(result.value).toBe("- [ ] alpha");
    expect(result.selection).toEqual({ start: 8, end: 8, direction: "none" });
  });

  it("keeps checkbox command state isolated from italic state", () => {
    const result = applyBuiltinMarkdownCommand("task-list", "alpha", { start: 2, end: 2 });
    expect(result.value).toBe("- [ ] alpha");
    expect(result.selection).toEqual({ start: 8, end: 8, direction: "none" });
  });

  it("creates a footnote reference and appends the footnote definition at document end", () => {
    const result = applyBuiltinMarkdownCommand("footnote", "Alpha", { start: 5, end: 5 });
    expect(result.value).toBe("Alpha[^1]\n\n[^1]: ");
    expect(result.selection).toEqual({ start: 17, end: 17, direction: "none" });
  });

  it("appends a footnote reference after selected text and increments the next numeric footnote id", () => {
    const result = applyBuiltinMarkdownCommand(
      "footnote",
      "Alpha beta[^1]\n\n[^1]: prior note",
      { start: 6, end: 10 },
    );
    expect(result.value).toBe("Alpha beta[^2][^1]\n\n[^1]: prior note\n\n[^2]: ");
    expect(result.selection).toEqual({ start: 44, end: 44, direction: "none" });
  });

  it("exports command descriptors with scope and applicability metadata", () => {
    const commands = listBuiltinMarkdownEditorCommands();
    expect(commands.find((command) => command.id === "ordered-list")).toMatchObject({
      scope: "editor",
      category: "list",
    });
    expect(commands.find((command) => command.id === "task-list")?.applicability).toContain("gfm");
    expect(commands.find((command) => command.id === "move-line-up")?.applicability).toContain("mdwrk-operator");
  });
});
