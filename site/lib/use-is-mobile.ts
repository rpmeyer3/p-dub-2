"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` while the viewport is narrower than `breakpoint` px.
 * Wired with matchMedia so it reacts to live resize / orientation changes.
 *
 * Defaults to Tailwind's `md` breakpoint (768) so it stays in lock-step
 * with the site's existing `md:` utility classes.
 *
 * SSR-safe: returns `false` on the server (the desktop variant) and updates
 * to the real value during the first client effect. Wrap any flash-sensitive
 * UI in a small `<motion.div>` fade if the swap is visible.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}
