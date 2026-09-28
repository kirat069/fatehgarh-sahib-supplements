import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = {
  bg: 0x14110f,
  ink: 0xefe7d8,
  copper: 0xb5652e,
  copperCap: 0xd8b48a,
  forest: 0x46603c,
  saffron: 0xd98e04,
  steel: 0x3a5a73,
  steelCap: 0x8fa3ad,
};

function makeBond(target) {
  const dir = target.clone();
  const length = Math.max(dir.length(), 0.001);
  const geo = new THREE.CylinderGeometry(0.035, 0.035, length, 8);
  const mat = new THREE.MeshStandardMaterial({
    color: COLORS.ink,
    roughness: 0.6,
    transparent: true,
    opacity: 0.22,
  });
  const mesh = new THREE.Mesh(geo, mat);
  const axis = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(
    axis,
    dir.clone().normalize()
  );
  mesh.quaternion.copy(q);
  mesh.position.copy(dir.clone().multiplyScalar(0.5));
  return mesh;
}

function HeroMolecule() {
  const groupRef = useRef();

  const satellites = useMemo(() => {
    const sat = [
      COLORS.copper,
      COLORS.forest,
      COLORS.steel,
      COLORS.saffron,
      COLORS.copperCap,
      COLORS.steelCap,
    ];
    return Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2;
      const r = 2.5;
      const pos = new THREE.Vector3(
        Math.cos(a) * r,
        Math.sin(a * 1.7) * 1.05,
        Math.sin(a) * r * 0.6
      );
      return { pos, color: sat[i % sat.length] };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0.4, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color={COLORS.saffron}
          roughness={0.3}
          metalness={0.4}
          emissive={COLORS.saffron}
          emissiveIntensity={0.18}
        />
      </mesh>
      {satellites.map((s, i) => (
        <group key={i}>
          <mesh position={s.pos}>
            <sphereGeometry args={[0.3, 20, 20]} />
            <meshStandardMaterial
              color={s.color}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
          {makeBond(s.pos)}
        </group>
      ))}
    </group>
  );
}

function Bottle({ bodyColor, capColor, h = 3 }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.85, 0.85, h, 28]} />
        <meshStandardMaterial
          color={bodyColor}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[0, h / 2 + 0.35, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.7, 28]} />
        <meshStandardMaterial color={capColor} roughness={0.25} metalness={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.87, 0.05, 12, 40]} />
        <meshStandardMaterial
          color={capColor}
          roughness={0.3}
          metalness={0.6}
          emissive={capColor}
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

function LeafCluster() {
  const groupRef = useRef();

  const leaves = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return {
          pos: [
            Math.cos(a) * 1.1,
            Math.sin(a * 2) * 0.4,
            Math.sin(a) * 1.1,
          ],
          rot: [0, a * 1.3, a],
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-6, 0.3, -40]}>
      {leaves.map((l, i) => (
        <mesh
          key={i}
          position={l.pos}
          rotation={l.rot}
          scale={[0.4, 1, 1]}
        >
          <coneGeometry args={[0.5, 1.6, 4]} />
          <meshStandardMaterial
            color={COLORS.forest}
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial
          color={COLORS.saffron}
          roughness={0.4}
          metalness={0.1}
          emissive={COLORS.saffron}
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

function PillOrbit() {
  const groupRef = useRef();

  const pills = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return [
          Math.cos(a) * 1.6,
          Math.sin(a) * 0.3,
          Math.sin(a) * 1.6 * 0.5,
        ];
      }),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[6, 0, -60]}>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 8, 60]} />
        <meshStandardMaterial
          color={COLORS.saffron}
          roughness={0.5}
          transparent
          opacity={0.35}
        />
      </mesh>
      {pills.map((p, i) => (
        <mesh key={i} position={p}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color={COLORS.saffron}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Capsule({ color, position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 1.1, 20]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} />
      </mesh>
    </group>
  );
}

function PerformanceGroup() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef} position={[-6, 0, -80]}>
      <Bottle bodyColor={COLORS.steel} capColor={COLORS.steelCap} h={2.6} />
      <Capsule color={COLORS.steel} position={[1.6, 0.6, 0.4]} />
      <Capsule color={COLORS.saffron} position={[-1.5, -0.3, 0.6]} />
    </group>
  );
}

