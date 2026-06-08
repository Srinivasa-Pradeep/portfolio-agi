'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ZenTreeProps = {
  sessions: number;
  progress: number;
  state: 'idle' | 'running' | 'paused' | 'complete';
};

const PETAL_LAYERS = 5;

// This function calculates the rotation and opacity for a petal layer.
const getLayerStyle = (layerIndex: number, sessions: number, progress: number, state: ZenTreeProps['state']) => {
  const baseRotation = -15; 

  let rotation = 0;
  let opacity = 0; 

  if (sessions > layerIndex) {
    rotation = baseRotation;
    opacity = 0.8;
  }
  else if (sessions === layerIndex) {
    rotation = baseRotation;
    if (state === 'running' || state === 'paused') {
      opacity = 0.2 + (progress * 0.6); 
    } else if (state === 'complete') {
      opacity = 0.8;
    }
  }

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
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible filter saturate-[0.8] contrast-[1.1]">
      <defs>
        <radialGradient id="lotus-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
        </radialGradient>
        <filter id="petal-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <g className={cn(state === 'running' && 'animate-slow-rotate')} style={{ transformOrigin: 'center' }}>

        {/* Pulsating Heart */}
        <circle 
          cx="100" 
          cy="100" 
          r="15" 
          fill="url(#lotus-glow)" 
          className={cn("transition-all duration-1000", state === 'running' && 'animate-pulse')} 
        />

        {/* Petal Layers */}
        {[...Array(PETAL_LAYERS)].map((_, i) => {
          const { rotation, opacity } = getLayerStyle(i, sessions, progress, state);
          const scale = 0.8 + i * 0.25;
          const isGrowing = i === sessions && state === 'running';

          return (
            <g 
              key={i}
              transform={`translate(100 100) scale(${scale}) translate(-100 -100)`}
              className={cn(
                  "transition-opacity duration-1000",
                  state === 'paused' && 'opacity-40'
              )}
              style={{ opacity: opacity }}
            >
              <g style={{ 
                  transform: `rotate(${rotation}deg)`, 
                  transformOrigin: '100px 100px',
                  transition: 'transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: isGrowing ? 'url(#petal-glow)' : 'none',
              }}>
                  {/* Symmetrical Petal Design */}
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <path 
                        key={angle}
                        d="M100 100 C 85 85, 85 50, 100 30 C 115 50, 115 85, 100 100 Z" 
                        className={cn(
                            "fill-primary/20 stroke-primary/30 stroke-[0.5]",
                            i % 2 === 0 ? "fill-primary/10" : "fill-primary/25"
                        )} 
                        transform={`rotate(${angle} 100 100)`} 
                    />
                  ))}
              </g>
            </g>
          )
        })}
        
        {/* Center Bud - Technical Core */}
        <circle cx="100" cy="100" r="8" className="fill-primary shadow-[0_0_15px_hsl(var(--primary))]" />
        <circle cx="100" cy="100" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" strokeDasharray="2,2" className="animate-spin" style={{ animationDuration: '10s' }} />
      </g>
    </svg>
  );
}

