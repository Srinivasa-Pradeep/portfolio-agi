'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function BottomBlurOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll metrics
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      // "Rock bottom" detection:
      // We hide the blur when the user is within a tiny margin (20px) of the actual end.
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      
      // Update visibility state
      setIsVisible(!isAtBottom);
    };

    // Add scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial state in case the page is already at the bottom (e.g., on refresh)
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-x-0 bottom-0 h-48 z-40 pointer-events-none backdrop-blur-xl [mask-image:linear-gradient(to_top,black_20%,transparent)] transition-opacity duration-700 ease-in-out transform-gpu will-change-[backdrop-filter,opacity]",
        isVisible ? "opacity-95" : "opacity-0"
      )} 
    />
  );
}
