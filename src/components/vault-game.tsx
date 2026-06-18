'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Unlock, RefreshCw, Keyboard, Timer, Gauge, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type VaultGameProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const PASSAGES = [
  "I write to understand and build to become. Technology is the craft, but curiosity is the engine. Every line of code is a step toward clarity. We architect systems not just for performance, but for people. Precision is found in the smallest details of our logic.",
  "Great software is built at the intersection of empathy and engineering. We solve problems to create a better world, one algorithm at a time. Stay humble, stay curious, and never stop building the future you want to live in.",
  "The most complex systems are built from the simplest ideas. Architecture is the art of seeing the invisible connections between logic and life. Build with purpose, document with clarity, and always push the limits of what is possible."
];

export function VaultGame({ isOpen, onOpenChange }: VaultGameProps) {
  const router = useRouter();
  const [targetText, setTargetText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeRemaining] = useState(25);
  const [isFinished, setIsFinished] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const generatePassage = useCallback(() => {
    const random = Math.floor(Math.random() * PASSAGES.length);
    setTargetText(PASSAGES[random]);
  }, []);

  const resetGame = useCallback(() => {
    setInputValue('');
    setStartTime(null);
    setTimeRemaining(25);
    setIsFinished(false);
    setIsSuccess(false);
    generatePassage();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [generatePassage]);

  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime && timeLeft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinish();
    }
    return () => clearInterval(timer);
  }, [startTime, timeLeft, isFinished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInputValue(val);

    if (val.length >= targetText.length) {
      handleFinish(val);
    }
  };

  const calculateStats = (finalInput: string) => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 25;
    const wordsTyped = finalInput.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / (timeElapsed || 1)) * 60);

    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] === targetText[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / targetText.length) * 100);

    return { wpm, accuracy };
  };

  const handleFinish = (finalValue = inputValue) => {
    setIsFinished(true);
    const { wpm, accuracy } = calculateStats(finalValue);
    
    if (wpm >= 60 && accuracy >= 95) {
      setIsSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        router.push('/interviews');
      }, 1500);
    } else {
      setIsSuccess(false);
    }
  };

  const { wpm, accuracy } = calculateStats(inputValue);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-[32px] border-border/40 bg-card/95 backdrop-blur-2xl shadow-2xl p-8 overflow-hidden no-cursor">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
               <Keyboard className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-headline text-2xl font-bold tracking-tight">Unlock My Personal Blog</DialogTitle>
          <p className="text-center text-xs font-mono uppercase tracking-[0.2em] opacity-40 mt-1">Focus Test Required</p>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {!isFinished ? (
            <>
              {/* Display Area */}
              <div 
                onClick={() => inputRef.current?.focus()}
                className="relative p-6 rounded-2xl bg-secondary/30 border border-border/20 cursor-text group"
              >
                <div className="absolute top-4 right-6 flex items-center gap-2 text-primary/40 font-mono text-xs">
                  <Timer className="h-3 w-3" />
                  <span>{timeLeft}s</span>
                </div>

                <div className="text-lg font-mono leading-relaxed select-none tracking-tight">
                  {targetText.split('').map((char, i) => {
                    let color = 'text-muted-foreground/30';
                    if (i < inputValue.length) {
                      color = inputValue[i] === char ? 'text-primary' : 'text-destructive';
                    }
                    return (
                      <span key={i} className={cn("transition-colors duration-200", color)}>
                        {char}
                      </span>
                    );
                  })}
                  {/* Blinking Cursor */}
                  <span className="inline-block w-[2px] h-[1.2em] bg-primary align-middle animate-pulse ml-0.5" />
                </div>

                <input 
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="absolute inset-0 opacity-0 cursor-text"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  onPaste={(e) => e.preventDefault()}
                />
              </div>

              {/* Live HUD */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">WPM</span>
                  </div>
                  <span className="text-xl font-black font-mono">{wpm}</span>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Accuracy</span>
                  </div>
                  <span className="text-xl font-black font-mono">{accuracy}%</span>
                </div>
              </div>
              <p className="text-center text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">Target: 60 WPM / 95% Accuracy</p>
            </>
          ) : (
            <div className="py-8 text-center animate-in fade-in zoom-in duration-500">
               {isSuccess ? (
                 <div className="space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto ring-4 ring-emerald-500/20">
                      <Unlock className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">Access Granted</h3>
                    <p className="text-muted-foreground text-sm italic lora">Welcome to my personal reflections.</p>
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto ring-4 ring-destructive/20">
                      <AlertCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase">Incomplete</h3>
                        <p className="text-muted-foreground text-sm">Achieved: <span className="font-bold text-foreground">{wpm} WPM</span> & <span className="font-bold text-foreground">{accuracy}% Acc</span></p>
                    </div>
                    <Button onClick={resetGame} className="h-12 px-8 rounded-full font-bold group">
                      <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                      Try Again
                    </Button>
                 </div>
               )}
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-border/10 flex justify-between items-center opacity-40">
            <div className="flex gap-1">
                <div className="h-1 w-4 bg-primary/40 rounded-full" />
                <div className="h-1 w-2 bg-primary/20 rounded-full" />
            </div>
            <span className="text-[8px] font-mono uppercase tracking-widest">AUTH_STATUS: READY</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}