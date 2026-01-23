'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

type Song = {
  title: string;
  artist: string;
  url: string;
};

type MusicContextType = {
  isPlaying: boolean;
  togglePlayPause: () => void;
  rotation: number;
  song: Omit<Song, 'url'>;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const song: Song = {
  title: 'Lost in the City Lights',
  artist: 'After-dusk',
  url: '/music/background-music.mp3',
};


export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(song.url);
    audio.loop = false;
    audioRef.current = audio;

    const onSongEnd = () => {
      setIsPlaying(false);
      setRotation(r => r + 360);
    };

    audio.addEventListener('ended', onSongEnd);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onSongEnd);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    setRotation(r => r + 360);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
        // Revert rotation if play fails
        setRotation(r => r - 360);
        return;
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const value = {
    isPlaying,
    togglePlayPause,
    rotation,
    song: { title: song.title, artist: song.artist },
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
