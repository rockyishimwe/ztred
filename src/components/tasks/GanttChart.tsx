"use client";

import React from "react";
import { Download, Upload } from "lucide-react";
import type { Project } from "@/lib/mock/projects";

/** Phase lanes, positioned as percentages across the project window. */
const PHASES = [
  { label: "Discovery", color: "bg-blue-500", start: 0, width: 22 },
  { label: "Design", color: "bg-purple-500", start: 18, width: 30 },
  { label: "Development", color: "bg-green-500", start: 40, width: 38 },
  { label: "Testing", color: "bg-yellow-500", start: 70, width: 20 },
  { label: "Launch", color: "bg-red-500", start: 88, width: 12 },
];

/**
 * Timeline view for one project.
 *
 * Takes the project rather than hardcoding "Project Timeline", so the
 * `/workspace/tasks/[projectId]/gantt` route reflects its own segment.
 */
export const GanttChart: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-theme-card border border-theme rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-theme">
        <h1 className="text-xl font-bold text-theme-primary">
          {project.name} — Timeline
        </h1>
        <p className="text-xs text-theme-muted mt-0.5">
          {project.startDate} → {project.deadline} · {project.progress}% complete
        </p>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {PHASES.map((phase) => (
            <div key={phase.label} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs font-medium text-theme-secondary">
                {phase.label}
              </span>
              {/* `relative` matters: the bar is absolutely positioned and used
                  to escape its container entirely without it. */}
              <div className="relative h-6 flex-1 rounded-md bg-theme-secondary overflow-hidden">
                <div
                  className={`absolute inset-y-0 rounded-md ${phase.color}`}
                  style={{ left: `${phase.start}%`, width: `${phase.width}%` }}
                  role="img"
                  aria-label={`${phase.label}: ${phase.width}% of the project window`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Today marker */}
        <div className="mt-4 flex items-center gap-3">
          <span className="w-24 shrink-0 text-xs font-medium text-theme-muted">
            Progress
          </span>
          <div className="relative h-1.5 flex-1 rounded-full bg-theme-secondary overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${project.progress}%`,
                backgroundColor: "var(--primary)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-theme flex items-center justify-between text-sm">
        <span className="text-theme-secondary">
          {project.tasks.total} tasks · {project.tasks.done} done
        </span>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Import timeline"
            title="Import timeline"
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <Upload className="h-4 w-4 text-theme-secondary" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Export timeline"
            title="Export timeline"
            className="p-2 rounded hover:bg-theme-secondary"
          >
            <Download className="h-4 w-4 text-theme-secondary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
