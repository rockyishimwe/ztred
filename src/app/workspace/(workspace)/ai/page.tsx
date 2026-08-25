"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Plus,
  FileText,
  ListChecks,
  Search,
  PenLine,
  Bot,
  User,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  {
    icon: FileText,
    text: "Summarize the #design channel today",
    color: "text-purple-400",
    bgColor: "bg-purple-500/15",
  },
  {
    icon: ListChecks,
    text: "What tasks are due this week?",
    color: "text-blue-400",
    bgColor: "bg-blue-500/15",
  },
  {
    icon: Search,
    text: "Find the Q3 roadmap document",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/15",
  },
  {
    icon: PenLine,
    text: "Draft a launch announcement post",
    color: "text-amber-400",
    bgColor: "bg-amber-500/15",
  },
];

const WORKSPACE_CONTEXT = {
  channels: [
    { name: "design", lastMessage: "Priya shared the updated icon set", unread: 4 },
    { name: "engineering", lastMessage: "Jordan merged the mobile nav PR", unread: 2 },
    { name: "general", lastMessage: "Sam: Team standup at 10am", unread: 0 },
  ],
  tasks: [
    { title: "API rate limiting", due: "Jul 22", priority: "high" },
    { title: "QA mobile layout", due: "Jul 21", priority: "high" },
    { title: "Design system tokens", due: "Jul 25", priority: "medium" },
    { title: "Sprint retro notes", due: "Jul 25", priority: "low" },
  ],
  docs: [
    { title: "Q3 Product Roadmap", updatedBy: "Sam Rivera", updated: "2h ago" },
    { title: "Brand Guidelines v2", updatedBy: "Lisa Park", updated: "1d ago" },
  ],
  recentActivity: [
    "Design team wrapped the icon set update",
    "Jordan is swapping them into the mobile nav this afternoon",
    "Sam pushed the dashboard redesign to staging",
  ],
};

