"use client";

import React, { useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { Calendar, Clock, Search, Users, Video } from "lucide-react";
import { MEETINGS, type MeetingStatus } from "@/lib/mock/meetings";

const STATUS_STYLES: Record<MeetingStatus, string> = {
  live: "bg-red-500/20 text-red-400",
  upcoming: "bg-blue-500/20 text-blue-400",
  ended: "bg-theme-secondary-subtle text-theme-muted",
};

const FILTERS: { id: "all" | MeetingStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ended", label: "Ended" },
];

export default function MeetingsListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | MeetingStatus>("all");

  const filtered = MEETINGS.filter(
    (m) =>
      (filter === "all" || m.status === filter) &&
      m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex-1 overflow-y-auto p-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-theme-brand-subtle flex items-center justify-center shrink-0">
            <Video className="w-5 h-5 text-theme-brand" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-h2" style={{ color: "var(--text-primary)" }}>
              Meetings
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Join a live call or review what you missed.
            </p>
          </div>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
              aria-hidden="true"
            />
            <label htmlFor="meetings-search" className="sr-only">
              Search meetings
            </label>
            <input
              id="meetings-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meetings..."
              className="input-theme w-full pl-9 pr-4 py-2.5 min-h-touch-sm"
            />
          </div>

          <div className="flex items-center gap-1.5" role="group" aria-label="Filter by status">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: active ? "var(--primary)" : "var(--bg-card)",
                    color: active ? "var(--on-primary)" : "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <ul className="space-y-3">
          {filtered.map((meeting) => (
            <li key={meeting.id}>
              <NavLink
                href={`/workspace/meetings/${meeting.id}`}
                className="card rounded-2xl p-5 flex items-center gap-4 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_STYLES[meeting.status]}`}
                    >
                      {meeting.status}
                    </span>
                    <span
                      className="text-xs flex items-center gap-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {meeting.time}
                    </span>
                  </div>
                  <h2
                    className="font-semibold text-base truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {meeting.title}
                  </h2>
                  <p
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Users className="w-3.5 h-3.5" aria-hidden="true" />
                    {meeting.participants.length}{" "}
                    {meeting.participants.length === 1 ? "participant" : "participants"}
                  </p>
                </div>

                <div className="flex -space-x-2 shrink-0">
                  {meeting.participants.map((p) => (
                    <img
                      key={p.name}
                      src={p.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-theme-card object-cover"
                    />
                  ))}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar
              className="w-8 h-8 mx-auto mb-3"
              style={{ color: "var(--text-muted)" }}
              aria-hidden="true"
            />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No meetings match that search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
