"use client";

import React from "react";
import { RobotSimulator } from "@cognitolab/robotics";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

export default function RobotSimPage() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Simulateur Robotique</CardTitle>
        </CardHeader>
        <CardContent>
          <RobotSimulator />
        </CardContent>
      </Card>
    </div>
  );
}

