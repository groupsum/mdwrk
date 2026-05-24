export interface ThemeDiagnostic {
  readonly code: string;
  readonly severity: "error" | "warning" | "info";
  readonly message: string;
  readonly target?: string;
}

export interface ThemeDiagnosticsReport {
  readonly ok: boolean;
  readonly diagnostics: readonly ThemeDiagnostic[];
}

export interface ContrastCheckResult {
  readonly ratio: number;
  readonly passesAa: boolean;
}

export interface ThemeContrastPairDiagnostic {
  readonly foregroundToken: string;
  readonly backgroundToken: string;
  readonly ratio: number;
  readonly passesAa: boolean;
}
