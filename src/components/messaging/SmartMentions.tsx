"use client";
import React, { useState, useRef, useEffect } from 'react';
import { User } from '@/types/api';

interface SmartMentionsProps {
  users: User[];
  onSelect: (user: User) => void;
}

export const SmartMentions: React.FC<SmartMentionsProps> = ({ users, onSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Type @ to mention someone..."
        className="w-full bg-theme-input border border-theme rounded-xl px-4 py-2.5 text-sm text-theme-primary placeholder-theme focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-primary/20 transition-all"
      />

      {isOpen && query && filteredUsers.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-theme-card border border-theme rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => {
                onSelect(user);
                setQuery('');
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 hover:bg-theme-secondary cursor-pointer w-full text-left transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-theme-primary truncate">
                  {user.name}
                </p>
                <p className="text-xs text-theme-muted truncate">{user.email}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
