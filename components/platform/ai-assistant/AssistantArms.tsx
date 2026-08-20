"use client";

import { AssistantAnimState } from "@/types/ai-assistant";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { AssistantArm } from "./AssistantArm";

interface AssistantArmsProps {
  animState: AssistantAnimState;
}

export function AssistantArms({ animState }: AssistantArmsProps) {
  const armRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    armRefs.current.forEach((arm, i) => {
      if (!arm) return;

      const sign = i === 0 ? 1 : -1;

      let targetRotation = sign * -0.2;

      switch (animState) {
        case "idle":
          targetRotation = sign * (-0.2 + Math.sin(t * 1.1 + i) * 0.04);
          break;

        case "greeting":
          if (i === 0) {
            targetRotation = -0.2 - 1.9 + Math.sin(t * 12) * 0.35;
          } else {
            targetRotation = 0.2;
          }
          break;

        case "thinking":
          targetRotation = sign * -0.2;
          break;

        case "talking":
          targetRotation = sign * (-0.2 + Math.sin(t * 3 + i) * 0.06);
          break;

        case "goodbye":
          if (i === 0) {
            targetRotation = -0.2 - 1 + Math.sin(t * 10) * 0.2;
          } else {
            targetRotation = 0.1;
          }
          break;
      }

      arm.rotation.z = THREE.MathUtils.lerp(
        arm.rotation.z,
        targetRotation,
        0.15,
      );
    });
  });

  return [0, 1].map((index) => (
    <AssistantArm
      index={index}
      key={index}
      onRef={(element) => {
        armRefs.current[index] = element;
      }}
    />
  ));
}
