'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Trophy, Flag, MapPin, Radio, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { MusicPlayer } from '@/components/music-player';
import Image from 'next/image';

/**
 * @fileOverview The Horizontal Odyssey - Extended Horizon Edition.
 * Features a centered Mercedes F1 machine with velocity-based minimal blur and chassis vibration.
 * Progress is mapped to life years: 2003-2025 = 0% to 22%.
 * Track is massively extended to provide space and a vast "Future" beyond current age.
 */

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  progress: number; // 0 to 100 (percentage of the total track horizon)
}

const milestones: Milestone[] = [
  { 
    id: 1, 
    year: "2003", 
    title: "The Starting Grid", 
    description: "Born into a world of curiosity. The engine was just starting to warm up.",
    progress: 3.0 // Moved forward to give a "lead-in" empty road
  },
  { 
    id: 2, 
    year: "2021", 
    title: "Entry into Tech", 
    description: "Joined PSG iTech to study Computer Science. The first major turn in the circuit.",
    progress: 18.0 
  },
  { 
    id: 3, 
    year: "2023", 
    title: "The SAP Pitstop", 
    description: "First taste of enterprise scale at SAP Labs. Refining the aerodynamic efficiency of my code.",
    progress: 20.0 
  },
  { 
    id: 4, 
    year: "2024", 
    title: "Amazon SDE & ML", 
    description: "Pushing the limits at Amazon. High-speed distributed systems and the complexity of machine learning.",
    progress: 21.0 
  },
  { 
    id: 5, 
    year: "2025", 
    title: "Joining MBRDI", 
    description: "The dream alignment. Joining Mercedes-Benz Research as a Graduate Apprentice Trainee.",
    progress: 22.0 
  }
];

// Massively increased track width to provide spacing and a long future horizon
const TRACK_WIDTH = 24000; 

