"use client";

import React, { useState } from "react";
import {
  Settings,
  Share2,
  Pencil,
  Plus,
  Folder,
  Calendar,
  CheckCircle,
  List,
  Clipboard,
  User,
  Users,
  BarChart,
  Filter,
  ListTodo,
  X,
  Globe,
  Terminal,
  AlertTriangle,
  Check,
} from "lucide-react";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: "On Track" | "At Risk" | "Off Track";
  progress: number;
  startDate: string;
  deadline: string;
  priority: string;
  category: string;
  createdBy: string;
  tasks: {
    total: number;
    todo: number;
    inProgress: number;
    inReview: number;
    done: number;
  };
  members: {
    name: string;
    role: string;
    avatar: string;
  }[];
  activity: {
    name: string;
    action: string;
    target: string;
    time: string;
    avatar: string;
  }[];
}

const PROJECT_DATA: ProjectData = {
  id: "1",
  name: "Website Redesign",
  description: "Complete brand overhaul and assets update",
  status: "On Track",
  progress: 72,
  startDate: "Oct 01, 2026",
  deadline: "Dec 31, 2026",
  priority: "High",
  category: "Design",
  createdBy: "Sam Rivera",
  tasks: {
    total: 12,
    todo: 4,
    inProgress: 5,
    inReview: 1,
    done: 2,
  },
  members: [
    { name: "Sam Rivera", role: "Admin", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" },
    { name: "Lisa Park", role: "Editor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80" },
    { name: "Jordan Lee", role: "Editor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80" },
    { name: "Daniel Kim", role: "Viewer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" },
  ],
  activity: [
    {
      name: "Sam Rivera",
      action: 'moved "Design header" to',
      target: "In Progress",
      time: "10m ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    {
      name: "Lisa Park",
      action: 'completed "User flow wireframes"',
      target: "",
      time: "1h ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    },
    {
      name: "Jordan Lee",
      action: 'commented on "Content mapping review"',
      target: "",
      time: "4h ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  "On Track": "bg-emerald-500",
  "At Risk": "bg-orange-500",
  "Off Track": "bg-red-500",
};

// ─── Board Data ─────────────────────────────────────────────────

interface BoardTask {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  date: string;
  subtasksDone?: number;
  subtasksTotal?: number;
  avatar: string;
}

const BOARD_COLUMNS = [
  { id: "todo", label: "To Do" },
  { id: "inProgress", label: "In Progress" },
  { id: "inReview", label: "In Review" },
  { id: "done", label: "Done" },
];

const INITIAL_BOARD: Record<string, BoardTask[]> = {
  todo: [
    {
      id: "b1",
      title: "Design hero section",
      priority: "High",
      category: "Design",
      date: "Oct 05",
      subtasksDone: 1,
      subtasksTotal: 4,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b2",
      title: "Create testimonials block",
      priority: "Medium",
      category: "Design",
      date: "Oct 08",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b3",
      title: "Build pricing page",
      priority: "High",
      category: "Engineering",
      date: "Oct 12",
      subtasksDone: 0,
      subtasksTotal: 3,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b4",
      title: "Write FAQ content",
      priority: "Low",
      category: "Marketing",
      date: "Oct 15",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
    },
  ],
  inProgress: [
    {
      id: "b5",
      title: "Implement navigation",
      priority: "High",
      category: "Engineering",
      date: "Oct 03",
      subtasksDone: 2,
      subtasksTotal: 3,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b6",
      title: "Design footer",
      priority: "Low",
      category: "Design",
      date: "Oct 06",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b7",
      title: "Set up CMS",
      priority: "Medium",
      category: "Backend",
      date: "Oct 09",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    },
  ],
  inReview: [
    {
      id: "b8",
      title: "Homepage wireframe",
      priority: "High",
      category: "Design",
      date: "Oct 01",
      subtasksDone: 5,
      subtasksTotal: 9,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b9",
      title: "Color palette approval",
      priority: "High",
      category: "Design",
      date: "Sep 29",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
    },
  ],
  done: [
    {
      id: "b10",
      title: "Project brief",
      priority: "Low",
      category: "Operations",
      date: "Sep 24",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b11",
      title: "Competitor analysis",
      priority: "Medium",
      category: "Research",
      date: "Sep 26",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    },
    {
      id: "b12",
      title: "Brand mood board",
      priority: "High",
      category: "Design",
      date: "Sep 28",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    },
  ],
};

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-amber-500/20 text-amber-400",
  Low: "bg-blue-500/20 text-blue-400",
};

// ─── Activity Feed Data ─────────────────────────────────────────

interface ActivityItem {
  id: string;
  type: "tasks" | "comments" | "members" | "files";
  actor: string;
  avatar: string;
  time: string;
  day: string; // group label e.g. "TODAY"
  segments: { text: string; link?: boolean }[];
}

const ACTIVITY_FILTERS = [
  { key: "all", label: "All" },
  { key: "tasks", label: "Tasks" },
  { key: "comments", label: "Comments" },
  { key: "members", label: "Members" },
  { key: "files", label: "Files" },
];

const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "a1",
    type: "tasks",
    actor: "Sam Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    time: "10:32 AM",
    day: "TODAY",
    segments: [
      { text: " moved task " },
      { text: "\u201cDesign hero section\u201d", link: true },
      { text: " to " },
      { text: "In Progress", link: true },
    ],
  },
  {
    id: "a2",
    type: "tasks",
    actor: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    time: "9:15 AM",
    day: "TODAY",
    segments: [
      { text: " completed task " },
      { text: "\u201cUser flow wireframes\u201d", link: true },
    ],
  },
  {
    id: "a3",
    type: "comments",
    actor: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    time: "8:45 AM",
    day: "TODAY",
    segments: [
      { text: " added a comment on " },
      { text: "\u201cHomepage wireframe\u201d", link: true },
    ],
  },
  {
    id: "a4",
    type: "members",
    actor: "Daniel Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    time: "4:30 PM",
    day: "YESTERDAY",
    segments: [
      { text: " viewed the " },
      { text: "project board", link: true },
    ],
  },
  {
    id: "a5",
    type: "tasks",
    actor: "Sam Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    time: "2:15 PM",
    day: "YESTERDAY",
    segments: [
      { text: " created task " },
      { text: "\u201cWrite FAQ content\u201d", link: true },
    ],
  },
  {
    id: "a6",
    type: "tasks",
    actor: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    time: "11:00 AM",
    day: "YESTERDAY",
    segments: [
      { text: " changed priority of " },
      { text: "\u201cBuild pricing page\u201d", link: true },
      { text: " to " },
      { text: "High", link: true },
    ],
  },
  {
    id: "a7",
    type: "files",
    actor: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    time: "6:20 PM",
    day: "JUL 28, 2026",
    segments: [
      { text: " uploaded 2 files to " },
      { text: "\u201cBrand mood board\u201d", link: true },
    ],
  },
  {
    id: "a8",
    type: "members",
    actor: "Daniel Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    time: "3:05 PM",
    day: "JUL 28, 2026",
    segments: [
      { text: " joined the project as " },
      { text: "Viewer", link: true },
    ],
  },
];

// ─── Board Task Card ────────────────────────────────────────────

function BoardTaskCard({ task }: { task: BoardTask }) {
  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01]"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
      }}
    >
      <h4
        className="text-sm font-semibold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {task.title}
      </h4>
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${PRIORITY_STYLES[task.priority]}`}
        >
          {task.priority}
        </span>
        <span
          className="px-2 py-0.5 rounded-md text-[11px] font-medium"
          style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-muted)" }}
        >
          {task.category}
        </span>
      </div>
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
            <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
              {task.date}
            </span>
          </div>
          {task.subtasksTotal !== undefined && (
            <div className="flex items-center gap-1.5">
              <ListTodo className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
              <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                {task.subtasksDone}/{task.subtasksTotal}
              </span>
            </div>
          )}
        </div>
        <img
          src={task.avatar}
          alt=""
          className="w-6 h-6 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

// ─── New Task Modal ─────────────────────────────────────────────

function NewTaskModal({
  onClose,
  defaultColumn,
  onAdd,
}: {
  onClose: () => void;
  defaultColumn: string;
  onAdd: (task: BoardTask, columnId: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState(defaultColumn);
  const [priority, setPriority] = useState<BoardTask["priority"]>("Medium");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const inputStyle = {
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(
      {
        id: `b${Date.now()}`,
        title: title.trim(),
        priority,
        category: category.trim() || "General",
        date: date
          ? new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit" })
          : "Today",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      },
      column
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Create new task
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Add a clear owner, priority, and next step.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Status
            </label>
            <select
              value={column}
              onChange={(e) => setColumn(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
              style={inputStyle}
            >
              {BOARD_COLUMNS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as BoardTask["priority"])}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
              style={inputStyle}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Due Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Design"
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!title.trim()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Tasks Modal ─────────────────────────────────────────

function FilterTasksModal({
  onClose,
  onApply,
  currentFilters,
}: {
  onClose: () => void;
  onApply: (filters: { priority: string }) => void;
  currentFilters: { priority: string };
}) {
  const [priority, setPriority] = useState(currentFilters.priority);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Filter tasks
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Narrow the board without changing the underlying work.
        </p>

        <label className="block text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
          Priority
        </label>
        <div className="flex items-center gap-2 mb-8">
          {["All", "High", "Medium", "Low"].map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                priority === p ? "text-white" : ""
              }`}
              style={{
                backgroundColor: priority === p ? "var(--primary)" : "var(--bg-input)",
                border: `1px solid ${priority === p ? "var(--primary)" : "var(--border-color)"}`,
                color: priority === p ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              {p}
            </button>
          ))
          }
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setPriority("All")}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
          <button
            onClick={() => {
              onApply({ priority });
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Show tasks
          </button>
        </div>
      </div>
    </div>
  );
}

