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
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export function TypingEffect({
  containerClassName,
  sequences,
  typingSpeed = 100,
  deletingSpeed = 75,
  delayBetweenTexts = 1800,
}: TypingEffectProps) {
  const [seqIndex, setSeqIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!sequences || sequences.length === 0) return;
    
    const currentSequence = sequences[seqIndex];

    const timeoutId = setTimeout(() => {
      if (isDeleting) {
        if (subText.length > 0) {
          setSubText(currentSequence.text.substring(0, subText.length - 1));
        } else {
          setIsDeleting(false);
          setSeqIndex((prevIndex) => (prevIndex + 1) % sequences.length);
        }
      } else {
        if (subText.length < currentSequence.text.length) {
          setSubText(currentSequence.text.substring(0, subText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [subText, isDeleting, seqIndex, sequences, typingSpeed, deletingSpeed, delayBetweenTexts]);

  const currentSequence = sequences?.[seqIndex];

  return (
    <div className={cn('flex items-center justify-center min-h-[40px]', containerClassName)}>
      <p className={cn(currentSequence?.className)}>
        {subText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
