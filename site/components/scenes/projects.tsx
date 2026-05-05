"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/smooth-scroll-provider";
import { projectsContent } from "@/lib/node-content";

// Six (or so) cards arranged along a curve; scroll dollies the camera through
// them. Each card uses a tinted material — themed pseudo-shader stand-in.
const CARD_COLORS = [
  "#7dd3fc", // sky — Pattern Delineation
  "#fca5a5", // rose — Film Hub
  "#fcd34d", // amber — Byte's Bank
  "#a7f3d0", // emerald — SORAS
  "#c4b5fd", // violet — Numbers Numbers
  "#f9a8d4", // pink — AI-PIP
];

export default function ProjectsScene() {
  const progress = useScrollProgress();
  const groupRef = useRef<THREE.Group>(null);

  const cards = useMemo(() => {
    return projectsContent.map((p, i) => {
      const t = i / Math.max(projectsContent.length - 1, 1);
      // Lay along a gentle z-axis with a slight x sweep.
      const x = (t - 0.5) * 6;
      const y = Math.sin(t * Math.PI) * 0.4;
      const z = -t * 8;
      return {
        position: new THREE.Vector3(x, y, z),
        color: CARD_COLORS[i % CARD_COLORS.length],
        name: p.name,
      };
    });
  }, []);

  useFrame((state) => {
    const t = progress.get();
    if (groupRef.current) {
      // Camera dollies forward into the line of cards as scroll advances.
      state.camera.position.z = 6 - t * 10;
      state.camera.lookAt(0, 0, -t * 8);
      groupRef.current.rotation.y = Math.sin(t * Math.PI) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 5]} intensity={0.6} />
      {cards.map((c, i) => (
        <mesh key={i} position={c.position}>
          <planeGeometry args={[1.4, 2]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.15}
            metalness={0.2}
            roughness={0.4}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
