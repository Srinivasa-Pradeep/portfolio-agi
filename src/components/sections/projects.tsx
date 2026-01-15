import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Portfolio v2",
    description: "The very site you are on. A modern, performant portfolio built with Next.js and Tailwind CSS.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    github: "https://github.com/srinivas-dev/portfolio",
    live: "#",
  },
  {
    name: "LeetCode Tracker Dashboard",
    description: "A dashboard to visualize LeetCode progress, track streaks, and analyze performance.",
    stack: ["React", "Chart.js", "Firebase", "Node.js", "Express"],
    github: "https://github.com/srinivas-dev/leetcode-tracker",
    live: "#",
  },
  {
    name: "System Design Notes Hub",
    description: "A collaborative platform for creating and sharing system design notes and diagrams.",
    stack: ["Next.js", "Supabase", "Tiptap Editor", "WebSockets"],
    github: "https://github.com/srinivas-dev/system-design-hub",
    live: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Featured Projects</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A few things I've built.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} className="flex flex-col transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button asChild variant="outline" className="w-full">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                <Button asChild className="w-full">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
