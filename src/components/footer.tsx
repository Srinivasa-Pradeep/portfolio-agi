import React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Srini. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground italic">
          "Dreams won't work until you work"
        </p>
        <p className="text-sm text-muted-foreground">
          Built with <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4 hover:text-primary">Next.js</a> and love.
        </p>
      </div>
    </footer>
  );
}
