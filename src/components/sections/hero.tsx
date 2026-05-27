'use client';

import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { BlurRevealText } from "@/components/blur-reveal-text";

export function Hero() {
  const roles = [
    "Software Engineer",
    "Problem Solver",
    "Lifelong Learner",
    "Technical Writer",
    "Software Tinkerer",
    "Product Engineer"
  ];

  return (
    <section id="hero" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="container relative z-10 flex animate-fade-in flex-col items-center text-center">
        <h1 className="font-body relative cursor-default inline-block px-12 py-2 text-4xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">Srinivasa Pradeep</span>
          <div className="absolute inset-0 z-20 pointer-events-none select-none px-12 py-2" aria-hidden="true">
            <span className="will-change-[background-position] animate-shine bg-clip-text text-transparent bg-gradient-to-r from-transparent via-black/40 dark:via-white/60 to-transparent bg-[length:200%_100%] block">
              Srinivasa Pradeep
            </span>
          </div>
        </h1>
        
        <div className="mt-4 flex flex-col items-center gap-1">
          <div className="text-lg font-medium text-foreground/80 md:text-xl flex items-center gap-2">
            <BlurRevealText 
              words={roles} 
              className="text-primary min-w-[200px]"
            />
            <span className="inline-block h-2 w-2 animate-breathing rounded-full bg-[#00FF00]" />
          </div>
        </div>

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
