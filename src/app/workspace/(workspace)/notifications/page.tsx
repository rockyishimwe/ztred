"use client";

import React, { useState } from "react";
import {
  Bell,
  MessageCircle,
  Heart,
  CheckCircle2,
  MessageSquare,
  FileText,
  Calendar,
  CheckCheck,
} from "lucide-react";

type FilterTab = "all" | "mentions" | "tasks" | "unread";

interface Notification {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  unread: boolean;
  type: "mention" | "like" | "task" | "comment" | "share" | "meeting";
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    user: {
      name: "Sam Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    action: "mentioned you in",
    target: "#design",
    time: "5m ago",
    icon: <MessageCircle className="w-3.5 h-3.5" />,
    iconBg: "bg-purple-500/20 text-purple-400",
    unread: true,
    type: "mention",
  },
  {
    id: "2",
    user: {
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80",
    },
    action: "liked your",
    target: "post",
    time: "20m ago",
    icon: <Heart className="w-3.5 h-3.5" />,
    iconBg: "bg-pink-500/20 text-pink-400",
    unread: true,
    type: "like",
  },
  {
    id: "3",
    user: {
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
    action: 'assigned you a task: "QA mobile layout"',
    target: "",
    time: "1h ago",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    iconBg: "bg-emerald-500/20 text-emerald-400",
    unread: true,
    type: "task",
  },
  {
    id: "4",
    user: {
      name: "Daniel Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    action: "commented on your",
    target: "document",
    time: "2h ago",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
    iconBg: "bg-blue-500/20 text-blue-400",
    unread: false,
    type: "comment",
  },
  {
    id: "5",
    user: {
      name: "Sam Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    action: "shared roadmap-v2.pdf with you",
    target: "",
    time: "3h ago",
    icon: <FileText className="w-3.5 h-3.5" />,
    iconBg: "bg-amber-500/20 text-amber-400",
    unread: false,
    type: "share",
  },
  {
    id: "6",
    user: {
      name: "Design Review",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    action: "starts in 15 minutes",
    target: "",
    time: "4h ago",
    icon: <Calendar className="w-3.5 h-3.5" />,
    iconBg: "bg-red-500/20 text-red-400",
    unread: false,
    type: "meeting",
  },
];

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mentions", label: "Mentions" },
  { key: "tasks", label: "Tasks" },
  { key: "unread", label: "Unread" },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "mentions") return n.type === "mention";
    if (activeTab === "tasks") return n.type === "task";
    if (activeTab === "unread") return n.unread;
    return true;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ═══ Header ═══ */}
      <div
        className="px-8 py-5 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Notifications
            </h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {unreadCount} unread
            </p>
          </div>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
          }}
        >
          <CheckCheck className="w-4 h-4" />
          Mark all read
        </button>
      </div>

      {/* ═══ Filter Tabs ═══ */}
      <div
        className="px-8 py-3 flex items-center gap-1 shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor:
                activeTab === tab.key ? "var(--primary)" : "transparent",
              color: activeTab === tab.key ? "#ffffff" : "var(--text-muted)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ Notification List ═══ */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="max-w-3xl space-y-2">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.005]"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center ${notification.iconBg}`}
                  style={{ border: "2px solid var(--bg-card)" }}
                >
                  {notification.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    {notification.user.name}
                  </span>{" "}
                  {notification.action}
                  {notification.target && (
                    <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {" "}
                      {notification.target}
                    </span>
                  )}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {notification.time}
                </p>
              </div>

              {/* Unread dot */}
              {notification.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
              )}
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Bell className="w-12 h-12 mb-4" style={{ color: "var(--text-muted)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                No notifications
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                You&apos;re all caught up!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
