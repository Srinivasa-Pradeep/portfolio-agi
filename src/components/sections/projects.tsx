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
    description:
      "Advanced Text-to-SQL AI bridging natural language and medical databases for instant clinical insights.",
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
    description:
      "Full-stack financial system with PDF generation and real-time budget visualization for organizations.",
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
      <div className="relative h-full flex flex-col bg-card/20 backdrop-blur-md rounded-[40px] border border-white/5 p-2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] hover:bg-card/40">
        
        {/* Visual Header with Atmospheric Blur */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-black/10 p-0.5">
          {/* Gaussian Blur Background Image (Atmospheric Depth) */}
          {projectImage && (
            <div className="absolute inset-0 z-0 opacity-40 blur-3xl transition-transform duration-1000 group-hover:scale-125">
              <Image
                src={projectImage.imageUrl}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Sharp Project Image with Fine Glassy Border */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-[30px] border border-white/5 bg-black/20 shadow-2xl">
             {projectImage && (
                <Image
                  src={projectImage.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
             )}
             {/* Subtle surface reflection */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-3 p-6 pt-7">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
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

          <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {project.description}
          </p>

          <div className="flex items-center gap-4 pt-1">
            {project.stack.map((tech) => (
              <div 
                key={tech.name}
                className="group/tech relative flex items-center justify-center"
              >
                <tech.icon 
                  className="h-5 w-5 transition-all duration-500 group-hover/tech:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-full bg-secondary/80 backdrop-blur-md border border-border/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground transition-all duration-300 group-hover/tech:scale-100 shadow-xl">
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