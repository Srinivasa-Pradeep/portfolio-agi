'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    document.addEventListener('mousemove', onMouseMove);
    document.documentElement.classList.add('no-cursor');

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.documentElement.classList.remove('no-cursor');
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  const scale = isPointer ? 2.5 : 1;

  return (
    <div
      className={cn(
        'pointer-events-none fixed z-[9999] h-4 w-4 rounded-full transition-transform duration-300 ease-in-out',
        {
          'bg-foreground/10 backdrop-blur-sm': isPointer,
          'bg-foreground/40': !isPointer,
        }
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    />
  );
}
