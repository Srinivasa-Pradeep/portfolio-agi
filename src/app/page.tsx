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
      {/* Unified Persistent Background with Cinematic Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform transform-gpu">
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.03),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--primary)/0.03),transparent_40%)]" />
        
        {/* Consistent Grid Pattern */}
        <div
          className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20"
        />

        {/* Cinematic Viewport Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background)/0.4)_100%)]" />
      </div>

      {/* DYNAMIC BOTTOM VIEWPORT BLUR - Only hides at rock bottom */}
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
