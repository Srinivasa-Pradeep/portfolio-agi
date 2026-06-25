'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - Hyper-Realistic Maple Architecture.
 * Features an anatomically precise 7-lobed maple leaf with a distinct petiole (stick).
 * Optimized SVG path for high-fidelity "leaf leaf" feel.
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
      size: Math.random() * 40 + 30,
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
            {/* Anatomically Precise 7-Lobed Maple Path with Stick */}
            <path
              d="M50 95 L50 82 
                 M50 82 L45 80 C40 82, 35 85, 30 80 C25 75, 10 70, 15 55 C18 45, 5 45, 8 35 C10 25, 20 20, 30 30 C30 20, 25 5, 40 8 C45 10, 50 0, 55 8 C70 5, 65 20, 65 30 C75 20, 85 25, 87 35 C90 45, 77 45, 80 55 C85 70, 70 75, 65 80 C60 85, 55 82, 50 82Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            {/* The "Stick" (Petiole) Axis */}
            <path
              d="M50 95 L50 30"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />
            {/* Internal Vein Ribs */}
            <path
              d="M50 75 L30 60 M50 75 L70 60 M50 55 L25 40 M50 55 L75 40 M50 35 L40 25 M50 35 L60 25"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
