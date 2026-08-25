"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Upload,
  Plus,
  Lock,
} from "lucide-react";

type TabKey = "auth" | "sessions" | "ip" | "compliance";

const tabs: { key: TabKey; label: string }[] = [
  { key: "auth", label: "Authentication" },
  { key: "sessions", label: "Session management" },
  { key: "ip", label: "IP allowlist" },
  { key: "compliance", label: "Compliance" },
];

interface Session {
  user: string;
  email: string;
  device: string;
  ip: string;
  location: string;
  status: "Active" | "Suspicious";
  highlighted?: boolean;
}

const sessions: Session[] = [
  { user: "Sarah Jenkins", email: "sarah.j@ztred.com", device: "MacBook.", ip: "192.168.1.45", location: "San Fran, US", status: "Active" },
  { user: "Marcus Aurelius", email: "marcus.a@ztred.com", device: "Windows D.", ip: "45.12.89.22", location: "Berlin, DE", status: "Suspicious", highlighted: true },
  { user: "John Doe", email: "john.doe@ztred.com", device: "iPhone 15", ip: "172.56.21.99", location: "Austin, US", status: "Active" },
  { user: "Emma Watson", email: "emma.w@ztred.com", device: "Linux Thin.", ip: "88.192.4.15", location: "London, UK", status: "Active" },
];

interface Alert {
  severity: "High" | "Medium" | "Low";
  title: string;
  description: string;
  time: string;
}

const alerts: Alert[] = [
  { severity: "High", title: "Failed login attempts threshold", description: "Ip 45.12.89.22 hit lockout threshold on user Marcus A.", time: "2 min ago" },
  { severity: "Medium", title: "New device login detected", description: "User Emma Watson logged in via unknown Linux ThinkPad.", time: "15 min ago" },
  { severity: "Low", title: "SSO Config updated", description: "Administrator Jimmy Dane updated OAuth scopes.", time: "1h ago" },
  { severity: "High", title: "IP location mismatch warning", description: "Simultaneous sessions from SF and London for Sarah J.", time: "3h ago" },
];

const severityColors: Record<string, { bg: string; text: string }> = {
  High: { bg: "var(--danger)", text: "#fff" },
  Medium: { bg: "var(--warning)", text: "#fff" },
  Low: { bg: "var(--primary)", text: "#fff" },
};

const statusColors: Record<string, { bg: string; text: string }> = {
  Active: { bg: "var(--success)", text: "#fff" },
  Suspicious: { bg: "var(--warning)", text: "#fff" },
};

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("auth");
  const [twoFactor, setTwoFactor] = useState(true);
  const [sso, setSso] = useState(true);

  return (
    <div className="min-h-full w-full overflow-x-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/workspace/control" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>
            Workspace control
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
          <span style={{ color: "var(--text-muted)" }}>Security</span>
        </nav>

        {/* Title Row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Security</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Manage workspace security, authentication, and compliance settings
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
              Platform console
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors" style={{ backgroundColor: "var(--primary)" }}>
              <Plus className="w-4 h-4" aria-hidden="true" /> Invite member
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
              <Upload className="w-4 h-4" aria-hidden="true" /> Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 sm:gap-6 mb-6 overflow-x-auto" role="tablist" aria-label="Security sections">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              role="tab"
              aria-selected={activeTab === tab.key}
              className="text-sm font-semibold pb-2 transition-colors relative"
              style={{ color: activeTab === tab.key ? "var(--primary)" : "var(--text-muted)" }}
            >
              {tab.label}
              {activeTab === tab.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            {/* Authentication Settings */}
            <div className="rounded-2xl p-5 lg:p-6 min-w-0" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Authentication settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* 2FA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Two-factor auth</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Required for all workspace members</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} className="sr-only peer" aria-label="Toggle two-factor authentication" />
                    <span className="w-11 h-6 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-[var(--primary)]" aria-hidden="true" />
                    <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" aria-hidden="true" />
                  </label>
                </div>

                {/* SSO */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>SSO / SAML</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Active Provider: Okta SSO</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" checked={sso} onChange={() => setSso(!sso)} className="sr-only peer" aria-label="Toggle SSO" />
                    <span className="w-11 h-6 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-[var(--primary)]" aria-hidden="true" />
                    <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" aria-hidden="true" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Policy */}
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Password policy</label>
                  <select
                    className="w-full min-w-0 max-w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    aria-label="Password policy"
                  >
                    <option>Strong - 12+ chars, mixed casing</option>
                    <option>Medium - 8+ chars</option>
                    <option>Basic - 6+ chars</option>
                  </select>
                </div>

                {/* Login Attempt Limit */}
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Login attempt limit</label>
                  <div className="relative">
                    <select
                      className="w-full min-w-0 max-w-full rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                      style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                      aria-label="Login attempt limit"
                    >
                      <option>5 attempts before lockout</option>
                      <option>3 attempts before lockout</option>
                      <option>10 attempts before lockout</option>
                      <option>No limit</option>
                    </select>
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-2xl overflow-hidden min-w-0" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Active sessions</h2>
                <button className="text-sm font-semibold transition-colors" style={{ color: "var(--primary)" }}>View all sessions</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <th className="w-[25%] px-3 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>User</th>
                    <th className="w-[14%] px-2 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Device</th>
                    <th className="w-[18%] px-2 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>IP Address</th>
                    <th className="w-[16%] px-2 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Location</th>
                    <th className="w-[14%] px-2 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Status</th>
                    <th className="w-[13%] px-2 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, idx) => {
                    const sc = statusColors[s.status];
                    return (
                      <tr
                        key={s.email}
                        style={{
                          borderBottom: idx < sessions.length - 1 ? "1px solid var(--border-color)" : "none",
                          backgroundColor: s.highlighted ? "color-mix(in srgb, var(--warning) 8%, transparent)" : "transparent",
                        }}
                      >
                        <td className="px-3 py-3.5 overflow-hidden">
                          <div className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>{s.user}</div>
                          <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{s.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{s.device}</td>
                        <td className="px-6 py-4 text-sm font-mono" style={{ color: "var(--text-secondary)" }}>{s.ip}</td>
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{s.location}</td>
                        <td className="px-2 py-3.5 overflow-hidden">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block" style={{ backgroundColor: sc.bg, color: sc.text }}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-2 py-3.5 whitespace-nowrap">
                          <button className="text-sm font-semibold transition-colors hover:opacity-70" style={{ color: "var(--danger)" }}>
                            Revoke
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Security Alerts Sidebar */}
          <div
            className="rounded-2xl p-5 lg:p-6 min-w-0"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Security alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert, idx) => {
                const ac = severityColors[alert.severity];
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: ac.bg, color: ac.text }}>
                        {alert.severity}
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{alert.time}</span>
                    </div>
                    <div className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{alert.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{alert.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}