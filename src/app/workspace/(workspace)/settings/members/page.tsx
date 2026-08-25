"use client";

import React from "react";

const MEMBERS = [
  {
    name: "Sam Rivera",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Lisa Park",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Daniel Kim",
    role: "Member",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

export default function MembersSettingsPage() {
  return (
    <div className="max-w-2xl">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        {MEMBERS.map((member, idx) => (
          <div
            key={member.name}
            className="flex items-center justify-between px-5 py-4"
            style={{
              borderBottom: idx < MEMBERS.length - 1 ? "1px solid var(--border-color)" : "none",
            }}
          >
            <div className="flex items-center gap-4">
              {/* Avatar with Photo */}
              <img
                src={member.avatar}
                alt={member.name}
                className="w-11 h-11 rounded-full object-cover"
              />

              {/* Name + Role */}
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {member.name}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {member.role}
                </p>
              </div>
            </div>

            {/* Role Badge */}
            <span
              className="text-xs px-3 py-1 rounded-lg font-medium"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
