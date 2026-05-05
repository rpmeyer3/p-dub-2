export interface ProjectInfo {
  name: string;
  tagline: string;
  description: string;
  period?: string;
  tech: string[];
  highlights: string[];
  repo?: string;
  live?: string;
}

export interface ExperienceEntry {
  role: string;
  org: string;
  location?: string;
  period: string;
  description: string;
  bullets?: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  location?: string;
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
  tagline: "Computer Science · UGA · B.S. May 2026",
  location: "Atlanta, GA",
  bio: "Software engineer building production data pipelines, ML systems, and full-stack web apps. Currently a Computer Science senior at the University of Georgia (Computer Systems emphasis) with two summers as a Data Engineering Intern at Saia LTL Freight, where I shipped enterprise automation and BI platforms used by hundreds of stakeholders. Outside of class I build real things: receipt-scanning mobile apps, attention-based image segmentation, and AI-assisted financial tooling.",
  lookingFor:
    "Open to engineering work that combines data systems, machine learning, and the web. Especially interested in roles where the ML actually ships into production rather than living in a notebook.",
  previousPortfolio: "https://ryanmeyer.dev",
};

export const skillsContent: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "Java",
      "C++",
      "C#",
      "SQL",
      "JavaScript",
      "TypeScript",
      "Bash / Shell",
      "HTML5",
      "Tailwind",
    ],
  },
  {
    label: "AI & ML",
    items: [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "LangChain",
      "OpenCV",
      "Hugging Face",
      "MLOps",
      "RAG",
    ],
  },
  {
    label: "Web & Backend",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Django",
      "FastAPI",
      "GraphQL",
      "Prisma",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (Lambda, S3, RDS)",
      "Google Cloud",
      "Vercel",
      "Render",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Linux",
    ],
  },
  {
    label: "Data & Databases",
    items: [
      "Pandas",
      "NumPy",
      "Power BI",
      "DAX",
      "XGBoost",
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "Cassandra",
      "Neo4j",
    ],
  },
];

