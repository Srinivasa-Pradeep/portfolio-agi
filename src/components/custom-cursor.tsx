'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// --- Configuration ---
const TRAIL_COUNT = 8; // Number of dots in the trail
const LERP_FACTOR = 0.4; // Smoothing factor. Higher is less "drag".

// --- Helper to create initial positions ---
const createInitialPositions = () => Array(TRAIL_COUNT).fill({ x: -100, y: -100 });

export function CustomCursor() {
  const isMobile = useIsMobile();
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(createInitialPositions());

  useEffect(() => {
    // If mobile status is not determined yet, or if it is mobile, do nothing.
    if (isMobile === undefined || isMobile) {
      document.documentElement.classList.remove('no-cursor');
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.documentElement.classList.add('no-cursor');

    let animationFrameId: number;
    const animate = () => {
      let leaderPos = mousePos.current;

      trailPositions.current.forEach((pos, i) => {
        const newPos = {
          x: pos.x + (leaderPos.x - pos.x) * LERP_FACTOR,
          y: pos.y + (leaderPos.y - pos.y) * LERP_FACTOR,
        };

        trailPositions.current[i] = newPos;
        leaderPos = newPos;

        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate(-50%, -50%) translate(${newPos.x}px, ${newPos.y}px)`;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.documentElement.classList.remove('no-cursor');
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  // Don't render anything if we're on mobile or if the mobile status isn't known yet.
  if (isMobile === undefined || isMobile) {
    return null;
  }

  return (
    <>
      {[...Array(TRAIL_COUNT)].map((_, i) => {
        const isHead = i === 0;
        // The head is consistent, the tail tapers off. No scaling on hover for a consistent look.
        const scale = isHead ? 1 : Math.max(0, (TRAIL_COUNT - i) / TRAIL_COUNT - 0.2).toFixed(2);
        const size = isHead ? 'h-3 w-3' : 'h-2 w-2';

        return (
          <div
            key={i}
            ref={(el) => { if (el) trailRefs.current[i] = el; }}
            className={cn(
              'pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-primary/80 dark:bg-foreground/80 transition-opacity duration-300 ease-out',
              size
            )}
            style={!isHead ? { transform: `scale(${scale})` } : {}}
          />
        );
      })}
    </>
  );
}