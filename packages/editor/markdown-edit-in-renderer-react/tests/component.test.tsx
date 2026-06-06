// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MarkdownEditInRenderer, useMarkdownEditInRendererCommands, useMarkdownEditInRendererNavigation } from "../src/index.js";

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

  it("exposes explicit navigation helpers through the React hook", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownEditInRenderer>>();

    function Harness(): React.JSX.Element {
      const navigation = useMarkdownEditInRendererNavigation(ref);
      return (
        <>
          <MarkdownEditInRenderer ref={ref} defaultValue={"one\ntwo"} />
          <button onClick={() => navigation.navigate("arrow-down")}>down</button>
        </>
      );
    }

    render(<Harness />);
    const editor = screen.getByRole("textbox", { name: "Markdown source" }) as HTMLTextAreaElement;
    editor.focus();
    ref.current?.setSelection({ start: 0, end: 0, direction: "none" });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "down" }));
    });

    await waitFor(() => {
      expect(document.activeElement).toBe(editor);
      expect(ref.current?.getSelection()).toEqual({ start: 4, end: 4, direction: "none" });
    });
  });

  it("keeps imperative commands fail-closed while disabled", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownEditInRenderer>>();
    render(<MarkdownEditInRenderer ref={ref} defaultValue="alpha" disabled />);
    const editor = screen.getByRole("textbox", { name: "Markdown source" }) as HTMLTextAreaElement;

    await act(async () => {
      ref.current?.executeNamedCommand("ordered-list");
      ref.current?.navigateSelection("arrow-down");
      ref.current?.setSelection({ start: 0, end: 5, direction: "none" });
    });

    expect(ref.current?.getSnapshot()).toEqual({
      value: "alpha",
      selection: { start: 0, end: 0, direction: "none" },
    });
    expect(editor.value).toBe("alpha");
    expect(document.activeElement).not.toBe(editor);
  });

  it("keeps navigation bounded and supports selection extension", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownEditInRenderer>>();
    render(<MarkdownEditInRenderer ref={ref} defaultValue={"one\ntwo"} />);
    const editor = screen.getByRole("textbox", { name: "Markdown source" }) as HTMLTextAreaElement;

    editor.focus();
    ref.current?.setSelection({ start: 0, end: 0, direction: "none" });

    await act(async () => {
      ref.current?.navigateSelection("arrow-up");
    });

    expect(ref.current?.getSelection()).toEqual({ start: 0, end: 0, direction: "none" });

    await act(async () => {
      ref.current?.setSelection({ start: 0, end: 0, direction: "none" });
    });

    await act(async () => {
      ref.current?.navigateSelection("arrow-down", { extendSelection: true });
    });

    expect(document.activeElement).toBe(editor);
    expect(ref.current?.getSelection()).toEqual({ start: 0, end: 4, direction: "none" });
  });
});
