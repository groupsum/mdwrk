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

describe("ui-tokens-demo theme conformance", () => {
  it("applies the dark shell theme to the document background", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    render(<App />);

    expect(document.documentElement.style.getPropertyValue("--bg-app")).toBe("#050816");
    expect(document.body.style.backgroundColor).toBe("rgb(5, 8, 22)");
    expect(document.body.style.colorScheme).toBe("dark");
  });

  it("uses the shared renderer defaults instead of an inline preview stylesheet", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    const { container } = render(<App />);
    const main = container.querySelector("main");
    const rendererSpecimenCard = container.querySelector(".renderer-specimen-card") as HTMLElement | null;

    expect(main?.querySelector("style")).toBeNull();
    expect(rendererSpecimenCard).not.toBeNull();
    expect(rendererSpecimenCard?.style.getPropertyValue("--mw-bg-surface")).toBe(getRendererThemeBridgeValue("--mw-bg-surface"));
    expect(rendererSpecimenCard?.style.getPropertyValue("--mw-fg-primary")).toBe(getRendererThemeBridgeValue("--mw-fg-primary"));
    expect(rendererSpecimenCard?.style.getPropertyValue("--mw-accent")).toBe(getRendererThemeBridgeValue("--mw-accent"));
  });
});
