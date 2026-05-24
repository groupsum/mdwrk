import type { ThemeDiagnosticsReport } from "./types.js";

export function formatThemeDiagnostics(report: ThemeDiagnosticsReport): string {
  if (report.diagnostics.length === 0) {
    return "No diagnostics.";
  }

  return report.diagnostics
    .map((diagnostic) => `[${diagnostic.severity}] ${diagnostic.code}: ${diagnostic.message}`)
    .join("\n");
}
