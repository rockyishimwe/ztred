"use client";

import { useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useUIStore((s) => s.setTheme);

  useEffect(() => {
    // Load saved theme or default to dark
    const saved = localStorage.getItem("ztred-theme") as "dark" | "light" | null;
    const theme = saved || "dark";
    setTheme(theme);
  }, [setTheme]);

  return <>{children}</>;
}
