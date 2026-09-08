"use client";

import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface LoadingScreenProps {
  /** Short description of what is loading; also announced to screen readers. */
  label?: string;
  /** `full` fills the viewport (route-group shells), `inline` fills its parent. */
  variant?: "full" | "inline";
}

/**
 * Route-level loading state, rendered by the `loading.tsx` files in src/app.
 *
 * The spinner inherits `currentColor`, so setting the text color on the
 * wrapper is all that is needed to keep it on-theme in light and dark.
 */
export function LoadingScreen({
  label = "Loading",
  variant = "full",
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-1 flex-col items-center justify-center gap-3 ${
        variant === "full" ? "min-h-screen w-full" : "min-h-[240px] w-full"
      }`}
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-muted)" }}
    >
      <Spinner size={variant === "full" ? "large" : "medium"} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
