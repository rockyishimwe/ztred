"use client";

import React from "react";
import { Accessibility, Monitor, Palette } from "lucide-react";
import { useUIStore, type ThemePreference } from "@/stores/uiStore";
import { ACCENT_PRESETS } from "@/lib/accent";

const THEME_CHOICES: { id: ThemePreference; label: string; hint: string }[] = [
  { id: "light", label: "Light", hint: "Always use the light palette" },
  { id: "dark", label: "Dark", hint: "Always use the dark palette" },
  { id: "system", label: "System", hint: "Follow your device setting" },
];

const ACCESSIBILITY_OPTIONS = [
  { id: "reduce-motion", label: "Reduce motion", hint: "Minimize transitions and animations", enabled: true },
  { id: "high-contrast", label: "High contrast mode", hint: "Increase separation between surfaces", enabled: true },
  { id: "screen-reader", label: "Screen reader optimizations", hint: "Extra labels and live regions", enabled: false },
  { id: "keyboard-nav", label: "Keyboard navigation enhancements", hint: "Expanded focus rings and shortcuts", enabled: true },
];

export default function AppearanceSettingsPage() {
  const theme = useUIStore((s) => s.theme);
  const themePreference = useUIStore((s) => s.themePreference);
  const setThemePreference = useUIStore((s) => s.setThemePreference);
  const accentColor = useUIStore((s) => s.accentColor);
  const setAccentColor = useUIStore((s) => s.setAccentColor);

  return (
    <div className="settings-page">
      <section className="settings-card">
        <div className="flex items-center gap-2 mb-5">
          <Monitor className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Theme</h2>
        </div>

        <fieldset className="space-y-3">
          <legend className="sr-only">Theme preference</legend>
          {THEME_CHOICES.map((choice) => (
            <label
              key={choice.id}
              className="settings-row flex items-center gap-3 p-3 cursor-pointer transition-colors"
              style={
                themePreference === choice.id
                  ? { borderColor: "var(--primary)" }
                  : undefined
              }
            >
              <input
                type="radio"
                name="theme"
                value={choice.id}
                checked={themePreference === choice.id}
                onChange={() => setThemePreference(choice.id)}
                className="control-theme h-4 w-4 shrink-0"
              />
              <span>
                <span className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {choice.label}
                </span>
                <span className="form-hint">
                  {choice.id === "system" && themePreference === "system"
                    ? `Following your device setting — currently ${theme}.`
                    : choice.hint}
                </span>
              </span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="settings-card">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Accent color</h2>
        </div>
        <p className="form-hint mb-4">
          Applies everywhere — buttons, active navigation, focus states, the Ztred
          logo and the browser tab icon.
        </p>
        <div className="flex flex-wrap gap-2">
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
                className="w-9 h-9 rounded-xl transition-transform hover:scale-110"
                style={{
                  backgroundColor: preset.value,
                  outline: isSelected ? "2px solid var(--text-primary)" : "none",
                  outlineOffset: "2px",
                }}
              />
            );
          })}
        </div>
      </section>

      <section className="settings-card">
        <div className="flex items-center gap-2 mb-5">
          <Accessibility className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Accessibility</h2>
        </div>

        <div className="space-y-3">
          {ACCESSIBILITY_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="settings-row flex items-center gap-3 p-3 cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked={option.enabled}
                className="control-theme h-4 w-4 shrink-0"
              />
              <span>
                <span className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {option.label}
                </span>
                <span className="form-hint">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
