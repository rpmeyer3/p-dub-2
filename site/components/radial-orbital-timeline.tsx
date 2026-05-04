"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import type { TimelineItem } from "@/lib/timeline-data";
import { Clock } from "@/components/clock";

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(rotationTimer);
  }, []);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute z-10 flex items-center justify-center text-white">
            <Clock size={160} />
          </div>

          <div className="absolute w-96 h-96 rounded-full border border-white/10" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const Icon = item.icon;

            const glowSize = item.energy * 0.5 + 40;

            return (
              <NextLink
                key={item.id}
                href={`/hub/${item.slug}`}
                className="absolute transition-all duration-700 cursor-pointer group"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: position.zIndex,
                  opacity: position.opacity,
                }}
              >
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${glowSize}px`,
                    height: `${glowSize}px`,
                    left: `${-(glowSize - 40) / 2}px`,
                    top: `${-(glowSize - 40) / 2}px`,
                  }}
                />

                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center
                  bg-black text-white border-2 border-white/40
                  group-hover:bg-white group-hover:text-black group-hover:border-white
                  group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/30
                  transition-all duration-300"
                >
                  <Icon size={16} />
                </div>

                <div
                  className="absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  text-white/70 group-hover:text-white group-hover:scale-110
                  transition-all duration-300"
                >
                  {item.title}
                </div>
              </NextLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
