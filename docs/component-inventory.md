# ZTRED Component Inventory

Based on ZTRED SRS v2.0 and UI screenshots from slack renewal folder.

## Communicate Pillar

| Component | Responsibility | SRS Ref | Props | States | Variants |
|-----------|----------------|---------|-------|--------|----------|
| WorkspaceSwitcher | Multi‑workspace dropdown (top‑left) | 3.1 | workspaces: Array, currentWorkspace: Object, onChange: Function | open/closed | default, disabled |
| HeaderBar | Global search, notifications, user menu | 3.1 | currentWorkspace: Object, currentUser: Object, unreadCount: Number, hasAnomalies: Boolean | searchModalOpen: Boolean, theme: String | light/dark theme |
| Sidebar | Channels, DMs, apps, workspace info | 3.1 | channels: Array, directMessages: Array, isSidebarCollapsed: Boolean | collapsed/expanded | icon-only, full |
| ChannelList | Items with presence dots, unread badges, mentions | 3.1 | channels: Array, activeChannelId: String | loading, error, empty | public, private, archived |
| DMList | Items with presence dots, unread badges, mentions | 3.1 | directMessages: Array, activeDMId: String | loading, error, empty | online, away, offline |
| MessageList | Virtualized list (react‑window/@tanstack/virtual) | MSG-01 | messages: Array, cursor: String | loading, error, empty, hasMore | compact, comfortable |
| MessageBubble | Supports: text, rich text (markdown), code blocks, tables, image/file/link previews, voice notes, system messages | 3.1 | message: Object, currentUserId: String | sending, sent, failed, edited, deleted | text, richText, image, file, link, voiceNote, system |
| RichTextEditor | Prose-like editor (TipTap/Slate) for markdown, mentions, tables, code blocks | MSG-04 | value: String, onChange: Function, placeholder: String | focused, disabled, readOnly | mention, voiceNoteAttach, scheduleSend |
| MessageInput | Autosizing textarea + formatting toolbar (B/I/Code/Quote/Lists), emoji, attach, voice notes, scheduled send | 3.1 | currentUserId: String, streamId: String | focused, sending, scheduled | mention, voiceNote, fileAttach, imageAttach, voiceNoteAttach, scheduleSend |
| ThreadView | Collapsible/expanded thread pane (right sidebar or modal) | MSG-03 | threadId: String, messages: Array | loading, error, empty | sidebar, modal |
| Reactions | Emoji picker + reaction counts with hover tooltips | MSG-02 | messageId: String, reactions: Record<String, String[]> | loading, saving | emoji grid, count display |
| VoiceNoteRecorder | Inline audio recorder (≤5 min) with waveform visualization | 3.1 | onRecordComplete: Function | recording, paused, stopped, playing | waveform visualization |
| ScheduledMessagePicker | Date/time selector for delayed sending | 3.1 | onSchedule: Function, onCancel: Function | open/closed | date picker, time picker |
| SmartMentions | Autocomplete for @user/@team/@channel with presence indicators | MSG-07 | onMentionSelect: Function, users: Array, teams: Array, channels: Array | loading, open/closed | @user, @team, @channel |
| PinsBookmarks | Toggle buttons with tooltip management | MSG-08 | messageId: String, isPinned: Boolean, isBookmarked: Boolean | toggling | pin, bookmark |

## Meet Pillar

