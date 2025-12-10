"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import { RobotModel } from "./RobotModel";

interface RobotViewerProps {
  urdfUrl?: string;
}

export const RobotViewer: React.FC<RobotViewerProps> = ({ urdfUrl }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Grid args={[10, 10]} />
        {urdfUrl && <RobotModel urdfUrl={urdfUrl} />}
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

