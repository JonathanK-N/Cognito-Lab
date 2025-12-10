"use client";

import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Group } from "react-konva";
import { useCircuitStore } from "../store/circuitStore";
import { Component, Connection } from "@cognitolab/common";
import { cn } from "@cognitolab/ui";

export interface CircuitEditorProps {
  width?: number;
  height?: number;
  onCircuitChange?: (circuit: { components: Component[]; connections: Connection[] }) => void;
  className?: string;
}

export const CircuitEditor: React.FC<CircuitEditorProps> = ({
  width = 800,
  height = 600,
  onCircuitChange,
  className,
}) => {
  const stageRef = useRef<any>(null);
  const { components, connections } = useCircuitStore();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  useEffect(() => {
    if (onCircuitChange) {
      onCircuitChange({ components, connections });
    }
  }, [components, connections, onCircuitChange]);

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedComponent(null);
    }
  };

  const renderComponent = (component: Component) => {
    const isSelected = selectedComponent === component.id;

    switch (component.type) {
      case "resistor":
        return (
          <Group
            key={component.id}
            x={component.x}
            y={component.y}
            draggable
            onClick={() => setSelectedComponent(component.id)}
          >
            <Rect
              width={60}
              height={20}
              fill={isSelected ? "#3b82f6" : "#8b5cf6"}
              stroke={isSelected ? "#2563eb" : "#7c3aed"}
              strokeWidth={2}
            />
            <Line points={[0, 10, -20, 10]} stroke="#000" strokeWidth={2} />
            <Line points={[60, 10, 80, 10]} stroke="#000" strokeWidth={2} />
          </Group>
        );
      case "led":
        return (
          <Group
            key={component.id}
            x={component.x}
            y={component.y}
            draggable
            onClick={() => setSelectedComponent(component.id)}
          >
            <Circle
              radius={15}
              fill={isSelected ? "#3b82f6" : "#ef4444"}
              stroke={isSelected ? "#2563eb" : "#dc2626"}
              strokeWidth={2}
            />
            <Line points={[0, 15, -20, 15]} stroke="#000" strokeWidth={2} />
            <Line points={[0, -15, -20, -15]} stroke="#000" strokeWidth={2} />
          </Group>
        );
      case "battery":
        return (
          <Group
            key={component.id}
            x={component.x}
            y={component.y}
            draggable
            onClick={() => setSelectedComponent(component.id)}
          >
            <Rect
              width={30}
              height={50}
              fill={isSelected ? "#3b82f6" : "#10b981"}
              stroke={isSelected ? "#2563eb" : "#059669"}
              strokeWidth={2}
            />
            <Line points={[15, -20, 15, 0]} stroke="#000" strokeWidth={3} />
            <Line points={[15, 50, 15, 70]} stroke="#000" strokeWidth={3} />
          </Group>
        );
      default:
        return (
          <Circle
            key={component.id}
            x={component.x}
            y={component.y}
            radius={10}
            fill="#gray"
            draggable
            onClick={() => setSelectedComponent(component.id)}
          />
        );
    }
  };

  const renderConnection = (connection: Connection) => {
    const fromComp = components.find((c) => c.id === connection.from);
    const toComp = components.find((c) => c.id === connection.to);

    if (!fromComp || !toComp) return null;

    return (
      <Line
        key={connection.id}
        points={[fromComp.x, fromComp.y, toComp.x, toComp.y]}
        stroke="#000"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className={cn("border border-gray-300 rounded-lg overflow-hidden", className)}>
      <Stage
        width={width}
        height={height}
        onClick={handleStageClick}
        ref={stageRef}
      >
        <Layer>
          {connections.map(renderConnection)}
          {components.map(renderComponent)}
        </Layer>
      </Stage>
    </div>
  );
};

