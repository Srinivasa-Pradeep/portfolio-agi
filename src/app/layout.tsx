import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/custom-cursor';
import { LiveClock } from '@/components/live-clock';

export const metadata: Metadata = {
  title: 'Srini Portfolio',
  description: 'Software Engineer • Problem Solver • Builder',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <CustomCursor />
            <LiveClock />
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
