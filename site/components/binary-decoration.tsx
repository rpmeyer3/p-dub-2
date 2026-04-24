"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

function pseudoRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function BinaryRow({ seed = 1, length = 120 }: { seed?: number; length?: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 40, stiffness: 280, mass: 0.4 });
  const x = useTransform(smoothVelocity, [-2000, 0, 2000], [60, 0, -60]);

  const rng = pseudoRandom(seed);
  const bits = Array.from({ length }, () => (rng() > 0.5 ? "1" : "0")).join(" ");

  if (reduce) {
    return (
      <div className="binary-row px-6 py-5 sm:px-10" aria-hidden>
        {bits}
      </div>
    );
  }

  return (
    <div className="binary-row px-6 py-5 sm:px-10" aria-hidden>
      <motion.div style={{ x }}>{bits}</motion.div>
    </div>
  );
}
