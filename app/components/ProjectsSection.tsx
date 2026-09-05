"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { projects, skills, type Project } from "../data/content";

function GithubIcon({ size = 17, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ─── Carousel Project Card ─── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`project-${project.id}`}
      className="
        group relative block rounded-3xl overflow-hidden w-full h-full min-h-[450px]
        border border-white/[0.08] real-glass
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-white/20 hover:bg-white/10
        hover:shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        hover:-translate-y-1
      "
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full p-2 flex flex-col">
        {/* Inner rounded container for the media */}
        <div 
          className="relative w-full h-full rounded-2xl overflow-hidden bg-white/5 flex-1 cursor-pointer"
          onClick={() => window.open(project.href, "_blank")}
        >
          {/* Media (Video or Image) */}
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className={`
                object-cover w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isHovered ? "scale-105 opacity-40 blur-sm" : "scale-100 opacity-80"}
              `}
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`
                object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isHovered ? "scale-105 opacity-40 blur-sm" : "scale-100 opacity-80"}
              `}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          )}

          {/* Glowing subtle gradient overlaid on media */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-violet-500/10 mix-blend-overlay pointer-events-none" />

          {/* Dark gradient for text readability */}
          <div
            className={`
              absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent
              transition-opacity duration-700 pointer-events-none
              ${isHovered ? "opacity-100" : "opacity-80"}
            `}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
            <div
              className={`
                transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${isHovered ? "translate-y-0" : "translate-y-4"}
              `}
            >
              {/* Tags */}
              <div
                className={`
                  flex flex-wrap gap-2 mb-4
                  transition-all duration-500 delay-100
                  ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-white/90 tracking-wider uppercase border border-white/10 pointer-events-auto"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-3">
                {project.title}
              </h3>
              
              {/* Description fades in and slides up */}
              <p
                className={`
                  text-[14px] text-white/70 leading-relaxed max-w-lg
                  transition-all duration-700 delay-75
                  ${isHovered ? "opacity-100 translate-y-0 h-auto" : "opacity-0 translate-y-4 h-0 overflow-hidden"}
                `}
              >
                {project.description}
              </p>

              {/* External Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div 
                  className={`
                    flex gap-3 mt-5 pointer-events-auto
                    transition-all duration-700 delay-150
                    ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                >
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                      title="View Source on GitHub"
                    >
                      <GithubIcon size={16} className="text-white/90" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                      title="View Live Site"
                    >
                      <Globe size={16} className="text-white/90" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Floating Action Arrow */}
          <div className="absolute top-6 right-6 pointer-events-none">
            <span
              className={`
                flex items-center justify-center
                h-12 w-12 rounded-full
                bg-white/10 backdrop-blur-xl border border-white/20
                transition-all duration-500 ease-out
                ${isHovered ? "bg-white text-black scale-100 shadow-[0_0_30px_rgba(255,255,255,0.3)] rotate-45" : "text-white scale-90 rotate-0"}
              `}
            >
              <ArrowUpRight
                size={22}
                strokeWidth={2}
                className="transition-transform duration-300"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function ProjectsSection() {
  const [activeTag, setActiveTag] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      
      const isScrollingRight = e.deltaY > 0;
      const isScrollingLeft = e.deltaY < 0;
      
      const atLeftEdge = el.scrollLeft === 0;
      const atRightEdge = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
      
      if ((isScrollingRight && !atRightEdge) || (isScrollingLeft && !atLeftEdge)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const filteredProjects =
    activeTag === "all"
      ? projects
      : projects.filter((p) => p.filterIds.includes(activeTag));

  return (
    <div className="mt-16 mb-20 w-full overflow-hidden">
      {/* ─── Skill Tags ─── */}
      <div id="skill-tags" className="flex flex-wrap items-center gap-2.5 mb-10">
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
                    ? "bg-white/10 border-white/20 text-white/90 shadow-[0_0_20px_rgba(255,255,255,0.08)] scale-105"
                    : "bg-white/[0.03] border-white/[0.07] text-white/60 hover:bg-white/[0.06] hover:border-white/15 hover:text-white/80"
                }
              `}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/15 via-transparent to-transparent opacity-50 pointer-events-none" />
              )}
              <span className="relative pointer-events-none">{label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── Horizontal Carousel ─── */}
      <section id="projects" className="relative w-full">
        {filteredProjects.length > 0 ? (
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 hide-scrollbar"
          >
            {filteredProjects.map((project, i) => (
              <div 
                key={project.id} 
                className="w-[85vw] sm:w-[500px] shrink-0 snap-center first:ml-0 last:mr-0"
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[400px] rounded-3xl border border-dashed border-white/20 bg-white/[0.02]">
            <p className="text-sm font-medium tracking-wider text-white/50 uppercase">No projects match this filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}
