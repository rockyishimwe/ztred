"use client";

import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { Modal } from "@/components/ui/Modal";
import {
  ChevronRight,
  ChevronLeft,
  Settings,
  Check,
  Folder,
  Calendar,
  CheckCircle,
  List,
  Clipboard,
  User,
  Users,
  BarChart,
  Search,
} from "lucide-react";

interface CreateProjectModalProps {
  onClose: () => void;
  onCreate: (project: {
    name: string;
    description: string;
    category: string;
    priority: string;
    startDate: string;
    dueDate: string;
    team: string[];
    teamMembers: TeamMember[];
  }) => void;
}

const CATEGORIES = ["Design", "Engineering", "Marketing", "Backend", "Research", "Product"];
const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["On Track", "At Risk", "Off Track"];

const THEME_COLORS = [
  { name: "Purple", value: "#8b5cf6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
];

const WORKSPACE_ICONS = [
  { name: "Folder", icon: Folder },
  { name: "Calendar", icon: Calendar },
  { name: "Check", icon: CheckCircle },
  { name: "List", icon: List },
  { name: "Clipboard", icon: Clipboard },
  { name: "User", icon: User },
  { name: "Users", icon: Users },
  { name: "Chart", icon: BarChart },
];

const STATUS_COLORS: Record<string, string> = {
  "On Track": "bg-emerald-500",
  "At Risk": "bg-orange-500",
  "Off Track": "bg-red-500",
};

const MEMBER_ROLES = ["Admin", "Editor", "Viewer"];

const WORKSPACE_MEMBERS = [
  {
    id: "m1",
    name: "Sam Rivera",
    title: "Product Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    defaultRole: "Admin",
  },
  {
    id: "m2",
    name: "Lisa Park",
    title: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1634595477722-7bc68dd410fd?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    defaultRole: "Editor",
  },
  {
    id: "m3",
    name: "Daniel Kim",
    title: "QA Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    defaultRole: "Viewer",
  },
  {
    id: "m4",
    name: "Jordan Lee",
    title: "Frontend Dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    defaultRole: "Editor",
  },
];

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export default function CreateProjectModal({ onClose, onCreate }: CreateProjectModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Design");
  const [priority, setPriority] = useState("High");
  // Defaults computed relative to today so the form never opens pre-expired.
  const [startDate, setStartDate] = useState(format(addDays(new Date(), 25), "yyyy-MM-dd"));
  const [deadline, setDeadline] = useState(format(addDays(new Date(), 115), "yyyy-MM-dd"));
  const [status, setStatus] = useState("On Track");
  const [themeColor, setThemeColor] = useState("#8b5cf6");
  const [workspaceIcon, setWorkspaceIcon] = useState("Folder");
  const [memberSearch, setMemberSearch] = useState("");
  const [teamState, setTeamState] = useState<Record<string, { included: boolean; role: string }>>(() =>
    Object.fromEntries(
      WORKSPACE_MEMBERS.map((m) => [m.id, { included: true, role: m.defaultRole }])
    )
  );

  const toggleMember = (id: string) => {
    setTeamState((prev) => ({
      ...prev,
      [id]: { ...prev[id], included: !prev[id].included },
    }));
  };

  const setMemberRole = (id: string, role: string) => {
    setTeamState((prev) => ({
      ...prev,
      [id]: { ...prev[id], role },
    }));
  };

  const filteredMembers = WORKSPACE_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.title.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const handleCreate = () => {
    const teamMembers = WORKSPACE_MEMBERS.filter((m) => teamState[m.id]?.included).map((m) => ({
      name: m.name,
      role: teamState[m.id].role,
      avatar: m.avatar,
    }));
    onCreate({
      name,
      description,
      category,
      priority,
      startDate,
      dueDate: deadline,
      team: teamMembers.map((m) => m.avatar),
      teamMembers,
    });
    onClose();
  };

  const inputStyle = {
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const stepDescription =
    step === 1
      ? "Set up your project details"
      : step === 2
      ? "Set up timeline & branding markers"
      : "Invite workspace members to collaborate";

  return (
    <Modal
      open
      onClose={onClose}
      title={step === 3 ? "Add team members" : "Create new project"}
      description={stepDescription}
    >
      <div>
        <p
          className="text-sm font-semibold mb-4"
          style={{ color: "var(--primary)" }}
          role="status"
          aria-live="polite"
        >
          Step {step} of 3
        </p>

        <div>
          {/* Step 1: Project Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="projects-project-name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Project Name</label>
                <input id="projects-project-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="projects-description" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Description</label>
                <textarea id="projects-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project"
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                  style={inputStyle}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={inputStyle}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <Settings className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                    Priority
                  </label>
                  <div className="relative">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                      style={inputStyle}
                    >
                      {PRIORITIES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <Settings className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Timeline & Branding */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Date Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projects-start-date" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Start Date</label>
                  <input id="projects-start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="projects-expected-deadline" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Expected Deadline</label>
                  <input id="projects-expected-deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Status
                </label>
                <div className="relative">
                  <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2">
                    <div className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[status]}`} />
                  </div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl pl-9 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                    style={inputStyle}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <Settings className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>

              {/* Theme Color */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                  Project Theme Color
                </label>
                <div className="flex items-center gap-3">
                  {THEME_COLORS.map((color) => (
                    <button type="button"
                      key={color.name}
                      onClick={() => setThemeColor(color.value)}
                      className="hit-area-touch w-10 h-10 rounded-full transition-all hover:scale-110"
                      style={{
                        backgroundColor: color.value,
                        boxShadow: themeColor === color.value ? `0 0 0 3px var(--bg-card), 0 0 0 5px ${color.value}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Workspace Icon */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                  Workspace Icon representation
                </label>
                <div className="flex items-center gap-2">
                  {WORKSPACE_ICONS.map((iconItem) => {
                    const Icon = iconItem.icon;
                    const isSelected = workspaceIcon === iconItem.name;
                    return (
                      <button type="button"
                        key={iconItem.name}
                        onClick={() => setWorkspaceIcon(iconItem.name)}
                        className="hit-area-touch w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: isSelected ? "var(--primary)" : "var(--bg-input)",
                          border: `1px solid ${isSelected ? "var(--primary)" : "var(--border-color)"}`,
                          color: isSelected ? "var(--on-primary)" : "var(--text-muted)",
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Add Team Members */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Search workspace members..."
                  className="w-full rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  style={inputStyle}
                />
              </div>

              {/* Member List */}
              <div className="space-y-2.5">
                {filteredMembers.length === 0 && (
                  <p className="text-sm text-center py-6" style={{ color: "var(--text-muted)" }}>
                    No members found
                  </p>
                )}
                {filteredMembers.map((member) => {
                  const state = teamState[member.id];
                  const isSelected = state.included;
                  return (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
                      style={{
                        backgroundColor: isSelected ? "var(--bg-input)" : "transparent",
                        border: `1px solid ${isSelected ? "var(--primary)" : "var(--border-color)"}`,
                      }}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                          {member.name}
                        </p>
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                          {member.title}
                        </p>
                      </div>
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={state.role}
                          onChange={(e) => setMemberRole(member.id, e.target.value)}
                          disabled={!isSelected}
                          className="rounded-lg pl-3 pr-7 py-1.5 text-xs font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          style={inputStyle}
                        >
                          {MEMBER_ROLES.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        <Settings className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                      </div>
                      {/* Toggle */}
                      <button type="button"
                        onClick={() => toggleMember(member.id)}
                        role="switch"
                        aria-checked={isSelected}
                        aria-label={`Toggle ${member.name}`}
                        className="relative w-11 h-6 rounded-full transition-colors shrink-0"
                        style={{
                          backgroundColor: isSelected ? "var(--primary)" : "var(--border-color)",
                        }}
                      >
                        <span
                          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                          style={{ transform: isSelected ? "translateX(20px)" : "translateX(0)" }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ Footer ═══ */}
          <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
            {step === 1 ? (
              <button type="button"
                onClick={onClose}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
            ) : (
              <button type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {step < 3 ? (
              <button type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !name.trim()}
                className="flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button"
                onClick={handleCreate}
                className="flex items-center gap-1 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Create Project
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
