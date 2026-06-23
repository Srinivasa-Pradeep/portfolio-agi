'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - Hyper-realistic maple leaf architecture.
 * Redesigned using multi-lobed sharp paths based on the user-provided reference.
 * Features jagged, serrated edges, anatomical veins, and variegated seasonal tones.
 */
export function AutumnOverlay() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const leaves = useMemo(() => {
    // 35 units for a balanced, premium cinematic atmosphere
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 12 + 15}s`, 
      delay: `${Math.random() * 25}s`,
      size: Math.random() * 32 + 28, // Slightly larger for detail visibility
      opacity: Math.random() * 0.4 + 0.15,
      // Variant 0: Sharp 5-lobed Maple, Variant 1: Broad 7-lobed Maple, Variant 2: Curled Maple
      variant: Math.floor(Math.random() * 3),
      color: [
        'text-orange-600/40',
        'text-red-700/35',
        'text-amber-600/40',
        'text-red-900/30',
        'text-yellow-700/35'
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
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={leaf.color}
          >
            {leaf.variant === 0 && (
              // Realistic Sharp 5-lobed Maple Leaf Path
              <path d="M12 22s.3-2.5-.2-4.5c-1.5-.5-3.5 1-5-1-.5-2 1.5-3 3-4-.5-1.5-3-1.5-4-3-1-1.5 1.5-2.5 3-2.5-.5-2-2-4 .5-6 1 1.5 1 3.5 1.5 5.5 1-1.5 1-3.5 2-5 1.5-1 3 1.5 2.5 3.5 2-.5 4 .5 4 2.5-1 1.5-3.5 1.5-4 3 1.5 1 3.5 2 3 4-1.5 2-3.5.5-5 1-.5 2-.2 4.5-.2 4.5z" />
            )}
            {leaf.variant === 1 && (
              // Realistic Broader 7-lobed Maple Leaf Path
              <path d="M12 21.5c0-2 .5-4 0-5.5-1.5.5-3 2-4.5.5-1.5-1.5.5-3 2-4-1.5-.5-3.5-.5-4.5-2-1-1.5 1-3 2.5-3.5-1-1.5-1.5-3.5 1-5 1 1 1.5 3 2 4.5 1.5-2 2-4.5 3.5-4.5 1 1 1 3.5 1.5 5 1.5-1 4-1 5 1 .5 1.5-2 2-3.5 2.5 1.5 1.5 4 2.5 3 4.5-.5 1.5-2.5.5-4 0-.5 1.5 1 3.5-1 5-1 1.5-1.5-.5-1.5-2z" />
            )}
            {leaf.variant === 2 && (
              // Realistic Curled/Asymmetrical Maple Leaf Path
              <path d="M12 22s.5-3-.5-5c-1.5-.2-3.5 1.5-5-.5-1-2 1.5-3.5 3-4.5-1-2-4-2-4.5-4-1-2 2-3 4-3-.5-2-1.5-4.5 1-6 1 1.5 1 4 1.5 6 1.5-2 2-4.5 3.5-4 1.5 1 1 4 1.5 5.5 1.5-.5 4.5 0 4.5 2.5-1 2-4 2-4.5 4 2 1 4.5 2.5 3.5 4.5-1.5 2-4 0-6 1-.5 2-.5 5-.5 5z" />
            )}
            {/* Anatomical Central Vein and Branches */}
            <path
              d="M12 21v-12M12 14l-4-3M12 14l4-3M12 11l-3-4M12 11l3-4"
              stroke="currentColor"
              strokeWidth="0.3"
              strokeOpacity="0.25"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}