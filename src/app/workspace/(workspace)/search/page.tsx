"use client";

import React, { useMemo, useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { FileText, Folder, Search, Video } from "lucide-react";
import { DOCS } from "@/lib/mock/docs";
import { PROJECTS } from "@/lib/mock/projects";
import { MEETINGS } from "@/lib/mock/meetings";

interface Result {
  id: string;
  label: string;
  detail: string;
  href: string;
}

interface ResultGroup {
  id: string;
  label: string;
  icon: typeof FileText;
  empty: string;
  results: Result[];
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const groups = useMemo<ResultGroup[]>(() => {
    const q = query.trim().toLowerCase();
    // An empty query shows everything rather than nothing — the page used to
    // read "No messages found" permanently because the input was not wired to
    // anything at all.
    const matches = (...fields: string[]) =>
      q === "" || fields.some((f) => f.toLowerCase().includes(q));

    return [
      {
        id: "docs",
        label: "Documents",
        icon: FileText,
        empty: "No documents found",
        results: DOCS.filter((d) => matches(d.title, d.description)).map((d) => ({
          id: d.id,
          label: d.title,
          detail: d.description,
          href: `/workspace/docs/${d.id}`,
        })),
      },
      {
        id: "projects",
        label: "Projects",
        icon: Folder,
        empty: "No projects found",
        results: PROJECTS.filter((p) =>
          matches(p.name, p.description, p.category)
        ).map((p) => ({
          id: p.id,
          label: p.name,
          detail: `${p.category} · ${p.status} · ${p.progress}%`,
          href: `/workspace/projects/${p.id}`,
        })),
      },
      {
        id: "meetings",
        label: "Meetings",
        icon: Video,
        empty: "No meetings found",
        results: MEETINGS.filter((m) => matches(m.title)).map((m) => ({
          id: m.id,
          label: m.title,
          detail: `${m.time} · ${m.status}`,
          href: `/workspace/meetings/${m.id}`,
        })),
      },
    ];
  }, [query]);

  const totalResults = groups.reduce((sum, g) => sum + g.results.length, 0);

  return (
    <div
      className="flex-1 overflow-y-auto p-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
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
              Search documents, projects, and meetings
            </label>
            <input
              id="workspace-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents, projects, meetings..."
              className="input-theme w-full pl-9 pr-4 py-2.5 min-h-touch-sm"
            />
          </div>

          <p
            className="text-xs mb-4"
            style={{ color: "var(--text-muted)" }}
            role="status"
            aria-live="polite"
          >
            {query.trim() === ""
              ? `${totalResults} items in this workspace`
              : `${totalResults} ${totalResults === 1 ? "result" : "results"} for “${query.trim()}”`}
          </p>

          <div className="space-y-5">
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <section key={group.id}>
                  <h2
                    className="text-sm font-semibold mb-2 flex items-center gap-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {group.label}
                    <span
                      className="text-xs font-normal"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ({group.results.length})
                    </span>
                  </h2>

                  {group.results.length === 0 ? (
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {group.empty}
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {group.results.map((result) => (
                        <li key={result.id}>
                          <NavLink
                            href={result.href}
                            className="block rounded-xl px-3 py-2 min-h-touch-sm transition-colors hover:bg-theme-secondary"
                          >
                            <span
                              className="block text-sm font-medium"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {result.label}
                            </span>
                            <span
                              className="block text-xs truncate"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {result.detail}
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
