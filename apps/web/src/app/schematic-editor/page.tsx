"use client";

import React from "react";
import { SchematicEditor } from "@cognitolab/eda-pro";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

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