export const projectsContent: ProjectInfo[] = [
  {
    name: "FreshKeep",
    tagline: "Receipt-scanning pantry tracker — CSCI 4800 HCI hi-fi prototype.",
    description:
      "Mobile-first concept for FreshKeep: scan a grocery receipt, auto-populate the pantry with expiration timers, and surface recipe suggestions from what you already own. Single-page web demo with Kroger integration, push notifications, and an AI chatbot for conversational pantry management. Group 11 milestone-5 prototype.",
    period: "Spring 2026",
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
  {
    name: "Byte's Bank",
    tagline:
      "PDF bank-statement analyzer with TF-IDF + Naive Bayes categorization and a Gemini-powered financial advisor chat.",
    description:
      "Full-stack app that parses PDF bank statements, classifies each transaction through a TF-IDF and Naive Bayes pipeline, then delivers AI-generated financial advice through a Gemini-powered chat interface. Wizard-rank gamification and ElevenLabs TTS voice summaries on top.",
    period: "Spring 2026",
    tech: [
      "React",
      "Vite",
      "FastAPI",
      "scikit-learn",
      "Gemini API",
      "Supabase",
      "ElevenLabs",
      "pdfplumber",
    ],
    highlights: [
      "PDF transaction parsing with pdfplumber",
      "TF-IDF and Naive Bayes spending categorization across 10 classes",
      "Gemini-powered financial advisor chat",
      "Supabase auth with Row Level Security",
      "Built for UGA Hacks 11",
    ],
    repo: "https://github.com/rpmeyer3/Goose",
    live: "https://byte-bank-mauve.vercel.app",
  },
  {
    name: "Noise-Robust Image Segmentation System",
    tagline:
      "31.5M-parameter Attention U-Net with CBAM and curriculum learning, 92.6% accuracy across 5 noise types.",
    description:
      "A 31.5 million parameter Attention U-Net with CBAM and a curriculum-learning training schedule that hits 92.6% accuracy across five noise types. Deployed via containerized FastAPI with Hugging Face model delivery and a Vercel visualization dashboard rendering confidence-heatmap overlays.",
    period: "Fall 2025",
    tech: [
      "PyTorch",
      "FastAPI",
      "Attention U-Net",
      "CBAM",
      "Docker",
      "Hugging Face",
      "Vercel",
    ],
    highlights: [
      "92.6% accuracy across 5 distinct noise types",
      "31.5M-parameter Attention U-Net with CBAM",
      "Curriculum-learning training schedule",
      "Containerized FastAPI inference plus Hugging Face model delivery",
      "Vercel dashboard with confidence-heatmap overlays",
    ],
    repo: "https://github.com/rpmeyer3/Recognize",
    live: "https://pattern-delineation.vercel.app",
  },
  {
    name: "Filmhub",
    tagline:
      "Production-ready movie booking SPA with Docker CI/CD, OAuth + JWT auth, and Luhn-validated payments.",
    description:
      "Full-stack movie booking single-page app with a Next.js / React frontend and a Django REST API backend, all containerized with Docker CI/CD. Implements OAuth 2.0 / JWT auth, role-based access control, database triggers for user sync, and Luhn-validated payment integration. CSCI 4050 group project at UGA.",
    period: "Spring 2025",
    tech: [
      "Next.js",
      "React",
      "Django",
      "PostgreSQL",
      "Docker",
      "OAuth",
      "JWT",
    ],
    highlights: [
      "Docker CI/CD pipeline for both frontend and backend",
      "OAuth 2.0 and JWT auth with role-based access control",
      "Database triggers for user sync between auth and profile tables",
      "Luhn-validated payment integration",
      "CSCI 4050 group project, UGA",
    ],
    repo: "https://github.com/rpmeyer3/Filmhub",
    live: "https://film-hub-theta.vercel.app",
  },
  {
    name: "Azure 3-Tier Secure Architecture",
    tagline:
      "Production-grade Azure web infra with Terraform, security hardening, and an interactive React explorer.",
    description:
      "Three-tier web architecture on Azure with security baked in from the baseline up: deny-all NSG defaults, private endpoints eliminating public data-tier exposure, Entra ID auth with Managed Identities, and TLS 1.2+ enforced everywhere. Terraform 1.5+ on AzureRM 4.x. A separate React explorer lets reviewers walk the architecture without needing an Azure subscription.",
    tech: [
      "Terraform",
      "Azure",
      "React 19",
      "TypeScript",
      "Vite",
      "Bash",
    ],
    highlights: [
      "Application Gateway WAF v2 (OWASP 3.2) and Linux VMSS autoscaling 2 to 5 instances",
      "Azure SQL with private endpoints; Bastion for browser SSH (no public VMs)",
      "Centralized Log Analytics, Key Vault Premium, Managed Identities throughout",
      "Interactive React architecture explorer with no subscription required",
    ],
    repo: "https://github.com/rpmeyer3/Mule",
  },
  {
    name: "AI-PIP",
    tagline:
      "Serverless AI inference pipeline on Azure with Terraform IaC and an animated React frontend.",
    description:
      "End-to-end serverless AI inference pipeline deployed on Azure with reusable Terraform modules. The Vite + React 19 + TypeScript frontend uses GSAP to visualize the pipeline workflow, and the modular IaC keeps the cloud side reproducible across environments.",
    tech: ["Azure", "Terraform", "React 19", "Vite", "TypeScript", "GSAP"],
    highlights: [
      "Modular Terraform with reusable Azure components",
      "GSAP-driven pipeline visualizer",
      "Serverless inference end-to-end",
    ],
    repo: "https://github.com/rpmeyer3/Messina",
    live: "https://ai-pip.vercel.app",
  },
];

export const experienceContent: ExperienceEntry[] = [
  {
    role: "Data Engineering Intern",
    org: "Saia LTL Freight",
    location: "Johns Creek, GA",
    period: "May 2025 to Aug. 2025",
    description:
      "Owned an end-to-end RFP automation pipeline backed by a custom ML model, integrated into enterprise CRMs.",
    bullets: [
      "Engineered an end-to-end automation pipeline for RFP data ingestion that cut the processing cycle from over 3 months to just 8 hours, a > 99% reduction, while eliminating manual data entry errors.",
      "Designed and trained a Siamese neural network using Keras for one-shot similarity matching, hitting 0.97 AUC-ROC on production validation sets and successfully automating classification of high-variance RFP documents.",
      "Built a recursive data-generation pipeline using a score-based search across live pricing servers, including a script to produce synthetic training examples for model convergence.",
      "Implemented a robust data-validation module using Pandas and strict schema enforcement, preventing downstream corruption in CRM systems by rejecting malformed records at ingestion.",
      "Re-engineered a legacy C# process to fully integrate the new ML pipeline with enterprise CRMs (Salesforce and Microsoft Dynamics), giving sales teams validated near real-time RFP data.",
    ],
  },
  {
    role: "Contractor (Part-Time)",
    org: "Saia LTL Freight",
    location: "Johns Creek, GA",
    period: "Aug. 2024 to May 2025",
    description:
      "Predictive pricing modeling and ad-hoc analytics support during the academic year.",
    bullets: [
      "Collaborated with the Finance team to develop a predictive pricing model using XGBoost, leveraging freight density and lane profitability features to justify discount-tier recommendations.",
      "Provided ad-hoc SQL support and data extraction for the analytics team, resolving urgent data requests for business stakeholders during the academic year.",
    ],
  },
  {
    role: "Data Engineering Intern",
    org: "Saia LTL Freight",
    location: "Johns Creek, GA",
    period: "May 2024 to Aug. 2024",
    description:
      "Built ETL pipelines and BI infrastructure consumed by hundreds of internal users across the company.",
    bullets: [
      "Automated ETL pipelines to process over 50 million records from legacy AS/400 databases into Power BI, reducing manual data extraction and reporting time by 90% for key company reports.",
      "Optimized BI semantic models by authoring complex DAX and SQL queries to calculate critical business metrics (ADR, ADBC), improving underlying report-query performance by over 30%.",
      "Spearheaded development of an interactive Territory Insights dashboard using Azure Maps in Power BI, identifying growth markets projected to capture over $5M in potential revenue.",
      "Implemented a dynamic Row-Level Security model for Power BI reports embedded within a Visualforce IFrame, enabling personalized and secure dashboard access for over 500 end users.",
    ],
  },
];

export const educationContent: EducationEntry[] = [
  {
    school: "The University of Georgia",
    degree: "B.S. in Computer Science, Emphasis in Computer Systems",
    location: "Athens, GA",
    period: "Expected May 2026",
    notes:
      "Computer Systems track. Coursework spans systems programming, distributed computing, and cloud infrastructure alongside foundational ML and full-stack development.",
    coursework: [
      "Software Engineering (CSCI 4050)",
      "Human-Computer Interaction (CSCI 4800)",
      "Machine Learning and Deep Learning",
      "Cloud and Distributed Systems",
      "Algorithms and Data Structures",
      "Computer Systems",
    ],
  },
];

export const contactContent = {
  email: "ryanpaulmeyer@gmail.com",
  phone: "470-841-9228",
  linkedin: "https://linkedin.com/in/rmeyer3",
  github: "https://github.com/rpmeyer3",
  portfolio: "https://ryanmeyer.dev",
};
