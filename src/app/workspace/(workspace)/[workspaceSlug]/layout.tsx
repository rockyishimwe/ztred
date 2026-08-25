"use client";

import WorkspaceShell from '@/components/layout/WorkspaceLayout';
import { useParams } from 'next/navigation';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useEffect } from 'react';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const { workspaces, setWorkspace } = useWorkspaceStore();

  useEffect(() => {
    // Find workspace by slug and set it as current
    const workspace = workspaces.find(ws => ws.slug === workspaceSlug);
    if (workspace) {
      setWorkspace(workspace);
    }
  }, [workspaceSlug, workspaces, setWorkspace]);

  // Render the workspace shell (Sidebar + HeaderBar + outlet for child routes)
  return <WorkspaceShell>{children}</WorkspaceShell>;
}