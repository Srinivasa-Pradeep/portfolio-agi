'use client';

import React, { useEffect, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Flame, Sparkles, Star, ChevronRight, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useToast } from '@/hooks/use-toast';
import { toPng } from 'html-to-image';

const MILESTONE_DATA: Record<number, { title: string, subtitle: string, quote: string }> = {
  7: { title: "Momentum Phase", subtitle: "One Full Week of Excellence", quote: "Consistency is the DNA of mastery." },
  15: { title: "Habit Anchor", subtitle: "Deepening the Neural Paths", quote: "We are what we repeatedly do." },
  30: { title: "Absolute Discipline", subtitle: "One Month of Persistence", quote: "Energy flows where attention goes." },
  50: { title: "Golden Iteration", subtitle: "A Half-Century of Commits", quote: "Small actions compounded change lives." },
  100: { title: "Centurion Status", subtitle: "The 100-Day Odyssey", quote: "The master has failed more times than the beginner has even tried." },
  365: { title: "Year One Completed", subtitle: "A Circle of Excellence", quote: "You have redefined your identity." },
};

export function MilestoneCelebration({ 
  milestone, 
  onClose 
}: { 
  milestone: number | null, 
  onClose: () => void 
}) {
  const { toast } = useToast();
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (milestone) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]);
      }

      return () => clearInterval(interval);
    }
  }, [milestone]);

  const handleShare = async () => {
    if (!milestone) return;
    const data = MILESTONE_DATA[milestone] || { title: "Milestone", subtitle: `${milestone} Days` };
    const shareText = `I just reached the ${milestone} Day Milestone on my Persistence Tracker! 🔥\n"${data.quote}"\nJoin me in the build. #Discipline #Consistency`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Milestone Unlocked: ${data.title}`,
          text: shareText,
          url: window.location.href,
        });
        toast({ title: "Shared Successfully", description: "Your achievement has been broadcasted." });
      } catch (err) {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Achievement text saved. You can now share it anywhere.",
      });
    }

    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(24);
    }
  };

  const handleDownloadImage = async () => {
    if (!captureRef.current || !milestone) return;

    try {
      // Brief delay to ensure styles are perfectly calculated
      await new Promise(resolve => setTimeout(resolve, 300));

      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: '#000000',
        pixelRatio: 2,
        style: {
          borderRadius: '40px',
        }
      });
      
      const link = document.createElement('a');
      link.download = `Milestone-Card-Day-${milestone}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Achievement Captured",
        description: "High-resolution achievement card saved to downloads.",
      });
    } catch (error: any) {
      console.error('CAPTURE_ERROR:', error);
      toast({
        variant: "destructive",
        title: "Snapshot Failed",
        description: error.name === 'SecurityError' 
          ? "Font security policy restriction. This is a browser safeguard—try clicking share instead." 
          : "An unexpected error occurred during rendering. Please try again.",
      });
    }
  };

  const data = milestone ? (MILESTONE_DATA[milestone] || { 
    title: "Uncharted Territory", 
    subtitle: `${milestone} Days of Persistence`, 
    quote: "You are building something extraordinary." 
  }) : null;

  return (
    <Dialog open={!!milestone} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-none bg-black/95 text-white p-0 overflow-hidden rounded-[40px] shadow-[0_0_100px_rgba(255,215,0,0.2)]">
        <DialogHeader className="sr-only">
          <DialogTitle>Achievement Unlocked: {milestone} Day Streak</DialogTitle>
        </DialogHeader>
        
        <div ref={captureRef} className="relative p-10 flex flex-col items-center text-center bg-black">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.15),transparent_70%)]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[80px] rounded-full" />
            </div>

            <div className="relative z-10 space-y-8 w-full">
                <motion.div
                    initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
                    className="relative"
                >
                    <div className="h-32 w-32 rounded-[40px] bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center mx-auto shadow-[0_20px_50px_rgba(234,179,8,0.4)]">
                        <Trophy className="h-16 w-16 text-black drop-shadow-md" />
                    </div>
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-20px] pointer-events-none"
                    >
                        <Sparkles className="h-6 w-6 text-yellow-400 absolute top-0 left-1/2 -translate-x-1/2 opacity-60" />
                        <Star className="h-4 w-4 text-yellow-400 absolute bottom-0 left-1/2 -translate-x-1/2 opacity-40" />
                    </motion.div>
                </motion.div>

                <div className="space-y-2">
                    <motion.p 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.6 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400"
                    >
                        Milestone Detected
                    </motion.p>
                    <motion.h2 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-black italic tracking-tighter uppercase"
                    >
                        {data?.title}
                    </motion.h2>
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-3 py-4"
                    >
                        <div className="h-px w-8 bg-white/20" />
                        <span className="text-xl font-bold flex items-center gap-2">
                            <Flame className="h-5 w-5 text-orange-500 fill-current" />
                            {milestone} Consecutive Days
                        </span>
                        <div className="h-px w-8 bg-white/20" />
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <p className="text-lg lora italic leading-relaxed text-white/90">
                        "{data?.quote}"
                    </p>
                    <p className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                        Every small commit compounds
                    </p>
                </motion.div>
            </div>
        </div>

        <div className="p-8 pt-0 space-y-4">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                <Button 
                    onClick={onClose}
                    className="w-full h-16 rounded-[24px] bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest italic text-sm group"
                >
                    Maintain the Streak <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex gap-4"
            >
                <Button 
                    variant="ghost"
                    onClick={handleShare}
                    className="flex-1 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 rounded-2xl h-12"
                >
                    <Share2 className="mr-2 h-3.5 w-3.5" /> Share
                </Button>
                <Button 
                    variant="ghost"
                    onClick={handleDownloadImage}
                    className="flex-1 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 rounded-2xl h-12"
                >
                    <Download className="mr-2 h-3.5 w-3.5" /> Save Image
                </Button>
            </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
