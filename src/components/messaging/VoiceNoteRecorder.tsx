"use client";
import React, { useState, useRef } from 'react';
import { Mic, Pause, Play, Square } from 'lucide-react';

interface VoiceNoteRecorderProps {
  onVoiceNoteRecorded: (audioBlob: Blob) => void;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({
  onVoiceNoteRecorded
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        onVoiceNoteRecorded(audioBlob);

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        mediaRecorderRef.current = null;
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setTimeElapsed(0);

      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {!isRecording && (
        <button
          onClick={startRecording}
          className="p-2 rounded-hover hover:bg-zinc-100"
        >
          <Mic className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
        </button>
      )}
      {isRecording && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={isPaused ? resumeRecording : pauseRecording}
              className="p-2 rounded-hover hover:bg-zinc-100"
            >
              {isPaused ? (
                <Play className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
              ) : (
                <Pause className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
              )}
            </button>
            <button
              onClick={stopRecording}
              className="p-2 rounded-hover hover:bg-zinc-100"
            >
              <Square className="h-4 w-4 text-zinc-500 hover:text-zinc-600"/>
            </button>
          </div>
          <div className="text-xs font-mono text-zinc-600">
            {formatTime(timeElapsed)} / 05:00
          </div>
        </div>
      )}
    </div>
  );
};