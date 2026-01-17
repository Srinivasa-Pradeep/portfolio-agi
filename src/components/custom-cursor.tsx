'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

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
        // Animate dot
        if(dotRef.current) {
            dotRef.current.style.transform = `translate(-50%, -50%) translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
        }
        
        // Animate ring
        if(ringRef.current) {
            const currentRingPos = ringPos.current;
            const newRingPos = {
                x: currentRingPos.x + (mousePos.current.x - currentRingPos.x) * 0.2,
                y: currentRingPos.y + (mousePos.current.y - currentRingPos.y) * 0.2,
            };
            ringPos.current = newRingPos;
            ringRef.current.style.transform = `translate(-50%, -50%) translate(${newRingPos.x}px, ${newRingPos.y}px)`;
        }
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
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={cn(
          'pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border-2 border-foreground/40 transition-all duration-200 ease-out',
          { 'scale-150 border-transparent bg-foreground/10 backdrop-blur-sm': isPointer }
        )}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={cn(
          'pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-foreground/80 transition-transform duration-200 ease-out',
          { 'scale-0': isPointer }
        )}
      />
    </>
  );
}
