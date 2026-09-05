"use client";
import React from 'react';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { useUIStore } from '@/stores/uiStore';
import { WorkspaceSwitcher } from '../layout/WorkspaceSwitcher';
import { ChannelList } from './ChannelList';
import { DMList } from './DMList';
import { CheckSquare, FileText, Layout, Video, Sparkles, Settings } from 'lucide-react';
import Link from 'next/link';

export const Sidebar: React.FC = () => {
  const { channels, directMessages } = useWorkspaceStore();
  const { isSidebarCollapsed } = useUIStore();

  if (isSidebarCollapsed) {
    return (
      <aside className="w-14 bg-theme-sidebar border-r border-theme flex flex-col items-center py-3 gap-4 shrink-0 z-20">
        <div className="w-8 h-8 rounded-lg bg-ztred-primary flex items-center justify-center font-bold text-sm shadow text-white">
          ⚡
        </div>
        <div className="w-8 h-px divider-theme" />
        <Link href="/workspace/tasks/proj_1/board" className="p-2 text-theme-sidebar-muted hover:text-theme-sidebar hover:bg-theme-sidebar-hover rounded-md transition-colors">
          <CheckSquare className="w-5 h-5" />
        </Link>
        <Link href="/workspace/docs/doc_1" className="p-2 text-theme-sidebar-muted hover:text-theme-sidebar hover:bg-theme-sidebar-hover rounded-md transition-colors">
          <FileText className="w-5 h-5" />
        </Link>
        <Link href="/workspace/whiteboard/wb_1" className="p-2 text-theme-sidebar-muted hover:text-theme-sidebar hover:bg-theme-sidebar-hover rounded-md transition-colors">
          <Layout className="w-5 h-5" />
        </Link>
        <Link href="/workspace/meetings/meet_1" className="p-2 text-theme-sidebar-muted hover:text-theme-sidebar hover:bg-theme-sidebar-hover rounded-md transition-colors">
          <Video className="w-5 h-5" />
        </Link>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-theme-sidebar border-r border-theme flex flex-col h-full shrink-0 z-20 select-none">
      {/* Workspace Dropdown Header */}
      <div className="p-3 border-b divider-theme">
        <WorkspaceSwitcher />
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Communicate Channels */}
        <ChannelList channels={channels} />

        {/* Communicate Direct Messages */}
        <DMList directMessages={directMessages.map(d => ({ ...d, type: 'dm' as const }))} />

        {/* Apps & Integrated Pillars */}
        <div>
          <div className="px-3 py-1 text-xs font-semibold text-theme-sidebar-muted uppercase tracking-wider">
            Apps & Pillars
          </div>
          <div className="space-y-0.5 mt-1">
            <Link
              href="/workspace/tasks/proj_1/board"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-theme-sidebar hover:bg-theme-sidebar-hover hover:text-theme-sidebar transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Kanban & Tasks</span>
            </Link>

            <Link
              href="/workspace/docs/doc_1"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-theme-sidebar hover:bg-theme-sidebar-hover hover:text-theme-sidebar transition-colors"
            >
              <FileText className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Collaborative Docs</span>
            </Link>

            <Link
              href="/workspace/whiteboard/wb_1"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-theme-sidebar hover:bg-theme-sidebar-hover hover:text-theme-sidebar transition-colors"
            >
              <Layout className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Whiteboards</span>
            </Link>

            <Link
              href="/workspace/meetings/meet_1"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-theme-sidebar hover:bg-theme-sidebar-hover hover:text-theme-sidebar transition-colors"
            >
              <Video className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Huddle / Meetings</span>
            </Link>

            <Link
              href="/settings/account"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-theme-sidebar hover:bg-theme-sidebar-hover hover:text-theme-sidebar transition-colors"
            >
              <Settings className="w-4 h-4 text-theme-sidebar-muted shrink-0" />
              <span>Workspace Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
