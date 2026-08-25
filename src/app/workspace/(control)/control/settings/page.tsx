"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [workspaceName, setWorkspaceName] = useState("ZTRED Headquarters");
  const [workspaceUrl, setWorkspaceUrl] = useState("ztred-hq.ztred.com");
  const [workspaceDesc, setWorkspaceDesc] = useState("ZTRED core operations hub for design system assets and audit automation.");
  const [timezone, setTimezone] = useState("GMT+2 East Africa");
  const [language, setLanguage] = useState("English");
  const [defaultRole, setDefaultRole] = useState("Member");
  const [guestAccess, setGuestAccess] = useState(true);
  const [fileSharing, setFileSharing] = useState(true);

  const tabs = ["General", "Branding", "Notifications", "Integrations", "Danger zone"];

  const integrations = [
    { name: "Slack", connected: true },
    { name: "Google Workspace", connected: true },
    { name: "GitHub", connected: false },
    { name: "Jira", connected: true },
    { name: "Notion", connected: false },
  ];

  const integrationIcons: Record<string, React.ReactNode> = {
    Slack: (
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#E01E5A" d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0v-5z"/><path fill="#36C5F0" d="M9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4h5z"/><path fill="#2EB67D" d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 0 1-4 0V4a2 2 0 0 1 4 0v5z"/><path fill="#ECB22E" d="M15 18a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 0 1 0-4h5a2 2 0 0 1 0 4h-5z"/></svg>
    ),
    "Google Workspace": (
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
    ),
    GitHub: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#24292f"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
    ),
    Jira: (
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#2684FF" d="M12 2l5.66 5.66a7.4 7.4 0 0 1 0 10.46L12 23.8l-5.66-5.68a7.4 7.4 0 0 1 0-10.46L12 2zm0 5.66L9.17 10.5a3.9 3.9 0 0 0 0 5.5L12 18.83l2.83-2.83a3.9 3.9 0 0 0 0-5.5L12 7.66z"/></svg>
    ),
    Notion: (
      <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#fff" stroke="#37352F" strokeWidth="1.5"/><path fill="#37352F" d="M8 17V7h1.8l4.6 7V7H16v10h-1.8L9.6 10v7H8z"/></svg>
    ),
  };

  return (
    <div style={{ padding: 0 }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "var(--text-secondary)" }}>
        <span>Workspace control</span>
        <span style={{ color: "var(--text-tertiary)" }}>›</span>
        <span style={{ color: "#7c3aed", fontWeight: 500 }}>Workspace settings</span>
      </div>

      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>Workspace settings</h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
            Configure your workspace preferences, branding, and integrations
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{
            padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border)",
            background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "13px",
            fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
          }}>
            Platform console
          </button>
          <button style={{
            padding: "8px 16px", borderRadius: "8px", border: "none",
            background: "#7c3aed", color: "#fff", fontSize: "13px",
            fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
          }}>
            + Invite member
          </button>
          <button style={{
            padding: "8px 16px", borderRadius: "8px", border: "1px solid var(--border)",
            background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "13px",
            fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--border)", marginBottom: "24px" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px", border: "none", background: "transparent",
              color: activeTab === tab ? "#7c3aed" : "var(--text-secondary)",
              fontSize: "14px", fontWeight: activeTab === tab ? 600 : 400,
              cursor: "pointer", position: "relative", whiteSpace: "nowrap",
            }}
          >
            {tab}
            {activeTab === tab && (
              <div style={{
                position: "absolute", bottom: "-1px", left: 0, right: 0,
                height: "2px", background: "#7c3aed", borderRadius: "1px",
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Left column - Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* General settings */}
          <div style={{
            background: "var(--bg-primary)", border: "1px solid var(--border)",
            borderRadius: "12px", padding: "24px",
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 20px 0" }}>
              General settings
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Workspace name */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                  WORKSPACE NAME
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid var(--border)", background: "var(--bg-secondary)",
                    color: "var(--text-primary)", fontSize: "14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Workspace URL */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                  WORKSPACE URL
                </label>
                <input
                  type="text"
                  value={workspaceUrl}
                  onChange={(e) => setWorkspaceUrl(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid var(--border)", background: "var(--bg-secondary)",
                    color: "var(--text-primary)", fontSize: "14px", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Workspace description */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                  WORKSPACE DESCRIPTION
                </label>
                <textarea
                  value={workspaceDesc}
                  onChange={(e) => setWorkspaceDesc(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid var(--border)", background: "var(--bg-secondary)",
                    color: "var(--text-primary)", fontSize: "14px", outline: "none",
                    resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Timezone and Language */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                    TIMEZONE
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "8px",
                      border: "1px solid var(--border)", background: "var(--bg-secondary)",
                      color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
                      outline: "none", boxSizing: "border-box",
                    }}
                  >
                    <option>GMT+2 East Africa</option>
                    <option>GMT+0 London</option>
                    <option>GMT-5 New York</option>
                    <option>GMT-8 Los Angeles</option>
                    <option>GMT+1 Central Europe</option>
                    <option>GMT+5:30 India</option>
                    <option>GMT+8 Singapore</option>
                    <option>GMT+9 Japan</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                    LANGUAGE
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "8px",
                      border: "1px solid var(--border)", background: "var(--bg-secondary)",
                      color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
                      outline: "none", boxSizing: "border-box",
                    }}
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Spanish</option>
                    <option>Portuguese</option>
                    <option>Swahili</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Default permissions */}
          <div style={{
            background: "var(--bg-primary)", border: "1px solid var(--border)",
            borderRadius: "12px", padding: "24px",
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 20px 0" }}>
              Default permissions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Default role */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                  DEFAULT ROLE FOR NEW MEMBERS
                </label>
                <select
                  value={defaultRole}
                  onChange={(e) => setDefaultRole(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    border: "1px solid var(--border)", background: "var(--bg-secondary)",
                    color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
                    outline: "none", boxSizing: "border-box",
                  }}
                >
                  <option>Guest</option>
                  <option>Member</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>

              {/* Auto-join channels */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.05em", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                  AUTO-JOIN CHANNELS
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["#general", "#announcements"].map((ch) => (
                    <span key={ch} style={{
                      padding: "4px 12px", borderRadius: "16px",
                      background: "color-mix(in srgb, var(--primary) 12%, transparent)",
                      color: "#7c3aed", fontSize: "13px", fontWeight: 500,
                    }}>
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggle switches */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* Guest access */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>Guest access</span>
                  <button
                    onClick={() => setGuestAccess(!guestAccess)}
                    style={{
                      width: "44px", height: "24px", borderRadius: "12px", border: "none",
                      background: guestAccess ? "#7c3aed" : "#999",
                      cursor: "pointer", position: "relative", transition: "background 0.2s",
                    }}
                    aria-label={`Guest access ${guestAccess ? "on" : "off"}`}
                  >
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
                      position: "absolute", top: "2px",
                      left: guestAccess ? "22px" : "2px",
                      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }} />
                  </button>
                </div>

                {/* File sharing */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>File sharing</span>
                  <button
                    onClick={() => setFileSharing(!fileSharing)}
                    style={{
                      width: "44px", height: "24px", borderRadius: "12px", border: "none",
                      background: fileSharing ? "#7c3aed" : "#999",
                      cursor: "pointer", position: "relative", transition: "background 0.2s",
                    }}
                    aria-label={`File sharing ${fileSharing ? "on" : "off"}`}
                  >
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
                      position: "absolute", top: "2px",
                      left: fileSharing ? "22px" : "2px",
                      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Workspace plan */}
          <div style={{
            background: "var(--bg-primary)", border: "1px solid var(--border)",
            borderRadius: "12px", padding: "20px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 16px 0" }}>
              Workspace plan
            </h3>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Current Plan</span>
              <span style={{
                padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600,
                background: "color-mix(in srgb, #7c3aed 12%, transparent)",
                color: "#7c3aed",
              }}>
                PRO
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Members</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>47 / 100</span>
            </div>

            <div style={{ marginBottom: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Storage used</span>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>12.4 GB / 50 GB (24%)</span>
              </div>
              <div style={{
                width: "100%", height: "6px", borderRadius: "3px",
                background: "var(--border)", overflow: "hidden",
              }}>
                <div style={{
                  width: "24%", height: "100%", borderRadius: "3px",
                  background: "#7c3aed",
                }} />
              </div>
            </div>

            <button style={{
              width: "100%", padding: "10px 16px", borderRadius: "8px", border: "none",
              background: "#7c3aed", color: "#fff", fontSize: "14px",
              fontWeight: 500, cursor: "pointer", marginTop: "16px",
            }}>
              Upgrade plan
            </button>
          </div>

          {/* Integrations */}
          <div style={{
            background: "var(--bg-primary)", border: "1px solid var(--border)",
            borderRadius: "12px", padding: "20px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 16px 0" }}>
              Integrations
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {integrations.map((integration, idx) => (
                <div key={idx} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: idx < integrations.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "var(--bg-secondary)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      {integrationIcons[integration.name]}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                        {integration.name}
                      </div>
                      <div style={{
                        fontSize: "11px", color: integration.connected ? "#22c55e" : "var(--text-tertiary)",
                      }}>
                        {integration.connected ? "Connected" : "Not connected"}
                      </div>
                    </div>
                  </div>
                  <button style={{
                    padding: "4px 12px", borderRadius: "6px",
                    border: "1px solid var(--border)", background: "var(--bg-primary)",
                    color: "var(--text-secondary)", fontSize: "12px",
                    fontWeight: 500, cursor: "pointer",
                  }}>
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
