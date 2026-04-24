import Link from "next/link";
import { site } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[hsl(var(--border))] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 text-sm text-[hsl(var(--muted))] sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-base text-[hsl(var(--fg))]">{site.name}</span>
          <span>· {year}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a className="link-underline" href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="link-underline" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="link-underline" href={`mailto:${site.email}`}>
            Email
          </a>
          <Link className="link-underline" href="#top">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
