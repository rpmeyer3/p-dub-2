"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/lib/use-mounted";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
};

export function MaskReveal({ children, delay = 0, className, as = "span" }: Props) {
  const reduce = useReducedMotion();
  const mounted = useMounted();

  if (!mounted || reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Wrapper = as === "span" ? motion.span : motion.div;

  return (
    <Wrapper
      className={className}
      style={{ display: as === "span" ? "inline-block" : "block", overflow: "hidden" }}
    >
      <motion.span
        style={{ display: "inline-block", willChange: "transform" }}
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </Wrapper>
  );
}
