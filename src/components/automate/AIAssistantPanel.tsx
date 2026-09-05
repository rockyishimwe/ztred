"use client";
import React, { useState } from 'react';
import { Send, Mic, RefreshCw, Trash2, ChevronDown } from 'lucide-react';

export const AIAssistantPanel: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setMessages(prev => [...prev, {
      id: Date.now().toString() + 'a',
      content: 'Generating response...',
      isUser: false,
      isLoading: true
    }]);

    // Simulate delay
    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: Date.now().toString() + 'a',
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
        };
        return updated;
      });
    }, 1500);
  };

  return (
    <div className="w-72 bg-theme-card border-l border-theme flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <h2 className="text-xl font-bold text-theme-primary">
          ZTRED-AI
        </h2>
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-lg hover:bg-theme-secondary transition-colors">
            <RefreshCw className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
          </button>
          <button className="p-1 rounded-lg hover:bg-theme-secondary transition-colors">
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
                <div className="h-8 w-8 bg-theme-primary text-white flex items-center justify-center rounded-lg text-xs font-bold">
                  AI
                </div>
              )}
              <div className={`rounded-lg p-3 max-w-xs ${
                message.isUser
                  ? 'bg-theme-primary text-white'
                  : 'bg-theme-secondary text-theme-primary'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.isLoading && (
                  <div className="h-2 w-full bg-theme-primary/20 rounded mt-1">
                    <div className="h-2 w-1/3 bg-theme-primary rounded"></div>
                  </div>
                )}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex space-x-2 mt-2">
                    {message.actions.map((action: any, index: number) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className="text-xs bg-transparent hover:text-theme-on-primary px-2 py-1 rounded transition-colors"
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
            <button
              onClick={sendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-theme-secondary transition-colors"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
            </button>
          </div>
        </div>
        <button
          onClick={() => setInput('')}
          className="ml-2 p-1 rounded-lg hover:bg-theme-secondary transition-colors"
        >
          <Mic className="h-4 w-4 text-theme-muted hover:text-theme-primary"/>
        </button>
      </div>
    </div>
  );
};
