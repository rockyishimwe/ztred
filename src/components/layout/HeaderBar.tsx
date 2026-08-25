"use client";
import { Bell, MessageSquare, Search, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SearchBar } from '@/components/layout/SearchBar';
import { WorkspaceSwitcher } from '@/components/layout/WorkspaceSwitcher';

export const HeaderBar: React.FC = () => {
  return (
    <header className="bg-white dark:bg-ztred-surface-dark border-b border-zinc-200 dark:border-zinc-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center">
          <WorkspaceSwitcher />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <SearchBar />
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-hover">
              <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400"/>
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              <DropdownMenuItem>New message from Sarah Chen</DropdownMenuItem>
              <DropdownMenuItem>You were mentioned in #general</DropdownMenuItem>
              <DropdownMenuItem>Reaction added to your message</DropdownMenuItem>
              <DropdownMenuItem className="border-t">Mark all as read</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-hover">
              <Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-400"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              <DropdownMenuItem>Account settings</DropdownMenuItem>
              <DropdownMenuItem>Workspace settings</DropdownMenuItem>
              <DropdownMenuItem>Appearance</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuItem className="border-t">
                <a href="/auth/login?logout=true" className="block w-full text-left p-2">
                  Sign out
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="p-2 rounded-hover">
            <User className="h-5 w-5 text-zinc-600 dark:text-zinc-400"/>
          </button>
        </div>
      </div>
    </header>
  );
};