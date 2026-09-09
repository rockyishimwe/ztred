"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Mic, Pause, Play, Square } from 'lucide-react';

interface VoiceNoteRecorderProps {
  onVoiceNoteRecorded: (audioBlob: Blob) => void;
  /** Hard cap in seconds; recording stops itself on reaching it. */
  maxSeconds?: number;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({
  onVoiceNoteRecorded,
  maxSeconds = 300,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  // Set while tearing down on unmount, so `onstop` does not hand a blob back
  // to a parent that is no longer mounted.
  const abandonedRef = useRef(false);

  // Full teardown if the component unmounts mid-recording: otherwise the
  // interval keeps ticking and the mic stream stays live after the UI is gone.
  useEffect(() => {
    return () => {
      abandonedRef.current = true;
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        // Use the recorder's actual container type instead of assuming mp3.
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        // Skip the callback when the stop came from unmount teardown.
        if (!abandonedRef.current) onVoiceNoteRecorded(audioBlob);

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        mediaRecorderRef.current = null;
      };

      mediaRecorderRef.current.start();
      setError(null);
      setIsRecording(true);
      setIsPaused(false);
      setTimeElapsed(0);
      startTicking();
    } catch (err) {
      // Surface the failure instead of only logging it — a denied mic
      // permission left the button looking like it simply did nothing.
      console.error('Error accessing microphone:', err);
      setError(
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Microphone access denied.'
          : 'Could not start recording.'
      );
      setIsRecording(false);
    }
  };

  const stopTicking = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTicking = () => {
    stopTicking();
    intervalRef.current = setInterval(() => {
      setTimeElapsed(prev => {
        const next = prev + 1;
        // Enforce the cap the UI advertises; it used to count past it forever.
        if (next >= maxSeconds) {
          stopRecording();
          return maxSeconds;
        }
        return next;
      });
    }, 1000);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      // The timer used to keep running while paused, so the readout drifted
      // away from the actual recorded length.
      stopTicking();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      startTicking();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      stopTicking();
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
        <button type="button" aria-label="Start recording" title="Start recording"
          onClick={startRecording}
          className="p-2 rounded hover:bg-theme-secondary"
        >
          <Mic className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
        </button>
      )}
      {isRecording && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <button type="button"
              aria-label={isPaused ? "Resume recording" : "Pause recording"}
              title={isPaused ? "Resume recording" : "Pause recording"}
              onClick={isPaused ? resumeRecording : pauseRecording}
              className="p-2 rounded hover:bg-theme-secondary"
            >
              {isPaused ? (
                <Play className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
              ) : (
                <Pause className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
              )}
            </button>
            <button type="button" aria-label="Stop recording" title="Stop recording"
              onClick={stopRecording}
              className="p-2 rounded hover:bg-theme-secondary"
            >
              <Square className="h-4 w-4 text-theme-secondary hover:text-theme-primary"/>
            </button>
          </div>
          <div className="text-xs font-mono text-theme-secondary">
            {formatTime(timeElapsed)} / {formatTime(maxSeconds)}
          </div>
        </div>
      )}
      {error && (
        <p className="text-xs text-theme-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};