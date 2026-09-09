/**
 * Meeting mock data, shared by the meetings list and the `[meetingId]` detail
 * route.
 *
 * Lifted out of the detail page so the two stay in sync and so the dynamic
 * segment actually selects something — the detail page used to render one
 * hardcoded meeting regardless of the id in the URL.
 */

export type MeetingStatus = 'live' | 'upcoming' | 'ended';

export interface MeetingParticipant {
  name: string;
  avatar: string;
  isMuted: boolean;
  isSpeaking: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  /** Minutes on the clock, for the live timer readout. */
  elapsed: string;
  status: MeetingStatus;
  participants: MeetingParticipant[];
}

const AVATARS = {
  sam: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  lisa: 'https://images.unsplash.com/photo-1634595477722-7bc68dd410fd?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  daniel: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  alex: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
  maya: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80',
} as const;

export const MEETINGS: Meeting[] = [
  {
    id: 'meet_1',
    title: 'Design Review',
    time: '11:00 AM · 45 min',
    elapsed: '12:34',
    status: 'live',
    participants: [
      { name: 'Sam Rivera', avatar: AVATARS.sam, isMuted: false, isSpeaking: true },
      { name: 'Lisa Park', avatar: AVATARS.lisa, isMuted: true, isSpeaking: false },
      { name: 'Daniel Kim', avatar: AVATARS.daniel, isMuted: true, isSpeaking: false },
      { name: 'Alex Chen', avatar: AVATARS.alex, isMuted: false, isSpeaking: false },
    ],
  },
  {
    id: 'meet_2',
    title: 'Sprint Planning',
    time: '1:30 PM · 1 hr',
    elapsed: '00:00',
    status: 'upcoming',
    participants: [
      { name: 'Sam Rivera', avatar: AVATARS.sam, isMuted: false, isSpeaking: false },
      { name: 'Maya Chen', avatar: AVATARS.maya, isMuted: false, isSpeaking: false },
    ],
  },
  {
    id: 'meet_3',
    title: 'Client Kickoff — Phoenix',
    time: '3:00 PM · 30 min',
    elapsed: '00:00',
    status: 'upcoming',
    participants: [
      { name: 'Sam Rivera', avatar: AVATARS.sam, isMuted: false, isSpeaking: false },
      { name: 'Lisa Park', avatar: AVATARS.lisa, isMuted: false, isSpeaking: false },
      { name: 'Alex Chen', avatar: AVATARS.alex, isMuted: false, isSpeaking: false },
    ],
  },
  {
    id: 'meet_4',
    title: 'Marketing Standup',
    time: '9:00 AM · 15 min',
    elapsed: '15:02',
    status: 'ended',
    participants: [
      { name: 'Maya Chen', avatar: AVATARS.maya, isMuted: true, isSpeaking: false },
      { name: 'Daniel Kim', avatar: AVATARS.daniel, isMuted: true, isSpeaking: false },
    ],
  },
];

/** The meeting a bare `/workspace/meetings` link should land on. */
export const DEFAULT_MEETING_ID = 'meet_1';

/**
 * Resolve a route segment to a meeting, falling back to the default when the
 * id is unknown — `/workspace/meetings/current` is linked from the DM header
 * and is not a real id.
 */
export const getMeeting = (id: string | undefined): Meeting =>
  MEETINGS.find((m) => m.id === id) ??
  MEETINGS.find((m) => m.id === DEFAULT_MEETING_ID)!;
