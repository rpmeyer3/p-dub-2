"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/smooth-scroll-provider";

// Three orbiting low-poly "books" (simple boxes with edged geometry) plus
// a center disc — UGA G stand-in. Scroll modulates orbit radius.
export default function EducationScene() {
  const progress = useScrollProgress();
  const orbitRef = useRef<THREE.Group>(null);
  const centerRef = useRef<THREE.Mesh>(null);

  const books = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        size: 0.45 + (i % 2) * 0.15,
        tilt: (i / 5) * 0.4,
      })),
    [],
  );

  useFrame((state) => {
    const t = progress.get();
    const radius = 1.5 + t * 1.8;
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.15 + t * 1.2;
      orbitRef.current.children.forEach((child, i) => {
        const a = books[i].angle;
        child.position.set(
          Math.cos(a) * radius,
          Math.sin(a + state.clock.elapsedTime * 0.3) * 0.4,
          Math.sin(a) * radius,
        );
        child.rotation.x = state.clock.elapsedTime * 0.4 + a;
        child.rotation.z = books[i].tilt;
      });
    }
    if (centerRef.current) {
      centerRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const scale = 1 - t * 0.4;
      centerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 4, 3]} intensity={0.7} color="#fff5e6" />
      <fog attach="fog" args={["#000000", 4, 12]} />

      <mesh ref={centerRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.45, 0.12, 16, 64]} />
        <meshStandardMaterial
          color="#ba0c2f"
          emissive="#ba0c2f"
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      <group ref={orbitRef}>
        {books.map((b, i) => (
          <mesh key={i}>
            <boxGeometry args={[b.size, b.size * 1.3, b.size * 0.25]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#e8d8b0" : "#c0a878"}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
