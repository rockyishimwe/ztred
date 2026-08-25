"use client";
import { useState } from 'react';
import { Message } from '@/types/api';
import {
  Smile,
  Paperclip,
  Mic,
  Clock,
  ChevronDown,
  Heading,
} from 'lucide-react';
import { EmojiPicker as Picker } from '@/components/ui/emoji-picker';
import { SmartMentions } from './SmartMentions';
import { VoiceNoteRecorder } from './VoiceNoteRecorder';
import { FileUploadProgress } from './FileUploadProgress';
import { ScheduledMessagePicker } from './ScheduledMessagePicker';

interface MessageInputProps {
  onSend: (content: string, type: Message['type'], attachments?: Message['attachments']) => void;
  streamId?: string;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  streamId,
  placeholder
}) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [attachments, setAttachments] = useState<Message['attachments']>([]);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);

  const handleSend = () => {
    if (text.trim() || (attachments && attachments.length > 0)) {
      onSend(
        text,
        attachments && attachments.length > 0 ? 'file' : 'text',
        attachments && attachments.length > 0 ? attachments : undefined
      );
      setText('');
      setAttachments([]);
      setScheduledTime(null);
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-white dark:bg-ztred-surface-dark border-t border-zinc-200 dark:border-zinc-700">
      {/* Left side controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 rounded-hover hover:bg-zinc-100"
        >
          <Smile className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
        </button>

        <button
          onClick={() => setShowFilePicker(!showFilePicker)}
          className="p-2 rounded-hover hover:bg-zinc-100"
        >
          <Paperclip className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
        </button>

        <button
          onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
          className="p-2 rounded-hover hover:bg-zinc-100"
        >
          <Mic className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
        </button>

        <button
          onClick={() => setShowScheduler(!showScheduler)}
          className="p-2 rounded-hover hover:bg-zinc-100"
        >
          <Clock className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
        </button>

        <button
          className="p-2 rounded-hover hover:bg-zinc-100"
        >
          <Heading className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
        </button>

        {showEmojiPicker && (
          <Picker
            onSelect={emoji => {
              setText(text + emoji);
              setShowEmojiPicker(false);
            }}
            onDismiss={() => setShowEmojiPicker(false)}
            className="z-50 mt-2"
          />
        )}

        {showFilePicker && (
          <div className="z-50 mt-2 w-48 bg-white dark:bg-ztred-surface-dark rounded-lg shadow-lg p-4">
            <h3 className="text-sm font-medium mb-2">Attach files</h3>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.zip,.txt"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setAttachments(prev => [
                  ...(prev || []),
                  ...files.map(file => ({
                    id: `file_${Date.now()}_${Math.random()}`,
                    name: file.name,
                    url: URL.createObjectURL(file),
                    size: file.size,
                    mimeType: file.type,
                    thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
                  }))
                ]);
                e.target.value = ''; // Reset input
              }}
              className="mb-2"
            />
            <button
              onClick={() => setShowFilePicker(false)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded"
            >
              Attach
            </button>
          </div>
        )}

        {showVoiceRecorder && (
          <VoiceNoteRecorder
            onVoiceNoteRecorded={(audioBlob) => {
              setAttachments(prev => [{
                id: `voicenote_${Date.now()}`,
                name: 'voice note.mp3',
                url: URL.createObjectURL(audioBlob),
                size: audioBlob.size,
                mimeType: 'audio/mp3',
                duration: Math.floor(audioBlob.size / 16000), // Rough estimate
                thumbnailUrl: undefined
              }] as Message['attachments']);
              setShowVoiceRecorder(false);
            }}
          />
        )}

        {showScheduler && (
          <ScheduledMessagePicker
            onTimeSelected={(time) => setScheduledTime(time)}
            onCancel={() => setShowScheduler(false)}
          />
        )}
      </div>

      {/* Text input */}
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder || "Message #general..."}
          className="w-full min-h-[48px] resize-none px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Smart mentions and scheduling info */}
        <div className="flex items-center space-x-2 mt-1 text-xs">
          <SmartMentions
            onMentionSelected={(mention) => {
              setText(text + `@${mention} `);
            }}
          />
          {scheduledTime && (
            <span className="flex items-center space-x-1 text-zinc-500">
              <Clock className="h-3 w-3"/>
              Scheduled for: {scheduledTime.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-2">
        {attachments && attachments.length > 0 && (
          <FileUploadProgress files={attachments} onRemove={(id) => {
            setAttachments(prev => (prev || []).filter(file => file.id !== id));
          }}/>
        )}

        <button
          onClick={handleSend}
          disabled={!(text.trim() || (attachments && attachments.length > 0))}
          className={`flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors ${
            !(text.trim() || (attachments && attachments.length > 0)) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};