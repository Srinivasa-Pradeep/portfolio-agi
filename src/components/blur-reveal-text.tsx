'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurRevealTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function BlurRevealText({ words, className, interval = 3000 }: BlurRevealTextProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 500); // Wait for fade out before switching
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={cn("inline-grid font-medium align-baseline", className)}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className={cn(
            "col-start-1 row-start-1 block whitespace-nowrap transition-all duration-700 ease-in-out",
            index === wordIdx && !isTransitioning 
              ? "opacity-100 blur-none translate-y-0" 
              : "opacity-0 blur-md translate-y-1 pointer-events-none"
          )}
          aria-hidden={index !== wordIdx}
        >
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              className="inline-block whitespace-pre"
              style={{
                transitionDelay: `${charIdx * 30}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
