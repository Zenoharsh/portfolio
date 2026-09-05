export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // Fallback or main image
  video?: string; // Optional video URL (.mp4, .webm)
  tags: string[];
  filterIds: string[]; // Maps to skill tag ids
  href: string; // Main card click link
  githubUrl?: string; // Optional GitHub repo link
  liveUrl?: string; // Optional Live demo link
}

export const skills = [
  { label: "All", id: "all" },
  { label: "AI & ML", id: "aiml" },
  { label: "Full-Stack", id: "fullstack" },
  { label: "Freelance", id: "freelance" },
  { label: "Open Source", id: "opensource" },
  { label: "Hackathons", id: "hackathon" },
  { label: "Research", id: "research" },
];

export const projects: Project[] = [
  // ─── PROJECTS WITH SCREENSHOTS (PRIORITIZED) ───
  {
    id: "dtf-rag",
    title: "Automated AI RAG Agent",
    description: "Deployed an automated AI RAG agent on an Ubuntu VPS using FastAPI and Ollama. Engineered optimized data-fetching algorithms to reduce latency and improve website performance scores by 11%.",
    image: "/dtf.png",
    tags: ["FastAPI", "Ollama", "PHP", "Ubuntu"],
    filterIds: ["aiml", "fullstack"],
    href: "https://github.com/Zenoharsh/Dtf_rag",
    githubUrl: "https://github.com/Zenoharsh/Dtf_rag",
  },
  {
    id: "iemo",
    title: "IEMO(Intelligent Email Management Opus)",
    description: "Automated intelligent email organization by developing a context-aware AI agent utilizing Gemini LLM and LangChain to parse and structure complex inbox data streams.",
    image: "/iemo.png",
    tags: ["ReactJS", "LangChain", "GCP", "Supabase"],
    filterIds: ["aiml", "fullstack"],
    href: "https://github.com/Zenoharsh/IEMO",
    githubUrl: "https://github.com/Zenoharsh/IEMO",
  },
  {
    id: "brain",
    title: "BRAIN Platform",
    description: "Developed a comprehensive full-stack freelance platform architecture, focusing on highly optimized UI/UX design patterns and scalable backend routing.",
    image: "/brain.png",
    tags: ["Full-Stack", "UI/UX", "Freelance"],
    filterIds: ["fullstack", "freelance"],
    href: "https://github.com/Zenoharsh/BRAIN",
    githubUrl: "https://github.com/Zenoharsh/BRAIN",
  },
  {
    id: "drishti",
    title: "Drishti (ET Hackathon Finalist)",
    description: "Developed a geo-spatial global energy supply chain tracker utilizing geospatial data pipelines and a multi-variable constraint optimization algorithm.",
    image: "/drishti.png",
    tags: ["Geo-spatial", "Optimization", "AI"],
    filterIds: ["aiml", "hackathon"],
    href: "https://github.com/Zenoharsh/drishti",
    githubUrl: "https://github.com/Zenoharsh/drishti",
  },
  {
    id: "vehicle-app",
    title: "Vehicle Maintenance App",
    description: "Developed an offline-first Electron desktop application for the 15th Battalion, acting as a centralized hub for managing vehicle fleet operations and driver training.",
    image: "/vehicle.png",
    tags: ["Electron", "SQLite3", "TailwindCSS"],
    filterIds: ["fullstack", "freelance"],
    href: "https://github.com/Zenoharsh/vehicle-app",
    githubUrl: "https://github.com/Zenoharsh/vehicle-app",
  },
  {
    id: "adobe-addon",
    title: "Adobe Express RAG Add-on",
    description: "Top 10 Finalist at Adobe Hackathon. Built a RAG-based add-on for Adobe Express to automate and summarize complex workflows at scale.",
    image: "/adobe-addon.png",
    tags: ["RAG", "LLM", "React"],
    filterIds: ["aiml", "hackathon"],
    href: "https://github.com/Zenoharsh/adobe_addon",
    githubUrl: "https://github.com/Zenoharsh/adobe_addon",
  },

  // ─── BACKEND / RESEARCH PROJECTS (ABSTRACT THUMBNAILS) ───
  {
    id: "sportify",
    title: "Sportify ML Engine",
    description: "Deployed a full-stack AI platform integrating a core machine learning model with a robust FastAPI backend routing system and React-Native frontend. Achieved an 89% accuracy rate in sports video analysis using TensorFlow (MoveNet).",
    image: "/premium_abstract_4_1788374816695.jpg",
    tags: ["TensorFlow", "FastAPI", "React Native"],
    filterIds: ["aiml", "fullstack"],
    href: "https://github.com/Zenoharsh/Lexiconauts",
    githubUrl: "https://github.com/Zenoharsh/Lexiconauts",
  },
  {
    id: "openenv",
    title: "OpenEnv SOC Analyst Simulator",
    description: "Engineered an autonomous SIEM environment simulator to evaluate LLM-driven incident response agents under strict production constraints using OpenEnv and FastAPI.",
    image: "/premium_abstract_1_1788374772599.jpg",
    tags: ["Python", "FastAPI", "Docker"],
    filterIds: ["aiml"],
    href: "https://github.com/Zenoharsh/Meta_openenv",
    githubUrl: "https://github.com/Zenoharsh/Meta_openenv",
  },
  {
    id: "fairlens",
    title: "Fairlens",
    description: "An open-source bias detection and fairness evaluation framework for machine learning models, ensuring equitable AI deployment.",
    image: "/premium_abstract_1_1788374772599.jpg",
    tags: ["AI / ML", "Python", "Data Science"],
    filterIds: ["aiml"],
    href: "https://github.com/Zenoharsh/fairlens",
    githubUrl: "https://github.com/Zenoharsh/fairlens",
  },
  {
    id: "testcraft",
    title: "TestCraft API Agent",
    description: "Contributed to an open-source API automation agent, extending test coverage capabilities and enhancing the core execution engine.",
    image: "/premium_abstract_3_1788374801672.jpg",
    tags: ["Open Source", "API Testing", "Automation"],
    filterIds: ["opensource"],
    href: "https://github.com/TestCraft-App/api-automation-agent",
    githubUrl: "https://github.com/TestCraft-App/api-automation-agent",
  },
  {
    id: "moe-research",
    title: "Mixture of Experts (MoE) Paper",
    description: "Currently researching and authoring a paper on advanced Mixture of Experts architectures for highly scalable LLM routing and efficiency.",
    image: "/premium_abstract_2_1788374786176.jpg",
    tags: ["Research", "MoE", "LLM Architecture"],
    filterIds: ["research", "aiml"],
    href: "#", // In progress, keeping it local
  }
];
