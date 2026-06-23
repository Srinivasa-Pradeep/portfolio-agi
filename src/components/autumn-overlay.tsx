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
    // Increased leaf count to 60 for a "Full" immersive experience
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 12}s`, // Slightly slower for deeper parallax
      delay: `${Math.random() * 20}s`,
      size: Math.random() * 24 + 16,
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
            {/* Anatomically Detailed Sharp Leaf Silhouette */}
            <path
              d="M12 2C12 2 11.5 5.5 9 7C6 8.5 3 8 2 11C4 12 6 12.5 7 14C6 16 5 19 7 21C9 20 11 18.5 12 17C13 18.5 15 20 17 21C19 19 18 16 17 14C18 12.5 20 12 22 11C21 8 18 8.5 15 7C12.5 5.5 12 2 12 2Z"
              fill="currentColor"
            />
            {/* Fine Internal Vein Structure for Sharp Detail */}
            <path
              d="M12 5V17 M12 8L9 10 M12 11L15 13 M12 14L10 16"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}