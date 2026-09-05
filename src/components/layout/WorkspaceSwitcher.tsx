"use client";
import { ChevronDown, Globe } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const WorkspaceSwitcher: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 p-2 rounded-lg hover:bg-theme-sidebar-hover transition-colors w-full">
        <Globe className="h-4 w-4 text-theme-sidebar-muted"/>
        <span className="font-medium text-theme-sidebar text-sm truncate">ZTRED Global Engineering</span>
        <ChevronDown className="h-4 w-4 text-theme-sidebar-muted ml-auto"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 bg-theme-card border-theme rounded-xl shadow-lg">
        <DropdownMenuItem className="flex items-center space-x-3 text-theme-primary hover:bg-theme-secondary rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            ⚡
          </div>
          <div>
            <p className="font-medium text-sm">ZTRED Global Engineering</p>
            <p className="text-xs text-theme-muted">1,420 members</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-3 border-t border-theme text-theme-primary hover:bg-theme-secondary rounded-lg">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
            🚀
          </div>
          <div>
            <p className="font-medium text-sm">Acme Product Innovation</p>
            <p className="text-xs text-theme-muted">380 members</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-3 text-theme-primary hover:bg-theme-secondary rounded-lg">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
            🎨
          </div>
          <div>
            <p className="font-medium text-sm">UX/UI Guild</p>
            <p className="text-xs text-theme-muted">85 members</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="border-t border-theme text-theme-primary hover:bg-theme-secondary rounded-lg">Add workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
