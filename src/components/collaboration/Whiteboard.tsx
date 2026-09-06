"use client";
import React, { useRef, useEffect } from 'react';
import { Image as ImageIcon, PencilLine, Save, Upload } from 'lucide-react';

export const Whiteboard: React.FC = () => {
  const whiteboardRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Initialize whiteboard library (tldraw or Excalidraw would go here)
    // This is a placeholder implementation
    if (whiteboardRef.current) {
      whiteboardRef.current.innerHTML = `
        <div class="whiteboard-canvas" style="width: 100%; height: 100%; background: white; border: 1px solid #e2e8f0;">
          <!-- Whiteboard content will be rendered here by tldraw/Excalidraw -->
          <div class="placeholder" style="text-align: center; padding: 40px; color: #6b7280;">
            Click to start drawing
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Sprint Planning Whiteboard
          </h2>
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>2 collaborators</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Upload file"
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Upload className="w-5 h-5 text-zinc-600 dark:text-zinc-300" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Insert image"
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ImageIcon className="w-5 h-5 text-zinc-600 dark:text-zinc-300" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Edit note"
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <PencilLine className="w-5 h-5 text-zinc-600 dark:text-zinc-300" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Save"
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Save className="w-5 h-5 text-zinc-600 dark:text-zinc-300" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div ref={whiteboardRef} className="w-full h-full"/>
      </div>
    </div>
  );
};