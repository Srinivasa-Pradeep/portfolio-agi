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
  // Session 0: Stem
  { path: "M 250 400 L 250 300", length: 100 },
  // Session 1: First branches
  { path: "M 250 350 Q 220 330 200 300", length: 80 },
  { path: "M 250 350 Q 280 330 300 300", length: 80 },
  // Session 2: More branches
  { path: "M 250 320 Q 230 300 210 270", length: 70 },
  { path: "M 250 320 Q 270 300 290 270", length: 70 },
  // Session 3: First leaves
  { cx: 190, cy: 290, r: 5 },
  { cx: 310, cy: 290, r: 5 },
  { cx: 205, cy: 260, r: 5 },
  { cx: 295, cy: 260, r: 5 },
  // Session 4: Fruits/Flowers
  { cx: 250, cy: 280, r: 7 },
  // Session 5: More leaves
  { cx: 230, cy: 370, r: 5 },
  { cx: 270, cy: 370, r: 5 },
  // Session 6+: more complex branches
  { path: "M 200 300 Q 180 280 170 250", length: 60 },
  { path: "M 300 300 Q 320 280 330 250", length: 60 },
];

export function ZenTree({ sessions, progress, state }: ZenTreeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getVisibleParts = () => {
    if (sessions === 0) return treeParts.slice(0, 1);
    if (sessions === 1) return treeParts.slice(0, 3);
    if (sessions === 2) return treeParts.slice(0, 5);
    if (sessions === 3) return treeParts.slice(0, 9);
    if (sessions === 4) return treeParts.slice(0, 10);
    if (sessions >= 5) return treeParts.slice(0, 12);
    if (sessions >= 6) return treeParts;
    return [];
  };
  
  const visibleParts = getVisibleParts();

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

      {/* Tree paths */}
      {visibleParts.map((part, index) => {
        if ('path' in part) {
          const isGrowingPart = index === visibleParts.filter(p => 'path' in p).length - 1;
          const strokeDashoffset = isGrowingPart && state === 'running'
            ? part.length * (1 - progress)
            : 0;

          return (
            <path
              key={index}
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
                filter: state === 'running' ? 'url(#glow)' : 'none',
              }}
            />
          );
        }
        return null;
      })}
      
      {/* Tree leaves/fruits */}
      {visibleParts.map((part, index) => {
         if ('r' in part) {
           const isGrowingPart = index === visibleParts.length - 1;
           const currentProgress = state === 'running' ? progress : (state === 'complete' || state === 'paused') ? 1 : 0;
           const scale = isGrowingPart ? currentProgress : 1;
           const opacity = isGrowingPart ? currentProgress : 1;

           const isFlower = 'cx' in part && part.r > 6;

           return (
            <circle
                key={index}
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
                    transition: 'transform 1s ease-out, opacity 1s ease-out',
                }}
            />
           )
         }
         return null;
      })}
    </svg>
  );
}
