"use client";
import React, { useRef, useEffect } from 'react';
import { Users, MessageSquareMore, ClipboardList, Heart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const DocEditor: React.FC = () => {
  const editorRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Initialize collaborative editor (Yjs + TipTap would go here)
    // This is a placeholder implementation
    if (editorRef.current) {
      editorRef.current.innerHTML = `
        <div class="ProseMirror" contenteditable="true" style="min-height: 48px; outline: none;">
          <p>Start writing your document here...</p>
        </div>
      `;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Project Proposal - Q3 Initiatives
          </h2>
          <div className="flex items-center space-x-2 text-xs text-zinc-500">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3"/>
              <span>3 collaborators</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All changes saved</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-hover hover:bg-zinc-100">
            <MessageSquareMore className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
          </button>
          <button className="p-2 rounded-hover hover:bg-zinc-100">
            <ClipboardList className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
          </button>
          <button className="p-2 rounded-hover hover:bg-zinc-100">
            <Heart className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div ref={editorRef} className="w-full h-full border border-zinc-300 rounded-lg dark:border-zinc-700 bg-white dark:bg-ztred-surface-dark">
          {/* Editor content will be rendered here by Yjs + TipTap */}
        </div>
      </div>
    </div>
  );
};