import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookHeart, Briefcase } from 'lucide-react';
import Link from 'next/link';

const storyCategories = [
    {
        title: "Interview Journeys",
        description: "In-depth stories about my interview experiences with various companies, sharing lessons learned along the way.",
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        link: "/interviews/journeys",
        cta: "Explore Journeys"
    },
    {
        title: "Life & Reflections",
        description: "Personal thoughts on life, growth, and the philosophies that guide me. Coming soon!",
        icon: <BookHeart className="h-8 w-8 text-primary" />,
        link: "#",
        cta: "Coming Soon",
        disabled: true,
    }
]

export default function PersonalStoriesHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <section id="personal-stories" className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Personal Stories
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A collection of my personal stories, life lessons, and interview journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {storyCategories.map(category => (
                <Link
                  key={category.title}
                  href={category.link}
                  className={`block h-full group ${category.disabled ? 'pointer-events-none' : ''}`}
                >
                  <Card className={`flex h-full flex-col transform-gpu transition-all duration-300 ${!category.disabled && 'group-hover:-translate-y-2 group-hover:shadow-2xl'}`}>
                    <CardHeader className="flex-row items-center gap-6 space-y-0">
                        <div className="p-3 bg-primary/10 rounded-full">
                            {category.icon}
                        </div>
                        <div>
                            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                                {category.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-base">
                                {category.description}
                            </CardDescription>
                        </div>
                    </CardHeader>
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
