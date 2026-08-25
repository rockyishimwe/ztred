"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MessageSquare, UserPlus } from "lucide-react";

interface Member {
  name: string;
  role: string;
  department: string;
  avatar?: string;
  initials?: string;
  bgColor?: string;
  online?: boolean;
}

const members: Member[] = [
  {
    name: "Sam Rivera",
    role: "Senior Engineer",
    department: "Engineering",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    online: true,
  },
  {
    name: "Lisa Park",
    role: "Product Marketing",
    department: "Marketing",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80",
    online: true,
  },
  {
    name: "Jordan Lee",
    role: "Product Designer",
    department: "Design",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    online: true,
  },
  {
    name: "Daniel Kim",
    role: "Backend Engineer",
    department: "Engineering",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    online: false,
  },
  {
    name: "Maya Chen",
    role: "Growth Lead",
    department: "Marketing",
    initials: "MA",
    bgColor: "bg-pink-600",
    online: false,
  },
  {
    name: "Alex Wu",
    role: "Frontend Engineer",
    department: "Engineering",
    initials: "AL",
    bgColor: "bg-green-500",
    online: true,
  },
  {
    name: "Priya Nair",
    role: "Design Lead",
    department: "Design",
    initials: "PR",
    bgColor: "bg-orange-500",
    online: false,
  },
  {
    name: "Chris Doyle",
    role: "Sales Manager",
    department: "Sales",
    initials: "CH",
    bgColor: "bg-blue-500",
    online: true,
  },
];

export default function PeoplePage() {
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">People</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              {members.length} members in this workspace
            </p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-2 transition-all">
            <UserPlus className="w-4 h-4" />
            <span>Invite</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people..."
            className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl p-5 flex flex-col items-center text-center transition-colors"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              {/* Avatar */}
              <div className="relative mb-3">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-16 h-16 rounded-full ${member.bgColor} flex items-center justify-center font-bold text-lg text-white`}
                  >
                    {member.initials}
                  </div>
                )}
                {member.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-[3px] border-[#141824]" />
                )}
              </div>

              {/* Info */}
              <h3 className="font-semibold text-sm">
                {member.name}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{member.role}</p>
              <span className="text-[11px] mt-2 inline-block" style={{ color: 'var(--text-muted)' }}>
                {member.department}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 w-full">
                <Link
                  href={`/workspace/dm/${member.name.toLowerCase().replace(/\s+/g, "_")}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-500 text-xs font-medium py-2 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </Link>
                <button className="flex-1 flex items-center justify-center gap-1.5 hover:opacity-80 text-xs font-medium py-2 rounded-xl transition-colors" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)' }}>
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
