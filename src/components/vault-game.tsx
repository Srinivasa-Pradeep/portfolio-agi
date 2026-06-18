'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Keyboard, Timer, Trophy, RotateCcw, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type VaultGameProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const PASSAGE = "Technology is a craft that requires architectural precision. To build a world that lasts, one must understand the balance between logic and human emotion. Every line of code is a step toward becoming a better version of oneself. Stay humble, keep building, and never stop learning from the giants who came before you.";
const TARGET_WPM = 60;
const TIME_LIMIT = 25;
const TARGET_ACCURACY = 95;

export function VaultGame({ isOpen, onOpenChange }: VaultGameProps) {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLimit] = useState(TIME_LIMIT);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ wpm: number; accuracy: number; passed: boolean } | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateResults = useCallback(() => {
    const words = PASSAGE.trim().split(/\s+/);
    const userWords = userInput.trim().split(/\s+/);
    const typedLength = userInput.length;
    
    // WPM = (Typed Characters / 5) / (Time Spent in Minutes)
    const timeSpent = TIME_LIMIT - timeLeft;
    const timeInMinutes = timeSpent / 60;
    const wpm = timeInMinutes > 0 ? Math.round((typedLength / 5) / timeInMinutes) : 0;

    // Accuracy
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === PASSAGE[i]) correctChars++;
    }
    const accuracy = typedLength > 0 ? Math.round((correctChars / typedLength) * 100) : 0;
    
    const passed = wpm >= TARGET_WPM && accuracy >= TARGET_ACCURACY && typedLength >= (PASSAGE.length * 0.8);
    
    setResults({ wpm, accuracy, passed });
    setIsFinished(true);
    setIsActive(false);

    if (passed) {
        setTimeout(() => {
            onOpenChange(false);
            router.push('/interviews');
        }, 2000);
    }
  }, [userInput, timeLeft, onOpenChange, router]);

  const resetGame = () => {
    setUserInput('');
    setTimeLimit(TIME_LIMIT);
    setIsActive(false);
    setIsFinished(false);
    setResults(null);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (isOpen) {
        resetGame();
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLimit(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      calculateResults();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft, calculateResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    
    const val = e.target.value;
    if (!isActive && val.length > 0) {
      setIsActive(true);
    }
    
    setUserInput(val);

    if (val.length >= PASSAGE.length) {
        calculateResults();
    }
  };

  const renderCharacter = (char: string, index: number) => {
    let colorClass = "text-muted-foreground/30";
    if (index < userInput.length) {
        colorClass = userInput[index] === char ? "text-foreground font-medium" : "text-destructive bg-destructive/10 rounded-sm";
    } else if (index === userInput.length) {
        colorClass = "text-primary animate-pulse border-b-2 border-primary";
    }
    return <span key={index} className={cn("transition-colors duration-200", colorClass)}>{char}</span>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] rounded-[40px] border-border/40 bg-card/95 backdrop-blur-2xl shadow-2xl p-10 overflow-hidden no-cursor">
        <DialogHeader className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-3xl bg-primary/10 border border-primary/20">
               <Keyboard className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-headline text-3xl font-black italic tracking-tighter uppercase">Unlock My Personal Blog</DialogTitle>
          <DialogDescription className="text-center text-sm font-mono uppercase tracking-[0.2em] opacity-60">
            Min Requirement: {TARGET_WPM} WPM | {TARGET_ACCURACY}% Accuracy
          </DialogDescription>
        </DialogHeader>

        <div className="relative space-y-10">
            {/* Live Stats */}
            <div className="flex justify-center gap-12">
                <div className="text-center">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">Time</p>
                    <div className="flex items-center gap-2 text-2xl font-black italic font-mono">
                        <Timer className="h-4 w-4 text-primary" />
                        {timeLeft}s
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">Current Speed</p>
                    <div className="text-2xl font-black italic font-mono text-primary">
                        {isActive ? Math.round((userInput.length / 5) / ((TIME_LIMIT - timeLeft) / 60 || 1)) : 0} <span className="text-xs uppercase">WPM</span>
                    </div>
                </div>
            </div>

            {/* Passage Display */}
            <div 
                className="relative p-8 rounded-[32px] bg-secondary/30 border border-white/5 font-mono text-lg leading-relaxed cursor-text select-none"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="flex flex-wrap gap-x-[0.1em] gap-y-1">
                    {PASSAGE.split('').map((char, i) => renderCharacter(char, i))}
                </div>
                
                {/* Hidden Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    className="absolute inset-0 opacity-0 cursor-default"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    onPaste={(e) => e.preventDefault()}
                />
            </div>

            {/* Results Overlay */}
            {isFinished && results && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-card/80 backdrop-blur-xl rounded-[32px] animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-6 p-8">
                        {results.passed ? (
                            <div className="space-y-4">
                                <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto ring-4 ring-emerald-500/20">
                                    <Trophy className="h-10 w-10 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase">Excellence Achieved</h3>
                                <div className="flex justify-center gap-8 font-mono">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase opacity-50">Speed</p>
                                        <p className="text-2xl font-black text-emerald-500">{results.wpm} WPM</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase opacity-50">Accuracy</p>
                                        <p className="text-2xl font-black text-emerald-500">{results.accuracy}%</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground animate-pulse">Initializing direct link...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                                    <AlertTriangle className="h-8 w-8 text-destructive" />
                                </div>
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Speed Not Met</h3>
                                <p className="text-sm text-muted-foreground lora italic">You clocked {results.wpm} WPM with {results.accuracy}% accuracy.</p>
                                <Button onClick={resetGame} className="rounded-full px-8 gap-2">
                                    <RotateCcw className="h-4 w-4" /> Try Again
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

        <div className="mt-8 pt-6 border-t border-border/10 flex justify-between items-center opacity-40">
            <div className="flex gap-1">
                <div className="h-1 w-4 bg-primary/40 rounded-full" />
                <div className="h-1 w-2 bg-primary/20 rounded-full" />
            </div>
            <span className="text-[8px] font-mono uppercase tracking-widest tracking-[0.4em]">Auth_Ready: SRINI_ENGINE_v4</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}