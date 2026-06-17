
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StickyNote, Plus, X, ArrowLeft, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';
import { useFirestore, useCollection } from '@/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

/**
 * @fileOverview Digital Note Wall - A physical-feeling plane for sticky notes.
 */

const NOTE_COLORS = [
  { name: 'Sandal', bg: 'bg-[#FEF9E7]', text: 'text-[#5C4A3D]', accent: 'border-[#E5D6C3]', value: 'sandal' },
  { name: 'Rose', bg: 'bg-[#FFF0F5]', text: 'text-[#4A232C]', accent: 'border-[#F1D0D7]', value: 'rose' },
  { name: 'Mint', bg: 'bg-[#F0FFF4]', text: 'text-[#1B4332]', accent: 'border-[#C6F6D5]', value: 'mint' },
  { name: 'Azure', bg: 'bg-[#F0F7FF]', text: 'text-[#1E3A5F]', accent: 'border-[#D1E9FF]', value: 'azure' },
];

function NoteCard({ note }: { note: any }) {
  const color = NOTE_COLORS.find(c => c.value === note.color) || NOTE_COLORS[0];
  const date = note.createdAt?.toDate ? format(note.createdAt.toDate(), 'MMM d, yyyy') : 'Just now';

  return (
    <div 
      className={cn(
        "relative p-6 w-full sm:w-64 h-64 shadow-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-20 group",
        color.bg, color.accent
      )}
      style={{ transform: `rotate(${note.rotation || 0}deg)` }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-black/5 blur-sm -translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="h-full flex flex-col justify-between">
        <div className={cn("lora italic text-lg leading-relaxed line-clamp-6", color.text)}>
          "{note.content}"
        </div>
        
        <div className="pt-4 border-t border-black/5">
          <p className={cn("text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5", color.text)}>
            {note.author || 'Anonymous'}
          </p>
          <p className={cn("text-[9px] font-mono opacity-40 uppercase", color.text)}>
            {date}
          </p>
        </div>
      </div>

      {/* Dog-ear fold effect */}
      <div className={cn("absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-black/5 to-transparent pointer-events-none")} />
    </div>
  );
}

export default function NotesPage() {
  const firestore = useFirestore();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'notes'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: notes, loading } = useCollection(notesQuery);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'notes'), {
        content: content.trim(),
        author: author.trim() || 'Anonymous Traveler',
        color: selectedColor,
        rotation: Math.floor(Math.random() * 8) - 4, // Random slight tilt
        createdAt: serverTimestamp(),
      });
      setIsOpen(false);
      setContent('');
      setAuthor('');
      setSelectedColor(NOTE_COLORS[0].value);
    } catch (err) {
      console.error("Failed to stick note:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5] dark:bg-[#0A0A0A] relative overflow-x-hidden selection:bg-primary/20">
      {/* Texture Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')]" />

      <Header />
      
      <main className="flex-1 relative z-10 pt-24 pb-20">
        <div className="container max-w-7xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Button asChild variant="ghost" className="-ml-4 hover:bg-primary/5 group rounded-full px-6 transition-all duration-300">
                <Link href="/#contact">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Return to Pit
                </Link>
              </Button>
              <h1 className="mt-6 font-headline text-5xl font-black tracking-tighter text-primary md:text-7xl uppercase italic">
                The Note Wall.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground lora italic leading-relaxed">
                "Leave a thought, a lesson, or just say hello. This wall belongs to everyone who passes through."
              </p>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-16 px-8 rounded-[24px] font-black italic tracking-tight shadow-xl group overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-3">
                    STiCK A NOTE
                    <Plus className="h-6 w-6 transition-transform group-hover:rotate-90" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px] rounded-[32px] border-none bg-card p-0 overflow-hidden shadow-2xl">
                <div className="p-8">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black italic tracking-tighter uppercase">Stick Your Thought</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleAddNote} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Message</Label>
                      <Textarea 
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something soulful..."
                        className="min-h-[120px] bg-secondary/30 border-none rounded-2xl lora italic text-lg"
                        maxLength={280}
                      />
                      <p className="text-[9px] text-right font-mono opacity-40">{content.length}/280</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Your Name</Label>
                      <Input 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Anonymous (Optional)"
                        className="bg-secondary/30 border-none rounded-xl font-medium"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Select Shade</Label>
                      <div className="flex gap-3">
                        {NOTE_COLORS.map((c) => (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => setSelectedColor(c.value)}
                            className={cn(
                              "h-10 w-10 rounded-full border-2 transition-all duration-300",
                              c.bg,
                              selectedColor === c.value ? "border-primary scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting || !content.trim()} className="w-full h-14 rounded-2xl font-black italic uppercase">
                      {isSubmitting ? 'Sticking...' : 'Stick to Wall'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-64 bg-secondary/20 animate-pulse rounded-sm border border-border/10" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 items-start">
              {notes?.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
              
              {notes?.length === 0 && (
                <div className="col-span-full py-32 text-center">
                  <div className="inline-flex items-center justify-center p-6 rounded-full bg-primary/5 mb-6">
                    <Sparkles className="h-10 w-10 text-primary opacity-20 animate-pulse" />
                  </div>
                  <p className="text-muted-foreground lora italic text-xl">The wall is waiting for its first thought...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
