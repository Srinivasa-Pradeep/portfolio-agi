'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Search, Command, Star, Send, CornerDownLeft, Library, Wind, Gamepad2, Activity } from 'lucide-react';
import AtSignIcon from './icons/at-sign-icon';
import BookIcon from './icons/book-icon';
import CodeXmlIcon from './icons/code-xml-icon';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
    { id: 'about', label: 'About', icon: AtSignIcon, shortcut: 'A', href: '#about' },
    { id: 'blogs', label: 'Blogs', icon: BookIcon, shortcut: 'B', href: '#blogs' },
    { id: 'leetcode', label: 'LeetCode', icon: CodeXmlIcon, shortcut: 'L', href: '#leetcode' },
    { id: 'projects', label: 'Projects', icon: Star, shortcut: 'P', href: '#projects' },
    { id: 'contact', label: 'Contact', icon: Send, shortcut: 'C', href: '#contact' },
    { id: 'books', label: 'Volumes (Library)', icon: Library, shortcut: 'V', href: '/books' },
    { id: 'zen', label: 'Zen Mode', icon: Wind, shortcut: 'O', href: '/zen' },
    { id: 'tracker', label: 'Tracker', icon: Activity, shortcut: 'T', href: '/tracker' },
    { id: 'dino-game-container', label: 'Play Dino', icon: Gamepad2, shortcut: 'D', href: '#dino-game-container' },
    { id: 'liz', label: 'Talk with Liz', icon: Command, shortcut: 'Z', href: 'trigger-liz' },
];

