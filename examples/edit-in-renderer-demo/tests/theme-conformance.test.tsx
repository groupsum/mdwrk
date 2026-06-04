// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("style");
  document.body.removeAttribute("style");
  window.history.replaceState({}, "", "/");
});

describe("edit-in-renderer-demo theme conformance", () => {
  it("applies the dark shell theme to the document background", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    render(<App />);

    expect(document.documentElement.style.getPropertyValue("--bg-app")).toBe("#050816");
    expect(document.body.style.backgroundColor).toBe("rgb(5, 8, 22)");
    expect(document.body.style.colorScheme).toBe("dark");
  });

  it("passes the default dark edit-in-renderer theme variables to the host surface", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    const { container } = render(<App />);
    const host = container.querySelector('[data-testid="markdown-edit-in-renderer"]') as HTMLElement | null;

    expect(host).not.toBeNull();
    expect(host?.style.getPropertyValue("--mwir-bg")).toBe("#0f172a");
    expect(host?.style.getPropertyValue("--mwir-bg-active")).toBe("#111c35");
    expect(host?.style.getPropertyValue("--mwir-accent")).toBe("#f472b6");
  });
});
