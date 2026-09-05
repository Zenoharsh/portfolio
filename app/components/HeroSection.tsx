import { ArrowUpRight } from "lucide-react";

/* ─── Inline brand SVG icons ─── */
function GithubIcon({ size = 17, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 17, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeetCodeIcon({ size = 17, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.497 2.337-1.497 3.814s.516 2.831 1.497 3.813l10.1 10.1c.467.467 1.111.662 1.823.662s1.356-.195 1.824-.662l2.697-2.606c.514-.515.496-1.367-.038-1.902-.534-.535-1.386-.553-1.9-.039zM20.811 11.25H10.667c-.735 0-1.333.598-1.333 1.333s.598 1.333 1.333 1.333h10.144c.735 0 1.333-.598 1.333-1.333s-.598-1.333-1.333-1.333z" />
    </svg>
  );
}

const socials = [
  { icon: GithubIcon, href: "https://github.com/Zenoharsh", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/harsh-raj-422b801a9/", label: "LinkedIn" },
  { icon: LeetCodeIcon, href: "https://leetcode.com/u/zenoharsh/", label: "LeetCode" },
];

export default function HeroSection() {
  const words = ["Blending", "code", "and", "intelligence", "for", "digital", "experiences."];

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center min-h-[60vh] pt-20 pb-12"
    >
      {/* Eyebrow text */}
      <div className="flex items-center gap-6 mb-12 text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 font-mono">
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-white/30" />
          B.Tech Undergrad
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[#00ea64]" />
          Delhi, India
        </span>
      </div>

      <div className="max-w-[800px]">
        {/* Main Headline */}
        <h1 className="flex flex-wrap gap-x-4 gap-y-2 text-[3rem] md:text-[5rem] leading-[1.1] font-medium tracking-tight text-white/90">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block hero-word opacity-0 font-sans"
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: "both",
              }}
            >
              {word === "code" || word === "intelligence" ? (
                <span className="font-cursive italic font-light text-[#00ea64]/90 pr-1">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-8 text-[15px] md:text-[18px] leading-relaxed text-white/70 max-w-[500px] font-light tracking-wide">
          Crafting elegant full-stack applications and AI-powered interfaces that merge design precision with engineering depth.
        </p>

        {/* Action Row */}
        <div className="hero-subtitle flex items-center gap-6 mt-12">
          <a
            href="mailto:harsh.dev4u@gmail.com"
            className="
              group flex items-center justify-between gap-4
              h-12 px-5 rounded-full
              bg-white/5 border border-white/10
              transition-all duration-300
              hover:bg-white/10 hover:border-white/20
              cursor-pointer
            "
          >
            <span className="text-[13px] font-medium tracking-wide text-white/60 group-hover:text-white/90 transition-colors duration-300">
              Let&apos;s work together
            </span>
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </a>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  group flex items-center justify-center
                  h-12 w-12 rounded-full
                  border border-white/5 bg-white/[0.02]
                  transition-all duration-300
                  hover:bg-white/10 hover:border-white/20 hover:scale-110
                "
              >
                <Icon size={18} className="text-white/60 transition-colors duration-300 group-hover:text-white/90" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
