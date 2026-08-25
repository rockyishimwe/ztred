// Design tokens extracted from PNG screenshots and SRS v2.0
// These values should be customized to match the exact designs

export const tokens = {
  // Spacing (4,8,12,16,20,24,32,48,64)
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
  },

  // Typography
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  fontFamilies: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Colors (from SRS v2.0)
  colors: {
    // Primary (Eggplant Sidebar)
    'sidebar-bg': '#19171d',
    'sidebar-bg-dark': '#121016',
    'primary': '#5F3DFF',
    'primary-dark': '#4A2DE6',
    'primary-light': '#7B5FFF',

    // Accent colors
    'accent-blue': '#1264A3',
    'accent-blue-dark': '#0F5288',
    'accent-blue-light': '#1A7BCE',

    // Status colors
    'success': '#2BAC76',
    'success-dark': '#259668',
    'success-light': '#37C68A',
    'warning': '#ECB22E',
    'warning-dark': '#D49F29',
    'warning-light': '#F2C04A',
    'danger': '#E01E5A',
    'danger-dark': '#C41A4D',
    'danger-light': '#E84A78',

    // Neutrals
    'background': '#ffffff',
    'background-dark': '#1a1d21',
    'foreground': '#1d1c1d',
    'foreground-dark': '#d1d2d3',
    'muted': '#616061',
    'muted-dark': '#ababad',
    'border': '#e2e8f0',
    'border-dark': '#2c2d30',
    'input-bg': '#f8f9fa',
    'input-bg-dark': '#222529',

    // Sidebar text
    'sidebar-text': '#d1d2d3',
    'sidebar-text-muted': '#9a9b9e',
    'sidebar-hover': '#26242b',

    // Dark mode overrides (applied via [data-theme="dark"]):
    // These are handled in globals.css
  },

  // Radius
  radius: {
    none: '0',
    sm: '0.125rem', // 2px
    md: '0.25rem', // 4px
    lg: '0.5rem', // 8px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Transitions
  transitions: {
    default: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '75ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Z-index
  zIndex: {
    base: 0,
    docked: 10,
    dropdown: 100,
    sticky: 110,
    banner: 120,
    overlay: 130,
    modal: 140,
    popover: 150,
    skipLink: 160,
    toast: 170,
    tooltip: 180,
  },
};

// TypeScript types for tokens
export type TokenValue = string | number;
export type Spacing = keyof typeof tokens.spacing;
export type FontSize = keyof typeof tokens.fontSizes;
export type FontWeight = keyof typeof tokens.fontWeights;
export type Color = keyof typeof tokens.colors;
export type Radius = keyof typeof tokens.radius;
export type Shadow = keyof typeof tokens.shadows;
export type Transition = keyof typeof tokens.transitions;
export type ZIndex = keyof typeof tokens.zIndex;