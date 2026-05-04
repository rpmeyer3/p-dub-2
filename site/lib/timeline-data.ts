import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";

export interface TimelineItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    slug: "about",
    title: "About",
    date: "2026",
    content:
      "Software engineer based in Atlanta, GA. I build full-stack web apps, ML pipelines, and cloud-native systems.",
    category: "intro",
    icon: User,
    relatedIds: [2, 5],
    status: "completed",
    energy: 90,
  },
  {
    id: 2,
    slug: "projects",
    title: "Projects",
    date: "Ongoing",
    content:
      "Selected work across full-stack apps, data engineering, and AI tooling.",
    category: "work",
    icon: Code,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 80,
  },
  {
    id: 3,
    slug: "experience",
    title: "Experience",
    date: "2020 – Now",
    content:
      "Roles, teams, and technologies — what I've shipped and where.",
    category: "career",
    icon: Briefcase,
    relatedIds: [2, 4],
    status: "completed",
    energy: 85,
  },
  {
    id: 4,
    slug: "education",
    title: "Education",
    date: "2016 – 2020",
    content:
      "Computer Science background plus continuing self-taught domains.",
    category: "background",
    icon: GraduationCap,
    relatedIds: [3],
    status: "completed",
    energy: 70,
  },
  {
    id: 5,
    slug: "contact",
    title: "Contact",
    date: "Now",
    content:
      "Reach out via email, LinkedIn, or GitHub. Open to interesting work.",
    category: "connect",
    icon: Mail,
    relatedIds: [1],
    status: "pending",
    energy: 60,
  },
];
