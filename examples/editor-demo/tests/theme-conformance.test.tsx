// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import "@mdwrk/testing/vitest-setup";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("style");
  document.body.removeAttribute("style");
  window.history.replaceState({}, "", "/");
});

describe("editor-demo theme conformance", () => {
  it("applies the dark shell theme to the document background", () => {
    window.history.replaceState({}, "", "/?theme=default-dark");

    render(<App />);

    expect(document.documentElement.style.getPropertyValue("--bg-app")).toBe("#050816");
    expect(document.body.style.backgroundColor).toBe("rgb(5, 8, 22)");
    expect(document.body.style.colorScheme).toBe("dark");
  });

  it("opens the command palette from query state", () => {
    window.history.replaceState({}, "", "/?theme=default-dark&palette=open");

    render(<App />);

    expect(screen.getByRole("dialog", { name: "Editor command palette" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
