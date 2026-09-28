import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Bottle() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={groupRef}>
      {/* Bottle body — cylinder geometry */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 2, 64, 1, false]} />
        <meshPhysicalMaterial
          color="#1A1D27"
          metalness={0.4}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.6}
          envMapIntensity={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Cap — smaller cylinder on top */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
        <meshPhysicalMaterial
          color="#D4A857"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Gold accent rings */}
      <mesh position={[0, -0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.71, 0.015, 8, 64]} />
        <meshStandardMaterial color="#D4A857" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.71, 0.015, 8, 64]} />
        <meshStandardMaterial color="#D4A857" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Label wrap */}
      <mesh>
        <cylinderGeometry args={[0.715, 0.715, 1.1, 64, 1, true]} />
        <meshStandardMaterial
          color="#0F1117"
          roughness={0.6}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function DBottleViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow />

      <Bottle />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.3}
        scale={8}
        blur={2.5}
        far={4}
        color="#000000"
      />

      <Environment preset="studio" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.5}
        makeDefault
      />
    </Canvas>
  );
}
