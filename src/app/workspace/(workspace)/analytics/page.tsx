"use client";

import React, { useState } from "react";
import {
  Users,
  Activity,
  HardDrive,
  FileText,
  Download,
  UserPlus,
  ShieldCheck,
  MoreHorizontal,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "18",
    label: "Active members",
    sub: "3 joined this month",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Activity,
    value: "84%",
    label: "Weekly activity",
    sub: "Up 6% week over week",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: HardDrive,
    value: "42 GB",
    label: "Storage used",
    sub: "of 250 GB included",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: FileText,
    value: "3,214",
    label: "Shared content",
    sub: "Files, docs, and posts",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
  },
];

const healthMetrics = [
  { label: "Two-factor adoption", value: 78, color: "bg-emerald-500" },
  { label: "Profile completion", value: 91, color: "bg-purple-500" },
  { label: "Storage capacity", value: 17, color: "bg-blue-500" },
];

const members = [
  {
    name: "Jordan Lee",
    email: "jordan.lee@zenith.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    team: "Design",
    role: "Owner",
    roleColor: "bg-emerald-500/20 text-emerald-400",
    lastActive: "Now",
    access: "Active",
    accessColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    name: "Sam Rivera",
    email: "sam.rivera@zenith.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    team: "Engineering",
    role: "Admin",
    roleColor: "bg-purple-500/20 text-purple-400",
    lastActive: "2h ago",
    access: "Active",
    accessColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    name: "Lisa Park",
    email: "lisa.park@zenith.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80",
    team: "Marketing",
    role: "Member",
    roleColor: "bg-zinc-500/20 text-zinc-400",
    lastActive: "5h ago",
    access: "Active",
    accessColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@zenith.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    team: "Engineering",
    role: "Member",
    roleColor: "bg-zinc-500/20 text-zinc-400",
    lastActive: "1d ago",
    access: "Active",
    accessColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    name: "Maya Chen",
    email: "maya.chen@zenith.com",
    initials: "MA",
    bgColor: "bg-pink-600",
    team: "Marketing",
    role: "Member",
    roleColor: "bg-zinc-500/20 text-zinc-400",
    lastActive: "3d ago",
    access: "Active",
    accessColor: "bg-emerald-500/20 text-emerald-400",
  },
];

export default function AnalyticsPage() {
  const [memberSearch, setMemberSearch] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.team.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="12" width="4" height="9" rx="1" />
                <rect x="10" y="7" width="4" height="14" rx="1" />
                <rect x="17" y="3" width="4" height="18" rx="1" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Workspace activity and engagement
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hover:opacity-80 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              Platform console
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-2 transition-all">
              <UserPlus className="w-4 h-4" />
              Invite member
            </button>
            <button className="hover:opacity-80 text-sm font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-5 transition-colors"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Activity + Health Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Workspace Activity Chart */}
          <div className="lg:col-span-3 rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base font-bold">
                  Workspace activity
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Messages, meetings, and completed tasks across the last 7
                  days.
                </p>
              </div>
              <button className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                View analytics
              </button>
            </div>

            {/* Chart Area */}
            <div className="mt-6 h-48 flex items-end gap-2 px-2">
              {[40, 65, 55, 80, 70, 45, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-lg bg-purple-600/80 hover:bg-purple-500 transition-colors"
                      style={{ height: `${h * 1.8}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Day Labels */}
            <div className="flex gap-2 px-2 mt-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center text-xs"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Workspace Health */}
          <div className="lg:col-span-2 rounded-2xl p-6 flex flex-col" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold">
                Workspace health
              </h2>
            </div>

            <div className="space-y-5 flex-1">
              {healthMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {metric.label}
                    </span>
                    <span className="text-sm font-semibold">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full hover:opacity-80 text-sm font-medium py-2.5 rounded-xl transition-colors" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              Generate security report
            </button>
          </div>
        </div>

        {/* Members Section */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold">Members</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Manage roles and workspace access.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Search members"
                  className="pl-9 pr-3 py-2 rounded-xl text-sm focus:outline-none transition-colors w-48"
                  style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              <button className="p-2 rounded-xl transition-colors" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl transition-colors" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th className="pb-3 font-semibold">Member</th>
                  <th className="pb-3 font-semibold">Team</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Last active</th>
                  <th className="pb-3 font-semibold">Access</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.name}
                    className="transition-colors"
                  >
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-9 h-9 rounded-full ${member.bgColor} flex items-center justify-center font-bold text-xs text-white`}
                          >
                            {member.initials}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold">
                            {member.name}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {member.team}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${member.roleColor}`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {member.lastActive}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${member.accessColor}`}
                      >
                        {member.access}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <button className="p-1 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
