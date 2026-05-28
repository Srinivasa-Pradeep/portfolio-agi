'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function BottomBlurOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      // Hide blur when within 30px of the bottom to prevent stacking over footer
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 30;
      
      setIsVisible(!isAtBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-x-0 bottom-0 h-32 z-40 pointer-events-none transition-opacity duration-500 ease-in-out transform-gpu will-change-opacity",
        "backdrop-blur-sm [mask-image:linear-gradient(to_top,black,transparent)]", // Reduced blur from md to sm for performance
        isVisible ? "opacity-100" : "opacity-0"
      )} 
    />
  );
}
