"use client";

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Hash,
  Star,
  Users,
  Pin,
  Bell,
  Send,
  Smile,
  Paperclip,
} from 'lucide-react';

// ─── Data ───────────────────────────────────────────────────────

const channels = [
  { id: 'general', name: 'general', unread: 0, active: true },
  { id: 'design', name: 'design', unread: 3, active: false },
  { id: 'engineering', name: 'engineering', unread: 0, active: false },
  { id: 'marketing', name: 'marketing', unread: 12, active: false },
  { id: 'random', name: 'random', unread: 0, active: false },
  { id: 'product', name: 'product', unread: 1, active: false },
];

const messages = [
  {
    id: 1,
    sender: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
    time: '9:32 AM',
    text: 'Morning team! I just pushed the updated icon set to the shared library. 🚀',
  },
  {
    id: 2,
    sender: 'Sam Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    time: '9:40 AM',
    text: 'Nice! These look super crisp. Are we using them in the mobile nav too?',
  },
  {
    id: 3,
    sender: 'Jordan Lee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    time: '9:48 AM',
    text: "Yes — I'll swap them in this afternoon. Also updated the spacing tokens to match the 4pt grid.",
  },
  {
    id: 4,
    sender: 'Daniel Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    time: '10:05 AM',
    text: 'Perfect timing, I was about to rebuild the settings screen. Grabbing the latest now.',
  },
];

// ─── Main Page ──────────────────────────────────────────────────

export default function ChannelPage() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const filteredChannels = channels.filter((c) =>
    searchQuery ? c.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const currentChannel = channels.find((c) => c.id === activeChannel);

  return (
    <div className="flex-1 flex overflow-hidden font-sans" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ LEFT PANEL — Channel List ═══ */}
      <div className="w-[280px] flex flex-col shrink-0" style={{ borderRight: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Channels</h1>
            <button className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channels..."
              className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2 mb-2 block" style={{ color: 'var(--text-muted)' }}>
            Your channels
          </span>
          <div className="space-y-0.5">
            {filteredChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all ${
                  ch.active || activeChannel === ch.id
                    ? 'bg-purple-600/10 border border-purple-600/20'
                    : 'hover:opacity-80 border border-transparent'
                }`}
              >
                <Hash className={`w-4 h-4 shrink-0 ${
                  activeChannel === ch.id ? 'text-purple-400' : ''
                }`} />
                <span className={`text-sm flex-1 text-left truncate ${
                  activeChannel === ch.id ? 'font-medium' : ''
                }`}>
                  {ch.name}
                </span>
                {ch.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Channel Chat ═══ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel Header */}
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Hash className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <span className="font-bold text-base">{currentChannel?.name || 'general'}</span>
            </div>
            <Star className="w-4 h-4 hover:text-yellow-500 cursor-pointer transition-colors" style={{ color: 'var(--text-muted)' }} />
            <span className="text-sm ml-1" style={{ color: 'var(--text-muted)' }}>
              Design critiques, files, and inspiration
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2" style={{ color: 'var(--text-muted)' }}>
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">24</span>
            </div>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ color: 'var(--text-muted)' }}>
              <Pin className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ color: 'var(--text-muted)' }}>
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Welcome Banner */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4">
              <Hash className="w-7 h-7 text-purple-400" />
            </div>
            <h2 className="text-lg font-bold mb-1">
              Welcome to <span className="text-purple-400">#{currentChannel?.name || 'design'}</span>
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Design critiques, files, and inspiration
            </p>
          </div>

          {/* Messages */}
          <div className="space-y-5">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{msg.sender}</span>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{msg.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <button className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors shrink-0">
              <Plus className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${currentChannel?.name || 'design'}`}
              className="flex-1 bg-transparent text-sm focus:outline-none" style={{ color: 'var(--text-primary)' }}
            />
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: 'var(--text-muted)' }}>
                <Smile className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: 'var(--text-muted)' }}>
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <button className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
