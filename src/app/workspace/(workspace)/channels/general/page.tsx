"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
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
  Moon,
  MessageSquare,
  Paperclip,
  Pin,
  Plus,
  Send,
  Settings,
  Smile,
  Sparkles,
  Sun,
  Star,
  Users,
  Video,
} from "lucide-react";
import { format } from "date-fns";
import { useUIStore } from "@/stores/uiStore";
import { ZtredLogo } from "@/components/ui/ZtredLogo";

interface Channel {
  id: string;
  name: string;
  topic: string;
  unread?: number;
}

interface Message {
  id: string;
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

const CURRENT_USER = {
  author: "Jordan Lee",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
};

const initialMessages: Message[] = [
  {
    id: "m1",
    author: "Priya Nair",
    time: "9:32 AM",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    body: "Morning team! I just pushed the updated icon set to the shared library.",
  },
  {
    id: "m2",
    author: "Sam Rivera",
    time: "9:40 AM",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    body: "Nice! These look super crisp. Are we using them in the mobile nav too?",
  },
  {
    id: "m3",
    author: "Jordan Lee",
    time: "9:48 AM",
    avatar: CURRENT_USER.avatar,
    body: "Yes - I'll swap them in this afternoon. Also updated the spacing tokens to match the 4pt grid.",
  },
  {
    id: "m4",
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
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const [message, setMessage] = useState("");
  const [activeChannelId, setActiveChannelId] = useState("general");
  // Local optimistic messages — replace with a store/API call when the
  // messaging backend is wired up.
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const activeChannel = useMemo(
    () => channels.find((channel) => channel.id === activeChannelId) ?? channels[0],
    [activeChannelId]
  );

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: CURRENT_USER.author,
        time: format(new Date(), "h:mm a"),
        avatar: CURRENT_USER.avatar,
        body: trimmed,
      },
    ]);
    setMessage("");
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-theme-primary font-sans text-theme-primary selection:bg-purple-500 selection:text-white">
      <aside
        className="hidden w-[72px] shrink-0 flex-col items-center justify-between border-r border-theme bg-theme-sidebar px-3 py-4 md:flex"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-center gap-4">
          <NavLink
            href="/workspace/control"
            aria-label="Workspace control"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-theme-brand shadow-[0_10px_22px_rgba(95,61,255,0.35)]"
            title="Workspace control"
          >
            <ZtredLogo className="h-11 w-11" title="Ztred" />
          </NavLink>

          <button
            type="button"
            aria-label="Create new"
            title="Create new"
            className="flex h-9 min-h-0 w-11 min-w-0 items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>

          <nav className="mt-3 flex flex-col items-center gap-1.5" aria-label="Workspace sections">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  title={item.label}
                  className={`flex h-10 w-11 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-theme-brand text-white shadow-[0_10px_22px_rgba(95,61,255,0.35)]"
                      : "text-theme-secondary hover-theme-primary-subtle hover:text-theme-on-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3">
          {/* This route renders outside the workspace shell (see the early
              return in (workspace)/layout.tsx), so it needs its own toggle. */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 min-h-0 w-11 min-w-0 items-center justify-center rounded-xl border border-theme bg-theme-card text-theme-secondary transition-colors hover:text-theme-primary"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <NavLink
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
            <span
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-theme-success"
              style={{ borderColor: "var(--sidebar-bg)" }}
            />
          </NavLink>
        </div>
      </aside>

      <aside className="hidden w-[280px] shrink-0 border-r border-theme bg-theme-card px-5 py-5 md:flex md:flex-col">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-[26px] font-bold leading-none tracking-normal text-theme-primary">
            Channels
          </h1>
          <button
            type="button"
            aria-label="Add channel"
            className="flex h-9 min-h-0 w-9 min-w-0 items-center justify-center rounded-xl border border-theme-accent bg-theme-brand-subtle text-theme-on-primary"
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
          className="mb-5 h-[42px] w-full rounded-xl border border-theme bg-theme-input px-9 text-sm font-medium tracking-normal text-theme-primary placeholder-theme focus:border-theme-accent focus:outline-none"
        />

        <div className="mb-3 text-[12px] font-medium tracking-normal text-theme-muted">
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
                    ? "bg-theme-brand-subtle text-theme-on-primary"
                    : "text-theme-secondary hover:bg-theme-secondary hover:text-theme-primary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Hash
                  className={`h-4 w-4 shrink-0 ${
                    isActive ? "text-theme-on-primary" : "text-theme-muted"
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate">{channel.name}</span>
                {channel.unread ? (
                  <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-theme-brand px-1.5 text-[11px] font-bold leading-none text-white">
                    {channel.unread}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-theme-primary">
        <header className="flex h-[69px] shrink-0 items-center justify-between border-b border-theme px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Hash className="h-6 w-6 shrink-0 text-theme-secondary" aria-hidden="true" />
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="truncate text-[18px] font-bold leading-none tracking-normal text-theme-primary">
                {activeChannel.name}
              </h2>
              <Star className="h-4 w-4 shrink-0 text-theme-secondary" aria-hidden="true" />
            </div>
            <div className="hidden h-6 w-px bg-theme-surface sm:block" />
            <p className="hidden truncate text-sm font-normal tracking-normal text-theme-muted sm:block">
              {activeChannel.topic}
            </p>
          </div>

          <div className="flex items-center gap-5 text-theme-secondary">
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
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-theme-brand-subtle text-theme-on-primary">
                <Hash className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-[20px] font-bold leading-tight tracking-normal text-theme-primary">
                Welcome to #{activeChannel.name}
              </h3>
              <p className="text-sm font-normal leading-normal tracking-normal text-theme-muted">
                {activeChannel.topic}
              </p>
            </div>

            <div className="space-y-5">
              {messages.map((messageItem) => (
                <article key={messageItem.id} className="flex gap-3">
                  <img
                    src={messageItem.avatar}
                    alt=""
                    className="mt-0.5 h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 pt-0.5">
                    <div className="mb-1 flex items-baseline gap-2">
                      <h4 className="text-[15px] font-semibold leading-none tracking-normal text-theme-primary">
                        {messageItem.author}
                      </h4>
                      <time className="text-[12px] font-normal leading-none tracking-normal text-theme-muted">
                        {messageItem.time}
                      </time>
                    </div>
                    <p className="max-w-[820px] text-[15px] font-normal leading-[1.45] tracking-normal text-theme-primary">
                      {messageItem.body}
                    </p>
                  </div>
                </article>
              ))}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
          </div>

          <div className="shrink-0 px-6 pb-6">
            <form
              className="flex h-[62px] items-center gap-2 rounded-2xl border border-theme bg-theme-card px-3 shadow-[0_1px_0_rgba(20,20,30,0.02)]"
              onSubmit={handleSend}
            >
              <button
                type="button"
                aria-label="Add attachment"
                className="flex h-9 min-h-0 w-9 min-w-0 shrink-0 items-center justify-center rounded-lg bg-theme-brand text-white"
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
                className="min-w-0 flex-1 bg-transparent px-1 text-[15px] font-normal tracking-normal text-theme-primary outline-none placeholder-theme"
              />

              <div className="flex shrink-0 items-center gap-2 text-theme-secondary">
                <button type="button" aria-label="Add emoji" className="flex h-8 min-h-0 w-8 min-w-0 items-center justify-center rounded-lg">
                  <Smile className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" aria-label="Attach file" className="flex h-8 min-h-0 w-8 min-w-0 items-center justify-center rounded-lg">
                  <Paperclip className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="submit" aria-label="Send message" className="flex h-9 min-h-0 w-9 min-w-0 items-center justify-center rounded-lg bg-theme-brand text-white">
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
