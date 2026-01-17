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
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    // You should place your music file in `public/music/background-music.mp3`
    const audio = new Audio('/music/background-music.mp3');
    
    const onSongEnd = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', onSongEnd);
    audioRef.current = audio;

    return () => {
      // Cleanup audio element on component unmount
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onSongEnd);
        audioRef.current.pause();
      }
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
      setRotation((prev) => prev + 360);
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
            <div
              className="relative h-5 w-5 transition-transform duration-700 ease-in-out"
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
