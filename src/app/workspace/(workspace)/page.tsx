"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Plus,
  Image as ImageIcon,
  Smile,
  MoreHorizontal,
  TrendingUp,
  Video,
  Heart,
  Send,
  Pause,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function WorkspaceHomePage() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const stories = [
    {
      name: 'Your Story',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
      time: '1h',
      isYou: true,
    },
    {
      name: 'Sam Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
      time: '2h',
    },
    {
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80',
      time: '3h',
    },
    {
      name: 'Daniel Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&auto=format&fit=crop&q=80',
      time: '4h',
    },
    {
      name: 'Jordan Lee',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1511497584788-876761197069?w=1200&auto=format&fit=crop&q=80',
      time: '2h',
    },
  ];

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  const handlePrevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const handleNextStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const trendingTags = [
    { tag: 'q3-launch', posts: 120 },
    { tag: 'design-system', posts: 90 },
    { tag: 'mobile-app', posts: 60 },
    { tag: 'hiring', posts: 30 },
  ];

  const meetings = [
    {
      title: 'Design Standup',
      time: '9:00 AM · 30 min',
      color: 'bg-purple-600',
      iconColor: 'text-purple-400',
      participants: 6,
    },
    {
      title: 'Product Roadmap Review',
      time: '11:00 AM · 1 hour',
      color: 'bg-orange-600',
      iconColor: 'text-orange-400',
      participants: 4,
    },
    {
      title: 'Weekly Sync',
      time: '3:00 PM · 45 min',
      color: 'bg-green-600',
      iconColor: 'text-green-400',
      participants: 8,
    },
  ];

  const suggestedPeople = [
    { name: 'Maya Chen', role: 'Marketing', initials: 'MA', bgColor: 'bg-blue-600' },
    { name: 'Alex Wu', role: 'Engineering', initials: 'AL', bgColor: 'bg-purple-600' },
    { name: 'Priya Nair', role: 'Design', initials: 'PR', bgColor: 'bg-purple-600' },
  ];

  return (
    <div className="flex-1 flex overflow-hidden font-sans relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Main Content Feed */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Home</h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Latest from your workspace</p>
            </div>
            <Link href="/workspace/create-post" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-2 transition-all">
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </Link>
          </div>

          {/* Stories Row */}
          <div className="flex items-center gap-5 overflow-x-auto pb-1">
            {stories.map((story, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStoryIndex(idx)}
                className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
              >
                <div className="relative">
                  <div className="w-[60px] h-[60px] rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-indigo-500 group-hover:scale-105 transition-transform">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-full h-full rounded-full object-cover bg-[#141824]"
                    />
                  </div>
                  {story.isYou && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold" style={{ border: '2.5px solid var(--bg-primary)' }}>
                      +
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                  {story.name}
                </span>
              </div>
            ))}
          </div>

          {/* Share Composer */}
          <Link href="/workspace/create-post" className="rounded-2xl px-4 py-3 flex items-center gap-3 transition-colors cursor-pointer" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-[11px] shrink-0 text-white">
              AR
            </div>
            <span className="flex-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              Share something with your team...
            </span>
            <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <div className="p-1.5">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="p-1.5">
                <Smile className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Post Card */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="Sam Rivera"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">Sam Rivera</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Senior Engineer · 2h ago</p>
                  </div>
                </div>
                <button className="p-1 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-5 pt-3 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Just shipped the new dashboard redesign 🚀 Huge thanks to the design team for the incredible work. The ne...
            </div>

            {/* Post Image Attachment */}              <div className="w-full h-[400px] overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
                alt="Dashboard Redesign Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[300px] p-5 overflow-y-auto space-y-5 hidden xl:block shrink-0" style={{ backgroundColor: 'var(--bg-primary)', borderLeft: '1px solid var(--border-color)' }}>
        {/* AI Assistant Widget */}
        <div className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-sm">AI Assistant</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Summarize threads, draft posts, or find anything across your workspace.
          </p>           <a href="/workspace/ai" className="inline-block text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors pt-1">
            Ask Zenith AI →
           </a>
        </div>

        {/* Trending Widget */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-sm">Trending</span>
          </div>
          <div className="space-y-3">
            {trendingTags.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium group-hover:opacity-80 transition-opacity">
                  #{item.tag}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.posts} posts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Meetings */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-sm">Today&apos;s Meetings</span>
            <a href="#" className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors">
              View all
            </a>
          </div>
          <div className="space-y-3">
            {meetings.map((m, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${m.color} flex items-center justify-center shrink-0`}>
                  <Video className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{m.title}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{m.time}</div>
                </div>
                <div className="flex -space-x-1.5 shrink-0">
                  <div className="inline-block h-6 w-6 rounded-full bg-purple-600 text-[9px] font-bold flex items-center justify-center text-white" style={{ boxShadow: '0 0 0 2px var(--bg-card)' }}>
                    SR
                  </div>
                  <div className="inline-block h-6 w-6 rounded-full bg-blue-600 text-[9px] font-bold flex items-center justify-center text-white" style={{ boxShadow: '0 0 0 2px var(--bg-card)' }}>
                    +{m.participants}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested People */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <span className="font-bold text-sm block mb-4">Suggested people</span>
          <div className="space-y-4">
            {suggestedPeople.map((person, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${person.bgColor} flex items-center justify-center font-bold text-[11px] text-white`}>
                    {person.initials}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{person.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{person.role}</div>
                  </div>
                </div>
                <button className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            {/* Story Image Background */}
            <div className="absolute inset-0 z-0">
              <img src={activeStory.image} alt="Story content" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
            </div>

            {/* Top Bar */}
            <div className="relative z-10 p-4 space-y-3">
              <div className="grid grid-cols-5 gap-1.5">
                {stories.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full ${
                      activeStoryIndex !== null && i < activeStoryIndex
                        ? 'bg-white'
                        : activeStoryIndex !== null && i === activeStoryIndex
                        ? 'bg-white animate-pulse'
                        : 'bg-white/40'
                    }`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2.5">
                  <img src={activeStory.avatar} alt={activeStory.name} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                  <div>
                    <span className="font-semibold text-sm text-white">{activeStory.name}</span>
                    <span className="text-xs ml-2" style={{ color: 'var(--text-secondary)' }}>{activeStory.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <button className="p-1 hover:bg-white/10 rounded"><Pause className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-white/10 rounded"><MoreHorizontal className="w-4 h-4" /></button>
                  <button onClick={() => setActiveStoryIndex(null)} className="p-1 hover:bg-white/10 rounded"><X className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-20 inset-x-0 z-10 flex items-center justify-between px-2 pointer-events-none">
              {activeStoryIndex !== null && activeStoryIndex > 0 ? (
                <button onClick={handlePrevStory} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors pointer-events-auto">
                  <ChevronLeft className="w-6 h-6" />
                </button>
              ) : <div></div>}
              {activeStoryIndex !== null && activeStoryIndex < stories.length - 1 ? (
                <button onClick={handleNextStory} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors pointer-events-auto">
                  <ChevronRight className="w-6 h-6" />
                </button>
              ) : <div></div>}
            </div>

            {/* Bottom Interaction Bar */}
            <div className="relative z-10 p-4 flex items-center gap-3 bg-gradient-to-t from-black/90 to-transparent pt-8">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${activeStory.name}...`}
                className="flex-1 backdrop-blur-md rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
              />
              <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
