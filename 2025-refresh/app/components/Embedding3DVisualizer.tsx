"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

type WordPoint = {
  label: string;
  position: [number, number, number];
  color: string;
};

function Axes() {
  const axisLength = 2.2;

  return (
    <group>
      {/* X axis - Sport (red) */}
      <mesh position={[axisLength / 2, 0, 0]}>
        <boxGeometry args={[axisLength, 0.01, 0.01]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <Text
        position={[axisLength + 0.1, 0, 0]}
        fontSize={0.14}
        color="#f97316"
        anchorX="left"
        anchorY="middle"
      >
        Sport
      </Text>
      {/* Y axis - Social (green) */}
      <mesh position={[0, axisLength / 2, 0]}>
        <boxGeometry args={[0.01, axisLength, 0.01]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <Text
        position={[0, axisLength + 0.15, 0]}
        fontSize={0.14}
        color="#22c55e"
        anchorX="center"
        anchorY="bottom"
      >
        Social
      </Text>
      {/* Z axis - Chill vs intense (blue) */}
      <mesh position={[0, 0, axisLength / 2]}>
        <boxGeometry args={[0.01, 0.01, axisLength]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      <Text
        position={[0, 0, axisLength + 0.15]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.14}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        Chill / intense
      </Text>
    </group>
  );
}

function Words() {
  const words = useMemo<WordPoint[]>(() => {
    return [
      // Sports: high on Sport (x), generally higher energy (z)
      { label: "Tennis", position: [1.4, 0.7, 0.6], color: "#22c55e" },
      { label: "Badminton", position: [1.3, 0.5, 0.5], color: "#22c55e" },
      { label: "Squash", position: [1.5, 0.4, 0.8], color: "#22c55e" },
      // Other active things
      { label: "Gym", position: [1.1, 0.2, 0.9], color: "#a855f7" },
      { label: "Run", position: [1.0, 0.0, 1.0], color: "#a855f7" },
      // Social but not really sport
      { label: "Dinner", position: [0.1, 0.9, 0.2], color: "#f97316" },
      { label: "Drinks", position: [0.1, 1.0, 0.4], color: "#f97316" },
      // Chill / solo
      { label: "Reading", position: [-0.8, -0.6, -0.7], color: "#38bdf8" },
      { label: "Netflix", position: [-0.9, -0.7, -0.8], color: "#38bdf8" },
      { label: "Groceries", position: [-0.4, -0.1, -0.2], color: "#e5e7eb" },
    ];
  }, []);

  return (
    <group>
      {words.map((w, idx) => (
        <Text
          key={idx}
          position={w.position}
          fontSize={0.16}
          color={w.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#020617"
        >
          {w.label}
        </Text>
      ))}
    </group>
  );
}

export function Embedding3DVisualizer() {
  return (
    <div className="my-8 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4">
      <p
        className="mb-3 text-xs text-zinc-400"
        style={{ fontFamily: "var(--font-satoshi-light)" }}
      >
        Drag to rotate, scroll to zoom. Each dot is a fake 3D embedding, clustered by
        semantic similarity.
      </p>
      <div className="h-80 w-full rounded-lg bg-black overflow-hidden">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 4, 4]} intensity={1.1} />
          <directionalLight position={[-3, -2, -2]} intensity={0.6} />
          <Axes />
          <Words />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={2} maxDistance={8} />
        </Canvas>
      </div>
    </div>
  );
}

