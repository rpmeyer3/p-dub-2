"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { site, roles } from "@/lib/data";
import { useMounted } from "@/lib/use-mounted";
import { MaskReveal } from "./mask-reveal";
import { Magnetic } from "./magnetic";

export function Hero() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduce;

  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -80]);

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-32 sm:px-10 sm:pt-40">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="relative">
          <motion.div
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-3"
          >
            <span className="pill">
              <span className="relative inline-block h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
                <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              {site.status}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--muted))]">
              {site.location}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.95] text-balance">
            <MaskReveal as="div" delay={0.05}>Ryan</MaskReveal>
            <MaskReveal as="div" delay={0.18} className="italic text-[hsl(var(--muted))]">
              Paul
            </MaskReveal>
            <MaskReveal as="div" delay={0.28}>Meyer</MaskReveal>
          </h1>

          <motion.p
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-[hsl(var(--muted))] text-balance"
          >
            {site.about}
          </motion.p>

          <motion.div
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--fg))] px-6 py-3 text-sm text-[hsl(var(--bg))] transition-transform hover:-translate-y-0.5"
              >
                See selected work
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-6 py-3 text-sm hover:bg-[hsl(var(--surface))]"
              >
                Get in touch
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[hsl(var(--muted))]"
          >
            {roles.map((role, i) => (
              <span key={role} className="inline-flex items-center gap-2">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-[hsl(var(--muted))]" />}
                {role}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          ref={portraitRef}
          style={animate ? { y: portraitY } : undefined}
          initial={animate ? { opacity: 0, scale: 0.96 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xs lg:ml-auto lg:max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
            <Image
              src="/ryan.jpeg"
              alt="Ryan Meyer"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 400px"
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[hsl(var(--muted))]">
            <span className="inline-flex items-center gap-2">
              <Star className="h-3 w-3 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
              B.S. CS · May 2026
            </span>
            <span>#ryan-0001</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-24 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-[hsl(var(--muted))]"
      >
        <span>scroll</span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.div>
    </section>
  );
}
