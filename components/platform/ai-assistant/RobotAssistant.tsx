"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


import { AssistantEyes } from "./AssistantEyes";
import { AssistantMouth } from "./AssistantMouth";
import { AssistantArms } from "./AssistantArms";
import { AssistantGlow } from "./AssistantGlow";
import { AssistantAnimState } from "@/types/ai-assistant";

interface RobotAssistantProps {
  animState: AssistantAnimState;
  scale?: number;
}

const BODY_COLOR = "#FAFAF8";
const SHADE_COLOR = "#E7E5DE";
const VISOR_COLOR = "#1E2321";
const ACCENT = "#2F9E6E";

export function RobotAssistant({ animState, scale = 1 }: RobotAssistantProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;

    const t = state.clock.elapsedTime;

    // Natural floating
    const float = Math.sin(t * 1.2) * 0.045 + Math.sin(t * 2.7) * 0.008;

    groupRef.current.position.y = float;

    // Natural body movement
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.025;

    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.06;

    // Head movement
    headRef.current.rotation.z = Math.sin(t * 0.8) * 0.015;

    headRef.current.rotation.y = Math.sin(t * 0.55) * 0.035;

    // State-specific movement
    if (animState === "thinking") {
      headRef.current.rotation.z = Math.sin(t * 1.4) * 0.07;

      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.12;
    }

    if (animState === "talking") {
      groupRef.current.rotation.z = Math.sin(t * 4) * 0.012;
    }

    if (animState === "greeting") {
      headRef.current.rotation.z = Math.sin(t * 7) * 0.06;
    }

    if (animState === "goodbye") {
      headRef.current.rotation.z = -0.08;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main body */}
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />

        <meshStandardMaterial
          color={BODY_COLOR}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Lower body */}
      <mesh position={[0, -0.42, 0]} scale={[1, 0.55, 1]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />

        <meshStandardMaterial
          color={SHADE_COLOR}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Head / face */}
      <group ref={headRef}>
        <mesh position={[0, 0.08, 0.42]} scale={[0.32, 0.22, 0.12]}>
          <sphereGeometry args={[0.5, 24, 24]} />

          <meshStandardMaterial
            color={VISOR_COLOR}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        <AssistantEyes animState={animState} />

        <AssistantMouth animState={animState} />
      </group>

      <AssistantArms animState={animState} />

      {/* Chest accent */}
      <mesh position={[0, -0.22, 0.4]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.12, 0.005, 8, 32]} />

        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.4}
        />
      </mesh>

      <AssistantGlow animState={animState} />
    </group>
  );
}
