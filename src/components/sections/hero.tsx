
'use client';

import { BlurRevealText } from "@/components/blur-reveal-text";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

        <p className="mt-6 max-w-xl text-balance text-muted-foreground md:text-lg lora italic mb-12">
          I write to understand and build to become.
        </p>

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
    </section>
  );
}
