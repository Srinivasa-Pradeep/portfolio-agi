'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Sparkles, ArrowLeft, Wind } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { ZenTree } from '@/components/zen-tree';
import { cn } from '@/lib/utils';

const FOCUS_DURATION = 20 * 60; // 20 minutes

export default function ZenPage() {
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [sessionState, setSessionState] = useState<'idle' | 'running' | 'paused' | 'complete'>('idle');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (sessionState === 'running' && timeRemaining > 0) {
      document.title = `${formatTime(timeRemaining)} - Deep Focus`;
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && sessionState === 'running') {
      setSessionState('complete');
      setSessionsCompleted(prev => prev + 1);
      document.title = 'Session Complete ✨';
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Focus Session Complete ✨', {
          body: 'Believe in yourself. You did it.',
        });
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [sessionState, timeRemaining]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => {
    setSessionState('running');
  };

  const handlePause = () => {
    setSessionState('paused');
    document.title = 'Zen Mode (Paused)';
  };

  const handleResume = () => {
    setSessionState('running');
  };

  const handleContinue = () => {
    setTimeRemaining(FOCUS_DURATION);
    setSessionState('running');
    document.title = 'Zen Mode';
  };

  const handleReset = () => {
    setTimeRemaining(FOCUS_DURATION);
    setSessionState('idle');
    setSessionsCompleted(0);
    document.title = 'Zen Mode';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = useMemo(() => {
    return (FOCUS_DURATION - timeRemaining) / FOCUS_DURATION;
  }, [timeRemaining]);

  const getButton = () => {
    switch (sessionState) {
      case 'idle':
        return (
          <Button size="lg" onClick={handleStart} className="w-full h-14 rounded-2xl shadow-lg font-bold text-lg group">
            <Wind className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" /> Start Deep Focus
          </Button>
        );
      case 'running':
        return (
          <Button size="lg" variant="secondary" onClick={handlePause} className="w-full h-14 rounded-2xl shadow-md font-bold text-lg">
            <Pause className="mr-2 h-5 w-5" /> Pause Session
          </Button>
        );
      case 'paused':
        return (
          <Button size="lg" onClick={handleResume} className="w-full h-14 rounded-2xl shadow-lg font-bold text-lg">
            <Play className="mr-2 h-5 w-5" /> Resume Focus
          </Button>
        );
      case 'complete':
        return (
          <Button size="lg" onClick={handleContinue} className="w-full h-14 rounded-2xl shadow-lg animate-slow-pulse font-bold text-lg">
            <Sparkles className="mr-2 h-5 w-5" /> Another 20 Minutes
          </Button>
        );
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full flex-col bg-background relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] transition-all duration-1000" />
      </div>
      
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6">
        {/* Subtle Escape Route - Fades during session */}
        <div className={cn(
          "fixed top-8 left-8 transition-opacity duration-1000",
          sessionState === 'running' ? "opacity-20 hover:opacity-100" : "opacity-100"
        )}>
            <Button asChild variant="ghost" className="hover:bg-primary/10 rounded-full group px-6">
              <Link href="/#about">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Return to Pit
              </Link>
            </Button>
        </div>

        <div className="w-full max-w-2xl flex flex-col items-center gap-12 py-20">
          <div className={cn(
            "text-center space-y-4 transition-all duration-1000",
            sessionState === 'running' ? "opacity-0 -translate-y-8" : "opacity-100 translate-y-0"
          )}>
            <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter text-primary italic uppercase">
              Zen Mode.
            </h1>
            <p className="max-w-prose text-lg text-muted-foreground lora italic">
              "Quiet the mind and the soul will speak."
            </p>
          </div>

          {/* Central Art Piece */}
          <div className="relative w-full aspect-square max-w-[450px] flex items-center justify-center">
            {/* The Growth Mandala */}
            <div className={cn(
              "absolute inset-0 transition-all duration-1000 transform-gpu",
              sessionState === 'running' ? "scale-110 rotate-12" : "scale-100 rotate-0"
            )}>
              <ZenTree 
                sessions={sessionsCompleted} 
                progress={progress} 
                state={sessionState} 
              />
            </div>

            {/* Technical Progress Halo */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_25px_hsl(var(--primary)/0.2)]" viewBox="0 0 100 100">
               <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="0.5" 
                  strokeOpacity="0.05"
               />
               <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="1.2" 
                  strokeDasharray="301.59" 
                  strokeDashoffset={301.59 * (1 - progress)}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
               />
            </svg>

            {/* Centered Immersive Timer */}
            <div className="relative z-20 flex flex-col items-center">
                <div className={cn(
                  "text-7xl md:text-8xl font-bold font-mono tracking-tighter transition-all duration-1000",
                  sessionState === 'running' ? "text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.4)]" : "text-muted-foreground/30"
                )}>
                  {formatTime(timeRemaining)}
                </div>
                <div className={cn(
                  "mt-4 h-1 w-16 rounded-full bg-primary/10 overflow-hidden transition-opacity duration-1000",
                  sessionState === 'running' ? "opacity-100" : "opacity-0"
                )}>
                    <div 
                      className="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" 
                      style={{ width: `${progress * 100}%` }}
                    />
                </div>
            </div>
          </div>

          <div className={cn(
            "flex flex-col items-center gap-8 w-full max-w-sm transition-all duration-1000",
            sessionState === 'running' ? "opacity-20 hover:opacity-100" : "opacity-100"
          )}>
            <div className="w-full">
              {getButton()}
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleReset} 
                      disabled={sessionState === 'idle' && sessionsCompleted === 0}
                      className="h-12 w-12 rounded-full border-border/40 hover:bg-primary/10"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Session</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex flex-col items-center gap-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Deep_Work_History</p>
                 <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-1.5 w-6 rounded-full transition-all duration-500",
                          i < sessionsCompleted ? "bg-primary shadow-[0_0_8px_hsl(var(--primary))]" : "bg-border/20"
                        )} 
                      />
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
