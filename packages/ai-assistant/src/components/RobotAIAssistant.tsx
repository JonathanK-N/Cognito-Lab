"use client";

import React from "react";
import { AIAssistant } from "./AIAssistant";

export const RobotAIAssistant: React.FC<{
  onTrajectoryGenerated?: (trajectory: any) => void;
}> = ({ onTrajectoryGenerated }) => {
  return (
    <AIAssistant
      type="robot"
      onResult={(result) => {
        if (onTrajectoryGenerated) {
          onTrajectoryGenerated(result);
        }
      }}
    />
  );
};

