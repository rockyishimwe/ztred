"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Upload,
  Plus,
  MoreHorizontal,
  Pencil,
} from "lucide-react";

type TabKey = "access" | "limits" | "model" | "analytics";

const tabs: { key: TabKey; label: string }[] = [
  { key: "access", label: "AI access" },
  { key: "limits", label: "Usage limits" },
  { key: "model", label: "Model settings" },
  { key: "analytics", label: "Usage analytics" },
];

interface RoleAccess {
  role: string;
  aiAccess: boolean;
  accessLevel: string;
  dailyLimit: string;
  modelAccess: string;
}

const roleData: RoleAccess[] = [
  { role: "Owner", aiAccess: true, accessLevel: "Full", dailyLimit: "Unlimited", modelAccess: "All models" },
  { role: "Admin", aiAccess: true, accessLevel: "Full", dailyLimit: "100/day", modelAccess: "All models" },
  { role: "Manager", aiAccess: true, accessLevel: "Limited", dailyLimit: "50/day", modelAccess: "Standard" },
  { role: "Member", aiAccess: true, accessLevel: "Limited", dailyLimit: "25/day", modelAccess: "Standard" },
  { role: "Guest", aiAccess: false, accessLevel: "No access", dailyLimit: "0", modelAccess: "None" },
];

interface FeatureToggle {
  name: string;
  enabled: boolean;
}

export default function AIManagementPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("access");
  const [roles, setRoles] = useState(roleData);
  const [globalLimit, setGlobalLimit] = useState(250);
  const [features, setFeatures] = useState<FeatureToggle[]>([
    { name: "Chat assistance", enabled: true },
    { name: "Code generation", enabled: true },
    { name: "Document summarization", enabled: true },
    { name: "Image generation", enabled: false },
    { name: "Data analysis", enabled: true },
  ]);

  const toggleRole = (idx: number) => {
    setRoles((prev) =>
      prev.map((r, i) =>
        i === idx ? { ...r, aiAccess: !r.aiAccess } : r
      )
    );
  };

  const toggleFeature = (idx: number) => {
    setFeatures((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, enabled: !f.enabled } : f
      )
    );
  };

  const usageToday = 142;
  const usagePercent = Math.round((usageToday / globalLimit) * 100);

  return (
    <div className="min-h-full" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm mb-6" aria-label="Breadcrumb">
          <Link href="/workspace/control" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>
            Workspace control
          </Link>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
          <span style={{ color: "var(--text-muted)" }}>AI management</span>
        </nav>

        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="responsive-text-h1 text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              AI management
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Configure AI assistant access, usage limits, and model settings
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
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
        <div className="flex items-center gap-4 sm:gap-6 mb-6 overflow-x-auto" role="tablist" aria-label="AI management sections">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* AI Access by Role */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border-color)" }}>
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>AI access by role</h2>
              </div>
              <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ minWidth: "700px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Role</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>AI Access</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Daily Limit</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Model Access</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((row, idx) => (
                    <tr
                      key={row.role}
                      style={{ borderBottom: idx < roles.length - 1 ? "1px solid var(--border-color)" : "none" }}
                    >
                      <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                        {row.role}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => toggleRole(idx)}
                            className="relative shrink-0"
                            style={{
                              width: "44px",
                              height: "24px",
                              borderRadius: "12px",
                              border: "none",
                              background: row.aiAccess ? "var(--primary)" : "#d1d5db",
                              cursor: "pointer",
                              transition: "background 0.2s",
                            }}
                            role="switch"
                            aria-checked={row.aiAccess}
                            aria-label={`${row.aiAccess ? 'Disable' : 'Enable'} AI for ${row.role}`}
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: "2px",
                                left: row.aiAccess ? "22px" : "2px",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: "#fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                transition: "left 0.2s",
                              }}
                              aria-hidden="true"
                            />
                          </button>
                          <span className="text-sm" style={{ color: row.aiAccess ? "var(--text-primary)" : "var(--text-muted)" }}>
                            {row.aiAccess ? row.accessLevel : "No access"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                        {row.dailyLimit}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                        {row.modelAccess}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="p-1.5 rounded-lg transition-colors hover:opacity-70"
                          style={{ color: "var(--text-muted)" }}
                          aria-label={`Actions for ${row.role}`}
                        >
                          <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total queries today", value: `${usageToday}/${globalLimit}`, sub: `${usagePercent}% global usage` },
                { label: "Active AI users", value: "28", sub: "60% of workspace members" },
                { label: "Average per user", value: "5.1", sub: "Queries per active user" },
                { label: "Peak hour", value: "2-3 PM", sub: "42 queries recorded" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Limits Configuration */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>Usage limits configuration</h2>

              {/* Global Daily Limit */}
              <div className="mb-5">
                <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Global daily limit</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${usagePercent}%`, backgroundColor: "var(--primary)" }}
                    />
                  </div>
                  <span className="text-sm font-bold min-w-[40px] text-right" style={{ color: "var(--text-primary)" }}>{globalLimit}</span>
                </div>
              </div>

              {/* Per-user Default */}
              <div className="mb-5">
                <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Per-user default limit</label>
                <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)" }}>
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>25 queries / day</span>
                  <Pencil className="w-4 h-4 cursor-pointer" style={{ color: "var(--text-muted)" }} aria-label="Edit per-user limit" />
                </div>
              </div>

              {/* Overage Policy */}
              <div className="mb-5">
                <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Overage policy</label>
                <select
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  aria-label="Overage policy"
                >
                  <option>Soft limit - notify admin</option>
                  <option>Hard limit - block usage</option>
                  <option>No limit</option>
                </select>
              </div>

              {/* Rate Limiting */}
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Rate limiting</label>
                <select
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                  style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  aria-label="Rate limiting"
                >
                  <option>10 requests / minute</option>
                  <option>20 requests / minute</option>
                  <option>50 requests / minute</option>
                  <option>No limit</option>
                </select>
              </div>
            </div>

            {/* AI Feature Toggles */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                AI feature toggles
              </div>
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={feature.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {feature.name}
                    </span>
                    <button
                      onClick={() => toggleFeature(idx)}
                      className="relative shrink-0"
                      style={{
                        width: "44px",
                        height: "24px",
                        borderRadius: "12px",
                        border: "none",
                        background: feature.enabled ? "var(--primary)" : "#d1d5db",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      role="switch"
                      aria-checked={feature.enabled}
                      aria-label={`${feature.enabled ? 'Disable' : 'Enable'} ${feature.name}`}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: feature.enabled ? "22px" : "2px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          transition: "left 0.2s",
                        }}
                        aria-hidden="true"
                      />
                    </button>
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