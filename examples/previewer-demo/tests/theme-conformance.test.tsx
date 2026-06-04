// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { DEMO_RENDERER_THEMES } from "@mdwrk/core-demo-themes";
import App from "../App";

function getRendererThemeBridgeValue(key: string): string {
  return String(DEMO_RENDERER_THEMES["default-dark"].style[key as keyof typeof DEMO_RENDERER_THEMES["default-dark"]["style"]] ?? "");
}

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("style");
  document.body.removeAttribute("style");
  window.history.replaceState({}, "", "/");
});

describe("previewer-demo theme conformance", () => {
  it("applies the dark shell theme to the document background", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    render(<App />);

    expect(document.documentElement.style.getPropertyValue("--bg-app")).toBe("#050816");
    expect(document.body.style.backgroundColor).toBe("rgb(5, 8, 22)");
    expect(document.body.style.colorScheme).toBe("dark");
  });

  it("matches renderer-basic default dark renderer bridge values", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    const { container } = render(<App />);
    const previewCard = container.querySelector(".preview-card");

    expect(container.querySelector("main style")).toBeNull();
    expect(previewCard).not.toBeNull();
    expect(previewCard?.style.getPropertyValue("--mw-bg-surface")).toBe(getRendererThemeBridgeValue("--mw-bg-surface"));
    expect(previewCard?.style.getPropertyValue("--mw-fg-primary")).toBe(getRendererThemeBridgeValue("--mw-fg-primary"));
    expect(previewCard?.style.getPropertyValue("--mw-accent")).toBe(getRendererThemeBridgeValue("--mw-accent"));
    expect(previewCard?.style.getPropertyValue("--mw-code-block-bg")).toBe(getRendererThemeBridgeValue("--mw-code-block-bg"));
  });
});
