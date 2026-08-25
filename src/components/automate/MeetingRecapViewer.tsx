"use client";
import React from 'react';

export const MeetingRecapViewer: React.FC = () => {
  return (
    <div className="bg-white dark:bg-ztred-surface-dark border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Meeting Recap
        </h2>
        <div className="flex items-center space-x-4 text-xs text-zinc-500">
          <span>• Apr 15, 2024 • 2:14 PM • 4 participants</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="border-b pb-3 mb-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
            Summary
          </h3>
          <p className="text-zinc-600">
            The team discussed the upcoming release of ZTRED v2.0 frontend, focusing on the new messaging architecture and real-time collaboration features. Key decisions included adopting Socket.IO for real-time communications and implementing optimistic UI updates for better perceived performance.
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <button className="text-xs text-primary-600 hover:text-primary-700">
              Regenerate
            </button>
          </div>
        </div>
        <div className="border-b pb-3 mb-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
            Action Items
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <div className="h-4 w-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                  ☐
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Update dependencies to latest versions
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-green-500">
                Due: Fri
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <div className="h-4 w-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                  ☐
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Schedule team training on new components
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-green-500">
                Due: Next week
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <button className="text-xs text-primary-600 hover:text-primary-700">
              Regenerate
            </button>
          </div>
        </div>
        <div className="border-b pb-3 mb-4">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
            Decisions
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <div className="h-4 w-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Use Socket.IO for real-time messaging
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <div className="h-4 w-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Implement optimistic UI updates
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <button className="text-xs text-primary-600 hover:text-primary-700">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
