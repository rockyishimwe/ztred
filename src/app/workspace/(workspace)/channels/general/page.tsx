"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Bell,
  Calendar,
  CheckSquare,
  FileText,
  Folder,
  Hash,
  Home,
  MessageSquare,
  Paperclip,
  Pin,
  Plus,
  Send,
  Settings,
  Smile,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  topic: string;
  unread?: number;
}

interface Message {
  author: string;
  time: string;
  avatar: string;
  body: string;
}

const channels: Channel[] = [
  { id: "general", name: "general", topic: "Design critiques, files, and inspiration" },
  { id: "design", name: "design", topic: "Design critiques, files, and inspiration", unread: 3 },
  { id: "engineering", name: "engineering", topic: "Build notes, launches, and code reviews" },
  { id: "marketing", name: "marketing", topic: "Campaigns, copy, and GTM planning", unread: 12 },
  { id: "random", name: "random", topic: "Good links and team chatter" },
  { id: "product", name: "product", topic: "Roadmap, specs, and customer feedback", unread: 1 },
];

const messages: Message[] = [
  {
    author: "Priya Nair",
    time: "9:32 AM",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    body: "Morning team! I just pushed the updated icon set to the shared library.",
  },
  {
    author: "Sam Rivera",
    time: "9:40 AM",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    body: "Nice! These look super crisp. Are we using them in the mobile nav too?",
  },
  {
    author: "Jordan Lee",
    time: "9:48 AM",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
    body: "Yes - I'll swap them in this afternoon. Also updated the spacing tokens to match the 4pt grid.",
  },
  {
    author: "Daniel Kim",
    time: "10:05 AM",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    body: "Perfect timing, I was about to rebuild the settings screen. Grabbing the latest now.",
  },
];

const navItems = [
  { icon: Home, href: "/workspace", label: "Home" },
  { icon: MessageSquare, href: "/workspace/dm/user_1", label: "Messages" },
  { icon: Hash, href: "/workspace/channels/general", label: "Channels" },
  { icon: Video, href: "/workspace/meetings/meet_1", label: "Meetings" },
  { icon: Calendar, href: "/workspace/calendar", label: "Calendar" },
  { icon: CheckSquare, href: "/workspace/projects", label: "Projects" },
  { icon: Folder, href: "/workspace/files", label: "Files" },
  { icon: FileText, href: "/workspace/docs", label: "Docs" },
  { icon: Users, href: "/workspace/people", label: "People" },
  { icon: BarChart2, href: "/workspace/analytics", label: "Analytics" },
  { icon: Sparkles, href: "/workspace/ai", label: "AI" },
  { icon: Bell, href: "/workspace/notifications", label: "Notifications" },
  { icon: Settings, href: "/workspace/settings/profile", label: "Settings" },
];

