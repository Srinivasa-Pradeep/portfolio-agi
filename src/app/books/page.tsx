import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, BookMarked } from 'lucide-react';

export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container max-w-3xl py-12 md:py-20 text-center">
          <div className="mb-12 flex justify-start">
              <Button asChild variant="ghost" className="-ml-4">
                <Link href="/#about">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    About Me
                </Link>
              </Button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <BookMarked className="h-16 w-16 text-primary" />
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
              Favorite Books
            </h1>
            <p className="text-2xl text-muted-foreground text-balance">
              Reading & Growing
            </p>
            <p className="max-w-prose text-lg text-foreground/80">
              I love reading books that challenge my perspective and fuel my growth. This page will soon host a list of my favorite reads—from technical deep-dives to philosophical journeys.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
