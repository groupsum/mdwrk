import React from "react";

export interface LineHeightPreset {
  readonly id: string;
  readonly label: string;
  readonly value: number;
}

export interface LineHeightRailProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly label?: string;
  readonly description?: string;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly presets?: readonly LineHeightPreset[];
  readonly disabled?: boolean;
}

const DEFAULT_PRESETS: readonly LineHeightPreset[] = [
  { id: "compact", label: "Compact", value: 1.35 },
  { id: "default", label: "Default", value: 1.5 },
  { id: "relaxed", label: "Relaxed", value: 1.7 },
] as const;

const formatDisplayValue = (value: number): string => `${value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}rem`;

export const LineHeightRail: React.FC<LineHeightRailProps> = ({
  value,
  onChange,
  label = "Line height",
  description = "Studio-owned typography control for synchronizing editor and preview rhythm.",
  min = 1.2,
  max = 2,
  step = 0.05,
  presets = DEFAULT_PRESETS,
  disabled = false,
}) => {
  return (
    <div
      className="theme-line-height-rail"
      style={{
        display: "grid",
        gap: 10,
        minWidth: 240,
        padding: 12,
        borderRadius: 10,
        border: "1px solid var(--border-primary, var(--border-color))",
        background: "var(--surface-elevated, var(--bg-panel))",
      }}
    >
      <div style={{ display: "grid", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <strong style={{ fontSize: 12 }}>{label}</strong>
          <span style={{ fontSize: 11, color: "var(--fg-secondary)" }}>{formatDisplayValue(value)}</span>
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "var(--fg-muted)", lineHeight: 1.4 }}>{description}</p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {presets.map((preset) => {
          const active = Math.abs(preset.value - value) < 0.001;
          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(preset.value)}
              style={{
                minHeight: 28,
                padding: "0 10px",
                borderRadius: 999,
                border: "1px solid var(--border-primary, var(--border-color))",
                background: active
                  ? "color-mix(in srgb, var(--accent) 82%, var(--bg-panel))"
                  : "color-mix(in srgb, var(--bg-panel) 78%, transparent)",
                color: active ? "#fff" : "var(--fg-primary)",
                fontSize: 11,
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
