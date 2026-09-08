"use client";

import React from "react";
import {
  LOGO_SWOOSH_PATH,
  LOGO_SWOOSH_TRANSFORM,
  LOGO_VIEW_BOX,
  LOGO_Z_PATH,
  LOGO_Z_TRANSFORM,
} from "@/lib/accent";

interface ZtredLogoProps extends React.SVGProps<SVGSVGElement> {
  /** Accessible name. Omit for a decorative mark sitting next to the wordmark. */
  title?: string;
}

/**
 * The Ztred mark, drawn as vectors so it follows the workspace accent color.
 *
 * The static /ztred-logo.svg paints the Z as a clipped raster image and cannot
 * be recolored; this renders the same two outlines against the accent scale.
 */
export const ZtredLogo: React.FC<ZtredLogoProps> = ({
  title,
  className,
  ...props
}) => (
  <svg
    viewBox={LOGO_VIEW_BOX}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    focusable="false"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <g transform={LOGO_SWOOSH_TRANSFORM}>
      <path d={LOGO_SWOOSH_PATH} fill="rgb(var(--accent-800))" fillRule="nonzero" />
    </g>
    <g transform={LOGO_Z_TRANSFORM}>
      <path d={LOGO_Z_PATH} fill="rgb(var(--accent-600))" fillRule="nonzero" />
    </g>
  </svg>
);
