'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - High-fidelity, actual autumn leaf feel.
 * Uses complex paths to mimic dried, curled leaves with stems and veins.
 * Calibrated for a sophisticated, drifting cinematic experience.
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
      size: Math.random() * 28 + 22,
      opacity: Math.random() * 0.35 + 0.1,
      // Variant 0: Maple-ish, Variant 1: Oak-ish, Variant 2: Generic dried
      variant: Math.floor(Math.random() * 3),
      color: [
        'text-orange-600/35',
        'text-amber-700/35',
        'text-red-800/30',
        'text-yellow-700/30',
        'text-orange-900/20'
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
              // Realistic Maple-style Path (Jagged and Lobed)
              <path d="M12 21.5c0-1.5.5-3.5-1-4.5-2-1-4.5 1.5-6-1-1-2 1-4.5 3-5.5 1-1 0-.5 1.5-1.5.5-1.5-1-4 0-6 1.5 2 1 4.5 1.5 6 1.5 1 1.5 0 2.5 1 2 1 4 3.5 3 5.5-1.5 2.5-4 0-6 1-.5 1-1.5 5-1.5 5z" />
            )}
            {leaf.variant === 1 && (
              // Realistic Oak-style Path (Irregular rounded lobes)
              <path d="M12 22s.5-4-.5-5.5c-1-1.5-4 .5-5-1s1-4 3-5c1-1 0-1 1.5-2.5 1-1.5-.5-5 1-6 1.5 1 0 4.5 1 6 1.5 1.5.5.5 1.5 2.5s4 3.5 3 5-4-.5-5 1c-1 1.5-.5 5.5-.5 5.5z" />
            )}
            {leaf.variant === 2 && (
              // Realistic Dried/Withered Leaf (Asymmetrical curl)
              <path d="M12 21.5c0-2-1-3-2-5-2-1-4 1-5.5-1s.5-5 3-6c1.5-1 1 0 2-2 .5-2-1-5 1.5-6.5 2 2 1 5 1.5 6.5 1 2 1 1 2.5 2 2.5 1 4 4 3 6-1 2-3.5 0-5.5 1-1 2-.5 5-.5 5z" />
            )}
            {/* Anatomical Central Vein */}
            <path
              d="M12 21v-12"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
