"use client";

import React, { useCallback, useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

/** Elements that can hold focus inside the dialog, for the focus trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Rendered as the dialog's heading and wired to `aria-labelledby`. */
  title: string;
  /** Optional supporting line under the title; wired to `aria-describedby`. */
  description?: string;
  children: React.ReactNode;
  /** Footer actions, right-aligned. */
  footer?: React.ReactNode;
  /** Tailwind max-width class for the panel. */
  size?: "sm" | "md" | "lg";
  /** Position the overlay inside the nearest positioned ancestor rather than
   *  the viewport — some screens render the dialog within their own pane. */
  contained?: boolean;
}

const SIZES = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" } as const;

/**
 * Accessible dialog.
 *
 * Every modal surface in the app was previously a bare `fixed inset-0` div:
 * no `role="dialog"`, no `aria-modal`, no Escape handling, no focus trap, no
 * backdrop dismissal and no scroll lock, so screen reader users were never
 * told a dialog had opened and keyboard users could tab straight out of it
 * into the page behind.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  contained = false,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  // Whatever had focus before we opened, so it can be handed back on close.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Wrap focus at both ends so Tab never escapes the dialog.
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  // Move focus in on open, restore it on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    (focusable?.[0] ?? panelRef.current)?.focus();
    return () => previouslyFocused.current?.focus?.();
  }, [open]);

  // Lock body scroll so the page behind does not move under the dialog.
  useEffect(() => {
    if (!open || contained) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, contained]);

  if (!open) return null;

  return (
    <div
      className={`${contained ? "absolute" : "fixed"} inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4`}
      // Dismiss on backdrop click, but only when the click started on the
      // backdrop itself — dragging a text selection out of the panel and
      // releasing here should not close the dialog.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`w-full ${SIZES[size]} rounded-2xl shadow-2xl outline-none max-h-[90dvh] overflow-y-auto`}
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2
              id={titleId}
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              title="Close"
              className="hit-area-touch w-9 h-9 -mr-2 -mt-1 shrink-0 rounded-lg flex items-center justify-center transition-colors hover:bg-theme-secondary"
              style={{ color: "var(--text-muted)" }}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          {description && (
            <p
              id={descriptionId}
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="px-6 pb-6">{children}</div>

        {footer && (
          <div
            className="px-6 py-4 flex items-center justify-end gap-3"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