| Component | Responsibility | SRS Ref | Props | States | Variants |
|-----------|----------------|---------|-------|--------|----------|
| MeetingToolbar | Mute, video, screen sharing, participants, raise hand, reactions, breakout rooms, whiteboard toggle | 3.2 | meeting: Object, userRole: String | live, ended, recording, captionsOn | host, coHost, attendee |
| ParticipantGrid | Adaptive video tiles (up to 500), speaker spotlight, name/status overlay | MEET-02 | participants: Array, activeSpeakerId: String | loading, error | grid, list, filmstrip |
| ScreenShareControls | Select window/app/tab to share, preview, stop sharing | MEET-03 | isSharing: Boolean, onShareStart: Function, onShareStop: Function | sharing, paused, stopped | window, application, tab |
| LiveCaptionsPanel | Real‑time transcript with speaker identification, toggle on/off | MEET-07 | transcript: Array, isLiveCaptionsEnabled: Boolean | loading, translating | speakerIdentified, anonymous |
| MeetingScheduler | Calendar‑integrated form for future meetings with recurrence | MEET-06 | onSchedule: Function, onCancel: Function | open/closed | instant, scheduled, recurring |
| WaitingRoomLobby | Host approval UI for participants before joining | MEET-05 | pendingParticipants: Array, onApprove: Function, onDeny: Function | open/closed | hostView, participantView |
| BreakoutRoomsManager | Assign participants to sub‑rooms, timer, auto‑rejoin | MEET-04 | participants: Array, onAssign: Function, onTimerEnd: Function | configuring, active, ended | dragAndDrop, autoSplit |
| MeetingRecorder | Recording controls, indicator, post‑meeting processing UI | MEET-09 | isRecording: Boolean, onStart: Function, onStop: Function | recording, processing, available | audioOnly, videoAndAudio |
| NoiseCancellationToggle | AI‑powered background noise suppression switch | MEET-10 | isEnabled: Boolean, onToggle: Function | on/off | toggle switch |
| BackgroundEffects | Blur/replacement selector (upload custom backgrounds) | MEET-02 | currentEffect: String, onChange: Function, backgrounds: Array | loading, applied | blur, default, upload |

## Build & Collaborate Pillar

| Component | Responsibility | SRS Ref | Props | States | Variants |
|-----------|----------------|---------|-------|--------|----------|
| DocEditor | Google Docs‑style real‑time collaborative editor (Yjs + TipTap) | 3.5 | documentId: String, initialContent: Object | loading, saving, conflict | edit, view, comment |
| DocComments | Inline comment threads on selected text ranges | 3.5 | documentId: String, selectedRange: Object | loading, submitting | resolved, unresolved |
| Whiteboard | Infinite canvas with sticky notes, shapes, arrows, image upload | 3.5 | whiteboardId: String, initialElements: Array | loading, syncing | pen, shape, text, stickyNote, image |
| TemplatePicker | Org‑wide/shareable doc/meeting templates | 3.5 | templates: Array, onSelect: Function, onSaveAsTemplate: Function | loading, error | personal, orgWide |
| EmbedPreview | Rich preview of docs/whiteboards/tasks inside messages | 3.5 | embedUrl: String, onOpen: Function | loading, error | document, whiteboard, task |

## Organize Pillar

| Component | Responsibility | SRS Ref | Props | States | Variants |
|-----------|----------------|---------|-------|--------|----------|
| KanbanBoard | Drag‑and‑drop columns, swimlanes, WIP limits | 3.4 | projectId: String, columns: Array, tasks: Array | loading, error | swimlane, WIP limits |
| SprintPlanner | Backlog grooming, sprint goal setting, burndown chart | 3.4 | projectId: String, sprintData: Object | loading, saving | goal, dates, capacity |
| GanttChart | Timeline view with dependencies, critical path highlighting | 3.4 | projectId: String, tasks: Array | loading, error | day, week, month, year |
| GoalTracker | OKR creation, progress tracking, alignment with tasks | 3.4 | workspaceId: String, objectives: Array | loading, saving | objective, keyResult, progress |
| SubTaskManager | Nested tasks with independent assignees/due dates | 3.4 | taskId: String, subTasks: Array | loading, saving | checklist, nested |
| TaskMentionPreview | Live status badge when referencing tasks in messages | 3.4 | taskId: String | loading, error | statusBadge |
| SmartReminders | Configurable reminders (push/email/in‑app) with snooze | 3.4 | taskId: String, reminders: Array | loading, saving | inApp, email, push |
| WorkloadView | Per‑member task capacity heatmap, overallocation warnings | 3.4 | workspaceId: String, workloadData: Array | loading, error | heatmap, table |
| CustomFieldsEditor | Configurable fields per project (priority, effort, labels, etc.) | 3.4 | projectId: String, fields: Array | loading, saving | text, number, date, select, checkbox |
| TimeTracker | Built‑in timer per task with manual entry and reporting | 3.4 | taskId: String, timeLogs: Array | running, paused, stopped | manual, automatic |

