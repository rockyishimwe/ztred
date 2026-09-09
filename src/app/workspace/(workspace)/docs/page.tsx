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
import { NavLink } from "@/components/ui/NavLink";
import { DOCS, type DocItem } from "@/lib/mock/docs";
import { Modal } from "@/components/ui/Modal";


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
    // The selected template seeds the summary so the choice has an effect.
    const templatePrefix: Record<string, string> = {
      brief: "Project brief: ",
      meeting: "Meeting notes: ",
      plan: "Team plan: ",
    };
    const templateSummary = selectedTemplate
      ? `${templatePrefix[selectedTemplate] ?? ""}${summary}`.trim()
      : summary;
    onCreate({
      id: `doc_${Date.now()}`,
      title: title || "Untitled document",
      description: templateSummary || "New document",
      updated: "Just now",
      readTime: "1 min read",
      starred: false,
      collaborators: 1,
      body: templateSummary || "Start writing…",
    });
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Create a document"
      description="Start from a blank page or a useful template."
    >
      <div>
        {/* Template Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {templates.map((tpl) => (
            <button type="button"
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
          <label htmlFor="docs-title" className="text-sm font-medium text-theme-secondary mb-2 block">Title</label>
          <input id="docs-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label htmlFor="docs-summary" className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Summary</label>
          <textarea id="docs-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="What will this document cover?"
            rows={3}
            className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-touch rounded-xl text-sm font-medium transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-2.5 min-h-touch rounded-xl bg-purple-600 hover:bg-purple-700 text-theme-on-brand text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            Create doc
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function DocsListingPage() {
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState(DOCS);
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
        <button type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
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
            className="w-full bg-theme-card border border-theme rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>
      </div>

      {/* ═══ Document List ═══ */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-3">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-theme-card border border-theme rounded-xl hover:border-theme transition-colors">
            {/* Doc Header */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-card border border-theme flex items-center justify-center">
                    <FileText className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div>
                    <NavLink
                      href={`/workspace/docs/${doc.id}`}
                      className="text-sm font-bold hover:text-purple-400 transition-colors"
                    >
                      {doc.title}
                    </NavLink>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        Updated {doc.updated}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button"
                    onClick={() => toggleStar(doc.id)}
                    className="hit-area-touch w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        doc.starred ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                  <button type="button" aria-label="Document options" title="Document options" className="hit-area-touch w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
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
