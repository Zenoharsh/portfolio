"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Engineering & Gen-AI Intern",
    company: "Dattopant Thengadi Foundation",
    location: "Delhi, India",
    date: "Summer 2024", // Assuming based on typical student timelines
    description:
      "Deployed an automated AI RAG agent on an Ubuntu VPS utilizing FastAPI and Ollama. Led the optimization of backend architecture, reducing latency and boosting website performance by 11%.",
  },
  {
    role: "Co-Founder",
    company: "HASI Patna",
    location: "Patna, India",
    date: "2023 - Present",
    description:
      "Spearheaded technical development and product vision for this social initiative, building full-stack infrastructure to scale community outreach and operational efficiency.",
  },
  {
    role: "Top 10 Finalist",
    company: "Adobe Express Hackathon",
    location: "Remote",
    date: "2023",
    description:
      "Engineered a scalable RAG-based add-on for Adobe Express, enabling generative AI workflows to automate complex design and content generation tasks at scale.",
  },
  {
    role: "Finalist",
    company: "The Economic Times Hackathon",
    location: "Remote",
    date: "2023",
    description:
      "Developed 'Drishti', a geospatial global energy supply chain tracker utilizing multi-variable constraint optimization algorithms to visualize and predict supply chain vulnerabilities.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative z-10 max-w-4xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">& Leadership</span>
        </h2>
        <div className="h-1 w-20 bg-white/20 mt-4 rounded-full"></div>
      </div>

      <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

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
