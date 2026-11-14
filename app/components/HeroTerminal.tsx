"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { experiences, profile, projects, sections, techStack } from "../data/content";
import { copyText, scrollToSection, showProject } from "../lib/actions";

interface Line {
  id: number;
  kind: "input" | "output";
  content: ReactNode;
}

const COMMANDS: Record<string, string> = {
  help: "list available commands",
  whoami: "a quick intro",
  skills: "tech stack by category",
  projects: "list projects",
  open: "open <n|id> — jump to a project",
  experience: "work & hackathons",
  resume: "download a resume",
  contact: "how to reach me",
  email: "copy my email address",
  goto: "goto <section> — scroll to a section",
  clear: "clear the terminal",
};

const SUGGESTIONS = ["help", "projects", "skills", "contact"];

const green = "text-[#00ea64]";
const dim = "text-white/45";

function Prompt() {
  return (
    <span className="select-none whitespace-nowrap mr-2">
      <span className={green}>visitor</span>
      <span className={dim}>@</span>
      <span className="text-[#a3e635]">harsh</span>
      <span className={dim}>:~$</span>
    </span>
  );
}

function run(raw: string): { output: ReactNode; clear?: boolean } {
  const [cmd, ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(" ").toLowerCase();

  switch (cmd.toLowerCase()) {
    case "help":
    case "?":
      return {
        output: (
          <div className="grid grid-cols-[auto_1fr] gap-x-4">
            {Object.entries(COMMANDS).map(([name, desc]) => (
              <div key={name} className="contents">
                <span className={green}>{name}</span>
                <span className="text-white/60">{desc}</span>
              </div>
            ))}
          </div>
        ),
      };

    case "whoami":
    case "about":
      return {
        output: (
          <p>
            <span className="text-white">{profile.name}</span> — full-stack &amp; AI developer in{" "}
            {profile.location}. Dual-degree student (B.Tech @ NSUT, BS @ IIT Madras) who builds RAG
            agents, ML pipelines and the web apps around them.
          </p>
        ),
      };

    case "skills":
    case "stack":
      return {
        output: (
          <div className="space-y-1">
            {Object.entries(techStack).map(([category, items]) => (
              <p key={category}>
                <span className="text-[#a3e635]">{category}:</span>{" "}
                <span className="text-white/70">{items.map((s) => s.name).join(", ")}</span>
              </p>
            ))}
          </div>
        ),
      };

    case "projects":
    case "ls":
      return {
        output: (
          <div>
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => showProject(p.id)}
                className="group flex w-full gap-3 text-left cursor-pointer"
              >
                <span className={dim}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-white/75 group-hover:text-[#00ea64] group-hover:underline underline-offset-4 transition-colors">
                  {p.title}
                </span>
              </button>
            ))}
            <p className={`${dim} mt-1`}>click one, or type `open 3`</p>
          </div>
        ),
      };

    case "open":
    case "cat": {
      const byIndex = projects[Number(arg) - 1];
      const project =
        byIndex ??
        projects.find((p) => p.id === arg) ??
        (arg ? projects.find((p) => p.title.toLowerCase().includes(arg)) : undefined);
      if (!project) {
        return { output: <p className="text-red-400/90">usage: open &lt;1-{projects.length} | id&gt;</p> };
      }
      showProject(project.id);
      return { output: <p>opening <span className={green}>{project.title}</span> …</p> };
    }

    case "experience":
    case "exp":
      return {
        output: (
          <div className="space-y-1">
            {experiences.map((e) => (
              <p key={e.company}>
                <span className="text-white/85">{e.role}</span>{" "}
                <span className={dim}>@</span> <span className="text-[#a3e635]">{e.company}</span>{" "}
                <span className={dim}>({e.date})</span>
              </p>
            ))}
          </div>
        ),
      };

    case "resume":
    case "cv":
      return {
        output: (
          <div>
            {profile.resumes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                download
                className="block text-white/75 hover:text-[#00ea64] hover:underline underline-offset-4"
              >
                ↓ {r.label}
              </a>
            ))}
          </div>
        ),
      };

    case "contact":
    case "socials":
      return {
        output: (
          <div>
            <a href={`mailto:${profile.email}`} className="block hover:text-[#00ea64] hover:underline underline-offset-4">
              <span className={dim}>email&nbsp;&nbsp;&nbsp;&nbsp;</span> {profile.email}
            </a>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#00ea64] hover:underline underline-offset-4"
              >
                <span className={dim}>{s.label.toLowerCase().padEnd(9, " ")}</span>{" "}
                {s.href.replace(/^https:\/\/(www\.)?/, "")}
              </a>
            ))}
          </div>
        ),
      };

    case "email":
      void copyText(profile.email);
      return { output: <p>copied <span className={green}>{profile.email}</span> to clipboard</p> };

    case "goto":
    case "cd": {
      const section = sections.find(
        (s) => s.id === arg || s.label.toLowerCase() === arg,
      );
      if (!section) {
        return {
          output: (
            <p className="text-red-400/90">
              sections: {sections.map((s) => s.label.toLowerCase()).join(", ")}
            </p>
          ),
        };
      }
      scrollToSection(section.id);
      return { output: <p>→ {section.label.toLowerCase()}</p> };
    }

    case "clear":
      return { output: null, clear: true };

    case "sudo":
      return { output: <p>nice try — permission denied 🙂</p> };

    case "":
      return { output: null };

    default:
      return {
        output: (
          <p>
            <span className="text-red-400/90">command not found:</span> {cmd}{" "}
            <span className={dim}>— try `help`</span>
          </p>
        ),
      };
  }
}

