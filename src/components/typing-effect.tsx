'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  containerClassName?: string;
  sequences: {
    text: string;
    className: string;
  }[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function TypingEffect({
  containerClassName,
  sequences,
  typingSpeed = 200,
  deleteSpeed = 150,
  pauseDuration = 2000,
}: TypingEffectProps) {
  const [seqIndex, setSeqIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    if (sequences.length === 0) return;

    const timer = setTimeout(() => {
      const currentSequence = sequences[seqIndex];
      const fullText = currentSequence.text;

      if (isDeleting) {
        setText(t => t.substring(0, t.length - 1));
        setSpeed(deleteSpeed);
      } else {
        setText(t => fullText.substring(0, t.length + 1));
        setSpeed(typingSpeed);
      }

      if (!isDeleting && text === fullText) {
        // Finished typing, pause and then start deleting
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === '') {
        // Finished deleting, move to next sequence
        setIsDeleting(false);
        setSeqIndex(i => (i + 1) % sequences.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, seqIndex, sequences, typingSpeed, deleteSpeed, pauseDuration, speed]);
  
  if (!sequences || sequences.length === 0) {
    return <div className={cn('relative flex items-center justify-center min-h-[40px]', containerClassName)} />;
  }

  const currentSequence = sequences[seqIndex];
  const currentSequenceStyle = currentSequence?.className || '';
  
  // Show cursor only when typing or deleting
  const isMidSequence = (isDeleting && text.length > 0) || (!isDeleting && text.length < currentSequence.text.length);

  // The text is rendered inside a p tag. A sparkle span is appended.
  return (
    <div className={cn('relative flex items-center justify-center min-h-[40px]', containerClassName)}>
        <p className={cn(currentSequenceStyle)}>
          {text}
          {isMidSequence && <span className="sparkle-cursor" />}
        </p>
    </div>
  );
}
