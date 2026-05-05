export interface ProjectInfo {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  repo?: string;
  live?: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  description: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  notes?: string;
  coursework?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const aboutContent = {
  name: "Ryan Meyer",
  tagline: "Computer Science · UGA",
  location: "Atlanta, GA",
  bio: "Software engineer focused on full-stack apps, ML pipelines, and cloud-native systems. I build production-grade web and AI tooling alongside university coursework — bridging modern frontends, serverless backends, and machine learning systems end-to-end.",
  lookingFor:
    "Open to interesting engineering work — full-stack web, ML systems, cloud infrastructure, anything where the problems get sharp.",
  previousPortfolio: "https://ryanmeyer.vercel.app",
};

export const skillsContent: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "HTML / CSS"],
  },
  {
    label: "Frontend",
    items: [
      "React 18/19",
      "Next.js 15/16",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Radix UI",
    ],
  },
  {
    label: "Backend & APIs",
    items: ["FastAPI", "Django REST", "Node.js", "Express"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "Azure (App Gateway, VMSS, SQL, Key Vault, Bastion)",
      "Terraform",
      "Docker",
      "Vercel",
      "Railway",
      "Supabase",
    ],
  },
  {
    label: "Machine Learning & Data",
    items: [
      "PyTorch",
      "scikit-learn",
      "Hugging Face",
      "Google Gemini API",
      "Whisper",
      "T5",
      "pandas",
      "Attention U-Net / CBAM",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "Supabase", "pdfplumber", "fuzzy matching"],
  },
];

