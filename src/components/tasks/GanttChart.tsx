"use client";
import React from 'react';
import { Download, Upload } from 'lucide-react';

export const GanttChart: React.FC = () => {
  return (
    <div className="bg-theme-card border border-theme rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-theme">
        <h2 className="text-xl font-bold text-theme-primary">
          Project Timeline
        </h2>
        <div className="flex items-center space-x-4 text-xs text-theme-muted">
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
        <div className="h-96 bg-theme-secondary rounded-lg">
          {/* Placeholder for Gantt chart bars and timeline */}
          <div className="absolute inset-0 flex items-center justify-center text-theme-muted">
            Gantt Chart Visualization
            <br/>
            <span className="text-xs">(Would show task timelines, dependencies, milestones)</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-theme flex items-center justify-between text-sm">
        <span className="text-theme-secondary">Zoom: Day Week Month Year</span>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Download timeline"
            className="p-1 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Upload timeline"
            className="p-1 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors"
>
            <Upload className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
