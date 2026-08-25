import { create } from 'zustand';
import { Workspace, Stream, User } from '@/types/api';

interface WorkspaceState {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  channels: Stream[];
  directMessages: Stream[];
  activeStream: Stream | null;
  currentUser: User;
  setWorkspace: (ws: Workspace) => void;
  setActiveStream: (stream: Stream) => void;
  setChannels: (channels: Stream[]) => void;
  setDirectMessages: (dms: Stream[]) => void;
}

const mockUser: User = {
  id: 'usr_me',
  name: 'Alex Rivera',
  email: 'alex.rivera@ztred.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  statusText: 'Focusing on ZTRED v2.0 Release 🚀',
  presence: 'online',
};

const defaultWorkspaces: Workspace[] = [
  {
    id: 'ws_ztred',
    name: 'ZTRED Global Engineering',
    slug: 'ztred-engineering',
    logoUrl: '⚡',
    memberCount: 1420,
    unreadCount: 5,
    hasAnomalies: false,
  },
  {
    id: 'ws_acme',
    name: 'Acme Product Innovation',
    slug: 'acme-innovation',
    logoUrl: '🚀',
    memberCount: 380,
    unreadCount: 0,
    hasAnomalies: false,
  },
  {
    id: 'ws_design',
    name: 'UX/UI Guild',
    slug: 'ux-guild',
    logoUrl: '🎨',
    memberCount: 85,
    unreadCount: 12,
    hasAnomalies: true,
  },
];

const defaultChannels: Stream[] = [
  {
    id: 'chan_general',
    workspaceId: 'ws_ztred',
    name: 'general',
    slug: 'general',
    type: 'public',
    topic: 'Company-wide announcements and general discussion',
    description: 'Main channel for everyone in ZTRED',
    isArchived: false,
    unreadCount: 2,
    mentionCount: 1,
    memberIds: ['usr_me', 'usr_1', 'usr_2', 'usr_3'],
  },
  {
    id: 'chan_frontend',
    workspaceId: 'ws_ztred',
    name: 'proj-frontend-v2',
    slug: 'proj-frontend-v2',
    type: 'public',
    topic: 'Next.js 14 + Radix UI frontend refactor execution',
    description: 'Frontend core team working on ZTRED SRS v2.0',
    isArchived: false,
    unreadCount: 0,
    mentionCount: 0,
    memberIds: ['usr_me', 'usr_1', 'usr_4'],
  },
  {
    id: 'chan_ai_agents',
    workspaceId: 'ws_ztred',
    name: 'ai-features-and-recap',
    slug: 'ai-features-and-recap',
    type: 'public',
    topic: 'Ambient AI, Task Extractor & Real-time Summaries',
    isArchived: false,
    unreadCount: 3,
    mentionCount: 0,
    memberIds: ['usr_me', 'usr_2', 'usr_5'],
  },
  {
    id: 'chan_leads_only',
    workspaceId: 'ws_ztred',
    name: 'leads-confidential',
    slug: 'leads-confidential',
    type: 'private',
    topic: 'Executive & lead sync',
    isArchived: false,
    unreadCount: 0,
    mentionCount: 0,
    memberIds: ['usr_me', 'usr_1'],
  },
];

const defaultDMs: Stream[] = [
  {
    id: 'dm_usr_1',
    workspaceId: 'ws_ztred',
    name: 'Sarah Chen (Principal Lead)',
    slug: 'dm-sarah-chen',
    type: 'dm',
    isArchived: false,
    unreadCount: 1,
    mentionCount: 1,
    memberIds: ['usr_me', 'usr_1'],
  },
  {
    id: 'dm_usr_2',
    workspaceId: 'ws_ztred',
    name: 'Marcus Vance (DevOps)',
    slug: 'dm-marcus-vance',
    type: 'dm',
    isArchived: false,
    unreadCount: 0,
    mentionCount: 0,
    memberIds: ['usr_me', 'usr_2'],
  },
  {
    id: 'dm_usr_3',
    workspaceId: 'ws_ztred',
    name: 'Elena Rostova (Design)',
    slug: 'dm-elena-rostova',
    type: 'dm',
    isArchived: false,
    unreadCount: 0,
    mentionCount: 0,
    memberIds: ['usr_me', 'usr_3'],
  },
];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentWorkspace: defaultWorkspaces[0],
  workspaces: defaultWorkspaces,
  channels: defaultChannels,
  directMessages: defaultDMs,
  activeStream: defaultChannels[0],
  currentUser: mockUser,
  setWorkspace: (ws) => set({ currentWorkspace: ws }),
  setActiveStream: (stream) => set({ activeStream: stream }),
  setChannels: (channels) => set({ channels }),
  setDirectMessages: (directMessages) => set({ directMessages }),
}));