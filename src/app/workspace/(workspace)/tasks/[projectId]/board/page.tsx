"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  Plus,
  Filter,
  Calendar,
  X,
} from "lucide-react";

// ─── Task Data ──────────────────────────────────────────────────

interface TaskCard {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  category: string;
  date: string;
  avatar: string;
}

const columns = [
  { id: "todo", label: "To Do", dotColor: "bg-zinc-400" },
  { id: "in_progress", label: "In Progress", dotColor: "bg-purple-500" },
  { id: "in_review", label: "In Review", dotColor: "bg-amber-500" },
  { id: "done", label: "Done", dotColor: "bg-green-500" },
];

const initialTasks: Record<string, TaskCard[]> = {
  todo: [
    {
      id: "t1",
      title: "Redesign onboarding flow",
      priority: "high",
      category: "Design",
      date: "Jul 24",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "t2",
      title: "Set up analytics dashboard",
      priority: "medium",
      category: "Data",
      date: "Jul 26",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
  ],
  in_progress: [
    {
      id: "t3",
      title: "API rate limiting",
      priority: "high",
      category: "Backend",
      date: "Jul 22",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "t4",
      title: "Write launch blog post",
      priority: "low",
      category: "Content",
      date: "Jul 28",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
    },
  ],
  in_review: [
    {
      id: "t5",
      title: "QA mobile responsive layout",
      priority: "medium",
      category: "QA",
      date: "Jul 21",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    },
  ],
  done: [
    {
      id: "t6",
      title: "Ship v2 pricing page",
      priority: "high",
      category: "Web",
      date: "Jul 18",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "t7",
      title: "User interview synthesis",
      priority: "medium",
      category: "Research",
      date: "Jul 17",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    },
  ],
};

// ─── Create Task Modal ──────────────────────────────────────────

function CreateTaskModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (task: TaskCard, columnId: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [dueDate, setDueDate] = useState("");
  const [tag, setTag] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(
      {
        id: `t${Date.now()}`,
        title: title.trim(),
        priority,
        category: tag || "General",
        date: dueDate || "Today",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
      },
      status
    );
    onClose();
  };

  const selectClasses = "w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none cursor-pointer";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-lg shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Create task</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Add a clear owner, priority, and next step.
        </p>

        {/* Task Title */}
        <div className="mb-5">
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
            Task title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Status + Priority */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={selectClasses}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              className={selectClasses}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Due Date + Tag */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>
              Tag
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Design"
              className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
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
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title.trim()}
          >
            Create task
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterTasksModal({
  onClose,
  onApply,
  currentFilters,
}: {
  onClose: () => void;
  onApply: (filters: { priority: string; assignee: string }) => void;
  currentFilters: { priority: string; assignee: string };
}) {
  const [priority, setPriority] = useState(currentFilters.priority);
  const [assignee, setAssignee] = useState(currentFilters.assignee);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-lg shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Filter tasks</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Narrow the board without changing the underlying work.
        </p>

        {/* Priority */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>
            Priority
          </label>
          <div className="flex items-center gap-2">
            {["all", "high", "medium", "low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  priority === p
                    ? "bg-purple-600 text-white shadow"
                    : "bgCard borderCard hover:border-zinc-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Assignee */}
        <div className="mb-8">
          <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>
            Assignee
          </label>
          <div className="flex items-center gap-2">
            {["Everyone", "Assigned to me"].map((a) => (
              <button
                key={a}
                onClick={() => setAssignee(a === "Everyone" ? "everyone" : "me")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  (a === "Everyone" && assignee === "everyone") ||
                  (a === "Assigned to me" && assignee === "me")
                    ? "bg-purple-600 text-white shadow"
                    : "bgCard borderCard hover:border-zinc-600"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setPriority("all");
              setAssignee("everyone");
            }}
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
          <button
            onClick={() => {
              onApply({ priority, assignee });
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors"
          >
            Show tasks
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Task Card Component ────────────────────────────────────────

function TaskCardView({ task }: { task: TaskCard }) {
  const priorityStyles = {
    high: "bg-red-500/20 text-red-400",
    medium: "bg-amber-500/20 text-amber-400",
    low: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="bgCard borderCard rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-pointer">
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-800 text-zinc-400">
          {task.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white mb-4 leading-snug">
        {task.title}
      </h3>

      {/* Footer: Date + Avatar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">{task.date}</span>
        </div>
        <img
          src={task.avatar}
          alt=""
          className="w-7 h-7 rounded-full object-cover border border-zinc-700"
        />
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ priority: "all", assignee: "everyone" });

  const addTask = (task: TaskCard, columnId: string) => {
    setTasks({
      ...tasks,
      [columnId]: [...(tasks[columnId] || []), task],
    });
  };

  const getFilteredTasks = (colId: string) => {
    let colTasks = tasks[colId] || [];
    if (filters.priority !== "all") {
      colTasks = colTasks.filter((t) => t.priority === filters.priority);
    }
    return colTasks;
  };

  const hasActiveFilters = filters.priority !== "all" || filters.assignee !== "everyone";

  return (
    <div className="flex-1 flex flex-col overflow-hidden font-sans relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ Header ═══ */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold text-white">
                Website Redesign
              </h1>
              <div className="flex items-center gap-1.5 bg-green-500/10 px-2.5 py-0.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[11px] font-semibold text-green-400">
                  On Track
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">
              Complete brand overhaul and assets update
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilter(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              hasActiveFilters
                ? "border-purple-500/50 bg-purple-600/10 text-purple-400"
                : "border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {hasActiveFilters && (
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            )}
          </button>
          <button
            onClick={() => setShowCreateTask(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {/* ═══ Kanban Board ═══ */}
      <div className="flex-1 px-6 pb-6 overflow-x-auto">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((col) => {
            return (
              <div
                key={col.id}
                className="w-[280px] flex flex-col shrink-0"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                    <span className="text-sm font-bold text-white">
                      {col.label}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-full">
                      {getFilteredTasks(col.id).length}
                    </span>
                  </div>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {getFilteredTasks(col.id).map((task) => (
                    <TaskCardView key={task.id} task={task} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ Create Task Modal ═══ */}
      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onAdd={addTask}
        />
      )}

      {/* ═══ Filter Tasks Modal ═══ */}
      {showFilter && (
        <FilterTasksModal
          onClose={() => setShowFilter(false)}
          onApply={setFilters}
          currentFilters={filters}
        />
      )}
    </div>
  );
}
