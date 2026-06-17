'use client';

import * as React from 'react';
import { Moon, Sun, Flower } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * ThemeToggle - A high-fidelity "Celestial Controller".
 * Features automatic synchronization with keyboard shortcuts and a 
 * counter-rotation system to keep icons upright during transitions.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [rotation, setRotation] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const lastTheme = React.useRef(theme);

  // Initialize the audio instance on mount
  React.useEffect(() => {
    audioRef.current = new Audio('/music/switch.mp3');
    audioRef.current.load();
  }, []);

  // Synchronize rotation with theme changes (handles keyboard shortcuts & mouse clicks)
  React.useEffect(() => {
    if (theme && theme !== lastTheme.current) {
        setRotation(r => r + 120);
        lastTheme.current = theme;
    }
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    // 1. Haptic feedback (subtle pulse)
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(24);
    }

    // 2. Play the toggle SFX
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play().catch(() => {});
    }

    // 3. Cycle logic: light -> dark -> spring
    const themes = ['light', 'dark', 'spring'];
    const nextTheme = themes[(themes.indexOf(theme || 'light') + 1) % themes.length];

    // 4. View Transition API for smooth reveal
    if (!(document as any).startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    (document as any).startViewTransition(() => {
        setTheme(nextTheme);
    });
  }, [setTheme, theme]);

  // Keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 't' && 
        !(e.target instanceof HTMLInputElement) && 
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  const getTooltipContent = () => {
    switch (theme) {
        case 'light': return 'Switch to Dark Mode';
        case 'dark': return 'Switch to Spring Mode';
        case 'spring': return 'Switch to Light Mode';
        default: return 'Cycle Atmosphere';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="relative rounded-full transition-all duration-500 ease-[cubic-bezier(0.3,1.5,0.5,1)] hover:scale-125 hover:bg-accent/50 active:scale-95 overflow-hidden"
          >
            {/* The Celestial Container - Spins 120deg each transition */}
            <div
              className="relative h-[1.2rem] w-[1.2rem] transition-transform duration-1000 ease-[cubic-bezier(0.3,1.5,0.5,1)] will-change-transform"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Counter-Rotating Icons - Ensures they always end up upright (0deg world space) */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.3,1.5,0.5,1)]"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ${theme === 'light' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'}`} />
                <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'}`} />
                <Flower className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ${theme === 'spring' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'}`} />
              </div>
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-2 px-3 py-1.5">
          <span className="text-xs font-medium">{getTooltipContent()}</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            T
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