const getAIResponseForMessage = (userMessage: string): string => {
  const lower = userMessage.toLowerCase().trim();

  // Greetings
  if (lower === "hi" || lower === "hello" || lower === "hey" || lower === "yo") {
    return `Based on your workspace, the design team wrapped the icon set update and Jordan is swapping them into the mobile nav this afternoon. Two high-priority tasks are due this week — "API rate limiting" (Jul 22) and "QA mobile layout" (Jul 21). Want me to draft a follow-up or create a summary doc?`;
  }

  // Summarize requests
  if (lower.includes("summarize") || lower.includes("summary")) {
    const target = lower.includes("design") ? "#design" : lower.includes("engineering") ? "#engineering" : "#general";
    return `Here's a quick take on ${target}:\n\nThe team discussed the icon set refresh — 48 icons updated with consistent 2px stroke width. Jordan posted mockups for the settings page redesign. The group agreed on moving the accent color from blue to purple. Next steps: Sam reviews icons by EOD, Lisa updates Figma tokens, design review scheduled for tomorrow at 10 AM.`;
  }

  // Task queries
  if (lower.includes("task") || lower.includes("due") || lower.includes("deadline")) {
    return `Here's a quick take on your tasks:\n\nTwo high-priority items need attention: "API rate limiting" is due Jul 22 and "QA mobile layout" is due Jul 21. Jordan is handling both. On the design side, "Design system tokens" and "Sprint retro notes" are both due Jul 25. Want me to send a reminder to the team or update the board?`;
  }

  // Find/search requests
  if (lower.includes("find") || lower.includes("search") || lower.includes("where")) {
    return `Here's what I found:\n\nThe Q3 Product Roadmap was last updated 2 hours ago by Sam Rivera — it's in Documents > Product > Roadmaps. The Brand Guidelines v2 was updated yesterday by Lisa Park. Both are in the shared workspace. Want me to open either one or pull a summary?`;
  }

  // Draft requests
  if (lower.includes("draft") || lower.includes("write") || lower.includes("compose")) {
    return `Here's a quick draft:\n\n"Team — quick update on this week's progress. The design team delivered the new icon set (48 icons, consistent 2px stroke). Jordan is integrating them into the mobile nav today. Two critical tasks are in flight: API rate limiting (Jul 22) and QA mobile layout (Jul 21). Design review is tomorrow at 10 AM. Let me know if you need anything else."
\nWant me to adjust the tone or send it to a specific channel?`;
  }

  // Meeting queries
  if (lower.includes("meeting") || lower.includes("call") || lower.includes("schedule")) {
    return `Here's a quick take on your schedule:\n\nYou have a design review scheduled for tomorrow at 10 AM. The weekly sync is at 3 PM today. Sam mentioned wanting to set up a Q3 planning session — should I find a slot and send invites?`;
  }

  // People queries
  if (lower.includes("who") || lower.includes("people") || lower.includes("team")) {
    return `Here's a quick take on your team:\n\nSam Rivera is leading the dashboard redesign and pushed to staging today. Jordan Lee is handling the mobile nav icon integration. Priya Nair delivered the updated icon set. Lisa Park updated the brand guidelines. Want me to pull up anyone's profile or recent contributions?`;
  }

  // Memes / fun
  if (lower.includes("meme") || lower.includes("fun") || lower.includes("joke")) {
    return `Here's a quick take on that:\n\nI'm more of a productivity assistant than a comedian, but here's a workplace classic: Why do programmers prefer dark mode? Because light attracts bugs. 🪲\n\nBack to work — want me to summarize a channel or check on your tasks?`;
  }

  // Default contextual response
  const randomActivity = WORKSPACE_CONTEXT.recentActivity[Math.floor(Math.random() * WORKSPACE_CONTEXT.recentActivity.length)];
  const randomTask = WORKSPACE_CONTEXT.tasks[Math.floor(Math.random() * WORKSPACE_CONTEXT.tasks.length)];
  return `Here's a quick take on "${userMessage.slice(0, 30)}${userMessage.length > 30 ? '...' : ''}":\n\nBased on your workspace, ${randomActivity.toLowerCase()}. You also have "${randomTask.title}" due ${randomTask.due}. Want me to dig deeper into any of this, or is there something specific you'd like me to help with?`;
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponseForMessage(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden font-sans relative"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ═══ Header ═══ */}
      <div
        className="px-6 py-4 flex items-center gap-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border-color)" }}
      >
        <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Ztred AI
          </h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Ready to help
            </span>
          </div>
        </div>
      </div>

      {/* ═══ Messages Area ═══ */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          /* ═══ Empty State — Welcome Screen ═══ */
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
            {/* AI Icon */}
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>

            {/* Heading */}
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              How can I help you today?
            </h2>

            {/* Subtitle */}
            <p
              className="text-base mb-10 max-w-md leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Ask me anything about your workspace — summarize threads, find
              files, draft messages, or plan your day.
            </p>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
              {SUGGESTIONS.map((suggestion, idx) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${suggestion.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${suggestion.color}`} />
                    </div>
                    <span
                      className="text-sm font-medium leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {suggestion.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ═══ Chat Messages ═══ */
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "assistant" ? "" : "justify-end"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    msg.role === "assistant" ? "rounded-tl-md" : "rounded-tr-md"
                  }`}
                  style={{
                    backgroundColor:
                      msg.role === "assistant"
                        ? "var(--bg-card)"
                        : "var(--primary)",
                    border:
                      msg.role === "assistant"
                        ? "1px solid var(--border-color)"
                        : "none",
                  }}
                >
                  {msg.role === "assistant" ? (
                    <div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {msg.content.split("\n").map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed" style={{ color: "#ffffff" }}>
                      {msg.content}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
                <div
                  className="rounded-2xl rounded-tl-md px-4 py-3"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "var(--text-muted)",
                        animationDelay: "0ms",
                      }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "var(--text-muted)",
                        animationDelay: "150ms",
                      }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "var(--text-muted)",
                        animationDelay: "300ms",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ═══ Input Bar ═══ */}
      <div className="px-6 pb-6 pt-2 shrink-0">
        <div
          className="max-w-3xl mx-auto rounded-2xl px-4 py-3 flex items-end gap-3"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-0.5 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <Plus className="w-5 h-5" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Zenith AI anything..."
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none focus:outline-none py-1.5 max-h-32"
            style={{
              color: "var(--text-primary)",
              minHeight: "24px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 128) + "px";
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all mb-0.5"
            style={{
              backgroundColor: input.trim() ? "var(--primary)" : "var(--bg-secondary)",
              color: input.trim() ? "#ffffff" : "var(--text-muted)",
              opacity: !input.trim() || isTyping ? 0.5 : 1,
            }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
