"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

interface RobotModelProps {
  urdfUrl: string;
}

export const RobotModel: React.FC<RobotModelProps> = ({ urdfUrl: _urdfUrl }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Animation simple pour démonstration
      // TODO: Charger URDF réellement
    }
  });

  // Placeholder - TODO: Charger URDF avec urdf-loader
  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

