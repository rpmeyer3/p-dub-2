import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import {
  aboutContent,
  projectsContent,
  experienceContent,
  educationContent,
  contactContent,
  skillsContent,
} from "@/lib/node-content";
import type { NodeSlug } from "@/components/scenes/node-scene";

const SLUG_TITLE: Record<NodeSlug, string> = {
  about: "About",
  projects: "Projects",
  experience: "Experience",
  education: "Education",
  contact: "Contact",
};

export function NodeOverlay({ slug }: { slug: NodeSlug }) {
  return (
    <div className="min-h-[400vh] text-white">
      <header className="sticky top-0 z-20 px-6 md:px-10 pt-6 pb-2 backdrop-blur-sm bg-black/30">
        <Link
          href="/hub"
          className="inline-flex items-center text-xs font-mono uppercase tracking-[0.08em] text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={12} className="mr-2" />
          back to hub
        </Link>
      </header>

      <section className="min-h-[100vh] flex items-center justify-center px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.08em] text-white/50 mb-4">
            {slug}
          </p>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            {SLUG_TITLE[slug]}
          </h1>
        </div>
      </section>

      {slug === "about" && <AboutOverlay />}
      {slug === "projects" && <ProjectsOverlay />}
      {slug === "experience" && <ExperienceOverlay />}
      {slug === "education" && <EducationOverlay />}
      {slug === "contact" && <ContactOverlay />}

      <footer className="min-h-[40vh] flex items-end justify-center pb-16 text-xs font-mono uppercase tracking-[0.08em] text-white/30">
        ↓ keep scrolling, or press ↑ to return
      </footer>
    </div>
  );
}

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-h-[80vh] flex items-center justify-center px-6 py-16 ${className}`}
    >
      <div className="max-w-3xl w-full">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.08em] text-white/50 mb-3">
      {children}
    </p>
  );
}

function AboutOverlay() {
  return (
    <>
      <Section>
        <SectionLabel>bio</SectionLabel>
        <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
          {aboutContent.bio}
        </p>
        <p className="mt-8 text-sm font-mono uppercase tracking-[0.08em] text-white/50">
          {aboutContent.tagline} · {aboutContent.location}
        </p>
      </Section>

      <Section>
        <SectionLabel>looking for</SectionLabel>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
          {aboutContent.lookingFor}
        </p>
      </Section>

      <Section>
        <SectionLabel>tech</SectionLabel>
        <ul className="space-y-6">
          {skillsContent.map((group) => (
            <li key={group.label}>
              <p className="text-sm font-mono uppercase tracking-[0.08em] text-white/50 mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-[11px] font-mono uppercase tracking-[0.08em] border border-white/30 text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionLabel>elsewhere</SectionLabel>
        <ul className="space-y-3 text-lg">
          <li>
            <a
              href={aboutContent.previousPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-white hover:text-white/80 transition-colors inline-flex items-center"
            >
              ryanmeyer.vercel.app (older portfolio)
              <ExternalLink size={14} className="ml-2" />
            </a>
          </li>
          <li>
            <a
              href={contactContent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-white hover:text-white/80 transition-colors inline-flex items-center"
            >
              github.com/rpmeyer3
              <Github size={14} className="ml-2" />
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}

function ProjectsOverlay() {
  return (
    <>
      {projectsContent.map((p) => (
        <Section key={p.name}>
          <article>
            <SectionLabel>project</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {p.name}
            </h2>
            <p className="mt-2 text-base md:text-lg text-white/60 italic">
              {p.tagline}
            </p>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed">
              {p.description}
            </p>

            {p.highlights.length > 0 && (
              <ul className="mt-6 space-y-2">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start text-sm md:text-base text-white/75"
                  >
                    <span className="mr-3 mt-2 inline-block h-px w-4 bg-white/40 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[10px] font-mono uppercase tracking-[0.08em] border border-white/30 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors"
                >
                  source
                  <Github size={12} className="ml-2" />
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono uppercase tracking-[0.08em] text-white/70 hover:text-white transition-colors"
                >
                  live demo
                  <ExternalLink size={12} className="ml-2" />
                </a>
              )}
            </div>
          </article>
        </Section>
      ))}
    </>
  );
}

function ExperienceOverlay() {
  return (
    <Section>
      {experienceContent.map((e) => (
        <div key={`${e.org}-${e.role}`} className="mb-10">
          <SectionLabel>{e.period}</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight">{e.role}</h2>
          <p className="mt-1 text-lg text-white/70">{e.org}</p>
          <p className="mt-4 text-base text-white/80 leading-relaxed">
            {e.description}
          </p>
        </div>
      ))}
      <p className="mt-12 text-sm font-mono uppercase tracking-[0.08em] text-white/40">
        more entries coming as roles land — currently focused on coursework + ship-quality side projects.
      </p>
    </Section>
  );
}

function EducationOverlay() {
  return (
    <Section>
      {educationContent.map((e) => (
        <div key={e.school} className="mb-10">
          <SectionLabel>{e.period}</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight">{e.school}</h2>
          <p className="mt-1 text-lg text-white/70">{e.degree}</p>
          {e.notes && (
            <p className="mt-4 text-base text-white/80 leading-relaxed">
              {e.notes}
            </p>
          )}
          {e.coursework && e.coursework.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-mono uppercase tracking-[0.08em] text-white/50 mb-2">
                coursework
              </p>
              <ul className="space-y-1 text-sm text-white/75">
                {e.coursework.map((c) => (
                  <li key={c} className="flex items-start">
                    <span className="mr-3 mt-2 inline-block h-px w-4 bg-white/40 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </Section>
  );
}

function ContactOverlay() {
  return (
    <Section>
      <ul className="space-y-6 text-lg">
        <li>
          <a
            href={`mailto:${contactContent.email}`}
            className="font-mono text-white hover:text-white/80 transition-colors break-all"
          >
            {contactContent.email}
          </a>
        </li>
        <li>
          <a
            href={contactContent.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-white hover:text-white/80 transition-colors inline-flex items-center"
          >
            linkedin.com/in/rmeyer3
            <ExternalLink size={14} className="ml-2" />
          </a>
        </li>
        <li>
          <a
            href={contactContent.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-white hover:text-white/80 transition-colors inline-flex items-center"
          >
            github.com/rpmeyer3
            <Github size={14} className="ml-2" />
          </a>
        </li>
        <li>
          <a
            href={contactContent.previousPortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-white/70 hover:text-white transition-colors inline-flex items-center"
          >
            ryanmeyer.vercel.app (older portfolio)
            <ExternalLink size={14} className="ml-2" />
          </a>
        </li>
      </ul>
    </Section>
  );
}
