'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - A cinematic layer of falling leaves.
 * Active only in 'autumn' mode. Features procedural drift and organic rotation.
 */
export function AutumnOverlay() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 12 + 10}s`,
      delay: `${Math.random() * 15}s`,
      size: Math.random() * 20 + 12,
      opacity: Math.random() * 0.4 + 0.2,
      color: [
        'text-orange-500/30',
        'text-amber-600/30',
        'text-red-700/30',
        'text-yellow-600/30'
      ][Math.floor(Math.random() * 4)]
    }));
  }, []);

  if (!mounted || theme !== 'autumn') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-leaf-fall"
          style={{
            left: leaf.left,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
            opacity: leaf.opacity,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className={leaf.color}
          >
            {/* Organic Leaf Path */}
            <path
              d="M12 21c-1.5-1.5-4-3-4-6.5 0-3 2.5-6 4-11.5 1.5 5.5 4 8.5 4 11.5 0 3.5-2.5 5-4 6.5zM12 21v-3.5"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
