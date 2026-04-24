import { Reveal } from "./reveal";
import { MaskReveal } from "./mask-reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="work" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                ↳ Experience
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              <MaskReveal as="div">Three semesters, one company,</MaskReveal>
              <MaskReveal as="div" delay={0.1} className="italic text-[hsl(var(--muted))]">
                a lot learned.
              </MaskReveal>
            </h2>
          </div>
        </div>

        <div className="hairline" />

        <ul>
          {experience.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.05}>
              <li className="group grid grid-cols-12 gap-8 border-b border-[hsl(var(--border))] py-10">
                <div className="col-span-12 md:col-span-3">
                  <div className="font-mono text-xs uppercase tracking-widest text-[hsl(var(--muted))]">
                    {job.period}
                  </div>
                  <div className="mt-2 text-sm text-[hsl(var(--muted))]">{job.location}</div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl">
                    {job.role}
                    <span className="italic text-[hsl(var(--muted))]"> · {job.company}</span>
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-3 text-[hsl(var(--muted))] leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-[2px] w-4 flex-shrink-0 bg-[hsl(var(--accent))] transition-[width] duration-500 group-hover:w-8"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