export default function HeroTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [typed, setTyped] = useState(""); // intro auto-typing
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const nextId = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const execute = (raw: string) => {
    const command = raw.trim();
    const result = run(command);
    if (result.clear) {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { id: nextId.current++, kind: "input", content: command },
        ...(result.output
          ? [{ id: nextId.current++, kind: "output" as const, content: result.output }]
          : []),
      ]);
    }
    if (command) setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setValue("");
  };

  // Intro: type `whoami` once, then hand control to the visitor.
  useEffect(() => {
    const intro = "whoami";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      setTyped("");
      setLines([
        { id: nextId.current++, kind: "input", content: intro },
        { id: nextId.current++, kind: "output", content: run(intro).output },
        {
          id: nextId.current++,
          kind: "output",
          content: <p className={dim}>type `help` to explore — this terminal is live.</p>,
        },
      ]);
      setReady(true);
    };

    if (reduce) {
      timers.push(setTimeout(finish, 0));
    } else {
      intro.split("").forEach((_, i) => {
        timers.push(setTimeout(() => setTyped(intro.slice(0, i + 1)), 1100 + i * 110));
      });
      timers.push(setTimeout(finish, 1100 + intro.length * 110 + 350));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  // Keep the newest output in view (scrolls the terminal only, never the page)
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab" && value.trim()) {
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match === "open" || match === "goto" ? `${match} ` : match);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      data-no-blast
      onClick={() => {
        // Click anywhere to focus, unless the visitor is selecting text
        if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
      }}
      className="hero-subtitle group relative w-full rounded-2xl border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden transition-colors duration-300 focus-within:border-[#00ea64]/40 cursor-text"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.07] bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="flex-1 text-center text-[11px] font-mono text-white/35 tracking-wide pr-10">
          visitor@harsh — portfolio
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="hide-scrollbar h-[300px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-[1.7] text-white/70"
      >
        {lines.map((line) =>
          line.kind === "input" ? (
            <div key={line.id} className="flex">
              <Prompt />
              <span className="text-white/90 break-all">{line.content}</span>
            </div>
          ) : (
            <div key={line.id} className="mb-2">
              {line.content}
            </div>
          ),
        )}

        {/* Active prompt */}
        <div className="flex items-center">
          <Prompt />
          {ready ? (
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal command input"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="flex-1 min-w-0 bg-transparent text-white/90 caret-[#00ea64] outline-none"
            />
          ) : (
            <span className="text-white/90">
              {typed}
              <span className="terminal-caret ml-px" />
            </span>
          )}
        </div>
      </div>

      {/* Tap-friendly shortcuts */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-white/[0.07] bg-white/[0.02]">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 mr-1">
          try
        </span>
        {SUGGESTIONS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            disabled={!ready}
            onClick={(e) => {
              e.stopPropagation();
              execute(cmd);
            }}
            className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[11px] text-white/60 transition-colors duration-200 hover:border-[#00ea64]/40 hover:text-[#00ea64] disabled:opacity-40 cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
