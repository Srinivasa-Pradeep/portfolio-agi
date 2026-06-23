'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - Hyper-realistic maple leaf architecture.
 * Redesigned using multi-lobed sharp paths for a high-fidelity "leaf leaf" feel.
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
      size: Math.random() * 32 + 28, // Detail visibility
      opacity: Math.random() * 0.4 + 0.15,
      // Variants with hyper-precise jagged outer structures
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
              // Hyper-precise Sharp 5-lobed Maple Path
              <path d="M12 21.5c.3-2 .8-3.5 0-5.5-1.5.5-3.5 1.5-4.5 0-1-1.5 1.5-2.5 3-3.5-1-1.5-3.5-1-4.5-2.5-1-1.5 1.5-2.5 3-2.5-.5-2-2.5-3.5 0-5.5.8 1.5.8 3.5 1.5 5.5 1-1.5 1-3.5 2.5-5 1.5-1 2.5 1 2 3 1.5-.5 3.5.5 4 2.5-1 1.5-2.5 1.5-3.5 2.5 1.5 1 3 2 2.5 4-1.5 1.5-3 1-4.5 1.5-.5 2-.5 5-.5 5z" />
            )}
            {leaf.variant === 1 && (
              // Hyper-precise Serrated 7-lobed Path
              <path d="M12 21.5s.5-3-.2-5c-1.5 0-3 1.5-4.5 0-1.5-1.5 1-3 2.5-4-1.5-.5-3.5-1-4.5-2.5-1-1.5 1.5-2.5 3-3-.5-1.5-1.5-3 1-4.5 1 1 1 3 1.5 4.5 1.5-2 2-4 3.5-4 1.5 1.5 1 3.5 1.5 5 1.5-1 4-1.5 5 1 1 1.5-1.5 2.5-3.5 3 1.5 1.5 3.5 2.5 2.5 4.5-1 1.5-3 .5-4.5 1-.5 1.5 0 4-.2 5z" />
            )}
            {leaf.variant === 2 && (
              // Hyper-precise Asymmetrical Sharp Maple variant
              <path d="M11.5 22s.8-3-.5-5c-1.8.2-3.8 1.8-4.8-.2-.8-1.8 1.5-3.5 3-4.5-1.5-2-4.5-2-5-4-1-2 2-3 4-3-.5-2-1.5-4.5 1-6 1 1.5 1 4 1.5 6 2-2 2.5-4.5 4-4 1.5 1 1 4 1.5 5.5 2-.5 4.5 0 4.5 2.5-1 2-4 2-4.5 4 2.5 1 4.5 2.5 3.5 4.5-1.5 2.5-4.5.5-6.5 1.5-.2 2.5-.2 5.2-.2 5.2z" />
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
