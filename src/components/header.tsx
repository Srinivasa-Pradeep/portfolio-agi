'use client';

import { cn } from '@/lib/utils';
import { Home, Code, User, Send, NotebookText, Star, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useRef, useMemo } from 'react';
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
import { useTheme } from 'next-themes';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'blogs', label: 'Blogs', icon: NotebookText },
  { id: 'leetcode', label: 'LeetCode', icon: Code },
  { id: 'projects', label: 'Projects', icon: Star },
  { id: 'contact', label: 'Contact', icon: Send },
];

const DOCK_MAGNIFICATION_DISTANCE = 160;
const MAX_SCALE = 1.7;

function DockItem({ 
  href, 
  icon: Icon, 
  label, 
  active, 
  mouseX, 
  isMobile = false,
  onClick
}: { 
  href: string; 
  icon: any; 
  label: string; 
  active: boolean; 
  mouseX: number | null;
  isMobile?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scale = useMemo(() => {
    if (isMobile || mouseX === null || !ref.current) return 1;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);
    
    if (distance > DOCK_MAGNIFICATION_DISTANCE) return 1;
    
    const proximity = 1 - distance / DOCK_MAGNIFICATION_DISTANCE;
    const smoothProximity = 0.5 * (1 - Math.cos(Math.PI * proximity));
    
    return 1 + (MAX_SCALE - 1) * smoothProximity;
  }, [mouseX, isMobile]);

  const content = (
    <div 
      ref={ref}
      style={{ 
        transform: `scale(${scale})`,
        transition: 'transform 450ms cubic-bezier(0.3, 1.5, 0.5, 1)',
        transformOrigin: 'bottom center'
      }}
      className="flex items-center justify-center"
    >
      <Link href={href} passHref>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'rounded-full transition-all duration-300 bg-transparent hover:bg-transparent',
            active ? 'text-primary' : 'text-muted-foreground hover:text-primary',
            !isMobile && 'active:scale-90'
          )}
          onClick={onClick}
          aria-label={label}
        >
          <Icon className={cn(
            "h-5 w-5 transition-all duration-300",
            active && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
          )} />
        </Button>
      </Link>
    </div>
  );

  if (isMobile) return content;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={20} className="dark bg-black/80 backdrop-blur-md border-border/20">
          <p className="text-primary font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 20);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!isMounted) return null;

  if (theme === 'light') {
    return (
      <div 
        className={cn(
          "fixed bottom-8 right-8 z-[110] flex items-center gap-4 transition-all duration-700 ease-in-out transform-gpu",
          isAtBottom ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
        )}
      >
        <MusicPlayer />
        <ThemeToggle />
      </div>
    );
  }

  return (
    <header 
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] px-4 transition-all duration-700 ease-in-out transform-gpu",
        isAtBottom ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
      )}
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
    >
      <div
        className={cn(
          'dark transition-all duration-300 flex items-center justify-center p-2',
          'rounded-full border border-border/20 bg-black/80 shadow-2xl backdrop-blur-xl'
        )}
      >
        <div className="flex h-14 items-center gap-2 px-2">
            <DockItem 
              href="/#hero" 
              icon={Home} 
              label="Home" 
              active={activeSection === 'hero'} 
              mouseX={mouseX} 
            />

            <div className="hidden md:flex items-center gap-2">
                {navItems.map(item => (
                  <DockItem 
                    key={item.id}
                    href={`/#${item.id}`} 
                    icon={item.icon} 
                    label={item.label} 
                    active={activeSection === item.id} 
                    mouseX={mouseX} 
                  />
                ))}
            </div>

            <div className="flex items-center gap-2 ml-1">
                <MusicPlayer />
                <ThemeToggle />
                {isMounted && (
                  <div className="md:hidden">
                      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                          <SheetTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-transparent">
                                <Menu className="h-5 w-5" />
                              </Button>
                          </SheetTrigger>
                          <SheetContent side="bottom" className="dark w-full rounded-t-lg bg-black/90 backdrop-blur-xl border-border/20">
                              <SheetHeader className="sr-only">
                                <SheetTitle>Mobile Navigation</SheetTitle>
                              </SheetHeader>
                              <div className="flex flex-col items-center justify-center p-8 gap-4">
                                  {navItems.map(item => (
                                    <DockItem 
                                      key={item.id}
                                      href={`/#${item.id}`} 
                                      icon={item.icon} 
                                      label={item.label} 
                                      active={activeSection === item.id} 
                                      mouseX={null}
                                      isMobile={true}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    />
                                  ))}
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