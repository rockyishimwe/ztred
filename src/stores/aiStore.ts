import { create } from 'zustand';
import { AISuggestedReply, AIMeetingRecap, AITaskExtraction } from '@/types/ai';

interface AIState {
  isGeneratingSummary: boolean;
  activeSummary: string | null;
  suggestedReplies: AISuggestedReply[];
  detectedTasks: AITaskExtraction[];
  meetingRecap: AIMeetingRecap | null;
  setGeneratingSummary: (generating: boolean) => void;
  setActiveSummary: (summary: string | null) => void;
  setSuggestedReplies: (replies: AISuggestedReply[]) => void;
  setDetectedTasks: (tasks: AITaskExtraction[]) => void;
  setMeetingRecap: (recap: AIMeetingRecap | null) => void;
}

const defaultReplies: AISuggestedReply[] = [
  { id: '1', text: 'Sounds great, let us merge the PR!' },
  { id: '2', text: 'Can we schedule a 10min sync on this?' },
  { id: '3', text: 'I will review the design tokens and reply by 4 PM.' },
];

export const useAIStore = create<AIState>((set) => ({
  isGeneratingSummary: false,
  activeSummary: null,
  suggestedReplies: defaultReplies,
  detectedTasks: [
    {
      id: 't_ext_1',
      text: 'Review ZTRED SRS v2.0 accessibility conformance report',
      detectedAssignee: 'Sarah Chen',
      detectedDueDate: 'Tomorrow',
    },
  ],
  meetingRecap: {
    summary: 'The frontend architectural sync covered Next.js 14 App Router layout structure, virtualization of message lists with 10k items, and Socket.IO client optimistic store updates.',
    actionItems: [
      { id: 'act_1', text: 'Setup Radix UI dialog and dropdown primitives', assignee: 'Alex Rivera' },
      { id: 'act_2', text: 'Configure WebRTC SFU peer connection handlers', assignee: 'Marcus Vance' },
    ],
    keyDecisions: [
      'Use @tanstack/react-virtual for list and grid virtualization.',
      'Persist workspace and active stream selections in Zustand stores.',
    ],
  },
  setGeneratingSummary: (generating) => set({ isGeneratingSummary: generating }),
  setActiveSummary: (summary) => set({ activeSummary: summary }),
  setSuggestedReplies: (suggestedReplies) => set({ suggestedReplies }),
  setDetectedTasks: (detectedTasks) => set({ detectedTasks }),
  setMeetingRecap: (meetingRecap) => set({ meetingRecap }),
}));
