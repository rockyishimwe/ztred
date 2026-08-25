"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  Upload,
  Search,
  MoreHorizontal,
  Users,
  Globe,
  Lock,
} from "lucide-react";

type TabKey = "all" | "active" | "archived" | "restricted";

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All channels" },
  { key: "active", label: "Active" },
  { key: "archived", label: "Archived" },
  { key: "restricted", label: "Restricted" },
];

const accessMatrix = [
  { channel: "#general", Owner: "Yes", Admin: "Yes", Manager: "Yes", Member: "Yes", Guest: "Yes" },
  { channel: "#development", Owner: "Yes", Admin: "Yes", Manager: "Yes", Member: "Yes", Guest: "No" },
];

const roleColumns = ["Owner", "Admin", "Manager", "Member", "Guest"] as const;

interface ChannelRow {
  name: string;
  type: "Public" | "Private";
  members: number;
  access: string;
  createdBy: { name: string; avatar: string };
  status: "Active" | "Archived" | "Restricted";
}

const channels: ChannelRow[] = [
  { name: "#general", type: "Public", members: 47, access: "All members", createdBy: { name: "Sarah J", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80" }, status: "Active" },
  { name: "#development", type: "Public", members: 35, access: "Dev Team", createdBy: { name: "Michael T", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" }, status: "Active" },
  { name: "#design", type: "Public", members: 18, access: "Design Team", createdBy: { name: "Emma J", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80" }, status: "Active" },
  { name: "#marketing", type: "Public", members: 24, access: "Mktg Team", createdBy: { name: "David S", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80" }, status: "Active" },
];

const detailChannel = {
  name: "#leadership",
  type: "Private",
  description: "Leadership alignment and confidential executive discussions.",
  members: 8,
  extraAvatars: 4,
  avatars: [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  ],
  accessRules: [
    { role: "Workspace Owner", access: "Full Access", color: "var(--success)" },
    { role: "Admin", access: "Full Access", color: "var(--success)" },
    { role: "Manager", access: "No Access", color: "var(--danger)" },
  ],
};

function getCellColor(val: string): string {
  if (val === "No") return "var(--danger)";
  if (val === "Yes") return "var(--success)";
  return "var(--text-secondary)";
}

const statusColor: Record<string, string> = {
  Active: "var(--success)",
  Archived: "var(--text-muted)",
  Restricted: "var(--warning)",
};

export default function ChannelsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");

  const filtered = channels.filter((ch) => {
    if (activeTab !== "all" && ch.status.toLowerCase() !== activeTab) return false;
    if (search && !ch.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-full" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/workspace/control" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>
            Workspace control
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
          <span style={{ color: "var(--text-muted)" }}>Channels</span>
        </nav>

        {/* Title Row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Channels
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Manage channel access, visibility, and status
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

        {/* Search + Filter + Create */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search channels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
              aria-label="Search channels"
            />
          </div>
          <select
            className="rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)", minWidth: "150px" }}
            aria-label="Filter by type"
          >
            <option>Type: All channels</option>
            <option>Public</option>
            <option>Private</option>
          </select>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors shrink-0"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Create channel
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6" role="tablist" aria-label="Channel tabs">
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

        {/* Access Matrix */}
        <div
          className="rounded-2xl overflow-hidden mb-8"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Role-based channel access matrix
            </h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Channels
                </th>
                {roleColumns.map((role) => (
                  <th key={role} className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-center" style={{ color: "var(--text-muted)" }}>
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accessMatrix.map((row, idx) => (
                <tr
                  key={row.channel}
                  style={{ borderBottom: idx < accessMatrix.length - 1 ? "1px solid var(--border-color)" : "none" }}
                >
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {row.channel}
                  </td>
                  {roleColumns.map((role) => {
                    const val = row[role];
                    return (
                      <td key={role} className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold" style={{ color: getCellColor(val) }}>
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

        {/* Bottom: Directory + Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Channels Directory */}
          <div
            className="col-span-2 rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Channels directory</h2>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Channel name</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Type</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Members</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Access</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Created by</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Status</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ch, idx) => (
                  <tr
                    key={ch.name}
                    style={{ borderBottom: idx < filtered.length - 1 ? "1px solid var(--border-color)" : "none" }}
                  >
                    <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--text-primary)" }}>{ch.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block"
                        style={{
                          backgroundColor: ch.type === "Public" ? "var(--success)" : "var(--primary)",
                          color: "#ffffff",
                        }}
                      >
                        {ch.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{ch.members}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{ch.access}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img src={ch.createdBy.avatar} alt={ch.createdBy.name} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{ch.createdBy.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block"
                        style={{ backgroundColor: "color-mix(in srgb, " + statusColor[ch.status] + " 15%, transparent)", color: statusColor[ch.status] }}
                      >
                        {ch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="p-1.5 rounded-lg transition-colors hover:opacity-70"
                        style={{ color: "var(--text-muted)" }}
                        aria-label={`Actions for ${ch.name}`}
                      >
                        <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Channel Details Sidebar */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Channel details</h2>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
              >
                {detailChannel.type}
              </span>
            </div>

            <h3 className="text-xl font-extrabold mb-2" style={{ color: "var(--text-primary)" }}>
              {detailChannel.name}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
              {detailChannel.description}
            </p>

            {/* Members */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-3" style={{ color: "var(--text-muted)" }}>
                Members ({detailChannel.members})
              </span>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {detailChannel.avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Member ${i + 1}`}
                      className="w-8 h-8 rounded-full object-cover"
                      style={{ border: "2px solid var(--bg-card)" }}
                    />
                  ))}
                </div>
                <span
                  className="text-xs font-semibold ml-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  +{detailChannel.extraAvatars}
                </span>
              </div>
            </div>

            {/* Access Rules */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-3" style={{ color: "var(--text-muted)" }}>
                Access rules per role
              </span>
              <div className="space-y-3">
                {detailChannel.accessRules.map((rule) => (
                  <div key={rule.role} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{rule.role}</span>
                    <span className="text-sm font-semibold" style={{ color: rule.color }}>{rule.access}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
