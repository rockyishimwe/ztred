import { useEffect } from 'react';
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { usePresenceStore } from '@/stores/presenceStore';

export function useWebSocket() {
  const { activeStream } = useWorkspaceStore();
  const { setUserPresence, setTyping } = usePresenceStore();

  useEffect(() => {
    // Simulated Socket.IO heartbeats and events for real-time presence & messages
    const interval = setInterval(() => {
      const users = ['usr_1', 'usr_2', 'usr_3', 'usr_4', 'usr_5'];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const presences = ['online', 'away', 'dnd', 'online'] as const;
      const randomPresence = presences[Math.floor(Math.random() * presences.length)];

      setUserPresence(randomUser, randomPresence);
    }, 15000);

    return () => clearInterval(interval);
  }, [setUserPresence]);

  const sendTypingNotification = (isTyping: boolean) => {
    if (activeStream) {
      setTyping(activeStream.id, 'Alex Rivera', isTyping);
    }
  };

  return {
    sendTypingNotification,
  };
}