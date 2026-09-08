"use client";

import React from "react";
import { KeyRound, ShieldCheck, User } from "lucide-react";

const PROFILE_FIELDS = [
  { id: "name", label: "Full name", type: "text", defaultValue: "Alex Rivera" },
  { id: "email", label: "Email", type: "email", defaultValue: "alex.rivera@ztred.io" },
  { id: "status", label: "Status text", type: "text", defaultValue: "Focusing on ZTRED v2.0 Release 🚀" },
];

export default function AccountSettingsPage() {
  return (
    <div className="settings-page">
      <section className="settings-card">
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Profile</h2>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {PROFILE_FIELDS.map((field) => (
            <div key={field.id} className="form-group">
              <label htmlFor={field.id} className="form-label mb-1 block">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                defaultValue={field.defaultValue}
                className="input-theme w-full px-4 py-2 min-h-touch-sm"
              />
            </div>
          ))}

          <button type="submit" className="btn btn-md btn-primary w-full">
            Save changes
          </button>
        </form>
      </section>

      <section className="settings-card">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Security</h2>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            className="settings-row w-full flex items-center gap-3 p-3 text-left transition-colors hover:border-theme-hover"
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)" }}
            >
              <KeyRound className="w-4 h-4" style={{ color: "var(--primary)" }} />
            </span>
            <span>
              <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Change password
              </span>
              <span className="form-hint">Last updated 3 months ago</span>
            </span>
          </button>

          <label className="settings-row flex items-center gap-3 p-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="control-theme h-4 w-4" />
            <span>
              <span className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Enable two-factor authentication
              </span>
              <span className="form-hint">Require a second factor when signing in</span>
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}
