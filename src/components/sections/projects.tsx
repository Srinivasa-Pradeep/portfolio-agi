'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

const projects = [
  {
    name: "Medical Text-to-SQL",
    description:
      "A sophisticated Text-to-SQL model using Code-T5-base, fine-tuned with LoRA/QLoRA to efficiently process complex medical queries into actionable data.",
    stack: ["Python", "Streamlit", "Ollama", "MongoDB", "CodeT5"],
    github: "https://github.com/Srinivasa-Pradeep/MedQuery",
    imageId: "project-medquery",
    featured: true,
  },
  {
    name: "Expense Feedback",
    description:
      "A comprehensive web application designed to streamline expense reporting with PDF previews and high-performance GridFS storage.",
    stack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    github: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    imageId: "project-expense-feedback",
    featured: false,
  },
  {
    name: "SWE Interview Prep",
    description:
      "A high-value curated repository of resources for software engineering interviews, covering DSA, System Design, and proven roadmaps.",
    stack: ["DSA", "System Design", "Roadmaps", "Career"],
    github:
      "https://github.com/Srinivasa-Pradeep/Software-Engineering-Preparation-Complete-Resource-List",
    imageId: "project-swe-prep",
    featured: false,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <ScrollAnimationWrapper>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-5xl">
              Featured Projects.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground lora italic">
              A curated selection of architectural solutions and creative experiments.
            </p>
          </ScrollAnimationWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(
              (p) => p.id === project.imageId
            );
            
            // Bento Grid logic: First project is larger
            const isLarge = index === 0;

            return (
              <ScrollAnimationWrapper 
                key={project.name}
                delay={index * 150}
                className={cn(
                  "relative group rounded-3xl overflow-hidden border border-border/10 bg-card/30 backdrop-blur-md transition-all duration-500 hover:border-primary/20",
                  isLarge ? "md:col-span-12 lg:col-span-7 h-[500px]" : "md:col-span-6 lg:col-span-5 h-[500px]"
                )}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-0"
                    />
                  )}
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                  <div className="transform-gpu transition-all duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center gap-3 mb-4">
                      {isLarge && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm animate-pulse">
                          <Sparkles className="mr-1 h-3 w-3" /> Featured Project
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
                      {project.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 max-w-lg line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[10px] uppercase tracking-widest font-bold text-primary/60 border border-primary/10 px-2 py-1 rounded-sm bg-primary/5 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              asChild 
                              size="sm" 
                              variant="outline"
                              className="bg-background/50 backdrop-blur-md border-border/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full px-6"
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Code
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Repository</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              size="icon" 
                              variant="ghost"
                              className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Live Demo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>

                {/* Inner Glow Effect */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-500" />
              </ScrollAnimationWrapper>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
          <ScrollAnimationWrapper delay={400}>
            <p className="text-sm text-muted-foreground font-mono flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-border/40" />
              Explore more on <a href="https://github.com/srinivasa-pradeep" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">GitHub</a>
              <span className="w-8 h-px bg-border/40" />
            </p>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
