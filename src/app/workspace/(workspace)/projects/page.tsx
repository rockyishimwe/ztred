"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Filter,
} from "lucide-react";
import CreateProjectModal from "@/components/projects/CreateProjectModal";

interface Project {
  id: string;
  name: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  progress: number;
  status: "On Track" | "At Risk" | "Off Track";
  dueDate: string;
  team: string[];
  extraCount?: number;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete brand overhaul and asset update",
    priority: "High",
    category: "Design",
    progress: 72,
    status: "On Track",
    dueDate: "Oct 15",
    team: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    ],
    extraCount: 1,
  },
  {
    id: "2",
    name: "Mobile App v2",
    description: "iOS and Android updates for checkout flows",
    priority: "High",
    category: "Engineering",
    progress: 45,
    status: "At Risk",
    dueDate: "Nov 02",
    team: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "3",
    name: "Q3 Marketing Campaign",
    description: "Global product drop and media campaign",
    priority: "Medium",
    category: "Marketing",
    progress: 88,
    status: "On Track",
    dueDate: "Sep 30",
    team: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    ],
    extraCount: 2,
  },
  {
    id: "4",
    name: "API Integration",
    description: "ERP backend connection & data synchronizer",
    priority: "High",
    category: "Backend",
    progress: 23,
    status: "Off Track",
    dueDate: "Oct 10",
    team: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "5",
    name: "Brand Guidelines Update",
    description: "Defining layout grid and visual elements",
    priority: "Low",
    category: "Design",
    progress: 60,
    status: "On Track",
    dueDate: "Oct 28",
    team: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "6",
    name: "User Research Study",
    description: "Testing new workspace flows with cohorts",
    priority: "Medium",
    category: "Research",
    progress: 35,
    status: "At Risk",
    dueDate: "Nov 15",
    team: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    ],
    extraCount: 1,
  },
];

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  High: { bg: "bg-red-500/20", text: "text-red-400" },
  Medium: { bg: "bg-orange-500/20", text: "text-orange-400" },
  Low: { bg: "bg-blue-500/20", text: "text-blue-400" },
};

const STATUS_COLORS: Record<string, string> = {
  "On Track": "bg-emerald-500",
  "At Risk": "bg-orange-500",
  "Off Track": "bg-red-500",
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState(PROJECTS);

  const handleCreateProject = (newProject: {
    name: string;
    description: string;
    category: string;
    priority: string;
    dueDate: string;
    team: string[];
  }) => {
    setProjects((prev) => [
      {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        priority: newProject.priority as "High" | "Medium" | "Low",
        category: newProject.category,
        progress: 0,
        status: "On Track" as const,
        dueDate: newProject.dueDate ? new Date(newProject.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD",
        team: newProject.team,
      },
      ...prev,
   ]);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || p.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ═══ Header ═══ */}
      <div
        className="px-8 py-5 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Projects
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Manage and track all your projects
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* ═══ Search & Filters ═══ */}
      <div
        className="px-8 py-4 flex items-center gap-4 shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              <option value="All">Status: All</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Off Track">Off Track</option>
            </select>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-sm px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            <option value="All">Priority: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-sm px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            <option value="All">Category: All</option>
            <option value="Design">Design</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Backend">Backend</option>
            <option value="Research">Research</option>
          </select>
        </div>
      </div>

      {/* ═══ Projects Grid ═══ */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const priorityColor = PRIORITY_COLORS[project.priority];
            const statusColor = STATUS_COLORS[project.status];

            return (
              <Link
                href={`/workspace/projects/${project.id}`}
                key={project.id}
                className="block rounded-2xl p-5 transition-all hover:scale-[1.01] cursor-pointer"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-base font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.name}
                  </h3>
                  <button
                    className="p-1 rounded-lg transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-semibold ${priorityColor.bg} ${priorityColor.text}`}
                  >
                    {project.priority}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-md font-medium"
                    style={{
                      backgroundColor: "var(--bg-surface)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Progress
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.progress}%
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--bg-surface)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: "var(--primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${statusColor}`} />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Due Date + Team */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar
                        className="w-3 h-3"
                        style={{ color: "var(--text-muted)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {project.dueDate}
                      </span>
                    </div>

                    {/* Team Avatars */}
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((avatar, idx) => (
                        <img
                          key={idx}
                          src={avatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover"
                          style={{
                            border: "2px solid var(--bg-card)",
                          }}
                        />
                      ))}
                      {project.extraCount && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                          style={{
                            backgroundColor: "var(--bg-surface)",
                            color: "var(--text-muted)",
                            border: "2px solid var(--bg-card)",
                          }}
                        >
                          +{project.extraCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search
              className="w-12 h-12 mb-4"
              style={{ color: "var(--text-muted)" }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              No projects found
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* ═══ Create Project Modal ═══ */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}
