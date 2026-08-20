import * as THREE from "three";

interface AssistantArmProps {
  index: number;
  onRef: (element: THREE.Group | null) => void;
}

export function AssistantArm({ index, onRef }: AssistantArmProps) {
  const sign = index === 0 ? 1 : -1;

  return (
    <group ref={onRef} position={[sign * 0.46, 0.06, 0.03]}>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.24, 12]} />
        <meshStandardMaterial color="#FAFAF8" roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#FAFAF8" roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  );
}
