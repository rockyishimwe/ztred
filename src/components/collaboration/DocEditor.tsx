"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Users, MessageSquareMore, ClipboardList, Heart } from "lucide-react";
import type { DocItem } from "@/lib/mock/docs";

/**
 * Collaborative document editor (local-only stand-in).
 *
 * The previous version wrote a `contenteditable` div into a React-owned node
 * with `innerHTML`. React did not know that content existed, so nothing typed
 * was ever state, it was discarded on any re-render, and there was no save
 * path. This keeps the same contenteditable surface but drives the saved value
 * through React, which is what makes the "saved / unsaved" indicator honest.
 */
export const DocEditor: React.FC<{ doc: DocItem }> = ({ doc }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(true);
  const [content, setContent] = useState(doc.body);
  const [favorite, setFavorite] = useState(doc.starred);
  const [copied, setCopied] = useState(false);

  // Seed the editable surface once per document. Writing `content` back into
  // the node on every keystroke would reset the caret to the start.
  useEffect(() => {
    if (editorRef.current) editorRef.current.textContent = doc.body;
    setContent(doc.body);
    setSaved(true);
  }, [doc.id, doc.body]);

  // Debounced autosave, so the indicator reflects real edits.
  useEffect(() => {
    if (saved) return;
    const timer = setTimeout(() => setSaved(true), 900);
    return () => clearTimeout(timer);
  }, [content, saved]);

  const handleInput = useCallback(() => {
    setContent(editorRef.current?.textContent ?? "");
    setSaved(false);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText(content);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-theme-primary">{doc.title}</h1>
          <div className="flex items-center space-x-2 text-xs text-theme-muted">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" aria-hidden="true" />
              <span>{doc.collaborators} collaborators</span>
            </div>
            <div className="flex items-center space-x-1" role="status" aria-live="polite">
              <div
                className={`w-2 h-2 rounded-full ${saved ? "bg-theme-success" : "bg-theme-warning"}`}
                aria-hidden="true"
              />
              <span>{saved ? "All changes saved" : "Saving…"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Comments"
            title="Comments"
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <MessageSquareMore className="h-4 w-4 text-theme-secondary" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Document copied" : "Copy document"}
            title={copied ? "Copied" : "Copy document"}
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <ClipboardList
              className={`h-4 w-4 ${copied ? "text-theme-success" : "text-theme-secondary"}`}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => setFavorite((f) => !f)}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={favorite}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <Heart
              className={`h-4 w-4 ${favorite ? "fill-current text-theme-danger" : "text-theme-secondary"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div
          ref={editorRef}
          onInput={handleInput}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label={`${doc.title} document body`}
          tabIndex={0}
          className="w-full h-full min-h-[12rem] border border-theme rounded-lg bg-theme-card p-4 text-theme-primary leading-relaxed outline-none focus:border-theme-accent"
        />
      </div>
    </div>
  );
};
