"use client";

import React from "react";
import { CircuitEditor } from "@cognitolab/circuit-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

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

