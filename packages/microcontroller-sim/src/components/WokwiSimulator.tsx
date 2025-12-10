"use client";

import React, { useEffect, useRef } from "react";
import { MCUType } from "@cognitolab/common";

interface WokwiSimulatorProps {
  mcuType: MCUType;
  code: string;
  onCodeChange?: (code: string) => void;
  isRunning: boolean;
  onRunChange: (running: boolean) => void;
}

export const WokwiSimulator: React.FC<WokwiSimulatorProps> = ({
  mcuType,
  code: _code,
  onCodeChange: _onCodeChange,
  isRunning: _isRunning,
  onRunChange: _onRunChange,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const wokwiUrl = `https://wokwi.com/projects/new/${mcuType}`;
      iframeRef.current.src = wokwiUrl;
    }
  }, [mcuType]);

  return (
    <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        title="Wokwi Simulator"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

