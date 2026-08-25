"use client";
import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/api';
import { MessageBubble } from './MessageBubble';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    overscan: 5,
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-y-auto w-full p-2 space-y-1 scroll-smooth"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const message = messages[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {messages.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                <MessageBubble message={message} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};