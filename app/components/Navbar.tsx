"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect, useSyncExternalStore } from "react";
import { Home, User, Briefcase, FileText, Mail, Award, Search } from "lucide-react";
import { openPalette, scrollToSection } from "../lib/actions";

const navItems = [
  { name: "Home", id: "hero", icon: Home },
  { name: "About", id: "about", icon: User },
  { name: "Experience", id: "experience", icon: Award },
  { name: "Projects", id: "projects", icon: Briefcase },
  { name: "Resume", id: "resume", icon: FileText },
  { name: "Contact", id: "contact", icon: Mail },
];

// ⌘ on Apple devices, Ctrl everywhere else (resolved on the client only)
const subscribeNoop = () => () => {};
const isApplePlatform = () => /Mac|iPhone|iPad/.test(navigator.platform);

export default function Navbar() {
  const isApple = useSyncExternalStore(subscribeNoop, isApplePlatform, () => false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // The active section is the last one whose top has crossed 40% of the viewport
      const line = window.innerHeight * 0.4;
      let current = navItems[0].id;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may be too short to cross the line
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = navItems[navItems.length - 1].id;
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#00ea64] to-[#a3e635]"
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-2 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div
          className={`flex items-center gap-0 sm:gap-1 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? "real-glass border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                  history.replaceState(null, "", `#${item.id}`);
                }}
                className={`relative flex items-center gap-2 px-2 sm:px-4 py-2 rounded-full text-[11.5px] sm:text-sm font-medium sm:tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#00ea64]/10 border border-[#00ea64]/25"
                  />
                )}
                <item.icon
                  size={14}
                  className={`relative hidden md:block transition-colors duration-300 ${
                    isActive ? "text-[#00ea64]" : "opacity-70"
                  }`}
                />
                <span className="relative">{item.name}</span>
              </a>
            );
          })}

          {/* Command palette trigger */}
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden lg:flex items-center gap-2 ml-2 px-3 h-8 rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-colors duration-300 hover:text-white hover:border-white/25 cursor-pointer"
          >
            <Search size={13} className="shrink-0" />
            <span className="text-[11px] font-medium tracking-wide whitespace-nowrap leading-none">
              {isApple ? "⌘ K" : "Ctrl K"}
            </span>
          </button>
        </div>
      </motion.nav>
    </>
  );
}
