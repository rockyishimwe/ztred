"use client";

import { useEffect } from "react";
import { ACCENT_STORAGE_KEY } from "@/lib/accent";
import { THEME_STORAGE_KEY, useUIStore } from "@/stores/uiStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrateTheme = useUIStore((s) => s.hydrateTheme);
  const syncSystemTheme = useUIStore((s) => s.syncSystemTheme);
  const hydrateAccent = useUIStore((s) => s.hydrateAccent);

  useEffect(() => {
    // Adopt the stored preference. The pre-paint script in app/layout.tsx has
    // already applied it to <html>; this only brings the store in line so the
    // toggle icons and settings radios reflect the theme that is on screen.
    hydrateTheme();
    // Also paints the favicon, which the pre-paint script cannot do (the
    // <link> tags are still being parsed at that point).
    hydrateAccent();

    // Follow the OS when the preference is 'system'.
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => syncSystemTheme();
    media.addEventListener("change", onSystemChange);

    // Keep other tabs of the same workspace in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) hydrateTheme();
      if (e.key === ACCENT_STORAGE_KEY) hydrateAccent();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [hydrateTheme, syncSystemTheme, hydrateAccent]);

  return <>{children}</>;
}
