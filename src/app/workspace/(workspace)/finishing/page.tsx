"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, Rocket } from 'lucide-react';
import { Suspense } from 'react';

function FinishingContent() {
  const searchParams = useSearchParams();
  const workspaceName = searchParams.get('name') || 'Untitled';
  const inviteCount = parseInt(searchParams.get('invites') || '0', 10);

  return (
    <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto py-8 px-4">
      {/* Step Progress Bar */}
      <div className="flex items-center gap-0 mb-12">
        {/* Step 1 - Details (completed) */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Details</span>
        </div>

        {/* Connector line */}
        <div className="w-24 h-0.5 mx-3" style={{ backgroundColor: 'var(--border-color)' }} />

        {/* Step 2 - Invite (completed) */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Invite</span>
        </div>

        {/* Connector line */}
        <div className="w-24 h-0.5 mx-3" style={{ backgroundColor: 'var(--border-color)' }} />

        {/* Step 3 - Done (current) */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Done</span>
        </div>
      </div>

      {/* Completion Card */}
      <div className="w-full max-w-lg rounded-2xl p-10 text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Rocket Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          You're all set! 🚀🚀
        </h1>

        {/* Welcome message */}
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
          Welcome to <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{workspaceName}</span>.
        </p>

        {/* Invite info */}
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {inviteCount > 0 ? (
            <>
              {inviteCount} invite{inviteCount > 1 ? 's' : ''} sent. You can add more anytime from Settings.
            </>
          ) : (
            <>No invites sent yet. You can add people anytime from Settings.</>
          )}
        </p>

        {/* Go to workspace button */}
        <Link
          href="/workspace"
          className="inline-block w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
        >
          Go to workspace
        </Link>
      </div>
    </div>
  );
}

export default function FinishingWorkspacePage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
      </div>
    }>
      <FinishingContent />
    </Suspense>
  );
}
