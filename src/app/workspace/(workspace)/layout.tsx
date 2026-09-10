"use client";

import React, { useState, useEffect } from "react";
import { NavLink } from "@/components/ui/NavLink";
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
  Search,
  Settings,
  Crown,
  Plus,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { isRouteActive } from "@/lib/utils";
import { ZtredLogo } from "@/components/ui/ZtredLogo";
import { Spinner } from "@/components/ui/spinner";

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

  if (pathname?.startsWith("/workspace/channels")) {
    return <>{children}</>;
  }

  const navItems = [
    { icon: Home, href: "/workspace", label: "Home" },
    { icon: MessageSquare, href: "/workspace/dm", label: "DMs" },
    { icon: Hash, href: "/workspace/channels", label: "Channels" },
    { icon: Video, href: "/workspace/meetings", label: "Meetings" },
    { icon: Calendar, href: "/workspace/calendar", label: "Calendar" },
    { icon: CheckSquare, href: "/workspace/projects", label: "Projects" },
    { icon: Folder, href: "/workspace/files", label: "Files" },
    { icon: FileText, href: "/workspace/docs", label: "Docs" },
    { icon: Users, href: "/workspace/people", label: "Members" },
    { icon: BarChart2, href: "/workspace/analytics", label: "Analytics" },
    { icon: Sparkles, href: "/workspace/ai", label: "AI" },
    { icon: Search, href: "/workspace/search", label: "Search" },
    { icon: Bell, href: "/workspace/notifications", label: "Alerts" },
    { icon: Settings, href: "/workspace/settings", label: "Settings" },
    { icon: Crown, href: "/workspace/control", label: "Admin" },
  ];

  // Bottom nav items (5 most important for mobile)
  const bottomNavItems = [
    { icon: Home, href: "/workspace", label: "Home" },
    { icon: MessageSquare, href: "/workspace/dm", label: "DMs" },
    { icon: Hash, href: "/workspace/channels", label: "Channels" },
    { icon: CheckSquare, href: "/workspace/projects", label: "Projects" },
    { icon: Users, href: "/workspace/people", label: "Members" },
  ];

  return (
    <div
      className="h-dvh w-full flex flex-col md:flex-row overflow-hidden font-sans selection:bg-purple-500 selection:text-white"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Mobile Top Bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 shrink-0 z-40"
        style={{ backgroundColor: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-3">
          <NavLink href="/workspace/control" aria-label="Workspace control">
            <ZtredLogo className="w-8 h-8" title="Ztred" />
          </NavLink>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Ztred</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button"
            onClick={toggleTheme}
            className="hit-area-touch w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hit-area-touch w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
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
            className="fixed top-[52px] left-0 w-72 h-[calc(100dvh-52px)] z-50 overflow-y-auto md:hidden"
            style={{ backgroundColor: "var(--bg-card)", borderRight: "1px solid var(--border-color)" }}
          >
            <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isRouteActive(pathname, item.href, item.href === "/workspace");
                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    className="mobile-nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? "var(--primary)" : "transparent",
                      color: isActive ? "var(--on-primary)" : "var(--text-secondary)",
                    }}
                  >
                    {(pending) =>
                      pending ? (
                        <>
                          <Spinner size="small" className="size-5 shrink-0" label={null} />
                          <span>{item.label}</span>
                        </>
                      ) : (
                        <>
                          <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                          <span>{item.label}</span>
                        </>
                      )
                    }
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </>
      )}

      {/* Desktop Icon Rail.

          Three bands: a fixed brand header, a scrolling nav list, and a pinned
          footer. This used to be one `justify-between` stack of fixed-height
          children — 941px of content — inside an `overflow-hidden` viewport
          shell, so on any screen under ~940px tall the last nav icons and the
          whole footer (theme toggle, avatar) were clipped and unreachable.

          The nav band carries `min-h-0`, without which a flex child refuses to
          shrink below its content and the overflow simply moves outward again.
          The `short:` breakpoints compact the icons first, so scrolling only
          kicks in once there is genuinely no room left. */}
      <aside
        className="hidden md:flex w-16 shorter:w-14 h-dvh flex-col items-center py-4 short:py-3 shrink-0 z-30 select-none"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderRight: "1px solid var(--border-color)",
        }}
        aria-label="Main navigation"
      >
        {/* Brand header — fixed */}
        <div className="flex flex-col items-center space-y-4 short:space-y-3 shrink-0">
          {/* Z Brand Logo */}
          <NavLink
            href="/workspace/control"
            className="w-10 h-10 shorter:w-9 shorter:h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            aria-label="Workspace control"
            title="Workspace control"
          >
            <ZtredLogo className="w-full h-full" title="Ztred" />
          </NavLink>

          {/* Plus Add Button */}
          <button type="button"
            className="hit-area-touch w-9 h-9 shorter:w-8 shorter:h-8 rounded-xl flex items-center justify-center transition-colors"
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

          <div
            className="w-8 h-px shortest:hidden"
            style={{ backgroundColor: "var(--border-color)" }}
          />
        </div>

        {/* Nav Icons — the band that scrolls */}
        <nav
          className="rail-scroll flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden my-3 short:my-2"
          aria-label="Workspace sections"
        >
          <div className="flex flex-col space-y-1.5 short:space-y-1 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isRouteActive(pathname, item.href, item.href === "/workspace");
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="w-10 h-10 short:w-9 short:h-9 shorter:w-8 shorter:h-8 shrink-0 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "var(--on-primary)" : "var(--text-muted)",
                    boxShadow: isActive ? "0 10px 15px -3px rgb(0 0 0 / 0.3)" : "none",
                  }}
                >
                  {(pending) =>
                    pending ? (
                      <Spinner size="small" className="size-5 short:size-4" label={null} />
                    ) : (
                      <Icon className="w-5 h-5 shorter:w-4 shorter:h-4" aria-hidden="true" />
                    )
                  }
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer — pinned, never scrolls out of reach */}
        <div className="flex flex-col items-center space-y-3 short:space-y-2 shrink-0">
          <button type="button"
            onClick={toggleTheme}
            className="hit-area-touch w-10 h-10 short:w-9 short:h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
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

          <NavLink href="/workspace/settings/profile" className="relative group cursor-pointer" aria-label="Jordan Lee's profile">
            <div
              className="w-10 h-10 short:w-9 short:h-9 rounded-full overflow-hidden"
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
          </NavLink>
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
          const isActive = isRouteActive(pathname, item.href, item.href === "/workspace");
          return (
            <NavLink
              key={item.href}
              href={item.href}
              className="mobile-nav-item flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all"
              style={{
                color: isActive ? "var(--primary)" : "var(--text-muted)",
                minWidth: "48px",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              {(pending) => (
                <>
                  {pending ? (
                    <Spinner size="small" className="size-5" label={null} />
                  ) : (
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  )}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
