"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

const RobotSimulator = dynamic(
  () => import("@cognitolab/robotics").then((mod) => mod.RobotSimulator),
  { ssr: false }
);

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

