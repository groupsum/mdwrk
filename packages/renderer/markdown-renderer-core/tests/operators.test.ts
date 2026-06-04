import { describe, expect, it } from "vitest";
import {
  exportMarkdownSource,
  exportMarkdownToHtmlDocument,
  exportMarkdownToPdfDocument,
  getMarkdownBlockMap,
  listMarkdownOperators,
  loadMarkdownDocument,
  parseMarkdownToAst,
} from "../src/index.js";

describe("markdown renderer operators", () => {
  it("loads parsed markdown documents through the explicit load operator", () => {
    const loaded = loadMarkdownDocument("---\ntitle: Test\n---\n\n# Alpha");
    expect(loaded.metadata.title).toBe("Test");
  });

  it("derives a block map from markdown or AST input", () => {
    const fromMarkdown = getMarkdownBlockMap("# Alpha\n\n- beta");
    const ast = parseMarkdownToAst("# Alpha\n\n- beta");
    const fromAst = getMarkdownBlockMap(ast);
    expect(fromMarkdown[0]?.type).toBe("heading");
    expect(fromAst.some((entry) => entry.type === "list")).toBe(true);
  });

  it("exports markdown, html, and pdf artifact contracts", () => {
    expect(exportMarkdownSource("# Alpha")).toEqual({
      format: "markdown",
      markdown: "# Alpha",
      applicability: ["cm", "gfm", "cfm"],
    });

    const html = exportMarkdownToHtmlDocument("# Alpha", { title: "Alpha" });
    expect(html.format).toBe("html");
    expect(html.html).toContain("<!DOCTYPE html>");

    const pdf = exportMarkdownToPdfDocument("# Alpha", {
      title: "Alpha",
      stylesheets: [":root { --pdf: 1; }"],
    });
    expect(pdf.format).toBe("pdf");
    expect(pdf.html).toContain("mw-pdf-document");
    expect(pdf.bridgeStyles).toContain(":root { --pdf: 1; }");
  });

  it("lists operator descriptors with applicability metadata", () => {
    const operators = listMarkdownOperators();
    expect(operators.find((operator) => operator.id === "load")).toMatchObject({ scope: "shared" });
    expect(operators.find((operator) => operator.id === "export-pdf")?.applicability).toContain("mdwrk-operator");
  });

  it("returns an empty block map for an empty document", () => {
    expect(getMarkdownBlockMap("")).toEqual([]);
  });
});
