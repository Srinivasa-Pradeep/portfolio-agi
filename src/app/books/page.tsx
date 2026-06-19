
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Library, Binary, Brain, Sparkles, GripVertical } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Reorder, useDragControls } from 'framer-motion';

/**
 * @fileOverview The Personal Library - Reorderable architectural rack.
 * Adjusted visuals to ensure covers are not obscured by borders.
 */

interface Book {
  id: string;
  title: string;
  author: string;
  category: 'logic' | 'growth' | 'imagination';
  imageId: string;
  amazonLink: string;
}

const initialBookCollection: Book[] = [
  // Logic (Tech & Systems)
  { 
    id: "logic-1",
    title: "Designing Data-Intensive Applications", 
    author: "Martin Kleppmann", 
    category: "logic", 
    imageId: "book-ddia",
    amazonLink: "https://www.amazon.com/s?k=Designing+Data-Intensive+Applications+Martin+Kleppmann"
  },
  { 
    id: "logic-2",
    title: "Database Internals", 
    author: "Alex Petrov", 
    category: "logic", 
    imageId: "book-db-internals",
    amazonLink: "https://www.amazon.com/s?k=Database+Internals+Alex+Petrov"
  },
  { 
    id: "logic-3",
    title: "Building Microservices", 
    author: "Sam Newman", 
    category: "logic", 
    imageId: "book-microservices",
    amazonLink: "https://www.amazon.com/s?k=Building+Microservices+Sam+Newman"
  },
  { 
    id: "logic-4",
    title: "Programming Pearls", 
    author: "Jon Bentley", 
    category: "logic", 
    imageId: "book-programming-pearls",
    amazonLink: "https://www.amazon.com/s?k=Programming+Pearls+Jon+Bentley"
  },
  { 
    id: "logic-5",
    title: "Clean Code", 
    author: "Robert C. Martin", 
    category: "logic", 
    imageId: "book-clean-code",
    amazonLink: "https://www.amazon.com/s?k=Clean+Code+Robert+C.+Martin"
  },
  { 
    id: "logic-6",
    title: "The Pragmatic Programmer", 
    author: "Andrew Hunt & David Thomas", 
    category: "logic", 
    imageId: "book-pragmatic-programmer",
    amazonLink: "https://www.amazon.com/s?k=The+Pragmatic+Programmer+Andrew+Hunt"
  },
  { 
    id: "logic-7",
    title: "The Joys of Hashing", 
    author: "Thomas Mailund", 
    category: "logic", 
    imageId: "book-joys-hashing",
    amazonLink: "https://www.amazon.com/s?k=The+Joys+of+Hashing+Thomas+Mailund"
  },
  { 
    id: "logic-10",
    title: "Introduction To Information Retrieval", 
    author: "Christopher Manning", 
    category: "logic", 
    imageId: "book-info-retrieval",
    amazonLink: "https://www.amazon.com/s?k=Introduction+To+Information+Retrieval+Christopher+Manning"
  },
  
  // Growth (Mindset & Business)
  { 
    id: "growth-1",
    title: "Clear Thinking", 
    author: "Shane Parrish", 
    category: "growth", 
    imageId: "book-clear-thinking",
    amazonLink: "https://www.amazon.com/s?k=Clear+Thinking+Shane+Parrish"
  },
  { 
    id: "growth-2",
    title: "Atomic Habits", 
    author: "James Clear", 
    category: "growth", 
    imageId: "book-atomic-habits",
    amazonLink: "https://www.amazon.com/s?k=Atomic+Habits+James+Clear"
  },
  { 
    id: "growth-3",
    title: "Deep Work", 
    author: "Cal Newport", 
    category: "growth", 
    imageId: "book-deep-work",
    amazonLink: "https://www.amazon.com/s?k=Deep+Work+Cal+Newport"
  },
  { 
    id: "growth-4",
    title: "Think Again", 
    author: "Adam Grant", 
    category: "growth", 
    imageId: "book-think-again",
    amazonLink: "https://www.amazon.com/s?k=Think+Again+Adam+Grant"
  },
  { 
    id: "growth-5",
    title: "Manifest", 
    author: "Roxie Nafousi", 
    category: "growth", 
    imageId: "book-manifest",
    amazonLink: "https://www.amazon.com/s?k=Manifest+Roxie+Nafousi"
  },
  { 
    id: "growth-6",
    title: "Surrounded by Idiots", 
    author: "Thomas Erikson", 
    category: "growth", 
    imageId: "book-surrounded-idiots",
    amazonLink: "https://www.amazon.com/s?k=Surrounded+by+Idiots+Thomas+Erikson"
  },
  { 
    id: "growth-7",
    title: "The Diary of a CEO", 
    author: "Steven Bartlett", 
    category: "growth", 
    imageId: "book-diary-ceo",
    amazonLink: "https://www.amazon.com/s?k=The+Diary+of+a+CEO+Steven+Bartlett"
  },
  { 
    id: "growth-8",
    title: "The Book of Clarity", 
    author: "Paras Chopra", 
    category: "growth", 
    imageId: "book-clarity-paras",
    amazonLink: "https://www.amazon.com/s?k=The+Book+of+Clarity+Paras+Chopra"
  },
  { 
    id: "growth-9",
    title: "Zero to One", 
    author: "Peter Thiel", 
    category: "growth", 
    imageId: "book-zero-to-one",
    amazonLink: "https://www.amazon.com/s?k=Zero+to+One+Peter+Thiel"
  },
  { 
    id: "growth-10",
    title: "Unlocking Hypergrowth", 
    author: "Frank Slootman", 
    category: "growth", 
    imageId: "book-unlocking-hypergrowth",
    amazonLink: "https://www.amazon.com/s?k=Unlocking+Hypergrowth+Frank+Slootman"
  },
  { 
    id: "growth-11",
    title: "The courage to be disliked", 
    author: "Ichiro Kishimi", 
    category: "growth", 
    imageId: "book-courage-disliked",
    amazonLink: "https://www.amazon.com/s?k=The+courage+to+be+disliked+Ichiro+Kishimi"
  },
  { 
    id: "growth-12",
    title: "Pragmatic Thinking and Learning", 
    author: "Andy Hunt", 
    category: "growth", 
    imageId: "book-pragmatic-thinking",
    amazonLink: "https://www.amazon.com/s?k=Pragmatic+Thinking+and+Learning+Andy+Hunt"
  },
  { 
    id: "growth-13",
    title: "Blitzscaling", 
    author: "Reid Hoffman", 
    category: "growth", 
    imageId: "book-blitzscaling",
    amazonLink: "https://www.amazon.com/s?k=Blitzscaling+Reid+Hoffman"
  },
  { 
    id: "growth-14",
    title: "Mindset", 
    author: "Dr. Carol S. Dweck", 
    category: "growth", 
    imageId: "book-mindset",
    amazonLink: "https://www.amazon.com/s?k=Mindset+Dr+Carol+Dweck"
  },

  // Imagination
  { 
    id: "imagination-1",
    title: "Project Hail Mary", 
    author: "Andy Weir", 
    category: "imagination", 
    imageId: "book-project-hail-mary",
    amazonLink: "https://www.amazon.com/s?k=Project+Hail+Mary+Andy+Weir"
  },
  { 
    id: "imagination-2",
    title: "The Three-Body Problem", 
    author: "Cixin Liu", 
    category: "imagination", 
    imageId: "book-three-body",
    amazonLink: "https://www.amazon.com/s?k=The+Three-Body+Problem+Cixin+Liu"
  },
  { 
    id: "imagination-3",
    title: "Sum: Forty Tales from the Afterlives", 
    author: "David Eagleman", 
    category: "imagination", 
    imageId: "book-sum-afterlives",
    amazonLink: "https://www.amazon.com/s?k=Sum+Forty+Tales+from+the+Afterlives+David+Eagleman"
  },
];

