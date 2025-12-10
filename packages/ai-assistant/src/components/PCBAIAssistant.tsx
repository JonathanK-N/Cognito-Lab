"use client";

import React from "react";
import { AIAssistant } from "./AIAssistant";

export const PCBAIAssistant: React.FC<{
  onPCBGenerated?: (pcb: any) => void;
}> = ({ onPCBGenerated }) => {
  return (
    <AIAssistant
      type="pcb"
      onResult={(result) => {
        if (onPCBGenerated) {
          onPCBGenerated(result);
        }
      }}
    />
  );
};

