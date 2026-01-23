
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const projects = [
  {
    name: "Medical Text-to-SQL using CodeT5 + LoRA/QLoRA",
    description: "a medical text-to-SQL model that leverages the Code-T5-base LLM architecture, fine-tuned with LoRA and QLoRA techniques, to efficiently process medical queries.",
    stack: ["Python", "Streamlit", "Ollama", "MongoDB", "CodeT5"],
    github: "https://github.com/Srinivasa-Pradeep/MedQuery",
    imageId: "project-medquery",
  },
  {
    name: "Expense Feedback",
    description: "Expense Feedback is an web application that streamlines employee expense submissions and reviews. Users can submit expense details, attach receipts, and preview uploaded PDFs directly inside the app. The system uses an Express backend with MongoDB for persistence and stores large receipt files efficiently using GridFS.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "GridFS", "Axios"],
    github: "https://github.com/Srinivasa-Pradeep/expense-feedback/",
    imageId: "project-expense-feedback",
  },
  {
    name: "SWE Interview Preparation – A Complete Resource",
    description: "A curated, structured collection of resources for Software Engineering interview preparation: Data Structures & Algorithms, System Design, Study Roadmaps designed for consistent and efficient prep.",
    stack: ["Resources", "DSA", "System Design", "Books"],
    github: "https://github.com/Srinivasa-Pradeep/Software-Engineering-Preparation-Complete-Resource-List",
    imageId: "project-swe-prep",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Featured Projects</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A few things I've built and contributed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
            return (
            <Card key={project.name} className="flex flex-col transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
              {projectImage && (
                  <div className="relative h-48 w-full">
                      <Image
                          src={projectImage.imageUrl}
                          alt={projectImage.description}
                          data-ai-hint={projectImage.imageHint}
                          fill
                          className="object-cover"
                      />
                  </div>
                )}
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
                <Button asChild className="w-full">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          )})}
        </div>
      </div>
    </section>
  );
}
