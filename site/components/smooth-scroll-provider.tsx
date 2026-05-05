"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useMotionValue, type MotionValue } from "framer-motion";

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function useScrollProgress(): MotionValue<number> {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) {
    throw new Error(
      "useScrollProgress must be used inside <SmoothScrollProvider>",
    );
  }
  return ctx;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const progress = useMotionValue(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onScroll = (e: { progress?: number }) => {
      progress.set(e.progress ?? 0);
    };
    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [progress]);

  return (
    <ScrollProgressContext.Provider value={progress}>
      {children}
    </ScrollProgressContext.Provider>
  );
}
