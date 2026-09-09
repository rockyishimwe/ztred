"use client";

import React, { useCallback, useRef, useState } from "react";
import { Image as ImageIcon, PencilLine, Save, Trash2, Upload } from "lucide-react";

interface Stroke {
  id: number;
  points: { x: number; y: number }[];
}

const STROKE_COLORS = ["var(--primary)", "#22c55e", "#f59e0b", "#ef4444"];

/**
 * Sketch surface (local-only stand-in for tldraw/Excalidraw).
 *
 * The previous version wrote a canvas into the DOM with `innerHTML` and a
 * hardcoded `background: white`, which meant a glaring white slab in dark mode
 * and a "Click to start drawing" prompt that did nothing. This draws real
 * strokes into an SVG and uses theme variables, so it follows light/dark.
 */
export const Whiteboard: React.FC<{ title?: string }> = ({
  title = "Sprint Planning Whiteboard",
}) => {
  const surfaceRef = useRef<SVGSVGElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const nextId = useRef(0);

  const pointFrom = (e: React.PointerEvent) => {
    const box = surfaceRef.current?.getBoundingClientRect();
    if (!box) return { x: 0, y: 0 };
    return { x: e.clientX - box.left, y: e.clientY - box.top };
  };

  const startStroke = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrawing(true);
    const box = e.currentTarget.getBoundingClientRect();
    setStrokes((prev) => [
      ...prev,
      {
        id: nextId.current++,
        points: [{ x: e.clientX - box.left, y: e.clientY - box.top }],
      },
    ]);
  }, []);

  const extendStroke = useCallback(
    (e: React.PointerEvent) => {
      if (!drawing) return;
      const point = pointFrom(e);
      setStrokes((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(0, -1),
          { ...last, points: [...last.points, point] },
        ];
      });
    },
    [drawing]
  );

  const endStroke = useCallback(() => setDrawing(false), []);

  const toPath = (points: { x: number; y: number }[]) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-theme-primary">{title}</h1>
          <div className="flex items-center space-x-2 text-xs text-theme-muted">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true" />
              <span>2 collaborators</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Pen colour */}
          <button
            type="button"
            onClick={() => setColorIndex((i) => (i + 1) % STROKE_COLORS.length)}
            aria-label="Change pen colour"
            title="Change pen colour"
            className="p-2 rounded hover:bg-theme-secondary flex items-center gap-1.5"
          >
            <PencilLine className="w-5 h-5 text-theme-secondary" aria-hidden="true" />
            <span
              className="w-3 h-3 rounded-full border border-theme"
              style={{ backgroundColor: STROKE_COLORS[colorIndex] }}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => setStrokes([])}
            disabled={strokes.length === 0}
            aria-label="Clear board"
            title="Clear board"
            className="p-2 rounded hover:bg-theme-secondary disabled:opacity-40"
          >
            <Trash2 className="w-5 h-5 text-theme-secondary" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Upload file"
            title="Upload file"
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <Upload className="w-5 h-5 text-theme-secondary" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Insert image"
            title="Insert image"
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <ImageIcon className="w-5 h-5 text-theme-secondary" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Save board"
            title="Save board"
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <Save className="w-5 h-5 text-theme-secondary" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div
          className="relative w-full h-full rounded-lg border border-theme overflow-hidden"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <svg
            ref={surfaceRef}
            onPointerDown={startStroke}
            onPointerMove={extendStroke}
            onPointerUp={endStroke}
            onPointerLeave={endStroke}
            className="w-full h-full touch-none cursor-crosshair"
            role="application"
            aria-label="Drawing surface"
          >
            {strokes.map((stroke) => (
              <path
                key={stroke.id}
                d={toPath(stroke.points)}
                fill="none"
                stroke={STROKE_COLORS[colorIndex]}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          {strokes.length === 0 && (
            <p
              className="absolute inset-0 flex items-center justify-center text-sm pointer-events-none"
              style={{ color: "var(--text-muted)" }}
            >
              Drag to start drawing
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
