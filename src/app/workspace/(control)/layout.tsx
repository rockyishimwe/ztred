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
  Settings,
  Crown,
  Plus,
  Sun,
  Moon,
  LayoutDashboard,
  Shield,
  Lock,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { ZtredLogo } from "@/components/ui/ZtredLogo";
import { Spinner } from "@/components/ui/spinner";
import { isRouteActive } from "@/lib/utils";

const mainNavItems = [
  { icon: Home, href: "/workspace", label: "Home" },
  { icon: MessageSquare, href: "/workspace/dm", label: "Direct Messages" },
  { icon: Hash, href: "/workspace/channels", label: "Channels" },
  { icon: Video, href: "/workspace/meetings", label: "Meetings" },
  { icon: Calendar, href: "/workspace/calendar", label: "Calendar" },
  { icon: CheckSquare, href: "/workspace/projects", label: "Projects" },
  { icon: Folder, href: "/workspace/files", label: "Files" },
  { icon: FileText, href: "/workspace/docs", label: "Documents" },
  { icon: Users, href: "/workspace/people", label: "Members" },
  { icon: BarChart2, href: "/workspace/analytics", label: "Analytics" },
  { icon: Sparkles, href: "/workspace/ai", label: "AI Assistant" },
  { icon: Bell, href: "/workspace/notifications", label: "Notifications" },
  { icon: Settings, href: "/workspace/settings", label: "Settings" },
  { icon: Crown, href: "/admin", label: "Workspace Admin" },
];

const controlNavItems = [
  { icon: LayoutDashboard, href: "/workspace/control", label: "Overview" },
  { icon: Users, href: "/workspace/control/members", label: "Members" },
  { icon: Shield, href: "/workspace/control/roles", label: "Roles & permissions" },
  { icon: Hash, href: "/workspace/control/channels", label: "Channels" },
  { icon: Sparkles, href: "/workspace/control/ai", label: "AI management" },
  { icon: Lock, href: "/workspace/control/security", label: "Security" },
  { icon: FileText, href: "/workspace/control/audit", label: "Audit logs" },
  { icon: Settings, href: "/workspace/control/settings", label: "Workspace settings" },
];

export default function WorkspaceControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const profileImage =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80";

  const profileHref = "/workspace/control/settings";

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
          <NavLink href="/workspace" className="w-8 h-8 rounded-lg flex items-center justify-center" aria-label="Back to workspace">
            <ChevronLeft className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
          </NavLink>
          <NavLink href="/workspace/control" aria-label="Workspace control">
            <ZtredLogo className="w-8 h-8" title="Ztred" />
          </NavLink>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Control</span>
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
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="hit-area-touch w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            aria-label={mobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={mobileSidebarOpen}
          >
            {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Sidebar */}
      {isMobile && mobileSidebarOpen && (
        <>
          <div
            className="responsive-overlay md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-[52px] left-0 w-72 h-[calc(100dvh-52px)] z-50 overflow-y-auto md:hidden flex flex-col"
            style={{ backgroundColor: "var(--bg-card)", borderRight: "1px solid var(--border-color)" }}
          >
            {/* Workspace Info */}
            <div className="px-5 pt-5 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                Workspace Control
              </p>
              <h2 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>ZTRED Headquarters</h2>
            </div>
            <div className="mx-5 h-px" style={{ backgroundColor: "var(--border-color)" }} />

            {/* Navigation Items */}
            <nav className="flex flex-col gap-0.5 px-3 py-3" aria-label="Workspace control navigation">
              {controlNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isRouteActive(pathname, item.href, item.href === "/workspace/control");

                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
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

      {/* Desktop Layout */}
      <div className="hidden md:flex h-full w-full">
        {/* Main Icon Rail — same three-band structure as the workspace shell
            (fixed header, scrolling nav, pinned footer). See the longer note in
            (workspace)/layout.tsx: as one fixed stack this clipped its own
            footer on any viewport under ~940px tall. */}
        <aside
          className="w-16 shorter:w-14 h-full flex flex-col items-center py-4 short:py-3 shrink-0 z-30 select-none"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderRight: "1px solid var(--border-color)",
          }}
          aria-label="Main navigation"
        >
          <div className="flex flex-col items-center space-y-4 short:space-y-3 shrink-0">
            <NavLink
              href="/workspace/control"
              className="w-10 h-10 shorter:w-9 shorter:h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              aria-label="Workspace control"
              title="Workspace control"
            >
              <ZtredLogo className="w-full h-full" title="Ztred" />
            </NavLink>

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

          <nav
            className="rail-scroll flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden my-3 short:my-2"
            aria-label="Workspace sections"
          >
            <div className="flex flex-col space-y-1.5 short:space-y-1 items-center">
              {mainNavItems.map((item) => {
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

          <div className="flex flex-col items-center space-y-3 short:space-y-2 shrink-0">
            <NavLink href={profileHref} className="relative group cursor-pointer" aria-label="Jordan Lee's profile">
              <div className="w-10 h-10 short:w-9 short:h-9 rounded-full overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
                <img
                  src={profileImage}
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

        {/* Workspace Control Sidebar */}
        <aside
          className="w-[260px] shrink-0 flex flex-col justify-between overflow-y-auto"
          style={{
            backgroundColor: "var(--bg-card)",
            borderRight: "1px solid var(--border-color)",
          }}
          aria-label="Workspace control navigation"
          role="navigation"
        >
          <div className="flex flex-col">
            <div className="px-5 pt-6 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                Workspace Control
              </p>
              <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>ZTRED Headquarters</h2>
            </div>

            <div className="mx-5 h-px" style={{ backgroundColor: "var(--border-color)" }} />

            <nav className="flex flex-col gap-0.5 px-3 py-4">
              {controlNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isRouteActive(pathname, item.href, item.href === "/workspace/control");

                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
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

          <div className="flex flex-col px-5 pb-5">
            <div className="mx-2 mb-3" style={{ borderBottom: "1px solid var(--border-color)" }} />
            <NavLink
              href={profileHref}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors"
              style={{ backgroundColor: "var(--bg-secondary)" }}
              aria-label="Jordan Lee's profile"
            >
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
                  <img
                    src={profileImage}
                    alt="Jordan Lee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2"
                  style={{ borderColor: "var(--bg-card)" }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  Jordan Lee
                </span>
                <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  Workspace owner
                </span>
              </div>
            </NavLink>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
          {/* Top Bar with Dark Mode Toggle */}
          <div
            className="hidden md:flex items-center justify-end px-6 py-3 shrink-0"
            style={{ borderBottom: "1px solid var(--border-color)" }}
          >
            <button type="button"
              onClick={toggleTheme}
              className="hit-area-touch w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
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
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Content (no sidebar) */}
      <div className="md:hidden flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
