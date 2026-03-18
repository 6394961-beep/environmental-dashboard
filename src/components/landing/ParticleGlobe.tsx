"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlobePoints() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + (Math.random() - 0.5) * 0.15;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.08;
      ref.current.rotation.x += delta * 0.02;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#00ffaa" size={0.03} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

function FloatingNodes() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) { ref.current.rotation.y -= delta * 0.03; }
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#00ccff" size={0.05} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

export default function ParticleGlobe() {
  return (
    <div className="absolute inset-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: "transparent" }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.3} />
        <GlobePoints />
        <FloatingNodes />
      </Canvas>
    </div>
  );
}