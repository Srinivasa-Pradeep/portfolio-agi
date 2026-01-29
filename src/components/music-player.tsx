'use client';

import React, { useState, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMusic } from '@/context/music-context';

export function MusicPlayer() {
  const { isPlaying, togglePlayPause, rotation } = useMusic();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            <div
              className="relative h-5 w-5 transition-transform duration-700 ease-in-out will-change-transform"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <Pause className={`absolute inset-0 h-5 w-5 transition-all ${ isPlaying ? 'rotate-0 scale-100' : '-rotate-90 scale-0' }`} />
              <Music className={`absolute inset-0 h-5 w-5 transition-all ${ isPlaying ? 'rotate-90 scale-0' : 'rotate-0 scale-100' }`} />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPlaying ? 'Pause music' : 'Play music'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
