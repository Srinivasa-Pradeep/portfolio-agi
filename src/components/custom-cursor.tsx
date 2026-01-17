'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// --- Configuration ---
const TRAIL_COUNT = 8; // Number of dots in the trail
const LERP_FACTOR = 0.4; // Smoothing factor. Higher is less "drag".

// --- Helper to create initial positions ---
const createInitialPositions = () => Array(TRAIL_COUNT).fill({ x: -100, y: -100 });

export function CustomCursor() {
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(createInitialPositions());

  useEffect(() => {
    setIsMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
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
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {[...Array(TRAIL_COUNT)].map((_, i) => {
        const isHead = i === 0;
        // The head is larger and handles the hover effect. The tail tapers off.
        const scale = isHead ? 1 : Math.max(0, (TRAIL_COUNT - i) / TRAIL_COUNT - 0.2).toFixed(2);
        const size = isHead ? 'h-3 w-3' : 'h-2 w-2';

        return (
          <div
            key={i}
            ref={(el) => { if (el) trailRefs.current[i] = el; }}
            className={cn(
              'pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-primary/80 dark:bg-foreground/80 transition-all duration-300 ease-out',
              size,
              {
                // Glassy hover effect for the head
                'scale-[3] bg-primary/10 dark:bg-foreground/10 backdrop-blur-sm': isHead && isPointer,
                // Fade out the tail on hover
                'scale-0': !isHead && isPointer,
              }
            )}
            style={!isHead ? { transform: `scale(${scale})` } : {}}
          />
        );
      })}
    </>
  );
}
