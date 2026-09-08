"use client";

import React, { useState } from "react";
import { useUIStore, type ThemePreference } from "@/stores/uiStore";
import { ACCENT_PRESETS, normalizeHex } from "@/lib/accent";
import { Monitor, Palette, Type, Check } from "lucide-react";

const FONT_SIZES = [
  { label: "Small", value: "13px" },
  { label: "Default", value: "14px" },
  { label: "Large", value: "16px" },
];

const THEME_OPTIONS: {
  id: ThemePreference;
  label: string;
  swatch: { bg: string; border: string; block: string };
}[] = [
  { id: "dark", label: "Dark", swatch: { bg: "#0b0f19", border: "#1e293b", block: "#1e293b" } },
  { id: "light", label: "Light", swatch: { bg: "#f8fafc", border: "#e2e8f0", block: "#e2e8f0" } },
  { id: "system", label: "System", swatch: { bg: "#0b0f19", border: "#64748b", block: "#475569" } },
];

export default function AppearanceSettingsPage() {
  const theme = useUIStore((s) => s.theme);
  const themePreference = useUIStore((s) => s.themePreference);
  const setThemePreference = useUIStore((s) => s.setThemePreference);
  const accentColor = useUIStore((s) => s.accentColor);
  const setAccentColor = useUIStore((s) => s.setAccentColor);
  const [fontSize, setFontSize] = useState("Default");

  const activePreset = ACCENT_PRESETS.find(
    (preset) => preset.value.toLowerCase() === accentColor.toLowerCase()
  );

  return (
    <div className="max-w-2xl space-y-6">
      {/* ═══ Theme Section ═══ */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Monitor className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Theme
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {THEME_OPTIONS.map((option) => {
            const isSelected = themePreference === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setThemePreference(option.id)}
                aria-pressed={isSelected}
                className="relative rounded-xl p-3 text-left transition-all"
                style={{
                  border: `2px solid ${isSelected ? "var(--primary)" : "var(--border-color)"}`,
                  backgroundColor: "var(--bg-input)",
                }}
              >
                <div
                  className="w-full h-24 rounded-lg mb-3 overflow-hidden"
                  style={{
                    backgroundColor: option.swatch.bg,
                    border: `1px solid ${option.swatch.border}`,
                    // The System swatch is split down the middle to show it tracks the OS.
                    backgroundImage:
                      option.id === "system"
                        ? "linear-gradient(to right, #0b0f19 50%, #f8fafc 50%)"
                        : undefined,
                  }}
                >
                  <div className="p-3 space-y-2">
                    <div className="w-16 h-2 rounded" style={{ backgroundColor: option.swatch.block }} />
                    <div className="w-12 h-2 rounded" style={{ backgroundColor: option.swatch.block }} />
                    <div className="flex gap-2 mt-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: option.swatch.block }} />
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: option.swatch.block }} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {themePreference === "system" && (
          <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Following your device setting — currently {theme}.
          </p>
        )}
      </div>

      {/* ═══ Accent Color Section ═══ */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5" style={{ color: "var(--primary)" }} />
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Accent color
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--primary)" }}
            />
            <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              {activePreset ? activePreset.name : accentColor.toUpperCase()}
            </span>
          </div>
        </div>
        <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
          Applies everywhere — buttons, active navigation, focus states, the Ztred
          logo and the browser tab icon.
        </p>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {ACCENT_PRESETS.map((preset) => {
            const isSelected = preset.value.toLowerCase() === accentColor.toLowerCase();
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => setAccentColor(preset.value)}
                title={preset.name}
                aria-label={preset.name}
                aria-pressed={isSelected}
                className="relative w-full aspect-square rounded-xl transition-all hover:scale-110"
                style={{ backgroundColor: preset.value }}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white drop-shadow-lg" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom hex — the native picker writes through on every change. */}
        <label
          className="w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer"
          style={{ border: "1px solid var(--border-color)", backgroundColor: "var(--bg-input)" }}
        >
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            <Palette className="w-5 h-5 text-white drop-shadow" />
          </span>
          <span className="text-left flex-1 min-w-0">
            <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Custom color
            </span>
            <span className="block text-xs" style={{ color: "var(--text-muted)" }}>
              Use your own brand hex value
            </span>
          </span>
          <input
            type="color"
            value={accentColor}
            onChange={(event) => setAccentColor(event.target.value)}
            className="sr-only"
            aria-label="Custom accent color"
          />
          <input
            type="text"
            value={accentColor.toUpperCase()}
            onChange={(event) => {
              // Only commit once the typed value is a complete, valid hex.
              if (normalizeHex(event.target.value)) setAccentColor(event.target.value);
            }}
            spellCheck={false}
            className="input-theme w-28 shrink-0 px-3 py-2 text-sm font-mono uppercase"
            aria-label="Accent color hex value"
            onClick={(event) => event.stopPropagation()}
          />
        </label>
      </div>

      {/* ═══ Message Font Size Section ═══ */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Type className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Message font size
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {FONT_SIZES.map((size) => (
            <button
              key={size.label}
              onClick={() => setFontSize(size.label)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: fontSize === size.label ? "var(--primary)" : "var(--bg-input)",
                border: `1px solid ${fontSize === size.label ? "var(--primary)" : "var(--border-color)"}`,
                color: fontSize === size.label ? "var(--on-primary)" : "var(--text-secondary)",
              }}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
