import { Message, UserPresence, MeetingParticipant } from './api';

export type WSEventType =
  | 'messaging:message:new'
  | 'messaging:message:updated'
  | 'messaging:message:deleted'
  | 'messaging:reaction:added'
  | 'messaging:reaction:removed'
  | 'presence:user:online'
  | 'presence:user:offline'
  | 'presence:user:away'
  | 'presence:user:typing:start'
  | 'presence:user:typing:stop'
  | 'meetings:meeting:started'
  | 'meetings:meeting:ended'
  | 'meetings:meeting:participant_joined'
  | 'meetings:meeting:participant_left'
  | 'meetings:meeting:active_speaker'
  | 'meetings:meeting:live_caption'
  | 'collaboration:doc:content_changed'
  | 'collaboration:whiteboard:element_updated'
  | 'ai:assistant:chunk'
  | 'ai:smart_reply:ready';

export interface WSMessagePayload {
  event: WSEventType;
  data: any;
}
