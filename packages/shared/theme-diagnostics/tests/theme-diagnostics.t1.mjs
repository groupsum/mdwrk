import assert from "node:assert/strict";
import { collectThemeDiagnostics, formatThemeDiagnostics, validatePresetCoverage } from "../dist/index.js";
import { createEmptyThemePreset } from "@mdwrk/theme-contract/themes";

const preset = createEmptyThemePreset("minimal", "Minimal");
const coverage = validatePresetCoverage(preset);
assert.equal(coverage.ok, false);

const report = collectThemeDiagnostics({ ...preset, tokens: { accent: "#111111", "bg-panel": "#111111", "fg-primary": "#111111" } });
assert.ok(formatThemeDiagnostics(report).length > 0);

console.log("theme-diagnostics t1: ok");