function ProteinGroup() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[6, -0.2, -20]}>
      <Bottle bodyColor={COLORS.copper} capColor={COLORS.copperCap} h={3.2} />
    </group>
  );
}

function Particles({ count = 260 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = -Math.random() * 100;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={COLORS.ink}
        size={0.05}
        transparent
        opacity={0.32}
      />
    </points>
  );
}

const SECTION_IDS = [
  "hero",
  "protein",
  "ayurveda",
  "vitamins",
  "performance",
  "trust",
  "cta",
];

const CAM_KEYFRAMES = {
  hero: { x: 0, y: 0.6, z: 14 },
  protein: { x: 3.5, y: 0.4, z: -14 },
  ayurveda: { x: -3.5, y: 0.6, z: -34 },
  vitamins: { x: 3.5, y: 0.3, z: -54 },
  performance: { x: -3.5, y: 0.5, z: -74 },
  trust: { x: 0, y: 0.6, z: -88 },
  cta: { x: 0, y: 0.6, z: -98 },
};

function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  const currentCam = useRef({ x: 0, y: 0.6, z: 14 });

  const waypoints = useMemo(() => {
    return SECTION_IDS.map((id) => ({
      frac: 0,
      ...CAM_KEYFRAMES[id],
    }));
  }, []);

  const updateWaypoints = () => {
    const totalScroll =
      document.body.scrollHeight - window.innerHeight;
    waypoints.forEach((wp, i) => {
      const el = document.getElementById(SECTION_IDS[i]);
      if (el && totalScroll > 0) {
        wp.frac = el.offsetTop / totalScroll;
      }
    });
  };

  React.useEffect(() => {
    updateWaypoints();
    const onResize = () => updateWaypoints();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  useFrame(() => {
    const progress = scrollProgress.current;
    let target = waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
      if (progress >= a.frac && progress <= b.frac) {
        const t = (progress - a.frac) / Math.max(0.0001, b.frac - a.frac);
        target = {
          x: a.x + (b.x - a.x) * t,
          y: a.y + (b.y - a.y) * t,
          z: a.z + (b.z - a.z) * t,
        };
        break;
      }
    }

    const lerpSpeed = 0.07;
    currentCam.current.x += (target.x - currentCam.current.x) * lerpSpeed;
    currentCam.current.y += (target.y - currentCam.current.y) * lerpSpeed;
    currentCam.current.z += (target.z - currentCam.current.z) * lerpSpeed;

    camera.position.set(
      currentCam.current.x,
      currentCam.current.y,
      currentCam.current.z
    );
    camera.lookAt(
      currentCam.current.x * 0.3,
      0,
      currentCam.current.z - 10
    );
  });

  return null;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} color={0xfff1de} />
      <directionalLight position={[6, 12, 10]} intensity={0.7} color={0xffffff} />
      <pointLight position={[6, 2, -18]} intensity={1.1} distance={22} decay={2} color={COLORS.copper} />
      <pointLight position={[-6, 2, -38]} intensity={1.1} distance={22} decay={2} color={COLORS.forest} />
      <pointLight position={[6, 2, -58]} intensity={1.1} distance={22} decay={2} color={COLORS.saffron} />
      <pointLight position={[-6, 2, -78]} intensity={1.1} distance={22} decay={2} color={COLORS.steel} />
    </>
  );
}

export default function Scene3D({ scrollProgress }) {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 760 : false;

  return (
    <Canvas
      camera={{
        position: [0, 0.6, 14],
        fov: isMobile ? 62 : 50,
        near: 0.1,
        far: 300,
      }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(COLORS.bg, 0.017);
        scene.background = new THREE.Color(COLORS.bg);
      }}
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 0 }}
    >
      <SceneLights />
      <HeroMolecule />
      <ProteinGroup />
      <LeafCluster />
      <PillOrbit />
      <PerformanceGroup />
      <Particles count={isMobile ? 150 : 260} />
      <CameraRig scrollProgress={scrollProgress} />
    </Canvas>
  );
}
