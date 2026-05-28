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
      "A sophisticated Text-to-SQL model using Code-T5-base, fine-tuned to process complex medical queries into actionable data insights. It bridges the gap between healthcare professionals and technical databases, allowing for natural language data exploration.",
    stack: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
      { name: "Ollama", icon: SiNextdotjs, color: "currentColor" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    github: "https://github.com/Srinivasa-Pradeep/MedQuery",
    link: "https://github.com/Srinivasa-Pradeep/MedQuery",
    imageId: "project-medquery",
    accentColor: "rgba(59, 130, 246, 0.4)", // Vibrant Blue
  },
  {
    name: "Expense Feedback",
    description:
      "Streamlined expense reporting with high-performance storage. Features PDF previews and advanced data visualization for real-time budget monitoring and feedback loops for organizational spending.",
    stack: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    github: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    link: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    imageId: "project-expense-feedback",
    accentColor: "rgba(168, 85, 247, 0.4)", // Vibrant Purple
  },
];

function ProjectCard({ project, delay }: { project: typeof projects[0], delay: number }) {
  const projectImage = PlaceHolderImages.find((p) => p.id === project.imageId);

  return (
    <ScrollAnimationWrapper delay={delay} className="group">
      <div className="flex flex-col gap-8">
        {/* Cinematic Visual Container with Enhanced Gaussian Blur */}
        <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-[40px] bg-black/40 backdrop-blur-sm p-6 sm:p-10 border border-white/5 shadow-2xl">
          {/* Gaussian Blur Glow Layer */}
          <div 
            className="absolute inset-0 z-0 opacity-60 blur-[120px] transition-all duration-1000 group-hover:scale-125 group-hover:opacity-80"
            style={{ 
              background: `radial-gradient(circle at center, ${project.accentColor}, transparent 80%)` 
            }}
          />
          
          {/* Floating Project Screenshot */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/60 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 group-hover:rotate-1 group-hover:scale-[1.02] group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
             {projectImage && (
                <Image
                  src={projectImage.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                />
             )}
             {/* Glass Overlay on image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold tracking-tight text-foreground/90 transition-colors group-hover:text-primary">
              {project.name}
            </h3>
            <div className="flex items-center gap-6">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <Globe className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
            {project.description}
          </p>

          <div className="flex items-center gap-5 pt-3">
            {project.stack.map((tech) => (
              <div 
                key={tech.name}
                className="group/tech relative flex items-center justify-center"
              >
                <tech.icon 
                  className="h-7 w-7 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/tech:scale-125"
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
            Engineered Works
          </h2>
          <div className="h-1 w-16 bg-primary/40 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-24 md:grid-cols-2 md:gap-x-16 md:gap-y-32">
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
