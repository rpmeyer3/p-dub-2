"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/components/smooth-scroll-provider";
import { contactContent } from "@/lib/node-content";

// Tilted 3D grid of monospace lines that "type" themselves as scroll
// progresses. Real <a> tags live in the DOM overlay for accessibility.
const LINES = [
  contactContent.email,
  contactContent.linkedin.replace(/^https?:\/\//, ""),
  contactContent.github.replace(/^https?:\/\//, ""),
];

export default function ContactScene() {
  const progress = useScrollProgress();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = progress.get();
    if (groupRef.current) {
      groupRef.current.rotation.x = -0.25 + t * 0.15;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <ambientLight intensity={0.6} />
      {LINES.map((line, i) => (
        <TypedLine key={line} line={line} index={i} total={LINES.length} />
      ))}
    </group>
  );
}

function TypedLine({
  line,
  index,
  total,
}: {
  line: string;
  index: number;
  total: number;
}) {
  const progress = useScrollProgress();
  const [shown, setShown] = useState("");
  const lastShownRef = useRef("");
  const y = 1 - index * 0.9;

  useFrame(() => {
    const t = progress.get();
    const start = index / total;
    const span = 1 / total;
    const local = THREE.MathUtils.clamp((t - start) / span, 0, 1);
    const next = line.slice(0, Math.ceil(local * line.length));
    if (next !== lastShownRef.current) {
      lastShownRef.current = next;
      setShown(next);
    }
  });

  return (
    <Text
      position={[0, y, 0]}
      fontSize={0.32}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      maxWidth={8}
    >
      {shown || " "}
    </Text>
  );
}
