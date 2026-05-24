import assert from "node:assert/strict";
import { checkContrast, validateThemeContrastPairs, validateThemeTokens } from "../dist/index.js";

assert.equal(checkContrast("#ffffff", "#000000").passesAa, true);
const contrast = validateThemeContrastPairs({ tokens: { "fg-primary": "#111111", "fg-secondary": "#222222", "bg-panel": "#111111" } });
assert.equal(contrast.ok, false);

const invalid = validateThemeTokens({ tokens: { accent: "", unknown: "#fff" } });
assert.ok(invalid.diagnostics.some((entry) => entry.code === "blank-token-value"));
assert.ok(invalid.diagnostics.some((entry) => entry.code === "unknown-token"));

console.log("theme-diagnostics t2: ok");
