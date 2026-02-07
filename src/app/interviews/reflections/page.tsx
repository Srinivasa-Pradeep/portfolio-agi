import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';

export default function ReflectionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container max-w-3xl py-12 md:py-20 text-center">
          <div className="mb-12 flex justify-start">
              <Button asChild variant="ghost" className="-ml-4">
                <Link href="/interviews">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Stories
                </Link>
              </Button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Construction className="h-16 w-16 text-primary" />
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
              Life & Reflections
            </h1>
            <p className="text-2xl text-muted-foreground text-balance">
              Coming Soon...
            </p>
            <p className="max-w-prose text-lg text-foreground/80">
              This special section is currently under construction. I'm taking my time to craft personal stories and reflections that I hope will resonate with you. Thank you for your patience and for being a part of my journey.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
