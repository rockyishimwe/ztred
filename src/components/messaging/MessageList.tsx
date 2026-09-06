"use client";
import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/api';
import { MessageBubble } from './MessageBubble';
import { useVirtualizer } from '@tanstack/react-virtual';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    // Initial estimate only — rows are measured for real via measureElement,
    // so long messages expand and short ones don't leave dead space.
    estimateSize: () => 72,
    getItemKey: (index) => messages[index]?.id ?? index,
    overscan: 5,
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Must render BEFORE the virtualizer: with zero messages getVirtualItems()
  // returns no rows, so an empty state placed inside the row map is unreachable.
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center w-full p-8">
        <div className="text-center text-zinc-500">
          No messages yet. Start the conversation!
        </div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-y-auto w-full p-2 scroll-smooth"
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
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <MessageBubble message={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
