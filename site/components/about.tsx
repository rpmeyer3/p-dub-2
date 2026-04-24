import { Reveal } from "./reveal";

export function About() {
  return (
    <section id="about" className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-8">
            <div className="col-span-12 md:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted))]">
                ↳ About
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="font-display text-3xl leading-[1.15] text-balance sm:text-4xl md:text-5xl">
                I found a likeness to programming through its{" "}
                <span className="italic text-[hsl(var(--muted))]">
                  problem-solving
                </span>{" "}
                — the satisfaction of taking a messy, real-world problem apart and
                putting it back together as something that actually works.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 text-[hsl(var(--muted))] sm:grid-cols-2">
                <p>
                  What keeps me in it is the range. One week it&rsquo;s a data
                  pipeline, the next it&rsquo;s a model, the next it&rsquo;s a UI
                  nobody wants to touch. The common thread is untangling something
                  confusing into something people can rely on.
                </p>
                <p>
                  Outside of coursework I build what I&rsquo;m curious about —
                  small tools that scratch a real itch, models trained on data I
                  had to go collect myself, and the occasional side project that
                  teaches me more than any class did.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
