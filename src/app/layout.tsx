import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/custom-cursor';
import { LiveClock } from '@/components/live-clock';
import { MusicProvider } from '@/context/music-context';
import { SpringOverlay } from '@/components/spring-overlay';
import { ConditionalParticles } from '@/components/conditional-particles';
import { SmoothScroll } from '@/components/smooth-scroll';
import { LizChat } from '@/components/liz-chat';
import { FirebaseClientProvider } from '@/firebase';

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
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&family=Inter:wght@400;500;700&family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Mrs+Saint+Delafield&family=Poppins:wght@400;600;700&family=Tiro+Devanagari+Hindi&family=Tiro+Kannada&family=Tiro+Tamil:ital@1&family=Tiro+Telugu&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen font-body antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <MusicProvider>
              <SmoothScroll>
                <SpringOverlay />
                <ConditionalParticles />
                <CustomCursor />
                <LiveClock />
                <div className="bg-background dark:bg-transparent min-h-screen transition-colors duration-700">
                  {children}
                </div>
                <Toaster />
                <LizChat />
              </SmoothScroll>
            </MusicProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