export function HeroCommandBar() {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [showLanding, setShowLanding] = useState(false); 
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 350 };
    const translateX = useSpring(mouseX, springConfig);
    const translateY = useSpring(mouseY, springConfig);

    const filteredLinks = useMemo(() => 
        navLinks.filter(link => 
            link.label.toLowerCase().includes(search.toLowerCase())
        ), [search]
    );

    useEffect(() => {
        const handleLandingDone = () => {
            setShowLanding(true);
        };
        window.addEventListener('landing-done', handleLandingDone);
        return () => window.removeEventListener('landing-done', handleLandingDone);
    }, []);

    useEffect(() => {
        setShowLanding(true);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            root.style.overflow = 'hidden';
            window.dispatchEvent(new CustomEvent('palette-open'));
        } else {
            document.body.style.overflow = '';
            root.style.overflow = '';
            window.dispatchEvent(new CustomEvent('palette-close'));
        }
        return () => {
            document.body.style.overflow = '';
            root.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const togglePalette = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        setMousePos({ x: localX, y: localY });

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distanceX = localX - centerX;
        const distanceY = localY - centerY;
        
        mouseX.set(distanceX * 0.08); 
        mouseY.set(distanceY * 0.12);
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleAction = useCallback((item: typeof navLinks[0]) => {
        setIsOpen(false);
        if (item.id === 'liz') {
            window.dispatchEvent(new CustomEvent('open-liz'));
        } else if (item.href.startsWith('/')) {
            router.push(item.href);
        } else {
            const element = document.getElementById(item.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                togglePalette();
                return;
            }

            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredLinks.length);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredLinks.length) % filteredLinks.length);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredLinks[selectedIndex]) {
                        handleAction(filteredLinks[selectedIndex]);
                    }
                } else {
                    const key = e.key.toUpperCase();
                    const item = navLinks.find(link => link.shortcut === key);
                    if (item) {
                        e.preventDefault();
                        handleAction(item);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, togglePalette, filteredLinks, selectedIndex, handleAction]);

    return (
        <>
            <motion.div 
                ref={containerRef}
                onClick={togglePalette}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                style={{ x: translateX, y: translateY }}
                className="group relative p-[1px] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.04)] active:scale-[0.98]"
            >
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.4), transparent 40%)`
                    }}
                />
                
                <div className="relative z-10 flex items-center w-full bg-secondary/30 backdrop-blur-xl border border-border/40 h-14 rounded-full px-6 cursor-pointer transition-all duration-300 group-hover:bg-secondary/50 group-hover:border-transparent">
                    <div className="relative flex items-center justify-center">
                        <AnimatePresence>
                            {showLanding && (
                                <motion.div
                                    key={`landing-ring-${theme}`}
                                    initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
                                    animate={{ rotate: 360, opacity: [0, 1, 1, 0], scale: [0.8, 1.1, 1] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.2, ease: "easeInOut" }}
                                    onAnimationComplete={() => setShowLanding(false)}
                                    className="absolute inset-[-9px] rounded-full z-0"
                                    style={{
                                        background: "conic-gradient(from 0deg, transparent, #4285F4 25%, #EA4335 50%, #FBBC05 75%, #34A853 100%)",
                                        WebkitMaskImage: 'radial-gradient(circle, transparent 65%, black 66%)',
                                        maskImage: 'radial-gradient(circle, transparent 65%, black 66%)',
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
                    </div>
                    
                    <span className="ml-4 text-muted-foreground/60 font-medium group-hover:text-muted-foreground transition-colors">Search anything...</span>
                    
                    <div className="ml-auto flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                        <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded-sm border bg-muted px-2 font-mono text-[10px] font-bold">
                            <span className="text-xs">⌘</span>
                            <CornerDownLeft className="h-2.5 w-2.5" />
                        </kbd>
                    </div>
                </div>
            </motion.div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent 
                    data-lenis-prevent 
                    className="sm:max-w-[550px] p-0 gap-0 border-none bg-background/80 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-[32px] no-cursor"
                >
                    <DialogHeader className="p-4 border-b border-border/20">
                        <DialogTitle className="sr-only">Command Palette</DialogTitle>
                        <div className="flex items-center gap-3 px-2 pr-20">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type to navigate..."
                                className="flex-1 bg-transparent border-none outline-none h-10 font-medium text-lg placeholder:text-muted-foreground/40"
                                autoFocus
                            />
                            <div className="flex items-center gap-2">
                                <kbd className="hidden sm:inline-flex h-6 items-center rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-bold text-muted-foreground">
                                    ESC
                                </kbd>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-2 overflow-hidden">
                        <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
                            Navigation
                        </div>
                        <div className="space-y-1">
                            {filteredLinks.length > 0 ? (
                                filteredLinks.map((link, index) => {
                                    const isActive = index === selectedIndex;
                                    const IconComponent = link.icon;
                                    const isAnimated = link.id === 'about' || link.id === 'blogs' || link.id === 'leetcode';

                                    return (
                                        <button
                                            key={link.id}
                                            onClick={() => handleAction(link)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={cn(
                                                "w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group text-left",
                                                isActive ? "bg-primary/10 shadow-sm" : "hover:bg-primary/5"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-10 w-10 rounded-xl flex items-center justify-center border border-border/20 transition-all",
                                                isActive ? "bg-primary text-primary-foreground" : "bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground"
                                            )}>
                                                <IconComponent 
                                                    size={20} 
                                                    className="transition-all" 
                                                    {...(isAnimated ? { active: isActive } : {})}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn(
                                                    "font-bold transition-colors",
                                                    isActive ? "text-primary" : "text-foreground/80 group-hover:text-primary"
                                                )}>{link.label}</p>
                                                <p className="text-xs text-muted-foreground opacity-60">Go to {link.id}</p>
                                            </div>
                                            <kbd className={cn(
                                                "h-7 w-7 flex items-center justify-center rounded-sm border border-border/40 bg-muted/40 font-mono text-xs font-black shadow-sm transition-all",
                                                isActive ? "border-primary/40 text-primary" : "group-hover:border-primary/40 group-hover:text-primary"
                                            )}>
                                                {link.shortcut}
                                            </kbd>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-muted-foreground text-sm">No results found for "{search}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t border-border/20 bg-muted/20 flex justify-between items-center">
                        <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                                <CornerDownLeft className="h-3 w-3" />
                                <span>Select</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs">↑↓</span>
                                <span>Move</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
