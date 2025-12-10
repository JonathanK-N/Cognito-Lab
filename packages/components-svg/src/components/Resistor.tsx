import React from "react";

export interface ResistorProps {
  width?: number;
  height?: number;
  value?: string;
  className?: string;
}

export const Resistor: React.FC<ResistorProps> = ({
  width = 100,
  height = 40,
  value = "1kΩ",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="20" x2="20" y2="20" stroke="#000" strokeWidth="2" />
      <rect x="20" y="10" width="60" height="20" fill="#8b5cf6" stroke="#000" strokeWidth="2" />
      <line x1="80" y1="20" x2="100" y2="20" stroke="#000" strokeWidth="2" />
      <text x="50" y="25" textAnchor="middle" fontSize="10" fill="#000">
        {value}
      </text>
    </svg>
  );
};

