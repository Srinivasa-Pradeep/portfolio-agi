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
 * @fileOverview The Personal Library - Fully interactive architectural rack.
 * Every book redirects to its respective Amazon page.
 */

interface Book {
  title: string;
  author: string;
  category: 'logic' | 'growth' | 'imagination';
  imageId: string;
  amazonLink: string;
}

const bookCollection: Book[] = [
  // Logic (Tech & Systems)
  { 
    title: "Designing Data-Intensive Applications", 
    author: "Martin Kleppmann", 
    category: "logic", 
    imageId: "book-ddia",
    amazonLink: "https://www.amazon.com/s?k=Designing+Data-Intensive+Applications+Martin+Kleppmann"
  },
  { 
    title: "Database Internals", 
    author: "Alex Petrov", 
    category: "logic", 
    imageId: "book-db-internals",
    amazonLink: "https://www.amazon.com/s?k=Database+Internals+Alex+Petrov"
  },
  { 
    title: "Building Microservices", 
    author: "Sam Newman", 
    category: "logic", 
    imageId: "book-microservices",
    amazonLink: "https://www.amazon.com/s?k=Building+Microservices+Sam+Newman"
  },
  { 
    title: "Programming Pearls", 
    author: "Jon Bentley", 
    category: "logic", 
    imageId: "book-programming-pearls",
    amazonLink: "https://www.amazon.com/s?k=Programming+Pearls+Jon+Bentley"
  },
  { 
    title: "Clean Code", 
    author: "Robert C. Martin", 
    category: "logic", 
    imageId: "book-clean-code",
    amazonLink: "https://www.amazon.com/s?k=Clean+Code+Robert+C.+Martin"
  },
  { 
    title: "The Pragmatic Programmer", 
    author: "Andrew Hunt & David Thomas", 
    category: "logic", 
    imageId: "book-pragmatic-programmer",
    amazonLink: "https://www.amazon.com/s?k=The+Pragmatic+Programmer+Andrew+Hunt"
  },
  { 
    title: "Hands-On High Performance with Go", 
    author: "Bob Strecansky", 
    category: "logic", 
    imageId: "book-high-perf-go",
    amazonLink: "https://www.amazon.com/s?k=Hands-On+High+Performance+with+Go+Bob+Strecansky"
  },
  { 
    title: "Go Programming Language", 
    author: "Alan A. A. Donovan", 
    category: "logic", 
    imageId: "book-go-lang",
    amazonLink: "https://www.amazon.com/s?k=Go+Programming+Language+Alan+Donovan"
  },
  { 
    title: "Concurrency in Go", 
    author: "Katherine Cox-Buday", 
    category: "logic", 
    imageId: "book-concurrency-go",
    amazonLink: "https://www.amazon.com/s?k=Concurrency+in+Go+Katherine+Cox-Buday"
  },
  { 
    title: "Mastering Go", 
    author: "Mihalis Tsoukalos", 
    category: "logic", 
    imageId: "book-mastering-go",
    amazonLink: "https://www.amazon.com/s?k=Mastering+Go+Mihalis+Tsoukalos"
  },
  { 
    title: "Introduction To Information Retrieval", 
    author: "Christopher Manning", 
    category: "logic", 
    imageId: "book-info-retrieval",
    amazonLink: "https://www.amazon.com/s?k=Introduction+To+Information+Retrieval+Christopher+Manning"
  },
  { 
    title: "Database Systems", 
    author: "Hector Garcia-Molina", 
    category: "logic", 
    imageId: "book-db-systems",
    amazonLink: "https://www.amazon.com/s?k=Database+Systems+Hector+Garcia-Molina"
  },
  { 
    title: "The Joys of Hashing", 
    author: "Thomas Mailund", 
    category: "logic", 
    imageId: "book-joys-hashing",
    amazonLink: "https://www.amazon.com/s?k=The+Joys+of+Hashing+Thomas+Mailund"
  },
  
  // Growth (Mindset & Business)
  { 
    title: "Clear Thinking", 
    author: "Shane Parrish", 
    category: "growth", 
    imageId: "book-clear-thinking",
    amazonLink: "https://www.amazon.com/s?k=Clear+Thinking+Shane+Parrish"
  },
  { 
    title: "Atomic Habits", 
    author: "James Clear", 
    category: "growth", 
    imageId: "book-atomic-habits",
    amazonLink: "https://www.amazon.com/s?k=Atomic+Habits+James+Clear"
  },
  { 
    title: "Deep Work", 
    author: "Cal Newport", 
    category: "growth", 
    imageId: "book-deep-work",
    amazonLink: "https://www.amazon.com/s?k=Deep+Work+Cal+Newport"
  },
  { 
    title: "Think Again", 
    author: "Adam Grant", 
    category: "growth", 
    imageId: "book-think-again",
    amazonLink: "https://www.amazon.com/s?k=Think+Again+Adam+Grant"
  },
  { 
    title: "Surrounded by Idiots", 
    author: "Thomas Erikson", 
    category: "growth", 
    imageId: "book-surrounded-idiots",
    amazonLink: "https://www.amazon.com/s?k=Surrounded+by+Idiots+Thomas+Erikson"
  },
  { 
    title: "The Diary of a CEO", 
    author: "Steven Bartlett", 
    category: "growth", 
    imageId: "book-diary-ceo",
    amazonLink: "https://www.amazon.com/s?k=The+Diary+of+a+CEO+Steven+Bartlett"
  },
  { 
    title: "The courage to be disliked", 
    author: "Ichiro Kishimi", 
    category: "growth", 
    imageId: "book-courage-disliked",
    amazonLink: "https://www.amazon.com/s?k=The+courage+to+be+disliked+Ichiro+Kishimi"
  },
  { 
    title: "Man's Search for Meaning", 
    author: "Viktor Frankl", 
    category: "growth", 
    imageId: "book-search-meaning",
    amazonLink: "https://www.amazon.com/s?k=Man%27s+Search+for+Meaning+Viktor+Frankl"
  },
  { 
    title: "Pragmatic Thinking and Learning", 
    author: "Andy Hunt", 
    category: "growth", 
    imageId: "book-pragmatic-thinking",
    amazonLink: "https://www.amazon.com/s?k=Pragmatic+Thinking+and+Learning+Andy+Hunt"
  },
  { 
    title: "Zero to One", 
    author: "Peter Thiel", 
    category: "growth", 
    imageId: "book-zero-to-one",
    amazonLink: "https://www.amazon.com/s?k=Zero+to+One+Peter+Thiel"
  },
  { 
    title: "Blitzscaling", 
    author: "Reid Hoffman", 
    category: "growth", 
    imageId: "book-blitzscaling",
    amazonLink: "https://www.amazon.com/s?k=Blitzscaling+Reid+Hoffman"
  },
  { 
    title: "Unlocking Hypergrowth", 
    author: "Frank Slootman", 
    category: "growth", 
    imageId: "book-unlocking-hypergrowth",
    amazonLink: "https://www.amazon.com/s?k=Unlocking+Hypergrowth+Frank+Slootman"
  },
  { 
    title: "Manifest", 
    author: "Roxie Nafousi", 
    category: "growth", 
    imageId: "book-manifest",
    amazonLink: "https://www.amazon.com/s?k=Manifest+Roxie+Nafousi"
  },
  { 
    title: "The Book of Clarity", 
    author: "Paras Chopra", 
    category: "growth", 
    imageId: "book-clarity-paras",
    amazonLink: "https://www.amazon.com/s?k=The+Book+of+Clarity+Paras+Chopra"
  },

  // Imagination
  { 
    title: "Project Hail Mary", 
    author: "Andy Weir", 
    category: "imagination", 
    imageId: "book-project-hail-mary",
    amazonLink: "https://www.amazon.com/s?k=Project+Hail+Mary+Andy+Weir"
  },
  { 
    title: "The Three-Body Problem", 
    author: "Cixin Liu", 
    category: "imagination", 
    imageId: "book-three-body",
    amazonLink: "https://www.amazon.com/s?k=The+Three-Body+Problem+Cixin+Liu"
  },
  { 
    title: "Sum: Forty Tales from the Afterlives", 
    author: "David Eagleman", 
    category: "imagination", 
    imageId: "book-sum-afterlives",
    amazonLink: "https://www.amazon.com/s?k=Sum+Forty+Tales+from+the+Afterlives+David+Eagleman"
  },
];

