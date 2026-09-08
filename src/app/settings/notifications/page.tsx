"use client";

import React from "react";
import { Bell, Hash } from "lucide-react";

const CHANNEL_NOTIFICATIONS = [
  { id: "general", name: "general", topic: "Company-wide announcements", level: "all" },
  { id: "random", name: "random", topic: "Random fun stuff", level: "mentions" },
];

const DELIVERY_PREFERENCES = [
  { id: "desktop", label: "Desktop notifications", hint: "Show alerts on this device", enabled: true },
  { id: "email", label: "Email notifications", hint: "Digest of what you missed", enabled: false },
  { id: "mobile", label: "Mobile push notifications", hint: "Alerts on the Ztred mobile app", enabled: true },
  { id: "sound", label: "Sound notifications", hint: "Play a sound for new messages", enabled: false },
];

export default function NotificationSettingsPage() {
  return (
    <div className="settings-page">
      <section className="settings-card">
        <div className="flex items-center gap-2 mb-5">
          <Hash className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Channel notifications</h2>
        </div>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {CHANNEL_NOTIFICATIONS.map((channel) => (
            <div
              key={channel.id}
              className="settings-row flex flex-wrap items-center justify-between gap-3 p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)" }}
                >
                  #
                </span>
                <div className="min-w-0">
                  <p className="font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    #{channel.name}
                  </p>
                  <p className="form-hint truncate">{channel.topic}</p>
                </div>
              </div>

              <label className="sr-only" htmlFor={`level-${channel.id}`}>
                Notification level for #{channel.name}
              </label>
              <select
                id={`level-${channel.id}`}
                defaultValue={channel.level}
                className="select-theme px-3 py-2 text-sm min-h-touch-sm"
              >
                <option value="all">All messages</option>
                <option value="mentions">Only mentions &amp; DMs</option>
                <option value="none">Nothing</option>
              </select>
            </div>
          ))}

          <button type="submit" className="btn btn-md btn-primary w-full">
            Save changes
          </button>
        </form>
      </section>

      <section className="settings-card">
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5" style={{ color: "var(--primary)" }} />
          <h2>Notification preferences</h2>
        </div>

        <div className="space-y-3">
          {DELIVERY_PREFERENCES.map((preference) => (
            <label
              key={preference.id}
              className="settings-row flex items-center gap-3 p-3 cursor-pointer"
            >
              <input
                type="checkbox"
                defaultChecked={preference.enabled}
                className="control-theme h-4 w-4 shrink-0"
              />
              <span>
                <span className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {preference.label}
                </span>
                <span className="form-hint">{preference.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
