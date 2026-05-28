'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Github, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb, 
  SiPython, 
  SiStreamlit,
  SiFlask,
  SiTypescript
} from 'react-icons/si';

const projects = [
  {
    name: "MedQuery AI",
    description: "Advanced Text-to-SQL AI bridging natural language and medical databases for instant clinical insights.",
    stack: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
      { name: "Ollama", icon: SiNextdotjs, color: "currentColor" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    github: "https://github.com/Srinivasa-Pradeep/MedQuery",
    link: "https://github.com/Srinivasa-Pradeep/MedQuery",
    imageId: "project-medquery",
  },
  {
    name: "Expense Feedback",
    description: "Full-stack financial system with PDF generation and real-time budget visualization for organizations.",
    stack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    github: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    link: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    imageId: "project-expense-feedback",
  },
];

function ProjectCard({ project, delay }: { project: typeof projects[0], delay: number }) {
  const projectImage = PlaceHolderImages.find((p) => p.id === project.imageId);

  return (
    <ScrollAnimationWrapper delay={delay} className="group h-full">
      {/* Unified Rectangular Card Unit */}
      <div className="relative h-full flex flex-col bg-card/20 backdrop-blur-xl rounded-[40px] border border-white/10 p-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] hover:bg-card/40">
        
        {/* High-Focus Visual Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-black/5 p-4 sm:p-6">
          
          {/* Layer 1: Atmospheric Gaussian Blur Background (Using the project image itself) */}
          {projectImage && (
            <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
              <Image
                src={projectImage.imageUrl}
                alt=""
                fill
                className="object-cover blur-3xl opacity-50 transform-gpu"
              />
            </div>
          )}
          
          {/* Layer 2: Sharp Foreground Image with Fine Glassy Border & 0.5 Padding */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-[20px] border border-white/10 bg-black/20 shadow-2xl transition-all duration-700 p-[2px]">
             <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                {projectImage && (
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
             </div>
             {/* Subtle surface glass reflection */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-20" />
          </div>
        </div>

        {/* Content Section - Part of the same unified unit */}
        <div className="flex flex-col gap-3 p-6 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            <div className="flex items-center gap-3">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground/80 transition-colors duration-500 group-hover:text-foreground/90 line-clamp-2">
            {project.description}
          </p>

          {/* Color-Accurate Tech Stack Icons */}
          <div className="flex items-center gap-5 pt-2">
            {project.stack.map((tech) => (
              <div 
                key={tech.name}
                className="group/tech relative flex items-center justify-center"
              >
                <tech.icon 
                  className="h-5 w-5 transition-all duration-500 group-hover/tech:scale-125"
                  style={{ color: tech.color }}
                />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-full bg-secondary/90 backdrop-blur-md border border-border/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground transition-all duration-300 group-hover/tech:scale-100 shadow-xl whitespace-nowrap z-50">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-40">
      <div className="container max-w-6xl">
        <div className="mb-20 flex flex-col items-start gap-4">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary/60">
            Featured Projects
          </h2>
          <div className="h-1 w-16 bg-primary/40 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-12">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.name} 
              project={project} 
              delay={index * 150} 
            />
          ))}
        </div>

        <div className="mt-32 text-center">
          <Button 
            asChild 
            variant="ghost" 
            className="h-14 px-8 text-muted-foreground hover:bg-transparent hover:text-primary group text-lg rounded-full"
          >
            <a href="https://github.com/srinivasa-pradeep" target="_blank" rel="noopener noreferrer">
              Exploration Archive <ExternalLink className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}