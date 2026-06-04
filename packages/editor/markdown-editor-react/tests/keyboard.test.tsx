// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownSourceEditor, useMarkdownEditorNavigation } from "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("MarkdownSourceEditor keyboard behavior", () => {
  it("applies bold formatting with the keyboard shortcut", () => {
    render(<MarkdownSourceEditor defaultValue="hello" />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, 5);
    fireEvent.keyDown(editor, { key: "b", ctrlKey: true });
    expect(editor.value).toBe("**hello**");
  });

  it("does not consume Ctrl+Shift+B so the host can toggle the workspace panel", () => {
    render(<MarkdownSourceEditor defaultValue="hello" />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, 5);
    fireEvent.keyDown(editor, { key: "b", ctrlKey: true, shiftKey: true });
    expect(editor.value).toBe("hello");
  });

  it("indents and outdents with Tab and Shift+Tab", () => {
    render(<MarkdownSourceEditor defaultValue={"alpha\nbeta"} />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, editor.value.length);
    fireEvent.keyDown(editor, { key: "Tab" });
    expect(editor.value).toBe("\talpha\n\tbeta");
    editor.setSelectionRange(1, editor.value.length);
    fireEvent.keyDown(editor, { key: "Tab", shiftKey: true });
    expect(editor.value).toBe("alpha\nbeta");
  });

  it("continues list items on Enter", () => {
    render(<MarkdownSourceEditor defaultValue="- alpha" />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
    fireEvent.keyDown(editor, { key: "Enter" });
    expect(editor.value).toBe("- alpha\n- ");
  });

  it("terminates empty task list items on Enter", () => {
    render(<MarkdownSourceEditor defaultValue="- [ ] " />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(editor.value.length, editor.value.length);
    fireEvent.keyDown(editor, { key: "Enter" });
    expect(editor.value).toBe("");
  });

  it("continues ordered and task list items on Enter", () => {
    render(<MarkdownSourceEditor defaultValue={"2. alpha\n- [x] done"} />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(8, 8);
    fireEvent.keyDown(editor, { key: "Enter" });
    expect(editor.value).toBe("2. alpha\n3. \n- [x] done");

    editor.setSelectionRange(editor.value.length, editor.value.length);
    fireEvent.keyDown(editor, { key: "Enter" });
    expect(editor.value).toBe("2. alpha\n3. \n- [x] done\n- [ ] ");
  });

  it("supports ordered-list insertion through imperative command dispatch", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownSourceEditor>>();
    render(<MarkdownSourceEditor ref={ref} defaultValue="alpha" />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, editor.value.length);
    ref.current?.setSelection({ start: 0, end: editor.value.length });
    await act(async () => {
      ref.current?.executeNamedCommand("ordered-list");
    });
    expect(editor.value).toBe("1. alpha");
  });

  it("exposes explicit navigation helpers through the React hook", () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownSourceEditor>>();

    function Harness(): React.JSX.Element {
      const navigation = useMarkdownEditorNavigation(ref);
      return (
        <>
          <MarkdownSourceEditor ref={ref} defaultValue={"one\ntwo"} />
          <button onClick={() => navigation.navigate("arrow-down")}>down</button>
        </>
      );
    }

    render(<Harness />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    ref.current?.setSelection({ start: 0, end: 0 });
    fireEvent.click(screen.getByRole("button", { name: "down" }));
    expect(editor.selectionStart).toBe(4);
    expect(editor.selectionEnd).toBe(4);
  });

  it("does not consume Ctrl+U for Markdown underline", () => {
    render(<MarkdownSourceEditor defaultValue="hello" />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, 5);
    const wasNotPrevented = fireEvent.keyDown(editor, { key: "u", ctrlKey: true });
    expect(wasNotPrevented).toBe(true);
    expect(editor.value).toBe("hello");
  });
});
