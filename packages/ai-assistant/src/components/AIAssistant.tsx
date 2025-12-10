"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "@cognitolab/ui";
import axios from "axios";
import { API_BASE_URL } from "@cognitolab/common";

export interface AIAssistantProps {
  type: "circuit" | "code" | "robot" | "pcb";
  onResult?: (result: any) => void;
  className?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  type,
  onResult,
  className,
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const endpoint = {
        circuit: "/ai/circuit/generate",
        code: "/ai/code/generate",
        robot: "/ai/robot/trajectory",
        pcb: "/ai/pcb/generate",
      }[type];

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        description: prompt,
      });

      setResult(response.data.data);
      if (onResult) {
        onResult(response.data.data);
      }
    } catch (error) {
      console.error("AI request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Assistant IA - {type}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Décrivez ce que vous voulez générer..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Génération..." : "Générer"}
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

