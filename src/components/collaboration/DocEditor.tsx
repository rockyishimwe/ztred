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
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-theme-primary">
            Project Proposal - Q3 Initiatives
          </h2>
          <div className="flex items-center space-x-2 text-xs text-theme-muted">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3"/>
              <span>3 collaborators</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-theme-success rounded-full"></div>
              <span>All changes saved</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded hover:bg-theme-secondary">
            <MessageSquareMore className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
          </button>
          <button className="p-2 rounded hover:bg-theme-secondary">
            <ClipboardList className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
          </button>
          <button className="p-2 rounded hover:bg-theme-secondary">
            <Heart className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div ref={editorRef} className="w-full h-full border border-theme rounded-lg bg-theme-card">
          {/* Editor content will be rendered here by Yjs + TipTap */}
        </div>
      </div>
    </div>
  );
};