function BookCard({ book }: { book: Book }) {
  const image = PlaceHolderImages.find(p => p.id === book.imageId);
  
  return (
    <a 
      href={book.amazonLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center gap-4 cursor-pointer no-underline block"
    >
      {/* 3D-ish Book Container */}
      <div className="relative aspect-[2/3] w-full perspective-[1000px]">
        <div className={cn(
            "relative h-full w-full overflow-hidden rounded-[4px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "group-hover:-translate-y-4 group-hover:rotate-y-[-20deg] group-hover:shadow-[20px_40px_60px_rgba(0,0,0,0.4)]",
            "border-l-[12px] border-l-primary/10 ring-1 ring-border shadow-[0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
        )}>
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            )}
            {/* The Spine Glow - Using Primary for theme awareness */}
            <div className="absolute inset-y-0 left-0 w-[12px] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent z-10" />
            
            {/* Glassy Finish Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>

      <div className="w-full text-center sm:text-left transition-all duration-300 group-hover:translate-x-1">
        <h3 className="line-clamp-2 text-xs font-black tracking-tight text-foreground/90 uppercase h-8">{book.title}</h3>
        <p className="line-clamp-1 text-[10px] text-muted-foreground font-mono uppercase opacity-60 mt-1">{book.author}</p>
      </div>
    </a>
  );
}

function SectionShelf({ title, icon: Icon, books }: { title: string, icon: any, books: Book[] }) {
    return (
        <section className="mb-24 relative">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">{title}</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 relative z-10">
                {books.map((book) => (
                    <BookCard key={book.title} book={book} />
                ))}
            </div>

            {/* The Architectural Shelf Line */}
            <div className="absolute bottom-[-20px] left-0 right-0 h-px bg-border/40 rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shine" />
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
      <main className="flex-1 relative z-10 pt-8 md:pt-10">
        <div className="container max-w-7xl pb-12 md:pb-20">
          <div className="mb-8 md:mb-12 flex justify-start">
            <Button asChild variant="ghost" className="-ml-4 hover:bg-primary/5 group rounded-full px-6 transition-all duration-300">
              <Link href="/#about">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return to About
              </Link>
            </Button>
          </div>

          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
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
             <p className="text-xs text-muted-foreground/40 mt-4 lora italic">More pages waiting to be turned...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
