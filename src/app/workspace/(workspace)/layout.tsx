"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Hash,
  Video,
  Calendar,
  CheckSquare,
  Folder,
  FileText,
  Users,
  BarChart2,
  Sparkles,
  Bell,
  Settings,
  Crown,
  Plus,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useUIStore } from "@/stores/uiStore";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { icon: Home, href: "/workspace", label: "Home" },
    { icon: MessageSquare, href: "/workspace/dm/user_1", label: "DMs" },
    { icon: Hash, href: "/workspace/channels/general", label: "Channels" },
    { icon: Video, href: "/workspace/meetings/meet_1", label: "Meetings" },
    { icon: Calendar, href: "/workspace/calendar", label: "Calendar" },
    { icon: CheckSquare, href: "/workspace/projects", label: "Projects" },
    { icon: Folder, href: "/workspace/files", label: "Files" },
    { icon: FileText, href: "/workspace/docs", label: "Docs" },
    { icon: Users, href: "/workspace/people", label: "Members" },
    { icon: BarChart2, href: "/workspace/analytics", label: "Analytics" },
    { icon: Sparkles, href: "/workspace/ai", label: "AI" },
    { icon: Bell, href: "/workspace/notifications", label: "Alerts" },
    { icon: Settings, href: "/workspace/settings/profile", label: "Settings" },
    { icon: Crown, href: "/admin", label: "Admin" },
  ];

  // Bottom nav items (5 most important for mobile)
  const bottomNavItems = [
    { icon: Home, href: "/workspace", label: "Home" },
    { icon: MessageSquare, href: "/workspace/dm/user_1", label: "DMs" },
    { icon: Hash, href: "/workspace/channels/general", label: "Channels" },
    { icon: CheckSquare, href: "/workspace/projects", label: "Projects" },
    { icon: Users, href: "/workspace/people", label: "Members" },
  ];

  return (
    <div
      className="h-screen w-screen flex flex-col md:flex-row overflow-hidden font-sans selection:bg-purple-500 selection:text-white"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Mobile Top Bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 shrink-0 z-40"
        style={{ backgroundColor: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/workspace/control" aria-label="Workspace control">
            <img src="/ztred-logo.svg" alt="Ztred" className="w-8 h-8" />
          </Link>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Ztred</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {isMobile && mobileMenuOpen && (
        <>
          <div
            className="responsive-overlay md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-[52px] left-0 w-72 h-[calc(100vh-52px)] z-50 overflow-y-auto md:hidden"
            style={{ backgroundColor: "var(--bg-card)", borderRight: "1px solid var(--border-color)" }}
          >
            <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (idx === 0 && pathname === "/workspace");
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="mobile-nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? "var(--primary)" : "transparent",
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                    }}
                  >
                    <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}

      {/* Desktop Icon Rail */}
      <aside
        className="hidden md:flex w-16 flex-col items-center py-4 justify-between shrink-0 z-30 select-none"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderRight: "1px solid var(--border-color)",
        }}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Z Brand Logo */}
          <Link
            href="/workspace/control"
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            aria-label="Workspace control"
            title="Workspace control"
          >
            <img src="/ztred-logo.svg" alt="Ztred" className="w-10 h-10" />
          </Link>

          {/* Plus Add Button */}
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
            }}
            aria-label="Create new"
            title="Create new"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="w-8 h-px my-1" style={{ backgroundColor: "var(--border-color)" }} />

          {/* Nav Icons */}
          <div className="flex flex-col space-y-1.5 items-center">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (idx === 0 && pathname === "/workspace");
              return (
                <Link
                  key={idx}
                  href={item.href}
                  title={item.label}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "#ffffff" : "var(--text-muted)",
                    boxShadow: isActive ? "0 10px 15px -3px rgb(0 0 0 / 0.3)" : "none",
                  }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-muted)",
            }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <Link href="/settings/profile" className="relative group cursor-pointer" aria-label="Jordan Lee's profile">
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
                alt="Jordan Lee"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2"
              style={{ borderColor: "var(--bg-primary)" }}
            />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
        {children}
      </div>

      {/* Mobile Bottom Navigation (HIG: Bottom tab bar for mobile primary nav) */}
      <nav
        className="md:hidden flex items-center justify-around shrink-0 safe-area-bottom z-30"
        style={{
          backgroundColor: "var(--bg-card)",
          borderTop: "1px solid var(--border-color)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-label="Bottom navigation"
      >
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-item flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all"
              style={{
                color: isActive ? "var(--primary)" : "var(--text-muted)",
                minWidth: "48px",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
