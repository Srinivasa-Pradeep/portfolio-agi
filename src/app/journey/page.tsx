'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Flag, MapPin, Radio, Music, ShieldCheck, Check, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import { useMusic } from '@/context/music-context';

/**
 * @fileOverview The Horizontal Odyssey - Focused Musical Edition.
 * Calibrated for a 9-second gap between stops.
 * Features global music suppression and independent cockpit controls.
 */

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  progress: number; // Percentage of total track (0-100)
}

const milestones: Milestone[] = [
  { 
    id: 1, 
    year: "2003", 
    title: "The Starting Grid", 
    description: "Born into a world of curiosity. The engine was just starting to warm up.",
    progress: 10.0 
  },
  { 
    id: 2, 
    year: "2021", 
    title: "Entry into Tech", 
    description: "Joined PSG iTech to study Computer Science. The first major turn in the circuit.",
    progress: 20.0 
  },
  { 
    id: 3, 
    year: "2023", 
    title: "The SAP Pitstop", 
    description: "First taste of enterprise scale at SAP Labs. Refining the aerodynamic efficiency of my code.",
    progress: 30.0 
  },
  { 
    id: 4, 
    year: "2024", 
    title: "Amazon SDE & ML", 
    description: "Pushing the limits at Amazon. High-speed distributed systems and the complexity of machine learning.",
    progress: 40.0 
  },
  { 
    id: 5, 
    year: "2025", 
    title: "Joining MBRDI", 
    description: "The dream alignment. Joining Mercedes-Benz Research as a Graduate Apprentice Trainee.",
    progress: 50.0 
  }
];

const TRACK_WIDTH = 40000;

