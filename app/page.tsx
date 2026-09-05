import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
import AnimatedSection from "./components/AnimatedSection";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-transparent overflow-x-hidden pt-20">
      {/* ─── Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 px-6 lg:px-12 xl:px-20 py-6 overflow-y-auto relative z-10">
        {/* Floating Top Navbar */}
        <Navbar />

        {/* Content container */}
        <div className="flex-1 w-full max-w-[1400px] mx-auto">
          <HeroSection />
          
          <AnimatedSection delay={0.1}>
            <AboutSection />
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <ExperienceSection />
          </AnimatedSection>
          
          <AnimatedSection delay={0.1} className="px-0 md:px-0 lg:px-0">
            {/* We override padding here so the carousel can bleed to edges if it wants, 
                but we can keep it contained. Actually, we'll keep standard padding. */}
            <ProjectsSection />
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <ResumeSection />
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <ContactSection />
          </AnimatedSection>
        </div>

        {/* Footer */}
        <footer className="w-full max-w-[1400px] mx-auto py-8 mt-12 border-t border-white/[0.04]">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/20 tracking-wide uppercase font-medium">
            <span>© 2026 Harsh Raj</span>
            <span className="font-mono">Built with Next.js & Tailwind v4</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
