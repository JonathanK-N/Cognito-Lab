"use client";

import React, { useState } from "react";
import { MCUType } from "@cognitolab/common";
import { Button } from "@cognitolab/ui";

interface RenodeSimulatorProps {
  mcuType: MCUType;
  code: string;
  onCodeChange?: (code: string) => void;
  isRunning: boolean;
  onRunChange: (running: boolean) => void;
}

export const RenodeSimulator: React.FC<RenodeSimulatorProps> = ({
  mcuType,
  code,
  onCodeChange,
  isRunning,
  onRunChange,
}) => {
  const [output, setOutput] = useState<string>("");

  const handleRun = () => {
    setOutput(`Simulation Renode pour ${mcuType}...\nCode:\n${code}`);
    onRunChange(true);
    // TODO: Intégration Renode WebAssembly
  };

  const handleStop = () => {
    onRunChange(false);
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={handleRun} disabled={isRunning}>
          Démarrer
        </Button>
        <Button onClick={handleStop} disabled={!isRunning} variant="destructive">
          Arrêter
        </Button>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 bg-black text-green-400 font-mono text-sm h-64 overflow-y-auto">
        <pre>{output || "Prêt pour la simulation..."}</pre>
      </div>
    </div>
  );
};

