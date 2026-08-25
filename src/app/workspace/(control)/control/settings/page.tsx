"use client";
import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const tabs = ["General", "Branding", "Notifications", "Integrations", "Danger zone"];

  return (
    <div className="settings-root" style={{ width:"100%", maxWidth:"1180px", margin:"0 auto", padding:"24px", boxSizing:"border-box", overflowX:"hidden" }}>

      <style>{`
        @media (max-width: 900px) { .settings-grid { grid-template-columns:1fr !important; } }
        @media (max-width: 640px) { .settings-root { padding:18px 14px !important; } }
        .peer:checked ~ .toggle-track { background: var(--primary) !important; }
        .peer:checked ~ .toggle-thumb { transform: translateX(20px) !important; }
      `}</style>
      {/* Breadcrumb */}
      <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span>Workspace control</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        <span style={{ color: "var(--primary)" }}>Workspace settings</span>
      </div>

      {/* Title */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"16px", flexWrap:"wrap", marginBottom:"24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-heading)" }}>Workspace settings</h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "6px 0 0" }}>Configure your workspace preferences, branding, and integrations</p>
        </div>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <button style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>Platform console</button>
          <button style={{ padding: "9px 18px", borderRadius: "10px", border: "none", background: "var(--primary)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>+ Invite member</button>
          <button style={{ padding: "9px 18px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:"24px", borderBottom:"1px solid var(--border-color)", marginBottom:"24px", overflowX:"auto", whiteSpace:"nowrap" }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none", border: "none", padding: "0 0 12px",
              fontSize: "14px", fontWeight: 500, cursor: "pointer",
              color: activeTab === tab ? "var(--primary)" : "var(--text-muted)",
              borderBottom: activeTab === tab ? "2px solid var(--primary)" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="settings-grid" style={{ display:"grid", gridTemplateColumns:"minmax(0,2fr) minmax(280px,1fr)", gap:"24px", alignItems:"start" }}>
        {/* Left - 2/3 */}
        <div style={{ minWidth:0, display:"flex", flexDirection:"column", gap:"20px" }}>
          {/* General settings */}
          <div style={{ background: "var(--bg-card)", borderRadius: "14px", border: "1px solid var(--border-color)", padding: "20px", boxSizing:"border-box", minWidth:0, width:"100%" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 20px" }}>General settings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Workspace Name */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Workspace Name</label>
                <input defaultValue="ZTRED Headquarters" style={{ width: "100%", maxWidth:"100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
              {/* Workspace URL */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Workspace URL</label>
                <input defaultValue="ztred-hq.ztred.com" style={{ width: "100%", maxWidth:"100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box" }} />
              </div>
              {/* Workspace Description */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Workspace Description</label>
                <textarea
                  defaultValue="ZTRED core operations hub for design system assets and audit automation."
                  rows={3}
                  style={{ width: "100%", maxWidth:"100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box", resize: "vertical" }}
                />
              </div>
              {/* Timezone + Language */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Timezone</label>
                  <select style={{ width: "100%", maxWidth:"100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box", appearance: "auto" }}>
                    <option>GMT+2 East Africa</option>
                    <option>UTC</option>
                    <option>GMT-5 EST</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Language</label>
                  <select style={{ width: "100%", maxWidth:"100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box", appearance: "auto" }}>
                    <option>English</option>
                    <option>French</option>
                    <option>Swahili</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Default permissions */}
          <div style={{ background: "var(--bg-card)", borderRadius: "14px", border: "1px solid var(--border-color)", padding: "20px", boxSizing:"border-box", minWidth:0, width:"100%" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 20px" }}>Default permissions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Default role */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Default role for new members</label>
                <select style={{ width: "100%", maxWidth:"100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box", appearance: "auto" }}>
                  <option>Member</option>
                  <option>Guest</option>
                  <option>Manager</option>
                </select>
              </div>
              {/* Auto-join channels */}
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Auto-join channels</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["#general", "#announcements"].map(ch => (
                    <span key={ch} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "13px", fontWeight: 500 }}>{ch}</span>
                  ))}
                </div>
              </div>
              {/* Toggles */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px" }}>
                {[
                  { label: "Guest access", on: true },
                  { label: "File sharing", on: true },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
                    <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 500 }}>{item.label}</span>
                    <label style={{ position:"relative", display:"inline-flex", width:"44px", height:"24px", flexShrink:0, cursor:"pointer" }}>
                      <input type="checkbox" defaultChecked={item.on} className="peer sr-only" aria-label={`Toggle ${item.label}`} />
                      <span className="toggle-track" style={{ position:"absolute", inset:0, borderRadius:"12px", background:"var(--border-color)", transition:"background 0.2s" }} />
                      <span className="toggle-thumb" style={{ position:"absolute", top:"2px", left:"2px", width:"20px", height:"20px", borderRadius:"50%", background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,0.2)", transition:"transform 0.2s" }} />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right - 1/3 */}
        <div style={{ minWidth:0, display:"flex", flexDirection:"column", gap:"20px" }}>
          {/* Workspace plan */}
          <div style={{ background: "var(--bg-card)", borderRadius: "14px", border: "1px solid var(--border-color)", padding: "20px", boxSizing:"border-box", minWidth:0, width:"100%" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 20px" }}>Workspace plan</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Current Plan</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", background: "color-mix(in srgb, var(--primary) 12%, transparent)", padding: "3px 10px", borderRadius: "6px" }}>PRO</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Members</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>47 / 100</span>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Storage used</span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>12.4 GB / 50 GB (24%)</span>
                </div>
                <div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "var(--border-color)", overflow: "hidden" }}>
                  <div style={{ width: "24%", height: "100%", borderRadius: "4px", background: "var(--primary)" }} />
                </div>
              </div>
              <button style={{ width: "100%", maxWidth:"100%", padding: "11px", borderRadius: "10px", border: "none", background: "var(--primary)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", marginTop: "4px" }}>Upgrade plan</button>
            </div>
          </div>

          {/* Integrations */}
          <div style={{ background: "var(--bg-card)", borderRadius: "14px", border: "1px solid var(--border-color)", padding: "20px", boxSizing:"border-box", minWidth:0, width:"100%" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 16px" }}>Integrations</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { name: "Slack", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14.5 2a2.5 2.5 0 0 0 0 5h2.5V4.5A2.5 2.5 0 0 0 14.5 2z" fill="#E01E5A"/><path d="M2 14.5a2.5 2.5 0 0 0 5 0V12H4.5A2.5 2.5 0 0 0 2 14.5z" fill="#36C5F0"/><path d="M9.5 22a2.5 2.5 0 0 0 0-5H7v2.5A2.5 2.5 0 0 0 9.5 22z" fill="#2EB67D"/><path d="M22 9.5a2.5 2.5 0 0 0-5 0V12h2.5A2.5 2.5 0 0 0 22 9.5z" fill="#ECB22E"/><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5V7h2.5a2.5 2.5 0 0 0 0-5z" fill="#36C5F0"/><path d="M2 9.5A2.5 2.5 0 0 0 4.5 12H7V9.5a2.5 2.5 0 0 0-5 0z" fill="#2EB67D"/><path d="M14.5 22a2.5 2.5 0 0 0 2.5-2.5V17h-2.5a2.5 2.5 0 0 0 0 5z" fill="#ECB22E"/><path d="M22 14.5a2.5 2.5 0 0 0-2.5-2.5H17v2.5a2.5 2.5 0 0 0 5 0z" fill="#E01E5A"/></svg>
                ), connected: true },
                { name: "Google Workspace", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                ), connected: true },
                { name: "GitHub", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                ), connected: false },
                { name: "Jira", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11.5 2L1 12l3.5 3.5 7-7L11.5 2z" fill="#2684FF"/><path d="M12.5 2L23 12l-3.5 3.5-7-7L12.5 2z" fill="#0052CC"/><path d="M5 16.5L1 20l4 4 4-4-4-3.5z" fill="#2684FF"/><path d="M19 16.5L23 20l-4 4-4-4 4-3.5z" fill="#0052CC"/></svg>
                ), connected: true },
                { name: "Notion", icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c-.73.498-1.077.842-1.077 1.469v13.032c0 .629.346.973 1.077.474l11.005-6.515c.63-.269.63-1.047 0-1.316L4.459 4.208z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M7.8 2.1l9.2 5.4c.8.5.8 1.3 0 1.8L7.8 14.7c-.8.5-1.6.1-1.6-.9V3c0-1 .8-1.4 1.6-.9z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                ), connected: false },
              ].map(item => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: item.connected ? "var(--success)" : "var(--text-muted)" }}>{item.connected ? "Connected" : "Not connected"}</div>
                    </div>
                  </div>
                  <button style={{ padding: "7px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "13px", cursor: "pointer" }}>Configure</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
