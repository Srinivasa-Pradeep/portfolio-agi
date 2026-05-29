'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Trophy, Flag, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @fileOverview The Horizontal Odyssey - An interactive side-scrolling journey.
 * Features a camera-follow system and a side-profile F1 car.
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

// Horizontal Zigzag path
const pathPoints = [
  { x: 0, y: 50 },
  { x: 15, y: 20 },
  { x: 30, y: 80 },
  { x: 45, y: 20 },
  { x: 60, y: 80 },
  { x: 75, y: 20 },
  { x: 90, y: 80 },
  { x: 100, y: 50 },
];

const TRACK_WIDTH = 5000; // Total horizontal distance in pixels

export default function JourneyPage() {
  const [progress, setProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 0.6;
      if (e.key === 'd' || e.key === 'ArrowRight' || e.key === 'w' || e.key === 'ArrowUp') {
        setProgress(p => Math.min(p + speed, 100));
      } else if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 's' || e.key === 'ArrowDown') {
        setProgress(p => Math.max(p - speed, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const threshold = 2.5;
    const current = milestones.find(m => Math.abs(m.progress - progress) < threshold);
    setActiveMilestone(current || null);
  }, [progress]);

  const { carX, carY, rotation } = useMemo(() => {
    if (!mounted) return { carX: 0, carY: 50, rotation: 0 };
    
    const segmentCount = pathPoints.length - 1;
    const t = progress / 100;
    const segmentIndex = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
    
    const p1 = pathPoints[segmentIndex];
    const p2 = pathPoints[segmentIndex + 1];
    
    const segmentProgress = (t * segmentCount) - segmentIndex;
    
    const x = p1.x + (p2.x - p1.x) * segmentProgress;
    const y = p1.y + (p2.y - p1.y) * segmentProgress;
    
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    
    return { 
      carX: (x / 100) * TRACK_WIDTH, 
      carY: `${y}%`,
      rotation: angle 
    };
  }, [progress, mounted]);

  // Camera focus logic: The camera offset to keep the car centered
  const cameraOffset = useMemo(() => {
    if (!mounted) return 0;
    return Math.max(0, carX - windowWidth / 2);
  }, [carX, windowWidth, mounted]);

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full flex-col bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Persistent Background - Static */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-[0.1]"
        />
      </div>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center">
        {/* Controls Overlay */}
        <div className="fixed top-8 left-12 z-50 flex items-center gap-8">
            <Button asChild variant="ghost" className="hover:bg-primary/10 group">
              <Link href="/#about">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return to Pit
              </Link>
            </Button>
            <div className="hidden sm:block">
              <h1 className="font-headline text-2xl font-extrabold tracking-tighter text-foreground">
                THE ODYSSEY<span className="text-primary">.</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] uppercase animate-pulse">
                [ Use W/S or Arrows to DRIVE ]
              </p>
            </div>
        </div>

        {/* The World - Side Scrolling Wrapper */}
        <div 
          className="relative w-full h-[60vh] transition-transform duration-100 ease-out will-change-transform"
          style={{ transform: `translateX(-${cameraOffset}px)` }}
        >
          <div 
            className="absolute inset-y-0 left-0"
            style={{ width: `${TRACK_WIDTH}px` }}
          >
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                 points={pathPoints.map(p => `${(p.x/100) * TRACK_WIDTH},${p.y}%`).join(' ')}
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="24"
                 className="text-muted/5"
               />

               {/* Glassy Track */}
               <polyline
                 points={pathPoints.map(p => `${(p.x/100) * TRACK_WIDTH},${p.y}%`).join(' ')}
                 fill="none"
                 stroke="url(#roadGradient)"
                 strokeWidth="10"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 className="backdrop-blur-sm transition-all duration-300"
                 filter="url(#neonGlow)"
               />

               {/* Milestone Nodes */}
               {milestones.map((m) => {
                 const segmentCount = pathPoints.length - 1;
                 const t = m.progress / 100;
                 const segmentIndex = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
                 const p1 = pathPoints[segmentIndex];
                 const p2 = pathPoints[segmentIndex + 1];
                 const segT = (t * segmentCount) - segmentIndex;
                 const nodeX = ((p1.x + (p2.x - p1.x) * segT) / 100) * TRACK_WIDTH;
                 const nodeY = p1.y + (p2.y - p1.y) * segT;

                 return (
                   <g key={m.id}>
                     <circle
                       cx={nodeX}
                       cy={`${nodeY}%`}
                       r="8"
                       className={cn(
                         "transition-all duration-500",
                         progress >= m.progress ? "fill-primary shadow-[0_0_15px_hsl(var(--primary))]" : "fill-muted-foreground/20"
                       )}
                     />
                     <text 
                        x={nodeX} 
                        y={`${nodeY + 8}%`} 
                        textAnchor="middle" 
                        className="fill-muted-foreground font-mono text-[10px] font-bold"
                     >
                        {m.year}
                     </text>
                   </g>
                 );
               })}
             </svg>

             {/* The Mercedes F1 Car - Side Profile */}
             <div 
               className="absolute z-50 transition-all duration-100 ease-out"
               style={{ 
                 left: `${carX}px`, 
                 top: carY,
                 transform: `translate(-50%, -50%) rotate(${rotation}deg)`
               }}
             >
               <div className="relative">
                 {/* High-Fidelity F1 Side-Profile SVG */}
                 <svg width="120" height="40" viewBox="0 0 120 40" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {/* Main Chassis */}
                    <path d="M5 30 L20 28 L40 10 L80 10 L100 25 L115 32 L115 35 L5 35 Z" fill="#050505" />
                    {/* Livery Highlights */}
                    <path d="M40 12 L75 12 L95 24 L110 30" fill="none" stroke="#00D2BE" strokeWidth="2" />
                    <path d="M25 29 L50 29" fill="none" stroke="#00D2BE" strokeWidth="1" />
                    {/* Front Wing */}
                    <rect x="100" y="32" width="18" height="3" rx="1" fill="#111" />
                    <rect x="105" y="30" width="10" height="2" fill="#00D2BE" />
                    {/* Rear Wing */}
                    <rect x="0" y="20" width="15" height="15" rx="1" fill="#111" />
                    <rect x="2" y="22" width="11" height="3" fill="#00D2BE" />
                    {/* Tires */}
                    <circle cx="25" cy="33" r="7" fill="#111" stroke="#333" strokeWidth="2" />
                    <circle cx="25" cy="33" r="4" fill="none" stroke="#00D2BE" strokeWidth="0.5" />
                    <circle cx="95" cy="33" r="7" fill="#111" stroke="#333" strokeWidth="2" />
                    <circle cx="95" cy="33" r="4" fill="none" stroke="#00D2BE" strokeWidth="0.5" />
                    {/* Driver Helmet Area */}
                    <path d="M55 10 C 55 5, 65 5, 65 10" fill="#222" />
                 </svg>
                 
                 {/* Exhaust Heat Effect */}
                 {progress > 0 && progress < 100 && (
                   <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-primary/0 to-primary/30 blur-md animate-pulse" />
                 )}
               </div>
             </div>
          </div>
        </div>

        {/* Floating Story Card - Centered relative to Screen */}
        <div 
          className={cn(
            "fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-6 transition-all duration-700",
            activeMilestone ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"
          )}
        >
          <div className="relative p-8 rounded-[40px] bg-card/60 backdrop-blur-3xl border border-border/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="flex items-center gap-6 mb-6">
              <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">{activeMilestone?.year}</span>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{activeMilestone?.title}</h3>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed text-lg lora italic">
              "{activeMilestone?.description}"
            </p>

            <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/40">
               <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
                  <MapPin className="h-3 w-3" />
                  <span>Segment: {activeMilestone?.id} / 5</span>
               </div>
               <Flag className="h-4 w-4 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Global Progress Hub */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
           <div className="w-64 h-1 bg-muted/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_hsl(var(--primary))]" 
                style={{ width: `${progress}%` }} 
              />
           </div>
           <p className="text-muted-foreground font-mono text-[9px] uppercase tracking-[0.4em]">
              Journey Completion: {Math.floor(progress)}%
           </p>
        </div>
      </main>
    </div>
  );
}
