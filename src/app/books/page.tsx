'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Library, Binary, Brain, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

/**
 * @fileOverview The Personal Library - Reimagined as a high-fidelity architectural rack.
 */

interface Book {
  title: string;
  author: string;
  category: 'logic' | 'growth' | 'imagination';
  imageId: string;
}

const bookCollection: Book[] = [
  // Logic (Tech & Systems)
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "logic", imageId: "book-ddia" },
  { title: "Database Internals", author: "Alex Petrov", category: "logic", imageId: "book-db-internals" },
  { title: "Building Microservices", author: "Sam Newman", category: "logic", imageId: "book-microservices" },
  { title: "Programming Pearls", author: "Jon Bentley", category: "logic", imageId: "book-programming-pearls" },
  { title: "Clean Code", author: "Robert C. Martin", category: "logic", imageId: "book-clean-code" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", category: "logic", imageId: "book-pragmatic-programmer" },
  { title: "Hands-On High Performance with Go", author: "Bob Strecansky", category: "logic", imageId: "book-high-perf-go" },
  { title: "Go Programming Language", author: "Alan A. A. Donovan", category: "logic", imageId: "book-go-lang" },
  { title: "Concurrency in Go", author: "Katherine Cox-Buday", category: "logic", imageId: "book-concurrency-go" },
  { title: "Mastering Go", author: "Mihalis Tsoukalos", category: "logic", imageId: "book-mastering-go" },
  { title: "Introduction To Information Retrieval", author: "Christopher Manning", category: "logic", imageId: "book-info-retrieval" },
  { title: "Database Systems", author: "Hector Garcia-Molina", category: "logic", imageId: "book-db-systems" },
  { title: "The Joys of Hashing", author: "Thomas Mailund", category: "logic", imageId: "book-joys-hashing" },
  
  // Growth (Mindset & Business)
  { title: "Clear Thinking", author: "Shane Parrish", category: "growth", imageId: "book-clear-thinking" },
  { title: "Atomic Habits", author: "James Clear", category: "growth", imageId: "book-atomic-habits" },
  { title: "Deep Work", author: "Cal Newport", category: "growth", imageId: "book-deep-work" },
  { title: "Think Again", author: "Adam Grant", category: "growth", imageId: "book-think-again" },
  { title: "Surrounded by Idiots", author: "Thomas Erikson", category: "growth", imageId: "book-surrounded-idiots" },
  { title: "The Diary of a CEO", author: "Steven Bartlett", category: "growth", imageId: "book-diary-ceo" },
  { title: "The courage to be disliked", author: "Ichiro Kishimi", category: "growth", imageId: "book-courage-disliked" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", category: "growth", imageId: "book-search-meaning" },
  { title: "Pragmatic Thinking and Learning", author: "Andy Hunt", category: "growth", imageId: "book-pragmatic-thinking" },
  { title: "Zero to One", author: "Peter Thiel", category: "growth", imageId: "book-zero-to-one" },
  { title: "Blitzscaling", author: "Reid Hoffman", category: "growth", imageId: "book-blitzscaling" },
  { title: "Unlocking Hypergrowth", author: "Frank Slootman", category: "growth", imageId: "book-unlocking-hypergrowth" },
  { title: "Manifest", author: "Roxie Nafousi", category: "growth", imageId: "book-manifest" },
  { title: "The Book of Clarity", author: "Paras Chopra", category: "growth", imageId: "book-clarity-paras" },

  // Imagination
  { title: "Project Hail Mary", author: "Andy Weir", category: "imagination", imageId: "book-project-hail-mary" },
  { title: "The Three-Body Problem", author: "Cixin Liu", category: "imagination", imageId: "book-three-body" },
  { title: "Sum: Forty Tales from the Afterlives", author: "David Eagleman", category: "imagination", imageId: "book-sum-afterlives" },
];

function BookCard({ book }: { book: Book }) {
  const image = PlaceHolderImages.find(p => p.id === book.imageId);
  
  return (
    <div className="group relative flex flex-col items-center gap-4">
      {/* 3D-ish Book Container */}
      <div className="relative aspect-[2/3] w-full perspective-[1000px]">
        <div className={cn(
            "relative h-full w-full overflow-hidden rounded-[4px] shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "group-hover:-translate-y-4 group-hover:rotate-y-[-20deg] group-hover:shadow-[20px_40px_60px_rgba(0,0,0,0.6)]",
            "border-l-[12px] border-l-black/10 ring-1 ring-white/5"
        )}>
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            )}
            {/* The Spine Glow */}
            <div className="absolute inset-y-0 left-0 w-[12px] bg-gradient-to-r from-black/30 via-white/5 to-transparent z-10" />
            
            {/* Glassy Finish Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>

      <div className="w-full text-center sm:text-left transition-all duration-300 group-hover:translate-x-1">
        <h3 className="line-clamp-2 text-xs font-black tracking-tight text-foreground/90 uppercase h-8">{book.title}</h3>
        <p className="line-clamp-1 text-[10px] text-muted-foreground font-mono uppercase opacity-60 mt-1">{book.author}</p>
      </div>
    </div>
  );
}

function SectionShelf({ title, icon: Icon, books }: { title: string, icon: any, books: Book[] }) {
    return (
        <section className="mb-32 relative">
            <div className="flex items-center gap-4 mb-12">
                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">{title}</h2>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] mt-1">Sector_Initialization_Complete</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 relative z-10">
                {books.map((book) => (
                    <BookCard key={book.title} book={book} />
                ))}
            </div>

            {/* The Architectural Shelf Line */}
            <div className="absolute bottom-[-20px] left-0 right-0 h-1 bg-border/20 rounded-full blur-[0.5px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shine" />
            </div>
        </section>
    );
}

export default function BooksPage() {
  const logic = bookCollection.filter(b => b.category === 'logic');
  const growth = bookCollection.filter(b => b.category === 'growth');
  const imagination = bookCollection.filter(b => b.category === 'imagination');

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      </div>

      <Header />
      <main className="flex-1 relative z-10 pt-12 md:pt-16">
        <div className="container max-w-7xl pb-12 md:pb-20">
          <div className="mb-8 md:mb-12 flex justify-start">
            <Button asChild variant="ghost" className="-ml-4 hover:bg-primary/5 group rounded-full px-6 transition-all duration-300">
              <Link href="/#about">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return to Pit
              </Link>
            </Button>
          </div>

          <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-inner group overflow-hidden">
                <Library className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h1 className="font-headline text-5xl font-black tracking-tighter text-primary md:text-7xl lg:text-8xl italic uppercase">
              Volumes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground lora italic leading-relaxed px-4">
              "A reader lives a thousand lives before he dies . . . The man who never reads lives only one."
            </p>
            <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          <SectionShelf 
            title="The Architecture of Logic" 
            icon={Binary} 
            books={logic} 
          />

          <SectionShelf 
            title="The Philosophy of Growth" 
            icon={Brain} 
            books={growth} 
          />

          <SectionShelf 
            title="The Realm of Imagination" 
            icon={Sparkles} 
            books={imagination} 
          />

          <div className="mt-40 text-center pb-20">
             <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.6em]">End_of_Catalogue</p>
             <p className="text-xs text-muted-foreground/40 mt-4 lora italic">More pages waiting to be turned...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
