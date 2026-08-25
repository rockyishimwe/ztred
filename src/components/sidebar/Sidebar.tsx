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
      <aside className="w-14 bg-ztred-sidebar-bg dark:bg-ztred-sidebar-darkBg border-r border-zinc-800 flex flex-col items-center py-3 gap-4 shrink-0 z-20 text-white">
        <div className="w-8 h-8 rounded-lg bg-ztred-primary flex items-center justify-center font-bold text-sm shadow">
          ⚡
        </div>
        <div className="w-8 h-px bg-zinc-800" />
        <Link href="/workspace/tasks/proj_1/board" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
          <CheckSquare className="w-5 h-5" />
        </Link>
        <Link href="/workspace/docs/doc_1" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
          <FileText className="w-5 h-5" />
        </Link>
        <Link href="/workspace/whiteboard/wb_1" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
          <Layout className="w-5 h-5" />
        </Link>
        <Link href="/workspace/meetings/meet_1" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
          <Video className="w-5 h-5" />
        </Link>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-ztred-sidebar-bg dark:bg-ztred-sidebar-darkBg border-r border-zinc-800 flex flex-col h-full shrink-0 z-20 select-none text-white">
      {/* Workspace Dropdown Header */}
      <div className="p-3 border-b border-zinc-800/80">
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
          <div className="px-3 py-1 text-xs font-semibold text-ztred-sidebar-muted uppercase tracking-wider">
            Apps & Pillars
          </div>
          <div className="space-y-0.5 mt-1">
            <Link
              href="/workspace/tasks/proj_1/board"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Kanban & Tasks</span>
            </Link>

            <Link
              href="/workspace/docs/doc_1"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Collaborative Docs</span>
            </Link>

            <Link
              href="/workspace/whiteboard/wb_1"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
            >
              <Layout className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Whiteboards</span>
            </Link>

            <Link
              href="/workspace/meetings/meet_1"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
            >
              <Video className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Huddle / Meetings</span>
            </Link>

            <Link
              href="/settings/account"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-xs font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Workspace Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};