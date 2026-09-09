import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Theme-aware palette ────────────────────────────────────────
           Maps to the CSS variables defined in src/styles/globals.css so that
           hover:/focus:/dark: variants and /opacity modifiers work, e.g.
           `bg-theme-card/50`, `hover:bg-theme-sidebar-hover`.

           NOTE: `bg-theme-primary`, `bg-theme-secondary`, `text-theme-primary`
           and `text-theme-secondary` intentionally remain plain CSS classes
           (see globals.css): the same name maps to a different variable
           depending on whether it is used as text or background color, which a
           single palette entry cannot express. Variant support for those few
           names is hand-authored in globals.css.
           ─────────────────────────────────────────────────────────────── */
        theme: 'var(--border-color)',
        'theme-card': 'var(--bg-card)',
        'theme-surface': 'var(--bg-surface)',
        'theme-input': 'var(--bg-input)',
        'theme-elevated': 'var(--surface-elevated)',
        'theme-tinted': 'var(--bg-tinted)',
        'theme-brand': 'rgb(var(--accent-600) / <alpha-value>)',
        'theme-brand-hover': 'rgb(var(--accent-700) / <alpha-value>)',
        /* Readable foreground for text sitting ON an accent-filled surface.
           Flips to dark for light accents (amber, lime) — see isLightColor()
           in src/lib/accent.ts. Distinct from `theme-brand`, which IS the
           accent; the two were previously conflated under one name. */
        'theme-on-brand': 'var(--on-primary)',
        'theme-primary-hover': 'rgb(var(--accent-700) / <alpha-value>)',
        'theme-success': 'var(--success)',
        'theme-warning': 'var(--warning)',
        'theme-danger': 'var(--danger)',
        'theme-hover': 'var(--border-hover)',
        'theme-sidebar-hover': 'var(--sidebar-hover)',
        /* shadcn-compatible aliases. Components pasted from shadcn expect a
           `primary` color to exist; without it `text-primary` / `bg-primary`
           generate no CSS at all and the element renders colorless. Pointed at
           the accent scale so those components follow the workspace accent. */
        primary: {
          DEFAULT: 'rgb(var(--accent-600) / <alpha-value>)',
          foreground: 'var(--on-primary)',
        },
        /* Driven by the user's accent color. Declared as channel triplets so
           opacity modifiers (bg-purple-600/20) still resolve — a bare
           `var(--primary)` string cannot carry an alpha value.
           See src/lib/accent.ts. */
        purple: {
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          200: 'rgb(var(--accent-200) / <alpha-value>)',
          300: 'rgb(var(--accent-300) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
          800: 'rgb(var(--accent-800) / <alpha-value>)',
          900: 'rgb(var(--accent-900) / <alpha-value>)',
          950: 'rgb(var(--accent-950) / <alpha-value>)',
        },
        ztred: {
          dark: "#0b0f19",
          card: "#141824",
          panel: "#111522",
          surface: "#0e121d",
          sidebar: {
            bg: "#19171D",
            hover: "#27242C",
            active: "#1164A3",
            text: "#D1D2D3",
            muted: "#9A9B9E",
            darkBg: "#121016",
          },
          primary: {
            DEFAULT: "rgb(var(--accent-600) / <alpha-value>)",
            dark: "rgb(var(--accent-700) / <alpha-value>)",
            light: "rgb(var(--accent-400) / <alpha-value>)",
            accent: "#007A5A",
            blue: "#1264A3",
          },
          status: {
            online: "#2BAC76",
            away: "#ECB22E",
            dnd: "#E01E5A",
            offline: "#616061",
          },
        },
      },
      fontFamily: {
        sans: [
          "Bricolage Grotesque",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      /* HIG Typography Scale — clear hierarchy from display to micro */
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "800" }],
        h1: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        h2: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }],
        micro: ["0.6875rem", { lineHeight: "1.3", fontWeight: "600" }],
      },
      /* HIG Layout — consistent spacing system */
      spacing: {
        "4.5": "1.125rem",   /* 18px */
        "13": "3.25rem",     /* 52px — touch target */
        "15": "3.75rem",     /* 60px */
        "18": "4.5rem",      /* 72px */
        "22": "5.5rem",      /* 88px */
        "26": "6.5rem",      /* 104px */
        "30": "7.5rem",      /* 120px */
      },
      /* HIG Accessibility — minimum touch target sizes */
      minHeight: {
        "touch": "44px",     /* Mobile: 44pt recommended */
        "touch-sm": "28px",  /* Mobile: 28pt minimum */
        "click": "28px",     /* Desktop: 28pt recommended */
        "click-sm": "20px",  /* Desktop: 20pt minimum */
      },
      minWidth: {
        "touch": "44px",
        "touch-sm": "28px",
        "click": "28px",
        "click-sm": "20px",
      },
      /* HIG Motion — smooth, purposeful transitions */
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      /* HIG Layout — border radius consistency */
      borderRadius: {
        "xl": "0.75rem",     /* 12px — cards */
        "2xl": "1rem",       /* 16px — modals */
        "3xl": "1.5rem",     /* 24px — large cards */
      },
      /* HIG Materials — elevation system */
      boxShadow: {
        "elevated": "0 2px 8px -2px rgb(0 0 0 / 0.1), 0 1px 4px -1px rgb(0 0 0 / 0.06)",
        "floating": "0 8px 24px -4px rgb(0 0 0 / 0.12), 0 4px 8px -2px rgb(0 0 0 / 0.08)",
        "overlay": "0 16px 48px -8px rgb(0 0 0 / 0.16), 0 8px 16px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
