"use client";

import { Bell, MessageSquare, Settings, User, HelpCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SearchBar } from '@/components/layout/SearchBar';
import { WorkspaceSwitcher } from '@/components/layout/WorkspaceSwitcher';

export const HeaderBar: React.FC = () => {
  return (
    <header
      className="bg-theme-card border-b border-theme"
      style={{ backdropFilter: 'blur(8px)' }}
      role="banner"
      aria-label="Application header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <WorkspaceSwitcher />
        </div>

        <div className="flex items-center justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center justify-end gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="inline-flex items-center justify-center rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            >
              <button
                type="button"
                aria-label="Notifications"
                className="group"
              >
                <Bell className="h-5 w-5 text-theme-secondary group-hover:text-theme-primary transition-colors" aria-hidden="true" />
                <span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-theme-card bg-theme-danger"
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-1 bg-theme-card border border-theme rounded-xl shadow-lg">
              <DropdownMenuLabel className="px-3 py-2 text-theme-primary text-sm font-medium">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 border-theme" />
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">
                <MessageSquare className="mr-2 h-4 w-4 text-theme-muted" aria-hidden="true" />
                New message from Sarah Chen
              </DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">
                <MessageSquare className="mr-2 h-4 w-4 text-theme-muted" aria-hidden="true" />
                You were mentioned in #general
              </DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">
                <MessageSquare className="mr-2 h-4 w-4 text-theme-muted" aria-hidden="true" />
                Reaction added to your message
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-theme" />
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">Mark all as read</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="inline-flex items-center justify-center rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            >
              <button
                type="button"
                aria-label="Settings and account"
                className="group"
              >
                <Settings className="h-5 w-5 text-theme-secondary group-hover:text-theme-primary transition-colors" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-1 bg-theme-card border border-theme rounded-xl shadow-lg">
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">Account settings</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">Workspace settings</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">Appearance</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary py-2 text-sm">Notifications</DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-theme" />
              <DropdownMenuItem asChild className="text-theme-primary py-2 text-sm">
                <a href="/auth/login?logout=true" className="block w-full text-left p-2">Sign out</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Current user */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Open user menu"
          >
            <User className="h-5 w-5 text-theme-secondary group-hover:text-theme-primary transition-colors" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
