"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Send, Mic, RefreshCw, Trash2, ChevronDown } from 'lucide-react';
import { AIMessage, AIAction } from '@/types/api';
import { Spinner } from '@/components/ui/spinner';

export const AIAssistantPanel: React.FC = () => {
  const [input, setInput] = useState('');
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      content: 'Hey Alex! I\'m ZTRED-AI, your ambient AI assistant. How can I help you today?',
      isUser: false,
      actions: [
        {
          label: 'Summarize this thread',
          onClick: () => {}
        },
        {
          label: 'Find action items',
          onClick: () => {}
        },
        {
          label: 'Explain this code',
          onClick: () => {}
        }
      ]
    }
  ]);

  // Clear the pending simulated reply on unmount so we never setState
  // after the panel is gone.
  useEffect(() => {
    return () => {
      if (replyTimerRef.current !== null) {
        clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = {
      id: `${Date.now()}-user`,
      content: input,
      isUser: true
    };

    const loadingId = `${Date.now()}-loading`;

    setMessages(prev => [...prev, userMessage, {
      id: loadingId,
      content: 'Generating response...',
      isUser: false,
      isLoading: true
    }]);
    setInput('');

    // Simulate delay. Replace the loading row by id (not by position) so
    // messages sent while a reply is pending can't corrupt the wrong row.
    replyTimerRef.current = setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === loadingId
          ? {
              id: loadingId,
              content: 'Based on the conversation, I see you\'re discussing the Q3 frontend roadmap. Would you like me to summarize the key decisions made or extract any action items?',
              isUser: false,
              actions: [
                {
                  label: 'Summarize thread',
                  onClick: () => {}
                },
                {
                  label: 'Extract action items',
                  onClick: () => {}
                }
              ]
            }
          : m
      ));
    }, 1500);
  };

  return (
    <div className="w-72 bg-theme-card border-l border-theme flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <h2 className="text-xl font-bold text-theme-primary">
          ZTRED-AI
        </h2>
        <div className="flex items-center space-x-2">
          <button aria-label="Restart conversation" title="Restart conversation" className="p-1 rounded-lg hover:bg-theme-secondary transition-colors">
            <RefreshCw className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
          </button>
          <button aria-label="Collapse assistant" title="Collapse assistant" className="p-1 rounded-lg hover:bg-theme-secondary transition-colors">
            <ChevronDown className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div className={`flex items-start space-x-2 max-w-[200px] ${message.isUser ? 'ml-auto' : ''}`}>
              {!message.isUser && (
                <div className="h-8 w-8 bg-theme-brand text-white flex items-center justify-center rounded-lg text-xs font-bold">
                  AI
                </div>
              )}
              <div className={`rounded-lg p-3 max-w-xs ${
                message.isUser
                  ? 'bg-theme-brand text-white'
                  : 'bg-theme-secondary text-theme-primary'
              }`}>
                {message.isLoading ? (
                  <p className="flex items-center gap-2 text-sm">
                    <Spinner size="small" className="size-4 shrink-0" />
                    <span>{message.content}</span>
                  </p>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.actions.map((action: AIAction, index: number) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className="text-[10px] bg-theme-secondary-subtle hover:bg-theme-secondary text-theme-primary px-2 py-1 rounded transition-colors border border-theme"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-theme flex items-center p-4">
        <div className="flex-1">
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ZTRED-AI..."
              className="w-full px-4 py-2 border border-theme rounded-xl text-theme-primary placeholder-theme focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-primary/20 transition-all bg-theme-input"
            />
            <button aria-label="Send message" title="Send message"
              onClick={sendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-theme-secondary transition-colors"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
            </button>
          </div>
        </div>
        {/* Voice input placeholder — wired up with the messaging backend. */}
        <button
          type="button"
          title="Voice input coming soon"
          className="ml-2 p-1 rounded-lg hover:bg-theme-secondary transition-colors"
        >
          <Mic className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
        </button>
      </div>
    </div>
  );
};
