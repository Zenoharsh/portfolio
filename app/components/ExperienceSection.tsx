"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { experiences } from "../data/content";

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="py-24 relative z-10 max-w-4xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">& Leadership</span>
        </h2>
        <div className="h-1 w-20 bg-white/20 mt-4 rounded-full"></div>
      </div>

      <div ref={timelineRef} className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
        {/* Scroll-driven progress line */}
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute -left-px top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[#00ea64] via-[#00ea64] to-[#a3e635] shadow-[0_0_12px_rgba(0,234,100,0.6)]"
        />
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group/exp relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 group-hover/exp:bg-[#00ea64] group-hover/exp:scale-150 group-hover/exp:shadow-[0_0_14px_rgba(0,234,100,0.9)]" />

            <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">{exp.role}</h3>
                <h4 className="text-sm md:text-base font-medium text-white/70 mt-1">{exp.company}</h4>
              </div>
              <div className="mt-2 md:mt-0 text-left md:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/60 tracking-wider uppercase">
                  {exp.date}
                </span>
                <div className="text-xs text-white/60 mt-2">{exp.location}</div>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mt-4">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
