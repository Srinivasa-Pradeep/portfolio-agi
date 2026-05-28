import { Header } from '@/components/header';
import { About } from '@/components/sections/about';
import { Blogs } from '@/components/sections/blogs';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { LeetCode } from '@/components/sections/leetcode';
import { Projects } from '@/components/sections/projects';
import { Footer } from '@/components/footer';
import { BottomBlurOverlay } from '@/components/bottom-blur-overlay';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-x-hidden">
      {/* Optimized Persistent Background - Consolidated into a single GPU-accelerated layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu will-change-transform">
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle radial glow - Simplified */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />
        
        {/* Static Grid Pattern - Optimized for performance */}
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-[0.1]"
        />
      </div>

      <BottomBlurOverlay />

      <Header />
      <main className="flex-1 relative z-10 transform-gpu">
        <Hero />
        <div className="space-y-0">
          <About />
          <Blogs />
          <LeetCode />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
