"use client";

import React, { useState } from "react";
import { Bell, Hash } from "lucide-react";

interface ChannelSetting {
  name: string;
  description: string;
  enabled: boolean;
  option: "all" | "mentions" | "none";
}

export default function NotificationSettingsPage() {
  const [channels, setChannels] = useState<ChannelSetting[]>([
    { name: "general", description: "Company-wide announcements", enabled: true, option: "all" },
    { name: "design", description: "Design team discussions", enabled: true, option: "mentions" },
    { name: "engineering", description: "Engineering updates", enabled: false, option: "none" },
    { name: "random", description: "Random fun stuff", enabled: false, option: "none" },
  ]);

  const [desktop, setDesktop] = useState(true);
  const [email, setEmail] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [sound, setSound] = useState(false);

  const toggleChannel = (index: number) => {
    setChannels((prev) =>
      prev.map((ch, i) => (i === index ? { ...ch, enabled: !ch.enabled } : ch))
    );
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Channel Notifications */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Channel Notifications
        </h2>
        <div className="space-y-3">
          {channels.map((channel, idx) => (
            <div
              key={channel.name}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <Hash className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    #{channel.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {channel.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleChannel(idx)}
                  className="relative w-10 h-5 rounded-full transition-colors"
                  style={{
                    backgroundColor: channel.enabled ? "var(--primary)" : "var(--bg-surface)",
                  }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                    style={{
                      left: channel.enabled ? "22px" : "2px",
                    }}
                  />
                </button>
                <select
                  value={channel.option}
                  onChange={(e) => {
                    const newChannels = [...channels];
                    newChannels[idx].option = e.target.value as "all" | "mentions" | "none";
                    setChannels(newChannels);
                  }}
                  className="text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{
                    backgroundColor: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <option value="all">All messages</option>
                  <option value="mentions">Only mentions & DMs</option>
                  <option value="none">Nothing</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Notification Preferences
        </h2>
        <div className="space-y-4">
          {[
            { label: "Desktop notifications", value: desktop, setter: setDesktop },
            { label: "Email notifications", value: email, setter: setEmail },
            { label: "Mobile push notifications", value: mobile, setter: setMobile },
            { label: "Sound notifications", value: sound, setter: setSound },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </label>
              <button
                onClick={() => item.setter(!item.value)}
                className="relative w-10 h-5 rounded-full transition-colors"
                style={{
                  backgroundColor: item.value ? "var(--primary)" : "var(--bg-surface)",
                }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                  style={{
                    left: item.value ? "22px" : "2px",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
