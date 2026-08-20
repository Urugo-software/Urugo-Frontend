"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


import { AssistantArms } from "./AssistantArms";
import { AssistantBody } from "./AssistantBody";
import { AssistantEyes } from "./AssistantEyes";
import { AssistantGlow } from "./AssistantGlow";
import { AssistantMouth } from "./AssistantMouth";
import { AssistantAnimState } from "@/types/ai-assistant";

interface RobotAssistantProps {
  animState: AssistantAnimState;
  scale?: number;
}

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
      <AssistantBody />
      <group ref={headRef}>
        <mesh position={[0, 0.08, 0.42]} scale={[0.32, 0.22, 0.12]}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshStandardMaterial color="#1E2321" roughness={0.3} metalness={0.2} />
        </mesh>
        <AssistantEyes animState={animState} />
        <AssistantMouth animState={animState} />
      </group>
      <AssistantArms animState={animState} />
      <AssistantGlow animState={animState} />
    </group>
  );
}
