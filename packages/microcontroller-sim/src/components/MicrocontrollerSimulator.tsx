"use client";

import React, { useState, useEffect } from "react";
import { MCUType, SimulatorType } from "@cognitolab/common";
import { SIMULATOR_MAP } from "../constants";
import { WokwiSimulator } from "./WokwiSimulator";
import { RenodeSimulator } from "./RenodeSimulator";
import { InternalSimulator } from "./InternalSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

export interface MicrocontrollerSimulatorProps {
  mcuType: MCUType;
  code?: string;
  onCodeChange?: (code: string) => void;
  className?: string;
}

export const MicrocontrollerSimulator: React.FC<MicrocontrollerSimulatorProps> = ({
  mcuType,
  code = "",
  onCodeChange,
  className,
}) => {
  const [simulatorType, setSimulatorType] = useState<SimulatorType>("internal");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const type = SIMULATOR_MAP[mcuType] || "internal";
    setSimulatorType(type);
  }, [mcuType]);

  const renderSimulator = () => {
    switch (simulatorType) {
      case "wokwi":
        return (
          <WokwiSimulator
            mcuType={mcuType}
            code={code}
            onCodeChange={onCodeChange}
            isRunning={isRunning}
            onRunChange={setIsRunning}
          />
        );
      case "renode":
        return (
          <RenodeSimulator
            mcuType={mcuType}
            code={code}
            onCodeChange={onCodeChange}
            isRunning={isRunning}
            onRunChange={setIsRunning}
          />
        );
      case "internal":
      default:
        return (
          <InternalSimulator
            mcuType={mcuType}
            code={code}
            onCodeChange={onCodeChange}
            isRunning={isRunning}
            onRunChange={setIsRunning}
          />
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Microcontrôleur: {mcuType}</CardTitle>
        <p className="text-sm text-gray-500">Simulateur: {simulatorType}</p>
      </CardHeader>
      <CardContent>{renderSimulator()}</CardContent>
    </Card>
  );
};

