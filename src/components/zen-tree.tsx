'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ZenTreeProps = {
  sessions: number;
  progress: number;
  state: 'idle' | 'running' | 'paused' | 'complete';
};

const PETAL_LAYERS = 5;

// This function calculates the rotation for a petal layer based on sessions and progress.
const getLayerStyle = (layerIndex: number, sessions: number, progress: number, state: ZenTreeProps['state']) => {
  const baseRotation = -15; // How much a layer opens when its session is complete
  const activeGrowth = 20;  // How much extra it opens during the active session animation

  let rotation = 0;
  let opacity = 0.1; // Default for future layers

  // This layer's session is complete.
  if (sessions > layerIndex) {
    rotation = baseRotation;
    opacity = 1;
  } 
  // This is the currently growing layer.
  else if (sessions === layerIndex) {
    if (state === 'running' || state === 'paused') {
        rotation = baseRotation * progress + (state === 'running' ? Math.sin(progress * Math.PI) * -activeGrowth : 0);
        opacity = 0.1 + progress * 0.9;
    } else if (state === 'complete') {
        rotation = baseRotation;
        opacity = 1;
    }
  }
  // Otherwise, it's a future layer, and opacity remains 0.1, rotation 0.
  
  return { rotation, opacity };
};


export function ZenTree({ sessions, progress, state }: ZenTreeProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-full h-full" />;
  }
  
  const currentLayer = sessions < PETAL_LAYERS ? sessions : PETAL_LAYERS -1;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg overflow-visible">
      <defs>
        <radialGradient id="lotus-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary) / 0.8)', stopOpacity: 0.8 }} />
          <stop offset="60%" style={{ stopColor: 'hsl(var(--primary) / 0.3)', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary) / 0)', stopOpacity: 0 }} />
        </radialGradient>
         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      
      <g className={cn(state === 'running' && 'animate-slow-rotate')} style={{ transformOrigin: 'center' }}>

        {/* Pulsating Glow */}
        <circle 
          cx="100" 
          cy="100" 
          r="12" 
          fill="url(#lotus-glow)" 
          className={cn("transition-all duration-1000", state === 'running' && 'animate-pulse')} 
        />

        {/* Petal Layers */}
        {[...Array(PETAL_LAYERS)].map((_, i) => {
          const { rotation, opacity } = getLayerStyle(i, sessions, progress, state);
          const scale = 1 + i * 0.18;
          const isGrowing = currentLayer === i && state === 'running';

          return (
            <g 
              key={i}
              transform={`translate(100 100) scale(${scale}) translate(-100 -100)`}
              className={cn(
                  "transition-opacity duration-1000",
                  state === 'paused' && 'opacity-50'
              )}
              style={{ opacity: opacity }}
            >
              <g style={{ 
                  transform: `rotate(${rotation}deg)`, 
                  transformOrigin: '100px 140px',
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: isGrowing ? 'url(#glow)' : 'none',
              }}>
                  <path d="M100 90 C 80 80, 80 60, 100 40 C 120 60, 120 80, 100 90 Z" 
                        className="fill-current text-pink-400/20 dark:text-pink-400/10" 
                        transform="rotate(0 100 100)" />
                  <path d="M100 90 C 80 80, 80 60, 100 40 C 120 60, 120 80, 100 90 Z" 
                        className="fill-current text-pink-400/40 dark:text-pink-400/20" 
                        transform="rotate(72 100 100)" />
                  <path d="M100 90 C 80 80, 80 60, 100 40 C 120 60, 120 80, 100 90 Z" 
                        className="fill-current text-pink-400/60 dark:text-pink-400/30" 
                        transform="rotate(144 100 100)" />
                  <path d="M100 90 C 80 80, 80 60, 100 40 C 120 60, 120 80, 100 90 Z" 
                        className="fill-current text-pink-400/50 dark:text-pink-400/20" 
                        transform="rotate(216 100 100)" />
                  <path d="M100 90 C 80 80, 80 60, 100 40 C 120 60, 120 80, 100 90 Z" 
                        className="fill-current text-pink-400/30 dark:text-pink-400/10" 
                        transform="rotate(288 100 100)" />
              </g>
            </g>
          )
        })}
        
        {/* Center Bud */}
        <circle cx="100" cy="100" r="10" className="fill-current text-yellow-300/80 dark:text-yellow-200/80" />
      </g>
    </svg>
  );
}
