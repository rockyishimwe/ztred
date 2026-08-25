"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  Upload,
  Users,
  Hash,
  Shield,
  CheckSquare,
  Sparkles,
  MoreHorizontal,
  Settings,
} from "lucide-react";

type TabKey = "roles" | "channel-access" | "ai-access" | "user-restrictions" | "banned";

const tabs: { key: TabKey; label: string }[] = [
  { key: "roles", label: "Roles" },
  { key: "channel-access", label: "Channel access" },
  { key: "ai-access", label: "AI access" },
  { key: "user-restrictions", label: "User restrictions" },
  { key: "banned", label: "Banned & suspended" },
];

const permissionMatrix = [
  {
    category: "Admin settings",
    Owner: "Yes",
    Admin: "Yes",
    Manager: "No",
    Member: "No",
    Guest: "No",
  },
  {
    category: "Channel creation",
    Owner: "Yes",
    Admin: "Yes",
    Manager: "Yes",
    Member: "No",
    Guest: "No",
  },
  {
    category: "AI queries",
    Owner: "Unlimited",
    Admin: "100/day",
    Manager: "50/day",
    Member: "20/day",
    Guest: "No",
  },
];

const roleColumns = ["Owner", "Admin", "Manager", "Member", "Guest"] as const;

const workspaceRoles = [
  { name: "Workspace Owner", members: 1, description: "Full access to all workspace settings an..." },
  { name: "Admin", members: 3, description: "Manage members, channels, roles and..." },
  { name: "Manager", members: 4, description: "Manage projects, tasks and team memb..." },
  { name: "Member", members: 35, description: "Basic access to workspace and assigne..." },
  { name: "Guest", members: 4, description: "Limited access to specific channels and..." },
];

const roleOverview = [
  { icon: Users, label: "Members", access: "Full access" },
  { icon: Hash, label: "Channels", access: "Full access" },
  { icon: CheckSquare, label: "Projects & tasks", access: "Full access" },
  { icon: Sparkles, label: "AI assistant", access: "Limited access" },
];

function getCellColor(value: string): string {
  if (value === "No") return "var(--danger)";
  if (value === "Yes" || value === "Unlimited") return "var(--success)";
  return "var(--text-secondary)";
}

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("roles");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/workspace/control" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>
            Workspace control
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
          <span style={{ color: "var(--text-muted)" }}>Roles & permissions</span>
        </nav>

        {/* Title Row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Roles & permissions
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Create and manage roles for your workspace
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
            >
              Platform console
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Invite member
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-8" role="tablist" aria-label="Roles sections">
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
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Permission Comparison Matrix */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Permission comparison matrix
            </h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Permission categories
                </th>
                {roleColumns.map((role) => (
                  <th key={role} className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: "var(--text-muted)" }}>
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row, idx) => (
                <tr
                  key={row.category}
                  style={{ borderBottom: idx < permissionMatrix.length - 1 ? "1px solid var(--border-color)" : "none" }}
                >
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {row.category}
                  </td>
                  {roleColumns.map((role) => {
                    const val = row[role];
                    const color = getCellColor(val);
                    return (
                      <td key={role} className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold" style={{ color }}>
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Row: Workspace Roles + Role Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Workspace Roles Table */}
          <div
            className="col-span-2 rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Workspace roles
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{ backgroundColor: "transparent", border: "1px solid var(--primary)", color: "var(--primary)" }}
              >
                Create role
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Role name</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Members</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Description</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workspaceRoles.map((role, idx) => (
                  <tr
                    key={role.name}
                    style={{ borderBottom: idx < workspaceRoles.length - 1 ? "1px solid var(--border-color)" : "none" }}
                  >
                    <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {role.name}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {role.members} member{role.members !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                      {role.description}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="p-1.5 rounded-lg transition-colors hover:opacity-70"
                        style={{ color: "var(--text-muted)" }}
                        aria-label={`Actions for ${role.name}`}
                      >
                        <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Role Overview Sidebar */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Role overview</h2>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
              >
                Admin
              </span>
            </div>

            <div className="space-y-4">
              {roleOverview.map((item) => {
                const Icon = item.icon;
                const isLimited = item.access === "Limited access";
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: "var(--primary)" }} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.label}</div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: isLimited ? "var(--warning)" : "var(--success)" }}
                      >
                        {item.access}
                      </div>
                    </div>
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
