"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Folder,
  Upload,
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
  FileText,
  FileJson,
  FileImage,
  File,
  X,
  CloudUpload,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────

const folders = [
  {
    name: "Design Assets",
    files: 42,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/15",
  },
  {
    name: "Documents",
    files: 18,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/15",
  },
  {
    name: "Marketing",
    files: 27,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/15",
  },
];

interface FileItem {
  id: string;
  name: string;
  size: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  avatar: string;
}

const initialFiles: FileItem[] = [
  {
    id: "f1",
    name: "roadmap-v2.pdf",
    size: "1.2 MB",
    time: "2h ago",
    icon: <FileText className="w-5 h-5" />,
    iconBg: "bg-red-500/15 text-red-400",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  },
  {
    id: "f2",
    name: "api-specs.json",
    size: "850 KB",
    time: "5h ago",
    icon: <FileJson className="w-5 h-5" />,
    iconBg: "bg-green-500/15 text-green-400",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  },
  {
    id: "f3",
    name: "project-brief.docx",
    size: "320 KB",
    time: "Yesterday",
    icon: <FileText className="w-5 h-5" />,
    iconBg: "bg-blue-500/15 text-blue-400",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
  },
  {
    id: "f4",
    name: "dashboard-preview.png",
    size: "2.4 MB",
    time: "Yesterday",
    icon: <FileImage className="w-5 h-5" />,
    iconBg: "bg-purple-500/15 text-purple-400",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  },
  {
    id: "f5",
    name: "wireframes.fig",
    size: "4.1 MB",
    time: "2d ago",
    icon: <File className="w-5 h-5" />,
    iconBg: "bg-pink-500/15 text-pink-400",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
  },
  {
    id: "f6",
    name: "Q3-budget.xlsx",
    size: "540 KB",
    time: "3d ago",
    icon: <FileText className="w-5 h-5" />,
    iconBg: "bg-green-500/15 text-green-400",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
  },
];

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return { icon: <FileText className="w-5 h-5" />, bg: "bg-red-500/15 text-red-400" };
    case "json":
      return { icon: <FileJson className="w-5 h-5" />, bg: "bg-green-500/15 text-green-400" };
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return { icon: <FileImage className="w-5 h-5" />, bg: "bg-purple-500/15 text-purple-400" };
    case "fig":
      return { icon: <File className="w-5 h-5" />, bg: "bg-pink-500/15 text-pink-400" };
    case "docx":
    case "doc":
      return { icon: <FileText className="w-5 h-5" />, bg: "bg-blue-500/15 text-blue-400" };
    case "xlsx":
    case "xls":
      return { icon: <FileText className="w-5 h-5" />, bg: "bg-green-500/15 text-green-400" };
    default:
      return { icon: <File className="w-5 h-5" />, bg: "bg-zinc-500/15 text-zinc-400" };
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Upload Modal ───────────────────────────────────────────────

function UploadModal({
  onClose,
  onUpload,
}: {
  onClose: () => void;
  onUpload: (file: FileItem) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleUpload = () => {
    if (!selectedFile) return;
    const { icon, bg } = getFileIcon(selectedFile.name);
    onUpload({
      id: `f${Date.now()}`,
      name: selectedFile.name,
      size: formatSize(selectedFile.size),
      time: "Just now",
      icon,
      iconBg: bg,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-lg shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Upload files</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Your selected file will be shared with this workspace.
        </p>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all mb-4 ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/30"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mb-4">
            <CloudUpload className="w-7 h-7 text-purple-400" />
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Choose a file or drag it here
          </p>
          <p className="text-xs text-zinc-500">
            PDF, DOCX, PNG, FIG, JSON, XLSX
          </p>
        </div>

        {/* Selected File Row */}
        {selectedFile && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 flex items-center gap-3 mb-6">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="flex-1 text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              {selectedFile.name}
            </span>
            <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>
              {formatSize(selectedFile.size)}
            </span>
          </div>
        )}

        {!selectedFile && <div className="mb-6" />}

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload file
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function FilesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [showUpload, setShowUpload] = useState(false);

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const addFile = (file: FileItem) => {
    setFiles([file, ...files]);
  };

  return (
    <div className="flex-1 flex flex-col font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ Header ═══ */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <Folder className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Files</h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {files.length} shared files and assets
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* ═══ Search + View Toggle ═══ */}
      <div className="px-6 pb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full bgCard borderCard rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex items-center bgCard borderCard rounded-xl p-1">
          <button
            onClick={() => setView("grid")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              view === "grid"
                ? "bg-purple-600 text-white shadow"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              view === "list"
                ? "bg-purple-600 text-white shadow"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* Folders */}
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Folders</h2>
          <div className="grid grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className="bgCard borderCard rounded-xl p-4 flex items-center justify-between hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${folder.bgColor}`}
                  >
                    <Folder className={`w-5 h-5 ${folder.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {folder.name}
                    </h3>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {folder.files} files
                    </p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Recent files</h2>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{filteredFiles.length} items</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="bgCard borderCard rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                {/* File Icon + Menu */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${file.iconBg}`}
                  >
                    {file.icon}
                  </div>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* File Info */}
                <h3 className="text-sm font-semibold mb-1 truncate" style={{ color: 'var(--text-primary)' }}>
                  {file.name}
                </h3>
                <p className="text-[11px] mb-3" style={{ color: 'var(--text-muted)' }}>
                  {file.size} • {file.time}
                </p>

                {/* Shared By */}
                <div className="flex items-center gap-2">
                  <img
                    src={file.avatar}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Shared</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Upload Modal ═══ */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={addFile}
        />
      )}
    </div>
  );
}
