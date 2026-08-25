export interface AISuggestedReply {
  id: string;
  text: string;
}

export interface AIMeetingRecap {
  summary: string;
  actionItems: Array<{ id: string; text: string; assignee?: string }>;
  keyDecisions: string[];
}

export interface AITaskExtraction {
  id: string;
  text: string;
  detectedAssignee?: string;
  detectedDueDate?: string;
}

export interface AIProductivityInsight {
  messagesSent: number;
  meetingsAttendedMinutes: number;
  tasksCompleted: number;
  focusScore: number;
  weeklyTrend: Array<{ day: string; hours: number }>;
}
