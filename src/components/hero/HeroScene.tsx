"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import { Color, Group, MathUtils, Mesh, Points } from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SAGE = new Color("#5D7F82");
const MIST = new Color("#C7D8E6");
const SAND = new Color("#E6D7C3");

function hash(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function OrganicForm({ simplified }: { simplified: boolean }) {
  const group = useRef<Group>(null);
  const inner = useRef<Mesh>(null);
  const points = useRef<Points>(null);

  const particlePositions = useMemo(() => {
    const count = simplified ? 28 : 70;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.7 + hash(i, 1) * 0.9;
      const theta = hash(i, 2) * Math.PI * 2;
      const phi = Math.acos(2 * hash(i, 3) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [simplified]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.18,
      2.4,
      delta,
    );
    group.current.rotation.z = MathUtils.damp(
      group.current.rotation.z,
      state.pointer.x * 0.1,
      2.4,
      delta,
    );
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.18;
    }
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh>
          <icosahedronGeometry args={[1.15, simplified ? 0 : 1]} />
          <meshPhysicalMaterial
            color={MIST}
            roughness={0.18}
            metalness={0.04}
            transmission={simplified ? 0.2 : 0.82}
            thickness={0.55}
            ior={1.38}
            transparent
            opacity={0.92}
            attenuationColor={SAGE}
            attenuationDistance={2.4}
          />
        </mesh>
        <mesh ref={inner} scale={0.46}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={SAGE} roughness={0.35} metalness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.3, 0.2]}>
          <torusGeometry args={[1.55, 0.012, 12, simplified ? 48 : 90]} />
          <meshBasicMaterial color={SAND} transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[0.4, 0.8, 0.1]}>
          <torusGeometry args={[1.85, 0.008, 12, simplified ? 40 : 80]} />
          <meshBasicMaterial color={MIST} transparent opacity={0.45} />
        </mesh>
        {!simplified ? (
          <>
            <Sphere args={[0.12, 16, 16]} position={[1.5, 0.35, 0.4]}>
              <meshStandardMaterial color={SAND} roughness={0.3} />
            </Sphere>
            <Sphere args={[0.08, 16, 16]} position={[-1.3, -0.5, 0.6]}>
              <meshStandardMaterial color={SAGE} roughness={0.25} />
            </Sphere>
            <Sphere args={[0.09, 16, 16]} position={[0.2, 1.45, -0.3]}>
              <meshStandardMaterial color={MIST} roughness={0.2} />
            </Sphere>
          </>
        ) : null}
        <points ref={points}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={simplified ? 0.03 : 0.025}
            color={MIST}
            transparent
            opacity={0.7}
            sizeAttenuation
          />
        </points>
      </Float>
    </group>
  );
}

export function HeroScene({ simplified = false }: { simplified?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduced) {
    return <div className="h-full w-full rounded-full bg-mist/20" aria-hidden="true" />;
  }

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        dpr={[1, simplified ? 1 : 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
        className="h-full w-full"
        aria-hidden="true"
      >
        <ambientLight intensity={0.85} color="#F3F6F4" />
        <directionalLight position={[4, 3, 5]} intensity={1.1} color="#C7D8E6" />
        <directionalLight position={[-3, -2, -2]} intensity={0.45} color="#E6D7C3" />
        <OrganicForm simplified={simplified} />
      </Canvas>
    </div>
  );
}
