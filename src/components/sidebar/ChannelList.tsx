"use client";
import React from 'react';
import { ChannelListItem } from './ChannelListItem';

interface ChannelListProps {
  channels: Array<{
    id: string;
    name: string;
    slug: string;
    type: 'public' | 'private' | 'dm';
    topic?: string;
    description?: string;
    isArchived: boolean;
    unreadCount: number;
    mentionCount: number;
    memberIds: string[];
  }>;
}

export const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <nav>
      <h2 className="mb-2 text-xs font-semibold text-ztred-sidebar-muted tracking-wider uppercase">
        Channels
      </h2>
      <div className="space-y-0.5 mt-1">
        {channels.map((channel) => (
          <ChannelListItem key={channel.id} channel={channel} />
        ))}
      </div>
    </nav>
  );
};