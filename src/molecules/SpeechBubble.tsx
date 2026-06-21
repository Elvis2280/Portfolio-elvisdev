'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  messages: string[];
  arrowPosition?: 'left' | 'right';
  className?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  delay?: number;
}

export default function SpeechBubble({
  messages,
  arrowPosition = 'left',
  className,
  typingSpeed = 50,
  pauseDuration = 2000,
  delay = 0,
}: SpeechBubbleProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(delay === 0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial delay
  useEffect(() => {
    if (delay === 0) return;
    const delayTimer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [displayText]);

  // Typewriter loop
  useEffect(() => {
    if (!isVisible || messages.length === 0) return;

    const currentMessage = messages[currentIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentMessage.length) {
      // Typing phase
      timer = setTimeout(() => {
        setDisplayText(currentMessage.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === currentMessage.length) {
      // Pause before deleting (only if multiple messages)
      if (messages.length > 1) {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else if (isDeleting && displayText.length > 0) {
      // Deleting phase (faster than typing)
      timer = setTimeout(() => {
        setDisplayText(currentMessage.slice(0, displayText.length - 1));
      }, typingSpeed / 2);
    } else if (isDeleting && displayText.length === 0) {
      // Move to next message
      setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    isVisible,
    messages,
    typingSpeed,
    pauseDuration,
  ]);

  if (!isVisible) return null;

  const pointerClasses: Record<string, string> = {
    left: 'left-4',
    right: 'right-4',
  };

  return (
    <div className="relative flex flex-col">
      <div
        ref={containerRef}
        className={cn(
          'relative z-10 flex-1 bg-secondary border border-border rounded-lg px-4 py-4 text-foreground text-xs font-mono animate-speech-entrance h-20 overflow-y-scroll scrollbar-none min-w-56 md:min-w-80 md:text-lg md:h-32',
          className,
        )}
      >
        <span>{displayText}</span>
        <span className="animate-pulse">|</span>
      </div>

      <div
        className={cn(
          'absolute -bottom-3 translate-x-5 translate-y-1/2 w-6 h-6 bg-secondary rotate-45 border-b border-r border-border z-0',
          pointerClasses[arrowPosition],
        )}
      />
    </div>
  );
}
