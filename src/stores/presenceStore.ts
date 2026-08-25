import { create } from 'zustand';
import { UserPresence } from '@/types/api';

interface PresenceState {
  presences: Record<string, UserPresence>;
  typing: Record<string, { userId: string; isTyping: boolean }>;
  setUserPresence: (userId: string, presence: UserPresence) => void;
  setTyping: (streamId: string, userId: string, isTyping: boolean) => void;
}

export const usePresenceStore = create<PresenceState>((set) => ({
  presences: {},
  typing: {},
  setUserPresence: (userId, presence) => set((state) => ({
    presences: {
      ...state.presences,
      [userId]: presence
    }
  })),
  setTyping: (streamId, userId, isTyping) => set((state) => ({
    typing: {
      ...state.typing,
      [streamId]: { userId, isTyping }
    }
  })),
}));