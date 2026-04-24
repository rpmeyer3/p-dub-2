"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[hsl(var(--border))] bg-[hsl(var(--bg)/0.72)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="#top"
          className="font-display text-lg tracking-tight"
          aria-label="Back to top"
        >
          <span className="italic text-[hsl(var(--muted))]">ryan</span>
          <span className="ml-1">meyer</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline px-3 py-1.5 text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.6)] px-4 py-1.5 text-sm transition-colors hover:bg-[hsl(var(--surface))] md:inline-flex"
          >
            Résumé ↗
          </a>
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface)/0.6)] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))] md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4 sm:px-10">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg text-[hsl(var(--fg))]"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-lg text-[hsl(var(--fg))]"
              >
                Résumé ↗
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
