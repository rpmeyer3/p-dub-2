"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/smooth-scroll-provider";

const PARTICLE_COUNT = 2500;

function makeBuffers() {
  // Start positions: random sphere shell.
  const start = new Float32Array(PARTICLE_COUNT * 3);
  // Target positions: roughly fill an oblong cluster (a "presence" — not a glyph
  // because per-letter sampling needs a font, kept simple here).
  const target = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const r = 4 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    start[i3] = r * Math.sin(phi) * Math.cos(theta);
    start[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    start[i3 + 2] = r * Math.cos(phi);

    // Settle into a tighter horizontal slab — silhouette substitute.
    target[i3] = (Math.random() - 0.5) * 4.5;
    target[i3 + 1] = (Math.random() - 0.5) * 1.6;
    target[i3 + 2] = (Math.random() - 0.5) * 0.8;
  }

  // Live buffer for current rendered positions.
  const live = new Float32Array(start);
  return { start, target, live };
}

export default function AboutScene() {
  const progress = useScrollProgress();
  const pointsRef = useRef<THREE.Points>(null);
  const buffers = useMemo(makeBuffers, []);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(buffers.live, 3));
    return g;
  }, [buffers.live]);
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.025,
        color: "#ffffff",
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      }),
    [],
  );

  useFrame(() => {
    const t = progress.get();
    const eased = t * t * (3 - 2 * t); // smoothstep
    const live = buffers.live;
    const start = buffers.start;
    const target = buffers.target;
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      live[i] = start[i] * (1 - eased) + target[i] * eased;
    }
    geometry.attributes.position.needsUpdate = true;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * Math.PI * 0.25;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
