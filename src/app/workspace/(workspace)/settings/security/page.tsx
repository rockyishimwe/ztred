"use client";

import React, { useState } from "react";
import { Shield, CheckCircle } from "lucide-react";

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="max-w-2xl space-y-6">
      {/* ═══ Password & 2FA Section ═══ */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              style={{
                backgroundColor: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* New Password */}
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              style={{
                backgroundColor: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Two-factor authentication
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Add an extra layer of protection
              </p>
            </div>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{
                backgroundColor: twoFactor ? "var(--primary)" : "var(--bg-surface)",
              }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow"
                style={{
                  left: twoFactor ? "26px" : "4px",
                }}
              />
            </button>
          </div>

          {/* Update Password Button */}
          <div className="pt-2">
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Active Sessions Section ═══ */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Active sessions
          </h2>
        </div>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          You&apos;re signed in on 2 devices.
        </p>

        {/* Session Card */}
        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)" }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              MacBook Pro • Current session
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              San Francisco, USA
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-400">
            Active now
          </span>
        </div>
      </div>
    </div>
  );
}
