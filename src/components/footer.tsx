'use client';

import React from 'react';
import { BlurRevealText } from './blur-reveal-text';
import Link from 'next/link';

const quotes = [
  "\"Man is made by his belief. As he believes, so he is.\"",
  "\"You make your own luck if you stay at it long enough.\"",
  "\"Dreams won't work until you work\"",
  "\"It is better to live your own destiny imperfectly then to live an imitation of somebody else's life with perfection.\""
];

export function Footer() {
  return (
    <footer className="border-t h-24 relative overflow-hidden">
      <div className="container relative h-full flex items-center justify-center">
        {/* Premium Quoted Place - Absolute Center */}
        <div className="flex items-center justify-center max-w-[80%] md:max-w-2xl">
          <BlurRevealText 
            words={quotes}
            interval={6000}
            className="text-xs sm:text-sm text-muted-foreground italic font-lora text-center tracking-wide"
          />
        </div>

        {/* Subtle Branding - Floating Right (Easter Egg Portal) */}
        <div className="absolute right-0 hidden lg:block opacity-20 transition-all duration-500 hover:opacity-100">
           <Link 
            href="/journey" 
            className="text-xs font-signature text-primary !cursor-none select-none"
           >
            Srini
           </Link>
        </div>
      </div>
    </footer>
  );
}
