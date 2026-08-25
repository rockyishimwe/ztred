"use client";
import { Pin, Bookmark } from 'lucide-react';

interface PinsBookmarksProps {
  isPinned: boolean;
  isBookmarked: boolean;
  onTogglePin: () => void;
  onToggleBookmark: () => void;
}

export const PinsBookmarks: React.FC<PinsBookmarksProps> = ({
  isPinned,
  isBookmarked,
  onTogglePin,
  onToggleBookmark
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onTogglePin}
        className={`p-1 rounded-hover hover:bg-zinc-100 ${isPinned ? 'text-primary-600' : 'text-zinc-500'}`}
      >
        <Pin className="h-4 w-4" />
      </button>
      <button
        onClick={onToggleBookmark}
        className={`p-1 rounded-hover hover:bg-zinc-100 ${isBookmarked ? 'text-primary-600' : 'text-zinc-500'}`}
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </div>
  );
};