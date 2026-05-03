"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  duration?: number;
  fadeMs?: number;
}

export function Loader({ duration = 2500, fadeMs = 600 }: LoaderProps) {
  const [mounted, setMounted] = useState(true);
  const [opaque, setOpaque] = useState(true);

  useEffect(() => {
    const fadeT = setTimeout(() => setOpaque(false), duration);
    const unmountT = setTimeout(() => setMounted(false), duration + fadeMs);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(unmountT);
    };
  }, [duration, fadeMs]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity ease-out"
      style={{
        opacity: opaque ? 1 : 0,
        transitionDuration: `${fadeMs}ms`,
        pointerEvents: opaque ? "auto" : "none",
        fontSize: "16px",
      }}
    >
      <div className="sharingan-loader">
        <div className="sharingon">
          <div className="ring">
            <div className="to" />
            <div className="to" />
            <div className="to" />
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
}
