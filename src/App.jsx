import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  Environment,
  ContactShadows,
  Float,
  OrbitControls,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Ingredients from "./components/Ingredients";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

// ===================== Supplement Bottle =====================
function SupplementBottle({ scrollData }) {
  const bottleRef = useRef();
  const capRef = useRef();
  const labelRef = useRef();

  useFrame((state) => {
    if (!bottleRef.current) return;
    const t = state.clock.elapsedTime;
    const sf = scrollData?.current?.offset || 0;
    const sections = 4;
    const section = sf * sections;

    bottleRef.current.position.y = 0.3 - section * 0.15 + Math.sin(t * 0.5) * 0.04;
    bottleRef.current.position.x = Math.sin(section * 0.8) * 0.6;
    bottleRef.current.rotation.y = section * Math.PI * 0.8 + t * 0.15;
    bottleRef.current.rotation.z = Math.sin(section * 0.5) * 0.08;

    if (capRef.current) {
      capRef.current.rotation.y = bottleRef.current.rotation.y;
      capRef.current.position.x = bottleRef.current.position.x;
      capRef.current.position.y = bottleRef.current.position.y + 1.15;
    }

    if (labelRef.current) {
      labelRef.current.rotation.y = bottleRef.current.rotation.y;
      labelRef.current.position.x = bottleRef.current.position.x;
      labelRef.current.position.y = bottleRef.current.position.y;
    }
  });

  return (
    <group ref={bottleRef}>
      {/* Bottle body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 2, 64, 1, false]} />
        <meshPhysicalMaterial
          color="#1A1D27"
          metalness={0.3}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.6}
          envMapIntensity={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Cap */}
      <mesh ref={capRef} position={[0, 1.15, 0]} castShadow>
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
      <mesh ref={labelRef}>
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

// ===================== Floating Particles =====================
function FloatingParticles({ count = 25 }) {
  const meshRef = useRef();
  const dummy = useRef(new THREE.Object3D());
  const particles = useRef(
    Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6 - 3,
      ],
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
    }))
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    particles.current.forEach((p, i) => {
      const d = dummy.current;
      d.position.set(
        p.position[0] + Math.sin(t * p.speed + p.offset) * 0.4,
        p.position[1] + Math.cos(t * p.speed * 0.7 + p.offset) * 0.5,
        p.position[2]
      );
      d.scale.setScalar(p.scale);
      d.updateMatrix();
      meshRef.current.setMatrixAt(i, d.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#D4A857"
        emissive="#D4A857"
        emissiveIntensity={0.6}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
}

// ===================== Scene Content =====================
function SceneContent({ scrollRef }) {
  const scrollData = useScroll();

  useFrame(() => {
    if (scrollRef) {
      scrollRef.current = { offset: scrollData.offset };
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 8, 5]} angle={0.3} intensity={1.2} color="#D4A857" castShadow />
      <spotLight position={[-5, -2, 3]} angle={0.4} intensity={0.5} color="#E85D5D" />
      <directionalLight position={[0, 5, 5]} intensity={0.4} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <SupplementBottle scrollData={scrollRef} />
      </Float>

      <FloatingParticles count={25} />

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
        rotateSpeed={0.4}
        makeDefault
      />
    </>
  );
}

// ===================== Main App =====================
export default function App() {
  const scrollRef = useRef(null);

  return (
    <div className="relative w-full bg-ink">
      <Nav />

      {/* Fixed 3D canvas behind content */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          shadows
        >
          <ScrollControls pages={4} damping={0.3} distance={1}>
            <SceneContent scrollRef={scrollRef} />

            {/* Scrollable HTML content layered over 3D */}
            <Scroll html style={{ width: "100%" }}>
              <div className="w-full">
                <Hero />
                <Benefits />
                <Ingredients />
                <Reviews />
                <Footer />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>

      {/* Spacer to enable native page scroll behind fixed canvas */}
      <div style={{ height: "400vh" }} />
    </div>
  );
}
