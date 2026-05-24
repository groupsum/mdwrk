import type { ContrastCheckResult } from "./types.js";

function normalizeHexColor(value: string): string {
  const normalized = value.trim().replace(/^#/, "");
  if (normalized.length === 3) {
    return normalized.split("").map((char) => `${char}${char}`).join("");
  }
  if (normalized.length !== 6) {
    throw new Error(`Unsupported color format: ${value}`);
  }
  return normalized;
}

function channelToLinear(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hexColor: string): number {
  const normalized = normalizeHexColor(hexColor);
  const channels = normalized.match(/.{2}/g)?.map((segment) => Number.parseInt(segment, 16)) ?? [];
  const [red, green, blue] = channels.map(channelToLinear);
  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

export function checkContrast(foreground: string, background: string): ContrastCheckResult {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio,
    passesAa: ratio >= 4.5,
  };
}

export function supportsHexContrast(value: string): boolean {
  return /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}