## Automate Pillar (AI)

| Component | Responsibility | SRS Ref | Props | States | Variants |
|-----------|----------------|---------|-------|--------|----------|
| AIAssistantPanel | Conversational AI chat interface (@ZTRED‑AI mentions) | 3.3 | workspaceId: String, currentChannelId: String | loading, streaming | chat, suggest |
| MeetingRecapViewer | Auto‑generated summary + action items with editable blocks | 3.3 | meetingId: String, recapData: Object | loading, generating | summary, actionItems, decisions |
| SmartRepliesSuggestion | 3 contextual replies beneath message input, one‑click insert | 3.3 | context: String, suggestions: Array | loading, generating | chip, insert |
| AISummariesBanner | “You have X unread — summarize?” prompt with regenerate option | 3.3 | streamId: String, unreadCount: Number | loading, generating | banner, regenerate |
| TaskExtractor | Detected action items shown as chips with “Create task” buttons | 3.3 | messageContent: String, tasks: Array | loading, extracting | chip, createTask |
| SemanticSearchBar | NLP‑powered search understanding intent (e.g., “Q3 budget discussion”) | 3.3 | query: String, results: Array | loading, error | semantic, fulltext |
| ToneRewriter | Compose assistant: formal/friendly/concise/etc. dropdown in message input | 3.3 | text: String, tone: String, onRewrite: Function | loading, rewriting | formal, friendly, concise, explanatory |
| WorkflowSuggestionsToast | Weekly digest of recommended automations based on patterns | 3.3 | suggestions: Array, onTry: Function, onDismiss: Function | showing, dismissed | toast, action |
| AnomalyAlertsBadge | Admin‑only indicator for unusual activity patterns | 3.3 | anomalies: Array, onClick: Function | loading, error | badge, alert |
| ProductivityInsightsChart | Weekly heatmap of individual/team activity trends | 3.3 | userId: String, insightsData: Object | loading, error | heatmap, chart, export |

## Cross‑Cutting Components

| Component | Responsibility | SRS Ref | Props | States | Variants |
|-----------|----------------|---------|-------|--------|----------|
| ThemeToggle | Light/dark/system preference (synced across devices) | 13 | theme: String, onToggle: Function | light/dark/system | sun/moon icons |
| NotificationToast | Bottom‑right transient UI for mentions, reactions, etc. | NOTIF-01 | notification: Object, onDismiss: Function | showing, dismissed | mention, reaction, system |
| DNDScheduler | User‑configurable Do Not Disturb schedule with urgent bypass | NOTIF-03 | schedule: Object, onSave: Function | editing, active | schedule, bypass |
| SearchFilterChips | Active filters display (from:, in:, has:link, date range) | SRCH-04 | filters: Object, onRemove: Function | adding, removing | chip, close |
| FileUploadProgress | Chunked upload UI with pause/resume, abort, size limits (1GB/file) | MSG-05 | file: File, onProgress: Function, onPause: Function, onResume: Function, onAbort: Function | uploading, paused, completed, failed | progressBar, controls |
| AccessibilityHelper | Skip links, focus traps, screen‑reader live regions | 13 | liveRegion: String, skipTo: String | announcing, hidden | live, skipLink |

## UI Primitives (Radix UI wrappers)

