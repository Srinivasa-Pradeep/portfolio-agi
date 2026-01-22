import { notFound } from 'next/navigation';
import { interviewExperiences } from '@/lib/interview-experiences';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return interviewExperiences.map(exp => ({
    slug: exp.slug,
  }));
}

export default function InterviewExperiencePage({ params }: Props) {
  const experience = interviewExperiences.find(exp => exp.slug === params.slug);

  if (!experience) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <article className="container max-w-3xl py-12 md:py-20">
          <div className="mb-12">
              <Button asChild variant="ghost" className="-ml-4">
                <Link href="/interviews">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Experiences
                </Link>
              </Button>
          </div>

          <div className="space-y-4 text-center mb-12">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
              {experience.title ? experience.title : `${experience.company} - ${experience.role}`}
            </h1>
            {experience.title && (
                 <p className="text-lg text-muted-foreground">{experience.company} - {experience.role}</p>
            )}
            <div className="flex items-center justify-center gap-2">
              <p className="text-muted-foreground">{experience.date}</p>
              <Badge
                variant={experience.status === 'selected' ? 'easy' : 'destructive'}
                className="capitalize"
              >
                {experience.status}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {experience.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto leading-relaxed text-foreground/90">
            {experience.content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
