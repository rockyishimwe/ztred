"use client";
import React from 'react';
import { Message } from '@/types/api';
import { Users, MessageSquareMore, Trash2, Reply, ClipboardList } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className="flex max-w-xl mb-2">
      {/* Message bubbles will be aligned based on sender in parent component */}
      <div className="flex-shrink-0 h-10 w-10">
        <img
          src={message.senderAvatar}
          alt={`${message.senderName}'s avatar`}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <div className="flex-1 ml-3 space-y-1">
        <div className="flex items-center space-x-2 mb-1">
          <p className="font-medium text-theme-primary">{message.senderName}</p>
          <p className="text-xs text-theme-muted">{new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          {message.updatedAt && (
            <p className="text-xs text-theme-muted italic">Edited</p>
          )}
        </div>
        <div className="prose sm:prose-sm max-w-none text-theme-primary">
          {message.content}
        </div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-x-2">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2">
                {/* Attachment preview based on type */}
                <div className="flex-shrink-0 h-8 w-8 bg-theme-secondary rounded">
                  {/* Icon based on attachment type */}
                  {attachment.mimeType.startsWith('image/') && (
                    <img
                      src={attachment.thumbnailUrl || attachment.url}
                      alt={`${attachment.name} preview`}
                      className="h-8 w-8 rounded object-cover"
                    />
                  )}
                  {!attachment.mimeType.startsWith('image/') && (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-theme-muted">
                      {attachment.mimeType.includes('pdf') ? '📄' : attachment.mimeType.includes('video') ? '🎥' : '📎'}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-theme-primary truncate max-w-xs">{attachment.name}</p>
                  <p className="text-xs text-theme-muted">{(attachment.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-4 text-xs text-theme-muted">
          <button className="hover:text-theme-primary transition-colors">
            <MessageSquareMore className="h-4 w-4"/>
          </button>
          <button className="hover:text-theme-primary transition-colors">
            <Reply className="h-4 w-4"/>
          </button>
          <button className="hover:text-theme-primary transition-colors">
            <ClipboardList className="h-4 w-4"/>
          </button>
          {/* Reactions will be rendered here */}
          <div className="flex items-center space-x-1">
            {message.reactions && message.reactions.map((reaction, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="text-lg">{reaction.emoji}</span>
                <span className="text-xs font-medium text-theme-secondary">{reaction.count}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Message actions dropdown */}
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-lg hover:bg-theme-secondary transition-colors">
              <Users className="h-4 w-4 text-theme-muted hover:text-theme-secondary"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2 bg-theme-card border-theme rounded-xl shadow-lg">
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary rounded-lg">Reply in thread</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary rounded-lg">Copy message</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary rounded-lg">Pin message</DropdownMenuItem>
              <DropdownMenuItem className="text-theme-primary hover:bg-theme-secondary rounded-lg">Save for later</DropdownMenuItem>
              <DropdownMenuItem className="border-t border-theme text-theme-danger hover:bg-theme-secondary rounded-lg">
                Delete message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
