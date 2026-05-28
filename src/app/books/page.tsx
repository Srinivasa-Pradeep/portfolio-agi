
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const books = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    status: "reading",
    imageId: "book-pragmatic-programmer",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "read",
    imageId: "book-clean-code",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    status: "read",
    imageId: "book-atomic-habits",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    status: "read",
    imageId: "book-search-meaning",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    status: "read",
    imageId: "book-zero-to-one",
  }
];

function BookCard({ book }: { book: typeof books[0] }) {
  const image = PlaceHolderImages.find(p => p.id === book.imageId);
  
  return (
    <div className="group relative flex flex-col items-center gap-3">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-lg transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:ring-1 group-hover:ring-primary/20">
        {image && (
          <Image
            src={image.imageUrl}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="w-full text-center sm:text-left transition-all duration-300 group-hover:translate-x-1">
        <h3 className="line-clamp-1 text-sm font-bold tracking-tight text-foreground/90">{book.title}</h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">{book.author}</p>
      </div>
    </div>
  );
}

export default function BooksPage() {
  const reading = books.filter(b => b.status === 'reading');
  const read = books.filter(b => b.status === 'read');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <div className="container max-w-5xl py-12 md:py-20">
          <div className="mb-12 flex justify-start">
            <Button asChild variant="ghost" className="-ml-4 hover:bg-transparent">
              <Link href="/#about" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                About Me
              </Link>
            </Button>
          </div>

          <div className="mb-20 flex flex-col items-center text-center sm:items-start sm:text-left">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl">
              Shelf.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground lora italic">
              A curated collection of thoughts, frameworks, and stories that shaped my thinking.
            </p>
          </div>

          <section className="mb-24">
            <div className="mb-8 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold tracking-tight uppercase text-primary/80">Currently Reading</h2>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {reading.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>
            <div className="mt-12 h-px w-full bg-border/40" />
          </section>

          <section>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <h2 className="text-xl font-bold tracking-tight uppercase text-primary/80">Completed</h2>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {read.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
