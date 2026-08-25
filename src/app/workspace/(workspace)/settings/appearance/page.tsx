"use client";

import React, { useState } from "react";
import { useUIStore } from "@/stores/uiStore";
import { Monitor, Palette, Type, Check } from "lucide-react";

const ACCENT_COLORS = [
  // Row 1
  { name: "Violet", value: "#8b5cf6", bg: "bg-violet-500" },
  { name: "Blue", value: "#6366f1", bg: "bg-indigo-500" },
  { name: "Indigo", value: "#4f46e5", bg: "bg-indigo-600" },
  { name: "Cyan", value: "#06b6d4", bg: "bg-cyan-500" },
  { name: "Blue", value: "#3b82f6", bg: "bg-blue-500" },
  { name: "Teal", value: "#14b8a6", bg: "bg-teal-500" },
  { name: "Green", value: "#22c55e", bg: "bg-green-500" },
  // Row 2
  { name: "Lime", value: "#84cc16", bg: "bg-lime-500" },
  { name: "Yellow", value: "#eab308", bg: "bg-yellow-500" },
  { name: "Orange", value: "#f97316", bg: "bg-orange-500" },
  { name: "Pink", value: "#ec4899", bg: "bg-pink-500" },
  { name: "Red", value: "#ef4444", bg: "bg-red-500" },
  { name: "Rose", value: "#f43f5e", bg: "bg-rose-500" },
  { name: "Magenta", value: "#d946ef", bg: "bg-fuchsia-500" },
  // Row 3
  { name: "Purple", value: "#a855f7", bg: "bg-purple-500" },
  { name: "Slate", value: "#64748b", bg: "bg-slate-500" },
  { name: "Gray", value: "#6b7280", bg: "bg-gray-500" },
  { name: "Zinc", value: "#71717a", bg: "bg-zinc-500" },
  { name: "Cyan Light", value: "#22d3ee", bg: "bg-cyan-400" },
  { name: "Teal Light", value: "#2dd4bf", bg: "bg-teal-400" },
  { name: "Amber", value: "#f59e0b", bg: "bg-amber-500" },
  // Row 4
  { name: "Orange Light", value: "#fb923c", bg: "bg-orange-400" },
];

const FONT_SIZES = [
  { label: "Small", value: "13px" },
  { label: "Default", value: "14px" },
  { label: "Large", value: "16px" },
];

export default function AppearanceSettingsPage() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const [selectedColor, setSelectedColor] = useState("Violet");
  const [fontSize, setFontSize] = useState("Default");

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
        <div className="grid grid-cols-2 gap-4">
          {/* Dark Theme Card */}
          <button
            onClick={() => {
              if (theme !== "dark") toggleTheme();
            }}
            className="relative rounded-xl p-3 text-left transition-all"
            style={{
              border: `2px solid ${theme === "dark" ? "var(--primary)" : "var(--border-color)"}`,
              backgroundColor: "var(--bg-input)",
            }}
          >
            <div
              className="w-full h-24 rounded-lg mb-3"
              style={{
                backgroundColor: "#0b0f19",
                border: "1px solid #1e293b",
              }}
            >
              <div className="p-3 space-y-2">
                <div className="w-16 h-2 rounded" style={{ backgroundColor: "#1e293b" }} />
                <div className="w-12 h-2 rounded" style={{ backgroundColor: "#1e293b" }} />
                <div className="flex gap-2 mt-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "#1e293b" }} />
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "#1e293b" }} />
                </div>
              </div>
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              dark
            </span>
          </button>

          {/* Light Theme Card */}
          <button
            onClick={() => {
              if (theme !== "light") toggleTheme();
            }}
            className="relative rounded-xl p-3 text-left transition-all"
            style={{
              border: `2px solid ${theme === "light" ? "var(--primary)" : "var(--border-color)"}`,
              backgroundColor: "var(--bg-input)",
            }}
          >
            <div
              className="w-full h-24 rounded-lg mb-3"
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div className="p-3 space-y-2">
                <div className="w-16 h-2 rounded" style={{ backgroundColor: "#e2e8f0" }} />
                <div className="w-12 h-2 rounded" style={{ backgroundColor: "#e2e8f0" }} />
                <div className="flex gap-2 mt-2">
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "#e2e8f0" }} />
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: "#e2e8f0" }} />
                </div>
              </div>
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              light
            </span>
          </button>
        </div>
      </div>

      {/* ═══ Accent Color Section ═══ */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Accent color
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              {selectedColor}
            </span>
          </div>
        </div>
        <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
          Choose a color family for buttons, active navigation, focus states, and workspace highlights.
        </p>

        {/* Color Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className="relative w-full aspect-square rounded-xl transition-all hover:scale-110"
              style={{ backgroundColor: color.value }}
            >
              {selectedColor === color.name && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Custom Color */}
        <button
          className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
          style={{ border: "1px solid var(--border-color)", backgroundColor: "var(--bg-input)" }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Custom color
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Use your own brand hex value
            </p>
          </div>
        </button>
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
                color: fontSize === size.label ? "#ffffff" : "var(--text-secondary)",
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
