"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  CornerDownLeft,
  Download,
  FolderGit2,
  Hash,
  Search,
  type LucideIcon,
} from "lucide-react";
import { profile, projects, sections } from "../data/content";
import {
  PALETTE_EVENT,
  copyText,
  scrollToSection,
  showProject,
} from "../lib/actions";

interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void | string; // optional toast message
}

const commands: Command[] = [
  ...sections.map((s) => ({
    id: `go-${s.id}`,
    group: "Navigate",
    label: `Go to ${s.label}`,
    icon: Hash,
    run: () => scrollToSection(s.id),
  })),
  {
    id: "copy-email",
    group: "Contact",
    label: "Copy email address",
    hint: profile.email,
    icon: Copy,
    run: () => {
      void copyText(profile.email);
      return "Email copied to clipboard";
    },
  },
  ...profile.socials.map((s) => ({
    id: `social-${s.label}`,
    group: "Contact",
    label: `Open ${s.label}`,
    icon: ArrowUpRight,
    run: () => {
      window.open(s.href, "_blank", "noopener,noreferrer");
    },
  })),
  ...profile.resumes.map((r) => ({
    id: `resume-${r.href}`,
    group: "Resume",
    label: `Download ${r.label} resume`,
    icon: Download,
    run: () => {
      const a = document.createElement("a");
      a.href = r.href;
      a.download = "";
      a.click();
    },
  })),
  ...projects.map((p) => ({
    id: `project-${p.id}`,
    group: "Projects",
    label: p.title,
    hint: p.tags.join(" · "),
    icon: FolderGit2,
    run: () => showProject(p.id),
  })),
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [query]);

  const show = () => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    restoreFocus.current?.focus?.({ preventScroll: true });
  };

  // Global shortcut (⌘K / Ctrl+K) + open requests from the navbar button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((wasOpen) => {
          if (!wasOpen) {
            restoreFocus.current = document.activeElement as HTMLElement | null;
            setQuery("");
            setActive(0);
          }
          return !wasOpen;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, show);
    };
  }, []);

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Keep the highlighted row visible
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    setOpen(false);
    // Let the scroll lock release before running (smooth scroll needs it)
    requestAnimationFrame(() => {
      const message = command.run();
      if (typeof message === "string") setToast(message);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            data-no-blast
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh] bg-black/60 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onKeyDown={handleKeyDown}
              className="w-full max-w-[560px] rounded-2xl border border-white/10 bg-[#0c0c0c]/95 shadow-[0_30px_100px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.07]">
                <Search size={16} className="text-white/40 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  placeholder="Search sections, projects, actions…"
                  aria-label="Search commands"
                  className="flex-1 min-w-0 bg-transparent text-[15px] text-white placeholder:text-white/35 outline-none"
                />
                <kbd className="px-1.5 py-0.5 rounded border border-white/10 text-[10px] font-mono text-white/40">
                  esc
                </kbd>
              </div>

              <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-white/40">
                    Nothing matches “{query}”.
                  </p>
                )}
                {results.map((command, index) => {
                  const showGroup =
                    index === 0 || results[index - 1].group !== command.group;
                  const isActive = index === active;
                  const Icon = command.icon;
                  return (
                    <div key={command.id}>
                      {showGroup && (
                        <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                          {command.group}
                        </p>
                      )}
                      <button
                        type="button"
                        data-index={index}
                        onMouseMove={() => setActive(index)}
                        onClick={() => execute(command)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer transition-colors duration-100 ${
                          isActive
                            ? "bg-[#00ea64]/10 text-white"
                            : "text-white/65"
                        }`}
                      >
                        <Icon
                          size={15}
                          className={`shrink-0 ${isActive ? "text-[#00ea64]" : "text-white/35"}`}
                        />
                        <span className="text-[14px] truncate">
                          {command.label}
                        </span>
                        {command.hint && (
                          <span className="hidden sm:block ml-auto pl-4 text-[11px] font-mono text-white/30 truncate max-w-[45%]">
                            {command.hint}
                          </span>
                        )}
                        {isActive && (
                          <CornerDownLeft
                            size={13}
                            className={`shrink-0 text-[#00ea64]/70 ${command.hint ? "" : "ml-auto"}`}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 px-4 h-10 border-t border-white/[0.07] text-[11px] text-white/35">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> select
                </span>
                <span className="ml-auto font-mono">
                  {results.length} results
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full border border-[#00ea64]/30 bg-[#0c0c0c]/95 text-[13px] text-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
