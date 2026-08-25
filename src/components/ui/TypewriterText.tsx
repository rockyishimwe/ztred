"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypewriterText({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseAfterType = 2000,
  pauseAfterDelete = 500,
  className = "",
  style,
}: TypewriterTextProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (text.length < currentPhrase.length) {
        setText(currentPhrase.slice(0, text.length + 1));
      } else {
        // Finished typing — pause then start deleting
        const timer = setTimeout(() => setIsDeleting(true), pauseAfterType);
        return () => clearTimeout(timer);
      }
    } else {
      // Deleting
      if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        // Finished deleting — move to next phrase, pause then type
        const timer = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setIsDeleting(false);
        }, pauseAfterDelete);
        return () => clearTimeout(timer);
      }
    }
  }, [text, isDeleting, currentPhrase, phrases.length, pauseAfterType, pauseAfterDelete]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className} style={style}>
      {text}
      <span
        className="inline-block w-[3px] ml-0.5 animate-pulse"
        style={{
          height: "1em",
          backgroundColor: "var(--primary)",
          verticalAlign: "text-bottom",
        }}
      />
    </span>
  );
}
