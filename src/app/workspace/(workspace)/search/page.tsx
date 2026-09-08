"use client";

import React from "react";
import { Search } from "lucide-react";

const RESULT_GROUPS = [
  { id: "messages", label: "Messages", empty: "No messages found" },
  { id: "people", label: "People", empty: "No people found" },
  { id: "files", label: "Files", empty: "No files found" },
];

export default function SearchPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-h2 mb-6" style={{ color: "var(--text-primary)" }}>
          Search
        </h1>

        <div className="settings-card">
          <div className="relative mb-5">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
              aria-hidden="true"
            />
            <label htmlFor="workspace-search" className="sr-only">
              Search messages, people, and files
            </label>
            <input
              id="workspace-search"
              type="search"
              placeholder="Search messages, people, files..."
              className="input-theme w-full pl-9 pr-4 py-2.5 min-h-touch-sm"
            />
          </div>

          <div className="space-y-4">
            {RESULT_GROUPS.map((group) => (
              <div
                key={group.id}
                className="pb-3"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {group.label}
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {group.empty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
