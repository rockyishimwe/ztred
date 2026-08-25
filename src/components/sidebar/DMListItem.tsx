"use client";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DMListItemProps {
  dm: {
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
  };
}

export const DMListItem: React.FC<DMListItemProps> = ({ dm }) => {
  return (
    <Link
      href={`/workspace/dm/${dm.slug}`}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-ztred-sidebar-text hover:bg-ztred-sidebar-hover hover:text-white transition-colors"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg">
        <div className="h-5 w-5 bg-gray-400 rounded-full flex items-center justify-center text-xs font-medium">
          {dm.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-left">{dm.name}</p>
        {dm.lastMessage && (
          <p className="text-xs text-ztred-sidebar-muted truncate">
            {dm.lastMessage}
          </p>
        )}
      </div>
      {dm.unreadCount > 0 && (
        <div className="flex-shrink-0">
          <div className="h-6 w-6 flex items-center justify-center bg-primary-500 text-white rounded-full text-xs font-medium">
            {dm.unreadCount}
          </div>
        </div>
      )}
      {dm.mentionCount > 0 && (
        <div className="flex-shrink-0 ml-2">
          <div className="h-6 w-6 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs font-medium">
            {dm.mentionCount}
          </div>
        </div>
      )}
      <ChevronRight className="h-4 w-4 text-zinc-400 ml-2"/>
    </Link>
  );
};