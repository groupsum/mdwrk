import assert from "node:assert/strict";
import { validateThemeTokens, validateThemeBridges } from "../dist/index.js";

assert.equal(validateThemeTokens({ tokens: { accent: "#2563eb" } }).ok, true);
assert.equal(validateThemeBridges().ok, true);

console.log("theme-diagnostics t0: ok");
