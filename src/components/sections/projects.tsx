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
import { Github, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Medical Text-to-SQL",
    description:
      "A Text-to-SQL model using Code-T5-base, fine-tuned with LoRA/QLoRA to efficiently process medical queries.",
    stack: ["Python", "Streamlit", "Ollama", "MongoDB", "CodeT5"],
    github: "https://github.com/Srinivasa-Pradeep/MedQuery",
    imageId: "project-medquery",
  },
  {
    name: "Expense Feedback",
    description:
      "A web app to streamline expense reports with PDF previews and GridFS for efficient receipt storage.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "GridFS"],
    github: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    imageId: "project-expense-feedback",
  },
  {
    name: "SWE Interview Prep",
    description:
      "A curated list of resources for SWE interviews, covering DSA, System Design, and study roadmaps.",
    stack: ["Resources", "DSA", "System Design", "Books"],
    github:
      "https://github.com/Srinivasa-Pradeep/Software-Engineering-Preparation-Complete-Resource-List",
    imageId: "project-swe-prep",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A few things I've built and contributed.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-0 lg:gap-4 [perspective:2000px]">
          {projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(
              (p) => p.id === project.imageId
            );

            return (
              <div
                key={project.name}
                className={cn(
                  "group h-[430px] w-full max-w-sm rounded-xl transition-all duration-500 ease-in-out [transform-style:preserve-3d]",
                  // Responsive stacking
                  "md:h-[390px] md:w-1/3",
                  // 3D desktop layout
                  index === 0 &&
                    "md:[transform:translateY(2rem)_rotateY(25deg)] md:hover:z-20 md:hover:[transform:translateY(2rem)_rotateY(0deg)_scale(1.02)]",
                  index === 1 && "md:z-10 md:scale-95 md:translate-y-0 md:hover:scale-70",
                  index === 2 &&
                    "md:[transform:translateY(2rem)_rotateY(-25deg)] md:hover:z-20 md:hover:[transform:translateY(2rem)_rotateY(0deg)_scale(1.02)]"
                )}
              >
                <div className="relative h-full w-full rounded-xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 rounded-xl [backface-visibility:hidden]">
                    {projectImage && (
                      <Image
                        src={projectImage.imageUrl}
                        alt={projectImage.description}
                        data-ai-hint={projectImage.imageHint}
                        fill
                        className="object-cover rounded-xl"
                      />
                    )}
                    <div className="absolute inset-0 rounded-xl bg-black/40 transition-colors group-hover:bg-black/60"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white shadow-black/80 [text-shadow:0_2px_4px_var(--tw-shadow-color)]">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 h-full w-full rounded-xl bg-card/50 backdrop-blur-lg border border-border/20 text-card-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl">
                      {projectImage && (
                        <div className="absolute inset-0">
                          <Image
                            src={projectImage.imageUrl}
                            alt={projectImage.description}
                            fill
                            className="object-cover rounded-xl scale-110 blur-sm brightness-50"
                          />
                        </div>
                      )}
                      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="mt-2 flex-grow text-sm text-white/80">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {project.stack.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="border-transparent bg-white/10 text-white backdrop-blur-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  asChild
                                  size="sm"
                                  className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                                >
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Github className="mr-2 h-4 w-4" /> View
                                    GitHub
                                  </a>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View GitHub Repository</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
