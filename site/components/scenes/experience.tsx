"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/components/smooth-scroll-provider";

// A diagonal rail in 3D. One glowing "now" marker, future markers as faint
// outlines. Camera eases along the rail with scroll.
export default function ExperienceScene() {
  const progress = useScrollProgress();
  const markerRef = useRef<THREE.Mesh>(null);
  const ghostRef = useRef<THREE.Group>(null);

  const railGeometry = useMemo(() => {
    const start = new THREE.Vector3(-4, -3, -3);
    const end = new THREE.Vector3(4, 3, -3);
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, []);

  const railMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#ffffff", opacity: 0.4, transparent: true }),
    [],
  );

  useFrame((state) => {
    const t = progress.get();
    if (markerRef.current) {
      // Marker pulses subtly via emissive.
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
      const mat = markerRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + pulse * 0.6;
    }
    if (ghostRef.current) {
      ghostRef.current.rotation.y = t * Math.PI * 0.15;
    }
    state.camera.position.x = -2 + t * 4;
    state.camera.position.y = -1 + t * 2;
    state.camera.lookAt(0, 0, -3);
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 2]} intensity={0.8} color="#ffffff" />

      <line>
        <primitive object={railGeometry} attach="geometry" />
        <primitive object={railMaterial} attach="material" />
      </line>

      {/* Now marker */}
      <mesh ref={markerRef} position={[-2, -1.5, -3]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Ghost / future markers */}
      <group ref={ghostRef}>
        {[0.4, 0.65, 0.85].map((u, i) => {
          const x = -4 + u * 8;
          const y = -3 + u * 6;
          return (
            <mesh key={i} position={[x, y, -3]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial
                color="#ffffff"
                opacity={0.15}
                transparent
                wireframe
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
