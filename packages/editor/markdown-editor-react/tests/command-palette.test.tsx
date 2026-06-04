// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownSourceEditor, useMarkdownCommandPalette } from "../src/index.js";

describe("Markdown editor command palette", () => {
  it("filters command descriptors and executes the selected command", async () => {
    const ref = React.createRef<React.ElementRef<typeof MarkdownSourceEditor>>();

    function Harness(): React.JSX.Element {
      const palette = useMarkdownCommandPalette(ref);
      return (
        <>
          <MarkdownSourceEditor ref={ref} defaultValue="alpha" />
          <input aria-label="query" value={palette.query} onChange={(event) => palette.setQuery(event.currentTarget.value)} />
          <button onClick={() => palette.execute("ordered-list")}>run</button>
          <output data-testid="count">{palette.commands.length}</output>
        </>
      );
    }

    render(<Harness />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    editor.focus();
    editor.setSelectionRange(0, editor.value.length);
    fireEvent.change(screen.getByLabelText("query"), { target: { value: "ordered" } });
    expect(Number(screen.getByTestId("count").textContent)).toBeGreaterThan(0);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "run" }));
    });
    expect(editor.value).toBe("1. alpha");
  });
});
