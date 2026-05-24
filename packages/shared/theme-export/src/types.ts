import type { ThemeBridgeTarget } from "@mdwrk/theme-contract/bridges";
import type { ThemePreset } from "@mdwrk/theme-contract/themes";

export interface ThemeExportManifest {
  readonly id: string;
  readonly name: string;
  readonly contract: string;
  readonly targets: readonly ThemeBridgeTarget[];
  readonly files?: readonly string[];
}

export interface ThemePackageArtifactFile {
  readonly path: string;
  readonly content: string;
  readonly mimeType: string;
}

export interface ThemePackageArtifact {
  readonly packageName: string;
  readonly files: readonly ThemePackageArtifactFile[];
}

export interface ThemeExportBundle {
  readonly preset: ThemePreset;
  readonly manifest: ThemeExportManifest;
  readonly files: Readonly<Record<string, string>>;
  readonly packageArtifact?: ThemePackageArtifact;
}
