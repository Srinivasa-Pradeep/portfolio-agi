'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type CameraMirrorProps = {
  isActive: boolean;
  progress: number;
};

const affirmations = [
  "Believe in yourself.",
  "Study the greats and become greater.",
  "In a world filled with hate, we must still dare to hope.",
  "Magic.",
  "Perfection is my goal.",
  "I am the best at what I do.",
  "Dream of tomorrow where we can truly love from the soul.",
  "You can always dream, and your dreams will come true.",
  "Confidence is key.",
  "Be the change you want to see."
];

export function CameraMirror({ isActive, progress }: CameraMirrorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function startCamera() {
      if (isActive) {
        try {
          const s = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(s);
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        } catch (err) {
          console.error("Camera access denied:", err);
        }
      } else {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * affirmations.length);
      setCurrentAffirmation(affirmations[nextIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Premium Architectural Mirror Frame */}
      <div className={cn(
        "relative w-72 h-[400px] sm:w-80 sm:h-[450px] transition-all duration-1000 transform-gpu",
        "rounded-[40px] overflow-hidden",
        "border-[12px] border-primary/30 bg-card shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]",
        isActive ? "scale-105 border-primary/50 shadow-[0_50px_120px_-25px_rgba(0,0,0,0.6)]" : "scale-100"
      )}>
        {/* Beveled Edge Effect */}
        <div className="absolute inset-0 border-[2px] border-white/20 rounded-[inherit] pointer-events-none z-30" />
        
        {/* Inner Shadow for Depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />

        {/* Camera Feed with High-End Filter */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "w-full h-full object-cover grayscale brightness-[0.8] contrast-150 transition-opacity duration-1000 will-change-opacity",
              isActive ? "opacity-100" : "opacity-0",
              "scale-x-[-1]" // Mirror effect
            )}
          />
        </div>

        {/* Premium Affirmation Overlay */}
        <div className={cn(
          "absolute inset-x-0 bottom-0 h-1/2 z-20 flex flex-col items-center justify-end pb-16 px-8 text-center transition-all duration-1000",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="relative">
             {/* Text Glow */}
             <div className="absolute inset-0 blur-lg bg-white/10 scale-150 animate-pulse" />
             <p className="relative text-white/95 text-2xl sm:text-3xl font-signature leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                {currentAffirmation}
             </p>
          </div>
        </div>

        {/* Dynamic Glass Reflection Finish */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none z-40" />
        
        {/* Progress Halo */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-50 p-2" viewBox="0 0 100 100">
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="12"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.8"
            strokeDasharray="400"
            strokeDashoffset={400 * (1 - progress)}
            className="transition-all duration-1000 ease-linear opacity-60"
          />
        </svg>
      </div>

      {/* Atmospheric Backlight */}
      <div className={cn(
        "absolute -z-10 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[120px] transition-all duration-1000 transform-gpu",
        isActive ? "opacity-100 scale-110" : "opacity-0 scale-90"
      )} />
    </div>
  );
}
