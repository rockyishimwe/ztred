"use client";
import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';

interface SmartMentionsProps {
  onMentionSelected: (mention: string) => void;
}

export const SmartMentions: React.FC<SmartMentionsProps> = ({
  onMentionSelected
}) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<Array<{
    id: string;
    name: string;
    avatar: string;
    presence: 'online' | 'away' | 'dnd' | 'offline';
  }>>([]);

  // Simulate fetching users from workspace
  useEffect(() => {
    const mockUsers: Array<{
      id: string;
      name: string;
      avatar: string;
      presence: 'online' | 'away' | 'dnd' | 'offline';
    }> = [
      { id: 'usr_1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80', presence: 'online' },
      { id: 'usr_2', name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', presence: 'away' },
      { id: 'usr_3', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&auto=format&fit=crop&q=80', presence: 'online' },
      { id: 'usr_4', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80', presence: 'dnd' },
      { id: 'usr_5', name: 'Rachel Green', avatar: 'https://images.unsplash.com/photo-1494790108377-9c8df33280d6?w=150&auto=format&fit=crop&q=80', presence: 'offline' },
      { id: 'usr_6', name: 'Team Backend', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80', presence: 'online' },
      { id: 'usr_7', name: 'Team Design', avatar: 'https://images.unsplash.com/photo-1581091226825-6a4b1b5bafd2?w=150&auto=format&fit=crop&q=80', presence: 'online' },
    ];

    if (query) {
      const searchLower = query.toLowerCase();
      const filtered = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchLower)
      );
      setFilteredUsers(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredUsers([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleSelect = (user: {
    id: string;
    name: string;
    avatar: string;
    presence: 'online' | 'away' | 'dnd' | 'offline';
  }) => {
    onMentionSelected(user.name);
    setQuery('');
    setShowDropdown(false);
  };

  const presenceColors: Record<'online' | 'away' | 'dnd' | 'offline', string> = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-zinc-400'
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type @ to mention..."
        className="w-full px-3 py-1 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
      />
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="px-3 py-2 text-sm text-zinc-500">
              No users found
            </div>
          ) : (
            <ul className="space-y-1">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelect(user)}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      className="h-6 w-6 rounded-full"
                    />
                    <div className={`h-2 w-2 rounded-full ml-1 ${presenceColors[user.presence]}`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      @{user.name.toLowerCase().replace(/\s+/g, '')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};