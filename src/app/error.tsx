"use client";

import React, { useEffect, useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

/**
 * Route-level error boundary. Without one, any thrown render error unmounted
 * the whole tree and left the user on Next's default error screen — no theme,
 * no way back into the app.
 *
 * Catches errors from every route below it. `global-error.tsx` is the last
 * resort for failures in the root layout itself, which this cannot reach.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    // No error reporting service in this frontend-only build; the console is
    // the only sink. Swap for a real reporter when one exists.
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div
      className="min-h-dvh flex items-center justify-center font-sans px-6"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="text-center max-w-lg">
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <AlertTriangle
            className="w-6 h-6"
            style={{ color: "var(--danger)" }}
            aria-hidden="true"
          />
        </div>

        <h1 className="text-h2 mb-2" style={{ color: "var(--text-primary)" }}>
          Something went wrong
        </h1>

        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          This screen hit an unexpected error. Trying again usually clears it.
        </p>

        {error.digest && (
          <p className="text-xs mb-8 font-mono" style={{ color: "var(--text-muted)" }}>
            Reference: {error.digest}
          </p>
        )}

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setRetrying(true);
              reset();
            }}
            disabled={retrying}
            aria-busy={retrying || undefined}
            className="flex items-center gap-2 px-5 py-2.5 min-h-touch rounded-xl text-sm font-semibold text-theme-on-brand transition-colors disabled:opacity-70 disabled:cursor-progress"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {retrying ? (
              <Spinner size="small" className="size-4" />
            ) : (
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            )}
            {retrying ? "Retrying…" : "Try again"}
          </button>
          <NavLink
            href="/workspace"
            className="px-5 py-2.5 min-h-touch rounded-xl text-sm font-semibold transition-colors flex items-center"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            Workspace home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
