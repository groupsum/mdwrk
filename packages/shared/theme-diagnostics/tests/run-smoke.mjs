import assert from "node:assert/strict";
import {
  checkContrast,
  collectThemeDiagnostics,
  formatThemeDiagnostics,
  validateThemeBridges,
  validateThemeTokens,
} from "../dist/index.js";
import { createEmptyThemePreset } from "@mdwrk/theme-contract/themes";

const preset = createEmptyThemePreset("default", "Default");
const tokenReport = validateThemeTokens(preset);
assert.equal(tokenReport.ok, true);

const bridgeReport = validateThemeBridges();
assert.equal(bridgeReport.ok, true);

const diagnostics = collectThemeDiagnostics({
  ...preset,
  tokens: {
    "not-a-token": "oops",
  },
});
assert.equal(diagnostics.ok, false);
assert.ok(formatThemeDiagnostics(diagnostics).includes("unknown-token"));

const contrast = checkContrast("#ffffff", "#000000");
assert.equal(contrast.passesAa, true);

console.log("theme-diagnostics smoke: ok");
