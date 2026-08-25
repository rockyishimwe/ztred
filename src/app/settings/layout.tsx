"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Users,
  CreditCard,
} from "lucide-react";

const SETTINGS_NAV = [
  { icon: User, href: "/settings/profile", label: "Profile" },
  { icon: Bell, href: "/settings/notifications", label: "Notifications" },
  { icon: Palette, href: "/settings/appearance", label: "Appearance" },
  { icon: Shield, href: "/settings/security", label: "Security" },
  { icon: Users, href: "/settings/members", label: "Members" },
  { icon: CreditCard, href: "/settings/billing", label: "Billing" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
          <Settings className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Settings
          </h1>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Manage your account and workspace
          </p>
        </div>
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
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
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
