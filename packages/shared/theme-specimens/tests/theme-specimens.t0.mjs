import assert from "node:assert/strict";
import { MARKDOWN_THEME_SAMPLES, THEME_PREVIEW_SCENARIOS } from "../dist/index.js";

assert.ok(MARKDOWN_THEME_SAMPLES.baseline.includes("# Heading"));
assert.equal(THEME_PREVIEW_SCENARIOS.length >= 2, true);

console.log("theme-specimens t0: ok");
