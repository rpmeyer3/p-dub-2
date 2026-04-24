export const site = {
  name: "Ryan Meyer",
  handle: "@rpmeyer3",
  location: "Athens, GA · from Cumming, GA",
  tagline: "Software & ML engineer",
  status: "Available May 2026",
  about:
    "CS senior at the University of Georgia. I build machine-learning systems, data pipelines, and full-stack products — with a soft spot for turning messy real-world data into something a team can actually ship.",
  email: "ryanpaulmeyer@gmail.com",
  phone: "+1 (470) 841-9228",
  phoneDisplay: "(470) 841-9228",
  github: "https://github.com/rpmeyer3",
  linkedin: "https://linkedin.com/in/rmeyer3",
  resume: "/Ryan_Meyer.pdf",
};

export const roles = [
  "CS Senior at UGA",
  "ML Engineer",
  "Data Engineer",
  "Full-Stack Builder",
];

export const experience = [
  {
    company: "Saia LTL Freight",
    location: "Johns Creek, GA",
    role: "Data Engineering Intern",
    period: "May 2025 – Aug 2025",
    id: "saia-2025",
    bullets: [
      "Engineered an end-to-end RFP data-ingestion pipeline that cut cycle time from 3+ months to 8 hours (>99% reduction) and eliminated manual entry errors.",
      "Designed and trained a Siamese neural network in Keras for one-shot document similarity; achieved 0.97 AUC-ROC on production validation sets.",
      "Built a recursive data-generation pipeline using score-based search over live pricing servers to produce synthetic training examples for convergence.",
      "Implemented a Pandas-based validation module with strict schema enforcement, rejecting malformed records before they could corrupt downstream CRMs.",
      "Re-engineered a legacy C# process to plug the ML pipeline into Salesforce and Microsoft Dynamics, delivering validated, near-real-time RFPs to sales.",
    ],
  },
  {
    company: "Saia LTL Freight",
    location: "Remote",
    role: "Contractor (Part-Time)",
    period: "Aug 2024 – May 2025",
    id: "saia-part-time",
    bullets: [
      "Partnered with Finance to build an XGBoost pricing model using freight density and lane profitability to justify discount-tier recommendations.",
      "Provided ad-hoc SQL support and data extracts for the analytics team, resolving urgent stakeholder requests through the academic year.",
    ],
  },
  {
    company: "Saia LTL Freight",
    location: "Johns Creek, GA",
    role: "Data Engineering Intern",
    period: "May 2024 – Aug 2024",
    id: "saia-2024",
    bullets: [
      "Automated ETL for 50M+ records out of legacy AS/400 systems into Power BI, cutting manual extraction and reporting time by 90%.",
      "Optimized BI semantic models with complex DAX and SQL — calculating ADR and ADBC — improving report query performance by 30%+.",
      "Spearheaded an interactive Territory Insights dashboard using Azure Maps in Power BI, surfacing growth markets projected to capture $5M+ in revenue.",
      "Implemented dynamic Row-Level Security for Power BI reports embedded in a Visualforce IFrame, giving 500+ users personalized, secure dashboards.",
    ],
  },
];

export const projects = [
  {
    id: "FK-0001",
    title: "Freshkeep",
    period: "Spring 2026",
    summary:
      "Mobile app that scans grocery receipts via OCR, fuzzy-matches items to 661 USDA FoodKeeper entries with TF-IDF, and tracks expiration with push reminders.",
    tech: ["React Native", "Expo", "FastAPI", "Supabase", "Scikit-learn"],
    href: null,
  },
  {
    id: "BB-0002",
    title: "Byte's Bank",
    period: "Spring 2026",
    summary:
      "Full-stack app that parses PDF bank statements, classifies transactions via a TF-IDF + Naive Bayes pipeline, and delivers financial advice through a Gemini-powered chat.",
    tech: ["React", "FastAPI", "Scikit-learn", "Gemini API", "Supabase"],
    href: null,
  },
  {
    id: "NS-0003",
    title: "Noise-Robust Segmentation",
    period: "Fall 2025",
    summary:
      "A 31.5M-param Attention U-Net with CBAM and curriculum learning — 92.6% accuracy across five noise types — served from a containerized FastAPI with a Vercel dashboard.",
    tech: ["PyTorch", "FastAPI", "Attention U-Net", "Docker", "Vercel"],
    href: null,
  },
  {
    id: "FH-0004",
    title: "Filmhub",
    period: "Spring 2025",
    summary:
      "Production-ready movie-booking SPA with Next.js + Django REST. OAuth 2.0/JWT auth, RBAC, DB triggers for user sync, and Luhn-validated payment over a Docker CI/CD pipeline.",
    tech: ["Next.js", "React", "Django", "PostgreSQL", "Docker"],
    href: "https://github.com/rpmeyer3/film-hub",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "C++", "C#", "SQL", "JavaScript", "TypeScript", "Bash"],
  },
  {
    group: "AI & ML",
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
    group: "Web & Backend",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Django",
      "FastAPI",
      "GraphQL",
      "Prisma",
      "Supabase",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS (Lambda, S3, RDS)",
      "GCP",
      "Vercel",
      "Render",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Linux",
    ],
  },
  {
    group: "Data & Analytics",
    items: [
      "Pandas",
      "NumPy",
      "Power BI",
      "DAX",
      "XGBoost",
      "PostgreSQL",
      "MongoDB",
      "Cassandra",
      "Neo4j",
    ],
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
