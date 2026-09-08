"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, skills, type Project } from "../data/content";
import { motion, AnimatePresence } from "framer-motion";

function GithubIcon({ size = 17, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSection() {
  const [activeTag, setActiveTag] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const filteredProjects = activeTag === "all"
    ? projects
    : projects.filter((p) => p.filterIds.includes(activeTag));

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTag]);

  // Auto-play interval (7 seconds)
  useEffect(() => {
    if (filteredProjects.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [filteredProjects.length, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredProjects.length <= 1) return;
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects.length]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);

  const activeProject = filteredProjects[currentIndex];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-16 mb-20 w-full"
    >
      {/* ─── Skill Tags ─── */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10 px-4 md:px-0">
        {skills.map(({ label, id }) => {
          const isActive = activeTag === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTag(id)}
              className={`
                relative px-6 py-3 rounded-full text-[13px] font-medium tracking-wide
                border transition-all duration-500 ease-out cursor-pointer
                ${
                  isActive
                    ? "bg-[#00ea64]/10 border-[#00ea64]/30 text-[#00ea64] shadow-[0_0_20px_rgba(0,234,100,0.1)] scale-105"
                    : "bg-white/[0.03] border-white/[0.07] text-white/60 hover:bg-white/[0.06] hover:border-white/15 hover:text-white/80"
                }
              `}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ea64]/20 via-[#00ea64]/5 to-transparent opacity-50 pointer-events-none" />
              )}
              <span className="relative pointer-events-none">{label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── The Showcase Container ─── */}
      {filteredProjects.length > 0 ? (
        <div 
          className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)] border border-white/10"
          style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.2)", 
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            transform: "translateZ(0)" // Chrome bug fix
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top highlight line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 z-20" />

          <div className="relative min-h-[70vh] flex flex-col lg:flex-row">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col lg:flex-row w-full h-full"
              >
                {/* LEFT SIDE: Media */}
                <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-full bg-black/40 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden flex items-center justify-center">
                  {/* Blurred background copy for dynamic sizing padding */}
                  {activeProject.image && !activeProject.video && (
                    <Image 
                      src={activeProject.image} 
                      alt="" 
                      fill 
                      className="object-cover opacity-30 blur-2xl scale-110 pointer-events-none" 
                    />
                  )}
                  
                  {activeProject.video ? (
                    <video
                      src={activeProject.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="relative z-10 w-full h-full object-contain p-4 drop-shadow-2xl"
                    />
                  ) : (
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="relative z-10 object-contain p-6 md:p-12 drop-shadow-2xl"
                    />
                  )}
                </div>

                {/* RIGHT SIDE: Content */}
                <div className="relative w-full lg:w-[45%] h-full flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-[#00ea64] tracking-wider uppercase border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-6 leading-tight">
                    {activeProject.title}
                  </h3>
                  
                  <p className="text-[15px] md:text-[17px] text-white/70 leading-relaxed font-light mb-10">
                    {activeProject.description}
                  </p>

                  {/* External Links */}
                  <div className="flex flex-wrap gap-4 mt-auto lg:mt-0 relative z-20">
                    {activeProject.liveUrl && (
                      <a 
                        href={activeProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] font-medium text-[14px]"
                      >
                        <Globe size={18} />
                        Visit Live Site
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    )}
                    
                    {activeProject.githubUrl && (
                      <a 
                        href={activeProject.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/10 text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 font-medium text-[14px]"
                      >
                        <GithubIcon size={18} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls Overlay */}
          {filteredProjects.length > 1 && (
            <>
              {/* Left/Right Buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous Project"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 lg:left-[calc(55%+1rem)] top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next Project"
              >
                <ChevronRight size={24} />
              </button>

              {/* Progress Dots */}
              <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`
                      h-1.5 rounded-full transition-all duration-500 cursor-pointer
                      ${idx === currentIndex ? "w-8 bg-[#00ea64] shadow-[0_0_10px_rgba(0,234,100,0.5)]" : "w-2 bg-white/30 hover:bg-white/50"}
                    `}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[40vh] rounded-[2.5rem] border border-dashed border-white/20 bg-white/[0.02] backdrop-blur-xl">
          <p className="text-sm font-medium tracking-wider text-white/50 uppercase">No projects match this filter.</p>
        </div>
      )}
    </motion.section>
  );
}
