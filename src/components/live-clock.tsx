'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function LiveClock() {
  const [dateTime, setDateTime] = useState({ time: '', date: '' });
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const timerId = setInterval(() => {
      const now = new Date();
      setDateTime({
        time: format(now, 'HH:mm:ss'),
        date: format(now, 'EEE, MMM d'),
      });
    }, 1000);

    const now = new Date();
    setDateTime({
      time: format(now, 'HH:mm:ss'),
      date: format(now, 'EEE, MMM d'),
    });

    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // Fade out when the top of 'about' section is at or above the top of the viewport
        setIsVisible(rect.top > 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      clearInterval(timerId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMounted) {
    // Skeleton loader to prevent layout shift and show loading state
    return (
      <div className="fixed top-6 right-6 z-50 flex animate-pulse flex-col items-end gap-1.5">
        <div className="h-4 w-24 rounded-md bg-muted" />
        <div className="h-3 w-20 rounded-md bg-muted" />
      </div>
    );
  }
  
  return (
    <div className={cn(
      "fixed top-6 right-6 z-50 flex flex-col items-end font-mono text-right transition-all duration-500 ease-in-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
    )}>
      <p className="text-base font-medium text-foreground tracking-widest">{dateTime.time}</p>
      <p className="text-xs text-muted-foreground">{dateTime.date}</p>
    </div>
  );
}
