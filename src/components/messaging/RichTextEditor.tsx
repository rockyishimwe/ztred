"use client";
import React, { useRef } from 'react';
import {
  Bold,
  Italic,
  Code,
  Quote,
  List,
  Menu,
  Table,
  PenTool,
  Mic,
  Clock,
  Plus,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface RichTextEditorProps {
  placeholder?: string;
  onChange: (content: string) => void;
  value?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = 'Start typing...',
  onChange,
  value = ''
}) => {
  const editorRef = useRef<null | HTMLDivElement>(null);

  // Simulate TipTap editor behavior
  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    onChange(e.target.innerHTML);
  };

  return (
    <div className="border border-zinc-300 rounded-lg dark:border-zinc-700">
      <div className="flex items-center space-x-2 p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex-1 space-x-2">
          <button className="p-1 rounded-hover hover:bg-zinc-100" title="Bold">
            <Bold className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
          </button>
          <button className="p-1 rounded-hover hover:bg-zinc-100" title="Italic">
            <Italic className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
          </button>
          <button className="p-1 rounded-hover hover:bg-zinc-100" title="Code">
            <Code className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
          </button>
          <button className="p-1 rounded-hover hover:bg-zinc-100" title="Quote">
            <Quote className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
          </button>
          <button className="p-1 rounded-hover hover:bg-zinc-100" title="Bullet List">
            <List className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
          </button>
          <button className="p-1 rounded-hover hover:bg-zinc-100" title="Table">
            <Table className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
          </button>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-hover hover:bg-zinc-100">
              <PenTool className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2">
              <DropdownMenuItem>Mention</DropdownMenuItem>
              <DropdownMenuItem>Voice Note</DropdownMenuItem>
              <DropdownMenuItem>Schedule Send</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        ref={editorRef}
        className="min-h-[48px] p-4 break-words whitespace-pre-wrap overflow-auto focus:outline-none"
        contentEditable="true"
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: value || placeholder }}
      >
        {(!value && !editorRef.current?.innerHTML) && (
          <div className="text-zinc-400">{placeholder}</div>
        )}
      </div>
    </div>
  );
};