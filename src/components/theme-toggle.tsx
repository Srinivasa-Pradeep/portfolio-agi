'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [rotation, setRotation] = React.useState(0);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRotation((prev) => prev + 1080);
    
    // The View Transitions API was conflicting with the button's own animation.
    // We revert to a simpler theme change and handle the button animation here.
    const x = event.clientX;
    const y = event.clientY;

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
        <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
