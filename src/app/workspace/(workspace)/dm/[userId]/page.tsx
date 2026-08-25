"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  SquarePen,
  Pin,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Plus,
  Smile,
  Code,
  Paperclip,
  Mic,
  AtSign,
  Zap,
  Play,
  Check,
  Download,
  ExternalLink,
  PhoneOff,
  Volume2,
} from 'lucide-react';

// ─── Data ───────────────────────────────────────────────────────

interface Conversation {
  id: string;
  name: string;
  avatar: string | null;
  initials?: string;
  bgColor?: string;
  isGroup: boolean;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  role?: string;
}

const conversations: Conversation[] = [
  {
    id: 'sam_rivera',
    name: 'Sam Rivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isGroup: false,
    lastMessage: 'You: Thanks! Let\'s review it...',
    time: '10:24 AM',
    unread: 2,
    online: true,
    role: 'Senior Engineer',
  },
  {
    id: 'design_team',
    name: 'Design Team',
    avatar: null,
    initials: 'DT',
    bgColor: 'bg-purple-600',
    isGroup: true,
    lastMessage: 'Priya: Shared a file',
    time: '9:48 AM',
    unread: 4,
  },
  {
    id: 'jordan_lee',
    name: 'Jordan Lee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isGroup: false,
    lastMessage: 'Jordan: Sounds good!',
    time: '9:15 AM',
    unread: 0,
    online: true,
    role: 'Product Designer',
  },
  {
    id: 'marketing_team',
    name: 'Marketing Team',
    avatar: null,
    initials: 'MT',
    bgColor: 'bg-pink-600',
    isGroup: true,
    lastMessage: 'Maya: Campaign assets',
    time: 'Yesterday',
    unread: 3,
  },
  {
    id: 'dev_team',
    name: 'Dev Team',
    avatar: null,
    initials: 'DV',
    bgColor: 'bg-green-600',
    isGroup: true,
    lastMessage: 'Alex: New commit pushed',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: 'project_phoenix',
    name: 'Project Phoenix',
    avatar: null,
    initials: 'PP',
    bgColor: 'bg-orange-600',
    isGroup: true,
    lastMessage: 'John: Status update',
    time: 'Yesterday',
    unread: 6,
  },
  {
    id: 'lisa_park',
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
    isGroup: false,
    lastMessage: 'You: Got it, thank you!',
    time: 'Tue',
    unread: 0,
    role: 'UX Researcher',
  },
  {
    id: 'sales_team',
    name: 'Sales Team',
    avatar: null,
    initials: 'ST',
    bgColor: 'bg-blue-600',
    isGroup: true,
    lastMessage: 'Chris: Sales report',
    time: 'Tue',
    unread: 0,
  },
  {
    id: 'daniel_kim',
    name: 'Daniel Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isGroup: false,
    lastMessage: 'You: See you tomorrow',
    time: 'Mon',
    unread: 0,
    role: 'Frontend Developer',
  },
];

