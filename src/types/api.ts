export type UserPresence = 'online' | 'away' | 'dnd' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member' | 'guest';
  statusText?: string;
  presence: UserPresence;
  customStatusEmoji?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  memberCount: number;
  unreadCount?: number;
  hasAnomalies?: boolean;
}

export interface Stream {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  type: 'public' | 'private' | 'dm';
  topic?: string;
  description?: string;
  isArchived: boolean;
  unreadCount: number;
  mentionCount: number;
  memberIds: string[];
}

export type MessageType =
  | 'text'
  | 'richtext'
  | 'image'
  | 'file'
  | 'link'
  | 'voicenote'
  | 'system';

export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // userIds
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  thumbnailUrl?: string;
  duration?: number; // for audio voice notes
}

export interface Message {
  id: string;
  streamId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  type: MessageType;
  content: string;
  attachments?: MessageAttachment[];
  reactions: Reaction[];
  threadId?: string;
  replyCount?: number;
  lastReplyAt?: string;
  isPinned?: boolean;
  isBookmarked?: boolean;
  scheduledAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DirectMessage {
  id: string;
  user: User;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface MeetingParticipant {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: 'host' | 'coHost' | 'attendee';
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  hasHandRaised: boolean;
  isInLobby?: boolean;
  joinedAt: string;
}

export interface Meeting {
  id: string;
  workspaceId: string;
  title: string;
  hostId: string;
  status: 'scheduled' | 'live' | 'ended';
  startedAt?: string;
  endedAt?: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  liveCaptionsEnabled: boolean;
  noiseCancellationEnabled: boolean;
  breakoutRoomsCount?: number;
  participants: MeetingParticipant[];
}

export interface Task {
  id: string;
  workspaceId: string;
  projectId: string;
  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  subtaskCount?: number;
  completedSubtaskCount?: number;
  createdAt: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  taskCount: number;
  completedTaskCount: number;
}

export interface CollaborativeDocument {
  id: string;
  workspaceId: string;
  title: string;
  content: string;
  versionNumber: number;
  updatedAt: string;
  updatedBy: string;
  commentCount: number;
}

export interface WhiteboardElement {
  id: string;
  type: 'rectangle' | 'ellipse' | 'line' | 'text' | 'sticky' | 'arrow';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text?: string;
}

export interface WhiteboardData {
  id: string;
  workspaceId: string;
  title: string;
  elements: WhiteboardElement[];
  updatedAt: string;
}
