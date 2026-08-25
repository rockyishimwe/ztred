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
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{message.senderName}</p>
          <p className="text-xs text-zinc-400">{new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          {message.updatedAt && (
            <p className="text-xs text-zinc-400 italic">Edited</p>
          )}
        </div>
        <div className="prose sm:prose-sm max-w-none">
          {message.content}
        </div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-x-2">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2">
                {/* Attachment preview based on type */}
                <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded">
                  {/* Icon based on attachment type */}
                  {attachment.mimeType.startsWith('image/') && (
                    <img
                      src={attachment.thumbnailUrl || attachment.url}
                      alt={`${attachment.name} preview`}
                      className="h-8 w-8 rounded object-cover"
                    />
                  )}
                  {!attachment.mimeType.startsWith('image/') && (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium">
                      {attachment.mimeType.includes('pdf') ? '📄' : attachment.mimeType.includes('video') ? '🎥' : '📎'}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-xs">{attachment.name}</p>
                  <p className="text-xs text-zinc-500">{(attachment.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-4 text-xs text-zinc-500">
          <button className="hover:text-zinc-700">
            <MessageSquareMore className="h-4 w-4"/>
          </button>
          <button className="hover:text-zinc-700">
            <Reply className="h-4 w-4"/>
          </button>
          <button className="hover:text-zinc-700">
            <ClipboardList className="h-4 w-4"/>
          </button>
          {/* Reactions will be rendered here */}
          <div className="flex items-center space-x-1">
            {message.reactions && message.reactions.map((reaction, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span className="text-lg">{reaction.emoji}</span>
                <span className="text-xs font-medium">{reaction.count}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Message actions dropdown */}
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-hover hover:bg-zinc-100">
              <Users className="h-4 w-4 text-zinc-400 hover:text-zinc-500"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2">
              <DropdownMenuItem>Reply in thread</DropdownMenuItem>
              <DropdownMenuItem>Copy message</DropdownMenuItem>
              <DropdownMenuItem>Pin message</DropdownMenuItem>
              <DropdownMenuItem>Save for later</DropdownMenuItem>
              <DropdownMenuItem className="border-t text-destructive">
                Delete message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
