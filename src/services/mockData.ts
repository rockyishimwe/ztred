import { Message, Meeting, Task, Project, CollaborativeDocument, WhiteboardData, User } from '@/types/api';

export const mockUser: User = {
  id: 'usr_me',
  name: 'Alex Rivera',
  email: 'alex.rivera@ztred.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  statusText: 'Focusing on ZTRED v2.0 Release 🚀',
  presence: 'online',
};

export const mockMessages: Record<string, Message[]> = {
  chan_general: [
    {
      id: 'msg_1',
      streamId: 'chan_general',
      senderId: 'usr_1',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
      type: 'text',
      content: 'Hey team! Just wanted to share that the Q3 roadmap has been updated. Check out the #proj-frontend-v2 channel for details.',
      reactions: [
        {
          emoji: '👍',
          count: 3,
          users: ['usr_me', 'usr_2', 'usr_4']
        },
        {
          emoji: '❤️',
          count: 1,
          users: ['usr_5']
        }
      ],
      createdAt: '2 hours ago',
      updatedAt: undefined
    },
    {
      id: 'msg_2',
      streamId: 'chan_general',
      senderId: 'usr_me',
      senderName: 'Alex Rivera',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      type: 'richtext',
      content: 'Thanks Sarah! I\'ll review it now. \n\n**Action items**:\n- Update frontend dependencies\n- Review new component specs\n- Schedule team sync for tomorrow',
      reactions: [],
      createdAt: '1 hour ago',
      updatedAt: undefined
    }
  ],
  chan_frontend: [
    {
      id: 'msg_3',
      streamId: 'chan_frontend',
      senderId: 'usr_1',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
      type: 'text',
      content: 'Frontend team - please review the new design specs for the messaging UI. Focus on the message bubble variations and thread view.',
      reactions: [
        {
          emoji: '👀',
          count: 2,
          users: ['usr_me', 'usr_4']
        }
      ],
      createdAt: '30 minutes ago',
      updatedAt: undefined
    }
  ]
};

export const mockMeetings: Meeting[] = [
  {
    id: 'meet_1',
    workspaceId: 'ws_ztred',
    title: 'Product Sync',
    hostId: 'usr_me',
    status: 'live',
    startedAt: '2024-01-15T10:00:00Z',
    endedAt: undefined,
    recordingUrl: undefined,
    transcriptUrl: undefined,
    liveCaptionsEnabled: true,
    noiseCancellationEnabled: false,
    breakoutRoomsCount: 0,
    participants: [
      {
        id: 'part_1',
        userId: 'usr_me',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'host',
        isMuted: false,
        isVideoOn: true,
        isScreenSharing: false,
        hasHandRaised: false,
        joinedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'part_2',
        userId: 'usr_1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
        role: 'coHost',
        isMuted: true,
        isVideoOn: true,
        isScreenSharing: true,
        hasHandRaised: false,
        joinedAt: '2024-01-15T10:02:00Z'
      }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task_1',
    workspaceId: 'ws_ztred',
    projectId: 'proj_1',
    assigneeId: 'usr_me',
    assigneeName: 'Alex Rivera',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Implement real-time messaging with WebSocket',
    description: 'Setup Socket.IO connection and integrate with React Query for optimistic updates',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-01-20',
    estimatedHours: 8,
    actualHours: 4,
    subtaskCount: 3,
    completedSubtaskCount: 1,
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 'task_2',
    workspaceId: 'ws_ztred',
    projectId: 'proj_1',
    assigneeId: 'usr_1',
    assigneeName: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80',
    title: 'Design message bubble variants',
    description: 'Create designs for text, rich text, image, file, link, voice note, and system message types',
    status: 'review',
    priority: 'medium',
    dueDate: '2024-01-18',
    estimatedHours: 5,
    actualHours: 3,
    subtaskCount: 2,
    completedSubtaskCount: 2,
    createdAt: '2024-01-11T09:00:00Z'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj_1',
    workspaceId: 'ws_ztred',
    name: 'Frontend Platform v2.0',
    description: 'Rewrite of ZTRED frontend using Next.js 14 and React 18',
    taskCount: 2,
    completedTaskCount: 0
  }
];

export const mockDocs: CollaborativeDocument[] = [
  {
    id: 'doc_1',
    workspaceId: 'ws_ztred',
    title: 'Q3 Product Roadmap',
    content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Q3 Roadmap for ZTRED Platform"}]}]}',
    versionNumber: 3,
    updatedAt: '2024-01-14T15:30:00Z',
    updatedBy: 'usr_me',
    commentCount: 2
  }
];

export const mockWhiteboard: WhiteboardData = {
  id: 'wb_1',
  workspaceId: 'ws_ztred',
  title: 'Sprint Planning',
  elements: [
    {
      id: 'elem_1',
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      color: '#3B82F6',
      text: 'Backend API'
    },
    {
      id: 'elem_2',
      type: 'text',
      x: 400,
      y: 120,
      width: 0,
      height: 0,
      color: '#1F2937',
      text: 'Frontend -> Backend communication'
    }
  ],
  updatedAt: '2024-01-14T16:00:00Z'
};