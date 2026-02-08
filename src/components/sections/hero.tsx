'use client';

import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.1),transparent_40%)]" />
         <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
        </div>
      </div>
      
      <div className="container relative z-10 flex animate-fade-in flex-col items-center text-center">
        <h1 className="font-body relative cursor-default inline-block text-4xl font-medium tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          <span>Srinivasa Pradeep</span>
          <div className="absolute inset-0 z-20 pointer-events-none select-none" aria-hidden="true">
            <span className="will-change-[background-position] animate-shine bg-clip-text text-transparent bg-gradient-to-r from-transparent via-white/80 dark:via-slate-500/60 to-transparent bg-[length:200%_100%] block">
              Srinivasa Pradeep
            </span>
          </div>
        </h1>
        <p className="font-body mt-4 max-w-2xl text-center text-lg font-medium text-foreground/80 md:text-xl">
          Software Engineer • Lifelong Learner •
          <span className="whitespace-nowrap">
            {' '}Writer
            <span className="ml-2 inline-block h-2 w-2 animate-breathing rounded-full bg-[#00FF00]" />
          </span>
        </p>
        <p className="mt-6 max-w-xl text-balance text-muted-foreground md:text-lg">
        I write to understand and build to become.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="#projects" passHref>
            <Button size="lg" className="w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href="/resume.pdf" download="Srini_Resume.pdf">
            <Button size="lg" variant="outline" className="w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
              Download Resume
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
