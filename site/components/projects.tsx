"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { MaskReveal } from "./mask-reveal";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                ↳ Selected Work
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              <MaskReveal as="div">Things I&rsquo;ve built</MaskReveal>
              <MaskReveal as="div" delay={0.1} className="italic text-[hsl(var(--muted))]">
                recently.
              </MaskReveal>
            </h2>
          </div>
        </div>

        <div className="hairline" />

        <ul>
          {projects.map((p, i) => {
            const content = (
              <motion.li
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="group grid grid-cols-12 items-start gap-6 border-b border-[hsl(var(--border))] py-10"
              >
                <div className="col-span-12 md:col-span-3">
                  <div className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--muted))]">
                    #{p.id} / 0{projects.length}
                  </div>
                  <div className="mt-2 text-sm text-[hsl(var(--muted))]">{p.period}</div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <h3 className="font-display text-3xl sm:text-4xl">
                    {p.title}
                    {p.href ? (
                      <ArrowUpRight className="ml-3 inline h-6 w-6 translate-y-[-2px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    ) : null}
                  </h3>
                  <p className="mt-4 text-[hsl(var(--muted))] leading-relaxed">{p.summary}</p>
                </div>

                <div className="col-span-12 md:col-span-3 md:text-right">
                  <ul className="flex flex-wrap gap-2 md:justify-end">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[hsl(var(--border))] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-[hsl(var(--muted))]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );

            return (
              <Reveal key={p.id} delay={i * 0.05}>
                {p.href ? (
                  <Link href={p.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
