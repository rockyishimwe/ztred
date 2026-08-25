"use client";
import React from 'react';
import { DMListItem } from './DMListItem';

interface DMListProps {
  directMessages: Array<{
    id: string;
    name: string;
    slug: string;
    type: 'dm';
    isArchived: boolean;
    unreadCount: number;
    mentionCount: number;
    memberIds: string[];
    lastMessage?: string;
    lastMessageTime?: string;
  }>;
}

export const DMList: React.FC<DMListProps> = ({ directMessages }) => {
  return (
    <nav>
      <h2 className="mb-2 text-xs font-semibold text-ztred-sidebar-muted tracking-wider uppercase">
        Direct Messages
      </h2>
      <div className="space-y-0.5 mt-1">
        {directMessages.map((dm) => (
          <DMListItem key={dm.id} dm={dm} />
        ))}
      </div>
    </nav>
  );
};