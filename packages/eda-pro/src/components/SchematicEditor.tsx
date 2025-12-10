"use client";

import React, { useRef, useState } from "react";
import { Stage, Layer, Group, Rect, Line, Text } from "react-konva";
import { Schematic } from "@cognitolab/common";
import { cn } from "@cognitolab/ui";

export interface SchematicEditorProps {
  width?: number;
  height?: number;
  onSchematicChange?: (schematic: Schematic) => void;
  className?: string;
}

export const SchematicEditor: React.FC<SchematicEditorProps> = ({
  width = 1200,
  height = 800,
  onSchematicChange: _onSchematicChange,
  className,
}) => {
  const stageRef = useRef<any>(null);
  const [schematic] = useState<Schematic>({
    symbols: [],
    nets: [],
  });

  const handleStageClick = (_e: any) => {
    // TODO: Gérer les clics pour ajouter des symboles
  };

  return (
    <div className={cn("border border-gray-300 rounded-lg overflow-hidden", className)}>
      <Stage width={width} height={height} onClick={handleStageClick} ref={stageRef}>
        <Layer>
          {/* Grille de fond */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Line
              key={`v-${i}`}
              points={[i * 50, 0, i * 50, height]}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <Line
              key={`h-${i}`}
              points={[0, i * 50, width, i * 50]}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          ))}
          {/* Symboles */}
          {schematic.symbols.map((symbol) => (
            <Group key={symbol.id} x={symbol.x} y={symbol.y} draggable>
              <Rect width={40} height={40} fill="#fff" stroke="#000" strokeWidth={2} />
              <Text text={symbol.type} fontSize={12} x={5} y={15} />
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export interface PcbEditorProps {
  width?: number;
  height?: number;
  onPcbChange?: (pcb: any) => void;
  className?: string;
}

export const PcbEditor: React.FC<PcbEditorProps> = ({
  width = 1200,
  height = 800,
  onPcbChange: _onPcbChange,
  className,
}) => {
  const [layers] = useState<number[]>([0, 1]); // Top, Bottom
  const [currentLayer, setCurrentLayer] = useState<number>(0);

  return (
    <div className={cn("border border-gray-300 rounded-lg overflow-hidden", className)}>
      <div className="p-4 bg-gray-100 border-b">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Couches:</span>
          {layers.map((layer) => (
            <button
              key={layer}
              onClick={() => setCurrentLayer(layer)}
              className={`px-3 py-1 rounded ${
                currentLayer === layer ? "bg-primary-600 text-white" : "bg-white"
              }`}
            >
              {layer === 0 ? "Top" : layer === 1 ? "Bottom" : `Layer ${layer + 1}`}
            </button>
          ))}
        </div>
      </div>
      <Stage width={width} height={height}>
        <Layer>
          {/* TODO: Implémenter l'éditeur PCB complet */}
          <Rect width={width} height={height} fill="#1a1a1a" />
        </Layer>
      </Stage>
    </div>
  );
};

