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
          className="invisible col-start-1 row-start-1 block whitespace-pre-wrap"
          aria-hidden="true"
        >
          {word.split('').map((char, charIdx) => {
            if (char === '\n') return <br key={`br-${charIdx}`} />;
            return (
              <span key={charIdx} className="inline-block whitespace-pre">
                {char}
              </span>
            );
          })}
        </span>
      ))}

      {/* Animated characters */}
      {words.map((word, wordIdx) => {
        const isActive = index === wordIdx;
        return (
          <span
            key={`animated-${wordIdx}`}
            className={cn(
              "col-start-1 row-start-1 block whitespace-pre-wrap",
              !isActive && "pointer-events-none"
            )}
            aria-hidden={!isActive}
          >
            {word.split('').map((char, charIdx) => {
              if (char === '\n') return <br key={`br-anim-${charIdx}`} />;
              return (
                <span
                  key={charIdx}
                  className={cn(
                    "inline-block whitespace-pre transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isActive 
                      ? "opacity-100 blur-none translate-y-0" 
                      : "opacity-0 blur-md translate-y-1"
                  )}
                  style={{
                    transitionDelay: isActive ? `${charIdx * 35}ms` : '0ms',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
