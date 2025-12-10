"use client";

import React from "react";
import { AIAssistant } from "./AIAssistant";

export const CodeAIAssistant: React.FC<{
  onCodeGenerated?: (code: string) => void;
}> = ({ onCodeGenerated }) => {
  return (
    <AIAssistant
      type="code"
      onResult={(result) => {
        if (onCodeGenerated && result.code) {
          onCodeGenerated(result.code);
        }
      }}
    />
  );
};

