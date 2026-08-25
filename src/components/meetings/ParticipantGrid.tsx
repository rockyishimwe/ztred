"use client";
import { UserCircle, Video, Mic, MicOff, MonitorUp, Hand, Crown } from 'lucide-react';

interface ParticipantGridProps {
  participants: Array<{
    id: string;
    userId: string;
    name: string;
    avatar: string;
    role: 'host' | 'coHost' | 'attendee';
    joinedAt: string;
    leftAt?: string;
    isMuted: boolean;
    isVideoOn: boolean;
    isScreenSharing: boolean;
    hasHandRaised: boolean;
    isInLobby?: boolean;
  }>;
}

export const ParticipantGrid: React.FC<ParticipantGridProps> = ({ participants }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 p-4 overflow-y-auto">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="relative flex flex-col items-center p-2 bg-white dark:bg-ztred-surface-dark border border-zinc-200 dark:border-zinc-700 rounded"
        >
          {!participant.isVideoOn && (
            <div className="w-12 h-12 bg-gray-300 dark:bg-zinc-700 rounded flex items-center justify-center">
              <div className="text-center">{participant.name.charAt(0).toUpperCase()}</div>
            </div>
          )}
          {participant.isVideoOn && (
            <img
              src={participant.avatar}
              alt={`${participant.name}'s video`}
              className="w-12 h-12 rounded object-cover"
            />
          )}
          <div className="mt-1 text-xs font-medium text-zinc-900 dark:text-zinc-100">
            {participant.name}
          </div>
          <div className="flex items-center space-x-1 text-xs mt-1">
            {!participant.isMuted && (
              <Mic className="h-3 w-3 text-green-500"/>
            )}
            {participant.isMuted && (
              <MicOff className="h-3 w-3 text-red-500"/>
            )}
            {participant.isVideoOn && (
              <Video className="h-3 w-3 text-green-500"/>
            )}
            {!participant.isVideoOn && (
              <Video className="h-3 w-3 text-red-500"/>
            )}
            {participant.isScreenSharing && (
              <MonitorUp className="h-3 w-3 text-blue-500"/>
            )}
            {participant.hasHandRaised && (
              <Hand className="h-3 w-3 text-yellow-500"/>
            )}
            {participant.role === 'host' && (
              <Crown className="h-3 w-3 text-yellow-500"/>
            )}
            {participant.role === 'coHost' && (
              <div className="h-3 w-3 bg-yellow-500 rounded text-xs font-medium text-white flex items-center justify-center">
                CH
              </div>
            )}
          </div>
          {participant.isInLobby && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-zinc-100 text-xs">
                Waiting for host approval...
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};