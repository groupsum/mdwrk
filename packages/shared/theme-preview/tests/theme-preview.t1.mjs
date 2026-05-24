import assert from "node:assert/strict";
import { applyThemeDraftToStyleDeclaration, mountThemePreviewStyleElement } from "../dist/index.js";

const applied = new Map();
applyThemeDraftToStyleDeclaration({ setProperty(name, value) { applied.set(name, value); } }, { accent: "#9333ea" });
assert.equal(applied.get("--accent"), "#9333ea");
assert.equal(applied.get("--mw-accent"), "#9333ea");

const styleElements = [];
const documentLike = {
  head: { appendChild(node) { styleElements.push(node); } },
  getElementById() { return null; },
  createElement() { return { id: "", textContent: "" }; },
};
const style = mountThemePreviewStyleElement(documentLike, { accent: "#ef4444" });
assert.equal(style.id, "mdwrk-theme-preview");
assert.ok(style.textContent.includes("--accent: #ef4444;"));

console.log("theme-preview t1: ok");