export default function JourneyPage() {
  const { isPlaying: globalIsPlaying, togglePlayPause: toggleGlobalMusic } = useMusic();
  const [progress, setProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  
  // Pre-Race Consent State
  const [showChecklist, setShowConsent] = useState(true);
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  const [allowMusic, setAllowMusic] = useState<boolean | null>(null);
  const [localMusicMuted, setLocalMusicMuted] = useState(false);
  
  // Physics Refs
  const velocity = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());
  const rafId = useRef<number | null>(null);
  
  // Audio Refs
  const pitstopAudio = useRef<HTMLAudioElement | null>(null);
  const journeyMusic = useRef<HTMLAudioElement | null>(null);
  const hasMusicStarted = useRef(false);

  // 1. Suppress Global Music on Mount
  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    
    if (globalIsPlaying) {
      toggleGlobalMusic();
    }
    
    // Initialize sound effects
    pitstopAudio.current = new Audio('/music/pitstop.mp3');
    journeyMusic.current = new Audio('/music/journey-track.mp3');
    if (journeyMusic.current) {
        journeyMusic.current.loop = true;
    }
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        if (journeyMusic.current) {
            journeyMusic.current.pause();
            journeyMusic.current = null;
        }
    };
  }, []);

  // 2. Physics & Input Engine
  useEffect(() => {
    if (showChecklist) return;

    const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        keysPressed.current.add(key);

        // Start music on first drive input
        if (
            (key === 'w' || key === 'arrowup') && 
            allowMusic && 
            !hasMusicStarted.current && 
            journeyMusic.current
        ) {
            journeyMusic.current.play().catch(() => {});
            hasMusicStarted.current = true;
        }
    };
    const handleKeyUp = (e: KeyboardEvent) => keysPressed.current.delete(e.key.toLowerCase());

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const updateMovement = () => {
      const accel = 0.035;
      const friction = 0.97;
      const maxSpeed = 1.2;

      const isForward = 
        keysPressed.current.has('w') || 
        keysPressed.current.has('arrowup');
      
      const isBackward = 
        keysPressed.current.has('s') || 
        keysPressed.current.has('arrowdown');

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
          const next = p + velocity.current * 0.015; 
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
  }, [showChecklist, allowMusic]);

  // 3. Milestone Logic
  useEffect(() => {
    const threshold = 0.8;
    const current = milestones.find(m => Math.abs(m.progress - progress) < threshold);
    
    if (current && (!activeMilestone || activeMilestone.id !== current.id)) {
        if (pitstopAudio.current) {
            pitstopAudio.current.currentTime = 0;
            pitstopAudio.current.play().catch(() => {});
        }
    }
    
    setActiveMilestone(current || null);
  }, [progress, activeMilestone]);

  // Handle local music mute/pause
  const toggleLocalMusic = () => {
    if (!journeyMusic.current) return;
    if (localMusicMuted) {
      journeyMusic.current.play().catch(() => {});
      setLocalMusicMuted(false);
    } else {
      journeyMusic.current.pause();
      setLocalMusicMuted(true);
    }
  };

  const worldX = useMemo(() => {
    if (!mounted) return 0;
    const currentTrackPos = (progress / 100) * TRACK_WIDTH;
    return (windowWidth / 2) - currentTrackPos;
  }, [progress, windowWidth, mounted]);

  const blurAmount = Math.abs(currentVelocity) * 0.35;
  const vibrationX = currentVelocity !== 0 ? (Math.random() - 0.5) * Math.abs(currentVelocity) * 1.5 : 0;
  const vibrationY = currentVelocity !== 0 ? (Math.random() - 0.5) * Math.abs(currentVelocity) * 1.0 : 0;

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full flex-col bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Background Grids */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-[0.1]"
        />
      </div>

      {/* Checklist Overlay */}
      {showChecklist && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/60 backdrop-blur-2xl">
          <div className="w-full max-w-md p-10 rounded-[40px] bg-card/80 border border-border/50 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.7)] text-center animate-in fade-in zoom-in duration-700">
            <div className="flex justify-center mb-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                 <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter mb-2">PRE-RACE CHECKLIST</h2>
            <p className="text-muted-foreground text-sm mb-10 uppercase tracking-widest font-mono">Verify cockpit configuration</p>

            <div className="space-y-6 text-left mb-12">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/20">
                  <span className="text-sm font-bold tracking-tight">Driving License confirmed?</span>
                  <div className="flex gap-2">
                    <Button 
                      variant={hasLicense === true ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setHasLicense(true)}
                      className="rounded-full h-8 px-4"
                    >Yes</Button>
                    <Button 
                      variant={hasLicense === false ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setHasLicense(false)}
                      className="rounded-full h-8 px-4"
                    >No</Button>
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/20">
                  <span className="text-sm font-bold tracking-tight">Enable cockpit audio?</span>
                  <div className="flex gap-2">
                    <Button 
                      variant={allowMusic === true ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setAllowMusic(true)}
                      className="rounded-full h-8 px-4"
                    >Yes</Button>
                    <Button 
                      variant={allowMusic === false ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setAllowMusic(false)}
                      className="rounded-full h-8 px-4"
                    >No</Button>
                  </div>
               </div>
            </div>

            <Button 
              disabled={hasLicense === null || allowMusic === null} 
              onClick={() => setShowConsent(false)}
              className="w-full h-14 rounded-2xl text-lg font-bold group"
            >
              START THE ODYSSEY
              <Check className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </div>
      )}

      {/* COCKPIT LAYER */}
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
              {allowMusic && (
                <div className="px-3 py-1.5 flex items-center gap-2 border-l border-border/20 ml-1">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full hover:bg-primary/20"
                    onClick={toggleLocalMusic}
                   >
                     {localMusicMuted ? (
                        <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
                     ) : (
                        <Volume2 className={cn("h-3.5 w-3.5 text-primary", currentVelocity !== 0 && "animate-bounce")} />
                     )}
                   </Button>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {localMusicMuted ? "Audio_Paused" : "Live_Audio"}
                   </span>
                </div>
              )}
            </div>

            <div className="hidden md:block ml-4">
              <h1 className="font-headline text-2xl font-extrabold tracking-tighter text-foreground">
                THE ODYSSEY<span className="text-primary">.</span>
              </h1>
              {!showChecklist && (
                <p className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] uppercase animate-pulse">
                  [ HOLD W TO DRIVE ]
                </p>
              )}
            </div>
        </div>

        {/* THE WORLD */}
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
                 <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                 </linearGradient>
               </defs>
               
               <rect 
                  x="0" 
                  y="50%" 
                  width="100%" 
                  height="2" 
                  fill="url(#roadGradient)" 
                  className="animate-shimmer"
               />

               {milestones.map((m) => {
                 const nodeX = (m.progress / 100) * TRACK_WIDTH;
                 const isActive = progress >= m.progress;

                 return (
                   <g key={m.id}>
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
                         "transition-all duration-500 shadow-[0_0_30px_hsl(var(--primary))]",
                         isActive ? "fill-primary" : "fill-muted-foreground/20"
                       )}
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

               <g transform={`translate(${(65 / 100) * TRACK_WIDTH}, ${300})`}>
                  <text className="fill-muted-foreground/10 font-headline text-9xl font-black uppercase tracking-[0.3em] pointer-events-none select-none italic">
                     Future Horizon
                  </text>
               </g>
             </svg>
          </div>
        </div>

        {/* TELEMETRY CARD */}
        <div 
          className={cn(
            "fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl px-6 transition-all duration-700",
            activeMilestone ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"
          )}
        >
          <div className="relative p-10 rounded-[40px] bg-card/60 backdrop-blur-3xl border border-border/50 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">
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
                className="h-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" 
                style={{ width: `${progress}%` }} 
              />
              <div className="absolute top-0 left-[50%] h-full w-px bg-white/60 z-10" />
           </div>
           <div className="flex items-center gap-6 text-muted-foreground font-mono text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">
              <p>AGE_SYNC: {Math.floor(Math.min(22, (progress / 50) * 22))} YRS</p>
              <p className={cn(progress > 50 ? "text-primary opacity-100" : "opacity-40")}>
                {progress > 50 ? "FUTURE_MODE_ACTIVE" : "KNOWN_TIMELINE"}
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
