'use client';

import React from 'react';
import { useMusic } from '@/context/music-context';
import { Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const { isPlaying, song } = useMusic();

  return (
    <footer className="border-t h-24">
      <div className="container relative h-full flex items-center justify-center">
        <div className={cn(
          "absolute left-0 flex items-center gap-3 text-left transition-all duration-500",
          isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}>
          <Music2 className="h-5 w-5 flex-shrink-0 text-primary" />
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold text-foreground tracking-wide">Now Playing</p>
            <p>{song.title} &mdash; {song.artist}</p>
          </div>
        </div>

        <p className="absolute right-0 text-sm text-muted-foreground italic transition-colors duration-300 hover:text-primary">
         Dreams won't work until you work {"<3"}
        </p>
      </div>
    </footer>
  );
}
