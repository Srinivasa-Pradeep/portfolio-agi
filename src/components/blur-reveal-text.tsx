'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurRevealTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function BlurRevealText({ words, className, interval = 3500 }: BlurRevealTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={cn("inline-grid font-medium align-baseline", className)}>
      {/* Invisible placeholders to reserve maximum width and prevent layout shift */}
      {words.map((word, wordIdx) => (
        <span
          key={`placeholder-${wordIdx}`}
          className="invisible col-start-1 row-start-1 block whitespace-nowrap"
          aria-hidden="true"
        >
          {word.split('').map((char, charIdx) => (
            <span key={charIdx} className="inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </span>
      ))}

      {/* Animated characters */}
      {words.map((word, wordIdx) => {
        const isActive = index === wordIdx;
        return (
          <span
            key={`animated-${wordIdx}`}
            className={cn(
              "col-start-1 row-start-1 block whitespace-nowrap",
              !isActive && "pointer-events-none"
            )}
            aria-hidden={!isActive}
          >
            {word.split('').map((char, charIdx) => (
              <span
                key={charIdx}
                className={cn(
                  "inline-block whitespace-pre transition-all duration-700 ease-out",
                  isActive 
                    ? "opacity-100 blur-none translate-y-0" 
                    : "opacity-0 blur-md translate-y-2"
                )}
                style={{
                  transitionDelay: isActive ? `${charIdx * 45}ms` : '0ms',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}
