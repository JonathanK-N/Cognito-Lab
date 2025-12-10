"use client";

import React, { useState } from "react";
import { Robot, RobotPose } from "@cognitolab/common";
import { RobotViewer } from "./RobotViewer";
import { Button } from "@cognitolab/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";
import { useRobotStore } from "../store/robotStore";

export interface RobotSimulatorProps {
  robot?: Robot;
  urdfUrl?: string;
  onPoseChange?: (pose: RobotPose) => void;
  className?: string;
}

export const RobotSimulator: React.FC<RobotSimulatorProps> = ({
  robot,
  urdfUrl,
  onPoseChange,
  className,
}) => {
  const { setRobot, currentPose, setPose } = useRobotStore();
  const [isRunning, setIsRunning] = useState(false);

  React.useEffect(() => {
    if (robot) {
      setRobot(robot);
    }
  }, [robot, setRobot]);

  const handleRun = () => {
    setIsRunning(true);
    // TODO: Exécuter trajectoire
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Simulateur Robotique</CardTitle>
        {robot && <p className="text-sm text-gray-500">Robot: {robot.name}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handleRun} disabled={isRunning}>
              Démarrer
            </Button>
            <Button onClick={handleStop} disabled={!isRunning} variant="destructive">
              Arrêter
            </Button>
          </div>
          <div className="border border-gray-300 rounded-lg h-[600px]">
            <RobotViewer urdfUrl={robot?.urdf || urdfUrl} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

