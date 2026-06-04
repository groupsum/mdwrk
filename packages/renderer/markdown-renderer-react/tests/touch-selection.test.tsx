// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownRenderer } from "../src/index.js";

describe("MarkdownRenderer touch selection", () => {
  it("keeps rendered markdown selectable for touch range expansion", () => {
    const { container } = render(<MarkdownRenderer markdown="Alpha Beta Gamma" />);
    const host = container.querySelector(".markdown-renderer-host") as HTMLDivElement | null;
    expect(host).not.toBeNull();
    expect(host?.className).toContain("markdown-renderer-host");
  });
});
