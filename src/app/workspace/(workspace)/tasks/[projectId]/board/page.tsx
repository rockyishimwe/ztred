"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { Modal } from "@/components/ui/Modal";
import { STATUS_COLORS, getProject } from "@/lib/mock/projects";
import {
  LayoutGrid,
  Plus,
  Filter,
  Calendar,
  X,
} from "lucide-react";
import { addDays, format } from "date-fns";

// Due dates are computed relative to today so the mock board never goes stale.
const daysFromNow = (n: number) => format(addDays(new Date(), n), "MMM d");

// ─── Task Data ──────────────────────────────────────────────────

// Stand-in for the signed-in user until auth is wired up; used by the
// "Assigned to me" board filter.
const CURRENT_USER = {
  name: "Jordan Lee",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
};

interface TaskCard {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  category: string;
  date: string;
  avatar: string;
}

const columns = [
  { id: "todo", label: "To Do", dotColor: "bg-theme-muted" },
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
      date: daysFromNow(6),
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "t2",
      title: "Set up analytics dashboard",
      priority: "medium",
      category: "Data",
      date: daysFromNow(8),
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
      date: daysFromNow(4),
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "t4",
      title: "Write launch blog post",
      priority: "low",
      category: "Content",
      date: daysFromNow(10),
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
      date: daysFromNow(3),
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
      date: daysFromNow(-2),
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "t7",
      title: "User interview synthesis",
      priority: "medium",
      category: "Research",
      date: daysFromNow(-4),
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

  const selectClasses = "w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none cursor-pointer";

  return (
    <Modal
      open
      onClose={onClose}
      title="Create task"
      description="Add a clear owner, priority, and next step."
      size="md"
      contained
    >
      <div>

        {/* Task Title */}
        <div className="mb-5">
          <label htmlFor="board-task-title" className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Task title</label>
          <input id="board-task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Status + Priority */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="board-status" className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Status</label>
            <select id="board-status"
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
            <label htmlFor="board-priority" className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Priority</label>
            <select id="board-priority"
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
            <label htmlFor="board-due-date" className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Due date</label>
            <input id="board-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          <div>
            <label htmlFor="board-tag" className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Tag</label>
            <input id="board-tag"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Design"
              className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button type="button"
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title.trim()}
          >
            Create task
          </button>
        </div>
      </div>
    </Modal>
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
    <Modal
      open
      onClose={onClose}
      title="Filter tasks"
      description="Narrow the board without changing the underlying work."
      size="md"
      contained
    >
      <div>

        {/* Priority */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>
            Priority
          </label>
          <div className="flex items-center gap-2">
            {["all", "high", "medium", "low"].map((p) => (
              <button type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  priority === p
                    ? "bg-purple-600 text-white shadow"
                    : "bg-theme-card border border-theme hover:border-theme-hover"
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
              <button type="button"
                key={a}
                onClick={() => setAssignee(a === "Everyone" ? "everyone" : "me")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  (a === "Everyone" && assignee === "everyone") ||
                  (a === "Assigned to me" && assignee === "me")
                    ? "bg-purple-600 text-white shadow"
                    : "bg-theme-card border border-theme hover:border-theme-hover"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button type="button"
            onClick={() => {
              setPriority("all");
              setAssignee("everyone");
            }}
            className="flex items-center gap-1.5 text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
          <button type="button"
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
    </Modal>
  );
}

// ─── Task Card Component ────────────────────────────────────────

function TaskCardView({
  task,
  columnId,
  onDragStart,
  onMove,
  columns,
}: {
  task: TaskCard;
  columnId: string;
  onDragStart: (taskId: string, fromColumn: string) => void;
  onMove: (taskId: string, fromColumn: string, toColumn: string) => void;
  columns: { id: string; label: string }[];
}) {
  const priorityStyles = {
    high: "bg-red-500/20 text-red-400",
    medium: "bg-amber-500/20 text-amber-400",
    low: "bg-green-500/20 text-green-400",
  };

  const index = columns.findIndex((c) => c.id === columnId);

  // Keyboard equivalent of the drag: dragging alone would leave the board
  // unusable without a pointer.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!e.altKey) return;
    const target =
      e.key === "ArrowRight" ? columns[index + 1]
      : e.key === "ArrowLeft" ? columns[index - 1]
      : undefined;
    if (!target) return;
    e.preventDefault();
    onMove(task.id, columnId, target.id);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        // Firefox ignores a drag that sets no data.
        e.dataTransfer.setData("text/plain", task.id);
        onDragStart(task.id, columnId);
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${task.title}, in ${columns[index]?.label ?? columnId}. Hold Alt and press the left or right arrow key to move it between columns.`}
      className="bg-theme-card border border-theme rounded-xl p-4 hover:border-theme-hover focus:outline-none focus-visible:border-theme-accent transition-colors cursor-grab active:cursor-grabbing">
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-theme-surface text-theme-muted">
          {task.category}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-sm font-semibold mb-4 leading-snug"
        style={{ color: "var(--text-primary)" }}
      >
        {task.title}
      </h3>

      {/* Footer: Date + Avatar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-theme-muted">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">{task.date}</span>
        </div>
        <img
          src={task.avatar}
          alt=""
          className="w-7 h-7 rounded-full object-cover border border-theme"
        />
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function TaskBoardPage() {
  // Resolve the [projectId] segment so the board header names the project the
  // URL actually points at instead of always "Website Redesign".
  const params = useParams<{ projectId: string }>();
  const project = getProject(
    typeof params?.projectId === "string" ? params.projectId : undefined
  );

  const [tasks, setTasks] = useState(initialTasks);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ priority: "all", assignee: "everyone" });

  // Drag-and-drop between columns. The board rendered static columns before;
  // there was no way to move a card at all.
  const [dragged, setDragged] = useState<{ taskId: string; from: string } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (taskId: string, fromColumn: string) => {
    setDragged({ taskId, from: fromColumn });
  };

  const moveTask = (taskId: string, from: string, to: string) => {
    if (from === to) return;
    setTasks((prev) => {
      const task = (prev[from] ?? []).find((t) => t.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        [from]: (prev[from] ?? []).filter((t) => t.id !== taskId),
        [to]: [...(prev[to] ?? []), task],
      };
    });
  };

  const handleDrop = (toColumn: string) => {
    setDragOverColumn(null);
    if (!dragged) return;
    moveTask(dragged.taskId, dragged.from, toColumn);
    setDragged(null);
  };

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
    if (filters.assignee === "me") {
      colTasks = colTasks.filter((t) => t.avatar === CURRENT_USER.avatar);
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
              <h1
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </h1>
              <div className="flex items-center gap-1.5 bg-theme-secondary-subtle px-2.5 py-0.5 rounded-full">
                <div
                  className={`w-2 h-2 rounded-full ${STATUS_COLORS[project.status]}`}
                />
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-xs text-theme-muted">{project.description}</p>
            <NavLink
              href={`/workspace/projects/${project.id}`}
              className="text-xs font-medium text-purple-400 hover:underline"
            >
              ← Back to project
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="button"
            onClick={() => setShowFilter(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              hasActiveFilters
                ? "border-purple-500/50 bg-purple-600/10 text-purple-400"
                : "border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {hasActiveFilters && (
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            )}
          </button>
          <button type="button"
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
            const isDropTarget = dragOverColumn === col.id;
            return (
              <div
                key={col.id}
                onDragOver={(e) => {
                  // Without preventDefault the browser refuses the drop.
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (dragOverColumn !== col.id) setDragOverColumn(col.id);
                }}
                onDragLeave={(e) => {
                  // Ignore bubbling leaves from child cards.
                  if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                  setDragOverColumn((current) => (current === col.id ? null : current));
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDrop(col.id);
                }}
                className={`w-[280px] flex flex-col shrink-0 rounded-xl transition-colors ${
                  isDropTarget ? "bg-theme-brand-subtle" : ""
                }`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {col.label}
                    </span>
                    <span className="text-xs font-semibold text-theme-muted bg-theme-surface px-2 py-0.5 rounded-full">
                      {getFilteredTasks(col.id).length}
                    </span>
                  </div>
                  <button type="button" aria-label="Add task to this column" title="Add task to this column" className="hit-area-touch w-7 h-7 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto px-1 pb-1">
                  {getFilteredTasks(col.id).map((task) => (
                    <TaskCardView
                      key={task.id}
                      task={task}
                      columnId={col.id}
                      columns={columns}
                      onDragStart={handleDragStart}
                      onMove={moveTask}
                    />
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