export default function GeneralChannelPage() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [activeChannelId, setActiveChannelId] = useState("general");

  const activeChannel = useMemo(
    () => channels.find((channel) => channel.id === activeChannelId) ?? channels[0],
    [activeChannelId]
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-[#171719] selection:bg-[#7a5cff] selection:text-white dark:bg-[#06070b] dark:text-[#f6f4fb]">
      <aside
        className="hidden w-[72px] shrink-0 flex-col items-center justify-between border-r border-[#ececf0] bg-[#fbfbfc] px-3 py-4 md:flex dark:border-[#242434] dark:bg-[#0d0e14]"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/workspace/control"
            aria-label="Workspace control"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7657ff] shadow-[0_10px_22px_rgba(118,87,255,0.35)]"
            title="Workspace control"
          >
            <img src="/ztred-logo.svg" alt="Ztred" className="h-11 w-11" />
          </Link>

          <button
            type="button"
            aria-label="Create new"
            title="Create new"
            className="flex h-9 min-h-0 w-11 min-w-0 items-center justify-center rounded-xl border border-[#e7e7ec] bg-white text-[#6f6f7d] dark:border-[#262637] dark:bg-[#0b0c12] dark:text-[#aaa8bb]"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>

          <nav className="mt-3 flex flex-col items-center gap-1.5" aria-label="Workspace sections">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  title={item.label}
                  className={`flex h-10 w-11 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-[#7657ff] text-white shadow-[0_10px_22px_rgba(118,87,255,0.35)]"
                      : "text-[#70707f] hover:bg-[#f0eefc] hover:text-[#7657ff] dark:text-[#a2a0b3] dark:hover:bg-[#171426] dark:hover:text-[#8c6cff]"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/settings/profile"
          className="relative block h-11 w-11 rounded-full"
          aria-label="Jordan Lee profile"
          title="Jordan Lee"
        >
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80"
            alt="Jordan Lee"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#fbfbfc] bg-[#21b26f] dark:border-[#0d0e14]" />
        </Link>
      </aside>

      <aside className="hidden w-[280px] shrink-0 border-r border-[#ececf0] bg-white px-5 py-5 md:flex md:flex-col dark:border-[#242434] dark:bg-[#11111b]">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-[26px] font-bold leading-none tracking-normal text-[#111113] dark:text-white">
            Channels
          </h1>
          <button
            type="button"
            aria-label="Add channel"
            className="flex h-9 min-h-0 w-9 min-w-0 items-center justify-center rounded-xl border border-[#c8b8ff] bg-[#eee8ff] text-[#7657ff] dark:border-[#463277] dark:bg-[#211735] dark:text-[#7f5cff]"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <label className="sr-only" htmlFor="channel-search">
          Search channels
        </label>
        <input
          id="channel-search"
          type="search"
          placeholder="Search channels..."
          className="mb-5 h-[42px] w-full rounded-xl border border-transparent bg-[#f0f0f3] px-9 text-sm font-medium tracking-normal text-[#151518] placeholder:text-[#747482] focus:border-[#7657ff]/40 focus:outline-none dark:border-[#272737] dark:bg-[#181923] dark:text-white dark:placeholder:text-[#8e8c9f]"
        />

        <div className="mb-3 text-[12px] font-medium tracking-normal text-[#8a8a97] dark:text-[#8d8b9f]">
          Your channels
        </div>

        <nav className="space-y-1" aria-label="Channel list">
          {channels.map((channel) => {
            const isActive = channel.id === activeChannel.id;

            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => setActiveChannelId(channel.id)}
                className={`flex h-10 min-h-0 w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] font-medium tracking-normal transition ${
                  isActive
                    ? "bg-[#ede7ff] text-[#7657ff] dark:bg-[#211b36] dark:text-[#7463ff]"
                    : "text-[#666774] hover:bg-[#f4f3f8] hover:text-[#171719] dark:text-[#aaa7b8] dark:hover:bg-[#191a25] dark:hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Hash
                  className={`h-4 w-4 shrink-0 ${
                    isActive ? "text-[#7657ff]" : "text-[#71727e] dark:text-[#9c99aa]"
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate">{channel.name}</span>
                {channel.unread ? (
                  <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#7657ff] px-1.5 text-[11px] font-bold leading-none text-white">
                    {channel.unread}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-white dark:bg-[#06070b]">
        <header className="flex h-[69px] shrink-0 items-center justify-between border-b border-[#ececf0] px-6 dark:border-[#242434]">
          <div className="flex min-w-0 items-center gap-3">
            <Hash className="h-6 w-6 shrink-0 text-[#6e6f7c] dark:text-[#aaa8bb]" aria-hidden="true" />
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="truncate text-[18px] font-bold leading-none tracking-normal text-[#111113] dark:text-white">
                {activeChannel.name}
              </h2>
              <Star className="h-4 w-4 shrink-0 text-[#686977] dark:text-[#aaa8bb]" aria-hidden="true" />
            </div>
            <div className="hidden h-6 w-px bg-[#e3e3e8] sm:block dark:bg-[#292939]" />
            <p className="hidden truncate text-sm font-normal tracking-normal text-[#747482] sm:block dark:text-[#8d8b9f]">
              {activeChannel.topic}
            </p>
          </div>

          <div className="flex items-center gap-5 text-[#666774] dark:text-[#aaa8bb]">
            <div className="hidden items-center gap-1.5 text-sm font-medium md:flex">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>24</span>
            </div>
            <button type="button" className="flex h-8 min-h-0 w-8 min-w-0 items-center justify-center rounded-lg" aria-label="Pinned messages">
              <Pin className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" className="flex h-8 min-h-0 w-8 min-w-0 items-center justify-center rounded-lg" aria-label="Notifications">
              <Bell className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-6">
            <div className="mb-7 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8defd] text-[#7657ff] dark:bg-[#20183a] dark:text-[#805cff]">
                <Hash className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-[20px] font-bold leading-tight tracking-normal text-[#171719] dark:text-white">
                Welcome to #{activeChannel.name}
              </h3>
              <p className="text-sm font-normal leading-normal tracking-normal text-[#737381] dark:text-[#8d8b9f]">
                {activeChannel.topic}
              </p>
            </div>

            <div className="space-y-5">
              {messages.map((messageItem) => (
                <article key={`${messageItem.author}-${messageItem.time}`} className="flex gap-3">
                  <img
                    src={messageItem.avatar}
                    alt=""
                    className="mt-0.5 h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 pt-0.5">
                    <div className="mb-1 flex items-baseline gap-2">
                      <h4 className="text-[15px] font-semibold leading-none tracking-normal text-[#171719] dark:text-white">
                        {messageItem.author}
                      </h4>
                      <time className="text-[12px] font-normal leading-none tracking-normal text-[#7e7e8b] dark:text-[#8d8b9f]">
                        {messageItem.time}
                      </time>
                    </div>
                    <p className="max-w-[820px] text-[15px] font-normal leading-[1.45] tracking-normal text-[#171719] dark:text-[#f6f4fb]">
                      {messageItem.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="shrink-0 px-6 pb-6">
            <form
              className="flex h-[62px] items-center gap-2 rounded-2xl border border-[#e6e6eb] bg-white px-3 shadow-[0_1px_0_rgba(20,20,30,0.02)] dark:border-[#252535] dark:bg-[#171720]"
              onSubmit={(event) => event.preventDefault()}
            >
              <button
                type="button"
                aria-label="Add attachment"
                className="flex h-9 min-h-0 w-9 min-w-0 shrink-0 items-center justify-center rounded-lg bg-[#7657ff] text-white"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>

              <label className="sr-only" htmlFor="channel-message">
                Message #{activeChannel.name}
              </label>
              <input
                id="channel-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={`Message #${activeChannel.name}`}
                className="min-w-0 flex-1 bg-transparent px-1 text-[15px] font-normal tracking-normal text-[#171719] outline-none placeholder:text-[#737381] dark:text-white dark:placeholder:text-[#8d8b9f]"
              />

              <div className="flex shrink-0 items-center gap-2 text-[#686977] dark:text-[#aaa8bb]">
                <button type="button" aria-label="Add emoji" className="flex h-8 min-h-0 w-8 min-w-0 items-center justify-center rounded-lg">
                  <Smile className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" aria-label="Attach file" className="flex h-8 min-h-0 w-8 min-w-0 items-center justify-center rounded-lg">
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="submit" aria-label="Send message" className="flex h-9 min-h-0 w-9 min-w-0 items-center justify-center rounded-lg bg-[#7657ff] text-white">
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
