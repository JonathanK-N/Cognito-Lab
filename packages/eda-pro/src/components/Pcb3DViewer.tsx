"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import { PCB } from "@cognitolab/common";

interface Pcb3DViewerProps {
  pcb: PCB;
}

export const Pcb3DViewer: React.FC<Pcb3DViewerProps> = ({ pcb }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Grid args={[20, 20]} />
        {/* TODO: Rendre le PCB en 3D */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5, 3, 0.1]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

