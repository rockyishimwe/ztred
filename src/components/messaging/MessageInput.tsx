"use client";
import React, { useState } from 'react';
import { Send, Paperclip, Smile, AtSign, Mic } from 'lucide-react';
import { EmojiPicker } from '@/components/ui/emoji-picker';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = "Type a message...",
}) => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute bottom-full left-0 mb-2">
          <EmojiPicker
            onSelect={(emoji) => {
              setMessage((prev) => prev + emoji);
              setShowEmoji(false);
            }}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-theme-card border-t border-theme">
        <button
          type="button"
          className="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors"
        >
          <AtSign className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-theme-input border border-theme rounded-xl px-4 py-2.5 text-sm text-theme-primary placeholder-theme focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-primary/20 transition-all"
        />
        <button
          type="button"
          className="p-2 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors"
        >
          <Mic className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
