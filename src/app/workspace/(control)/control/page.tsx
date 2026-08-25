"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Hash,
  Sparkles,
  Upload,
  Plus,
  ShieldCheck,
  Brain,
  Lock,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function WorkspaceControlPage() {
  const stats = [
    {
      label: "Total Members",
      value: "47",
      sub: "+3 this month",
      subColor: "text-green-500",
      icon: Users,
      iconColor: "text-purple-400",
    },
    {
      label: "Active Roles",
      value: "5",
      sub: "Fully configured",
      subColor: "text-green-500",
      icon: Shield,
      iconColor: "text-purple-400",
    },
    {
      label: "Channels",
      value: "12",
      sub: "3 private channels",
      subColor: "text-green-500",
      icon: Hash,
      iconColor: "text-purple-400",
    },
    {
      label: "AI Usage Today",
      value: "18/50",
      sub: "36% of daily limit",
      subColor: "text-green-500",
      icon: Sparkles,
      iconColor: "text-purple-400",
    },
  ];

  const quickActions = [
    { icon: Plus, label: "Invite Member", sub: "Add people to your workspace" },
    { icon: ShieldCheck, label: "Create Role", sub: "Configure access levels" },
    { icon: Hash, label: "Manage Channels", sub: "Organize discussions" },
    { icon: Brain, label: "AI Settings", sub: "Set token usage & rules" },
    { icon: Lock, label: "Security Settings", sub: "Configure 2FA & sign-on" },
    { icon: FileText, label: "View Audit Logs", sub: "Trace absolute activities" },
  ];

  const memberStatus = [
    { count: 42, label: "Active", color: "var(--success)", bgColor: "var(--bg-secondary)" },
    { count: 3, label: "Pending", color: "var(--warning)", bgColor: "var(--bg-secondary)" },
    { count: 1, label: "Suspended", color: "var(--danger)", bgColor: "var(--bg-secondary)" },
    { count: 1, label: "Banned", color: "var(--danger)", bgColor: "var(--bg-secondary)" },
  ];

  const recentActivity = [
    { name: "Sarah Jenkins", action: "updated permission configurations for Manager role", time: "2m ago", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80" },
    { name: "Robert Allen", action: "was suspended by Owner", time: "15m ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
    { name: "Emma Johnson", action: "uploaded new policy document 'compliance_2026.pdf'", time: "1h ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80" },
    { name: "Michael Torres", action: "created private channel '#exec-board'", time: "2h ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    { name: "David Smith", action: "accepted invitation to join workspace", time: "3h ago", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" },
  ];

  const pendingInvitations = [
    { email: "clara.vance@ztred.com", role: "Manager", date: "Jan 14, 2026" },
    { email: "developer.dan@ztred.com", role: "Member", date: "Jan 12, 2026" },
    { email: "advisor.lee@external.com", role: "Guest", date: "Jan 10, 2026" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <Link
            href="/workspace/control"
            className="font-medium transition-colors"
            style={{ color: "var(--primary)" }}
          >
            Workspace control
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
          <span style={{ color: "var(--text-muted)" }}>Overview</span>
        </nav>

        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="responsive-text-h1 text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Workspace control
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
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
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {stat.label}
                  </span>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} aria-hidden="true" />
                </div>
                <div className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {stat.value}
                </div>
                <span className={`text-xs font-medium mt-1 block ${stat.subColor}`}>
                  {stat.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Actions + Member Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div
            className="col-span-2 rounded-2xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Quick actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "var(--primary)" }} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {action.label}
                      </div>
                      <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {action.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Member Status */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Member status
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {memberStatus.map((status) => (
                <div
                  key={status.label}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: status.bgColor }}
                >
                  <div className="text-2xl font-extrabold" style={{ color: status.color }}>
                    {status.count}
                  </div>
                  <div className="text-xs font-medium mt-1" style={{ color: "var(--text-secondary)" }}>
                    {status.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Pending Invitations + Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Invitations */}
          <div
            className="col-span-2 rounded-2xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                Pending invitations
              </h2>
              <button
                className="text-sm font-semibold transition-colors"
                style={{ color: "var(--primary)" }}
              >
                View all
              </button>
            </div>

            <div className="space-y-0 overflow-x-auto">
              {pendingInvitations.map((inv, idx) => (
                <div
                  key={inv.email}
                  className="flex items-center justify-between py-4"
                  style={{
                    borderBottom: idx < pendingInvitations.length - 1 ? "1px solid var(--border-color)" : "none",
                  }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {inv.email}
                    </span>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {inv.role}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {inv.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="text-xs font-semibold transition-colors"
                      style={{ color: "var(--primary)" }}
                    >
                      Resend
                    </button>
                    <button className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
              Recent activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <img
                    src={activity.avatar}
                    alt={activity.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        {activity.name}
                      </span>{" "}
                      {activity.action}
                    </p>
                    <span className="text-[11px] mt-0.5 block" style={{ color: "var(--text-muted)" }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue to Workspace Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Continue to workspace
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
