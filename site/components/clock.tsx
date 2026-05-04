"use client";

import { useEffect, useState } from "react";

interface ClockProps {
  size?: number;
  className?: string;
}

export function Clock({ size = 160, className }: ClockProps) {
  // Null on first render (SSR + hydration) — populated client-side in
  // useEffect to avoid hydration mismatch from `new Date()`.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    // 100ms keeps the second hand visually smooth without burning CPU.
    const id = setInterval(update, 100);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <div style={{ width: size, height: size }} className={className} />;
  }

  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6;
  const hourAngle = hours * 30;

  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="0"
        cy="0"
        r="96"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30;
        return (
          <line
            key={`hour-${i}`}
            x1="0"
            y1="-90"
            x2="0"
            y2="-80"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        );
      })}

      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null;
        const angle = i * 6;
        return (
          <line
            key={`min-${i}`}
            x1="0"
            y1="-90"
            x2="0"
            y2="-86"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="1"
            transform={`rotate(${angle})`}
          />
        );
      })}

      <line
        x1="0"
        y1="6"
        x2="0"
        y2="-50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${hourAngle})`}
      />

      <line
        x1="0"
        y1="6"
        x2="0"
        y2="-72"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${minuteAngle})`}
      />

      <line
        x1="0"
        y1="14"
        x2="0"
        y2="-78"
        stroke="currentColor"
        strokeOpacity="0.65"
        strokeWidth="1"
        strokeLinecap="round"
        transform={`rotate(${secondAngle})`}
      />

      <circle cx="0" cy="0" r="3" fill="currentColor" />
    </svg>
  );
}
