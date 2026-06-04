// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownSourceEditor } from "../src/index.js";

describe("MarkdownSourceEditor touch selection", () => {
  it("keeps the textarea selectable for native touch range expansion", () => {
    render(<MarkdownSourceEditor defaultValue="alpha beta gamma" />);
    const editor = screen.getByTestId("markdown-source-editor") as HTMLTextAreaElement;
    expect(editor).toHaveAttribute("data-touch-selection", "native");
    expect(editor.className).toContain("mw-editor-textarea");
  });
});
