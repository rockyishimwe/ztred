"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { Modal } from "@/components/ui/Modal";
import { MEETINGS, getMeeting } from "@/lib/mock/meetings";
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

// Meeting data lives in @/lib/mock/meetings so the list route and this detail
// route resolve the same records.

// ─── Create Meeting Modal ───────────────────────────────────────

function CreateMeetingModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [starts, setStarts] = useState("");
  const [duration, setDuration] = useState("");
  const meetingLink = "zenith.com/meet/new-room";

  return (
    <Modal
      open
      onClose={onClose}
      title="Create meeting"
      description="Set up a room and share the invite in seconds."
      size="sm"
      contained
    >
      <div>

        {/* Meeting Title */}
        <div className="mb-4">
          <label htmlFor="meetingid-meeting-title" className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Meeting title</label>
          <input id="meetingid-meeting-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Project kickoff"
            className="w-full input-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Starts + Duration */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="meetingid-starts" className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Starts</label>
            <input id="meetingid-starts"
              type="text"
              value={starts}
              onChange={(e) => setStarts(e.target.value)}
              className="w-full input-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          <div>
            <label htmlFor="meetingid-duration" className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Duration</label>
            <input id="meetingid-duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full input-theme rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Meeting Link */}
        <div className="flex items-center gap-3 p-3 input-theme rounded-xl mb-6">
          <Link2 className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
          <span className="flex-1 text-sm truncate" style={{ color: 'var(--text-muted)' }}>
            {meetingLink}
          </span>
          <button type="button"
            onClick={() => navigator.clipboard?.writeText(meetingLink)}
            className="hit-area-touch w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-colors"
          >
            Create meeting
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function MeetingsPage() {
  // Resolve the [meetingId] segment. `getMeeting` falls back to the default
  // when the id is unknown — /workspace/meetings/current is a real link in the
  // DM header and is not a meeting id.
  const params = useParams<{ meetingId: string }>();
  const meeting = getMeeting(
    typeof params?.meetingId === "string" ? params.meetingId : undefined
  );

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
          <button type="button"
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
              {meeting.status === "live" ? (
                <div className="flex items-center gap-1.5 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </div>
              ) : (
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-secondary-subtle"
                  style={{ color: "var(--text-muted)" }}
                >
                  {meeting.status}
                </div>
              )}
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {meeting.title}
              </span>
            </div>
            <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">{meeting.elapsed}</span>
            </div>
          </div>

          {/* Participant Grid — 2x2 */}
          <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
            {meeting.participants.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl overflow-hidden border ${
                  p.isSpeaking
                    ? "border-purple-500 ring-2 ring-purple-500/30"
                    : "border-theme"
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                {/* Name label */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-xs font-medium text-theme-primary">
                    {p.name}
                  </span>
                </div>
                {/* Mic indicator */}
                <div className="absolute bottom-3 right-3">
                  {p.isMuted ? (
                    <div className="w-7 h-7 rounded-full bg-red-500/80 flex items-center justify-center">
                      <MicOff className="w-3.5 h-3.5 text-theme-primary" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-theme-secondary-hover/80 flex items-center justify-center">
                      <Mic className="w-3.5 h-3.5 text-theme-primary" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-center gap-3 py-3">
            <button type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isMuted
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-theme-card text-theme-secondary hover:bg-theme-secondary-hover border border-theme"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <button type="button"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                !isVideoOn
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-theme-card text-theme-secondary hover:bg-theme-secondary-hover border border-theme"
              }`}
            >
              {isVideoOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </button>
            <button type="button" aria-label="Share screen" title="Share screen" className="w-12 h-12 rounded-full bg-theme-card text-theme-secondary hover:bg-theme-secondary-hover border border-theme flex items-center justify-center transition-colors">
              <MonitorUp className="w-5 h-5" />
            </button>
            <button type="button" aria-label="Show participants" title="Show participants" className="w-12 h-12 rounded-full bg-theme-card text-theme-secondary hover:bg-theme-secondary-hover border border-theme flex items-center justify-center transition-colors">
              <Users className="w-5 h-5" />
            </button>
            <button type="button" aria-label="Open meeting chat" title="Open meeting chat" className="w-12 h-12 rounded-full bg-theme-card text-theme-secondary hover:bg-theme-secondary-hover border border-theme flex items-center justify-center transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button type="button" className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-500/25 transition-all ml-2">
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
            {MEETINGS.map((item) => (
              <NavLink
                key={item.id}
                href={`/workspace/meetings/${item.id}`}
                aria-current={item.id === meeting.id ? "page" : undefined}
                className="card rounded-xl p-4 block transition-colors"
                style={
                  item.id === meeting.id
                    ? { borderColor: "var(--primary)" }
                    : undefined
                }
              >
                {/* Status + Time */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.status === "live"
                        ? "bg-red-500/20 text-red-400"
                        : item.status === "upcoming"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-theme-secondary-subtle text-theme-muted"
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

                {/* Participants + Action.
                    The card itself is the link, so these read as labels rather
                    than buttons — a <button type="button"> nested in an <a> is invalid and
                    gives keyboard users two targets for one destination. */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {item.participants.map((p) => (
                      <img
                        key={p.name}
                        src={p.avatar}
                        alt=""
                        className="w-7 h-7 rounded-full border-2 border-theme-card object-cover"
                      />
                    ))}
                  </div>

                  {item.status === "live" && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg">
                      Join live
                    </span>
                  )}
                  {item.status === "upcoming" && (
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-muted)' }}>
                      Join
                    </span>
                  )}
                  {item.status === "ended" && (
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      View recording
                    </span>
                  )}
                </div>
              </NavLink>
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