| Component | Responsibility | Props | States | Variants |
|-----------|----------------|-------|--------|----------|
| Button | Primary action button | variant, size, disabled, onClick | idle, hover, press, disabled, loading | primary, secondary, destructive, outline, ghost, link |
| Input | Form input field | type, placeholder, value, disabled, onChange | idle, focus, error, disabled | text, email, password, search, number |
| Textarea | Multi-line input field | placeholder, value, disabled, onChange, rows | idle, focus, error, disabled | autoResize, fixed |
| Modal | Dialog overlay | open, onOpenChange, title, children | opening, open, closing, closed | alert, confirmation, form |
| Drawer | Slide-in panel | open, onOpenChange, side, children | opening, open, closing, closed | left, right, top, bottom |
| Avatar | User profile image | src, name, size, presence, status | loading, error, loaded | initials, image, statusDot |
| Badge | Status indicator | variant, content | idle, hover | primary, secondary, success, warning, error |
| Toast | Notification toast | title, description, action, onDismiss | showing, paused, dismissed | default, action, promise |
| Spinner | Loading indicator | size, label | spinning | default, label |
| ScrollArea | Custom scrollbar implementation | scrollbars, type | scrolling | vertical, horizontal, both |
| Tabs | Tabbed interface | children, defaultIndex, onSelect | idle, hover, active, disabled | vertical, horizontal, bordered |
| Toggle | Binary switch | checked, onCheckedChanged, disabled | idle, hover, pressed, disabled | switch, checkbox |
| Slider | Range input | min, max, value, onValueChange, step | idle, hover, dragging, disabled | discrete, continuous |
| Tooltip | Popover on hover/focus | content, side, delayDuration | showing, hidden | top, right, bottom, left, followCursor |

## Hooks

| Hook | Responsibility | Returns |
|------|----------------|---------|
| useWebSocket | Manages Socket.IO connection and event handling | { connected, error, sendEvent } |
| useMessages | Fetches and manages messages for a stream | { data, isLoading, isError, sendMessage, updateMessage } |
| useThreads | Fetches and manages thread messages | { data, isLoading, isError } |
| useSearch | Manages search state and results | { query, results, isLoading, isError } |
| useTheme | Manages application theme (light/dark/system) | { theme, setTheme, systemTheme } |
| useNotification | Manages notification store and toast display | { notifications, addNotification, removeNotification } |
| usePresence | Manages user presence status (online/away/offline) | { presence, setPresence, usersPresence } |
| useTypedMessage | Manages rich text state for message input | { value, setValue, insertAtSelection } |
| useViewport | Manages sidebar collapse breakpoint | { isSidebarCollapsed, toggleSidebar } |

## Stores (Zustand)

| Store | Responsibility | Slices |
|-------|----------------|--------|
| workspaceStore | Current workspace, channels, members, user preferences | workspace, channels, members, notificationSettings |
| uiStore | UI state (theme, sidebar, search modal, right panel) | theme, sidebar, searchModal, activeRightPanel |
| presenceStore | Real-time user presence data | onlineUsers, awayUsers, offlineUsers, typingUsers |
| aiStore | AI feature states and suggestions | assistantResponse, smartReplies, summaries, taskExtractions, workflowSuggestions |

## Services

| Service | Responsibility | Methods |
|---------|----------------|---------|
| apiClient | Centralized fetch wrapper with JWT, error handling, retry | get, post, put, delete, patch |
| wsService | WebSocket connection management and event subscriptions | connect, disconnect, subscribe, unsubscribe, emit |
| fileUploadService | Chunked file upload with pause/resume/abort | upload, pause, resume, abort, getProgress |
| aiService | AI feature API endpoints | chat, summarize, extractTasks, smartReply, toneRewrite, meetingRecap, workflowSuggestions, insights, anomalies |

## Types (TypeScript Interfaces)

| File | Responsibility |
|------|----------------|
| api.ts | REST API request/response types |
| ws.ts | WebSocket event types and payloads |
| store.ts | Zustand store shapes and types |
| ui.ts | UI component props and state types |
| ai.ts | AI feature request/response types |

This component inventory serves as the foundation for implementation. Each component should be built according to the specifications in the ZTRED SRS v2.0 and matching the visual designs from the provided screenshots.