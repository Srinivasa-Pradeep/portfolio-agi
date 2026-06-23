'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - A cinematic layer of falling leaves.
 * Active only in 'autumn' mode. Features procedural drift and organic rotation.
 * Enhanced for a "Full" immersive experience.
 */
export function AutumnOverlay() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leaves = useMemo(() => {
    // Increased leaf count for a fuller experience
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 15 + 10}s`,
      delay: `${Math.random() * 20}s`,
      size: Math.random() * 22 + 14,
      opacity: Math.random() * 0.4 + 0.15,
      color: [
        'text-orange-500/30',
        'text-amber-600/30',
        'text-red-700/30',
        'text-yellow-600/30',
        'text-orange-700/20'
      ][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360,
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
            transform: `rotate(${leaf.rotation}deg)`,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            className={leaf.color}
          >
            {/* Detailed Organic Leaf Path */}
            <path
              d="M12 21c-1.5-1.5-4-3-4-6.5 0-3 2.5-6 4-11.5 1.5 5.5 4 8.5 4 11.5 0 3.5-2.5 5-4 6.5zM12 21v-3.5 M8 12.5c1.5 0 2.5 1 4 1s2.5-1 4-1"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
