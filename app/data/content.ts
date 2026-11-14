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
    href: "https://dtforg.in",
    githubUrl: "https://github.com/Zenoharsh/Dtf_rag",
    liveUrl: "https://dtforg.in",
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
    href: "https://brainfoundation.in",
    githubUrl: "https://github.com/Zenoharsh/BRAIN",
    liveUrl: "https://brainfoundation.in",
  },
  {
    id: "rla",
    title: "Red Lantern Analytica — Website Redesign",
    description: "Redesigned the Red Lantern Analytica website from the ground up as a modern Next.js and TypeScript application.",
    image: "/premium_abstract_3_1788374801672.jpg",
    tags: ["Next.js", "TypeScript", "Redesign"],
    filterIds: ["fullstack"],
    href: "https://redlanternanalytica-delta.vercel.app",
    githubUrl: "https://github.com/Zenoharsh/RLA",
    liveUrl: "https://redlanternanalytica-delta.vercel.app",
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

// ─── Shared profile data (used by sections, terminal and command palette) ───
export const profile = {
  name: "Harsh Raj",
  email: "harsh.dev4u@gmail.com",
  location: "Delhi, India",
  socials: [
    { label: "GitHub", href: "https://github.com/Zenoharsh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-raj-422b801a9/" },
    { label: "LeetCode", href: "https://leetcode.com/u/zenoharsh/" },
  ],
  resumes: [
    { label: "Software Engineer", href: "/Harsh_Raj_SWE.pdf" },
    { label: "AI / ML Engineer", href: "/Harsh_Raj_AIML.pdf" },
    { label: "Full-Stack Developer", href: "/Harsh_Raj_FullStack.pdf" },
  ],
};

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export const techStack: Record<string, { name: string; color: string }[]> = {
  "Languages": [
    { name: "Python", color: "#4B8BBE" },
    { name: "C++", color: "#659AD2" },
    { name: "JavaScript/TypeScript", color: "#3178C6" },
    { name: "SQL", color: "#5084AB" },
    { name: "PHP", color: "#777BB4" },
  ],
  "Cloud & DevOps": [
    { name: "Docker", color: "#2496ED" },
    { name: "CI/CD", color: "#FFFFFF" },
    { name: "GCP", color: "#4285F4" },
    { name: "AWS", color: "#FF9900" },
    { name: "Linux (Ubuntu)", color: "#E95420" },
    { name: "Nginx", color: "#00B345" },
  ],
  "Frameworks/Libraries": [
    { name: "ReactJS", color: "#61DAFB" },
    { name: "Node.js", color: "#43BA43" },
    { name: "FastAPI", color: "#009688" },
    { name: "ExpressJS", color: "#FFFFFF" },
    { name: "TensorFlow", color: "#FF6F00" },
    { name: "MediaPipe", color: "#00BCD4" },
  ],
  "Databases": [
    { name: "PostgreSQL", color: "#4182B8" },
    { name: "Supabase", color: "#3ECF8E" },
    { name: "MongoDB", color: "#52BA53" },
    { name: "SQLite3", color: "#0487CA" },
    { name: "Vector DBs (pgvector)", color: "#00EA64" },
  ],
};

export const experiences = [
  {
    role: "Software Engineering & Gen-AI Intern",
    company: "Dattopant Thengadi Foundation",
    location: "Delhi, India",
    date: "Summer 2024",
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
