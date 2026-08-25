"use client";
import { ChevronDown, Globe } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const WorkspaceSwitcher: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 p-2 rounded-hover">
        <Globe className="h-4 w-4"/>
        <span className="font-medium">ZTRED Global Engineering</span>
        <ChevronDown className="h-4 w-4"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2">
        <DropdownMenuItem className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            ⚡
          </div>
          <div>
            <p className="font-medium">ZTRED Global Engineering</p>
            <p className="text-sm text-gray-500">1,420 members</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-3 border-t">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
            🚀
          </div>
          <div>
            <p className="font-medium">Acme Product Innovation</p>
            <p className="text-sm text-gray-500">380 members</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
            🎨
          </div>
          <div>
            <p className="font-medium">UX/UI Guild</p>
            <p className="text-sm text-gray-500">85 members</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="border-t">Add workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};