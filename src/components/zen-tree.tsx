'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ZenTreeProps = {
  sessions: number;
  progress: number;
  state: 'idle' | 'running' | 'paused' | 'complete';
};

// Each part of the tree with its drawing animation properties
const treeParts = [
  // Session 0: Stem (1 part)
  { path: "M 250 400 L 250 300", length: 100 },
  // Session 1: First branches (2 parts, total 3)
  { path: "M 250 350 Q 220 330 200 300", length: 80 },
  { path: "M 250 350 Q 280 330 300 300", length: 80 },
  // Session 2: More branches (2 parts, total 5)
  { path: "M 250 320 Q 230 300 210 270", length: 70 },
  { path: "M 250 320 Q 270 300 290 270", length: 70 },
  // Session 3: First leaves (4 parts, total 9)
  { cx: 190, cy: 290, r: 5 },
  { cx: 310, cy: 290, r: 5 },
  { cx: 205, cy: 260, r: 5 },
  { cx: 295, cy: 260, r: 5 },
  // Session 4: Fruits/Flowers (1 part, total 10)
  { cx: 250, cy: 280, r: 7 },
  // Session 5: More leaves (2 parts, total 12)
  { cx: 230, cy: 370, r: 5 },
  { cx: 270, cy: 370, r: 5 },
  // Session 6+: more complex branches (2 parts, total 14)
  { path: "M 200 300 Q 180 280 170 250", length: 60 },
  { path: "M 300 300 Q 320 280 330 250", length: 60 },
];

// Cumulative count of parts visible after each session.
const sessionBoundaries = [1, 3, 5, 9, 10, 12, 14];


export function ZenTree({ sessions, progress, state }: ZenTreeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const partsToShow = sessions < sessionBoundaries.length ? sessionBoundaries[sessions] : treeParts.length;
  const growingFromIndex = sessions > 0 ? sessionBoundaries[sessions - 1] : 0;
  const visibleParts = treeParts.slice(0, partsToShow);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }

  return (
    <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-lg">
      <defs>
        <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
      </defs>
      
      <path d="M 200 400 H 300 L 280 380 H 220 Z" className="fill-current text-yellow-800/30 dark:text-yellow-900/40" />

      {/* Tree parts */}
      {visibleParts.map((part, index) => {
        const isGrowingPart = index >= growingFromIndex;
        
        if ('path' in part) {
          const strokeDashoffset = isGrowingPart && state === 'running'
            ? part.length * (1 - progress)
            : 0;

          return (
            <path
              key={`path-${index}`}
              d={part.path}
              className={cn(
                "fill-none stroke-current text-green-700/80 dark:text-green-400/80 transition-opacity",
                state === 'paused' && 'opacity-50'
              )}
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                strokeDasharray: part.length,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 1s linear, opacity 0.5s',
                filter: isGrowingPart && state === 'running' ? 'url(#glow)' : 'none',
              }}
            />
          );
        }
        
         if ('r' in part) {
           const isFlower = 'cx' in part && part.r > 6;
           
           const scale = isGrowingPart && state === 'running' ? progress : 1;
           const opacity = isGrowingPart && state === 'running' ? progress : 1;

           return (
            <circle
                key={`circle-${index}`}
                cx={part.cx}
                cy={part.cy}
                r={part.r}
                className={cn(
                    "stroke-none transition-opacity",
                    isFlower ? "fill-current text-pink-500/80 dark:text-pink-400/80" : "fill-current text-green-600/80 dark:text-green-500/80",
                    state === 'paused' && 'opacity-50'
                )}
                style={{
                    transformOrigin: `${part.cx}px ${part.cy}px`,
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    transition: isGrowingPart ? 'transform 0.5s ease-out, opacity 0.5s ease-out' : 'opacity 0.5s',
                }}
            />
           )
         }
         return null;
      })}
    </svg>
  );
}
