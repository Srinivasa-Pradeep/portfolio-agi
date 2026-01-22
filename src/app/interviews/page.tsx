import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { interviewExperiences } from '@/lib/interview-experiences';
import Link from 'next/link';

export default function InterviewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <section id="interviews" className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Interview Experiences
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A collection of my interview journeys with different companies.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {interviewExperiences.map(exp => (
                <Link
                  key={exp.slug}
                  href={`/interviews/${exp.slug}`}
                  className="block h-full group"
                >
                  <Card className="flex h-full flex-col transform-gpu transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {exp.company} - {exp.role}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <CardDescription>{exp.date}</CardDescription>
                        <Badge
                          variant={exp.status === 'selected' ? 'easy' : 'destructive'}
                          className="capitalize"
                        >
                          {exp.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{exp.summary}</p>
                    </CardContent>
                    <CardFooter className="flex-wrap gap-2 pt-4">
                      {exp.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/#blogs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Main
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
