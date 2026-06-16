'use client';

import React, { useMemo } from 'react';
import { useSpring } from '@/context/spring-context';

export function SpringOverlay() {
  const { isSpringMode } = useSpring();

  const petals = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 8 + 6}s`,
      delay: `${Math.random() * 10}s`,
      size: Math.random() * 14 + 10,
      opacity: Math.random() * 0.4 + 0.3,
    }));
  }, []);

  if (!isSpringMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-flower-shower"
          style={{
            left: petal.left,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-pink-300/40 dark:text-pink-200/20"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}