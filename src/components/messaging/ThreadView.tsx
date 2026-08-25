"use client";
import React, { useState } from 'react';
import { Message } from '@/types/api';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { X } from 'lucide-react';

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
  onClose
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-ztred-surface-dark border-l border-zinc-200 dark:border-zinc-700 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold">Thread Discussion</h2>
        <button onClick={onClose} className="p-1 rounded-hover text-zinc-500 hover:text-zinc-700">
          <X className="h-4 w-4"/>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-zinc-500">No messages in this thread yet.</p>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </>
        )}
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-700">
        <MessageInput
          onSend={handleSend}
          placeholder="Reply to thread..."
        />
      </div>
    </div>
  );
};