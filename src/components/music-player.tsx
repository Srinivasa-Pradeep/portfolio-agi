'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // You should place your music file in `public/music/background-music.mp3`
    const audio = new Audio('/music/background-music.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      // Cleanup audio element on component unmount
      audioRef.current?.pause();
      audioRef.current = null;
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

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
            {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPlaying ? 'Pause music' : 'Play music'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
