"use client";

import { AssistantAnimState } from "@/types/ai-assistant";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface AssistantEyesProps {
  animState: AssistantAnimState;
}

const ACCENT = "#2F9E6E";

export function AssistantEyes({ animState }: AssistantEyesProps) {
  const eyeRefs = useRef<(THREE.Mesh | null)[]>([]);

  const blinkTimer = useRef(0);
  const nextBlink = useRef(3 + Math.random() * 4);

  useFrame((_, delta) => {
    blinkTimer.current += delta;

    if (blinkTimer.current > nextBlink.current) {
      blinkTimer.current = 0;
      nextBlink.current = 2.5 + Math.random() * 5;
    }

    const blinkProgress = Math.min(blinkTimer.current / 0.12, 1);

    let blinkScale = 1;

    if (blinkTimer.current < 0.12) {
      blinkScale = 1 - Math.sin(blinkProgress * Math.PI) * 0.9;
    }

    eyeRefs.current.forEach((eye, i) => {
      if (!eye) return;

      let scaleY = blinkScale;

      switch (animState) {
        case "greeting":
          scaleY *= 0.7;
          break;

        case "thinking":
          scaleY *= 0.85;
          break;

        case "goodbye":
          scaleY *= 0.5;
          break;
      }

      eye.scale.y = THREE.MathUtils.lerp(eye.scale.y, scaleY, 0.25);
    });
  });

  return (
    <>
      {[-0.11, 0.11].map((x, i) => (
        <mesh
          key={i}
          ref={(el) => {
            eyeRefs.current[i] = el;
          }}
          position={[x, 0.12, 0.49]}
          scale={[1, 1, 0.5]}
        >
          <sphereGeometry args={[0.035, 16, 16]} />

          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
    </>
  );
}
