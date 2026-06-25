'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - Hyper-Realistic Maple Foliage.
 * Features anatomically precise 5-lobed maple leaves with petioles (sticks)
 * and internal vein structures.
 */
export function AutumnOverlay() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 12}s`,
      delay: `${Math.random() * 20}s`,
      size: Math.random() * 30 + 20,
      opacity: Math.random() * 0.4 + 0.2,
      color: [
        'text-orange-600/40',
        'text-amber-700/40',
        'text-red-800/35',
        'text-yellow-700/35',
        'text-orange-900/25'
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
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={leaf.color}
          >
            {/* Hyper-Realistic 5-Lobed Maple Leaf Path */}
            <path
              d="M50 95 L50 80 
                 C50 80, 45 75, 40 78 
                 C35 81, 20 85, 15 70 
                 C10 55, 5 50, 10 45 
                 C15 40, 25 35, 30 40 
                 C30 30, 25 15, 35 10 
                 C45 5, 50 0, 55 10 
                 C60 15, 65 30, 65 40 
                 C70 35, 80 40, 85 45 
                 C90 50, 95 55, 80 70 
                 C75 85, 60 81, 55 78 
                 C50 75, 50 80, 50 95Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            {/* Internal Vein Architecture */}
            <path
              d="M50 80 L50 20
                 M50 65 L25 45
                 M50 65 L75 45
                 M50 45 L35 25
                 M50 45 L65 25"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
