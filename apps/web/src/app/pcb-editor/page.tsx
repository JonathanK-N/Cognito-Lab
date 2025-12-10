"use client";

import React from "react";
import { PcbEditor } from "@cognitolab/eda-pro";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

export default function PcbEditorPage() {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Éditeur PCB</CardTitle>
        </CardHeader>
        <CardContent>
          <PcbEditor width={1200} height={800} />
        </CardContent>
      </Card>
    </div>
  );
}

