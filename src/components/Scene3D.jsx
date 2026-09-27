import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const AMBER = "#E8A33D";
const INK = "#F1EFE7";

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function CapsulePill() {
  const meshRef = useRef();
  const growRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (growRef.current < 1) {
      growRef.current = Math.min(1, growRef.current + delta * 1.2);
      const s = easeOutBack(growRef.current);
      meshRef.current.scale.setScalar(s);
    }
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
  });

  return (
    <mesh ref={meshRef} scale={0}>
      <capsuleGeometry args={[0.55, 1.4, 16, 32]} />
      <meshPhysicalMaterial
        color={AMBER}
        metalness={0.7}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={0.8}
        envMapIntensity={1.2}
      />
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color={INK}
          metalness={0.6}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, -1.1, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color={AMBER}
          metalness={0.7}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>
    </mesh>
  );
}

function HoloRing() {
  const ringRef = useRef();
  useFrame((state, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.4;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    ringRef.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
      <torusGeometry args={[2.2, 0.025, 8, 100]} />
      <meshStandardMaterial
        color={AMBER}
        emissive={AMBER}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Particles({ count = 40 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8 - 2,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        speed: 0.3 + Math.random() * 0.7,
        floatY: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime;
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed * 0.3 + p.floatY) * 0.5,
        p.position[1] + Math.sin(t * p.speed * 0.5 + p.floatY) * 0.8,
        p.position[2] + Math.cos(t * p.speed * 0.2 + p.floatY) * 0.4
      );
      dummy.rotation.set(
        p.rotation[0] + t * p.speed * 0.3,
        p.rotation[1] + t * p.speed * 0.2,
        p.rotation[2]
      );
      dummy.scale.setScalar(0.06);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <capsuleGeometry args={[0.5, 1.2, 4, 8]} />
      <meshStandardMaterial
        color={AMBER}
        emissive={AMBER}
        emissiveIntensity={0.4}
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
}

const SECTION_FRAMES = [
  { pos: [0, 0, 7], look: [0, 0, 0] },
  { pos: [3, 1, 6], look: [-1, 0, 0] },
  { pos: [-3, -0.5, 6], look: [1, 0, 0] },
  { pos: [0, 2, 5.5], look: [0, -0.5, 0] },
  { pos: [2, -1, 6], look: [-0.5, 0.5, 0] },
];

function ScrollCamera({ sectionRef }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...SECTION_FRAMES[0].pos));
  const targetLook = useRef(new THREE.Vector3(...SECTION_FRAMES[0].look));
  const currentLook = useRef(new THREE.Vector3(...SECTION_FRAMES[0].look));

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      let idx = 0;
      for (let i = 0; i < section.children.length; i++) {
        const el = section.children[i];
        const rect = el.getBoundingClientRect();
        if (rect.top < winH * 0.6 && rect.bottom > winH * 0.3) {
          idx = i;
          break;
        }
        if (rect.top <= 0) idx = i;
      }
      idx = Math.min(idx, SECTION_FRAMES.length - 1);
      targetPos.current.set(...SECTION_FRAMES[idx].pos);
      targetLook.current.set(...SECTION_FRAMES[idx].look);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPos.current, delta * 1.5);
    currentLook.current.lerp(targetLook.current, delta * 1.5);
    camera.lookAt(currentLook.current);
  });

  return null;
}

export default function Scene3D({ sectionRef }) {
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setWebglSupported(!!gl);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!webglSupported) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "radial-gradient(ellipse at center, #1C2128 0%, #14181C 70%)",
        }}
      />
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 8, 5]} angle={0.3} intensity={1.5} color={AMBER} />
          <spotLight position={[-5, -3, 4]} angle={0.3} intensity={0.8} color="#8A94A6" />

          <CapsulePill />
          <HoloRing />
          {!reducedMotion && <Particles count={40} />}

          <Environment preset="studio" />

          {!reducedMotion && (
            <EffectComposer>
              <Bloom
                intensity={0.8}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          )}

          <ScrollCamera sectionRef={sectionRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