const TASK_STATUSES = [
  { key: "total", label: "Total Tasks", color: "var(--text-primary)" },
  { key: "todo", label: "To Do", color: "#3b82f6" },
  { key: "inProgress", label: "In Progress", color: "#f97316" },
  { key: "inReview", label: "In Review", color: "#8b5cf6" },
  { key: "done", label: "Done", color: "#22c55e" },
];

export default function ProjectOverviewPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const project = PROJECT_DATA;
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState("todo");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ priority: "All" });
  const [activityFilter, setActivityFilter] = useState("all");

  // Settings state
  const [settingsName, setSettingsName] = useState(project.name);
  const [settingsDescription, setSettingsDescription] = useState(
    "Complete brand overhaul and assets updates for standard platform viewports."
  );
  const [settingsCategory, setSettingsCategory] = useState(project.category);
  const [settingsPriority, setSettingsPriority] = useState(project.priority);
  const [settingsStartDate, setSettingsStartDate] = useState(project.startDate);
  const [settingsDeadline, setSettingsDeadline] = useState(project.deadline);
  const [settingsStatus, setSettingsStatus] = useState(project.status);
  const [themeColor, setThemeColor] = useState("purple");
  const [workspaceIcon, setWorkspaceIcon] = useState("folder");

  const addBoardTask = (task: BoardTask, columnId: string) => {
    setBoard((prev) => ({
      ...prev,
      [columnId]: [...(prev[columnId] || []), task],
    }));
  };

  const getBoardTasks = (colId: string) => {
    let colTasks = board[colId] || [];
    if (filters.priority !== "All") {
      colTasks = colTasks.filter((t) => t.priority === filters.priority);
    }
    return colTasks;
  };

  const hasActiveFilters = filters.priority !== "All";

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "board", label: "Board" },
    { key: "members", label: "Members" },
    { key: "activity", label: "Activity" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ═══ Header ═══ */}
      <div
        className="px-8 py-5 shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {project.name}
              </h1>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[project.status]}`} />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === "board" ? (
              <>
                <button
                  onClick={() => setShowFilter(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: hasActiveFilters ? "rgba(139, 92, 246, 0.1)" : "var(--bg-card)",
                    border: `1px solid ${hasActiveFilters ? "var(--primary)" : "var(--border-color)"}`,
                    color: hasActiveFilters ? "var(--primary)" : "var(--text-secondary)",
                  }}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  {hasActiveFilters && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />}
                </button>
                <button
                  onClick={() => {
                    setNewTaskColumn("todo");
                    setShowNewTask(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Plus className="w-4 h-4" />
                  New Task
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-muted)",
                  }}
                  aria-label="Project settings"
                >
                  <Settings className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6" role="tablist" aria-label="Project sections">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-controls={`panel-${tab.key}`}
              id={`tab-${tab.key}`}
              className="text-sm font-medium pb-3 transition-colors relative"
              style={{
                color: activeTab === tab.key ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "board" && (
          <div className="flex gap-5 p-6 h-full min-h-0" role="tabpanel" id="panel-board" aria-labelledby="tab-board">
            {BOARD_COLUMNS.map((col) => {
              const colTasks = getBoardTasks(col.id);
              const totalCount = (board[col.id] || []).length;
              return (
                <div
                  key={col.id}
                  className="w-[280px] flex flex-col shrink-0 rounded-2xl p-4"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                        {col.label}
                      </span>
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}
                      >
                        {totalCount}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setNewTaskColumn(col.id);
                        setShowNewTask(true);
                      }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      aria-label={`Add task to ${col.label}`}
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Column Cards */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {colTasks.length === 0 ? (
                      <p
                        className="text-xs text-center py-8"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {hasActiveFilters ? "No matching tasks" : "No tasks yet"}
                      </p>
                    ) : (
                      colTasks.map((task) => <BoardTaskCard key={task.id} task={task} />)
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="px-8 py-6 max-w-5xl" role="tabpanel" id="panel-activity" aria-labelledby="tab-activity">
            {/* Filter Chips */}
            <div className="flex items-center gap-2 mb-6">
              {ACTIVITY_FILTERS.map((f) => {
                const isActive = activityFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActivityFilter(f.key)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive ? "text-white" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? "var(--primary)" : "var(--bg-card)",
                      border: `1px solid ${isActive ? "var(--primary)" : "var(--border-color)"}`,
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Grouped Feed */}
            {(() => {
              const filtered =
                activityFilter === "all"
                  ? ACTIVITY_FEED
                  : ACTIVITY_FEED.filter((a) => a.type === activityFilter);
              const days: string[] = [];
              filtered.forEach((a) => {
                if (!days.includes(a.day)) days.push(a.day);
              });

              if (filtered.length === 0) {
                return (
                  <p className="text-sm py-12 text-center" style={{ color: "var(--text-muted)" }}>
                    No activity to show
                  </p>
                );
              }

              return days.map((day) => (
                <div key={day} className="mb-6">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {day}
                  </p>
                  <div className="space-y-3">
                    {filtered
                      .filter((a) => a.day === day)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 rounded-xl px-4 py-3.5"
                          style={{
                            backgroundColor: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                          }}
                        >
                          <img
                            src={item.avatar}
                            alt={item.actor}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                          <div>
                            <p className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
                              <span
                                className="font-bold"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {item.actor}
                              </span>
                              {item.segments.map((seg, i) =>
                                seg.link ? (
                                  <span
                                    key={i}
                                    className="font-semibold cursor-pointer hover:underline"
                                    style={{ color: "var(--primary)" }}
                                  >
                                    {seg.text}
                                  </span>
                                ) : (
                                  <span key={i}>{seg.text}</span>
                                )
                              )}
                            </p>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                              {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}

        {activeTab === "settings" && (
        <div className="flex gap-6 p-8" role="tabpanel" id="panel-settings" aria-labelledby="tab-settings">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* General Settings */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h3 className="text-base font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                General Settings
              </h3>

              <div className="space-y-5">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={settingsName}
                    onChange={(e) => setSettingsName(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    style={{
                      backgroundColor: "var(--bg-input)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                    Description
                  </label>
                  <textarea
                    value={settingsDescription}
                    onChange={(e) => setSettingsDescription(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                    style={{
                      backgroundColor: "var(--bg-input)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                      Category
                    </label>
                    <select
                      value={settingsCategory}
                      onChange={(e) => setSettingsCategory(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={{
                        backgroundColor: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="Design">Design</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Backend">Backend</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                      Priority
                    </label>
                    <select
                      value={settingsPriority}
                      onChange={(e) => setSettingsPriority(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={{
                        backgroundColor: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Status */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h3 className="text-base font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Timeline & Status
              </h3>

              <div className="space-y-5">
                {/* Start Date & Deadline */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                      Start Date
                    </label>
                    <select
                      value={settingsStartDate}
                      onChange={(e) => setSettingsStartDate(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={{
                        backgroundColor: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="Oct 01, 2026">Oct 01, 2026</option>
                      <option value="Nov 01, 2026">Nov 01, 2026</option>
                      <option value="Dec 01, 2026">Dec 01, 2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                      Deadline
                    </label>
                    <select
                      value={settingsDeadline}
                      onChange={(e) => setSettingsDeadline(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={{
                        backgroundColor: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="Dec 31, 2026">Dec 31, 2026</option>
                      <option value="Jan 31, 2027">Jan 31, 2027</option>
                      <option value="Feb 28, 2027">Feb 28, 2027</option>
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                    Status
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[settingsStatus]}`} />
                    </div>
                    <select
                      value={settingsStatus}
                      onChange={(e) => setSettingsStatus(e.target.value as typeof settingsStatus)}
                      className="w-full rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={{
                        backgroundColor: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <option value="On Track">On Track</option>
                      <option value="At Risk">At Risk</option>
                      <option value="Off Track">Off Track</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 shrink-0 space-y-6">
            {/* Appearance */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h3 className="text-sm font-bold mb-5" style={{ color: "var(--text-primary)" }}>
                Appearance
              </h3>

              {/* Project Theme Color */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                  Project Theme Color
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { id: "purple", color: "#9333ea" },
                    { id: "green", color: "#22c55e" },
                    { id: "orange", color: "#f97316" },
                    { id: "pink", color: "#ec4899" },
                    { id: "blue", color: "#3b82f6" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setThemeColor(c.id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{ backgroundColor: c.color }}
                    >
                      {themeColor === c.id && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Workspace Icon */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                  Workspace Icon
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { id: "folder", icon: Folder },
                    { id: "globe", icon: Globe },
                    { id: "settings", icon: Settings },
                    { id: "terminal", icon: Terminal },
                  ].map((ic) => {
                    const Icon = ic.icon;
                    const isActive = workspaceIcon === ic.id;
                    return (
                      <button
                        key={ic.id}
                        onClick={() => setWorkspaceIcon(ic.id)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: isActive ? "var(--bg-input)" : "var(--bg-surface)",
                          border: `1px solid ${isActive ? "var(--primary)" : "var(--border-color)"}`,
                          color: isActive ? "var(--primary)" : "var(--text-muted)",
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save Changes Button */}
              <button
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Save Changes
              </button>
            </div>

            {/* Danger Zone */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "2px solid var(--danger)" }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--danger)" }}>
                Danger Zone
              </h3>
              <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
                These actions cannot be undone. Please proceed with caution.
              </p>

              <div className="space-y-3">
                <button
                  className="w-full py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: "var(--bg-input)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Archive Project
                </button>
                <button
                  className="w-full py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: "var(--bg-input)",
                    border: "1px solid var(--danger)",
                    color: "var(--danger)",
                  }}
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeTab !== "board" && activeTab !== "activity" && activeTab !== "settings" && (
        <div className="flex gap-6 p-8" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Progress Card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="flex items-center gap-5">
                {/* Progress Circle */}
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="var(--bg-surface)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - project.progress / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>
                      {project.progress}%
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    On Track for Release
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    Your team has completed 2 done tasks this week. Keep up the high velocity momentum.
                  </p>
                </div>
              </div>
            </div>

            {/* Task Breakdown */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h3 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Workspace Task Breakdown
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {TASK_STATUSES.map((ts) => (
                  <div
                    key={ts.key}
                    className="rounded-xl p-4 text-center"
                    style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)" }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: ts.color }}
                    >
                      {project.tasks[ts.key as keyof typeof project.tasks]}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {ts.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h3 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {project.activity.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                          {item.name}
                        </span>{" "}
                        {item.action}
                        {item.target && (
                          <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                            {" "}
                            {item.target}
                          </span>
                        )}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 shrink-0 space-y-6">
            {/* Project Details */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Project Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Start Date</span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{project.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Deadline</span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{project.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Priority</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-red-500/20 text-red-400">
                    {project.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Category</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-md font-medium"
                    style={{ backgroundColor: "var(--bg-surface)", color: "var(--text-secondary)" }}
                  >
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>Created By</span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{project.createdBy}</span>
                </div>
              </div>
            </div>

            {/* Members */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  Members ({project.members.length})
                </h3>
                <button
                  className="text-xs font-semibold transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  + Add
                </button>
              </div>
              <div className="space-y-3">
                {project.members.map((member) => (
                  <div key={member.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {member.name}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ═══ New Task Modal ═══ */}
      {showNewTask && (
        <NewTaskModal
          onClose={() => setShowNewTask(false)}
          defaultColumn={newTaskColumn}
          onAdd={addBoardTask}
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
