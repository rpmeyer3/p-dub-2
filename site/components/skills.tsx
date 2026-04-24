import { Reveal } from "./reveal";
import { MaskReveal } from "./mask-reveal";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                ↳ Toolkit
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              <MaskReveal as="div">The stack I reach for</MaskReveal>
              <MaskReveal as="div" delay={0.1} className="italic text-[hsl(var(--muted))]">
                first.
              </MaskReveal>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {skills.map((group, gi) => (
            <Reveal
              key={group.group}
              delay={gi * 0.05}
              className="h-full"
            >
              <div className="group h-full rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.4)] p-6 backdrop-blur-sm transition-colors hover:border-[hsl(var(--accent)/0.5)] sm:p-8">
                <div className="mb-5 flex items-baseline justify-between">
                  <h3 className="font-display text-xl">{group.group}</h3>
                  <span className="font-mono text-xs text-[hsl(var(--muted))]">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--bg))] px-3.5 py-1.5 text-sm text-[hsl(var(--fg))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