// Per-conversation messages
const conversationMessages: Record<string, Array<{
  sender: string;
  avatar: string;
  time: string;
  text: string;
  isOwn: boolean;
  type: 'text' | 'voice' | 'file';
  reactions?: string[];
  duration?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  fileImage?: string;
}>> = {
  sam_rivera: [
    { sender: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', time: '10:18 AM', text: 'Hey! 👋 Just finished reviewing the latest design specs. Overall looks great!', isOwn: false, type: 'text' },
    { sender: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', time: '10:18 AM', text: 'I left a few comments on Figma.', isOwn: false, type: 'text' },
    { sender: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', time: '', text: '', isOwn: false, type: 'voice', reactions: ['👍', '😊'] },
    { sender: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '10:19 AM', text: 'Awesome! 🔥 I\'ll check them out right away.', isOwn: true, type: 'text' },
    { sender: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', time: '10:20 AM', text: 'Also, here\'s the prototype walkthrough.', isOwn: false, type: 'text' },
    { sender: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', time: '10:20 AM', text: '', isOwn: false, type: 'voice', duration: '1:24' },
    { sender: 'Sam Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', time: '10:21 AM', text: '', isOwn: false, type: 'file', fileName: 'dashboard-preview.png', fileSize: '2.4 MB', fileType: 'PNG', fileImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80' },
  ],
  jordan_lee: [
    { sender: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', time: '9:00 AM', text: 'Hey, do you have the latest mockups for the settings page?', isOwn: false, type: 'text' },
    { sender: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '9:05 AM', text: 'Yes! I just uploaded them to Figma. Check the "Settings v2" page.', isOwn: true, type: 'text' },
    { sender: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', time: '9:15 AM', text: 'Looks good! I\'ll start implementing it this afternoon.', isOwn: false, type: 'text' },
  ],
  lisa_park: [
    { sender: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80', time: '3:00 PM', text: 'The user research findings are ready. Want to schedule a review?', isOwn: false, type: 'text' },
    { sender: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '3:15 PM', text: 'Got it, thank you! Let\'s do it tomorrow morning.', isOwn: true, type: 'text' },
  ],
  daniel_kim: [
    { sender: 'Daniel Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', time: '4:00 PM', text: 'I pushed the latest build. Can you test it?', isOwn: false, type: 'text' },
    { sender: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '4:30 PM', text: 'On it! I\'ll check it out now.', isOwn: true, type: 'text' },
    { sender: 'Daniel Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', time: '4:45 PM', text: 'See you tomorrow', isOwn: false, type: 'text' },
    { sender: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '4:46 PM', text: 'See you tomorrow', isOwn: true, type: 'text' },
  ],
};

// Fill default messages for group chats
['design_team', 'marketing_team', 'dev_team', 'project_phoenix', 'sales_team'].forEach((id) => {
  if (!conversationMessages[id]) {
    const conv = conversations.find(c => c.id === id)!;
    conversationMessages[id] = [
      { sender: conv.name, avatar: '', time: '9:00 AM', text: `Welcome to ${conv.name}! This is the start of the conversation.`, isOwn: false, type: 'text' },
    ];
  }
});

// ─── Audio Call Modal ───────────────────────────────────────────

function AudioCallOverlay({
  name,
  avatar,
  onEnd,
}: {
  name: string;
  avatar: string;
  onEnd: () => void;
}) {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-3xl p-10 flex flex-col items-center w-[320px] shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Avatar with ring */}
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-full border-[3px] border-zinc-400 p-[3px]">
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
        </div>

        {/* Name */}
        <h2 className="text-lg font-bold text-theme-primary mb-1">{name}</h2>

        {/* Status */}
        <div className="flex items-center gap-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-sm text-green-400 font-medium">Audio call</span>
          <span className="text-sm text-green-400">•</span>
          <span className="text-sm text-green-400 font-mono">{formatTime(seconds)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-white/20 text-white' : 'bg-theme-card text-theme-secondary hover-theme-card'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isSpeaker ? 'bg-white/20 text-white' : 'bg-theme-card text-theme-secondary hover-theme-card'
            }`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-theme-card text-theme-secondary hover:bg-zinc-600 flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={onEnd}
          className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors shadow-lg shadow-red-500/30"
        >
          <PhoneOff className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function MessagingPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread' | 'Mentions'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [activeConvId, setActiveConvId] = useState('sam_rivera');
  const [callTarget, setCallTarget] = useState<{ name: string; avatar: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId)!;
  const activeMessages = conversationMessages[activeConvId] || [];

  const filteredConversations = conversations.filter((c) =>
    searchQuery ? c.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const handleCall = useCallback(() => {
    if (activeConv && !activeConv.isGroup) {
      setCallTarget({ name: activeConv.name, avatar: activeConv.avatar || '' });
    }
  }, [activeConv]);

  const handleSwitchConv = useCallback((id: string) => {
    setActiveConvId(id);
    setMessageInput('');
  }, []);

  return (
    <div className="flex-1 flex overflow-hidden font-sans relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ LEFT PANEL — Conversations ═══ */}
      <div className="w-[320px] border-r flex flex-col shrink-0" style={{ borderColor: 'var(--border-color)' }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-theme-primary">Messages</h1>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <SquarePen className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1">
            {(['All', 'Unread', 'Mentions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === tab
                    ? 'bg-purple-600 text-white'
                    : 'hover:opacity-80 border border-theme'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSwitchConv(conv.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeConvId === conv.id
                  ? 'bg-purple-600/10 border border-purple-600/20'
                  : 'hover:opacity-80 border border-transparent'
              }`}
            >
              <div className="relative shrink-0">
                {conv.avatar ? (
                  <img src={conv.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className={`w-10 h-10 ${conv.bgColor} rounded-full flex items-center justify-center font-bold text-[11px] text-white`}>
                    {conv.initials}
                  </div>
                )}
                {!conv.isGroup && conv.online && (                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2" style={{ borderColor: 'var(--bg-primary)' }} />
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-theme-primary truncate">{conv.name}</span>
                  <span className="text-[11px] text-theme-muted shrink-0 ml-2">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-theme-muted truncate">{conv.lastMessage}</span>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-[10px] font-bold text-white flex items-center justify-center shrink-0 ml-2">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Chat ═══ */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Chat Header */}
        <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              {activeConv.avatar ? (
                <img src={activeConv.avatar} alt={activeConv.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className={`w-10 h-10 ${activeConv.bgColor || 'bg-theme-card'} rounded-full flex items-center justify-center font-bold text-[11px] text-white`}>
                  {activeConv.initials}
                </div>
              )}
              {activeConv.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-theme" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-theme-primary">{activeConv.name}</span>
                {!activeConv.isGroup && <span className="text-yellow-500 text-xs">⭐</span>}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {activeConv.online && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                <span className="text-[11px] text-theme-muted">
                  {activeConv.online ? 'Active now' : activeConv.role || ''}
                </span>
                {activeConv.role && (
                  <>
                    <span className="text-[11px] text-theme-muted">·</span>
                    <span className="text-[11px] text-theme-muted">{activeConv.role}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
              <Pin className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={handleCall}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors"
              title={activeConv.isGroup ? 'Group call' : `Call ${activeConv.name}`}
            >
              <Phone className="w-4 h-4" />
            </button>
            <Link href="/workspace/meetings/current" className="w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
              <Video className="w-4 h-4" />
            </Link>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Today divider */}
          <div className="flex items-center justify-center">
            <span className="text-[11px] px-3 py-1 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              Today
            </span>
          </div>

          {activeMessages.map((msg, idx) => {
            if (msg.type === 'voice' && msg.reactions) {
              // Reactions-only message (inline reactions under previous voice note)
              return (
                <div key={idx} className="flex gap-1.5 ml-11">
                  {msg.reactions.map((r, ri) => (
                    <span key={ri} className="w-7 h-7 rounded-full flex items-center justify-center text-sm cursor-pointer transition-colors" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                      {r}
                    </span>
                  ))}
                </div>
              );
            }

            return (
              <div key={idx} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                {!msg.isOwn && msg.avatar && (
                  <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5" />
                )}

                <div className={`${msg.isOwn ? 'text-right' : ''} max-w-lg`}>
                  {!msg.isOwn && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-theme-primary">{msg.sender}</span>
                      <span className="text-[10px] text-theme-muted">{msg.time}</span>
                    </div>
                  )}
                  {msg.isOwn && (
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="text-[10px] text-theme-muted">{msg.time}</span>
                    </div>
                  )}

                  {/* Text message */}
                  {msg.type === 'text' && (
                    <>
                      <div className={`inline-block px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.isOwn
                          ? 'bg-purple-600 text-white rounded-br-md'
                          : 'rounded-bl-md text-theme-secondary'
                      }`} style={msg.isOwn ? undefined : { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        {msg.text}
                      </div>
                      {msg.isOwn && (
                        <div className="flex justify-end mt-0.5">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                      )}
                    </>
                  )}

                  {/* Voice message */}
                  {msg.type === 'voice' && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <button className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                          <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                        </button>
                        <div className="flex items-center gap-[2px] h-6">
                          {[40,65,30,80,50,70,35,90,45,75,60,85,25,55,70,40,65,80,30,50,75,45,60,85,35,55,70,40,65,80].map((h, i) => (
                            <div key={i} className="w-[3px] rounded-full bg-theme-secondary" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <span className="text-xs text-theme-muted shrink-0">{msg.duration || '1:24'}</span>
                        <span className="text-xs font-semibold text-theme-muted shrink-0">1x</span>
                      </div>
                    </div>
                  )}

                  {/* File message */}
                  {msg.type === 'file' && (                          <div className="rounded-2xl rounded-bl-md overflow-hidden max-w-sm" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                      {msg.fileImage && (
                        <div className="w-full h-32 bg-theme-secondary overflow-hidden">
                          <img src={msg.fileImage} alt={msg.fileName} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="px-4 py-3 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-theme-primary">{msg.fileName}</div>
                          <div className="text-[11px] text-theme-muted">{msg.fileSize} · {msg.fileType}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${activeConv.name}...`}
              className="w-full bg-transparent text-sm text-theme-primary placeholder-theme focus:outline-none"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-0.5">
                <button className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                  <Code className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                  <AtSign className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors">
                  <Zap className="w-4 h-4" />
                </button>
              </div>
              <button className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ Audio Call Overlay ═══ */}
        {callTarget && (
          <AudioCallOverlay
            name={callTarget.name}
            avatar={callTarget.avatar}
            onEnd={() => setCallTarget(null)}
          />
        )}
      </div>
    </div>
  );
}
