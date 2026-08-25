"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  Upload,
  Plus,
  SlidersHorizontal,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";

type MemberRole = "Owner" | "Admin" | "Manager" | "Member";
type MemberStatus = "Active" | "Pending" | "Suspended" | "Banned";

interface Member {
  name: string;
  email: string;
  avatar: string;
  role: MemberRole;
  status: MemberStatus;
  lastActive: string;
}

const members: Member[] = [
  { name: "John Mugisha", email: "john@ztred.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", role: "Owner", status: "Active", lastActive: "Active now" },
  { name: "Sarah Jenkins", email: "sarah.j@ztred.com", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80", role: "Admin", status: "Active", lastActive: "5 min ago" },
  { name: "Robert Allen", email: "robert.a@ztred.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", role: "Member", status: "Suspended", lastActive: "5h ago" },
  { name: "Emma Johnson", email: "emma.j@ztred.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80", role: "Admin", status: "Active", lastActive: "1h ago" },
  { name: "Michael Torres", email: "michael.t@ztred.com", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80", role: "Manager", status: "Active", lastActive: "2h ago" },
  { name: "Clara Vance", email: "clara.vance@ztred.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", role: "Manager", status: "Pending", lastActive: "Never" },
  { name: "David Smith", email: "david.s@ztred.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", role: "Member", status: "Active", lastActive: "Yesterday" },
  { name: "Lisa Park", email: "lisa.p@ztred.com", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", role: "Member", status: "Active", lastActive: "3h ago" },
];

const roleColors: Record<MemberRole, { bg: string; text: string }> = {
  Owner: { bg: "var(--primary)", text: "#ffffff" },
  Admin: { bg: "var(--primary)", text: "#ffffff" },
  Manager: { bg: "var(--bg-secondary)", text: "var(--text-secondary)" },
  Member: { bg: "var(--bg-secondary)", text: "var(--text-secondary)" },
};

const statusColors: Record<MemberStatus, { bg: string; text: string }> = {
  Active: { bg: "var(--success)", text: "#ffffff" },
  Pending: { bg: "var(--warning)", text: "#ffffff" },
  Suspended: { bg: "var(--danger)", text: "#ffffff" },
  Banned: { bg: "var(--danger)", text: "#ffffff" },
};

type TabFilter = "all" | "active" | "pending" | "suspended" | "banned";

const tabs: { key: TabFilter; label: string }[] = [
  { key: "all", label: "All members" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "suspended", label: "Suspended" },
  { key: "banned", label: "Banned" },
];

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filteredMembers = members.filter((m) => {
    if (activeTab !== "all" && m.status.toLowerCase() !== activeTab) return false;
    if (roleFilter !== "All" && m.role !== roleFilter) return false;
    if (statusFilter !== "All" && m.status !== statusFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelectAll = () => {
    if (selected.size === filteredMembers.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredMembers.map((_, i) => i)));
    }
  };

  const toggleSelect = (idx: number) => {
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/workspace/control" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>
            Workspace control
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
          <span style={{ color: "var(--text-muted)" }}>Members</span>
        </nav>

        {/* Title Row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Members
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Manage workspace members, invitations, and access
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

        {/* Filter Bar */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-6"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
              style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
              aria-label="Search members"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)", minWidth: "120px" }}
            aria-label="Filter by role"
          >
            <option value="All">Role: All</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Member">Member</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)", minWidth: "120px" }}
            aria-label="Filter by status"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
            <option value="Banned">Banned</option>
          </select>

          {/* Filters Button */}
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mb-6" role="tablist" aria-label="Member status tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              role="tab"
              aria-selected={activeTab === tab.key}
              className="text-sm font-semibold pb-2 transition-colors relative"
              style={{
                color: activeTab === tab.key ? "var(--primary)" : "var(--text-muted)",
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Members Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <table className="w-full text-left" role="grid">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th className="px-5 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selected.size === filteredMembers.length && filteredMembers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded cursor-pointer accent-[var(--primary)]"
                    aria-label="Select all members"
                  />
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Name & Email
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Role
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Status
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Last active
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, idx) => {
                const rc = roleColors[member.role];
                const sc = statusColors[member.status];
                const isSuspended = member.status === "Suspended";

                return (
                  <tr
                    key={member.email}
                    className="transition-colors"
                    style={{
                      borderBottom: idx < filteredMembers.length - 1 ? "1px solid var(--border-color)" : "none",
                      backgroundColor: isSuspended ? "color-mix(in srgb, var(--danger) 5%, transparent)" : "transparent",
                    }}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selected.has(idx)}
                        onChange={() => toggleSelect(idx)}
                        className="w-4 h-4 rounded cursor-pointer accent-[var(--primary)]"
                        aria-label={`Select ${member.name}`}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                            {member.name}
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block"
                        style={{ backgroundColor: rc.bg, color: rc.text }}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {member.lastActive}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="p-1.5 rounded-lg transition-colors hover:opacity-70"
                        style={{ color: "var(--text-muted)" }}
                        aria-label={`Actions for ${member.name}`}
                      >
                        <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              Showing 1-{filteredMembers.length} of {filteredMembers.length} members
            </span>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                }}
                disabled
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Previous
              </button>
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
