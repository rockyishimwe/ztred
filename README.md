# ZTRED Enterprise Collaboration Platform (Frontend)

Production-ready, pixel-perfect frontend for ZTRED Enterprise Collaboration Platform built with **React 18**, **Next.js 14 (App Router)**, **Tailwind CSS v3**, **Radix UI**, **Zustand**, and **TypeScript (Strict Mode)** in alignment with **ZTRED SRS v2.0**.

---

## 🌟 Key Features & Pillars (Per SRS v2.0)

### 💬 Communicate Pillar
- **Virtualized Message Stream**: High-performance rendering via `@tanstack/react-virtual` supporting 10,000+ channel/DM messages at 60fps.
- **Message Types**: Discriminated union rendering for plain text, rich text, code blocks, images/files, link unfurls, playable audio voice notes, and system events.
- **Voice Notes Recorder**: Inline audio recorder (≤5 min) with real-time waveform visualization.
- **Thread Discussions**: Right-sidebar thread pane attached to parent messages.
- **Smart Mentions & Reactions**: Autocomplete for `@user` / `@team` with presence indicators and emoji reaction counters.

### 📹 Meet Pillar
- **Adaptive Video Grid**: Responsive CSS grid tile virtualizer handling up to 500 participants with active speaker spotlight border and raised hand badges.
- **Meeting Toolbar**: Mic mute/unmute, Camera toggle, Screen share, Raised hand, Recording indicator, and Call end button.
- **Live Captions**: Real-time AI speech transcript panel with speaker identification and export options.
- **Noise Cancellation & Effects**: Software-based toggle for background noise suppression.

### 📝 Build & Collaborate Pillar
- **Collaborative Docs**: Document editor with inline comment threads, history snapshots, and Markdown support.
- **Infinite Whiteboard**: Interactive canvas supporting rectangles, ellipses, sticky notes, selection handles, and PNG export.

### 🤖 Automate Pillar (Ambient AI)
- **AI Assistant Panel**: Conversational `@ZTRED-AI` sidebar with prompt suggestions and streaming text responses.
- **Smart Replies & Tone Rewriter**: Contextual reply chips beneath composer and tone modification options (Formal, Friendly, Concise).
- **Meeting Recaps**: Auto-generated meeting summaries, action items, and key decisions.

### 📋 Organize Pillar
- **Kanban Board**: Drag-and-drop workflow columns (To Do, In Progress, Review, Done) with WIP limit warnings, task priority badges, due dates, and assignee avatars.
- **Gantt Chart Timeline**: Visual dependency roadmap tracking project phases.

---

## 🏗️ Project Architecture & Structure

```
src/
├── app/                         # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with Theme initialization & Metadata
│   ├── page.tsx                 # Root landing page / workspace redirect
│   ├── workspace/
│   │   ├── layout.tsx           # Main workspace shell with HeaderBar & Sidebar
│   │   ├── page.tsx             # Workspace index redirect
│   │   ├── channels/[cslug]/    # Channel message list & input composer
│   │   ├── dm/[userId]/         # Direct messaging view
│   │   ├── meetings/[meetingId]/# Live HD video call huddle
│   │   ├── tasks/[projectId]/   # Sprint Kanban board view
│   │   ├── docs/[docId]/        # Collaborative document editor
│   │   └── whiteboard/[wbId]/   # Interactive canvas whiteboard
├── components/
│   ├── layout/                  # HeaderBar, WorkspaceSwitcher
│   ├── sidebar/                 # Sidebar, ChannelList, DMList
│   ├── messaging/               # MessageList, MessageBubble, MessageInput, VoiceNoteRecorder, ThreadView
│   ├── meetings/                # MeetingToolbar, ParticipantGrid, LiveCaptionsPanel
│   ├── collaboration/           # DocEditor, Whiteboard
│   ├── automate/                # AIAssistantPanel
│   ├── tasks/                   # KanbanBoard, GanttChart
│   └── ui/                      # Button, Avatar, Badge primitives
├── stores/                      # Zustand state slices (workspaceStore, uiStore, presenceStore, aiStore)
├── services/                    # REST apiClient & mockData hydration layer
├── hooks/                       # Custom hooks (useWebSocket, useTheme, etc.)
├── types/                       # TypeScript strict interfaces (api.ts, ws.ts, ai.ts)
└── styles/                      # globals.css & Tailwind custom tokens
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Installation & Execution

1. Clone the repository & navigate to workspace:
   ```bash
   cd c:/Users/awk-3/Documents/freelancer/Projects/project16/Ztred
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. Run TypeScript type checking:
   ```bash
   npx tsc --noEmit
   ```

---

## 🎨 Design Tokens & Theme Support

ZTRED uses CSS variables dynamically injected on `<html>` (`data-theme="dark"` or `data-theme="light"`):
- **Eggplant Sidebar**: `#19171D` / `#121016`
- **Primary Accent**: `#611B69` / `#4A154B`
- **Action Highlight**: `#1264A3`
- **Success / Online**: `#2BAC76`
- **Warning / Away**: `#ECB22E`
- **Danger / DND**: `#E01E5A`
