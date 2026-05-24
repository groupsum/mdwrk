import assert from "node:assert/strict";
import {
  applyThemeDraftToStyleDeclaration,
  createPreviewBridgeVariables,
  createPreviewStyleSheet,
  DEFAULT_THEME_PREVIEW_FIXTURES,
} from "../dist/index.js";

const preview = createPreviewStyleSheet({ accent: "#22c55e", "bg-panel": "#0f172a" });
assert.ok(preview.cssText.includes("--accent: #22c55e;"));
assert.ok(preview.bridgeCssText.renderer.includes("--mw-accent: #22c55e;"));

const bridgeVariables = createPreviewBridgeVariables("editor", { "editor-padding": "32px" });
assert.equal(bridgeVariables["--mwe-editor-padding"], "32px");

const applied = new Map();
applyThemeDraftToStyleDeclaration(
  {
    setProperty(name, value) {
      applied.set(name, value);
    },
  },
  { accent: "#f97316" },
);
assert.equal(applied.get("--accent"), "#f97316");
assert.equal(DEFAULT_THEME_PREVIEW_FIXTURES.length > 0, true);

console.log("theme-preview smoke: ok");
