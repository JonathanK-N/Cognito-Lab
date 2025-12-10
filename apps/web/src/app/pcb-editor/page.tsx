"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@cognitolab/ui";

const PcbEditor = dynamic(
  () => import("@cognitolab/eda-pro").then((mod) => mod.PcbEditor),
  { ssr: false }
);

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

