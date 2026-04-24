import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";
import { Reveal } from "./reveal";
import { MaskReveal } from "./mask-reveal";
import { site } from "@/lib/data";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  {
    label: "Phone",
    value: site.phoneDisplay,
    href: `tel:${site.phone.replace(/[^+0-9]/g, "")}`,
    icon: Phone,
    external: false,
    note: "Text first if we haven't met",
  },
  { label: "LinkedIn", value: "linkedin.com/in/rmeyer3", href: site.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: "github.com/rpmeyer3", href: site.github, icon: Github, external: true },
  { label: "Résumé", value: "Ryan_Meyer.pdf", href: site.resume, icon: FileText, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                ↳ Contact
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              <MaskReveal as="div">Looking for a full-time role,</MaskReveal>
              <MaskReveal as="div" delay={0.1} className="italic text-[hsl(var(--muted))]">
                starting May 2026.
              </MaskReveal>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-[hsl(var(--muted))]">
                If you&rsquo;re building something at the intersection of ML and real product
                &mdash; or just want to say hi &mdash; the inbox is open.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="hairline" />

        <ul>
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.04}>
              <li className="border-b border-[hsl(var(--border))]">
                <a
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-[hsl(var(--surface)/0.4)]"
                >
                  <div className="col-span-4 flex items-center gap-4 sm:col-span-3">
                    <l.icon className="h-4 w-4 text-[hsl(var(--muted))]" />
                    <span className="font-display text-xl">{l.label}</span>
                  </div>
                  <div className="col-span-8 font-mono text-sm text-[hsl(var(--muted))] transition-colors group-hover:text-[hsl(var(--fg))] sm:col-span-7">
                    {l.value}
                    {l.note ? (
                      <span className="ml-3 text-xs italic">· {l.note}</span>
                    ) : null}
                  </div>
                  <div className="col-span-12 text-right text-[hsl(var(--muted))] transition-transform group-hover:-translate-y-0.5 sm:col-span-2">
                    <span aria-hidden>↗</span>
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
