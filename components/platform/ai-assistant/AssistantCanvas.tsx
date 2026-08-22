"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";

import { RobotAssistant } from "./RobotAssistant";
import { AssistantAnimState } from "@/types/ai-assistant";

interface AssistantCanvasProps {
  animState: AssistantAnimState;
}

export function AssistantCanvas({ animState }: AssistantCanvasProps) {
  return (
    <Canvas
      className="size-full max-w-full"
      style={{ height: "100%", maxWidth: "100%", width: "100%" }}
      camera={{
        position: [0, 0, 3],
        fov: 35,
      }}
      shadows
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.4} />

      <directionalLight position={[2, 3, 4]} intensity={2} castShadow />

      <pointLight position={[-2, 1, 2]} intensity={1} color="#1D66FF" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.15}>
        <RobotAssistant animState={animState} scale={1} />
      </Float>

      <ContactShadows
        position={[0, -0.72, 0]}
        opacity={0.25}
        scale={1.5}
        blur={2}
      />
    </Canvas>
  );
}
