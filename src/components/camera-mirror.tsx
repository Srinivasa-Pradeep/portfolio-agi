'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

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

  // Handle Camera Stream
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

  // Cycle Affirmations
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
      {/* Mirror Frame */}
      <div className={cn(
        "relative w-64 h-80 sm:w-72 sm:h-96 rounded-[120px] overflow-hidden transition-all duration-1000",
        "border-[8px] border-primary/20 bg-card/50 backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.1)]",
        isActive ? "scale-105 border-primary/40 shadow-[0_0_80px_rgba(255,255,255,0.2)]" : "scale-100"
      )}>
        {/* Silver Inner Ring */}
        <div className="absolute inset-0 border-2 border-white/10 rounded-[inherit] pointer-events-none z-20" />
        
        {/* Camera Feed */}
        <div className="absolute inset-0 bg-black/40 z-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "w-full h-full object-cover grayscale brightness-110 contrast-125 transition-opacity duration-1000",
              isActive ? "opacity-100" : "opacity-0",
              "scale-x-[-1]" // Mirror effect
            )}
          />
        </div>

        {/* Affirmation Overlay */}
        <div className={cn(
          "absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 px-6 text-center transition-all duration-1000",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-white/90 text-sm font-signature tracking-widest leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse">
            {currentAffirmation}
          </p>
        </div>

        {/* Glass Reflection Finish */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-30" />
        
        {/* Progress Glow Ring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-40" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="301.59"
            strokeDashoffset={301.59 * (1 - progress)}
            className="transition-all duration-1000 ease-linear opacity-40"
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>

      {/* Background Decor */}
      <div className={cn(
        "absolute -z-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] transition-all duration-1000",
        isActive ? "opacity-100 scale-125" : "opacity-0 scale-100"
      )} />
    </div>
  );
}
