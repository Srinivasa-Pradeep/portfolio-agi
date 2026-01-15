'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

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
  }, []);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-1',
        isMobile ? 'flex-col space-y-4 pt-8' : 'hidden md:flex'
      )}
    >
      {navItems.map((item) => (
        <Link href={`#${item.id}`} key={item.id} passHref>
          <Button
            variant="ghost"
            className={cn(
              'rounded-full px-4 transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              activeSection === item.id
                ? 'bg-secondary text-secondary-foreground font-semibold'
                : '',
              isMobile ? 'w-full text-lg' : ''
            )}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="#hero" className="flex items-center gap-2" passHref>
          <span className="text-xl font-bold font-headline tracking-wider text-primary">
            Srini
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLinks />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
                <div className="flex flex-col items-center justify-center h-full">
                    <NavLinks isMobile={true} />
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
