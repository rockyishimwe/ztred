import { create } from 'zustand';
import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  applyAccent,
  applyFavicon,
  normalizeHex,
  readStoredAccent,
} from '@/lib/accent';

/** The theme actually painted on screen. */
export type ThemeMode = 'dark' | 'light';
/** What the user asked for — 'system' follows the OS setting. */
export type ThemePreference = ThemeMode | 'system';

export const THEME_STORAGE_KEY = 'ztred-theme';

/** Resolve the OS preference. Defaults to dark when unknown (SSR, no matchMedia). */
export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export const readStoredPreference = (): ThemePreference => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
  } catch {
    /* private mode / blocked storage — fall through to the default */
  }
  return 'dark';
};

const resolvePreference = (preference: ThemePreference): ThemeMode =>
  preference === 'system' ? getSystemTheme() : preference;

/** Paint the theme. The `data-theme` attribute drives both the CSS variables
 *  in globals.css and Tailwind's `dark:` variant (see darkMode in tailwind.config.ts). */
const paint = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
};

interface UIState {
  isSidebarCollapsed: boolean;
  activeRightPanel: 'thread' | 'ai' | null;
  /** Resolved theme — always 'dark' or 'light'. Use this for rendering. */
  theme: ThemeMode;
  /** What the user picked — may be 'system'. Use this for settings UI. */
  themePreference: ThemePreference;
  /** Workspace accent, as a `#rrggbb` hex. Drives --primary, the whole Tailwind
   *  purple scale, the logo mark and the favicon. */
  accentColor: string;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setActiveRightPanel: (panel: 'thread' | 'ai' | null) => void;
  setTheme: (theme: ThemeMode) => void;
  setThemePreference: (preference: ThemePreference) => void;
  setAccentColor: (hex: string) => void;
  toggleTheme: () => void;
  /** Adopt the stored preference without re-persisting it. Called once on mount
   *  by ThemeProvider; keeps a 'system' preference from collapsing to a fixed
   *  theme, and keeps the store in sync with what the pre-paint script applied. */
  hydrateTheme: () => void;
  /** Re-resolve after an OS theme change; a no-op unless the preference is 'system'. */
  syncSystemTheme: () => void;
  /** Adopt the stored accent without re-persisting it. Called once on mount. */
  hydrateAccent: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSidebarCollapsed: false,
  activeRightPanel: null,
  // SSR-safe defaults; the real values are adopted in hydrateTheme() on mount.
  theme: 'dark',
  themePreference: 'dark',
  accentColor: DEFAULT_ACCENT,

  setIsSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  setActiveRightPanel: (panel) => set({ activeRightPanel: panel }),

  setTheme: (theme) => get().setThemePreference(theme),

  setThemePreference: (preference) => {
    const theme = resolvePreference(preference);
    set({ theme, themePreference: preference });
    paint(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      /* storage unavailable — the theme still applies for this session */
    }
  },

  setAccentColor: (hex) => {
    // Reject anything that isn't a usable hex rather than writing a broken
    // value into --primary, which would blank out every brand surface.
    const accent = normalizeHex(hex);
    if (!accent) return;
    set({ accentColor: accent });
    applyAccent(accent);
    applyFavicon(accent);
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, accent);
    } catch {
      /* storage unavailable — the accent still applies for this session */
    }
  },

  hydrateAccent: () => {
    const accent = readStoredAccent();
    set({ accentColor: accent });
    applyAccent(accent);
    applyFavicon(accent);
  },

  // Toggling always lands on an explicit theme, never back on 'system'.
  toggleTheme: () => {
    get().setThemePreference(get().theme === 'dark' ? 'light' : 'dark');
  },

  hydrateTheme: () => {
    const preference = readStoredPreference();
    const theme = resolvePreference(preference);
    set({ theme, themePreference: preference });
    paint(theme);
  },

  syncSystemTheme: () => {
    if (get().themePreference !== 'system') return;
    const theme = getSystemTheme();
    if (theme === get().theme) return;
    set({ theme });
    paint(theme);
  },
}));
