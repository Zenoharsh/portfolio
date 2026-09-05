"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Download, Terminal, Code2, BrainCircuit } from "lucide-react";

const resumes = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    icon: Terminal,
    description: "Focuses on scalable architecture, systems engineering, and low-level optimizations.",
    highlights: ["Backend Routing", "System Design", "C++ / Python", "Performance Tuning"],
    pdfLink: "/Harsh_Raj_SWE.pdf", // Placeholder links
  },
  {
    id: "ai-ml",
    title: "AI / ML Engineer",
    icon: BrainCircuit,
    description: "Highlights generative AI, computer vision pipelines, and deep learning architectures.",
    highlights: ["TensorFlow & PyTorch", "LLM RAG Pipelines", "OpenEnv", "Data Pipelines"],
    pdfLink: "/Harsh_Raj_AIML.pdf",
  },
  {
    id: "full-stack",
    title: "Full-Stack Developer",
    icon: Code2,
    description: "Emphasizes end-to-end web & desktop application development, UI/UX, and cloud deployments.",
    highlights: ["React & Next.js", "FastAPI & Node", "Electron Desktop", "GCP & Supabase"],
    pdfLink: "/Harsh_Raj_FullStack.pdf",
  },
];

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState(resumes[0].id);

  const activeResume = resumes.find((r) => r.id === activeTab)!;

  return (
    <section id="resume" className="py-24 relative z-10 max-w-5xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Curriculum <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Vitae</span>
        </h2>
        <div className="h-1 w-20 bg-white/20 mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Role Tabs */}
        <div className="lg:col-span-4 space-y-3">
          {resumes.map((resume) => {
            const isActive = activeTab === resume.id;
            const Icon = resume.icon;
            return (
              <button
                key={resume.id}
                onClick={() => setActiveTab(resume.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "bg-white/[0.02] border border-transparent hover:bg-white/5"
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-white/50"}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isActive ? "text-white" : "text-white/60"}`}>
                    {resume.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Resume Preview & Download */}
        <div className="lg:col-span-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none transition-opacity group-hover:bg-white/10" />

            <div>
              <activeResume.icon size={48} className="text-white/20 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">{activeResume.title} Resume</h3>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">
                {activeResume.description}
              </p>

              <div className="space-y-4 mb-12">
                <h4 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Key Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeResume.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={activeResume.pdfLink}
              download
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 self-start shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <Download size={18} />
              Download {activeResume.title} PDF
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
