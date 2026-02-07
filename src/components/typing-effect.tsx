'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  containerClassName?: string;
  sequences: {
    text: string;
    className: string;
  }[];
  duration?: number;
}

export function TypingEffect({
  containerClassName,
  sequences,
  duration = 3000,
}: TypingEffectProps) {
  const [seqIndex, setSeqIndex] = useState(0);

  useEffect(() => {
    if (!sequences || sequences.length <= 1) return;

    const intervalId = setInterval(() => {
      setSeqIndex((prevIndex) => (prevIndex + 1) % sequences.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [sequences, duration]);

  if (!sequences || sequences.length === 0) {
    return <div className={cn('relative flex items-center justify-center min-h-[40px]', containerClassName)} />;
  }

  return (
    <div className={cn('relative flex items-center justify-center min-h-[40px]', containerClassName)}>
      {sequences.map((sequence, index) => (
        <p
          key={index}
          className={cn(
            sequence.className,
            'absolute transition-opacity duration-1000 ease-in-out',
            {
              'opacity-100': index === seqIndex,
              'opacity-0': index !== seqIndex,
            }
          )}
        >
          {sequence.text}
        </p>
      ))}
    </div>
  );
}
