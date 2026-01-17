'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [rotation, setRotation] = React.useState(0);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Rotate multiple times for visibility
    setRotation((prev) => prev + 1080);
    
    const x = event.clientX;
    const y = event.clientY;

    // Use the View Transitions API for a smooth theme change animation
    if (!document.startViewTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);

    document.startViewTransition(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      <div
        className="relative h-[1.2rem] w-[1.2rem] transition-transform duration-1000 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Sun icon: visible in light mode, fades and scales out in dark mode. NO ROTATION HERE. */}
        <Sun className="absolute inset-0 h-[1.2rem] w-[1.2rem] scale-100 opacity-100 transition-all duration-500 dark:scale-0 dark:opacity-0" />
        {/* Moon icon: hidden in light mode, fades and scales in in dark mode. NO ROTATION HERE. */}
        <Moon className="absolute inset-0 h-[1.2rem] w-[1.2rem] scale-0 opacity-0 transition-all duration-500 dark:scale-100 dark:opacity-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
