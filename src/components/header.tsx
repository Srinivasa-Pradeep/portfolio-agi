'use client';

import { cn } from '@/lib/utils';
import { Menu, Home, Code, User, Send, NotebookText, Star } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MusicPlayer } from './music-player';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'blogs', label: 'Blogs', icon: NotebookText },
  { id: 'leetcode', label: 'LeetCode', icon: Code },
  { id: 'projects', label: 'Projects', icon: Star },
  { id: 'contact', label: 'Contact', icon: Send },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (pathname !== '/') {
        setActiveSection('');
        return;
      }
      
      const sections = ['hero', ...navItems.map(item => item.id)];
      let currentSection = 'hero';

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-2',
        isMobile ? 'flex-col space-y-2' : 'hidden md:flex'
      )}
    >
      <TooltipProvider>
        {navItems.map(item => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Link href={`/#${item.id}`} passHref>
                <Button
                  variant={activeSection === item.id ? 'secondary' : 'ghost'}
                  size="icon"
                  className="rounded-full"
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </nav>
  );

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'rounded-full border border-border/40 bg-background/80 shadow-lg backdrop-blur-lg'
            : ''
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 p-3">
            <Link href="/#hero" className="flex items-center gap-2" passHref>
                <Button variant={activeSection === 'hero' ? 'secondary' : 'ghost'} size="icon" className="rounded-full">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>

            <div className="hidden md:flex items-center gap-2">
                <NavLinks />
            </div>

            <div className="flex items-center gap-2">
                <MusicPlayer />
                <ThemeToggle />
                {isMounted && (
                  <div className="md:hidden">
                      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                          <SheetTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full">
                              <Menu className="h-5 w-5" />
                              </Button>
                          </SheetTrigger>
                          <SheetContent side="bottom" className="w-full rounded-t-lg">
                              <SheetHeader className="sr-only">
                                <SheetTitle>Mobile Navigation</SheetTitle>
                              </SheetHeader>
                              <div className="flex flex-col items-center justify-center p-8">
                                  <NavLinks isMobile={true} />
                              </div>
                          </SheetContent>
                      </Sheet>
                  </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}
