"use client";

import React, { useState } from "react";
import { MCUType } from "@cognitolab/common";
import { Button } from "@cognitolab/ui";

interface InternalSimulatorProps {
  mcuType: MCUType;
  code: string;
  onCodeChange?: (code: string) => void;
  isRunning: boolean;
  onRunChange: (running: boolean) => void;
}

export const InternalSimulator: React.FC<InternalSimulatorProps> = ({
  mcuType,
  code,
  onCodeChange,
  isRunning,
  onRunChange,
}) => {
  const [output, setOutput] = useState<string>("");
  const [registers, setRegisters] = useState<Record<string, number>>({});

  const handleRun = () => {
    setOutput(`Simulation interne pour ${mcuType}...\nExécution du code...`);
    onRunChange(true);
    // TODO: Implémenter simulateur interne simple
    setTimeout(() => {
      setOutput((prev) => prev + "\n✓ Code exécuté avec succès");
      onRunChange(false);
    }, 2000);
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
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-300 rounded-lg p-4 bg-black text-green-400 font-mono text-sm h-64 overflow-y-auto">
          <pre>{output || "Prêt pour la simulation..."}</pre>
        </div>
        <div className="border border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Registres</h3>
          <div className="space-y-1 text-sm">
            {Object.entries(registers).map(([name, value]) => (
              <div key={name} className="flex justify-between">
                <span>{name}:</span>
                <span className="font-mono">{value.toString(16).toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