function BookCard({ book }: { book: Book }) {
  const image = PlaceHolderImages.find(p => p.id === book.imageId);
  const controls = useDragControls();
  
  return (
    <Reorder.Item
      value={book}
      dragListener={false}
      dragControls={controls}
      className="group relative flex flex-col items-center gap-4 cursor-grab active:cursor-grabbing no-underline"
    >
      {/* 3D Book Container */}
      <div className="relative aspect-[2/3] w-full perspective-[1000px]">
        <div className={cn(
            "relative h-full w-full overflow-hidden rounded-[4px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "group-hover:-translate-y-4 group-hover:rotate-y-[-15deg] group-hover:shadow-[20px_40px_60px_rgba(0,0,0,0.3)]",
            "ring-1 ring-border/30 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:ring-white/5 dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
        )}>
            {/* Minimalist Spine Detail - Does not cover the face */}
            <div className="absolute inset-y-0 left-0 w-2 bg-black/10 dark:bg-white/5 z-20 pointer-events-none" />
            
            <div className="relative h-full w-full bg-muted">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Drag Handle */}
        <div 
          onPointerDown={(e) => controls.start(e)}
          className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>

      <a 
        href={book.amazonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center sm:text-left transition-all duration-300 group-hover:translate-x-1"
      >
        <h3 className="line-clamp-2 text-[10px] sm:text-xs font-black tracking-tight text-foreground/80 uppercase h-8">{book.title}</h3>
        <p className="line-clamp-1 text-[8px] sm:text-[10px] text-muted-foreground font-mono uppercase opacity-50 mt-1">{book.author}</p>
      </a>
    </Reorder.Item>
  );
}

