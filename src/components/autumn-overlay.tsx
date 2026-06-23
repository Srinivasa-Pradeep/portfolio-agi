'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutumnOverlay - A high-fidelity cinematic layer of falling leaves.
 * Active only in 'autumn' mode. 
 * Features anatomically detailed sharp leaves with internal vein structures.
 * Calibrated for a "Full" immersive density and organic drift physics.
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
      size: Math.random() * 28 + 20,
      opacity: Math.random() * 0.3 + 0.1,
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
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={leaf.color}
          >
            {/* High-Fidelity Asymmetrical Lobed Leaf Path - Elongated and Pointed */}
            <path
              d="M12 22l-.5-3c-1.5-.5-4 1-5.5-.5-1.5-1.5-1-4 0-5 1-1 2.5-.5 4 .5.5-.5 0-3 1-4.5 1-1.5 3-1.5 3-1.5s2 0 3 1.5c1 1.5.5 4 1 4.5 1.5-1 3-1.5 4-.5 1 1 1.5 3.5 0 5-1.5 1.5-4 0-5.5.5l-.5 3z"
              fill="currentColor"
            />
            {/* Fine Internal Vein Structure */}
            <path
              d="M12 5v12 M9 8l3 2 M15 8l-3 2 M8 12l4 1 M16 12l-4 1"
              stroke="currentColor"
              strokeWidth="0.3"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
