# Ztred

A modern team collaboration workspace — messaging, video calls, file sharing, and AI assistance in one platform.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (Strict Mode) |
| UI Library | React 18 |
| Styling | Tailwind CSS v3 |
| Component Primitives | Hand-rolled (`components/ui`) + `@radix-ui/react-slot` |
| State Management | Zustand |
| Rich Text Editor | None — `DocEditor` is a local `contenteditable` stand-in |
| Virtualization | `@tanstack/react-virtual` (dependency present; only `MessageList` imports it, and nothing renders that yet) |
| Icons | Lucide React |
| Font | Bricolage Grotesque |

---

## Features

### Messaging
- Real-time channel and direct messaging
- Threaded conversations
- Rich text editing with @mentions and emoji reactions
- Voice notes with waveform visualization
- File and image sharing

### Video Meetings
- Adaptive video grid for up to 500 participants
- Active speaker spotlight
- Meeting toolbar (mute, camera, screen share, raise hand)
- Live captions with speaker identification

### Collaboration
- Collaborative documents with inline comments
- Interactive whiteboard with shape tools and export
- Kanban board with drag-and-drop
- Gantt chart timeline view

### AI Assistant
- Conversational AI sidebar for summarization and drafting
- Smart reply suggestions
- Meeting recap generation

### Workspace Control
- Role-based access management (Owner, Admin, Manager, Member, Guest)
- AI access controls per role with usage limits
- Security settings and audit logging
- Channel management
- Workspace settings and integrations

### Design
- Dark and light theme support via CSS variables
- Consistent primary color (`#5F3DFF`) across both themes
- Apple HIG design guidelines (typography scale, 44px touch targets, focus rings, reduced motion support)
- Responsive layout with mobile navigation (bottom tab bar, slide-out menu)

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Install

```bash
git clone <repository-url>
cd ztred
npm install --legacy-peer-deps
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Landing page (auth)
│   ├── layout.tsx                        # Root layout
│   ├── workspace/
│   │   ├── (workspace)/                  # Main workspace routes
│   │   │   ├── layout.tsx                # Workspace shell (sidebar + nav)
│   │   │   ├── page.tsx                  # Home feed
│   │   │   ├── channels/[cslug]/         # Channel messaging
│   │   │   ├── dm/[userId]/              # Direct messages
│   │   │   ├── meetings/[meetingId]/     # Video meetings
│   │   │   ├── projects/                 # Projects + Kanban
│   │   │   ├── docs/                     # Documents
│   │   │   ├── calendar/                 # Calendar
│   │   │   ├── analytics/                # Analytics dashboard
│   │   │   ├── ai/                       # AI assistant
│   │   │   ├── settings/                 # User settings
│   │   │   └── files/                    # File management
│   │   └── (control)/                    # Admin workspace
│   │       ├── layout.tsx                # Control panel shell
│   │       └── control/
│   │           ├── page.tsx              # Overview dashboard
│   │           ├── members/              # Member management
│   │           ├── roles/                # Role & permissions
│   │           ├── channels/             # Channel management
│   │           ├── ai/                   # AI management
│   │           ├── security/             # Security settings
│   │           ├── audit/                # Audit logs
│   │           └── settings/             # Workspace settings
├── components/
│   ├── navigation/                       # NavigationProvider
│   ├── messaging/                        # MessageList, MessageBubble, ThreadView
│   ├── collaboration/                    # DocEditor, Whiteboard
│   ├── automate/                         # AIAssistantPanel
│   ├── tasks/                            # GanttChart
│   ├── projects/                         # CreateProjectModal
│   └── ui/                               # Button, Badge, Modal, NavLink, Spinner,
│                                         #   ZtredLogo, LoadingScreen, NotFoundScreen,
│                                         #   dropdown-menu, emoji-picker, skeleton, Avatar
├── stores/                               # Zustand store (uiStore: sidebar, theme, accent, a11y)
├── lib/                                  # accent.ts, utils.ts, mock/ (projects, docs, meetings)
├── types/                                # TypeScript interfaces
└── styles/                               # globals.css, design tokens
```

---

## Design System

**Primary:** user-chosen accent, default `#5F3DFF`. One hex drives an 11-stop scale via
`src/lib/accent.ts`; the literal should not appear anywhere else in `src/`.  
**Typography:** Bricolage Grotesque  
**Theme:** CSS variables via `data-theme` attribute on `<html>`

| Token | Light | Dark |
|-------|-------|------|
| `--bg-primary` | `#f8fafc` | `#0b0f19` |
| `--bg-card` | `#ffffff` | `#141824` |
| `--text-primary` | `#0f172a` | `#f1f5f9` |
| `--primary` | `#5F3DFF` | `#5F3DFF` |
| `--border-color` | `#e2e8f0` | `#1e293b` |
