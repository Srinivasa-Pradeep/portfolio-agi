import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "What My Amazon Internship Taught Me",
    summary: "Key takeaways from working at a FAANG company.",
    date: "July 15, 2024",
    readTime: "5 min read",
    tag: "Career",
  },
  {
    title: "From Doubt to Discipline: My DSA Journey",
    summary: "How I built a consistent habit for problem-solving.",
    date: "June 28, 2024",
    readTime: "7 min read",
    tag: "DSA",
  },
  {
    title: "How I Actually Learn New Algorithms",
    summary: "My framework for understanding and retaining complex algorithms.",
    date: "June 10, 2024",
    readTime: "6 min read",
    tag: "Learning",
  },
  {
    title: "Building a Minimal Portfolio That Feels Premium",
    summary: "Design principles and tech choices behind this very site.",
    date: "May 22, 2024",
    readTime: "8 min read",
    tag: "Web Dev",
  },
  {
    title: "Mistakes I Made In My First Tech Interviews",
    summary: "Candid reflections on what not to do during interviews.",
    date: "May 5, 2024",
    readTime: "4 min read",
    tag: "Interviews",
  },
  {
    title: "How to Think in Patterns (DP/Graphs)",
    summary: "A mental model for recognizing and solving common problem patterns.",
    date: "April 18, 2024",
    readTime: "10 min read",
    tag: "DSA",
  },
];

export function Blogs() {
  return (
    <section id="blogs" className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">From My Blog</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Thoughts on software engineering, problem-solving, and continuous learning.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title} className="flex flex-col transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                    <Badge variant="outline">{post.tag}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline">
            View All Blogs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
