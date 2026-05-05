export interface ProjectInfo {
  name: string;
  description: string;
  tech: string[];
  repo?: string;
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
}

export const aboutContent = {
  name: "Ryan Meyer",
  tagline: "Computer Science · UGA",
  bio: "Software engineer focused on full-stack apps, ML pipelines, and cloud-native systems. Atlanta, GA — building production-grade web and AI tooling on the side of school.",
};

export const projectsContent: ProjectInfo[] = [
  {
    name: "Pattern Delineation",
    description:
      "Attention U-Net for noise-robust segmentation of dot-pattern shapes. Dice 0.886.",
    tech: ["PyTorch", "FastAPI", "Vercel"],
    repo: "https://github.com/rpmeyer3/Recognize",
  },
  {
    name: "Film Hub",
    description:
      "Full-stack movie theater booking platform — reservations, seat picking, payments.",
    tech: ["Next.js", "Django REST", "Supabase"],
    repo: "https://github.com/rpmeyer3/Filmhub",
  },
  {
    name: "Byte's Bank",
    description:
      "Wizarding-themed PDF bank statement analyzer with ML categorization and a Gemini financial advisor.",
    tech: ["Python", "Gemini API", "ML"],
    repo: "https://github.com/rpmeyer3/Goose",
  },
  {
    name: "SORAS AI",
    description:
      "Audio summarization pipeline — Whisper transcription, T5 summarization, Google Cloud TTS.",
    tech: ["Whisper", "Hugging Face", "GCP"],
  },
  {
    name: "Numbers Numbers",
    description:
      "Saia RFP automation — fuzzy-matches 45K+ file paths against CRM accounts to extract proposal data.",
    tech: ["Pandas", "Python"],
    repo: "https://github.com/rpmeyer3/Penguin",
  },
  {
    name: "AI-PIP",
    description:
      "Serverless AI inference pipeline on Azure with Terraform IaC and a Vite/React frontend.",
    tech: ["Azure", "Terraform", "React"],
    repo: "https://github.com/rpmeyer3/Messina",
  },
];

export const experienceContent: ExperienceEntry[] = [
  {
    role: "Student",
    org: "University of Georgia",
    period: "Now",
    description:
      "CS / Software Engineering coursework. Shipping production-grade web + ML side projects in parallel.",
  },
];

export const educationContent: EducationEntry[] = [
  {
    school: "University of Georgia",
    degree: "B.S. Computer Science",
    period: "Current",
  },
];

export const contactContent = {
  email: "ryanpaulmeyer@gmail.com",
  linkedin: "https://linkedin.com/in/rmeyer3",
  github: "https://github.com/rpmeyer3",
};
