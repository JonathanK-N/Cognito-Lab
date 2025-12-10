"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PCB } from "@cognitolab/common";

interface Pcb3DViewerProps {
  pcb: PCB;
}

export const Pcb3DViewer: React.FC<Pcb3DViewerProps> = ({ pcb: _pcb }) => {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <gridHelper args={[20, 20]} />
        {/* TODO: Rendre le PCB en 3D */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5, 3, 0.1]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

