"use client";

import { useParams } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { Whiteboard } from "@/components/collaboration/Whiteboard";
import { PROJECTS, getProject } from "@/lib/mock/projects";

export default function WhiteboardPage() {
  const params = useParams<{ wbId: string }>();
  const wbId = typeof params?.wbId === "string" ? params.wbId : undefined;

  // Boards are opened from a project, so a project id names the board. Fall
  // back to a generic title for standalone ids like `wb_1`.
  const project = PROJECTS.some((p) => p.id === wbId)
    ? getProject(wbId)
    : undefined;

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-4">
      <NavLink
        href={project ? `/workspace/projects/${project.id}` : "/workspace/projects"}
        className="text-xs font-medium text-purple-400 hover:underline mb-3 inline-block shrink-0"
      >
        ← {project ? `Back to ${project.name}` : "All projects"}
      </NavLink>
      <Whiteboard
        title={project ? `${project.name} — Whiteboard` : "Sprint Planning Whiteboard"}
      />
    </div>
  );
}
