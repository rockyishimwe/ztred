"use client";
import { Bell, MessageSquare, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SearchBar } from '@/components/layout/SearchBar';
import { WorkspaceSwitcher } from '@/components/layout/WorkspaceSwitcher';

export const HeaderBar: React.FC = () => {
  return (
    <header className="bg-theme-card border-b border-theme">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <WorkspaceSwitcher />
        </div>

        <div className="flex items-center justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-theme-secondary transition-colors">
              <Bell className="h-5 w-5 text-theme-muted" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-theme-danger rounded-full" aria-hidden="true"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 bg-theme-card border-theme rounded-xl shadow-lg">
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">New message from Sarah Chen</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">You were mentioned in #general</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">Reaction added to your message</DropdownMenuItem>
              <DropdownMenuItem className="border-t border-theme text-theme-primary hover:bg-theme-secondary">Mark all as read</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-theme-secondary transition-colors">
              <Settings className="h-5 w-5 text-theme-muted" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 bg-theme-card border-theme rounded-xl shadow-lg">
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">Account settings</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">Workspace settings</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">Appearance</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary">Notifications</DropdownMenuItem>
              <DropdownMenuItem className="border-t border-theme text-theme-primary hover:bg-theme-secondary">
                <a href="/auth/login?logout=true" className="block w-full text-left p-2">
                  Sign out
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="p-2 rounded-lg hover:bg-theme-secondary transition-colors" aria-label="Open user menu">
            <User className="h-5 w-5 text-theme-muted" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
