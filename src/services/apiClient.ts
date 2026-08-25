import { Message, Meeting, Task, Project, CollaborativeDocument, WhiteboardData } from '@/types/api';
import { mockMessages, mockMeetings, mockTasks, mockProjects, mockDocs, mockWhiteboard } from './mockData';

export const apiClient = {
  async getMessages(streamId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMessages[streamId] || []);
      }, 150);
    });
  },

  async sendMessage(streamId: string, content: string, type: Message['type'] = 'text', attachments?: Message['attachments']): Promise<Message> {
    return new Promise((resolve) => {
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        streamId,
        senderId: 'usr_me',
        senderName: 'Alex Rivera',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        type,
        content,
        attachments,
        reactions: [],
        createdAt: 'Just now',
      };
      if (!mockMessages[streamId]) mockMessages[streamId] = [];
      mockMessages[streamId].push(newMessage);
      resolve(newMessage);
    });
  },

  async addReaction(messageId: string, emoji: string): Promise<void> {
    return new Promise((resolve) => {
      Object.values(mockMessages).forEach((list) => {
        const msg = list.find((m) => m.id === messageId);
        if (msg) {
          const existing = msg.reactions.find((r) => r.emoji === emoji);
          if (existing) {
            if (!existing.users.includes('usr_me')) {
              existing.users.push('usr_me');
              existing.count += 1;
            }
          } else {
            msg.reactions.push({ emoji, count: 1, users: ['usr_me'] });
          }
        }
      });
      resolve();
    });
  },

  async getMeetings(): Promise<Meeting[]> {
    return Promise.resolve(mockMeetings);
  },

  async getTasks(): Promise<Task[]> {
    return Promise.resolve(mockTasks);
  },

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<Task> {
    return new Promise((resolve) => {
      const task = mockTasks.find((t) => t.id === taskId);
      if (task) {
        task.status = status;
        resolve(task);
      } else {
        throw new Error('Task not found');
      }
    });
  },

  async getDocument(docId: string): Promise<CollaborativeDocument> {
    return Promise.resolve(mockDocs[0]);
  },

  async getWhiteboard(wbId: string): Promise<WhiteboardData> {
    return Promise.resolve(mockWhiteboard);
  },
};