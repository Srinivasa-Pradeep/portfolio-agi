import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function JourneyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container max-w-4xl py-12 md:py-20">
          <div className="mb-12 flex justify-start">
            <Button asChild variant="ghost" className="-ml-4 hover:bg-transparent">
              <Link href="/#about" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                About Me
              </Link>
            </Button>
          </div>

          <div className="mb-20 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl">
                The Odyssey.
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground lora italic">
              From first lines of code to engineering at scale.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-20 text-center border-t border-dashed border-border/40">
             <p className="text-xl text-muted-foreground italic max-w-prose">
                Every line of code tells a story. This space is currently being curated to reflect the full breadth of my professional and personal growth.
             </p>
             <p className="mt-6 text-primary font-bold animate-pulse">
                Instruction Received. Waiting for details...
             </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
