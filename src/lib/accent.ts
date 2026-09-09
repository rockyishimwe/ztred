/**
 * Accent color system.
 *
 * One user-chosen hex drives every brand surface in the app. Applying an accent
 * writes an 11-stop scale onto <html> as space-separated RGB channels
 * (`--accent-600: 95 61 255`), which lets the Tailwind `purple` palette be
 * declared as `rgb(var(--accent-600) / <alpha-value>)` — so opacity modifiers
 * like `bg-purple-600/20` keep working, unlike a bare `var(--primary)` value.
 */

export const ACCENT_STORAGE_KEY = 'ztred-accent';
export const DEFAULT_ACCENT = '#5F3DFF';

export interface AccentPreset {
  name: string;
  value: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { name: 'Violet', value: '#5F3DFF' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Lime', value: '#84cc16' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Slate', value: '#64748b' },
];

/** Tailwind stops mapped to how far each sits from the base color:
 *  positive = mixed toward white, negative = mixed toward black. */
const SHADE_MIX: Record<string, number> = {
  '50': 0.95,
  '100': 0.89,
  '200': 0.77,
  '300': 0.6,
  '400': 0.36,
  '500': 0.12,
  '600': 0,
  '700': -0.18,
  '800': -0.3,
  '900': -0.5,
  '950': -0.7,
};

export const ACCENT_STOPS = Object.keys(SHADE_MIX);

/** Accepts `#abc` / `#aabbcc` (with or without the hash). Returns null if invalid. */
export function normalizeHex(input: string): string | null {
  const raw = input.trim().replace(/^#/, '');
  const expanded =
    raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  return /^[0-9a-fA-F]{6}$/.test(expanded) ? `#${expanded.toLowerCase()}` : null;
}

function toRgb(hex: string): [number, number, number] {
  const normalized = normalizeHex(hex) ?? DEFAULT_ACCENT;
  const n = parseInt(normalized.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** `{ '600': '95 61 255', ... }` — channel triplets, ready for `rgb(... / <alpha>)`. */
export function accentShades(hex: string): Record<string, string> {
  const [r, g, b] = toRgb(hex);
  const shades: Record<string, string> = {};
  for (const [stop, mix] of Object.entries(SHADE_MIX)) {
    const target = mix >= 0 ? 255 : 0;
    const amount = Math.abs(mix);
    shades[stop] = [r, g, b]
      .map((channel) => Math.round(channel + (target - channel) * amount))
      .join(' ');
  }
  return shades;
}

/** Relative luminance — used to pick readable foreground text on the accent. */
export function isLightColor(hex: string): boolean {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.42;
}

/** Write the accent onto the document. Safe to call before React mounts. */
export function applyAccent(hex: string): void {
  if (typeof document === 'undefined') return;
  const accent = normalizeHex(hex) ?? DEFAULT_ACCENT;
  const shades = accentShades(accent);
  const root = document.documentElement;

  for (const [stop, channels] of Object.entries(shades)) {
    root.style.setProperty(`--accent-${stop}`, channels);
  }
  // The variables the rest of the app already reads.
  root.style.setProperty('--primary', `rgb(${shades['600']})`);
  root.style.setProperty('--primary-hover', `rgb(${shades['700']})`);
  root.style.setProperty('--ring', `rgb(${shades['600']})`);
  root.style.setProperty('--sidebar-active', `rgb(${shades['600']})`);
  root.style.setProperty('--on-primary', isLightColor(accent) ? '#0f172a' : '#ffffff');
}

export function readStoredAccent(): string {
  if (typeof window === 'undefined') return DEFAULT_ACCENT;
  try {
    return normalizeHex(localStorage.getItem(ACCENT_STORAGE_KEY) ?? '') ?? DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

/* ── Logo geometry ────────────────────────────────────────────────────────
   The shipped ztred-logo.svg paints the Z as a clipped raster image, which
   CSS cannot recolor. These are the same two vector outlines (the clip path
   is the Z), so the mark can follow the accent. */

export const LOGO_VIEW_BOX = '42 28 65 80';

export const LOGO_SWOOSH_TRANSFORM =
  'matrix(0.291883,0,0,0.324595,51.878302,36.752491)';
export const LOGO_SWOOSH_PATH =
  'M143.238,102.543L69.484,102.543L21.317,99L1.75,120.259L1.75,123.802L16.802,140L127.333,140C128.194,140 129.014,139.63 129.584,138.983L132.44,135.741C132.614,135.544 132.761,135.325 132.877,135.09L146.195,108.218C146.535,107.533 146.454,106.715 145.987,106.109L143.238,102.543Z';

export const LOGO_Z_TRANSFORM =
  'matrix(0.291883,0,0,0.324595,52.235181,36.752491)';
export const LOGO_Z_PATH =
  'M1.019,30.333L20.925,0L124.162,0C125.357,0 126.49,0.535 127.25,1.457L137.931,14.427C139.136,15.89 139.148,17.999 137.961,19.476L119.573,42.349L72.74,97.153L23.915,140L12.954,140L1.495,124.555L1.495,119.573L16.939,102.633L78.221,37.865L5.785,37.865C4.362,37.865 3.047,37.109 2.33,35.88L0.936,33.491C0.363,32.508 0.395,31.285 1.019,30.333Z';

/** Standalone SVG markup for the mark, used for the runtime favicon. */
export function accentLogoSvg(hex: string): string {
  const shades = accentShades(hex);
  const base = `rgb(${shades['600']})`;
  const deep = `rgb(${shades['800']})`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEW_BOX}" width="512" height="512">`,
    `<g transform="${LOGO_SWOOSH_TRANSFORM}"><path d="${LOGO_SWOOSH_PATH}" fill="${deep}"/></g>`,
    `<g transform="${LOGO_Z_TRANSFORM}"><path d="${LOGO_Z_PATH}" fill="${base}"/></g>`,
    `</svg>`,
  ].join('');
}

/**
 * Swap the tab icon to a freshly tinted mark.
 *
 * The `<link rel="icon">` tags in <head> are rendered by Next from the
 * `metadata.icons` export, which means React owns those DOM nodes as hoistables
 * and holds direct references to them. Removing one leaves React with a
 * detached node, and the next client-side route change crashes the whole tree
 * in `unmountHoistable` with "Cannot read properties of null (reading
 * 'removeChild')" — every navigation blanked the page.
 *
 * So retint in place instead: mutate `href` on the tags that are already there
 * (React never re-renders them, so the new value sticks) and only create a tag
 * when the rel is missing entirely, tagging the ones we own so repeat calls
 * reuse them rather than piling up.
 */
export function applyFavicon(hex: string): void {
  if (typeof document === 'undefined') return;
  const href = `data:image/svg+xml,${encodeURIComponent(accentLogoSvg(hex))}`;
  for (const rel of ['icon', 'apple-touch-icon']) {
    const existing = document.head.querySelectorAll<HTMLLinkElement>(
      `link[rel="${rel}"]`
    );
    if (existing.length > 0) {
      existing.forEach((link) => {
        link.type = 'image/svg+xml';
        link.href = href;
      });
      continue;
    }
    const link = document.createElement('link');
    link.rel = rel;
    link.type = 'image/svg+xml';
    link.href = href;
    link.dataset.ztredFavicon = 'true';
    document.head.appendChild(link);
  }
}
