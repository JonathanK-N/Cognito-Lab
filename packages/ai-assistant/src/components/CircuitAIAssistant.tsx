"use client";

import React from "react";
import { AIAssistant } from "./AIAssistant";

export const CircuitAIAssistant: React.FC<{
  onCircuitGenerated?: (circuit: any) => void;
}> = ({ onCircuitGenerated }) => {
  return (
    <AIAssistant
      type="circuit"
      onResult={(result) => {
        if (onCircuitGenerated) {
          onCircuitGenerated(result);
        }
      }}
    />
  );
};

