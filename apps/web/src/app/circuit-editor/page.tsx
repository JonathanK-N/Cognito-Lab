"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

const CircuitEditor = dynamic(
  () => import("@cognitolab/circuit-editor").then((mod) => mod.CircuitEditor),
  { ssr: false }
);

export default function CircuitEditorPage() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Éditeur de Circuits</CardTitle>
        </CardHeader>
        <CardContent>
          <CircuitEditor width={1200} height={800} />
        </CardContent>
      </Card>
    </div>
  );
}

