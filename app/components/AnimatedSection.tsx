"use client";

import { motion } from "framer-motion";

export default function AnimatedSection({ 
  children, 
  id, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-[2.5rem] real-glass border border-white/10 p-8 md:p-12 lg:p-16 mb-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden ${className}`}
    >
      {/* Subtle top inner highlight for premium glass effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      
      {/* Subtle radial glow inside the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}
