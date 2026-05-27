import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "Can’t We Just Do Things?",
    summary: "Healing doesn’t come from waiting for life to get easier. It comes from choosing small courageous actions, living in the present, and becoming your own hope even while you’re hurting.",
    date: "Augest 26, 2025",
    readTime: "7 min read",
    tag: "Life",
    link: "https://medium.com/@writtenbysrini/cant-we-just-do-things-abf1a549124a",
  },
  {
    title: "The Winner’s Mindset",
    summary: "How Top 1% Software Developers Stand Out",
    date: "September 8, 2025",
    readTime: "5 min read",
    tag: "Career",
    link: "https://medium.com/@writtenbysrini/the-winners-mindset-a75ebef35009",
  },
  {
    title: "The Mind That Solves",
    summary: "A Soulful Manifesto for Anyone Who Wants to Solve Problems",
    date: "September 7, 2025",
    readTime: "4 min read",
    tag: "Problem Solving",
    link: "https://medium.com/@writtenbysrini/the-mind-that-solves-6e03f86ae245",
  },
  {
    title: "Are We Living or Just Performing?",
    summary: "If you’re chasing dreams that aren’t even yours… this is for you.",
    date: "July 18, 2025",
    readTime: "3 min read",
    tag: "Life",
    link: "https://medium.com/@writtenbysrini/are-we-living-or-just-performing-2a1a585cadb1",
  },
  {
    title: "The Million-Dollar Mistake",
    summary: "Lessons Every Young Professional Needs to Know Before It’s Too Late",
    date: "September 12, 2025",
    readTime: "7 min read",
    tag: "Career",
    link: "https://medium.com/@writtenbysrini/the-million-dollar-mistake-2f6541cd157d",
  },
  {
    title: "When Smarter Means Less",
    summary: "An Exhaustive Deep-Dive into AI’s Near Future.",
    date: "Augest 28, 2025",
    readTime: "8 min read",
    tag: "AI",
    link: "https://medium.com/@writtenbysrini/when-smarter-means-less-db0776c1eb39",
  },
];

export function Blogs() {
  return (
    <section id="blogs" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">From My Blog</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Thoughts on problem-solving, life and continuous learning.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <a key={post.title} href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
              <Card className="flex h-full flex-col transform-gpu transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl bg-card/40 backdrop-blur-md border-border/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{post.title}</CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-foreground/80 backdrop-blur-sm">{post.tag}</Badge>
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
            </a>
          ))}
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" variant="outline" className="bg-transparent backdrop-blur-sm border-primary/20 hover:border-primary/50" asChild>
            <a href="https://medium.com/@writtenbysrini" target="_blank" rel="noopener noreferrer">
              View on Medium <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" asChild>
            <Link href="/interviews">
              Personal Stories <BookOpenCheck className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}