
'use client';

import { BlurRevealText } from "@/components/blur-reveal-text";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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

        {/* GitHub Heatmap - Replacing buttons with a real-time builder graph */}
        <div className="w-full max-w-4xl mx-auto px-4 opacity-0 animate-fade-in [animation-delay:400ms]">
          <Card className="p-6 bg-card/50 backdrop-blur-lg border-border/20 shadow-2xl relative group">
             {/* Subtle internal glow */}
             <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                  <img 
                    src="https://ghchart.rshah.org/srinivasa-pradeep" 
                    alt="Srinivasa Pradeep's GitHub Contributions"
                    className={`min-w-[700px] h-auto transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      // Custom filters to match the monochrome/silver theme
                      filter: resolvedTheme === 'dark' 
                        ? 'invert(1) brightness(0.9) contrast(1.2) sepia(0.1)' 
                        : 'grayscale(1) contrast(1.2)'
                    }}
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300">
                  <span className="h-px w-8 bg-muted-foreground/30" />
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
                     GitHub Activity &bull; Developer Velocity
                  </p>
                  <span className="h-px w-8 bg-muted-foreground/30" />
                </div>
             </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
