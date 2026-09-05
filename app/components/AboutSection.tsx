"use client";

import { motion } from "framer-motion";

const skills = {
  "AI / ML & Gen AI": [
    { name: "Python", color: "#3776AB" },
    { name: "TensorFlow", color: "#FF6F00" },
    { name: "FastAPI", color: "#009688" },
    { name: "LangChain", color: "#1C3C3C" },
    { name: "Ollama", color: "#FFFFFF" },
    { name: "OpenAI", color: "#412991" },
  ],
  "Web & Full-Stack": [
    { name: "ReactJS", color: "#61DAFB" },
    { name: "React Native", color: "#61DAFB" },
    { name: "Next.js", color: "#000000" },
    { name: "TailwindCSS", color: "#06B6D4" },
    { name: "PHP", color: "#777BB4" },
    { name: "Electron", color: "#47848F" },
  ],
  "Cloud, DevOps & Data": [
    { name: "GCP", color: "#4285F4" },
    { name: "Docker", color: "#2496ED" },
    { name: "Ubuntu", color: "#E95420" },
    { name: "Supabase", color: "#3ECF8E" },
    { name: "SQLite3", color: "#003B57" },
  ],
};

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative z-10 max-w-6xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Me</span>
        </h2>
        <div className="h-1 w-20 bg-white/20 mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Left Column: Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed"
        >
          <p>
            Hi, I’m <strong className="text-white">Harsh Raj</strong>, a passionate software engineer specializing in scalable full-stack development and generative AI architectures.
          </p>
          <p>
            I am a dual-degree student, pursuing a <strong className="text-white">B.Tech at Netaji Subhas University of Technology (NSUT)</strong> and a <strong className="text-white">BS at IIT Madras</strong>. I thrive at the intersection of research and engineering, building systems that don't just work, but scale gracefully under heavy constraints.
          </p>
          <p>
            Previously, I worked as a Software Engineering and Gen-AI Intern at the Dattopant Thengadi Foundation. I've also co-founded HASI Patna and actively compete in premier hackathons, including reaching the top 10 at Adobe and finals at the Economic Times Hackathon.
          </p>
          
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">Location</span>
              <span className="text-white">India</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">Email</span>
              <span className="text-white">Reach via LinkedIn</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Tech Stack</h3>
          
          <div className="space-y-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-default"
                      style={{
                        backgroundColor: `${skill.color}10`, // 10% opacity for background
                        borderColor: `${skill.color}30`, // 30% opacity for border
                        color: skill.color === "#000000" ? "#ffffff" : skill.color, // Fallback text color for black
                      }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
