"use client";

import { AssistantAnimState } from "@/types/ai-assistant";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


interface AssistantMouthProps {
  animState: AssistantAnimState;
}

const ACCENT = "#2F9E6E";

export function AssistantMouth({ animState }: AssistantMouthProps) {
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mouthRef.current) return;

    const t = state.clock.elapsedTime;

    let targetX = 0.16;
    let targetY = 0.045;
    let targetRotation = 0;

    switch (animState) {
      case "idle":
        targetY = 0.045 + Math.sin(t * 1.3) * 0.004;
        break;

      case "greeting":
        targetX = 0.22;
        targetY = 0.065;
        break;

      case "thinking":
        targetX = 0.1;
        targetY = 0.04;
        break;

      case "talking":
        targetY = 0.045 + Math.abs(Math.sin(t * 8.5)) * 0.085;
        break;

      case "goodbye":
        targetX = 0.12;
        targetY = 0.025;
        targetRotation = -0.15;
        break;
    }

    mouthRef.current.scale.x = THREE.MathUtils.lerp(
      mouthRef.current.scale.x,
      targetX,
      0.2,
    );

    mouthRef.current.scale.y = THREE.MathUtils.lerp(
      mouthRef.current.scale.y,
      targetY,
      0.2,
    );

    mouthRef.current.rotation.z = THREE.MathUtils.lerp(
      mouthRef.current.rotation.z,
      targetRotation,
      0.2,
    );
  });

  return (
    <mesh ref={mouthRef} position={[0, -0.02, 0.49]} scale={[0.16, 0.045, 1]}>
      <sphereGeometry args={[0.5, 16, 16]} />

      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}
