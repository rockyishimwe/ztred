"use client";

import React, { useState } from "react";

const AVATARS: Record<string, string> = {
  "sarah.j@ztred.com": "https://randomuser.me/api/portraits/women/44.jpg",
  "john.m@ztred.com": "https://randomuser.me/api/portraits/men/32.jpg",
  "marcus.a@ztred.com": "https://randomuser.me/api/portraits/men/52.jpg",
  "emma.j@ztred.com": "https://randomuser.me/api/portraits/women/68.jpg",
  "michael.t@ztred.com": "https://randomuser.me/api/portraits/men/75.jpg",
};

const CATEGORY_STYLES: Record<string, { color: string; bg: string }> = {
  Permission: { color: "#16a34a", bg: "#dcfce7" },
  Member: { color: "#2563eb", bg: "#dbeafe" },
  Security: { color: "#dc2626", bg: "#fee2e2" },
  Channel: { color: "#16a34a", bg: "#dcfce7" },
  AI: { color: "#d97706", bg: "#fef3c7" },
};

const logs = [
  {
    timestamp: "2026-01-15 14:32:10",
    user: "Sarah Jenkins",
    email: "sarah.j@ztred.com",
    action: "Changed role from Member to Manager",
    category: "Permission",
    target: "clara.vance@ztred.com",
    ip: "192.168.1.45",
  },
  {
    timestamp: "2026-01-15 13:15:04",
    user: "John Mugisha",
    email: "john.m@ztred.com",
    action: "Invited new member clara@ztred.com",
    category: "Member",
    target: "clara.vance@ztred.com",
    ip: "192.168.1.1",
  },
  {
    timestamp: "2026-01-15 12:44:22",
    user: "Marcus Aurelius",
    email: "marcus.a@ztred.com",
    action: "Failed login attempt (3rd)",
    category: "Security",
    target: "Console Login",
    ip: "45.12.89.22",
  },
  {
    timestamp: "2026-01-15 10:30:15",
    user: "Emma Johnson",
    email: "emma.j@ztred.com",
    action: "Updated channel #design to Private",
    category: "Channel",
    target: "#design",
    ip: "88.192.4.15",
  },
  {
    timestamp: "2026-01-15 09:12:40",
    user: "Michael Torres",
    email: "michael.t@ztred.com",
    action: "Modified AI daily limit to 50",
    category: "AI",
    target: "Global Policy",
    ip: "113.44.12.9",
  },
  {
    timestamp: "2026-01-15 08:05:00",
    user: "John Mugisha",
    email: "john.m@ztred.com",
    action: "Suspended user Robert Allen",
    category: "Security",
    target: "robert.a@ztred.com",
    ip: "192.168.1.1",
  },
  {
    timestamp: "2026-01-15 07:44:12",
    user: "Michael Torres",
    email: "michael.t@ztred.com",
    action: "Created new channel #engineering",
    category: "Channel",
    target: "#engineering",
    ip: "113.44.12.9",
  },
  {
    timestamp: "2026-01-14 18:22:31",
    user: "Sarah Jenkins",
    email: "sarah.j@ztred.com",
    action: "Updated 2FA settings",
    category: "Security",
    target: "Security Config",
    ip: "192.168.1.45",
  },
];

const stats = [
  { label: "Total Events", value: "1,247", sub: "THIS WEEK", icon: "list" },
  { label: "Security Events", value: "23", sub: "CRITICAL ACTION", icon: "lock" },
  { label: "Permission Changes", value: "15", sub: "ROLE ASSIGNMENTS", icon: "shield" },
  { label: "Member Activity", value: "89", sub: "INCLUDES GUESTS", icon: "users" },
];

const statIcons: Record<string, React.ReactNode> = {
  list: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  ),
  lock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("Date: Last 7 days");
  const [categoryFilter, setCategoryFilter] = useState("Category: All");
  const [userFilter, setUserFilter] = useState("User: All");
  const [page, setPage] = useState(1);

  const selectStyle: React.CSSProperties = {
    padding: "9px 32px 9px 14px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    outline: "none",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
  };

  return (
    <div className="responsive-padding" style={{ padding: "24px 32px" }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        <span>Workspace control</span>
        <span style={{ color: "var(--text-muted)" }}>›</span>
        <span style={{ color: "var(--primary)", fontWeight: 500 }}>Audit logs</span>
      </div>

      {/* Title row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Audit logs
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              margin: "4px 0 0 0",
            }}
          >
            Track all workspace activity, changes, and security events
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="transition-all hover:brightness-95 active:scale-[0.98]"
            style={{
              padding: "9px 18px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Platform console
          </button>
          <button
            className="transition-all hover:brightness-95 active:scale-[0.98]"
            style={{
              padding: "9px 18px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div
        className="responsive-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                {stat.label}
              </span>
              <span
                style={{ color: "var(--text-secondary)", display: "flex" }}
                aria-hidden="true"
              >
                {statIcons[stat.icon]}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div
        className="responsive-table-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "14px",
          padding: "14px 16px",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div
          style={{
            width: "220px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            padding: "9px 12px",
            background: "var(--bg-card)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search logs"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "13px",
              color: "var(--text-primary)",
              width: "100%",
            }}
          />
        </div>

        {/* Date filter */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Filter by date"
          style={selectStyle}
        >
          <option>Date: Last 7 days</option>
          <option>Date: Last 30 days</option>
          <option>Date: Last 90 days</option>
          <option>Date: All time</option>
        </select>

        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          style={selectStyle}
        >
          <option>Category: All</option>
          <option>Category: Permission</option>
          <option>Category: Member</option>
          <option>Category: Security</option>
          <option>Category: Channel</option>
          <option>Category: AI</option>
        </select>

        {/* User filter */}
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          aria-label="Filter by user"
          style={selectStyle}
        >
          <option>User: All</option>
          <option>User: Sarah Jenkins</option>
          <option>User: John Mugisha</option>
          <option>User: Marcus Aurelius</option>
          <option>User: Emma Johnson</option>
          <option>User: Michael Torres</option>
        </select>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Export logs */}
        <button
          className="transition-all hover:brightness-110 active:scale-[0.98]"
          style={{
            padding: "9px 20px",
            borderRadius: "10px",
            border: "none",
            background: "var(--primary)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Export logs
        </button>
      </div>

      {/* Table card */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr>
                {["Timestamp", "User", "Action", "Category", "Target/Details", "IP Address"].map(
                  (col) => (
                    <th
                      key={col}
                      scope="col"
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-color)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => {
                const catStyle = CATEGORY_STYLES[log.category];
                return (
                  <tr
                    key={idx}
                    style={{
                      borderBottom:
                        idx < logs.length - 1 ? "1px solid var(--border-color)" : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.timestamp}
                    </td>
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={AVATARS[log.email]}
                          alt={log.user}
                          width={30}
                          height={30}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {log.user}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.action}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: catStyle.color,
                          background: catStyle.bg,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {log.category}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.target}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.ip}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 16px",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            Showing 1-10 of 1,247 events
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="transition-all hover:brightness-95 active:scale-[0.98]"
              style={{
                padding: "7px 16px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: page === 1 ? "var(--text-muted)" : "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="transition-all hover:brightness-95 active:scale-[0.98]"
              style={{
                padding: "7px 16px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
