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

  return (
    <div
      className={cn(
        'pointer-events-none fixed z-[9999] rounded-full transition-all duration-300 ease-in-out',
        {
          'h-10 w-10 bg-foreground/10 backdrop-blur-sm': isPointer,
          'h-4 w-4 bg-foreground/40': !isPointer,
        }
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
