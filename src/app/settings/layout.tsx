"use client";

import React from "react";
import { NavLink } from "@/components/ui/NavLink";
import { Spinner } from "@/components/ui/spinner";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  Bell,
  Palette,
  IdCard,
  Moon,
  Sun,
} from "lucide-react";
import { useUIStore } from "@/stores/uiStore";

// NOTE: only routes that actually exist under /settings —
// the removed Security/Members/Billing entries pointed at pages
// that were never built (workspace-level settings cover those).
const SETTINGS_NAV = [
  { icon: User, href: "/settings/profile", label: "Profile" },
  { icon: IdCard, href: "/settings/account", label: "Account" },
  { icon: Bell, href: "/settings/notifications", label: "Notifications" },
  { icon: Palette, href: "/settings/appearance", label: "Appearance" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ═══ Header ═══ */}
      <div
        className="px-8 py-5 flex items-center gap-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
        >
          <Settings className="w-5 h-5" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Settings
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Manage your account and workspace
          </p>
        </div>

        {/* This tree renders outside the workspace shell, so it carries its own
            theme toggle — otherwise there is no way to switch mode from here. */}
        <button
          type="button"
          onClick={toggleTheme}
          className="ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-muted)",
          }}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* ═══ Content Area ═══ */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Nav */}
        <div
          className="w-56 shrink-0 p-4"
          style={{ borderRight: "1px solid var(--border-color)" }}
        >
          <nav className="space-y-1">
            {SETTINGS_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "var(--on-primary)" : "var(--text-secondary)",
                  }}
                >
                  {(pending) => (
                    <>
                      {pending ? (
                        <Spinner size="small" className="size-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                      {item.label}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
