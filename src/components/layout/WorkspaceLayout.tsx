"use client";

import React from 'react';
import { HeaderBar } from '@/components/layout/HeaderBar';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useUIStore } from '@/stores/uiStore';
import { ThreadView } from '@/components/messaging/ThreadView';
import { AIAssistantPanel } from '@/components/automate/AIAssistantPanel';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeRightPanel } = useUIStore();
  useWebSocket();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white dark:bg-ztred-surface-dark text-zinc-900 dark:text-zinc-100">
      {/* Top Global Navigation Bar */}
      <HeaderBar />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Center Content Outlet */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-ztred-surface-dark">
          {children}
        </main>

        {/* Dynamic Right Side Panels */}
        {activeRightPanel === 'thread' && (
          <ThreadView
            threadId="thread_1"
            messages={[]}
            onSendMessage={() => {}}
            onClose={() => {}}
          />
        )}
        {activeRightPanel === 'ai' && <AIAssistantPanel />}
      </div>
    </div>
  );
}