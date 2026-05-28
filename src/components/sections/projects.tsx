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
      "A sophisticated Text-to-SQL model using Code-T5-base, fine-tuned to process complex medical queries into actionable data insights.",
    stack: [
      { name: "Python", icon: SiPython },
      { name: "Streamlit", icon: SiStreamlit },
      { name: "Ollama", icon: SiNextdotjs },
      { name: "MongoDB", icon: SiMongodb },
    ],
    github: "https://github.com/Srinivasa-Pradeep/MedQuery",
    link: "https://github.com/Srinivasa-Pradeep/MedQuery",
    imageId: "project-medquery",
    accentColor: "rgba(59, 130, 246, 0.5)", // Blue
  },
  {
    name: "Expense Feedback",
    description:
      "Streamlined expense reporting with high-performance storage. Features PDF previews and advanced data visualization.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MongoDB", icon: SiMongodb },
    ],
    github: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    link: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    imageId: "project-expense-feedback",
    accentColor: "rgba(168, 85, 247, 0.5)", // Purple
  },
  {
    name: "SWE Prep Complete",
    description:
      "A high-value curated repository of resources for software engineering interviews, covering DSA and System Design.",
    stack: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind", icon: SiTailwindcss },
    ],
    github: "https://github.com/Srinivasa-Pradeep/Software-Engineering-Preparation-Complete-Resource-List",
    link: "https://github.com/Srinivasa-Pradeep/Software-Engineering-Preparation-Complete-Resource-List",
    imageId: "project-swe-prep",
    accentColor: "rgba(34, 197, 94, 0.5)", // Green
  },
];

function ProjectCard({ project, delay }: { project: typeof projects[0], delay: number }) {
  const projectImage = PlaceHolderImages.find((p) => p.id === project.imageId);

  return (
    <ScrollAnimationWrapper delay={delay} className="group">
      <div className="flex flex-col gap-6">
        {/* Cinematic Visual Container */}
        <div className="relative aspect-[1.5/1] w-full overflow-hidden rounded-[32px] bg-[#0c0c0c] p-8 sm:p-12">
          {/* Vibrant Blurred Background */}
          <div 
            className="absolute inset-0 z-0 opacity-40 blur-[100px] transition-transform duration-700 group-hover:scale-110"
            style={{ 
              background: `radial-gradient(circle at center, ${project.accentColor}, transparent 70%)` 
            }}
          />
          
          {/* Floating Project Screenshot */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
             {projectImage && (
                <Image
                  src={projectImage.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                />
             )}
          </div>
        </div>

        {/* Project Details */}
        <div className="flex flex-col gap-4 px-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {project.name}
            </h3>
            <div className="flex items-center gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground/80 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center gap-4 pt-2">
            {project.stack.map((tech) => (
              <div 
                key={tech.name}
                className="group/tech relative flex items-center justify-center"
              >
                <tech.icon className="h-6 w-6 text-muted-foreground/40 transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:text-primary" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground transition-all group-hover/tech:scale-100">
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
    <section id="projects" className="py-24 md:py-32">
      <div className="container max-w-6xl">
        <div className="mb-16 flex flex-col items-start gap-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-primary/20" />
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.name} 
              project={project} 
              delay={index * 100} 
            />
          ))}
        </div>

        <div className="mt-24 text-center">
          <Button 
            asChild 
            variant="ghost" 
            className="text-muted-foreground hover:bg-transparent hover:text-primary group"
          >
            <a href="https://github.com/srinivasa-pradeep" target="_blank" rel="noopener noreferrer">
              View archive <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
