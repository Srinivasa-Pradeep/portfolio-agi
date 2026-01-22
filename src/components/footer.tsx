import React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-sm text-muted-foreground italic transition-colors duration-300 hover:text-primary">
         Dreams won't work until you work {"<3"}
        </p>
      </div>
    </footer>
  );
}
