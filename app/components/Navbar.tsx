"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, User, Briefcase, FileText, Mail, Award } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Award },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Resume", href: "#resume", icon: FileText },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div
        className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? "real-glass border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[13px] sm:text-sm font-medium tracking-wide transition-all duration-300 ${
              scrolled
                ? "text-white/60 hover:text-white hover:bg-white/5"
                : "text-white/70 hover:text-white"
            }`}
          >
            <item.icon size={14} className="hidden sm:block opacity-70" />
            {item.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
