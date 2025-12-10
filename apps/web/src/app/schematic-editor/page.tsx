"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

const SchematicEditor = dynamic(
  () => import("@cognitolab/eda-pro").then((mod) => mod.SchematicEditor),
  { ssr: false }
);

export default function SchematicEditorPage() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Éditeur de Schémas</CardTitle>
        </CardHeader>
        <CardContent>
          <SchematicEditor width={1200} height={800} />
        </CardContent>
      </Card>
    </div>
  );
}

