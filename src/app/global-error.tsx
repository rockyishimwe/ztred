"use client";

import React from "react";

/**
 * Last-resort boundary for errors thrown by the root layout itself.
 *
 * It replaces the root layout when it renders, so it must ship its own <html>
 * and <body> — and it cannot rely on globals.css variables or the pre-paint
 * theme script having run. Everything here is therefore inline and literal on
 * purpose; do not "clean it up" into theme tokens.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f19",
          color: "#f1f5f9",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "32rem", padding: "0 1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Ztred failed to start
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginBottom: "2rem" }}>
            The application shell hit an unrecoverable error.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                fontFamily: "monospace",
                marginBottom: "2rem",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              backgroundColor: "#5f3dff",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.75rem 1.5rem",
              minHeight: "44px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
