'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Unlock, ChevronRight, Terminal, ShieldAlert, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

type VaultGameProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

type PuzzleStep = 'intro' | 'puzzle1' | 'puzzle2' | 'puzzle3' | 'puzzle4' | 'masterKey' | 'final';

export function VaultGame({ isOpen, onOpenChange }: VaultGameProps) {
  const router = useRouter();
  const [step, setStep] = useState<PuzzleStep>('intro');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [showMasterHint, setShowMasterHint] = useState(false);
  const [digits, setDigits] = useState<string[]>(['?', '?', '?', '?']);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Reset game when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('intro');
        setInputValue('');
        setError(false);
        setShowMasterHint(false);
        setDigits(['?', '?', '?', '?']);
        setIsUnlocked(false);
      }, 300);
    }
  }, [isOpen]);

  const handleNext = () => {
    const val = inputValue.trim().toLowerCase();
    
    switch (step) {
      case 'intro':
        setStep('puzzle1');
        break;
      
      case 'puzzle1':
        // Math Pattern: 3, 6, 12, 24, ? (48) -> 4+8=12 -> 1+2=3 -> x2 = 6
        if (val === '6') {
          setDigits(['6', '?', '?', '?']);
          setStep('puzzle2');
          setInputValue('');
          setError(false);
        } else {
          setError(true);
        }
        break;

      case 'puzzle2':
        // Length of "Short" = 5
        if (val === '5') {
          setDigits(['6', '5', '?', '?']);
          setStep('puzzle3');
          setInputValue('');
          setError(false);
        } else {
          setError(true);
        }
        break;

      case 'puzzle3':
        // Trick: "How many months have 28 days?" -> 12. 12 % 3 = 0
        if (val === '0') {
          setDigits(['6', '5', '0', '?']);
          setStep('puzzle4');
          setInputValue('');
          setError(false);
        } else {
          setError(true);
        }
        break;

      case 'puzzle4':
        // Observation: 2 cats(8), 1 dog(4), 1 bird(2). Legs=14. Sum digits=5. Minus flying(1)=4
        if (val === '4') {
          setDigits(['6', '5', '0', '4']);
          setStep('masterKey');
          setInputValue('');
          setError(false);
        } else {
          setError(true);
        }
        break;

      case 'masterKey':
        // Final Birthday Key: 06052004
        if (val === '06052004') {
          setIsUnlocked(true);
          setTimeout(() => {
            onOpenChange(false);
            router.push('/interviews');
          }, 1500);
        } else {
          setError(true);
          setShowMasterHint(true); // Reveal the hint with animation
        }
        break;
    }
  };

  const renderContent = () => {
    if (isUnlocked) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/20 animate-pulse">
            <Unlock className="h-12 w-12 text-primary" />
          </div>
          <h3 className="font-headline text-3xl font-black italic tracking-tighter uppercase mb-2">Access Granted</h3>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Master Decryption Successful.</p>
        </div>
      );
    }

    switch (step) {
      case 'intro':
        return (
          <div className="space-y-6 py-4 animate-vibrate">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/5 border border-destructive/20">
              <ShieldAlert className="h-6 w-6 text-destructive shrink-0" />
              <p className="text-sm font-mono leading-relaxed text-destructive/80">
                SYSTEM_LOCK_ACTIVE: Unauthorized access detected. You are trapped. Extract the 4-digit code to initialize the Master Key.
              </p>
            </div>
            <Button onClick={handleNext} className="w-full h-14 rounded-2xl font-black italic uppercase group">
              Begin Extraction
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        );

      case 'puzzle1':
        return (
          <div className="space-y-6 py-4 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 font-mono">Sequence_Extraction_01</span>
                <h3 className="font-headline text-xl font-bold tracking-tight">3, 6, 12, 24, ?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed italic lora">
                  "Find the next number. Sum its digits repeatedly until you reach a single digit. Now, multiply that result by 2."
                </p>
             </div>
             <div className="relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(false); }}
                  placeholder="Enter single digit..."
                  className={cn("h-12 bg-secondary/50 border-none font-mono text-center text-lg", error && "ring-2 ring-destructive")}
                  autoFocus
                />
                {error && <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-destructive uppercase tracking-widest font-mono">Calculation Error</p>}
             </div>
             <Button onClick={handleNext} className="w-full h-12 rounded-xl font-bold">Verify Digit</Button>
          </div>
        );

      case 'puzzle2':
        return (
          <div className="space-y-6 py-4 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 font-mono">Sequence_Extraction_02</span>
                <h3 className="font-headline text-xl font-bold tracking-tight italic lora">"What word becomes shorter when you add two letters to it?"</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-mono uppercase tracking-widest pt-2">
                  "Count the letters of the answer."
                </p>
             </div>
             <div className="relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(false); }}
                  placeholder="Enter count..."
                  className={cn("h-12 bg-secondary/50 border-none font-mono text-center text-lg", error && "ring-2 ring-destructive")}
                  autoFocus
                />
                {error && <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-destructive uppercase tracking-widest font-mono">Invalid Answer</p>}
             </div>
             <Button onClick={handleNext} className="w-full h-12 rounded-xl font-bold">Verify Digit</Button>
          </div>
        );

      case 'puzzle3':
        return (
          <div className="space-y-6 py-4 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 font-mono">Sequence_Extraction_03</span>
                <h3 className="font-headline text-xl font-bold tracking-tight">"How many months have 28 days?"</h3>
                <p className="text-xs text-muted-foreground leading-relaxed italic lora">
                  "Take the remainder when your answer is divided by 3."
                </p>
             </div>
             <div className="relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(false); }}
                  placeholder="Enter single digit..."
                  className={cn("h-12 bg-secondary/50 border-none font-mono text-center text-lg", error && "ring-2 ring-destructive")}
                  autoFocus
                />
                {error && <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-destructive uppercase tracking-widest font-mono">Logic Failure</p>}
             </div>
             <Button onClick={handleNext} className="w-full h-12 rounded-xl font-bold">Verify Digit</Button>
          </div>
        );

      case 'puzzle4':
        return (
          <div className="space-y-6 py-4 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 font-mono">Sequence_Extraction_04</span>
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-border/20 font-mono text-xs">
                    <p>SYSTEM_SCAN:</p>
                    <p>• 2 cats</p>
                    <p>• 1 dog</p>
                    <p>• 1 bird</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic lora pt-2">
                  "Calculate total legs. Find the sum of digits of that total, then subtract the number of animal types that are able to fly."
                </p>
             </div>
             <div className="relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(false); }}
                  placeholder="Enter single digit..."
                  className={cn("h-12 bg-secondary/50 border-none font-mono text-center text-lg", error && "ring-2 ring-destructive")}
                  autoFocus
                />
                {error && <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-destructive uppercase tracking-widest font-mono">Incorrect Count</p>}
             </div>
             <Button onClick={handleNext} className="w-full h-12 rounded-xl font-bold">Verify Digit</Button>
          </div>
        );

      case 'masterKey':
        return (
          <div className="space-y-6 py-4 animate-in zoom-in-95 duration-500">
             <div className="text-center space-y-2">
                <KeyRound className="h-10 w-10 text-primary mx-auto mb-2" />
                <h3 className="font-headline text-2xl font-black italic tracking-tighter uppercase">Initialize Master Key</h3>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">Convert Sequence 6504 to 8-digit Key</p>
                {showMasterHint && (
                  <p className="text-[10px] text-destructive/80 font-mono italic animate-in fade-in slide-in-from-top-1 duration-700">
                    Hint: Something personal in DDMMYYYY format.
                  </p>
                )}
             </div>
             <div className="relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => { setInputValue(e.target.value); setError(false); }}
                  placeholder="Enter 8-digit code..."
                  maxLength={8}
                  className={cn("h-16 bg-primary/10 border-dashed border-2 border-primary/30 font-mono text-center text-2xl tracking-[0.4em] font-black italic", error && "ring-2 ring-destructive")}
                  autoFocus
                />
                {error && <p className="absolute -bottom-6 left-0 w-full text-center text-[10px] font-bold text-destructive uppercase tracking-widest font-mono">Invalid Master Key</p>}
             </div>
             <Button onClick={handleNext} className="w-full h-14 rounded-2xl font-black italic uppercase bg-primary text-primary-foreground hover:scale-[1.02] transition-transform">
               Unlock Personal Blog
             </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-[32px] border-border/40 bg-card/95 backdrop-blur-2xl shadow-2xl p-8 overflow-hidden">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-secondary/50 border border-border/20">
               <Terminal className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-headline text-2xl font-bold tracking-tight">Mission: Unlock the Vault</DialogTitle>
          <DialogDescription className="text-center text-xs font-mono uppercase tracking-widest opacity-60">
            ENCRYPTION_LAYER_04_ACTIVE
          </DialogDescription>
        </DialogHeader>

        {/* Extraction Status Bar */}
        <div className="grid grid-cols-4 gap-3 my-4">
            {digits.map((d, i) => (
                <div 
                    key={i} 
                    className={cn(
                        "h-16 rounded-xl flex items-center justify-center font-mono text-2xl font-black transition-all duration-500",
                        d === '?' ? "bg-secondary/30 text-muted-foreground/30 border border-dashed border-border" : "bg-primary/10 text-primary border border-primary/20 scale-105 shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                    )}
                >
                    {d}
                </div>
            ))}
        </div>

        {renderContent()}

        {/* Technical Footer Decoration */}
        <div className="mt-4 pt-4 border-t border-border/10 flex justify-between items-center opacity-40">
            <div className="flex gap-1">
                <div className="h-1 w-4 bg-primary/40 rounded-full" />
                <div className="h-1 w-2 bg-primary/20 rounded-full" />
            </div>
            <span className="text-[8px] font-mono uppercase tracking-widest">Auth_ID: SRINI_004</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}