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
      "Software engineer in Atlanta, GA. Computer Science senior at UGA building data pipelines, ML systems, and full-stack web apps.",
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
      "Selected work across mobile apps, ML pipelines, full-stack web, and cloud infrastructure.",
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
    date: "2024 – Now",
    content:
      "Three Saia LTL Freight stints across two summers and one academic year. ETL, BI, and an end-to-end ML pipeline that cut RFP processing from months to hours.",
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
    date: "Expected May 2026",
    content:
      "B.S. in Computer Science with a Computer Systems emphasis at the University of Georgia.",
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
      "Email, phone, LinkedIn, GitHub, and ryanmeyer.dev. Open to interesting work.",
    category: "connect",
    icon: Mail,
    relatedIds: [1],
    status: "pending",
    energy: 60,
  },
];
