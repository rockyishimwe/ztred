"use client";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ChannelListItemProps {
  channel: {
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
  };
}

export const ChannelListItem: React.FC<ChannelListItemProps> = ({ channel }) => {
  const isDM = channel.type === 'dm';
  return (
    <Link
      href={`/workspace/${isDM ? 'dm' : 'channels'}/${isDM ? channel.name.toLowerCase().replace(/\s+/g, '-') : channel.slug}`}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg">
        {isDM ? (
          <div className="h-5 w-5 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium">
            {channel.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            #
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-left">{isDM ? channel.name : `#${channel.name}`}</p>
        {channel.topic && (
          <p className="text-xs text-ztred-sidebar-muted truncate">
            {channel.topic}
          </p>
        )}
      </div>
      {channel.unreadCount > 0 && (
        <div className="flex-shrink-0">
          <div className="h-6 w-6 flex items-center justify-center bg-primary-500 text-white rounded-full text-xs font-medium">
            {channel.unreadCount}
          </div>
        </div>
      )}
      {channel.mentionCount > 0 && (
        <div className="flex-shrink-0 ml-2">
          <div className="h-6 w-6 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs font-medium">
            {channel.mentionCount}
          </div>
        </div>
      )}
      <ChevronRight className="h-4 w-4 text-zinc-400 ml-2"/>
    </Link>
  );
};