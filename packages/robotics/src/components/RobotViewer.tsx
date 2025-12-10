"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RobotModel } from "./RobotModel";

interface RobotViewerProps {
  urdfUrl?: string;
}

export const RobotViewer: React.FC<RobotViewerProps> = ({ urdfUrl }) => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <gridHelper args={[20, 20]} />
        {urdfUrl && <RobotModel urdfUrl={urdfUrl} />}
      </Suspense>
    </Canvas>
  );
};