function SectionShelf({ title, icon: Icon, items, setItems }: { title: string, icon: any, items: Book[], setItems: (items: Book[]) => void }) {
    return (
        <section className="mb-24 relative">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic">{title}</h2>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-mono tracking-widest mt-1 opacity-50">Drag the handle to rearrange</p>
                </div>
            </div>

            <Reorder.Group 
              axis="x" 
              values={items} 
              onReorder={setItems}
              className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 relative z-10"
            >
                {items.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </Reorder.Group>

            {/* The Shelf Line */}
            <div className="absolute bottom-[-20px] left-0 right-0 h-px bg-border/30 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shine" />
            </div>
        </section>
    );
}

export default function BooksPage() {
  const [logicBooks, setLogicBooks] = useState(initialBookCollection.filter(b => b.category === 'logic'));
  const [growthBooks, setGrowthBooks] = useState(initialBookCollection.filter(b => b.category === 'growth'));
  const [imaginationBooks, setImaginationBooks] = useState(initialBookCollection.filter(b => b.category === 'imagination'));

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-x-hidden">
      {/* Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
      </div>

      <Header />
      <main className="flex-1 relative z-10 pt-6 md:pt-8">
        <div className="container max-w-7xl pb-12 md:pb-20">
          <div className="mb-6 md:mb-8 flex justify-start">
            <Button asChild variant="ghost" className="-ml-4 hover:bg-primary/5 group rounded-full px-6 transition-all duration-300">
              <Link href="/#about">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Return to About
              </Link>
            </Button>
          </div>

          <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 shadow-inner group overflow-hidden">
                <Library className="h-7 w-7 text-primary animate-pulse" />
            </div>
            <h1 className="font-headline text-5xl font-black tracking-tighter text-primary md:text-7xl italic uppercase">
              Volumes.
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground lora italic leading-relaxed px-4">
              "A reader lives a thousand lives before he dies."
            </p>
          </div>

          <SectionShelf 
            title="Logic & Systems" 
            icon={Binary} 
            items={logicBooks}
            setItems={setLogicBooks}
          />

          <SectionShelf 
            title="Philosophy & Growth" 
            icon={Brain} 
            items={growthBooks}
            setItems={setGrowthBooks}
          />

          <SectionShelf 
            title="Imagination" 
            icon={Sparkles} 
            items={imaginationBooks}
            setItems={setImaginationBooks}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
