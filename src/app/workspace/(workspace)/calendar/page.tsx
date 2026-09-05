"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Clock,
} from "lucide-react";

// ─── Event Data ─────────────────────────────────────────────────

interface CalendarEvent {
  day: number;
  time: string;
  title: string;
  color: string;
  bgColor: string;
  isAllDay?: boolean;
  emojis?: string;
}

const initialEvents: CalendarEvent[] = [
  {
    day: 3,
    time: "11:00",
    title: "Design Review",
    color: "#d4a017",
    bgColor: "rgba(212,160,23,0.25)",
  },
  {
    day: 3,
    time: "13:30",
    title: "Sprint Planning",
    color: "#8b5cf6",
    bgColor: "rgba(139,92,246,0.25)",
  },
  {
    day: 8,
    time: "15:00",
    title: "Client Kickoff",
    color: "#6b7c3a",
    bgColor: "rgba(107,124,58,0.25)",
  },
  {
    day: 12,
    time: "10:00",
    title: "1:1 with Sam",
    color: "#8b5cf6",
    bgColor: "rgba(139,92,246,0.25)",
  },
  {
    day: 15,
    time: "12:30",
    title: "Team Lunch",
    color: "#22c55e",
    bgColor: "rgba(34,197,94,0.25)",
  },
  {
    day: 20,
    time: "14:00",
    title: "Product Demo",
    color: "#22c55e",
    bgColor: "rgba(34,197,94,0.25)",
  },
  {
    day: 20,
    time: "16:00",
    title: "Retro",
    color: "#6b21a8",
    bgColor: "rgba(107,33,168,0.35)",
  },
  {
    day: 24,
    time: "",
    title: "All day Launch Day",
    color: "#ef4444",
    bgColor: "rgba(239,68,68,0.25)",
    isAllDay: true,
    emojis: "🔴🔴",
  },
  {
    day: 28,
    time: "09:30",
    title: "Marketing Sync",
    color: "#a3a33a",
    bgColor: "rgba(163,163,58,0.25)",
  },
];

const EVENT_COLORS = [
  { name: "purple", color: "#8b5cf6", bg: "rgba(139,92,246,0.25)" },
  { name: "green", color: "#22c55e", bg: "rgba(34,197,94,0.25)" },
  { name: "yellow", color: "#d4a017", bg: "rgba(212,160,23,0.25)" },
  { name: "pink", color: "#ec4899", bg: "rgba(236,72,153,0.25)" },
  { name: "blue", color: "#3b82f6", bg: "rgba(59,130,246,0.25)" },
];

// ─── Calendar Grid ──────────────────────────────────────────────

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ─── Add Event Modal ────────────────────────────────────────────

function AddEventModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (event: CalendarEvent) => void;
}) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);

  const handleAdd = () => {
    if (!title.trim()) return;
    const evt = EVENT_COLORS[selectedColor];
    onAdd({
      day: parseInt(day) || 1,
      time: time || "09:00",
      title: title.trim(),
      color: evt.color,
      bgColor: evt.bg,
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl p-8 w-full max-w-lg shadow-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-theme-primary">Add event</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover-theme-card transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-theme-muted mb-6">
          Schedule time and invite your teammates.
        </p>

        {/* Event Title */}
        <div className="mb-5">
          <label className="text-sm font-medium text-theme-secondary mb-2 block">
            Event title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Design critique"
            className="w-full input-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Day + Time */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-sm font-medium text-theme-secondary mb-2 block">
              Day
            </label>
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder=""
              className="w-full input-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-theme-secondary mb-2 block">
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder=""
              className="w-full input-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="mb-5">
          <label className="text-sm font-medium text-theme-secondary mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-theme-muted" />
            Guests
          </label>
          <input
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder=""
            className="w-full input-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Event Color */}
        <div className="mb-8">
          <label className="text-sm font-medium text-theme-secondary mb-3 block">
            Event color
          </label>
          <div className="flex items-center gap-3">
            {EVENT_COLORS.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(idx)}
                className={`w-9 h-9 rounded-full transition-all ${
                  selectedColor === idx
                    ? "ring-2 ring-offset-2 ring-offset-theme"
                    : "hover:scale-110"
                }`}
                style={{
                  backgroundColor: c.color,
                }}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-theme-muted hover:text-theme-primary hover-theme-card transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-theme-primary text-sm font-semibold shadow-lg shadow-purple-600/25 transition-all spring-bounce"
          >
            <Clock className="w-4 h-4" />
            Add event
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [view, setView] = useState<"Month" | "Week" | "Day">("Month");
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const today = 20; // Simulated "today" for the design

  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDay = (day: number) =>
    events.filter((e) => e.day === day);

  const addEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  // Build calendar cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden font-sans relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ═══ Header ═══ */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-primary">Calendar</h1>
            <p className="text-xs text-theme-muted">
              Your schedule at a glance
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-theme-primary font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all spring-bounce"
        >
          + Event
        </button>
      </div>

      {/* ═══ Month Navigation + View Toggle ═══ */}
      <div className="px-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-theme-primary">
            {monthName} {currentYear}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center card rounded-xl p-1">
          {(["Month", "Week", "Day"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === v
                  ? "bg-purple-600 text-theme-primary shadow"
                  : "text-theme-muted hover:text-theme-primary"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Calendar Grid ═══ */}
      <div className="flex-1 px-6 pb-6 overflow-auto">
        <div className="border rounded-2xl overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--border-color)' }}>
            {DAY_HEADERS.map((d) => (
              <div
                key={d}
                className="px-3 py-3 text-center text-xs font-semibold text-theme-muted uppercase tracking-wider"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div
              key={wi}
              className="grid grid-cols-7 border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}
            >
              {week.map((day, di) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day === today;

                return (
                  <div
                    key={di}
                    className={`min-h-[100px] p-2 border-r last:border-r-0 ${
                      day ? "" : "bg-theme-secondary"
                    }`} style={{ borderColor: 'var(--border-color)' }}
                  >
                    {day && (
                      <>
                        {/* Day number */}
                        <div className="flex items-center justify-start mb-1">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                              isToday
                                ? "bg-purple-600 text-theme-primary"
                                : "text-theme-muted"
                            }`}
                          >
                            {day}
                          </span>
                        </div>

                        {/* Events */}
                        <div className="space-y-1">
                          {dayEvents.map((evt, ei) => (
                            <div
                              key={ei}
                              className="rounded-md px-2 py-1 text-[11px] font-semibold leading-tight truncate cursor-pointer hover:opacity-80 transition-opacity"
                              style={{
                                backgroundColor: evt.bgColor,
                                color: evt.color,
                              }}
                            >
                              {evt.isAllDay
                                ? `${evt.title}${evt.emojis ? ` ${evt.emojis}` : ""}`
                                : `${evt.time} ${evt.title}`}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Add Event Modal ═══ */}
      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={addEvent}
        />
      )}
    </div>
  );
}
