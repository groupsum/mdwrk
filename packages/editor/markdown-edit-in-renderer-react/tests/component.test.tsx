// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownEditInRenderer, useMarkdownEditInRendererCommands } from "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("@mdwrk/markdown-edit-in-renderer-react", () => {
  it("exports the editor command inventory through the package surface", () => {
    function Harness(): React.JSX.Element {
      const commands = useMarkdownEditInRendererCommands();
      return (
        <>
          <output data-testid="command-count">{commands.length}</output>
          <output data-testid="ordered-list-supported">
            {commands.some((command) => command.id === "ordered-list") ? "yes" : "no"}
          </output>
        </>
      );
    }

    render(<Harness />);
    expect(Number(screen.getByTestId("command-count").textContent)).toBeGreaterThan(0);
    expect(screen.getByTestId("ordered-list-supported")).toHaveTextContent("yes");
  });

  it("lists commands and executes ordered-list dispatch while preserving focus", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownEditInRenderer>>();
    const { container } = render(<MarkdownEditInRenderer ref={ref} defaultValue="alpha" />);
    const editor = screen.getByRole("textbox", { name: "Markdown source" }) as HTMLTextAreaElement;

    editor.focus();
    editor.setSelectionRange(0, editor.value.length);
    ref.current?.setSelection({ start: 0, end: editor.value.length, direction: "none" });

    await act(async () => {
      ref.current?.executeNamedCommand("ordered-list");
    });

    expect(ref.current?.listCommands().some((command) => command.id === "task-list")).toBe(true);
    expect(document.activeElement).toBe(editor);
    expect(editor.value).toBe("1. alpha");
    expect(editor.selectionStart).toBeGreaterThanOrEqual(0);
    expect(editor.selectionEnd).toBeGreaterThan(editor.selectionStart);
    expect(container.querySelector("ol li")).toHaveTextContent("alpha");
  });

  it("supports undo and redo through the imperative command surface", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownEditInRenderer>>();
    render(<MarkdownEditInRenderer ref={ref} defaultValue="alpha" />);
    const editor = screen.getByRole("textbox", { name: "Markdown source" }) as HTMLTextAreaElement;

    editor.focus();
    editor.setSelectionRange(0, editor.value.length);
    ref.current?.setSelection({ start: 0, end: editor.value.length, direction: "none" });

    await act(async () => {
      ref.current?.executeCommand("ordered-list");
    });
    await act(async () => {
      ref.current?.executeCommand("undo");
    });
    await act(async () => {
      ref.current?.executeCommand("redo");
    });

    expect(document.activeElement).toBe(editor);
    expect(ref.current?.getSnapshot().value).toBe("1. alpha");
    expect(editor.value).toBe("1. alpha");
  });
});
