"use client";

import { useEffect } from "react";
import { ACCENT_STORAGE_KEY } from "@/lib/accent";
import { A11Y_STORAGE_KEY, THEME_STORAGE_KEY, useUIStore } from "@/stores/uiStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrateTheme = useUIStore((s) => s.hydrateTheme);
  const syncSystemTheme = useUIStore((s) => s.syncSystemTheme);
  const hydrateAccent = useUIStore((s) => s.hydrateAccent);
  const hydrateA11y = useUIStore((s) => s.hydrateA11y);

  useEffect(() => {
    // Adopt the stored preference. The pre-paint script in app/layout.tsx has
    // already applied it to <html>; this only brings the store in line so the
    // toggle icons and settings radios reflect the theme that is on screen.
    hydrateTheme();
    // Also paints the favicon, which the pre-paint script cannot do (the
    // <link> tags are still being parsed at that point).
    hydrateAccent();
    hydrateA11y();

    // Follow the OS when the preference is 'system'.
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => syncSystemTheme();
    media.addEventListener("change", onSystemChange);

    // Keep other tabs of the same workspace in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) hydrateTheme();
      if (e.key === ACCENT_STORAGE_KEY) hydrateAccent();
      if (e.key === A11Y_STORAGE_KEY) hydrateA11y();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [hydrateTheme, syncSystemTheme, hydrateAccent, hydrateA11y]);

  return <>{children}</>;
}
