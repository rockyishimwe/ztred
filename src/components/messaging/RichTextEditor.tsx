"use client";
import React from 'react';
import { Bold, Italic, List, Link, Code, Quote } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write something...",
}) => {
  return (
    <div className="border border-theme rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b border-theme bg-theme-secondary">
        <button
          type="button"
          className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-md transition-colors"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-md transition-colors"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-md transition-colors"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-md transition-colors"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-md transition-colors"
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-card rounded-md transition-colors"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[120px] p-4 bg-theme-card text-theme-primary placeholder-theme focus:outline-none resize-y"
      />
    </div>
  );
};
