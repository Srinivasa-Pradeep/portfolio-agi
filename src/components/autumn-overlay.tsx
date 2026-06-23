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
    // 60 units for a full immersive atmosphere
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 12}s`, 
      delay: `${Math.random() * 20}s`,
      size: Math.random() * 24 + 18,
      opacity: Math.random() * 0.35 + 0.15,
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
            {/* High-Fidelity Sharp Jagged Leaf Silhouette */}
            <path
              d="M12 2C12 2 11.5 5 9 6.5C6 8 3 7.5 2 10.5C4 11.5 6 12 7 13.5C6 15.5 5 18.5 7 20.5C9 19.5 11 17 12 15.5C13 17 15 19.5 17 20.5C19 18.5 18 15.5 17 13.5C18 12 20 11.5 22 10.5C21 7.5 18 8 15 6.5C12.5 5 12 2 12 2Z"
              fill="currentColor"
            />
            {/* Fine Internal Vein Structure for Elite Detail */}
            <path
              d="M12 4.5V14.5 M12 7L9 9 M12 10L15 12 M12 13L10 15"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}