export default function JourneyPage() {
  const [progress, setProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  
  // Physics Refs
  const velocity = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keysPressed.current.add(e.key.toLowerCase());
    const handleKeyUp = (e: KeyboardEvent) => keysPressed.current.delete(e.key.toLowerCase());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const updateMovement = () => {
      const accel = 0.035;
      const friction = 0.97;
      const maxSpeed = 1.2;

      const isForward = 
        keysPressed.current.has('w') || 
        keysPressed.current.has('arrowup') || 
        keysPressed.current.has('d') || 
        keysPressed.current.has('arrowright');
      
      const isBackward = 
        keysPressed.current.has('s') || 
        keysPressed.current.has('arrowdown') || 
        keysPressed.current.has('a') || 
        keysPressed.current.has('arrowleft');

      if (isForward) {
        velocity.current = Math.min(velocity.current + accel, maxSpeed);
      } else if (isBackward) {
        velocity.current = Math.max(velocity.current - accel, -maxSpeed);
      } else {
        velocity.current *= friction;
      }

      if (Math.abs(velocity.current) < 0.001) {
        velocity.current = 0;
      }

      if (velocity.current !== 0) {
        setProgress(p => {
          // Adjusted progression speed to match the new track width
          const next = p + velocity.current * 0.08; 
          return Math.max(0, Math.min(100, next));
        });
        setCurrentVelocity(velocity.current);
      } else {
        setCurrentVelocity(0);
      }

      rafId.current = requestAnimationFrame(updateMovement);
    };

    rafId.current = requestAnimationFrame(updateMovement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    // Tighter threshold for milestone activation to ensure they feel like specific pitstops
    const threshold = 0.4; 
    const current = milestones.find(m => Math.abs(m.progress - progress) < threshold);
    setActiveMilestone(current || null);
  }, [progress]);

  const worldX = useMemo(() => {
    if (!mounted) return 0;
    const currentTrackPos = (progress / 100) * TRACK_WIDTH;
    return (windowWidth / 2) - currentTrackPos;
  }, [progress, windowWidth, mounted]);

  // Lively Car Effects - Refined
  const blurAmount = Math.abs(currentVelocity) * 0.35;
  const vibrationX = currentVelocity !== 0 ? (Math.random() - 0.5) * Math.abs(currentVelocity) * 1.5 : 0;
  const vibrationY = currentVelocity !== 0 ? (Math.random() - 0.5) * Math.abs(currentVelocity) * 1.0 : 0;

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full flex-col bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Persistent Site Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-[0.1]"
        />
      </div>

      {/* FIXED COCKPIT LAYER - Mercedes F1 Machine */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] pointer-events-none transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(calc(-50% + ${vibrationX}px), calc(-50% + ${vibrationY}px))`
        }}
      >
         <div 
           className="relative transition-all duration-300"
           style={{ 
             filter: `blur(${blurAmount}px)`,
             transform: `scale(${1 + Math.abs(currentVelocity) * 0.015})`
           }}
         >
            <div className="relative w-[220px] h-[70px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]">
               <Image
                 src="https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/common/f1/2026/mercedes/2026mercedescarright.webp"
                 alt="2026 Mercedes F1 Machine"
                 fill
                 className="object-contain"
                 priority
               />
            </div>
            
            {/* Velocity-Synced Exhaust Heat */}
            {progress > 0 && progress < 100 && (
              <div 
                className="absolute top-[65%] -left-12 -translate-y-1/2 w-20 h-6 bg-gradient-to-r from-primary/0 to-primary/40 blur-2xl animate-pulse"
                style={{ opacity: Math.abs(currentVelocity) * 1.0 }}
              />
            )}
         </div>
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center">
        {/* Controls Overlay */}
        <div className="fixed top-8 left-12 z-50 flex items-center gap-6">
            <Button asChild variant="ghost" className="hover:bg-primary/10 group rounded-full px-6 transition-all duration-300">
              <Link href="/#about">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return to Pit
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 p-1 rounded-full bg-secondary/20 backdrop-blur-md border border-border/20 shadow-xl">
              <ThemeToggle />
              <MusicPlayer />
            </div>

            <div className="hidden md:block ml-4">
              <h1 className="font-headline text-2xl font-extrabold tracking-tighter text-foreground">
                THE ODYSSEY<span className="text-primary">.</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] uppercase animate-pulse">
                [ HOLD W TO ACCELERATE ]
              </p>
            </div>
        </div>

        {/* THE WORLD - Linear Track */}
        <div 
          className="relative w-full h-[60vh] will-change-transform"
          style={{ transform: `translateX(${worldX}px)` }}
        >
          <div 
            className="absolute inset-y-0 left-0"
            style={{ width: `${TRACK_WIDTH}px` }}
          >
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                   <stop offset="10%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                   <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                   <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                 </linearGradient>
                 <filter id="neonGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                 </linearGradient>
               </defs>
               
               {/* Main Glassy Track Line */}
               <rect 
                  x="0" 
                  y="50%" 
                  width="100%" 
                  height="2" 
                  fill="url(#roadGradient)" 
                  className="animate-shimmer"
               />

               <line 
                  x1="0" 
                  y1="51%" 
                  x2="100%" 
                  y2="51%" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.5" 
                  strokeOpacity="0.2" 
               />

               {/* Life Milestones - Pitstop Pillars */}
               {milestones.map((m) => {
                 const nodeX = (m.progress / 100) * TRACK_WIDTH;
                 const isActive = progress >= m.progress;

                 return (
                   <g key={m.id}>
                     {/* Architectural Pillar */}
                     <rect 
                        x={nodeX - 1} 
                        y="35%" 
                        width="2" 
                        height="30%" 
                        fill="url(#pillarGradient)"
                        className={cn(
                          "transition-all duration-700",
                          isActive ? "opacity-60" : "opacity-10"
                        )}
                     />

                     <circle
                       cx={nodeX}
                       cy="50%"
                       r="8"
                       className={cn(
                         "transition-all duration-500",
                         isActive ? "fill-primary shadow-[0_0_30px_hsl(var(--primary))]" : "fill-muted-foreground/20"
                       )}
                       filter={isActive ? "url(#neonGlow)" : ""}
                     />

                     <text 
                        x={nodeX + 16} 
                        y="48%" 
                        className={cn(
                          "fill-muted-foreground font-mono text-[11px] font-black tracking-[0.3em] transition-all duration-500 uppercase",
                          isActive && "fill-primary"
                        )}
                     >
                        PIT_{m.year}
                     </text>
                   </g>
                 );
               })}

               {/* Future Horizon Markers (Post 22%) */}
               <g transform={`translate(${(45 / 100) * TRACK_WIDTH}, ${300})`}>
                  <text className="fill-muted-foreground/10 font-headline text-9xl font-black uppercase tracking-[0.3em] pointer-events-none select-none italic">
                     Future Horizon
                  </text>
               </g>

               <g transform={`translate(${(75 / 100) * TRACK_WIDTH}, ${400})`}>
                  <text className="fill-muted-foreground/5 font-headline text-8xl font-black uppercase tracking-[0.3em] pointer-events-none select-none">
                     Unknown Territory
                  </text>
               </g>
             </svg>
          </div>
        </div>

        {/* TELEMETRY CARD - Story Popup */}
        <div 
          className={cn(
            "fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl px-6 transition-all duration-700",
            activeMilestone ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"
          )}
        >
          <div className="relative p-10 rounded-[40px] bg-card/60 backdrop-blur-3xl border border-border/50 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Top Identity Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            
            <div className="flex items-center gap-8 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                <Radio className="h-7 w-7 text-primary animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] opacity-80">COMMS_STATION_{activeMilestone?.year}</span>
                <h3 className="text-3xl font-extrabold text-foreground tracking-tighter mt-1">{activeMilestone?.title}</h3>
              </div>
            </div>

            <p className="text-foreground/90 leading-relaxed text-xl lora italic">
              "{activeMilestone?.description}"
            </p>

            <div className="mt-10 flex items-center justify-between pt-8 border-t border-border/40">
               <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-mono uppercase tracking-[0.3em]">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  <span>Segment: {activeMilestone?.id} / 5</span>
               </div>
               <Flag className="h-5 w-5 text-primary opacity-40" />
            </div>
          </div>
        </div>

        {/* HUD PROGRESS TRACKER */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
           <div className="w-80 h-1.5 bg-muted/20 rounded-full overflow-hidden backdrop-blur-sm relative border border-white/5">
              <div 
                className="h-full bg-primary transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary))]" 
                style={{ width: `${progress}%` }} 
              />
              {/* Current Age Cutoff Marker (22%) */}
              <div className="absolute top-0 left-[22%] h-full w-px bg-white/60 z-10" />
           </div>
           <div className="flex items-center gap-6 text-muted-foreground font-mono text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">
              <p>AGE_SYNC: {Math.min(22, Math.floor(progress))}%</p>
              <p className={cn(progress > 22 ? "text-primary opacity-100" : "opacity-40")}>
                {progress > 22 ? "FUTURE_MODE_ACTIVE" : "KNOWN_TIMELINE"}
              </p>
           </div>
        </div>

        {/* Cinematic Future Hints */}
        {progress > 25 && progress < 35 && (
          <div className="fixed top-1/2 right-24 -translate-y-1/2 text-primary/10 font-black text-9xl uppercase tracking-tighter pointer-events-none select-none italic animate-fade-in transition-all duration-1000">
            The road<br/>ahead.
          </div>
        )}
      </main>
    </div>
  );
}

