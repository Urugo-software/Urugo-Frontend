const BODY_COLOR = "#FAFAF8";
const SHADE_COLOR = "#E7E5DE";
const ACCENT = "#1D66FF";

export function AssistantBody() {
  return (
    <>
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.42, 0]} scale={[1, 0.55, 1]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color={SHADE_COLOR} roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[0, -0.22, 0.4]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.12, 0.005, 8, 32]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} />
      </mesh>
    </>
  );
}
