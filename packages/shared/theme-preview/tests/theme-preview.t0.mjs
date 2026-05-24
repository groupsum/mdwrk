import assert from "node:assert/strict";
import { createPreviewStyleSheet } from "../dist/index.js";

const preview = createPreviewStyleSheet({ accent: "#22c55e", "bg-panel": "#0f172a" });
assert.ok(preview.hostCssText.includes("--accent: #22c55e;"));
assert.ok(preview.bridgeCssText.renderer.includes("--mw-accent: #22c55e;"));

console.log("theme-preview t0: ok");
