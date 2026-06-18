'use client';

import { BlurRevealText } from "@/components/blur-reveal-text";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { HeroCommandBar } from "@/components/hero-command-bar";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Reactive values for the scroll indicator
  const arrowOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const arrowY = useTransform(scrollY, [0, 150], [0, 20]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    "Software Developer",
    "Technical Writer",
    "Curious Builder",
    "Detail Oriented",
    "Purpose Driven",
    "Lifelong Learner"
  ];

  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container relative z-10 flex animate-fade-in flex-col items-center text-center">
        {/* Metallic Liquid Chrome Name Container - Enhanced with high-contrast shadow bands */}
        <div className="relative inline-block px-4 pr-12 mb-2">
          <h1 className="font-body text-4xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl 
                         bg-clip-text text-transparent 
                         bg-[linear-gradient(110deg,hsl(var(--primary)),35%,rgba(0,0,0,0.4),45%,#ffffff,55%,rgba(0,0,0,0.4),65%,hsl(var(--primary)))] 
                         dark:bg-[linear-gradient(110deg,hsl(var(--primary)),35%,rgba(0,0,0,0.6),45%,#ffffff,55%,rgba(0,0,0,0.6),65%,hsl(var(--primary)))]
                         bg-[length:200%_100%] animate-shine whitespace-nowrap">
            Srinivasa Pradeep
          </h1>
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-1">
          <div className="text-lg font-medium text-foreground/80 md:text-xl flex items-center gap-2">
            <BlurRevealText 
              words={roles} 
              className="text-primary min-w-[200px]"
            />
            <span className="inline-block h-2.5 w-2.5 animate-breathing rounded-full bg-[#00FF00]" />
          </div>
        </div>

        <div className="mt-8 mb-12 w-full max-w-md mx-auto">
           <HeroCommandBar />
        </div>

        {/* GitHub Contribution Graph - Interactive real-time builder graph */}
        <div className="w-full max-w-4xl mx-auto px-4 opacity-0 animate-fade-in [animation-delay:400ms]">
          <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/20 shadow-2xl relative group">
             {/* Subtle internal glow */}
             <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
             <div className="relative z-10">
                {mounted ? <GitHubContributionGraph /> : <div className="h-[150px] w-full animate-pulse bg-muted/20 rounded-lg" />}
             </div>
          </Card>
        </div>
      </div>

      {/* Premium Scroll Indicator - Architectural Technical Design */}
      <motion.div 
        style={{ opacity: arrowOpacity, y: arrowY }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-20"
      >
        <div className="flex flex-col items-center gap-2">
            <span className="text-[7px] sm:text-[9px] font-mono font-black uppercase tracking-[0.8em] text-primary/30 ml-[0.8em]">
                Explore
            </span>
            <div className="relative h-16 w-px bg-primary/5 overflow-hidden">
                <motion.div 
                    animate={{ y: [-64, 64] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
                />
            </div>
            <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="h-3 w-3 text-primary/20" />
            </motion.div>
        </div>
      </motion.div>

      {/* Decorative Gradient Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}
