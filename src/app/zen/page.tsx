'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Sparkles, ArrowLeft, Wind, LampDesk, SunMedium } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { ZenTree } from '@/components/zen-tree';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useMusic } from '@/context/music-context';
import { Slider } from '@/components/ui/slider';

const FOCUS_DURATION = 20 * 60; // 20 minutes

export default function ZenPage() {
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [sessionState, setSessionState] = useState<'idle' | 'running' | 'paused' | 'complete'>('idle');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Lamp State
  const [lampActive, setLampActive] = useState(false);
  const [lampIntensity, setLampIntensity] = useState(85);
  
  const { setTheme, resolvedTheme } = useTheme();
  const { togglePlayPause: toggleGlobalMusic } = useMusic();
  const switchAudioRef = useRef<HTMLAudioElement | null>(null);
  const wakeLockRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    switchAudioRef.current = new Audio('/music/switch.mp3');
  }, []);

  // Screen Wake Lock Management - Keeps system awake during focus
  const requestWakeLock = useCallback(async () => {
    if ('wakeLock' in navigator) {
      try {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      } catch (err: any) {
        // Silently fail if permissions are disallowed to avoid error overlays
      }
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLockRef.current !== null) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      } catch (err) {
        // Ignore release errors
      }
    }
  }, []);

  useEffect(() => {
    if (sessionState === 'running') {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    
    return () => { releaseWakeLock(); };
  }, [sessionState, requestWakeLock, releaseWakeLock]);

  // Re-request wake lock if visibility changes (e.g. user tabs back in)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (wakeLockRef.current !== null && document.visibilityState === 'visible' && sessionState === 'running') {
        await requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [sessionState, requestWakeLock]);

  const handleStart = useCallback(() => {
    setSessionState('running');
  }, []);

  const handlePause = useCallback(() => {
    setSessionState('paused');
    document.title = 'Zen Mode (Paused)';
  }, []);

  const handleResume = useCallback(() => {
    setSessionState('running');
  }, []);

  const handleContinue = useCallback(() => {
    setTimeRemaining(FOCUS_DURATION);
    setSessionState('running');
    document.title = 'Zen Mode';
  }, []);

  const handleReset = useCallback(() => {
    setTimeRemaining(FOCUS_DURATION);
    setSessionState('idle');
    setSessionsCompleted(0);
    document.title = 'Zen Mode';
  }, []);

  const playSwitchSound = useCallback(() => {
    if (switchAudioRef.current) {
      switchAudioRef.current.currentTime = 0;
      switchAudioRef.current.play().catch(() => {});
    }
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(24);
    }
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key.toLowerCase() === 't' || e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 'r' || e.code === 'Space') && 
        !(e.target instanceof HTMLInputElement) && 
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        if (e.key.toLowerCase() === 't') {
          playSwitchSound();
          const isDark = document.documentElement.classList.contains('dark');
          const nextTheme = isDark ? 'light' : 'dark';

          if (!(document as any).startViewTransition) {
            setTheme(nextTheme);
            return;
          }

          (document as any).startViewTransition(() => {
            setTheme(nextTheme);
          });
        }
        
        if (e.key.toLowerCase() === 'm') {
          toggleGlobalMusic();
        }

        if (e.key.toLowerCase() === 'r') {
          if (resolvedTheme === 'dark') {
            playSwitchSound();
            setLampActive(prev => !prev);
          }
        }

        if (e.code === 'Space') {
          e.preventDefault(); 
          switch (sessionState) {
            case 'idle': handleStart(); break;
            case 'running': handlePause(); break;
            case 'paused': handleResume(); break;
            case 'complete': handleContinue(); break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedTheme, setTheme, toggleGlobalMusic, sessionState, handleStart, handlePause, handleResume, handleContinue, playSwitchSound]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (sessionState === 'running' && timeRemaining > 0) {
      const formatted = formatTime(timeRemaining);
      document.title = `${formatted} - Deep Focus`;
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')} ${String(secs).padStart(2, '0')}`;
  };

  const progress = useMemo(() => {
    return (FOCUS_DURATION - timeRemaining) / FOCUS_DURATION;
  }, [timeRemaining]);

  /**
   * SpaceHint - Premium 'Space' text hint.
   */
  const SpaceHint = () => (
    <kbd className="ml-5 hidden sm:inline-flex h-8 min-w-[5rem] select-none items-center justify-center rounded-xl border border-primary/30 bg-primary-foreground/10 px-4 transition-all duration-300 shadow-[inset_0_0_12px_rgba(255,255,255,0.03)] group-hover:border-primary/60 group-hover:bg-primary-foreground/20">
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Space</span>
    </kbd>
  );

  const getButton = () => {
    switch (sessionState) {
      case 'idle':
        return (
          <Button size="lg" onClick={handleStart} className="w-full h-16 rounded-2xl shadow-lg font-bold text-lg group transition-all duration-500 overflow-hidden">
            <Wind className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" /> Start Deep Focus <SpaceHint />
          </Button>
        );
      case 'running':
        return (
          <Button size="lg" variant="secondary" onClick={handlePause} className="w-full h-16 rounded-2xl shadow-md font-bold text-lg transition-all duration-500 group overflow-hidden">
            <Pause className="mr-2 h-5 w-5" /> Pause Session <SpaceHint />
          </Button>
        );
      case 'paused':
        return (
          <Button size="lg" onClick={handleResume} className="w-full h-16 rounded-2xl shadow-lg font-bold text-lg transition-all duration-500 group overflow-hidden">
            <Play className="mr-2 h-5 w-5" /> Resume Focus <SpaceHint />
          </Button>
        );
      case 'complete':
        return (
          <Button size="lg" onClick={handleContinue} className="w-full h-16 rounded-2xl shadow-lg animate-slow-pulse font-bold text-lg transition-all duration-500 group overflow-hidden">
            <Sparkles className="mr-2 h-5 w-5" /> Another 20 Minutes <SpaceHint />
          </Button>
        );
    }
  };

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="flex h-screen w-full flex-col bg-background relative overflow-hidden selection:bg-primary/20">
      {/* Immersive Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] transition-all duration-1000" />
      </div>

      {/* Extraordinary Luminous Lighthouse Reading Lamp - Optimized for Night Reading */}
      {isDarkMode && (
        <div 
          className={cn(
            "fixed left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform",
            lampActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-60"
          )}
        >
          {/* Main Illuminator - Massive spread for hardcopy books */}
          <div 
            className="w-[800px] h-[1000px] rounded-full blur-[180px] transition-all duration-300"
            style={{ 
              backgroundColor: `rgba(255, 253, 210, ${lampIntensity / 100 * 0.99})`,
              boxShadow: `0 0 ${lampIntensity * 6}px ${lampIntensity * 4.5}px rgba(255, 253, 210, 0.55)`
            }}
          />
          {/* Intense Technical Core Glow */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-[600px] rounded-full blur-[100px] bg-white/20 mix-blend-overlay"
            style={{ opacity: lampIntensity / 100 }}
          />
        </div>
      )}
      
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6">
        {/* Subtle Escape Route & Control Dock */}
        <div className={cn(
          "fixed top-8 left-8 flex items-center gap-4 transition-all duration-1000 transform-gpu",
          sessionState === 'running' ? "opacity-10 hover:opacity-100" : "opacity-100"
        )}>
            <Button asChild variant="ghost" className="hover:bg-primary/10 rounded-full group px-6 text-muted-foreground hover:text-primary">
              <Link href="/#about">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Return to Pit
              </Link>
            </Button>
            
            <div className="h-8 w-px bg-border/20 mx-2" />
            
            {/* Lamp Toggle - Only in Dark Mode */}
            {isDarkMode && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => { playSwitchSound(); setLampActive(!lampActive); }}
                      className={cn(
                        "h-10 w-10 rounded-full transition-all duration-500",
                        lampActive ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(255,253,210,0.6)]" : "text-muted-foreground hover:bg-primary/5"
                      )}
                    >
                      <LampDesk className={cn("h-5 w-5 transition-transform", lampActive && "rotate-12")} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="flex items-center gap-2">
                    <p>{lampActive ? "Turn Off Reading Lamp" : "Enable Reading Mode"}</p>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      R
                    </kbd>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>

        {/* Extraordinary Intensity Controller - Smooth Side Reveal - Only in Dark Mode */}
        {isDarkMode && (
          <div className={cn(
            "fixed left-0 top-0 bottom-0 z-50 flex flex-col justify-center px-12 group/lamp-controls transition-all duration-700",
            !lampActive && "pointer-events-none"
          )}>
            <div className={cn(
              "w-56 flex flex-col gap-4 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu",
              lampActive 
                ? "opacity-0 -translate-x-10 group-hover/lamp-controls:opacity-100 group-hover/lamp-controls:translate-x-0" 
                : "opacity-0 pointer-events-none"
            )}>
               <div className="flex items-center justify-between px-1">
                  <SunMedium className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Luminance_{lampIntensity}%</span>
               </div>
               <Slider 
                 value={[lampIntensity]} 
                 onValueChange={(vals) => setLampIntensity(vals[0])} 
                 max={100} 
                 step={1} 
                 className="cursor-pointer"
               />
               <p className="text-[8px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em] text-center">Optimized_For_Hardcopy_Reading</p>
            </div>
          </div>
        )}

        <div className="w-full max-w-2xl flex flex-col items-center gap-12 py-20">
          {/* Header Texts - Fade out during session */}
          <div className={cn(
            "text-center space-y-4 transition-all duration-1000 transform-gpu",
            sessionState === 'running' ? "opacity-0 -translate-y-8 pointer-events-none scale-95" : "opacity-100 translate-y-0 scale-100"
          )}>
            <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter text-primary italic uppercase">
              Zen Mode.
            </h1>
            <p className="max-w-prose text-lg text-muted-foreground lora italic">
              "Quiet the mind and the soul will speak."
            </p>
          </div>

          {/* Visual Focus Core */}
          <div className="relative w-full aspect-square max-w-[450px] flex items-center justify-center">
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

            {/* Cinematic Countdown - No Colon */}
            <div className="relative z-20 flex flex-col items-center">
                <div className={cn(
                  "text-7xl md:text-8xl font-bold font-mono tracking-tighter transition-all duration-1000 transform-gpu",
                  sessionState === 'running' ? "text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.4)] scale-110" : "text-muted-foreground/30 scale-100"
                )}>
                  {formatTime(timeRemaining)}
                </div>
                <div className={cn(
                  "mt-4 h-1 w-16 rounded-full bg-primary/10 overflow-hidden transition-all duration-1000",
                  sessionState === 'running' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <div 
                      className="h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" 
                      style={{ width: `${progress * 100}%` }}
                    />
                </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-col items-center w-full max-w-sm">
            <div className={cn(
              "w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu",
              sessionState === 'running' ? "opacity-20 hover:opacity-100" : "opacity-100",
              sessionState !== 'idle' ? "-translate-y-4" : "translate-y-0"
            )}>
              {getButton()}
            </div>
            
            {/* Slick Reveal Reset Button */}
            <div className={cn(
              "w-full flex items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu",
              sessionState === 'idle' ? "max-h-0 opacity-0 mt-0 pointer-events-none translate-y-8" : "max-h-24 opacity-100 mt-4 translate-y-0"
            )}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleReset} 
                      className="h-12 w-12 rounded-full hover:bg-primary/10 opacity-30 hover:opacity-100 transition-opacity"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Session</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