export const projectsContent: ProjectInfo[] = [
  {
    name: "Pattern Delineation",
    tagline: "Attention U-Net for noise-robust shape segmentation — Dice 0.886.",
    description:
      "Deep-learning system that segments dot-filled organic shapes from heavily noised images. 31.5M-parameter Attention U-Net with CBAM, trained via 4-phase curriculum learning on a composite Dice + BCE + Boundary Tversky loss. Synthetic data generated on-the-fly with five noise types; full-stack deployment with a glassmorphism dashboard and confidence heatmaps.",
    tech: [
      "PyTorch",
      "Attention U-Net",
      "CBAM",
      "FastAPI",
      "Hugging Face",
      "Vercel",
      "Docker",
    ],
    highlights: [
      "0.886 Dice / 0.796 IoU on curriculum-trained Attention U-Net",
      "Full-stack: PyTorch model → FastAPI inference → Vercel demo",
      "Confidence heatmap overlays for interpretability",
    ],
    repo: "https://github.com/rpmeyer3/Recognize",
    live: "https://pattern-delineation.vercel.app",
  },
  {
    name: "Film Hub",
    tagline: "Full-stack cinema booking platform with real-time seat availability.",
    description:
      "Movie-theater booking system covering the full loop — browse movies, pick showtimes, reserve seats, check out. PostgreSQL-backed transactional bookings handle concurrency; transactional emails via Resend; admin panel for movie/showroom CRUD. Built as a CSCI 4050 group project at UGA.",
    tech: [
      "Next.js 16",
      "React 19",
      "Django REST",
      "Supabase",
      "Tailwind CSS",
      "Resend",
    ],
    highlights: [
      "Concurrent seat availability across multiple theaters",
      "Admin CRUD on movies, showrooms, schedules",
      "User auth, favorites, reviews, password reset",
      "CSCI 4050 group project, UGA Spring 2026",
    ],
    repo: "https://github.com/rpmeyer3/Filmhub",
    live: "https://film-hub-theta.vercel.app",
  },
  {
    name: "Byte's Bank",
    tagline: "Wizarding-themed PDF analyzer with ML categorization + Gemini advisor.",
    description:
      "UGA Hacks 11 project. Users upload PDF bank statements; the app extracts transactions, runs Naive-Bayes categorization across ten spending types, generates personalized advice via Gemini, and produces an ElevenLabs TTS audio summary. Wizard-rank progression gamifies repeated analysis.",
    tech: [
      "React 18",
      "Vite",
      "FastAPI",
      "Gemini API",
      "scikit-learn",
      "Supabase",
      "ElevenLabs",
      "pdfplumber",
    ],
    highlights: [
      "Naive-Bayes transaction categorization (10 classes)",
      "Gemini-powered financial-advisor chat",
      "Wizard-rank gamification + ElevenLabs voice summaries",
      "Supabase auth + RLS, mobile-responsive Framer Motion UI",
    ],
    repo: "https://github.com/rpmeyer3/Goose",
    live: "https://byte-bank-mauve.vercel.app",
  },
  {
    name: "Numbers Numbers",
    tagline: "RFP automation — fuzzy-matches 45K+ file paths against CRM accounts.",
    description:
      "Internal data-engineering pipeline that automates Saia's RFP processing. Fuzzy-matches forty-five thousand+ file paths against CRM accounts to extract and organize proposal data, replacing days of manual lookup with a Pandas-driven scanner.",
    tech: ["Python", "Pandas", "Fuzzy matching"],
    highlights: [
      "45K+ file paths reconciled against CRM accounts",
      "Cuts manual RFP data-extraction from days to minutes",
      "Pandas-only — no extra services, easy to ship inside the company",
    ],
    repo: "https://github.com/rpmeyer3/Penguin",
  },
  {
    name: "AI-PIP",
    tagline: "Serverless AI inference pipeline on Azure with Terraform IaC.",
    description:
      "End-to-end serverless AI pipeline deployed on Azure with reusable Terraform modules. Vite + React 19 + TypeScript frontend uses GSAP to visualize the pipeline workflow; modular IaC keeps the cloud side reproducible.",
    tech: ["Azure", "Terraform", "React 19", "Vite", "TypeScript", "GSAP"],
    highlights: [
      "Modular Terraform with reusable Azure components",
      "GSAP-driven pipeline visualizer",
      "Serverless inference end-to-end",
    ],
    repo: "https://github.com/rpmeyer3/Messina",
    live: "https://ai-pip.vercel.app",
  },
  {
    name: "Azure 3-Tier Secure Architecture",
    tagline: "Production-grade Azure web infra with Terraform + interactive explorer.",
    description:
      "Three-tier web architecture on Azure with security baked in: deny-all NSG baseline, private endpoints eliminating public data-tier exposure, Entra ID auth with Managed Identities, TLS 1.2+ everywhere. Terraform 1.5+ / AzureRM 4.x. A separate React explorer lets people walk the architecture without an Azure subscription.",
    tech: [
      "Terraform",
      "Azure",
      "React 19",
      "TypeScript",
      "Vite",
      "Bash",
    ],
    highlights: [
      "App Gateway WAF v2 (OWASP 3.2) + Linux VMSS autoscaling 2–5",
      "Azure SQL with private endpoints; Bastion for browser SSH (no public VMs)",
      "Centralized Log Analytics + Key Vault Premium + Managed Identities",
      "Interactive React architecture explorer (no subscription needed)",
    ],
    repo: "https://github.com/rpmeyer3/Mule",
  },
  {
    name: "FreshKeep",
    tagline: "Receipt-scanning pantry tracker — CSCI 4800 HCI hi-fi prototype.",
    description:
      "Mobile-first concept for FreshKeep: scan a grocery receipt, auto-populate the pantry with expiration timers, and surface recipe suggestions from what you already own. Single-page web demo with Kroger integration, push notifications, and an AI chatbot for conversational pantry management. Group 11 milestone-5 prototype.",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    highlights: [
      "Receipt scanning → auto-pantry population with expiration timers",
      "Recipe suggestions from available ingredients",
      "Kroger integration + AI chatbot",
      "CSCI 4800 HCI, UGA Spring 2026 — Group 11",
    ],
    repo: "https://github.com/rpmeyer3/Lichen",
    live: "https://m5-demo.vercel.app",
  },
];

export const experienceContent: ExperienceEntry[] = [
  {
    role: "Software Engineer / Student",
    org: "University of Georgia",
    period: "2020 – Present",
    description:
      "CS / Software Engineering coursework alongside a steady stream of self-driven production projects — full-stack web (Next/React/Django), ML pipelines (PyTorch, Hugging Face, Gemini), and Azure infrastructure-as-code. Course teams have included CSCI 4050 (software engineering) and CSCI 4800 (HCI).",
  },
];

export const educationContent: EducationEntry[] = [
  {
    school: "University of Georgia",
    degree: "B.S. Computer Science",
    period: "Current",
    notes:
      "Software engineering, HCI, machine learning, and cloud-systems focus. Active in group-project courses building production-quality systems.",
    coursework: [
      "CSCI 4050 — Software Engineering",
      "CSCI 4800 — Human-Computer Interaction",
      "Machine Learning & Deep Learning",
      "Cloud & Distributed Systems",
      "Algorithms & Data Structures",
    ],
  },
];

export const contactContent = {
  email: "ryanpaulmeyer@gmail.com",
  linkedin: "https://linkedin.com/in/rmeyer3",
  github: "https://github.com/rpmeyer3",
  previousPortfolio: "https://ryanmeyer.vercel.app",
};
