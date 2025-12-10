"use client";

import React, { useState } from "react";
import { MicrocontrollerSimulator } from "@cognitolab/microcontroller-sim";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";
import { MCUType } from "@cognitolab/common";

export default function MicrocontrollerSimPage() {
  const [mcuType, setMcuType] = useState<MCUType>("arduino-uno");
  const [code, setCode] = useState("");

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Simulateur de Microcontrôleur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Type de MCU:</label>
            <select
              value={mcuType}
              onChange={(e) => setMcuType(e.target.value as MCUType)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="arduino-uno">Arduino Uno</option>
              <option value="arduino-mega">Arduino Mega</option>
              <option value="esp32">ESP32</option>
              <option value="stm32">STM32</option>
            </select>
          </div>
          <MicrocontrollerSimulator mcuType={mcuType} code={code} onCodeChange={setCode} />
        </CardContent>
      </Card>
    </div>
  );
}

