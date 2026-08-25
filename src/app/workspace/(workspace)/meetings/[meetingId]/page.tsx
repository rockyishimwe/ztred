"use client";

import React, { useState } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MonitorUp,
  Users,
  MessageSquare,
  PhoneOff,
  Plus,
  Clock,
  Calendar,
  Copy,
  X,
  Link2,
  MoreHorizontal,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────

const participants = [
  {
    name: "Sam Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    isMuted: false,
    isSpeaking: true,
  },
  {
    name: "Lisa Park",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&auto=format&fit=crop&q=80",
    isMuted: true,
    isSpeaking: false,
  },
  {
    name: "Daniel Kim",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    isMuted: true,
    isSpeaking: false,
  },
  {
    name: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    isMuted: false,
    isSpeaking: false,
  },
];

const scheduleItems = [
  {
    title: "Design Review",
    time: "11:00 AM · 45 min",
    status: "live" as const,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Sprint Planning",
    time: "1:30 PM · 1 hr",
    status: "upcoming" as const,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Client Kickoff — Phoenix",
    time: "3:00 PM · 30 min",
    status: "upcoming" as const,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Marketing Standup",
    time: "9:00 AM · 15 min",
    status: "ended" as const,
    avatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    ],
  },
];

// ─── Create Meeting Modal ───────────────────────────────────────

function CreateMeetingModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [starts, setStarts] = useState("");
  const [duration, setDuration] = useState("");
  const meetingLink = "zenith.com/meet/new-room";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-md shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Create meeting</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Set up a room and share the invite in seconds.
        </p>

        {/* Meeting Title */}
        <div className="mb-4">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
            Meeting title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Project kickoff"
            className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Starts + Duration */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
              Starts
            </label>
            <input
              type="text"
              value={starts}
              onChange={(e) => setStarts(e.target.value)}
              className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bgCard borderCard rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Meeting Link */}
        <div className="flex items-center gap-3 p-3 bgCard borderCard rounded-xl mb-6">
          <Link2 className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
          <span className="flex-1 text-sm truncate" style={{ color: 'var(--text-muted)' }}>
            {meetingLink}
          </span>
          <button
            onClick={() => navigator.clipboard?.writeText(meetingLink)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors"
          >
            Create meeting
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function MeetingsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className="flex-1 flex overflow-hidden font-sans relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ LEFT AREA — Video Call + Controls ═══ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Meetings</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Join live calls and manage your schedule
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Meeting
          </button>
        </div>

        {/* Live Meeting Area */}
        <div className="flex-1 px-6 pb-4 flex flex-col">
          {/* Live Banner */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Design Review
              </span>
            </div>
            <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">12:34</span>
            </div>
          </div>

          {/* Participant Grid — 2x2 */}
          <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
            {participants.map((p, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl overflow-hidden border ${
                  p.isSpeaking
                    ? "border-purple-500 ring-2 ring-purple-500/30"
                    : "border-zinc-800"
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                {/* Name label */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-xs font-medium text-white">
                    {p.name}
                  </span>
                </div>
                {/* Mic indicator */}
                <div className="absolute bottom-3 right-3">
                  {p.isMuted ? (
                    <div className="w-7 h-7 rounded-full bg-red-500/80 flex items-center justify-center">
                      <MicOff className="w-3.5 h-3.5 text-white" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-zinc-700/80 flex items-center justify-center">
                      <Mic className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-center gap-3 py-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isMuted
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                !isVideoOn
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
              }`}
            >
              {isVideoOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </button>
            <button className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center transition-colors">
              <MonitorUp className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center transition-colors">
              <Users className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-500/25 transition-all ml-2">
              <PhoneOff className="w-4 h-4" />
              Leave
            </button>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT SIDEBAR — Today's Schedule ═══ */}
      <div className="w-[300px] flex flex-col shrink-0 overflow-y-auto" style={{ borderLeft: '1px solid var(--border-color)' }}>
        <div className="px-5 py-5">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
              Today&apos;s schedule
            </span>
          </div>

          <div className="space-y-4">
            {scheduleItems.map((item, idx) => (
              <div
                key={idx}
                className="bgCard borderCard rounded-xl p-4"
              >
                {/* Status + Time */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.status === "live"
                        ? "bg-red-500/20 text-red-400"
                        : item.status === "upcoming"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-zinc-700/50 text-zinc-500"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>

                {/* Participants + Action */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {item.avatars.map((av, i) => (
                      <img
                        key={i}
                        src={av}
                        alt=""
                        className="w-7 h-7 rounded-full border-2 border-[#141824] object-cover"
                      />
                    ))}
                  </div>

                  {item.status === "live" && (
                    <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
                      Join live
                    </button>
                  )}
                  {item.status === "upcoming" && (
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                      Join
                    </button>
                  )}
                  {item.status === "ended" && (
                    <button className="text-xs font-medium transition-colors" style={{ color: 'var(--text-muted)' }}>
                      View recording
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Create Meeting Modal ═══ */}
      {showCreateModal && (
        <CreateMeetingModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
