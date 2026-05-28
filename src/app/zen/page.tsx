'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CameraMirror } from '@/components/camera-mirror';
import { Play, Pause, RefreshCw, Sparkles, ArrowLeft, Camera } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

const FOCUS_DURATION = 20 * 60; // 20 minutes

export default function ZenPage() {
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_DURATION);
  const [sessionState, setSessionState] = useState<'idle' | 'running' | 'paused' | 'complete'>('idle');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (sessionState === 'running' && timeRemaining > 0) {
      document.title = `${formatTime(timeRemaining)} - Zen Mode`;
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
          <Button size="lg" onClick={handleStart} className="w-full shadow-lg">
            <Camera className="mr-2 h-5 w-5" /> Start Mirror Focus
          </Button>
        );
      case 'running':
        return (
          <Button size="lg" variant="secondary" onClick={handlePause} className="w-full shadow-md">
            <Pause className="mr-2 h-5 w-5" /> Pause
          </Button>
        );
      case 'paused':
        return (
          <Button size="lg" onClick={handleResume} className="w-full shadow-lg">
            <Play className="mr-2 h-5 w-5" /> Resume
          </Button>
        );
      case 'complete':
        return (
          <Button size="lg" onClick={handleContinue} className="w-full shadow-lg animate-slow-pulse">
            <Sparkles className="mr-2 h-5 w-5" /> Another 20 Minutes
          </Button>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-transparent">
      <Header />
      <main className="flex-1 pt-24 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center text-center gap-8 py-12 md:py-20">
          <div className="absolute top-28 left-6">
              <Button asChild variant="ghost">
                <Link href="/#about">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Main
                </Link>
              </Button>
          </div>
        
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            The Mirror.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground lora italic">
            "Believe." — Face yourself, affirm your greatness.
          </p>

          <div className="relative w-full max-w-xs sm:max-w-sm h-[400px] my-4">
            <CameraMirror isActive={sessionState === 'running'} progress={progress} />
          </div>

          <div className="text-6xl font-bold font-mono tracking-tighter text-foreground/80">
            {formatTime(timeRemaining)}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-64 h-11">
              {getButton()}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleReset} disabled={sessionState === 'idle' && sessionsCompleted === 0}>
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
           <p className="text-muted-foreground">Sessions completed: {sessionsCompleted}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
