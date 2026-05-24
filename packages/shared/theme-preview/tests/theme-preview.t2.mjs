import assert from "node:assert/strict";
import { createPreviewStyleSheet, mountThemePreviewStyleElement } from "../dist/index.js";

const preview = createPreviewStyleSheet({ accent: "#84cc16" }, { includeHostVariables: false, targets: ["editor"] });
assert.equal(preview.hostCssText, "");
assert.ok(preview.bridgeCssText.editor.includes("--mwe-accent: #84cc16;"));
assert.equal("renderer" in preview.bridgeCssText, false);

const styleElement = { id: "custom-preview", textContent: "" };
const documentLike = {
  head: { appendChild() {} },
  getElementById() { return styleElement; },
  createElement() { return { id: "", textContent: "" }; },
};
const mounted = mountThemePreviewStyleElement(documentLike, { accent: "#f59e0b" }, { styleElementId: "custom-preview" });
assert.equal(mounted, styleElement);
assert.ok(mounted.textContent.includes("--accent: #f59e0b;"));

console.log("theme-preview t2: ok");
