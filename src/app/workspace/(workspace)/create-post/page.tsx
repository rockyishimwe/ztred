"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Image as ImageIcon,
  Video,
  Smile,
  Hash,
  MapPin,
} from 'lucide-react';

const AUDIENCE_OPTIONS = ['Everyone', 'Team only', 'Just me'] as const;

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<string>('Everyone');

  const handlePost = () => {
    if (!content.trim()) return;
    // TODO: submit post to backend
    router.push('/workspace');
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1 px-6 lg:px-10 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/workspace"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Create Post</h1>
          </div>

          {/* Post Composer Card */}
          <div className="bgCard borderCard rounded-2xl p-5">
            {/* Author Row */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
                alt="Jordan Lee"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Jordan Lee</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-3 h-3 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{audience}</span>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              className="w-full bg-transparent text-sm focus:outline-none resize-none leading-relaxed"
            />

            {/* Divider */}
            <div className="h-px my-4" style={{ backgroundColor: 'var(--border-color)' }} />

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <Hash className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                  <MapPin className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handlePost}
                disabled={!content.trim()}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                  content.trim()
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25'
                    : 'cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>

          {/* Audience Selector */}
          <div className="flex items-center gap-2 mt-4">
            {AUDIENCE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setAudience(option)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  audience === option
                    ? 'bg-purple-600 text-white'
                    : 'bgCard borderCard hover:border-zinc-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
