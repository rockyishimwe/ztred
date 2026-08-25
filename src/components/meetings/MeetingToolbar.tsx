"use client";
import { Mic, Video, Share2, Users, MoreHorizontal, MessageSquare, Image, Loader2, PanelLeft } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const MeetingToolbar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-ztred-surface-dark border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Product Sync
        </h2>
        <div className="flex items-center space-x-2 text-xs text-zinc-500">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3"/>
            <span>12 participants</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Live • 2:14</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-hover hover:bg-zinc-100">
          <Mic className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
        </button>
        <button className="p-2 rounded-hover hover:bg-zinc-100">
          <Video className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
        </button>
        <button className="p-2 rounded-hover hover:bg-zinc-100">
          <Share2 className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 rounded-hover hover:bg-zinc-100">
            <MoreHorizontal className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-2">
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4"/>
              Chat
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image className="mr-2 h-4 w-4"/>
              Share screen
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PanelLeft className="mr-2 h-4 w-4"/>
              Breakout rooms
            </DropdownMenuItem>
            <DropdownMenuItem className="border-t">
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Recording...
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              End meeting for all
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="p-2 rounded-hover hover:bg-zinc-100 bg-red-500 hover:bg-red-600 text-white">
          Leave
        </button>
      </div>
    </div>
  );
};