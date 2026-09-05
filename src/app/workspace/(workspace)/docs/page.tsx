"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  MoreHorizontal,
  Star,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────────

interface DocItem {
  id: string;
  title: string;
  description: string;
  updated: string;
  readTime: string;
  starred: boolean;
  hasOverview?: boolean;
  overviewText?: string;
  keyOutcomes?: string[];
}

const initialDocs: DocItem[] = [
  {
    id: "doc_1",
    title: "Product Requirements Doc",
    description:
      "The complete PRD for the Q3 launch including scope, milestones and success metrics.",
    updated: "2h ago",
    readTime: "4 min read",
    starred: false,
    hasOverview: true,
    overviewText:
      "The complete PRD for the Q3 launch including scope, milestones and success metrics. This shared document keeps the team aligned on decisions, scope, and next steps.",
    keyOutcomes: [
      "Keep decisions and requirements visible to the whole workspace",
    ],
  },
  {
    id: "doc_2",
    title: "Brand Guidelines",
    description:
      "Logo usage, color palette, typography and tone of voice for the Zenith brand.",
    updated: "3d ago",
    readTime: "4 min read",
    starred: false,
  },
  {
    id: "doc_3",
    title: "Sprint Planning Notes",
    description:
      "Notes from weekly sprint planning and retrospective sessions.",
    updated: "5d ago",
    readTime: "4 min read",
    starred: false,
  },
  {
    id: "doc_4",
    title: "API Documentation",
    description:
      "REST API reference, authentication, rate limits and deployment workflows.",
    updated: "1w ago",
    readTime: "4 min read",
    starred: false,
  },
];

// ─── Create Doc Modal ───────────────────────────────────────────

function CreateDocModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (doc: DocItem) => void;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [title, setTitle] = useState("Untitled document");
  const [summary, setSummary] = useState("");

  const templates = [
    { id: "brief", name: "Project brief" },
    { id: "meeting", name: "Meeting notes" },
    { id: "plan", name: "Team plan" },
  ];

  const handleCreate = () => {
    onCreate({
      id: `doc_${Date.now()}`,
      title: title || "Untitled document",
      description: summary || "New document",
      updated: "Just now",
      readTime: "1 min read",
      starred: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-lg shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Create a document</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Start from a blank page or a useful template.
        </p>

        {/* Template Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() =>
                setSelectedTemplate(
                  selectedTemplate === tpl.id ? null : tpl.id
                )
              }
              className={`rounded-xl p-4 flex flex-col items-start gap-3 transition-all ${
                selectedTemplate === tpl.id
                  ? "border-purple-500/50 ring-1 ring-purple-500/30"
                  : "border-theme hover:border-theme-hover"
              }`}
            >
              {/* Template icon */}
              <div className="flex gap-0.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-6 rounded-sm" style={{ backgroundColor: 'var(--text-muted)' }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-left" style={{ color: 'var(--text-secondary)' }}>
                {tpl.name}
              </span>
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-medium text-theme-secondary mb-2 block">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="What will this document cover?"
            rows={3}
            className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-theme-primary text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Create doc
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function DocsListingPage() {
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState(initialDocs);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const addDoc = (doc: DocItem) => {
    setDocs([doc, ...docs]);
  };

  const toggleStar = (id: string) => {
    setDocs(
      docs.map((d) => (d.id === id ? { ...d, starred: !d.starred } : d))
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden font-sans relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ Header ═══ */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Docs</h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Your team&apos;s knowledge base
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-theme-primary font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Doc
        </button>
      </div>

      {/* ═══ Search ═══ */}
      <div className="px-6 pb-5">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search docs..."
            className="w-full bgCard borderCard rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>
      </div>

      {/* ═══ Document List ═══ */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-3">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bgCard borderCard rounded-xl hover:border-theme transition-colors">
            {/* Doc Header */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bgCard borderCard flex items-center justify-center">
                    <FileText className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div>
                    <Link
                      href={`/workspace/docs/${doc.id}`}
                      className="text-sm font-bold hover:text-purple-400 transition-colors"
                    >
                      {doc.title}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        Updated {doc.updated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStar(doc.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        doc.starred ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed ml-[52px]" style={{ color: 'var(--text-muted)' }}>
                {doc.description}
              </p>
            </div>

            {/* Expanded Overview (first doc) */}
            {doc.hasOverview && doc.overviewText && (
              <div className="border-t px-5 py-4 ml-[52px]" style={{ borderColor: 'var(--border-color)' }}>
                <h4 className="text-xs font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Overview</h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                  {doc.overviewText}
                </p>
                {doc.keyOutcomes && doc.keyOutcomes.length > 0 && (
                  <>
                    <h4 className="text-xs font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      Key outcomes
                    </h4>
                    <ul className="space-y-1">
                      {doc.keyOutcomes.map((outcome, i) => (
                        <li
                          key={i}
                          className="text-xs flex items-start gap-2"
                        >
                          <span className="text-purple-400 mt-0.5">•</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* Read time footer */}
            <div className="px-5 py-2.5 flex items-center justify-end" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <Clock className="w-3 h-3" />
                {doc.readTime}
              </span>
            </div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <FileText className="w-12 h-12 mb-4" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm font-medium">No documents found</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Try a different search or create a new doc
            </p>
          </div>
        )}
      </div>

      {/* ═══ Create Doc Modal ═══ */}
      {showCreateModal && (
        <CreateDocModal
          onClose={() => setShowCreateModal(false)}
          onCreate={addDoc}
        />
      )}
    </div>
  );
}
