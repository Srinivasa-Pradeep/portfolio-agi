'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function LiveClock() {
  const [dateTime, setDateTime] = useState({ time: '', date: '' });
  const [isMounted, setIsMounted] = useState(false);

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

    return () => clearInterval(timerId);
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
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end font-mono text-right">
      <p className="text-base font-medium text-foreground tracking-widest">{dateTime.time}</p>
      <p className="text-xs text-muted-foreground">{dateTime.date}</p>
    </div>
  );
}
