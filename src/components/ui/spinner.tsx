import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  /**
   * Announced to screen readers. Pass `null` when the spinner sits inside a
   * control that already announces its own busy state (an `aria-busy` button,
   * a `NavLink` swapping its icon) — a second announcement is just noise.
   */
  label?: string | null;
}

export function Spinner({
  size,
  show,
  children,
  className,
  label = "Loading",
}: SpinnerContentProps) {
  return (
    <span
      className={spinnerVariants({ show })}
      // The spinner is the app's only loading affordance; without a live
      // region its appearance was silent for screen reader users.
      role={label ? "status" : undefined}
      aria-live={label ? "polite" : undefined}
    >
      <Loader2
        className={cn(loaderVariants({ size }), className)}
        aria-hidden="true"
      />
      {label && <span className="sr-only">{label}</span>}
      {children}
    </span>
  );
}
