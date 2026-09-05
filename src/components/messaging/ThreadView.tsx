"use client";
import React from 'react';
import { Message } from '@/types/api';
import { X, Hash } from 'lucide-react';
import { MessageBubble } from './MessageBubble';

interface ThreadViewProps {
  threadId: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onClose: () => void;
}

export const ThreadView: React.FC<ThreadViewProps> = ({
  threadId,
  messages,
  onSendMessage,
  onClose,
}) => {
  return (
    <div className="w-80 bg-theme-card border-l border-theme flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4 text-theme-muted" />
          <h3 className="font-semibold text-theme-primary">Thread</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-theme-secondary transition-colors"
        >
          <X className="w-4 h-4 text-theme-muted" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <div className="border-t border-theme p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Reply in thread..."
            className="flex-1 bg-theme-input border border-theme rounded-xl px-4 py-2 text-sm text-theme-primary placeholder-theme focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-primary/20 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
