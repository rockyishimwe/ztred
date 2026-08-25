"use client";
import React from 'react';

export const GanttChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-ztred-surface-dark border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Project Timeline
        </h2>
        <div className="flex items-center space-x-4 text-xs text-zinc-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded"></div>
            <span>Development</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded"></div>
            <span>Testing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded"></div>
            <span>Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded"></div>
            <span>Delayed</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* Gantt chart visualization would go here - using react-gantt or custom SVG */}
        <div className="h-96 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
          {/* Placeholder for Gantt chart bars and timeline */}
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
            Gantt Chart Visualization
            <br/>
            <span className="text-xs">(Would show task timelines, dependencies, milestones)</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-sm">
        <span>Zoom: Day Week Month Year</span>
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-hover hover:bg-zinc-100">
            <span className="material-icons">file_download</span>
          </button>
          <button className="p-1 rounded-hover hover:bg-zinc-100">
            <span className="material-icons">upload_file</span>
          </button>
        </div>
      </div>
    </div>
  );
};