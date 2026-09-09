"use client";

import { useParams } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { GanttChart } from "@/components/tasks/GanttChart";
import { getProject } from "@/lib/mock/projects";

export default function TaskGanttPage() {
  const params = useParams<{ projectId: string }>();
  const project = getProject(
    typeof params?.projectId === "string" ? params.projectId : undefined
  );

  return (
    <div className="flex-1 flex flex-col overflow-auto p-4">
      <NavLink
        href={`/workspace/projects/${project.id}`}
        className="text-xs font-medium text-purple-400 hover:underline mb-3 inline-block"
      >
        ← Back to {project.name}
      </NavLink>
      <GanttChart project={project} />
    </div>
  );
}
