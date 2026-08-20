"use client";

import { AssistantAnimState } from "@/types/ai-assistant";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


interface AssistantGlowProps {
  animState: AssistantAnimState;
}

const ACCENT = "#2F9E6E";

export function AssistantGlow({ animState }: AssistantGlowProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;

    const t = state.clock.elapsedTime;

    const material = ringRef.current.material as THREE.MeshStandardMaterial;

    if (animState === "thinking") {
      const pulse = 0.5 + Math.sin(t * 5.5) * 0.5;

      material.emissiveIntensity = 0.7 + pulse * 1.2;

      ringRef.current.scale.setScalar(1 + pulse * 0.08);
    } else if (animState === "talking") {
      const pulse = 0.5 + Math.sin(t * 8) * 0.5;

      material.emissiveIntensity = 0.5 + pulse * 0.4;

      ringRef.current.scale.setScalar(1 + pulse * 0.03);
    } else {
      material.emissiveIntensity = 0.45 + Math.sin(t * 1.2) * 0.12;

      ringRef.current.scale.setScalar(1);
    }
  });

  return (
    <mesh ref={ringRef} position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.28, 0.36, 32]} />

      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
