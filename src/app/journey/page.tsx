'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Trophy, Flag, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

/**
 * @fileOverview The Odyssey - A rebuilt interactive journey.
 * Features a keyboard-controlled F1 car on a glassy zigzag road with the default site background.
 */

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  progress: number; // 0 to 100
}

const milestones: Milestone[] = [
  { 
    id: 1, 
    year: "2003", 
    title: "The Starting Grid", 
    description: "Born into a world of curiosity. The engine was just starting to warm up.",
    progress: 5 
  },
  { 
    id: 2, 
    year: "2021", 
    title: "Entry into Tech", 
    description: "Joined PSG iTech to study Computer Science. The first major turn in the circuit.",
    progress: 25 
  },
  { 
    id: 3, 
    year: "2023", 
    title: "The SAP Pitstop", 
    description: "First taste of enterprise scale at SAP Labs. Refining the aerodynamic efficiency of my code.",
    progress: 45 
  },
  { 
    id: 4, 
    year: "2024", 
    title: "Amazon SDE & ML", 
    description: "Pushing the limits at Amazon. High-speed distributed systems and the complexity of machine learning.",
    progress: 70 
  },
  { 
    id: 5, 
    year: "2025", 
    title: "Joining MBRDI", 
    description: "The dream alignment. Joining Mercedes-Benz Research as a Graduate Apprentice Trainee.",
    progress: 92 
  }
];

const pathPoints = [
  { x: 50, y: 0 },
  { x: 15, y: 15 },
  { x: 85, y: 30 },
  { x: 15, y: 45 },
  { x: 85, y: 60 },
  { x: 15, y: 75 },
  { x: 85, y: 90 },
  { x: 50, y: 100 },
];

export default function JourneyPage() {
  const [progress, setProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 0.6;
      if (e.key === 'w' || e.key === 'ArrowUp') {
        setProgress(p => Math.min(p + speed, 100));
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        setProgress(p => Math.max(p - speed, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const threshold = 3;
    const current = milestones.find(m => Math.abs(m.progress - progress) < threshold);
    setActiveMilestone(current || null);
  }, [progress]);

  const { carX, carY, rotation } = useMemo(() => {
    if (!mounted) return { carX: 50, carY: 0, rotation: 0 };
    
    const segmentCount = pathPoints.length - 1;
    const t = progress / 100;
    const segmentIndex = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
    
    const p1 = pathPoints[segmentIndex];
    const p2 = pathPoints[segmentIndex + 1];
    
    const segmentProgress = (t * segmentCount) - segmentIndex;
    
    const x = p1.x + (p2.x - p1.x) * segmentProgress;
    const y = p1.y + (p2.y - p1.y) * segmentProgress;
    
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    
    return { carX: x, carY: y, rotation: angle + 90 };
  }, [progress, mounted]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Default Persistent Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-[0.1]"
        />
      </div>

      <main className="flex-1 relative z-10 pt-32 pb-64 flex flex-col items-center">
        <div className="container relative z-10 flex flex-col items-center">
          <div className="mb-12 flex justify-start w-full">
            <Button asChild variant="ghost" className="hover:bg-primary/10 group">
              <Link href="/#about">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return to Pit
              </Link>
            </Button>
          </div>

          <div className="text-center mb-32">
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground">
              THE ODYSSEY<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 text-muted-foreground font-mono text-sm tracking-widest uppercase animate-pulse">
              [ Use W / S to navigate the path ]
            </p>
          </div>

          <div className="relative w-full max-w-2xl h-[2500px]">
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                   <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                   <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                 </linearGradient>
                 <filter id="neonGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
               </defs>
               
               {/* Track Shadow */}
               <polyline
                 points={pathPoints.map(p => `${p.x}%,${p.y}%`).join(' ')}
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="20"
                 className="text-muted/10"
               />

               {/* Glassy Track */}
               <polyline
                 points={pathPoints.map(p => `${p.x}%,${p.y}%`).join(' ')}
                 fill="none"
                 stroke="url(#roadGradient)"
                 strokeWidth="8"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 className="backdrop-blur-sm transition-all duration-300"
                 filter="url(#neonGlow)"
               />

               {/* Milestone Nodes */}
               {milestones.map((m) => {
                 // Calculate fixed node position on the SVG
                 const segmentCount = pathPoints.length - 1;
                 const t = m.progress / 100;
                 const segmentIndex = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
                 const p1 = pathPoints[segmentIndex];
                 const p2 = pathPoints[segmentIndex + 1];
                 const segT = (t * segmentCount) - segmentIndex;
                 const nodeX = p1.x + (p2.x - p1.x) * segT;
                 const nodeY = p1.y + (p2.y - p1.y) * segT;

                 return (
                   <circle
                     key={m.id}
                     cx={`${nodeX}%`}
                     cy={`${nodeY}%`}
                     r="6"
                     className={cn(
                       "transition-all duration-500",
                       progress >= m.progress ? "fill-primary shadow-[0_0_15px_hsl(var(--primary))]" : "fill-muted-foreground/20"
                     )}
                   />
                 );
               })}
             </svg>

             {/* The Mercedes F1 Car */}
             <div 
               className="absolute z-50 transition-all duration-100 ease-out"
               style={{ 
                 left: `${carX}%`, 
                 top: `${carY}%`,
                 transform: `translate(-50%, -50%) rotate(${rotation}deg)`
               }}
             >
               <div className="relative group">
                 <svg width="34" height="68" viewBox="0 0 40 80" className="drop-shadow-2xl">
                    <path d="M10 10 L30 10 L35 40 L30 75 L10 75 L5 40 Z" fill="#000" stroke="#00D2BE" strokeWidth="2" />
                    <rect x="5" y="70" width="30" height="8" rx="1" fill="#222" />
                    <path d="M2 10 L38 10 L35 15 L5 15 Z" fill="#222" />
                    <circle cx="20" cy="40" r="4" fill="#00D2BE" />
                    <rect x="0" y="15" width="6" height="12" rx="1" fill="#111" />
                    <rect x="34" y="15" width="6" height="12" rx="1" fill="#111" />
                    <rect x="0" y="60" width="7" height="14" rx="1" fill="#111" />
                    <rect x="33" y="60" width="7" height="14" rx="1" fill="#111" />
                 </svg>
                 
                 {/* Thrust Effect */}
                 {progress > 0 && progress < 100 && (
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-6 bg-gradient-to-t from-primary/0 to-primary/40 blur-md animate-pulse" />
                 )}
               </div>
             </div>

             {/* Story Popup - Responsive Modal */}
             <div 
               className={cn(
                 "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-full max-w-md px-6 transition-all duration-700",
                 activeMilestone ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"
               )}
             >
                <div className="relative p-8 rounded-[32px] bg-card/60 backdrop-blur-3xl border border-border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Trophy className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{activeMilestone?.year}</span>
                      <h3 className="text-2xl font-bold text-foreground tracking-tight">{activeMilestone?.title}</h3>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed text-lg lora italic">
                    "{activeMilestone?.description}"
                  </p>

                  <div className="mt-8 flex items-center justify-between pt-6 border-t border-border">
                     <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                        <MapPin className="h-3 w-3" />
                        <span>LOC: TRACK_EVOLUTION</span>
                     </div>
                     <Flag className="h-4 w-4 text-primary opacity-50" />
                  </div>
                </div>
             </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-32 flex flex-col items-center gap-6">
             <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
             </div>
             <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.3em]">
                Race Completion: {Math.floor(progress)}%
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
